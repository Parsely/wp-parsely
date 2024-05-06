/**
 * WordPress dependencies
 */
// eslint-disable-next-line import/named
import { BlockInstance, getBlockContent } from '@wordpress/blocks';
import { Button, Notice, PanelRow } from '@wordpress/components';
import { useDebounce } from '@wordpress/compose';
import { dispatch, useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';
import { Icon, external } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { GutenbergFunction } from '../../../@types/gutenberg/types';
import { Telemetry } from '../../../js/telemetry/telemetry';
import { ContentHelperErrorCode } from '../../common/content-helper-error';
import { SidebarSettings, SmartLinkingSettings, useSettings } from '../../common/settings';
import { generateProtocolVariants } from '../../common/utils/functions';
import { SmartLinkingReviewModal } from './review-modal/component-modal';
import { SmartLinkingSettings as SmartLinkingSettingsComponent } from './component-settings';
import { SmartLink, SmartLinkingProvider } from './provider';
import { ApplyToOptions, SmartLinkingSettingsProps, SmartLinkingStore } from './store';
import { escapeRegExp, findTextNodesNotInAnchor } from './utils';

/**
 * Represents the counts of occurrences and applications of links within text content.
 *
 * - `encountered`: The number of times a specific link text is encountered in the content.
 * - `linked`: The number of times a link has been successfully applied for a specific link text.
 *
 * @since 3.14.1
 */
type LinkOccurrenceCounts = {
	[key: string]: {
		encountered: number;
		linked: number;
	};
};

/**
 * Defines the props structure for SmartLinkingPanel.
 *
 * @since 3.14.0
 */
type SmartLinkingPanelProps = {
	className?: string;
	selectedBlockClientId?: string;
	context?: SmartLinkingPanelContext;
}

/**
 * Defines the possible contexts in which the Smart Linking panel can be used.
 *
 * @since 3.14.0
 */
export enum SmartLinkingPanelContext {
	Unknown = 'unknown',
	ContentHelperSidebar = 'content_helper_sidebar',
	BlockInspector = 'block_inspector',
}

/**
 * The maximum number of retries for fetching smart links.
 *
 * @since 3.15.0
 */
export const MAX_NUMBER_OF_RETRIES = 3;

/**
 * Smart Linking Panel.
 *
 * @since 3.14.0
 *
 * @param {Readonly<SmartLinkingPanelProps>} props The component's props.
 *
 * @return {JSX.Element} The JSX Element.
 */
export const SmartLinkingPanel = ( {
	className,
	selectedBlockClientId,
	context = SmartLinkingPanelContext.Unknown,
}: Readonly<SmartLinkingPanelProps> ): JSX.Element => {
	const { settings, setSettings } = useSettings<SidebarSettings>();
	const setSettingsDebounced = useDebounce( setSettings, 500 );

	const [ numAddedLinks, setNumAddedLinks ] = useState<number>( 0 );
	const [ isReviewDone, setIsReviewDone ] = useState<boolean>( false );
	const [ isReviewModalOpen, setIsReviewModalOpen ] = useState<boolean>( false );

	const { createNotice } = useDispatch( 'core/notices' );

	/**
	 * Handles the ending of the review process.
	 */
	useEffect( () => {
		console.log( isReviewDone, numAddedLinks );
		if ( ! isReviewDone ) {
			setNumAddedLinks( 0 );
		} else {
			createNotice(
				'success',
				/* translators: %d: number of smart links applied */
				sprintf( __( '%s smart links successfully applied.', 'wp-parsely' ), numAddedLinks ),
				{
					type: 'snackbar',
				},
			);
		}
	}, [ isReviewDone ] ); // eslint-disable-line react-hooks/exhaustive-deps

	/**
	 * Loads the Smart Linking store.
	 *
	 * @since 3.14.0
	 */
	const {
		loading,
		isFullContent,
		overlayBlocks,
		error,
		suggestedLinks,
		maxLinks,
		maxLinkWords,
		smartLinkingSettings,
		applyTo,
		retrying,
		retryAttempt,
	} = useSelect( ( selectFn ) => {
		const {
			isLoading,
			getOverlayBlocks,
			getSuggestedLinks,
			getError,
			// eslint-disable-next-line @typescript-eslint/no-shadow
			isFullContent,
			getMaxLinks,
			getMaxLinkWords,
			getSmartLinkingSettings,
			getApplyTo,
			isRetrying,
			getRetryAttempt,
		} = selectFn( SmartLinkingStore );
		return {
			loading: isLoading(),
			error: getError(),
			maxLinks: getMaxLinks(),
			maxLinkWords: getMaxLinkWords(),
			isFullContent: isFullContent(),
			overlayBlocks: getOverlayBlocks(),
			suggestedLinks: getSuggestedLinks(),
			smartLinkingSettings: getSmartLinkingSettings(),
			applyTo: getApplyTo(),
			retrying: isRetrying(),
			retryAttempt: getRetryAttempt(),
		};
	}, [] );

	/**
	 * Loads the Smart Linking store actions.
	 *
	 * @since 3.14.0
	 */
	const {
		setLoading,
		setError,
		setSuggestedLinks,
		addOverlayBlock,
		removeOverlayBlock,
		setSmartLinkingSettings,
		setApplyTo,
		setMaxLinkWords,
		setMaxLinks,
		setIsRetrying,
		incrementRetryAttempt,
	} = useDispatch( SmartLinkingStore );

	/**
	 * Handles the change of a setting.
	 *
	 * Updates the settings in the Smart Linking store and the Settings Context.
	 *
	 * @since 3.14.0
	 *
	 * @param {keyof SmartLinkingSettingsComponent} setting The setting to change.
	 * @param {string | boolean | number}           value   The new value of the setting.
	 */
	const onSettingChange = (
		setting: keyof SmartLinkingSettings,
		value: string | boolean | number,
	): void => {
		setSettingsDebounced( {
			SmartLinking: {
				...settings.SmartLinking,
				[ setting ]: value,
			},
		} );
		if ( setting === 'MaxLinks' ) {
			setMaxLinks( value as number );
		} else if ( setting === 'MaxLinkWords' ) {
			setMaxLinkWords( value as number );
		}
	};

	/**
	 * Loads and prepares the Smart Linking settings from the Settings Context,
	 * if they are not already loaded.
	 *
	 * @since 3.14.0
	 */
	useEffect( () => {
		// If the smartLinkingSettings are not empty object, return early.
		if ( Object.keys( smartLinkingSettings ).length > 0 ) {
			return;
		}

		// Load the settings from the WordPress database and store them in the Smart Linking store.
		const newSmartLinkingSettings: SmartLinkingSettingsProps = {
			maxLinksPerPost: settings.SmartLinking.MaxLinks,
			maxLinkWords: settings.SmartLinking.MaxLinkWords,
		};
		setSmartLinkingSettings( newSmartLinkingSettings );
	}, [ setSmartLinkingSettings, settings ] ); // eslint-disable-line react-hooks/exhaustive-deps

	/**
	 * Loads the selected block and post content.
	 *
	 * @since 3.14.0
	 */
	const {
		allBlocks,
		selectedBlock,
		postContent,
		postPermalink,
	} = useSelect(
		( selectFn ) => {
			const { getSelectedBlock, getBlock, getBlocks } = selectFn(
				'core/block-editor',
			) as GutenbergFunction;
			const { getEditedPostContent, getCurrentPostAttribute } = selectFn(
				'core/editor',
			) as GutenbergFunction;

			return {
				allBlocks: getBlocks(),
				selectedBlock: selectedBlockClientId ? getBlock( selectedBlockClientId ) : getSelectedBlock(),
				postContent: getEditedPostContent(),
				postPermalink: getCurrentPostAttribute( 'link' ),
			};
		},
		[ selectedBlockClientId ],
	);

	const processSmartLinks = async ( links: SmartLink[] ) => {
		// An object to keep track of the number of times each link text has been found across all blocks.
		const occurrenceCounts: LinkOccurrenceCounts = {};

		// Apply the smart links to the content.
		calculateSmartLinkingMatches( allBlocks, links, occurrenceCounts );

		// Update the link suggestions with the new matches
		await setSuggestedLinks( links );
	};

	/**
	 * Generates smart links for the selected block or the entire post content.
	 *
	 * @since 3.14.0
	 */
	const generateSmartLinks = async () => {
		await setLoading( true );
		await setSuggestedLinks( null );
		await setError( null );
		setIsReviewDone( false );

		Telemetry.trackEvent( 'smart_linking_generate_pressed', {
			is_full_content: isFullContent,
			selected_block: selectedBlock?.name ?? 'none',
			context,
		} );

		// If selected block is not set, the overlay will be applied to the entire content.
		await applyOverlay( isFullContent ? 'all' : selectedBlock?.clientId );

		// After 60 * MAX_NUMBER_OR_RETRIES seconds without a response, timeout and remove any overlay.
		const timeout = setTimeout( () => {
			setLoading( false );
			Telemetry.trackEvent( 'smart_linking_generate_timeout', {
				is_full_content: isFullContent,
				selected_block: selectedBlock?.name ?? 'none',
				context,
			} );

			// If selected block is not set, the overlay will be removed from the entire content.
			removeOverlay( isFullContent ? 'all' : selectedBlock?.clientId );
		}, 60000 * MAX_NUMBER_OF_RETRIES );

		const previousApplyTo = applyTo;
		try {
			const generatedLinks = await generateSmartLinksWithRetry( MAX_NUMBER_OF_RETRIES );
			await processSmartLinks( generatedLinks );
			setIsReviewModalOpen( true );
		} catch ( e: any ) { // eslint-disable-line @typescript-eslint/no-explicit-any
			let snackBarMessage = __( 'There was a problem generating smart links.', 'wp-parsely' );

			// Handle the case where the operation was aborted by the user.
			if ( e.code && e.code === ContentHelperErrorCode.ParselyAborted ) {
				snackBarMessage = sprintf(
					/* translators: %d: number of retry attempts, %s: attempt plural */
					__( 'The Smart Linking process was cancelled after %1$d %2$s.', 'wp-parsely' ),
					e.numRetries,
					_n( 'attempt', 'attempts', e.numRetries, 'wp-parsely' )
				);
				e.message = snackBarMessage;
			}

			await setError( e );
			createNotice( 'error', snackBarMessage, {
				type: 'snackbar',
			} );
		} finally {
			await setLoading( false );
			await setApplyTo( previousApplyTo );
			await setIsRetrying( false );
			await removeOverlay( isFullContent ? 'all' : selectedBlock?.clientId );
			clearTimeout( timeout );
		}
	};

	/**
	 * Generates smart links for the selected block or the entire post content,
	 * and retries the fetch if it fails.
	 *
	 * @since 3.15.0
	 *
	 * @param {number} retries The number of retries remaining.
	 *
	 * @return {Promise<SmartLink[]>} The generated smart links.
	 */
	const generateSmartLinksWithRetry = async ( retries: number ): Promise<SmartLink[]> => {
		let generatedLinks: SmartLink[] = [];
		try {
			const generatingFullContent = isFullContent || ! selectedBlock;
			await setApplyTo( generatingFullContent ? ApplyToOptions.All : ApplyToOptions.Selected );

			const urlExclusionList = generateProtocolVariants( postPermalink );

			generatedLinks = await SmartLinkingProvider.getInstance().generateSmartLinks(
				( selectedBlock?.originalContent && ! generatingFullContent )
					? selectedBlock.originalContent
					: postContent,
				maxLinkWords,
				maxLinks,
				urlExclusionList
			);
		} catch ( err: any ) { // eslint-disable-line @typescript-eslint/no-explicit-any
			// If the request was aborted, throw the AbortError to be handled elsewhere.
			if ( err.code && err.code === ContentHelperErrorCode.ParselyAborted ) {
				err.numRetries = MAX_NUMBER_OF_RETRIES - retries;
				throw err;
			}
			// If the error is a retryable fetch error, retry the fetch.
			if ( retries > 0 && err.retryFetch ) {
				// Print the error to the console to help with debugging.
				console.error( err ); // eslint-disable-line no-console
				await setIsRetrying( true );
				await incrementRetryAttempt();
				return await generateSmartLinksWithRetry( retries - 1 );
			}
			// Throw the error to be handled elsewhere.
			throw err;
		}

		return generatedLinks;
	};

	/**
	 * Iterates through blocks of content to apply smart link suggestions based on their text content and specific offset.
	 *
	 * This function processes each block's content to identify and handle text nodes that match provided link suggestions.
	 * It filters out self-referencing links based on the given post permalink, avoids inserting links within existing anchor
	 * elements, and respects the specified offset for each link to determine the correct block.
	 *
	 * Note: The function is recursive for blocks containing inner blocks, ensuring all nested content is processed.
	 *
	 * @since 3.15.0
	 *
	 * @param {Readonly<BlockInstance>[]} blocks           The blocks of content where links should be applied.
	 * @param {SmartLink[]}          links            An array of link suggestions to apply to the content.
	 * @param {LinkOccurrenceCounts}      occurrenceCounts An object to keep track of the number of times each link text has
	 *                                                     been encountered and applied across all blocks.
	 */
	const calculateSmartLinkingMatches = (
		blocks: Readonly<BlockInstance>[],
		links: SmartLink[],
		occurrenceCounts: LinkOccurrenceCounts,
	): void => {
		// Simplify permalink stripping.
		const strippedPermalink = postPermalink
			.replace( /^https?:\/\//, '' ).replace( /\/+$/, '' );

		// Filter out self-referencing links.
		links = links.filter( ( link ) => {
			if ( link.href.includes( strippedPermalink ) ) {
				// eslint-disable-next-line no-console
				console.warn( `PCH Smart Linking: Skipping self-reference link: ${ link.href }` );
				return false;
			}
			return true;
		} );

		blocks.forEach( ( block ) => {
			// Handle inner blocks.
			if ( block.innerBlocks?.length ) {
				calculateSmartLinkingMatches( block.innerBlocks, links, occurrenceCounts );
				return;
			}

			// Skip blocks without original content.
			if ( ! block.originalContent ) {
				return;
			}

			const blockContent: string = getBlockContent( block );
			const doc = new DOMParser().parseFromString( blockContent, 'text/html' );
			const contentElement = doc.body.firstChild;

			if ( ! ( contentElement instanceof HTMLElement ) ) {
				return;
			}

			links.forEach( ( link ) => {
				const textNodes = findTextNodesNotInAnchor( contentElement, link.text );
				const occurrenceKey = `${ link.text }#${ link.offset }`;
				occurrenceCounts[ occurrenceKey ] = occurrenceCounts[ occurrenceKey ] || { encountered: 0, linked: 0 };

				textNodes.forEach( ( node ) => {
					const regex = new RegExp( escapeRegExp( link.text ), 'g' );
					while ( regex.exec( node.textContent ?? '' ) !== null ) {
						const occurrenceCount = occurrenceCounts[ occurrenceKey ];
						occurrenceCount.encountered++;

						if ( occurrenceCount.encountered === link.offset + 1 && occurrenceCount.linked < 1 ) {
							occurrenceCount.linked++;
							link.match = { blockId: block.clientId };
						}
					}
				} );
			} );
		} );
	};

	/**
	 * Applies the overlay to the selected block or the entire post content.
	 *
	 * @since 3.14.0
	 *
	 * @param {string} clientId The client ID of the block to apply the overlay to.\
	 *                          If set to 'all', the overlay will be applied to the entire post content.
	 */
	const applyOverlay = async ( clientId: string = 'all' ): Promise<void> => {
		await addOverlayBlock( clientId );
		disableSave();
	};

	/**
	 * Removes the overlay from the selected block or the entire post content.
	 *
	 * @since 3.14.0
	 *
	 * @param {string} clientId The client ID of the block to remove the overlay from.
	 *                          If set to 'all', the overlay will be removed from the entire post content.
	 */
	const removeOverlay = async ( clientId: string = 'all' ): Promise<void> => {
		await removeOverlayBlock( clientId );

		// If there are no more overlay blocks, enable save.
		if ( overlayBlocks.length === 0 ) {
			enableSave();
		}
	};

	/**
	 * Disables the save button and locks post auto-saving.
	 *
	 * @since 3.14.0
	 */
	const disableSave = (): void => {
		// Lock post saving.
		dispatch( 'core/editor' ).lockPostSaving( 'wp-parsely-block-overlay' );

		// Disable save buttons.
		const saveButtons = document.querySelectorAll( '.edit-post-header__settings>[type="button"]' );
		saveButtons.forEach( ( button ) => {
			button.setAttribute( 'disabled', 'disabled' );
		} );
	};

	/**
	 * Enables the save button and unlocks post auto-saving.
	 *
	 * @since 3.14.0
	 */
	const enableSave = (): void => {
		// Enable save buttons.
		const saveButtons = document.querySelectorAll( '.edit-post-header__settings>[type="button"]' );
		saveButtons.forEach( ( button ) => {
			button.removeAttribute( 'disabled' );
		} );

		// Unlock post saving.
		dispatch( 'core/editor' ).unlockPostSaving( 'wp-parsely-block-overlay' );
	};

	/**
	 * Returns the message for the generate button.
	 *
	 * @since 3.15.0
	 *
	 * @return {string} The message for the generate button.
	 */
	const getGenerateButtonMessage = (): string => {
		if ( retrying ) {
			return sprintf(
				/* translators: %1$d: number of retry attempts, %2$d: maximum number of retries */
				__( 'Retrying… Attempt %1$d of %2$d', 'wp-parsely' ),
				retryAttempt,
				MAX_NUMBER_OF_RETRIES
			);
		}
		if ( loading ) {
			return __( 'Generating Smart Links…', 'wp-parsely' );
		}
		return __( 'Add Smart Links', 'wp-parsely' );
	};

	return (
		<div className="wp-parsely-smart-linking">
			<PanelRow className={ className }>
				<div className="smart-linking-text">
					{ __(
						'Automatically insert links to your most relevant, top performing content.',
						'wp-parsely',
					) }
					<Button
						href="https://docs.parse.ly/plugin-content-helper/#h-smart-linking-beta"
						target="_blank"
						variant="link"
					>
						{ __( 'Learn more about Parse.ly AI', 'wp-parsely' ) }
						<Icon icon={ external } size={ 18 } className="parsely-external-link-icon" />
					</Button>
				</div>
				{ error && (
					<Notice
						status="info"
						onRemove={ () => setError( null ) }
						className="wp-parsely-content-helper-error"
					>
						{ error.Message() }
					</Notice>
				) }
				{ ( isReviewDone && numAddedLinks > 0 ) && (
					<Notice
						status="success"
						onRemove={ () => setIsReviewDone( false ) }
						className="wp-parsely-smart-linking-suggested-links"
					>
						{
							sprintf(
								/* translators: 1 - number of smart links generated */
								__( 'Successfully added %s smart links.', 'wp-parsely' ),
								numAddedLinks > 0 ? numAddedLinks : suggestedLinks.length,
							)
						}
					</Notice>
				) }
				<SmartLinkingSettingsComponent
					disabled={ loading }
					selectedBlock={ selectedBlock?.clientId }
					onSettingChange={ onSettingChange }
				/>
				<div className="smart-linking-generate">
					<Button
						onClick={ generateSmartLinks }
						variant="primary"
						isBusy={ loading }
						disabled={ loading }
					>
						{ getGenerateButtonMessage() }
					</Button>
				</div>
			</PanelRow>

			<SmartLinkingReviewModal
				isOpen={ isReviewModalOpen }
				onAppliedLink={ () => {
					console.log( 'Link applied' );
					setNumAddedLinks( ( num ) => num + 1 );
				}	}
				onClose={ () => {
					setIsReviewDone( true );
					setIsReviewModalOpen( false );
				} }
			/>
		</div>
	);
};

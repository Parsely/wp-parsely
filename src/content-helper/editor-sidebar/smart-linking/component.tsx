/**
 * WordPress dependencies
 */
import { Button, CheckboxControl, Disabled, Notice, PanelRow } from '@wordpress/components';
import { dispatch, select, useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { GutenbergFunction } from '../../../@types/gutenberg/types';
import { Telemetry } from '../../../js/telemetry/telemetry';
import { SidebarSettings, useSettings } from '../../common/settings';
import { SmartLinkingSettings } from './component-settings';
import { SmartLinkingProvider, LinkSuggestion } from './provider';
import { SmartLinkingSettingsProps, SmartLinkingStore } from './store';
import { escapeRegExp, replaceNthOccurrence } from './utils';

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
 * Smart Linking Panel.
 *
 * @since 3.14.0
 *
 * @param { Readonly<SmartLinkingPanelProps> } props The component's props.
 *
 * @return { JSX.Element } The JSX Element.
 */
export const SmartLinkingPanel = ( {
	className,
	selectedBlockClientId,
	context = SmartLinkingPanelContext.Unknown,
}: Readonly<SmartLinkingPanelProps> ): JSX.Element => {
	const { settings, setSettings } = useSettings<SidebarSettings>();

	/**
	 * Loads the Smart Linking store.
	 *
	 * @since 3.14.0
	 */
	const {
		loading,
		fullContent,
		overlayBlocks,
		error,
		suggestedLinks,
		maxLinks,
		maxLinkWords,
		smartLinkingSettings,
	} = useSelect( ( selectFn ) => {
		const {
			isLoading,
			getOverlayBlocks,
			getSuggestedLinks,
			getError,
			isFullContent,
			getMaxLinks,
			getMaxLinkWords,
			getSmartLinkingSettings,
		} = selectFn( SmartLinkingStore );
		return {
			loading: isLoading(),
			error: getError(),
			maxLinks: getMaxLinks(),
			maxLinkWords: getMaxLinkWords(),
			fullContent: isFullContent(),
			overlayBlocks: getOverlayBlocks(),
			suggestedLinks: getSuggestedLinks(),
			smartLinkingSettings: getSmartLinkingSettings(),
		};
	}, [] );

	/**
	 * Loads the Smart Linking store actions.
	 *
	 * @since 3.14.0
	 */
	const {
		setLoading,
		setFullContent,
		setError,
		setSuggestedLinks,
		addOverlayBlock,
		removeOverlayBlock,
		setSmartLinkingSettings,
	} = useDispatch( SmartLinkingStore );

	/**
	 * Handles the change of a setting.
	 *
	 * Updates the settings in the Smart Linking store and the Settings Context.
	 *
	 * @since 3.14.0
	 *
	 * @param { keyof SidebarSettings }     setting The setting to change.
	 * @param { string | boolean | number } value   The new value of the setting.
	 */
	const onSettingChange = ( setting: keyof SidebarSettings, value: string|boolean|number ): void => {
		setSettings( { [ setting ]: value } );
		setSmartLinkingSettings( { [ setting ]: value } );
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
			maxLinksPerPost: settings.SmartLinkingMaxLinks,
			maxLinkWords: settings.SmartLinkingMaxLinkWords,
			settingsOpen: settings.SmartLinkingSettingsOpen,
		};
		setSmartLinkingSettings( newSmartLinkingSettings );
	}, [ setSmartLinkingSettings, settings ] ); // eslint-disable-line react-hooks/exhaustive-deps

	/**
	 * Loads the selected block and post content.
	 *
	 * @since 3.14.0
	 */
	const {
		selectedBlock,
		postContent,
	} = useSelect( ( selectFn ) => {
		const { getSelectedBlock, getBlock } = selectFn( 'core/block-editor' ) as GutenbergFunction;
		const { getEditedPostContent } = selectFn( 'core/editor' ) as GutenbergFunction;

		return {
			selectedBlock: selectedBlockClientId ? getBlock( selectedBlockClientId ) : getSelectedBlock(),
			postContent: getEditedPostContent(),
		};
	}, [ selectedBlockClientId ] );

	/**
	 * Generates smart links for the selected block or the entire post content.
	 *
	 * @since 3.14.0
	 */
	const generateSmartLinks = () => async (): Promise<void> => {
		await setLoading( true );
		await setSuggestedLinks( null );
		await setError( null );

		Telemetry.trackEvent( 'smart_linking_generate_pressed', {
			is_full_content: fullContent,
			selected_block: selectedBlock?.name ?? 'none',
			context,
		} );

		// If selected block is not set, the overlay will be applied to the entire content.
		await applyOverlay( fullContent ? 'all' : selectedBlock?.clientId );

		// After 60 seconds without a response, timeout and remove any overlay.
		const timeout = setTimeout( () => {
			setLoading( false );
			Telemetry.trackEvent( 'smart_linking_generate_timeout', {
				is_full_content: fullContent,
				selected_block: selectedBlock?.name ?? 'none',
				context,
			} );

			// If selected block is not set, the overlay will be removed from the entire content.
			removeOverlay( fullContent ? 'all' : selectedBlock?.clientId );
		}, 60000 );

		try {
			const generatingFullContent = fullContent || ! selectedBlock;
			let generatedLinks = [];
			if ( selectedBlock?.originalContent && ! generatingFullContent ) {
				generatedLinks = await SmartLinkingProvider.generateSmartLinks(
					selectedBlock?.originalContent,
					maxLinkWords,
					maxLinks
				);
			} else {
				generatedLinks = await SmartLinkingProvider.generateSmartLinks(
					postContent,
					maxLinkWords,
					maxLinks
				);
			}
			await setSuggestedLinks( generatedLinks );
			applySmartLinks( generatedLinks );
		} catch ( e: any ) { // eslint-disable-line @typescript-eslint/no-explicit-any
			setError( e );
		} finally {
			await setLoading( false );
			await removeOverlay( fullContent ? 'all' : selectedBlock?.clientId );
			clearTimeout( timeout );
		}
	};

	/**
	 * Applies the smart links to the selected block or the entire post content.
	 *
	 * @since 3.14.0
	 *
	 * @param {LinkSuggestion[]} links The smart links to apply.
	 */
	const applySmartLinks = ( links: LinkSuggestion[] ): void => {
		Telemetry.trackEvent( 'smart_linking_applied', {
			is_full_content: fullContent,
			selected_block: selectedBlock?.name ?? 'none',
			links_count: links.length,
			context,
		} );

		// Get the original content of the selected block or the entire post content.
		let originalContent = '';
		if ( selectedBlock && ! fullContent ) {
			originalContent = selectedBlock.attributes.content;
		} else {
			originalContent = postContent;
		}

		let newContent = originalContent; // Fallback to original content if no links are found.
		for ( const link of links ) {
			// Check if the content already contains the link, skip if so.
			if ( originalContent.includes( link.title ) && originalContent.includes( link.href ) ) {
				continue;
			}

			// Escape the link text to convert regex special characters to literal characters.
			link.text = escapeRegExp( link.text );

			// Check if the amount of link.text occurrences in the newContent is bigger than the amount of
			// link.text occurrences in the originalContent, if so, it means that we've introduced another
			// occurrence of the link.text in the newContent, so we need to increase the offset.
			const linkTextRegex = new RegExp( link.text, 'g' );
			const newContentMatches = newContent.match( linkTextRegex );
			const originalContentMatches = originalContent.match( linkTextRegex );
			if ( ( newContentMatches && originalContentMatches ) &&
				newContentMatches?.length > originalContentMatches?.length ) {
				link.offset++;
			}

			const anchor = `<a href="${ link.href }" title="${ link.title }">${ link.text }</a>`;

			// Regex that searches for the link.text, but if the text is inside an HTML anchor,
			// the anchor itself is also selected and replaced with the new anchor.
			const searchRegex = new RegExp( `(${ link.text }|<a[^>]*>${ link.text }</a>)` );
			newContent = replaceNthOccurrence( newContent, searchRegex, anchor, link.offset );
		}

		// Either update the selected block or the entire post content.
		if ( selectedBlock && ! fullContent ) {
			dispatch( 'core/block-editor' ).updateBlockAttributes( selectedBlock.clientId, { content: newContent } );
		} else {
			dispatch( 'core/editor' ).editPost( { content: newContent } );
		}
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

		// Select a block after removing the overlay, only if we're using the block inspector.
		if ( context === SmartLinkingPanelContext.BlockInspector ) {
			if ( 'all' !== clientId && ! fullContent ) {
				dispatch( 'core/block-editor' ).selectBlock( clientId );
			} else {
				const firstBlock = select( 'core/block-editor' ).getBlockOrder()[ 0 ];
				// Select the first block in the post.
				dispatch( 'core/block-editor' ).selectBlock( firstBlock );
			}
		}

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

	return (
		<div className="wp-parsely-smart-linking">
			<PanelRow className={ className }>
				<div className="wp-parsely-smart-linking-text">
					{ selectedBlock
						? __( 'Automatically generate the most relevant links with organic search traffic ' +
							'in past month for a block of text using the Parse.ly API.', 'wp-parsely' )
						: __( 'Automatically generate the most relevant links with organic search traffic ' +
							'in past month for the entire post using the Parse.ly API. You can also select a ' +
							'specific block to generate smart links for.', 'wp-parsely' ) }
				</div>
				{ error && (
					<Notice
						status="info"
						isDismissible={ false }
						className="wp-parsely-content-helper-error"
					>
						{ error.message }
					</Notice>
				) }
				{ suggestedLinks !== null && (
					<Notice
						status="success"
						isDismissible={ false }
						className="wp-parsely-smart-linking-suggested-links"
					>
						{
							/* translators: 1 - number of smart links generated */
							sprintf( __( 'Successfully added %s smart links.', 'wp-parsely' ), suggestedLinks.length )
						}
					</Notice>
				) }
				<SmartLinkingSettings
					disabled={ loading }
					onSettingChange={ onSettingChange }
				/>
				<div className="wp-parsely-smart-linking-generate">
					<Button
						onClick={ generateSmartLinks() }
						variant="primary"
						isBusy={ loading }
						disabled={ loading }
					>
						{ loading ? __( 'Generating…', 'wp-parsely' ) : __( 'Add Smart Links', 'wp-parsely' ) }
					</Button>
					<Disabled isDisabled={ loading }>
						<CheckboxControl
							checked={ selectedBlock ? fullContent : true }
							disabled={ loading }
							onChange={ selectedBlock ? setFullContent : () => { /* empty */ } }
							label={ __( 'Add smart links for the entire post', 'wp-parsely' ) }
						/>
					</Disabled>
				</div>
			</PanelRow>
		</div>
	);
};

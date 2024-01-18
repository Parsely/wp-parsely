/**
 * WordPress dependencies
 */
import { Button, CheckboxControl, Disabled, Notice, PanelRow } from '@wordpress/components';
import { dispatch, select, useDispatch, useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { GutenbergFunction } from '../../../@types/gutenberg/types';
import { Telemetry } from '../../../js/telemetry/telemetry';
import { CrossLinkerSettings } from './component-settings';
import { CrossLinkerStore } from './store';
import { CrossLinkerProvider, LinkSuggestion } from './provider';
import { escapeRegExp, replaceNthOccurrence } from './utils';

/**
 * Defines the props structure for CrossLinkerPanel.
 *
 * @since 3.14.0
 */
type CrossLinkerPanelProps = {
	className?: string;
	selectedBlockClientId?: string;
	context?: CrossLinkerPanelContext;
}

export enum CrossLinkerPanelContext {
	Unknown = 'unknown',
	ContentHelperSidebar = 'content_helper_sidebar',
	BlockInspector = 'block_inspector',
}

/**
 * Panel for the Cross Linker.
 *
 * @since 3.14.0
 *
 * @param { Readonly<CrossLinkerPanelProps> } props The component's props.
 */
export const CrossLinkerPanel = ( {
	className,
	selectedBlockClientId,
	context = CrossLinkerPanelContext.Unknown,
}: Readonly<CrossLinkerPanelProps> ) => {
	/**
	 * Load the Cross Linker store.
	 */
	const {
		loading,
		fullContent,
		overlayBlocks,
		error,
		suggestedLinks,
		maxLinkLength,
		maxLinks,
	} = useSelect( ( selectFn ) => {
		const {
			isLoading,
			getOverlayBlocks,
			getSuggestedLinks,
			getError,
			isFullContent,
			getMaxLinkLength,
			getMaxLinks,
		} = selectFn( CrossLinkerStore );
		return {
			loading: isLoading(),
			error: getError(),
			fullContent: isFullContent(),
			overlayBlocks: getOverlayBlocks(),
			suggestedLinks: getSuggestedLinks(),
			maxLinkLength: getMaxLinkLength(),
			maxLinks: getMaxLinks(),
		};
	}, [] );

	const {
		setLoading,
		setFullContent,
		setError,
		setSuggestedLinks,
		addOverlayBlock,
		removeOverlayBlock,
	} = useDispatch( CrossLinkerStore );

	/**
	 * Load the selected block and post content.
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
	 * Generates cross-links for the selected block or the entire post content.
	 *
	 * @since 3.14.0
	 */
	const generateCrossLinks = () => async () => {
		await setLoading( true );
		await setSuggestedLinks( null );
		await setError( null );

		Telemetry.trackEvent( 'cross_linker_generate_pressed', {
			is_full_content: fullContent,
			selected_block: selectedBlock?.name ?? 'none',
			context,
		} );

		// If selected block is not set, the overlay will be applied to the entire content.
		await applyOverlay( fullContent ? 'all' : selectedBlock?.clientId );

		// After 60 seconds without a response, timeout and remove any overlay.
		const timeout = setTimeout( () => {
			setLoading( false );
			Telemetry.trackEvent( 'cross_linker_generate_timeout', {
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
				generatedLinks = await CrossLinkerProvider.generateCrossLinks( selectedBlock?.originalContent, maxLinkLength, maxLinks );
			} else {
				generatedLinks = await CrossLinkerProvider.generateCrossLinks( postContent, maxLinkLength, maxLinks );
			}
			await setSuggestedLinks( generatedLinks );
			applyCrossLinks( generatedLinks );
		} catch ( e: any ) { // eslint-disable-line @typescript-eslint/no-explicit-any
			setError( e );
		} finally {
			await setLoading( false );
			await removeOverlay( fullContent ? 'all' : selectedBlock?.clientId );
			clearTimeout( timeout );
		}
	};

	/**
	 * Applies the cross-links to the selected block or the entire post content.
	 *
	 * @since 3.14.0
	 *
	 * @param {LinkSuggestion[]} links The cross-links to apply.
	 */
	const applyCrossLinks = ( links: LinkSuggestion[] ) => {
		Telemetry.trackEvent( 'cross_linker_applied', {
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
			// Checks if the content already contains the link, skip if so.
			if ( originalContent.includes( link.title ) && originalContent.includes( link.href ) ) {
				continue;
			}

			// Escape the link text to convert regex special characters to literal characters.
			link.text = escapeRegExp( link.text );

			// Checks if the amount of link.text occurrences in the newContent is bigger than the amount of
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
	 * @param {string} clientId The client ID of the block to apply the overlay to.\
	 *                          If set to 'all', the overlay will be applied to the entire post content.
	 */
	const applyOverlay = async ( clientId: string = 'all' ) => {
		await addOverlayBlock( clientId );
		disableSave();
	};

	/**
	 * Removes the overlay from the selected block or the entire post content.
	 *
	 * @param {string} clientId The client ID of the block to remove the overlay from.
	 *                          If set to 'all', the overlay will be removed from the entire post content.
	 */
	const removeOverlay = async ( clientId: string = 'all' ) => {
		await removeOverlayBlock( clientId );

		// Select a block after removing the overlay, only if we're using the block inspector.
		if ( context === CrossLinkerPanelContext.BlockInspector ) {
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
	 * Disables the save button and locks the post auto saving.
	 */
	const disableSave = () => {
		// Lock post saving.
		dispatch( 'core/editor' ).lockPostSaving( 'wp-parsely-block-overlay' );

		// Disable save buttons.
		const saveButtons = document.querySelectorAll( '.edit-post-header__settings>[type="button"]' );
		saveButtons.forEach( ( button ) => {
			button.setAttribute( 'disabled', 'disabled' );
		} );
	};

	/**
	 * Enables the save button and unlocks the post auto saving.
	 */
	const enableSave = () => {
		// Enable save buttons.
		const saveButtons = document.querySelectorAll( '.edit-post-header__settings>[type="button"]' );
		saveButtons.forEach( ( button ) => {
			button.removeAttribute( 'disabled' );
		} );

		// Unlock post saving.
		dispatch( 'core/editor' ).unlockPostSaving( 'wp-parsely-block-overlay' );
	};

	return (
		<div className="wp-parsely-cross-linker">
			<PanelRow className={ className }>
				<div className="wp-parsely-cross-linker-text">
					{ selectedBlock
						? __( 'Automatically generate the most relevant links with organic search traffic ' +
							'in past month for a block of text using the Parse.ly API.', 'wp-parsely' )
						: __( 'Automatically generate the most relevant links with organic search traffic ' +
							'in past month for the entire post using the Parse.ly API. You can also select a ' +
							'specific block to generate cross links for.', 'wp-parsely' ) }
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
						className="wp-parsely-cross-linker-suggested-links"
					>
						{
							/* translators: 1 - number of cross links generte */
							sprintf( __( 'Successfully added %s smart links.', 'wp-parsely' ), suggestedLinks.length )
						}
					</Notice>
				) }
				<CrossLinkerSettings disabled={ loading } />
				<div className="wp-parsely-cross-linker-generate">
					<Button
						onClick={ generateCrossLinks() }
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

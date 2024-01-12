/**
 * WordPress dependencies
 */
import { Button, CheckboxControl, Disabled, Notice, PanelRow } from '@wordpress/components';
import { dispatch, useDispatch, useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { GutenbergFunction } from '../../../@types/gutenberg/types';
import { CrossLinkerSettings } from './component-settings';
import { CrossLinkerStore } from './store';
import { CrossLinkerProvider, LinkSuggestion } from './provider';
import { ContentHelperError } from '../../common/content-helper-error';
import { escapeRegExp, replaceNthOccurrence } from './utils';

/**
 * Defines the props structure for CrossLinkerPanel.
 *
 * @since 3.13.0
 */
type CrossLinkerPanelProps = {
	className?: string;
	selectedBlockClientId?: string;
}

/**
 * Panel for the Cross Linker.
 *
 * @since 3.13.0
 *
 * @param { Readonly<CrossLinkerPanelProps> } props The component's props.
 */
export const CrossLinkerPanel = ( { className, selectedBlockClientId }: Readonly<CrossLinkerPanelProps> ) => {
	const [ error, setError ] = useState<ContentHelperError>();

	/**
	 * Load the Cross Linker store.
	 */
	const {
		loading,
		fullContent,
		overlayBlocks,
		suggestedLinks,
		maxLinkLength,
		maxLinks,
	} = useSelect( ( select ) => {
		const {
			isLoading,
			getOverlayBlocks,
			getSuggestedLinks,
			isFullContent,
			getMaxLinkLength,
			getMaxLinks,
		} = select( CrossLinkerStore );
		return {
			loading: isLoading(),
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
		setSuggestedLinks,
		addOverlayBlock,
		removeOverlayBlock,
	} = useDispatch( CrossLinkerStore );

	/**
	 * Load the selected block and post content.
	 */
	const { selectedBlock, postContent } = useSelect( ( select ) => {
		const { getSelectedBlock, getBlock } = select( 'core/block-editor' ) as GutenbergFunction;
		const { getEditedPostContent } = select( 'core/editor' ) as GutenbergFunction;

		return {
			selectedBlock: selectedBlockClientId ? getBlock( selectedBlockClientId ) : getSelectedBlock(),
			postContent: getEditedPostContent(),
		};
	}, [ selectedBlockClientId ] );

	/**
	 * Generates cross-links for the selected block or the entire post content.
	 *
	 * @since 3.13.0
	 */
	const generateCrossLinks = () => async () => {
		await setLoading( true );
		await setSuggestedLinks( null );
		const generatingFullContent = fullContent || ! selectedBlock;

		// If selected block is not set, the overlay will be applied to the entire content.
		await applyOverlay( fullContent ? 'all' : selectedBlock?.clientId );

		// After 60 seconds without a response, timeout and remove any overlay.
		const timeout = setTimeout( () => {
			setLoading( false );
			// If selected block is not set, the overlay will be removed from the entire content.
			removeOverlay( fullContent ? 'all' : selectedBlock?.clientId );
		}, 60000 );

		try {
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

			// Select the block after generating cross-links.
			if ( selectedBlock ) {
				dispatch( 'core/block-editor' ).selectBlock( selectedBlock.clientId );
			}
		}
	};

	/**
	 * Applies the cross-links to the selected block or the entire post content.
	 *
	 * @since 3.13.0
	 *
	 * @param {LinkSuggestion[]} links The cross-links to apply.
	 */
	const applyCrossLinks = ( links: LinkSuggestion[] ) => {
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

			const anchor = `<a href="${ link.href }" title="${ link.title }">${ link.text }</a>`;

			// Escape the link text to convert regex special characters to literal characters.
			link.text = escapeRegExp( link.text );

			// Regex that searches for the link.text, but if the text is inside an HTML anchor,
			// the anchor itself is also selected and replaced with the new anchor.
			const searchExpression = `(${ link.text }|<a[^>]*>${ link.text }</a>)`;
			newContent = replaceNthOccurrence( newContent, searchExpression, anchor, link.offset );
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
						? __( 'Generate cross links automatically for this block using Parse.ly AI.', 'wp-parsely' )
						: __( 'Generate cross links for the content of this post using Parse.ly AI, or select an individual block to generate cross links for that block.', 'wp-parsely' ) }
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
							sprintf( __( 'Successfully generated %s cross links.', 'wp-parsely' ), suggestedLinks.length )
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
						{ loading ? __( 'Generating…', 'wp-parsely' ) : __( 'Generate Cross Links', 'wp-parsely' ) }
					</Button>
					<Disabled isDisabled={ loading }>
						<CheckboxControl
							checked={ selectedBlock ? fullContent : true }
							disabled={ loading }
							onChange={ selectedBlock ? setFullContent : () => { /* empty */ } }
							label={ __( 'Generate cross links for the entire content', 'wp-parsely' ) }
						/>
					</Disabled>
				</div>
			</PanelRow>
		</div>
	);
};
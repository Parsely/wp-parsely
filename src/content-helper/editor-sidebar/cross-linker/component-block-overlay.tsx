/**
 * WordPress dependencies
 */
import { Spinner } from '@wordpress/components';
import { dispatch, useSelect } from '@wordpress/data';
import { createPortal, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { CrossLinkerStore } from './store';

/**
 * Defines the props structure for BlockOverlay.
 *
 * @since 3.13.0
 */
type BlockOverlayProps = {
	selectedBlockClientId: string;
	label: string;
};

/**
 * Draws an overlay over the selected block.
 *
 * @since 3.13.0
 *
 * @param {BlockOverlayProps} props The component's props.
 */
export const BlockOverlay = ( {
	selectedBlockClientId,
	label,
}: Readonly<BlockOverlayProps> ) => {
	// Create a container element for the overlay.
	const [ container ] = useState<HTMLDivElement>( document.createElement( 'div' ) );
	container.className = 'wp-parsely-block-overlay';
	if ( selectedBlockClientId === 'all' ) {
		container.className += ' full-content-overlay';
	}

	// When clicking the overlay, we want the underlying block to be selected.
	container.onclick = ( e ) => {
		e.stopPropagation();
		e.stopImmediatePropagation();

		if ( selectedBlockClientId === 'all' ) {
			return;
		}

		dispatch( 'core/block-editor' ).selectBlock( selectedBlockClientId, -1 );

		// When nested blocks are selected, the block editor will focus the outermost block.
		// We need to blur the focused element to avoid this.
		const activeElement = container.ownerDocument.activeElement;
		( activeElement as HTMLElement ).blur();
	};

	useEffect( () => {
		if ( ! selectedBlockClientId ) {
			return;
		}

		/**
		 * If the selected block is the "All content" block, we need to append the overlay
		 * to the editor element instead of the block element.
		 */
		if ( selectedBlockClientId === 'all' ) {
			const editorElement = document.querySelector( '.interface-navigable-region.interface-interface-skeleton__content' );
			editorElement?.appendChild( container );

			// Set overflow to hidden
			editorElement?.setAttribute( 'style', 'overflow: hidden' );
			container.style.top = editorElement?.scrollTop + 'px';

			return () => {
				if ( editorElement?.contains( container ) ) {
					editorElement.removeChild( container );
				}
				// Restore overflow
				editorElement?.setAttribute( 'style', '' );
				container.style.top = '';
			};
		}

		const blockElement = document.querySelector( `[data-block="${ selectedBlockClientId }"]` );

		// Disable changes on the block element
		blockElement?.setAttribute( 'contenteditable', 'false' );
		blockElement?.setAttribute( 'aria-disabled', 'true' );

		// Insert the container in the block element
		blockElement?.appendChild( container );

		// Remove the container on component unload
		return () => {
			// Enable changes on the block element
			blockElement?.setAttribute( 'contenteditable', 'true' );
			blockElement?.removeAttribute( 'aria-disabled' );

			if ( blockElement?.contains( container ) ) {
				blockElement.removeChild( container );
			}
		};
	} );

	return createPortal(
		<div className="wp-parsely-block-overlay-label">
			<Spinner />
			<span>{ label }</span>
		</div>,
		container
	);
};

/**
 * Draws the multiple block overlays that are currently stored in the Cross Linker store.
 *
 * @since 3.13.0
 */
export const BlockOverlayContainer = ( ) => {
	const { overlayBlocks } = useSelect( ( select ) => {
		const { getOverlayBlocks } = select( CrossLinkerStore );

		return {
			overlayBlocks: getOverlayBlocks(),
		};
	}, [] );

	return (
		<>
			{ overlayBlocks.map( ( blockId ) => (
				<BlockOverlay
					label={ __( 'Generating cross links…', 'wp-parsely' ) }
					selectedBlockClientId={ blockId }
					key={ blockId }
				/>
			) ) }
		</>
	);
};


import { Spinner } from '@wordpress/components';
import { createPortal, useEffect, useState } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';
import { CrossLinkerStore } from '../store';
import { registerPlugin } from '@wordpress/plugins';
import { __ } from '@wordpress/i18n';

type BlockOverlayProps = {
	selectedBlockClientId: string;
	label: string;
}

export const BlockOverlay = ( {
	selectedBlockClientId,
	label,
}: BlockOverlayProps ) => {
	const [ container ] = useState<HTMLDivElement>( document.createElement( 'div' ) );
	container.className = 'wp-parsely-block-overlay';
	if ( selectedBlockClientId === 'all' ) {
		container.className += ' full-content-overlay';
	}

	// When clicking the overlay, we want the underlying block to be selected.
	container.onclick = () => {
		if ( selectedBlockClientId === 'all' ) {
			return;
		}
		dispatch( 'core/block-editor' ).selectBlock( selectedBlockClientId );
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
				editorElement?.removeChild( container );
				// Restore overflow
				editorElement?.setAttribute( 'style', '' );
				container.style.top = '';
			};
		}

		const blockElement = document.querySelector( `[data-block="${ selectedBlockClientId }"]` );

		// Disable changes on the block element
		blockElement?.setAttribute( 'contenteditable', 'false' );
		blockElement?.setAttribute( 'aria-disabled', 'true' );

		// Disable interaction with the block
		if ( blockElement instanceof HTMLElement ) {
			//blockElement.style.pointerEvents = 'none';
			blockElement.style.userSelect = 'none';
		}

		// Insert the container in the block element
		blockElement?.appendChild( container );

		// Remove the container on component unload
		return () => {
			// Enable changes on the block element
			blockElement?.setAttribute( 'contenteditable', 'true' );
			blockElement?.removeAttribute( 'aria-disabled' );

			// Restore interaction
			if ( blockElement instanceof HTMLElement ) {
				//blockElement.style.pointerEvents = '';
				blockElement.style.userSelect = '';
			}

			blockElement?.removeChild( container );
		};
	} );

	return createPortal(
		<>
			<div className="wp-parsely-block-overlay-label">
				<Spinner />
				<span>{ label }</span>
			</div>
		</>,
		container
	);
};

/**
 * Draws the multiple block overlays that are currently listed in the Cross Linker store.
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
			{ overlayBlocks.map( ( blockId, index ) => (
				<BlockOverlay
					label={ __( 'Generating cross links…', 'wp-parsely' ) }
					selectedBlockClientId={ blockId }
					key={ index }
				/>
			) ) }
		</>
	);
};


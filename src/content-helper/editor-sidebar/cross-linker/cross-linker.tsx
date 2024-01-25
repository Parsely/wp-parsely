/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import { Telemetry } from '../../../js/telemetry/telemetry';
import { BetaBadge } from '../../common/components/beta-badge';
import { LeafIcon } from '../../common/icons/leaf-icon';
import { CrossLinkerPanel, CrossLinkerPanelContext } from './component';
import { BlockOverlayContainer } from './component-block-overlay';
import './cross-linker.scss';

/**
 * Cross linker inspector control panel component.
 *
 * @since 3.14.0
 */
const CrossLinkerInspectorControlPanel = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( props.name !== 'core/paragraph' || props.isSelected === false ) {
			return <BlockEdit { ...props } />;
		}
		return (
			<>
				<BlockEdit { ...props } />
				{ /* @ts-ignore */ }
				<InspectorControls group="list">
					<PanelBody
						title="Smart Linking"
						className="wp-parsely-block-ai-controls"
						icon={ <><LeafIcon /> <BetaBadge /></> }
						onToggle={ ( next ) => {
							Telemetry.trackEvent( 'cross_linker_block_inspector_panel_toggled', { open: next } );
						} }
					>
						<CrossLinkerPanel
							selectedBlockClientId={ props.clientId }
							context={ CrossLinkerPanelContext.BlockInspector }
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withInspectorControl' );

/**
 * Initializes the cross linker, by adding the cross linker panel to the paragraph block.
 * Also registers the block overlay container.
 *
 * @since 3.14.0
 */
export const initCrossLinker = (): void => {
	/**
	 * Add cross linker inspector control panel to paragraph block.
	 */
	addFilter(
		'editor.BlockEdit',
		'my-plugin/with-inspector-controls',
		CrossLinkerInspectorControlPanel
	);

	/**
	 * Register the block overlay container to allow drawing the overlay over the blocks
	 * that are being processed.
	 */
	registerPlugin( 'wp-parsely-block-overlay', {
		render: BlockOverlayContainer,
	} );
};

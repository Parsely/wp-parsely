import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { BetaBadge } from '../common/components/beta-badge';
import { LeafIcon } from '../common/icons/leaf-icon';
import { CrossLinkerPanel } from './components/cross-linker-panel';
import { registerPlugin } from "@wordpress/plugins";
import { BlockOverlayContainer } from "./components/block-overlay";

/**
 * Cross linker inspector control panel component
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
						title="Cross Linker"
						className="wp-parsely-block-ai-controls"
						icon={ <><LeafIcon /> <BetaBadge /></> }
					>
						<CrossLinkerPanel
							selectedBlockClientId={ props.clientId }
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withInspectorControl' );

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

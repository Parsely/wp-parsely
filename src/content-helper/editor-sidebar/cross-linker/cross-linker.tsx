/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import { BetaBadge } from '../../common/components/beta-badge';
import { useSaveSettings } from '../../common/hooks/useSaveSettings';
import { LeafIcon } from '../../common/icons/leaf-icon';
import { VerifyCredentials } from '../../common/verify-credentials';
import { getSettingsFromJson, SidebarSettings } from '../editor-sidebar';
import { CrossLinkerPanel, CrossLinkerPanelContext } from './component';
import { BlockOverlayContainer } from './component-block-overlay';
import { Telemetry } from '../../../js/telemetry/telemetry';
import './cross-linker.scss';
import { CrossLinkerStore } from './store';

/**
 * Cross linker inspector control panel component
 *
 * @since 3.14.0
 */
const CrossLinkerInspectorControlPanel = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Since we are outside the context of the EditorSidebar, we need to initialize the settings from
		// the CrossLinkerStore.
		const { settings } = useSelect( ( select ) => {
			const { getSettings } = select( CrossLinkerStore );
			return {
				// Since we want the panel open by default in the block inspector context, set the initial
				// CrossLinksOpen setting value to true.
				settings: getSettings() ?? { ...getSettingsFromJson(), CrossLinksOpen: true },
			};
		}, [] );

		const { setSettings } = useDispatch( CrossLinkerStore );

		/**
		 * Saves the settings into the WordPress database, when a setting changes.
		 *
		 * @since 3.14.0
		 */
		useSaveSettings( 'editor-sidebar-settings', settings );

		// Only show the cross linker panel for the paragraph block.
		if ( props.name !== 'core/paragraph' || props.isSelected === false ) {
			return <BlockEdit { ...props } />;
		}

		/**
		 * Updates the passed setting.
		 *
		 * @since 3.13.0
		 *
		 * @param {keyof SidebarSettings} setting The setting to be updated.
		 * @param {string|boolean|number} value   The new settings value.
		 */
		const handleSettingChange = (
			setting: keyof SidebarSettings, value: string|boolean|number
		): void => {
			setSettings( { ...settings, [ setting ]: value } );
		};

		return (
			<>
				<BlockEdit { ...props } />
				{ /* @ts-ignore */ }
				<InspectorControls group="list">
					<PanelBody
						title="Cross Linker"
						initialOpen={ settings.CrossLinksOpen }
						className="wp-parsely-block-ai-controls"
						icon={ <><LeafIcon /> <BetaBadge /></> }
						onToggle={ ( next ) => {
							handleSettingChange( 'CrossLinksOpen', next );
							Telemetry.trackEvent( 'cross_linker_block_inspector_panel_toggled', { open: next } );
						} }
					>
						<VerifyCredentials>
							<CrossLinkerPanel
								selectedBlockClientId={ props.clientId }
								context={ CrossLinkerPanelContext.BlockInspector }
								onSettingChange={ handleSettingChange }
								sidebarSettings={ settings }
							/>
						</VerifyCredentials>
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
export const initCrossLinker = () => {
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

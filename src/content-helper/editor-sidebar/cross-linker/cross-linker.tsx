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
import { SettingsProvider, SidebarSettings, useSettings } from '../../common/settings';
import { VerifyCredentials } from '../../common/verify-credentials';
import { getSettingsFromJson } from '../editor-sidebar';
import { CrossLinkerPanel, CrossLinkerPanelContext } from './component';
import { BlockOverlayContainer } from './component-block-overlay';
import './cross-linker.scss';

export const DEFAULT_MAX_LINKS = 10;

export const DEFAULT_MAX_LINK_WORDS = 4;
/**
 * Cross linker inspector control panel component.
 *
 * @since 3.14.0
 */
const CrossLinkerInspectorControlPanel = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { settings, setSettings } = useSettings<SidebarSettings>();

		/**
		 * Updates the passed setting.
		 *
		 * @since 3.14.0
		 *
		 * @param {keyof SidebarSettings} setting The setting to be updated.
		 * @param {string|boolean|number} value   The new setting value.
		 */
		const handleSettingChange = (
			setting: keyof SidebarSettings, value: string|boolean|number
		): void => {
			setSettings( { ...settings, [ setting ]: value } );
		};

		return (
			<SettingsProvider
				endpoint="editor-sidebar-settings"
				defaultSettings={ getSettingsFromJson() }
			>
				<BlockEdit { ...props } />
				{ /* @ts-ignore */ }
				<InspectorControls group="list">
					<PanelBody
						title="Smart Linking"
						initialOpen={ settings.CrossLinksOpen }
						className="wp-parsely-panel wp-parsely-smart-linking-panel"
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
			</SettingsProvider>
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

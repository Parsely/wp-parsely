/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { compose, createHigherOrderComponent } from '@wordpress/compose';
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
 * Higher order component to add the settings provider to the block edit component.
 * This is required to provide the settings to the cross linker panel.
 *
 * @since 3.14.0
 */
const withSettingsProvider = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( ! props.isSelected || props.name !== 'core/paragraph' ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<SettingsProvider
				endpoint="editor-sidebar-settings"
				defaultSettings={ getSettingsFromJson() }
			>
				<BlockEdit { ...props } />
			</SettingsProvider>
		);
	};
}, 'withSettingsProvider' );

/**
 * Cross linker inspector control panel component.
 *
 * @since 3.14.0
 */
const CrossLinkerInspectorControlPanel = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( ! props.isSelected || props.name !== 'core/paragraph' ) {
			return <BlockEdit { ...props } />;
		}

		const { settings, setSettings } = useSettings<SidebarSettings>();
		return (
			<>
				<BlockEdit { ...props } />
				{ /* @ts-ignore */ }
				<InspectorControls group="list">
					<PanelBody
						title="Smart Linking"
						initialOpen={ settings.CrossLinksOpen }
						className="wp-parsely-panel wp-parsely-smart-linking-panel"
						icon={ <><LeafIcon /> <BetaBadge /></> }
						onToggle={ ( next ) => {
							setSettings( { CrossLinksOpen: next } );
							Telemetry.trackEvent( 'cross_linker_block_inspector_panel_toggled', { open: next } );
						} }
					>
						<VerifyCredentials>
							<CrossLinkerPanel
								selectedBlockClientId={ props.clientId }
								context={ CrossLinkerPanelContext.BlockInspector }
							/>
						</VerifyCredentials>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withCrossLinkerPanel' );

/**
 * The cross linker panel with settings provider.
 * This is the final component that is added to the block inspector.
 *
 * @since 3.14.0
 */
const CrossLinkerPanelWithSettingsProvider = compose(
	withSettingsProvider,
	CrossLinkerInspectorControlPanel
);

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
		'wpparsely/cross-linker-inspector-control-panel',
		CrossLinkerPanelWithSettingsProvider
	);

	/**
	 * Register the block overlay container to allow drawing the overlay over the blocks
	 * that are being processed.
	 */
	registerPlugin( 'wp-parsely-block-overlay', {
		render: BlockOverlayContainer,
	} );
};

/**
 * WordPress dependencies
 */
import {
	Button,
	Panel,
	PanelBody,
	PanelRow,
	SelectControl,
	TabPanel,
} from '@wordpress/components';
// eslint-disable-next-line import/named
import { useSelect } from '@wordpress/data';
import { PluginSidebar } from '@wordpress/edit-post';
import { useEffect } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { chartBar as ChartIcon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { Telemetry } from '../../js/telemetry/telemetry';
import { PARSELY_PERSONAS } from '../common/components/persona-selector';
import { PARSELY_TONES } from '../common/components/tone-selector';
import { EditIcon } from '../common/icons/edit-icon';
import { LeafIcon } from '../common/icons/leaf-icon';
import { SettingsProvider, SidebarSettings, useSettings } from '../common/settings';
import {
	Metric,
	Period,
	PostFilterType,
	getMetricDescription,
	getPeriodDescription,
	isInEnum,
} from '../common/utils/constants';
import {
	DEFAULT_MAX_LINKS,
	DEFAULT_MAX_LINK_WORDS,
	initSmartLinking,
} from './smart-linking/smart-linking';
import { SidebarPerformanceTab } from './tabs/sidebar-performance-tab';
import { SidebarToolsTab } from './tabs/sidebar-tools-tab';

const BLOCK_PLUGIN_ID = 'wp-parsely-block-editor-sidebar';

export type OnSettingChangeFunction = ( key: keyof SidebarSettings, value: string | boolean | number ) => void;

/**
 * Defines the data structure exposed by the Sidebar about the currently opened
 * Post.
 *
 * @since 3.11.0
 */
export interface SidebarPostData {
	authors: string[];
	categories: string[];
	tags: string[];
}

/**
 * Gets the settings from the passed JSON.
 *
 * If missing settings or invalid values are detected, they get set to their
 * defaults. This function prevents crashes when settings cannot be fetched or
 * they happen to be corrupt.
 *
 * @since 3.13.0
 *
 * @param {string} settingsJson The JSON containing the settings.
 *
 * @return {SidebarSettings} The resulting settings object.
 */
export const getSettingsFromJson = ( settingsJson: string = '' ): SidebarSettings => {
	let parsedSettings: SidebarSettings;

	// If the settings are empty, try to get them from the global variable.
	if ( '' === settingsJson ) {
		settingsJson = window.wpParselyContentHelperSettings;
	}

	try {
		parsedSettings = JSON.parse( settingsJson );
	} catch ( e ) {
		// Return defaults when parsing failed or the string is empty.
		return {
			PerformanceDetailsOpen: true,
			RelatedTopPostsFilterBy: PostFilterType.Unavailable,
			RelatedTopPostsFilterValue: '',
			RelatedTopPostsOpen: false,
			SettingsMetric: Metric.Views,
			SettingsOpen: true,
			SettingsPeriod: Period.Days7,
			SmartLinkingMaxLinks: DEFAULT_MAX_LINKS,
			SmartLinkingMaxLinkWords: DEFAULT_MAX_LINK_WORDS,
			SmartLinkingOpen: false,
			SmartLinkingSettingsOpen: false,
			TitleSuggestionsOpen: false,
			TitleSuggestionsPersona: PARSELY_PERSONAS.journalist.label,
			TitleSuggestionsSettingsOpen: false,
			TitleSuggestionsTone: PARSELY_TONES.neutral.label,
		};
	}

	// Fix invalid values if any are found.
	if ( typeof parsedSettings?.PerformanceDetailsOpen !== 'boolean' ) {
		parsedSettings.PerformanceDetailsOpen = true;
	}
	if ( ! isInEnum( parsedSettings?.RelatedTopPostsFilterBy, PostFilterType ) ) {
		parsedSettings.RelatedTopPostsFilterBy = PostFilterType.Unavailable;
	}
	if ( typeof parsedSettings?.RelatedTopPostsFilterValue !== 'string' ) {
		parsedSettings.RelatedTopPostsFilterValue = '';
	}
	if ( typeof parsedSettings?.RelatedTopPostsOpen !== 'boolean' ) {
		parsedSettings.RelatedTopPostsOpen = false;
	}
	if ( ! isInEnum( parsedSettings?.SettingsMetric, Metric ) ) {
		parsedSettings.SettingsMetric = Metric.Views;
	}
	if ( typeof parsedSettings?.SettingsOpen !== 'boolean' ) {
		parsedSettings.SettingsOpen = true;
	}
	if ( ! isInEnum( parsedSettings?.SettingsPeriod, Period ) ) {
		parsedSettings.SettingsPeriod = Period.Days7;
	}
	if ( typeof parsedSettings?.SmartLinkingMaxLinks !== 'number' ) {
		parsedSettings.SmartLinkingMaxLinks = DEFAULT_MAX_LINKS;
	}
	if ( typeof parsedSettings?.SmartLinkingMaxLinkWords !== 'number' ) {
		parsedSettings.SmartLinkingMaxLinkWords = DEFAULT_MAX_LINK_WORDS;
	}
	if ( typeof parsedSettings?.SmartLinkingOpen !== 'boolean' ) {
		parsedSettings.SmartLinkingOpen = false;
	}
	if ( typeof parsedSettings?.SmartLinkingSettingsOpen !== 'boolean' ) {
		parsedSettings.SmartLinkingSettingsOpen = false;
	}
	if ( typeof parsedSettings?.TitleSuggestionsOpen !== 'boolean' ) {
		parsedSettings.TitleSuggestionsOpen = false;
	}
	if ( typeof parsedSettings?.TitleSuggestionsPersona !== 'string' ) {
		parsedSettings.TitleSuggestionsPersona = PARSELY_PERSONAS.journalist.label;
	}
	if ( typeof parsedSettings?.TitleSuggestionsSettingsOpen !== 'boolean' ) {
		parsedSettings.TitleSuggestionsSettingsOpen = false;
	}
	if ( typeof parsedSettings?.TitleSuggestionsTone !== 'string' ) {
		parsedSettings.TitleSuggestionsTone = PARSELY_TONES.neutral.label;
	}

	return parsedSettings;
};

/**
 * Returns the Content Helper Editor Sidebar.
 *
 * @since 3.4.0
 *
 * @return {JSX.Element} The Content Helper Editor Sidebar.
 */
const ContentHelperEditorSidebar = (): JSX.Element => {
	const { settings, setSettings } = useSettings<SidebarSettings>();

	/**
	 * Track sidebar opening.
	 *
	 * @since 3.12.0
	 */
	const activeComplementaryArea = useSelect( ( select ) => {
		// @ts-ignore getActiveComplementaryArea exists in the interface store.
		return select( 'core/interface' ).getActiveComplementaryArea( 'core/edit-post' );
	}, [ ] );

	useEffect( () => {
		if ( activeComplementaryArea === 'wp-parsely-block-editor-sidebar/wp-parsely-content-helper' ) {
			Telemetry.trackEvent( 'editor_sidebar_opened' );
		}
	}, [ activeComplementaryArea ] );

	/**
	 * Track sidebar panel opening and closing.
	 *
	 * @since 3.12.0
	 *
	 * @param {string}  panel The panel name.
	 * @param {boolean} next  Whether the panel is open or closed.
	 */
	const trackToggle = ( panel: string, next: boolean ): void => {
		if ( next ) {
			Telemetry.trackEvent( 'editor_sidebar_panel_opened', { panel } );
		} else {
			Telemetry.trackEvent( 'editor_sidebar_panel_closed', { panel } );
		}
	};

	/**
	 * Track sidebar settings change.
	 *
	 * @since 3.12.0
	 *
	 * @param {string} filter The filter name.
	 * @param {Object} props  The filter properties.
	 */
	const trackSettingsChange = ( filter: string, props: object ): void => {
		Telemetry.trackEvent( 'editor_sidebar_settings_changed', { filter, ...props } );
	};

	/**
	 * Returns the settings pane of the Content Helper Sidebar.
	 *
	 * @since 3.11.0
	 *
	 * @deprecated Will be removed soon.
	 * @return {JSX.Element} The settings pane of the Content Helper Sidebar.
	 */
	const Settings = (): JSX.Element => {
		return (
			<>
				<SelectControl
					label={ __( 'Period', 'wp-parsely' ) }
					onChange={ ( selection ) => {
						if ( isInEnum( selection, Period ) ) {
							setSettings( {
								SettingsPeriod: selection as Period,
							} );
							trackSettingsChange( 'period', { period: selection } );
						}
					} }
					value={ settings.SettingsPeriod }
				>
					{
						Object.values( Period ).map( ( value ) =>
							<option key={ value } value={ value }>
								{ getPeriodDescription( value ) }
							</option>
						)
					}
				</SelectControl>
				<SelectControl
					label={ __( 'Metric', 'wp-parsely' ) }
					onChange={ ( selection ) => {
						if ( isInEnum( selection, Metric ) ) {
							setSettings( {
								SettingsMetric: selection as Metric,
							} );
							trackSettingsChange( 'metric', { metric: selection } );
						}
					} }
					value={ settings.SettingsMetric }
				>
					{
						Object.values( Metric ).map( ( value ) =>
							<option key={ value } value={ value }>
								{ getMetricDescription( value ) }
							</option>
						)
					}
				</SelectControl>
			</>
		);
	};

	return (
		<PluginSidebar icon={ <LeafIcon /> }
			name="wp-parsely-content-helper"
			className="wp-parsely-content-helper"
			title={ __( 'Parse.ly', 'wp-parsely' ) }
		>
			<SettingsProvider
				endpoint="editor-sidebar-settings"
				defaultSettings={ getSettingsFromJson() }
			>
				<Panel>
					<PanelBody>
						<PanelRow className="wp-parsely-sidebar-header">
							{
								/* translators: %1$s: how it performed, %2$s: period starting with 'last' */
								sprintf( __( 'This post performed %1$s in the %2$s', 'wp-parsely' ),
									'very well',
									getPeriodDescription( settings.SettingsPeriod, true )
								)
							}
							{ window.wpParselyPostUrl && (
								<Button
									variant={ 'primary' }
									onClick={ () => {
										Telemetry.trackEvent( 'editor_sidebar_view_post_pressed' );
									} }
									href={ window.wpParselyPostUrl }
									rel="noopener"
									target="_blank"
								>
									{
										/* translators: %s: Post type */
										sprintf( __( 'View this %s in Parse.ly', 'wp-parsely' ), 'post' )
									}
								</Button>
							) }
						</PanelRow>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody
						title={ __( 'Settings (deprecated)', 'wp-parsely' ) }
						initialOpen={ settings.SettingsOpen }
						onToggle={ ( next ) => {
							setSettings( { SettingsOpen: next } );
							trackToggle( 'settings', next );
						} }
					>
						<Settings />
					</PanelBody>
				</Panel>
				<Panel className="wp-parsely-sidebar-main-panel">
					<TabPanel
						className="wp-parsely-sidebar-tabs"
						tabs={ [
							{
								icon: <EditIcon />,
								name: 'tools',
								title: __( 'Tools', 'wp-parsely' ),
							},
							{
								icon: ChartIcon,
								name: 'performance',
								title: __( 'Performance', 'wp-parsely' ),
							},
						] }
						onSelect={ ( tabName ) => {
							Telemetry.trackEvent( 'editor_sidebar_tab_selected', { tab: tabName } );
						} }
					>
						{ ( tab ) => (
							<>
								{ tab.name === 'tools' && (
									<SidebarToolsTab trackToggle={ trackToggle } />
								) }
								{ tab.name === 'performance' && (
									<SidebarPerformanceTab trackToggle={ trackToggle } />
								) }
							</>
						) }
					</TabPanel>
				</Panel>
			</SettingsProvider>
		</PluginSidebar>
	);
};

// Registering Plugin to WordPress Block Editor.
registerPlugin( BLOCK_PLUGIN_ID, {
	icon: LeafIcon,
	render: () => (
		<SettingsProvider
			endpoint="editor-sidebar-settings"
			defaultSettings={ getSettingsFromJson() }
		>
			<ContentHelperEditorSidebar />
		</SettingsProvider>
	),
} );

// Initialize Smart Linking.
initSmartLinking();

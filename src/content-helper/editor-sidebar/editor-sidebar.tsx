/**
 * WordPress dependencies
 */
import {
	Button,
	Panel,
	PanelBody,
	PanelRow,
	TabPanel,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { PluginSidebar } from '@wordpress/edit-post';
import { useEffect } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { chartBar as ChartIcon } from '@wordpress/icons';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import { Telemetry } from '../../js/telemetry/telemetry';
import { PARSELY_PERSONAS } from '../common/components/persona-selector';
import { PARSELY_TONES } from '../common/components/tone-selector';
import { EditIcon } from '../common/icons/edit-icon';
import { LeafIcon } from '../common/icons/leaf-icon';
import {
	SettingsProvider,
	SidebarSettings,
	useSettings,
} from '../common/settings';
import {
	Metric,
	Period,
	PostFilterType,
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
			PerformanceStatsPeriod: Period.Days7,
			RelatedPostsFilterBy: PostFilterType.Unavailable,
			RelatedPostsFilterValue: '',
			RelatedPostsMetric: Metric.Views,
			RelatedPostsOpen: false,
			RelatedPostsPeriod: Period.Days7,
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
	if ( ! isInEnum( parsedSettings?.PerformanceStatsPeriod, Period ) ) {
		parsedSettings.PerformanceStatsPeriod = Period.Days7;
	}
	if ( ! isInEnum( parsedSettings?.RelatedPostsFilterBy, PostFilterType ) ) {
		parsedSettings.RelatedPostsFilterBy = PostFilterType.Unavailable;
	}
	if ( typeof parsedSettings?.RelatedPostsFilterValue !== 'string' ) {
		parsedSettings.RelatedPostsFilterValue = '';
	}
	if ( ! isInEnum( parsedSettings?.RelatedPostsMetric, Metric ) ) {
		parsedSettings.RelatedPostsMetric = Metric.Views;
	}
	if ( typeof parsedSettings?.RelatedPostsOpen !== 'boolean' ) {
		parsedSettings.RelatedPostsOpen = false;
	}
	if ( ! isInEnum( parsedSettings?.RelatedPostsPeriod, Period ) ) {
		parsedSettings.RelatedPostsPeriod = Period.Days7;
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
	// TODO: Check if setSettings can be removed here.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

	return (
		<PluginSidebar icon={ <LeafIcon className="wp-parsely-sidebar-icon" /> }
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
									getPeriodDescription( settings.PerformanceStatsPeriod, true )
								)
								// TODO: Make the performance descriptor dynamic, and display a different message if the post is unpublished.
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
									<SidebarPerformanceTab
										period={ settings.PerformanceStatsPeriod }
									/>
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

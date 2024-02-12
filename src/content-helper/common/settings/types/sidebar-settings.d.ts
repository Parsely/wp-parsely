import { Metric, Period } from '../../utils/constants';

/**
 * Defines the settings structure for the ContentHelperEditorSidebar component.
 *
 * @since 3.13.0
 */
export interface SidebarSettings {
	SmartLinkingMaxLinkWords: number;
	SmartLinkingMaxLinks: number;
	SmartLinkingOpen: boolean;
	SmartLinkingSettingsOpen: boolean;
	PerformanceDetailsOpen: boolean;
	RelatedTopPostsFilterBy: string;
	RelatedTopPostsFilterValue: string;
	RelatedTopPostsOpen: boolean;
	SettingsMetric: Metric;
	SettingsOpen: boolean;
	SettingsPeriod: Period;
	TitleSuggestionsOpen: boolean;
	TitleSuggestionsPersona: string;
	TitleSuggestionsSettingsOpen: boolean;
	TitleSuggestionsTone: string;
}

import { Metric, Period } from '../../utils/constants';

/**
 * Defines the settings structure for the ContentHelperEditorSidebar component.
 *
 * @since 3.13.0
 * @since 3.14.0 Moved from `content-helper/editor-sidebar/editor-sidebar.tsx`.
 */
export interface SidebarSettings {
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

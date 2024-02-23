import { Metric, Period } from '../../utils/constants';

/**
 * Defines the settings structure for the ContentHelperEditorSidebar component.
 *
 * @since 3.13.0
 * @since 3.14.0 Moved from `content-helper/editor-sidebar/editor-sidebar.tsx`.
 */
export interface SidebarSettings {
	PerformanceStatsPeriod: Period;
	RelatedPostsFilterBy: string;
	RelatedPostsFilterValue: string;
	RelatedPostsMetric: Metric;
	RelatedPostsOpen: boolean;
	RelatedPostsPeriod: Period;
	SmartLinkingMaxLinks: number;
	SmartLinkingMaxLinkWords: number;
	SmartLinkingOpen: boolean;
	SmartLinkingSettingsOpen: boolean;
	TitleSuggestionsOpen: boolean;
	TitleSuggestionsPersona: string;
	TitleSuggestionsSettingsOpen: boolean;
	TitleSuggestionsTone: string;
}

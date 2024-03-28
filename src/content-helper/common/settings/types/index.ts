/**
 * Import the settings types.
 */
import type {
	PerformanceStatsSettings,
	RelatedPostsSettings,
	SidebarSettings,
	TitleSuggestionsSettings,
} from './sidebar-settings';
import type { TopPostsSettings } from './top-posts-settings';

/**
 * Export the settings types.
 */
export type {
	PerformanceStatsSettings, // Part of SidebarSettings type.
	RelatedPostsSettings, // Part of SidebarSettings type.
	SidebarSettings,
	TitleSuggestionsSettings, // Part of SidebarSettings type.
	TopPostsSettings,
};

// Generic type for settings.
export type Settings = SidebarSettings | TopPostsSettings;


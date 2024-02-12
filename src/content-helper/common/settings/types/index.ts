/**
 * Import the settings types.
 */
import type { SidebarSettings } from './sidebar-settings';
import type { TopPostsSettings } from './top-posts-settings';

/**
 * Export the settings types.
 */
export type {
	SidebarSettings,
	TopPostsSettings,
};

// Generic type for settings.
export type Settings = SidebarSettings | TopPostsSettings;


/**
 * WordPress dependencies
 */
import type { _Hooks } from '@wordpress/hooks/build-types/createHooks';

export { };

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		wp: any;

		/**
		 * Parsely Options
		 */
		PARSELY?: {
			config?: {
				uuid: string,
				parsely_site_uuid: string,
			},
			autotrack?: boolean,
			onload?: () => unknown,
			onReady?: () => unknown,
			enable_consent_tracking?: boolean,
			initialConsent?: boolean,
			emit_on_denied?: boolean,
			setConsent?: ( granted: boolean ) => unknown,
		},

		wpParselyAdminUrl: string;
		wpParselyContentHelperPermissions: string;
		wpParselyContentHelperSettings: string;
		wpParselyDependencies: { [key: string]: string };
		wpParselyDisableAutotrack?: boolean;
		wpParselyEmptyCredentialsMessage: string;
		wpParselyHooks?: _Hooks;
		wpParselyPostsStatsResponse: string;
		wpParselyPostUrl: string;
		wpParselySiteId: string,
		wpParselySmartLinkingAllowedBlocks: string[];
		wpParselyTrackableStatuses: string[];
		wpParselyUseCategorySlugsInSearches: boolean;

		/**
		 * Parse.ly consent bridge configuration (baked by the Consent
		 * feature) and the WP Consent API page globals it consumes.
		 *
		 * @since 3.24.0
		 */
		wpParselyConsentConfig?: {
			prefix?: string,
			consentType?: string,
			waitFor?: boolean,
		};
		wp_consent_type?: string;
		waitfor_consent_hook?: boolean;

		/**
		 * Jetpack Editor Initial State.
		 * This is required for the Excerpt Suggestions feature to know if
		 * Jetpack AI Content Lens is available and enabled.
		 *
		 * @since 3.13.0
		 *
		 * @see https://github.com/Automattic/jetpack/blob/4eb6a42833879b30aa2a7f4c82e44fc094307de3/projects/plugins/jetpack/extensions/plugins/ai-content-lens/editor.js#L16
		 */
		Jetpack_Editor_Initial_State?: {
			available_blocks: {
				[key: string]: {
					available: boolean,
					unavailable_reason?: string,
					details: [],
				};
			};
		};

		_parsely_traffic_boost_preview_nonce?: string;
	}
}

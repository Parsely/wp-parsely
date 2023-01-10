/**
 * External dependencies.
 */
import type{ _Hooks } from '@wordpress/hooks/build-types/createHooks';

import { ParselyStatsResponse } from '../../js/admin-parsely-stats';

export {};

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
		},
		wpParselySiteId: string,
		wpParselyDisableAutotrack?: boolean;
		wpParselyHooks?: _Hooks;
		wpParselyAdminStatsResponse: ParselyStatsResponse;
	}
}

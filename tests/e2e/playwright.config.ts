/**
 * External dependencies
 */
import { defineConfig } from '@playwright/test';

/**
 * WordPress dependencies
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require( '@wordpress/scripts/config/playwright.config' );

const baseURL: string = process.env.WP_BASE_URL ?? 'http://localhost:8889';

const config = defineConfig( {
	...baseConfig,
	webServer: {
		...baseConfig.webServer,
		// The base config hardcodes the default tests port, so environments
		// using `.wp-env.override.json` are not detected as already running.
		port: Number( new URL( baseURL ).port ) || 80,
	},
} );

export default config;

/**
 * External dependencies
 */
import { defineConfig } from '@playwright/test';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * Returns the port of the wp-env tests environment, taken from
 * WP_ENV_TESTS_PORT or .wp-env.override.json, or 8889 when neither sets it.
 *
 * @since 3.24.2
 */
function getTestsPort(): string {
	const overridePath = join( __dirname, '../../.wp-env.override.json' );
	const override = existsSync( overridePath )
		? JSON.parse( readFileSync( overridePath, 'utf8' ) )
		: {};

	return String(
		process.env.WP_ENV_TESTS_PORT ??
			override.env?.tests?.port ??
			override.testsPort ??
			8889
	);
}

// Specs append paths to the base URL, so drop any trailing slash.
const baseURL: string = (
	process.env.WP_BASE_URL ?? `http://localhost:${ getTestsPort() }`
).replace( /\/+$/, '' );

// The base config reads WP_BASE_URL when it loads, so set it first.
process.env.WP_BASE_URL = baseURL;

/**
 * WordPress dependencies
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require( '@wordpress/scripts/config/playwright.config' );

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

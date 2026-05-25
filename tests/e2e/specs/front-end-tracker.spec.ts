/**
 * External dependencies
 */
import { readFile } from 'fs/promises';

/**
 * WordPress dependencies
 */
import {
	expect,
	test,
} from '@wordpress/e2e-test-utils-playwright';

/**
 * Internal dependencies
 */
import {
	PLUGIN_VERSION,
	VALID_API_SECRET,
	VALID_SITE_ID,
	setSiteKeys,
} from '../utils';

/**
 * Tests the tracking code and loader injection on the front-end.
 *
 * @since 3.17.0 Migrated to Playwright.
 */
test.describe( 'Front-end tracking code injection', () => {
	/**
	 * Verifies that the tracking code is as expected when only the Site ID is
	 * provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should work as expected when only Site ID is provided', async ( { page } ) => {
		const utils = new Utils();
		await setSiteKeys( page, VALID_SITE_ID, '' );

		await page.goto( '/' );

		const assetVersion = await utils.getAssetVersion();

		await expect( page.locator( 'link[rel="dns-prefetch"][href="//cdn.parsely.com"]' ) ).toHaveCount( 1 );

		const parselyConfigScript = page.locator( 'script#parsely-cfg' );
		await expect( parselyConfigScript ).toHaveCount( 1 );
		await expect( parselyConfigScript ).toHaveAttribute( 'data-parsely-site', VALID_SITE_ID );
		await expect( parselyConfigScript ).toHaveAttribute(
			'src',
			`https://cdn.parsely.com/keys/${ VALID_SITE_ID }/p.js?ver=${ PLUGIN_VERSION }`
		);

		const loaderScript = page.locator( 'script#wp-parsely-loader-js' );
		await expect( loaderScript ).toHaveCount( 1 );
		await expect( loaderScript ).toHaveAttribute(
			'src',
			`http://localhost:8889/wp-content/plugins/wp-parsely/build/loader.js?ver=${ assetVersion }`
		);

		await expect( page.locator( 'script#wp-parsely-loader-js-before' ) ).toHaveCount( 0 );
		await expect( page.locator( 'script', { hasText: 'window.wpParselySiteId =' } ) ).toHaveCount( 0 );
	} );

	/**
	 * Verifies that the tracking code is as expected when the Site ID and API
	 * Secret are provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should work as expected when a Site ID and API Secret are provided', async ( { page } ) => {
		const utils = new Utils();
		await setSiteKeys( page, VALID_SITE_ID, VALID_API_SECRET );

		await page.goto( '/' );

		const assetVersion = await utils.getAssetVersion();

		await expect( page.locator( 'link[rel="dns-prefetch"][href="//cdn.parsely.com"]' ) ).toHaveCount( 1 );

		const parselyConfigScript = page.locator( 'script#parsely-cfg' );
		await expect( parselyConfigScript ).toHaveCount( 1 );
		await expect( parselyConfigScript ).toHaveAttribute( 'data-parsely-site', VALID_SITE_ID );
		await expect( parselyConfigScript ).toHaveAttribute(
			'src',
			`https://cdn.parsely.com/keys/${ VALID_SITE_ID }/p.js?ver=${ PLUGIN_VERSION }`
		);

		const loaderScript = page.locator( 'script#wp-parsely-loader-js' );
		await expect( loaderScript ).toHaveCount( 1 );
		await expect( loaderScript ).toHaveAttribute(
			'src',
			`http://localhost:8889/wp-content/plugins/wp-parsely/build/loader.js?ver=${ assetVersion }`
		);

		const loaderInlineScript = page.locator( 'script#wp-parsely-loader-js-before' );
		await expect( loaderInlineScript ).toHaveCount( 1 );
		// `toContainText` returns "" for non-visible elements like <script>; use
		// evaluate() to read textContent directly from the DOM instead.
		const scriptContent = await loaderInlineScript.evaluate( ( el ) => el.textContent ?? '' );
		expect( scriptContent ).toContain( `window.wpParselySiteId = '${ VALID_SITE_ID }'` );
	} );
} );

/**
 * Provides utility functions for the tests in this file.
 *
 * @since 3.17.0 Migrated utility functions to Playwright.
 */
class Utils {
	/**
	 * Returns the loader asset's version.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 *
	 * @return {string} The version of the loader asset.
	 */
	async getAssetVersion(): Promise<string> {
		const data = await readFile(
			'build/loader.asset.php', { encoding: 'utf8', flag: 'r' }
		);

		return data.match( /'version' => '(.*)'/ )?.[ 1 ] ?? '';
	}
}

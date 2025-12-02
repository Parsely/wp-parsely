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
	VALID_API_SECRET,
	VALID_SITE_ID,
	getRelatedPostsMessage,
	setSiteKeys,
} from '../../utils';

/**
 * Tests for the PCH Editor Sidebar Related Post filters.
 *
 * @since 3.17.0 Migrated to Playwright.
 */
test.describe( 'PCH Editor Sidebar Related Post panel filters', () => {
	/**
	 * Sets a valid Site ID and API Secret.
	 *
	 * Runs before all tests.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test.beforeAll( async ( { browser } ) => {
		const page = await browser.newPage();

		await setSiteKeys( page, VALID_SITE_ID, VALID_API_SECRET );
	} );

	/**
	 * Verifies that an attempt to fetch results is made when a Site ID and API
	 * Secret are provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should attempt to fetch results when a Site ID and API Secret are provided', async ( { admin } ) => {
		expect( await getRelatedPostsMessage(
			admin, '.related-posts-loading-message'
		) ).toMatch( `Loading…` );
	} );
} );

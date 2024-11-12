/**
 * WordPress dependencies
 */
import {
	type Admin,
	expect,
	test,
} from '@wordpress/e2e-test-utils-playwright';

/**
 * Internal dependencies
 */
import {
	VALID_SITE_ID,
	setSiteKeys,
} from '../utils';

/**
 * Tests front-end metadata insertion functionality.
 *
 * @since 3.17.0 Migrated to Playwright.
 */
test.describe( 'Front end metadata insertion', () => {
	/**
	 * Sets a valid Site ID and API Secret, and then activates tracking for
	 * logged-in users.
	 *
	 * Runs before all tests.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test.beforeAll( async ( { browser } ) => {
		const page = await browser.newPage();

		await setSiteKeys( page, VALID_SITE_ID, '' );

		// Activate tracking for logged-in users.
		await page.goto( '/wp-admin/options-general.php?page=parsely' );
		await page.getByLabel( 'Yes, track logged-in users.' ).click();
		await page.getByRole( 'button', { name: 'Save Changes' } ).click();
	} );

	/**
	 * Verifies that JSON-LD metadata is correctly being inserted into the homepage.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should insert JSON-LD on homepage', async ( { admin, page } ) => {
		const utils = new Utils( admin );
		await utils.setMetadataFormat( 'json_ld' );

		await page.goto( '/' );

		const content = await page.content();

		expect( content ).toContain( '<script type="application/ld+json">{"@context":"https:\\/\\/schema.org","@type":"WebPage","headline":"wp-parsely","url":"http:\\/\\/localhost:8889"}</script>' );
		expect( content ).not.toContain( '<meta name="parsely-title" ' );
	} );

	/**
	 * Verifies that JSON-LD metadata is correctly being inserted into posts.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should insert JSON-LD on post', async ( { page } ) => {
		await page.goto( '/?p=1' );

		const content = await page.content();

		expect( content ).toContain( '<script type="application/ld+json">' );
		expect( content ).toContain( '{"@context":"https:\\/\\/schema.org","@type":"NewsArticle","headline":"Hello world!","url":"http:\\/\\/localhost:8889\\/?p=1","mainEntityOfPage":{"@type":"WebPage","@id":"http:\\/\\/localhost:8889\\/?p=1"},"thumbnailUrl":"","image":{"@type":"ImageObject","url":""},"articleSection":"Uncategorized","author":[{"@type":"Person","name":"admin"}],"creator":["admin"],"publisher":{"@type":"Organization","name":"wp-parsely","logo":""},"keywords":[],"' );
		expect( content ).not.toContain( '<meta name="parsely-title" ' );
	} );

	/**
	 * Verifies that JSON-LD metadata is correctly being inserted into pages.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should insert JSON-LD on page', async ( { page } ) => {
		await page.goto( '/?p=2' );

		const content = await page.content();

		expect( content ).toContain( '<script type="application/ld+json">' );
		expect( content ).toContain( '{"@context":"https:\\/\\/schema.org","@type":"WebPage","headline":"Sample Page","url":"http:\\/\\/localhost:8889\\/?page_id=2","mainEntityOfPage":{"@type":"WebPage","@id":"http:\\/\\/localhost:8889\\/?page_id=2"},"thumbnailUrl":"","image":{"@type":"ImageObject","url":""},"articleSection":"Uncategorized","author":[{"@type":"Person","name":"admin"}],"creator":["admin"],"publisher":{"@type":"Organization","name":"wp-parsely","logo":""},"keywords":[],"' );
		expect( content ).not.toContain( '<meta name="parsely-title" ' );
	} );

	/**
	 * Verifies that meta tags metadata is correctly being inserted into
	 * the homepage.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should insert repeated metas on homepage', async ( { admin, page } ) => {
		const utils = new Utils( admin );
		await utils.setMetadataFormat( 'repeated_metas' );

		await page.goto( '/' );

		const content = await page.content();

		expect( content ).toContain( '<meta name="parsely-title" content="wp-parsely">' );
		expect( content ).toContain( '<meta name="parsely-link" content="http://localhost:8889">' );
		expect( content ).toContain( '<meta name="parsely-type" content="index">' );
		expect( content ).not.toMatch( /<meta name="parsely-pub-date" content=".*Z">/ );
		expect( content ).not.toContain( '<meta name="parsely-section" content="Uncategorized">' );
		expect( content ).not.toContain( '<meta name="parsely-author" content="admin">' );
		expect( content ).not.toContain( '<script type="application/ld+json">' );
	} );

	/**
	 * Verifies that meta tags metadata is correctly being inserted into posts.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should insert repeated metas on post', async ( { page } ) => {
		await page.goto( '/?p=1' );

		const content = await page.content();

		expect( content ).toContain( '<meta name="parsely-title" content="Hello world!">' );
		expect( content ).toContain( '<meta name="parsely-link" content="http://localhost:8889/?p=1">' );
		expect( content ).toContain( '<meta name="parsely-type" content="post">' );
		expect( content ).toMatch( /<meta name="parsely-pub-date" content=".*Z">/ );
		expect( content ).toContain( '<meta name="parsely-section" content="Uncategorized">' );
		expect( content ).toContain( '<meta name="parsely-author" content="admin">' );
		expect( content ).not.toContain( '<script type="application/ld+json">' );
	} );

	/**
	 * Verifies that meta tags metadata is correctly being inserted into pages.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should insert repeated metas on page', async ( { page } ) => {
		await page.goto( '/?p=2' );

		const content = await page.content();

		expect( content ).toContain( '<meta name="parsely-title" content="Sample Page">' );
		expect( content ).toContain( '<meta name="parsely-link" content="http://localhost:8889/?page_id=2">' );
		expect( content ).toContain( '<meta name="parsely-type" content="index">' );
		expect( content ).toMatch( /<meta name="parsely-pub-date" content=".*Z">/ );
		expect( content ).toContain( '<meta name="parsely-section" content="Uncategorized">' );
		expect( content ).toContain( '<meta name="parsely-author" content="admin">' );
		expect( content ).not.toContain( '<script type="application/ld+json">' );
	} );
} );

/**
 * Provides utility functions for the tests in this file.
 *
 * @since 3.17.0 Migrated utility functions to Playwright.
 */
class Utils {
	/**
	 * The Admin object of the calling function.
	 *
	 * @since 3.17.0
	 */
	readonly admin: Admin;

	/**
	 * Constructor.
	 *
	 * @since 3.17.0
	 *
	 * @param {Admin} admin The Admin object of the calling function.
	 */
	constructor( admin: Admin ) {
		this.admin = admin;
	}

	/**
	 * Set the metadata format to use.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 *
	 * @param {string} format The metadata format to use.
	 */
	async setMetadataFormat( format: string ) {
		const page = this.admin.page;

		await this.admin.visitAdminPage( '/options-general.php?page=parsely' );

		await page.locator( `#meta_type_${ format }` ).click();
		await page.getByRole( 'button', { name: 'Save Changes' } ).click();
	}
}

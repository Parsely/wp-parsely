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
	VALID_API_SECRET,
	VALID_SITE_ID,
	setSiteKeys,
} from '../utils';

/**
 * Tests for the (legacy) Recommended Widget.
 *
 * @since 3.17.0 Migrated to Playwright.
 */
test.describe( 'Recommended Widget', () => {
	const deactivatedWidgetMessage = 'The Parse.ly Site ID and Parse.ly API Secret fields need to be populated on the Parse.ly settings page for this widget to work.';

	/**
	 * Activates a theme that supports legacy Widgets.
	 *
	 * Runs before all tests.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test.beforeAll( async ( { requestUtils } ) => {
		await requestUtils.activateTheme( 'twentytwentyone' );
	} );

	/**
	 * Restores the default theme.
	 *
	 * Runs after all tests.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.activateTheme( 'twentytwentyfour' );
	} );

	/**
	 * Removes any saved Widgets.
	 *
	 * Runs after each test.
	 *
	 * @since 3.24.2
	 */
	test.afterEach( async ( { requestUtils } ) => {
		await requestUtils.deleteAllWidgets();
	} );

	/**
	 * Verifies that the Widget is available but deactivated when the Site ID
	 * and API Secret are not provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should be available but deactivated without Site ID and API Secret', async ( { admin } ) => {
		const page = admin.page;
		const utils = new Utils( admin );

		await setSiteKeys( page, '', '' );

		await utils.insertRecommendedWidget();

		await expect(
			page.getByText( deactivatedWidgetMessage, { exact: true } )
		).toBeVisible();
	} );

	/**
	 * Verifies that the Widget is available but deactivated when only the Site
	 * ID is provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should be available but deactivated without API secret', async ( { admin } ) => {
		const page = admin.page;
		const utils = new Utils( admin );

		await setSiteKeys( page, VALID_SITE_ID, '' );

		await utils.insertRecommendedWidget();

		await expect(
			page.getByText( deactivatedWidgetMessage, { exact: true } )
		).toBeVisible();
	} );

	/**
	 * Verifies that the Widget requests recommendations with the Site ID but
	 * without the API Secret, and displays the returned entries.
	 *
	 * The Recommendations API is stubbed, as its data for a given URL is not
	 * part of what's being tested here.
	 *
	 * @since 3.24.2
	 */
	test( 'Should request recommendations without the API Secret', async ( { admin, page, requestUtils } ) => {
		const utils = new Utils( admin );
		const requestedUrls: string[] = [];

		// The Widget calls the Recommendations API from the visitor's browser.
		await page.route( '**/v2/related**', async ( route ) => {
			requestedUrls.push( route.request().url() );

			await route.fulfill( {
				headers: { 'Access-Control-Allow-Origin': '*' },
				json: {
					data: [
						{
							title: 'First recommendation',
							url: 'https://example.com/first',
							image_url: '',
							thumb_url_medium: '',
							author: 'Author One',
						},
						{
							title: 'Second recommendation',
							url: 'https://example.com/second',
							image_url: '',
							thumb_url_medium: '',
							author: 'Author Two',
						},
					],
				},
			} );
		} );

		await setSiteKeys( page, VALID_SITE_ID, VALID_API_SECRET );
		await utils.insertRecommendedWidget();
		await utils.saveWidgets( 'Recommended posts' );

		// The API Secret must not reach the page's markup.
		const markup = await ( await page.request.get( '/' ) ).text();
		expect( markup ).not.toContain( VALID_API_SECRET );

		await page.goto( '/' );

		const entries = page.locator( 'li.parsely-recommended-widget-entry' );
		await expect( entries ).toHaveCount( 2 );
		await expect( entries.first() ).toBeVisible();
		await expect(
			entries.first().getByRole( 'link', { name: 'First recommendation' } )
		).toBeVisible();

		expect( requestedUrls ).toHaveLength( 1 );
		expect( requestedUrls[ 0 ] ).toContain( 'apikey=' + VALID_SITE_ID );
		expect( requestedUrls[ 0 ] ).not.toContain( 'secret=' );

		await requestUtils.deleteAllWidgets();
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
	 * @since 3.17.0.
	 *
	 * @param {Admin} admin The Admin object of the calling function.
	 */
	constructor( admin: Admin ) {
		this.admin = admin;
	}

	/**
	 * Inserts the (legacy) Recommended Widget into the Widgets area.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	async insertRecommendedWidget() {
		const page = this.admin.page;

		await this.admin.visitAdminPage( '/widgets.php' );

		if ( await page.getByText( 'Welcome to block Widgets', { exact: true } ).isVisible() ) {
			await page.getByRole( 'button', { name: 'Close', exact: true } ).click();
		}

		await page.getByRole( 'button', { name: 'Add block' } ).click();
		await page.getByPlaceholder( 'Search' ).fill( 'parse.ly recommended widget' );
		await page.getByText(
			'Parse.ly Recommended Widget', { exact: true }
		).click();
	}

	/**
	 * Sets the Widget's title and saves the Widgets screen.
	 *
	 * The title is filled in because the Legacy Widget block only builds an
	 * instance, and so only becomes saveable, once its form changes.
	 *
	 * @since 3.24.2
	 *
	 * @param {string} title The title to set.
	 */
	async saveWidgets( title: string ) {
		const page = this.admin.page;

		await page.getByLabel( 'Title:' ).fill( title );
		await page.getByRole( 'button', { name: 'Update' } ).click();

		await expect(
			page.getByTestId( 'snackbar' ).getByText( 'Widgets saved.', { exact: true } )
		).toBeVisible();
	}
}

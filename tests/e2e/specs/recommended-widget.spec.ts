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
}

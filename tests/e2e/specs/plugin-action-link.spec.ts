/**
 * WordPress dependencies
 */
import {
	expect,
	test,
} from '@wordpress/e2e-test-utils-playwright';

/**
 * Tests for the plugin entry in the WordPress Plugins page.
 *
 * @since 3.17.0 Migrated to Playwright.
 */
test.describe( 'The plugin\'s entry in the WordPress Plugins page', () => {
	/**
	 * Verifies that the plugin is listed in the WordPress Plugins page, and
	 * that it provides a link to its Settings page.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should provide a link to the plugin\'s settings page', async ( { admin } ) => {
		const page = admin.page;

		await admin.visitAdminPage( '/plugins.php' );
		await page.locator( '#the-list' ).getByRole( 'link', { name: 'Settings' } ).click();

		// Check loaded page's URL and heading.
		await page.waitForURL( '**/wp-admin/options-general.php?page=parsely' );
		await expect(
			page.getByText( 'Parse.ly Settings', { exact: true } )
		).toBeVisible();
	} );
} );

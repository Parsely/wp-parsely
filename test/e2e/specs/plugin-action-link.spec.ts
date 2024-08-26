/**
 * WordPress dependencies
 */
import { expect, test } from '@wordpress/e2e-test-utils-playwright';

test.describe( 'Plugin action link', () => {
	test( 'Should link to the plugin\'s settings page', async ( { admin, page } ) => {
		await admin.visitAdminPage( '/plugins.php' );
		await page.locator( '#the-list' ).getByRole( 'link', { name: 'Settings' } ).click();

		// Check loaded page's URL and heading.
		await page.waitForURL( '**/wp-admin/options-general.php?page=parsely' );
		await expect( page.getByText( 'Parse.ly Settings version' ) ).toBeVisible();
	} );
} );

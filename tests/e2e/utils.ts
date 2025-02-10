/**
 * External dependencies
 */
import { type Page } from '@playwright/test';

/**
 * WordPress dependencies
 */
import { Admin } from '@wordpress/e2e-test-utils-playwright';

export const PLUGIN_VERSION = '3.17.0';
export const VALID_SITE_ID = 'demoaccount.parsely.com';
export const INVALID_SITE_ID = 'invalid.parsely.com';
export const VALID_API_SECRET = 'valid_api_secret';

/**
 * Sets the Site ID and API Secret to the given values, using the plugin's
 * settings page.
 *
 * @since 3.17.0 Migrated to Playwright.
 *
 * @param {Page}    page                The Page object of the calling function.
 * @param {string}  siteId              The site ID to be saved to the database.
 * @param {string}  apiSecret           The API Secret to be saved to the database.
 * @param {boolean} bypassAPIValidation Whether to bypass API validation on Parse.ly API.
 */
export const setSiteKeys = async (
	page: Page, siteId: string, apiSecret: string, bypassAPIValidation: boolean = true
): Promise<void> => {
	await page.goto( 'wp-admin/options-general.php?page=parsely' + ( bypassAPIValidation ? '&e2e_parsely_skip_api_validate=y' : '' ) );

	await page.getByLabel( 'Site ID (required)' ).fill( siteId );
	await page.getByLabel( 'API Secret' ).fill( apiSecret );

	await page.getByRole( 'button', { name: 'Save Changes' } ).click();
};

/**
 * Gets the message returned by the PHC Editor Sidebar Related Posts panel
 * according to the various conditions passed to the function.
 *
 * @since 3.17.0 Migrated to Playwright.
 *
 * @param {Admin}  admin    The Admin object of the calling function.
 * @param {string} selector The selector from which to extract the message.
 *
 * @return {Promise<string>} The message returned.
 */
export const getRelatedPostsMessage = async (
	admin: Admin, selector: string = '.content-helper-error-message'
): Promise<string> => {
	const page = admin.page;
	const contentHelperMessageSelector = '.wp-parsely-content-helper div.components-panel__body.is-opened ' + selector;

	await admin.createNewPost();

	// Show the Content Helper Sidebar and expand the Related Posts panel.
	await page.getByRole( 'button', { name: 'Parse.ly' } ).click();
	await setSidebarPanelExpanded( page, 'Related Posts', true );

	return await page.locator( contentHelperMessageSelector ).textContent() ?? '';
};

/**
 * Expands or collapses the passed Sidebar panel.
 *
 * @since 3.13.0
 * @since 3.17.0 Migrated to Playwright.
 *
 * @param {Page}    page       The Page object of the calling function.
 * @param {string}  panelTitle The title of the panel to expand or collapse.
 * @param {boolean} expand     Whether to expand or collapse the panel.
 */
export const setSidebarPanelExpanded = async (
	page: Page, panelTitle: string, expand: boolean
): Promise<void> => {
	const panelButton = page.getByRole( 'button', { name: panelTitle } );
	const isPanelExpanded = await panelButton.getAttribute( 'aria-expanded' );

	if ( expand && isPanelExpanded === 'false' ) {
		await panelButton.click();
	} else if ( ! expand && isPanelExpanded === 'true' ) {
		await panelButton.click();
	}
};

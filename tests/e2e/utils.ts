/**
 * External dependencies
 */
import { type Page } from '@playwright/test';

/**
 * WordPress dependencies
 */
import { Admin } from '@wordpress/e2e-test-utils-playwright';

export const PLUGIN_VERSION = '3.22.1';
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
	await page.goto( 'wp-admin/admin.php?page=parsely-settings' + ( bypassAPIValidation ? '&e2e_parsely_skip_api_validate=y' : '' ) );

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

	await admin.createNewPost();

	// Show the Content Intelligence Sidebar.
	await page.getByRole( 'button', { name: 'Parse.ly' } ).click();

	return getSidebarPanelOrTabMessage( page, selector );
};

/**
 * Gets a message from the PCI Editor Sidebar, expanding the Related Posts
 * panel when available, or reading the message from the tab level otherwise.
 *
 * When credentials are present, the Related Posts panel is visible and the
 * message is found inside the opened panel body. When credentials are absent,
 * the Related Posts panel is not rendered and the message appears at the tab
 * level instead.
 *
 * @since 3.22.1
 *
 * @param {Page}   page     The Page object of the calling function.
 * @param {string} selector The selector from which to extract the message.
 *
 * @return {Promise<string>} The message returned.
 */
export const getSidebarPanelOrTabMessage = async (
	page: Page, selector: string = '.content-helper-error-message'
): Promise<string> => {
	// Wait for the sidebar content to render.
	await page.locator( '.wp-parsely-content-helper' ).waitFor( { state: 'visible' } );

	const relatedPostsButton = page.getByRole( 'button', { name: 'Related Posts' } );
	const hasRelatedPostsPanel = ( await relatedPostsButton.count() ) > 0;

	// When credentials are absent, the Related Posts panel is not shown and
	// the message appears at the tab level.
	if ( hasRelatedPostsPanel ) {
		await setSidebarPanelExpanded( page, 'Related Posts', true );
		const panelMessage = page.locator(
			'.wp-parsely-content-helper div.components-panel__body.is-opened ' + selector
		);
		await panelMessage.waitFor( { state: 'visible' } );

		return ( await panelMessage.textContent() ) ?? '';
	}

	const tabMessage = page.locator( '.wp-parsely-content-helper ' + selector );
	await tabMessage.waitFor( { state: 'visible' } );

	return ( await tabMessage.textContent() ) ?? '';
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

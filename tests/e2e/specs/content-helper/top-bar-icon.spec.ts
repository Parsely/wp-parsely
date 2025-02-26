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
	setSidebarPanelExpanded,
	setSiteKeys,
} from '../../utils';

/**
 * Tests for the PCH Editor Sidebar top bar icon.
 *
 * @since 3.17.0 Migrated to Playwright.
 */
test.describe( 'PCH Editor Sidebar top bar icon in the WordPress Post Editor', () => {
	const noRelatedPostsMessage = 'No related posts found.';
	const emptyCredentialsMessage = 'Contact us about advanced plugin features and the Parse.ly dashboard.Existing Parse.ly customers can enable this feature by setting their Site ID and API Secret in wp-parsely options.';

	/**
	 * Verifies that the top bar icon gets displayed when the Site ID and API
	 * Secret are not provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should be displayed when the Site ID and API Secret are not provided', async ( { admin } ) => {
		const utils = new Utils( admin );

		expect( await utils.testContentHelperIcon( '', '' ) )
			.toMatch( emptyCredentialsMessage );
	} );

	/**
	 * Verifies that the top bar icon gets displayed when only the Site ID is
	 * provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should be displayed when only the Site ID is provided.', async ( { admin } ) => {
		const utils = new Utils( admin );

		expect( await utils.testContentHelperIcon( VALID_SITE_ID, '' ) )
			.toMatch( emptyCredentialsMessage );
	} );

	/**
	 * Verifies that the top bar icon gets displayed when only the API Secret is
	 * provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should be displayed when only the API Secret is provided', async ( { admin } ) => {
		const utils = new Utils( admin );

		expect( await utils.testContentHelperIcon( '', VALID_API_SECRET ) )
			.toMatch( emptyCredentialsMessage );
	} );

	/**
	 * Verifies that the top bar icon gets displayed when both the Site ID and
	 * API Secret are provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should be displayed when both the Site ID and API Secret are provided', async ( { admin } ) => {
		const utils = new Utils( admin );

		expect( await utils.testContentHelperIcon(
			VALID_SITE_ID, VALID_API_SECRET,
			'.related-posts-empty'
		) ).toMatch( noRelatedPostsMessage );
	} );

	/**
	 * Verifies that the top bar icon does not crash the WordPress Post Editor.
	 *
	 * More information: https://github.com/Parsely/wp-parsely/issues/962
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should not crash the editor', async ( { admin } ) => {
		const page = admin.page;
		const utils = new Utils( admin );

		await setSiteKeys( page, VALID_SITE_ID, VALID_API_SECRET );
		await admin.createNewPost();

		// Close Settings sidebar if it is opened.
		const toggleSidebarButton = page.getByRole(
			'button', { name: 'Settings', exact: true }
		);
		if ( 'true' === await toggleSidebarButton.getAttribute( 'aria-expanded' ) ) {
			await toggleSidebarButton.click();
		}

		// Ensure that the Options menu opens without crashing the Post Editor.
		await utils.toggleMoreMenu( 'open' );
		expect( await page.locator( 'div.components-dropdown-menu__menu' ).textContent() )
			.toMatch( 'Parse.ly' );
	} );
} );

/**
 * Provides utility functions for the tests in this file.
 *
 * @since 3.17.0 Migrated utility functions to Playwright.
 */
class Utils {
	/**
	 * The admin object of the calling function.
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
	 * Tests the top bar icon by clicking on it and verifying that the PCH Editor
	 * Sidebar opens.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 *
	 * @param {string} siteId    The Site ID to use for the test.
	 * @param {string} apiSecret The API Secret to use for the test.
	 * @param {string} selector  The selector from which to get the text content.
	 *
	 * @return {Promise<string>} Text content found in the PCH Editor Sidebar.
	 */
	async testContentHelperIcon(
		siteId: string, apiSecret: string, selector: string = '.content-helper-error-message'
	): Promise<string> {
		const page = this.admin.page;

		await setSiteKeys( page, siteId, apiSecret );
		await this.admin.createNewPost();

		// Click the top bar icon and // Expand the Related Posts panel.
		await page.getByRole( 'button', { name: 'Parse.ly' } ).click();
		setSidebarPanelExpanded( page, 'Related Posts', true );

		return await page.locator(
			'.wp-parsely-content-helper div.components-panel__body.is-opened ' + selector
		).textContent() ?? '';
	}

	/**
	 * Toggles the More Menu.
	 *
	 * @since 3.16.1
	 * @since 3.17.0 Moved from utils.ts and migrated to Playwright.
	 *
	 * @param {'open' | 'close' | undefined} waitFor Whether it should wait for the menu to open or close.
	 *                                               If `undefined`, it won't wait for anything.
	 */
	async toggleMoreMenu(
		waitFor: 'open' | 'close' | undefined = undefined
	): Promise<void> {
		const page = this.admin.page;

		const menuToggle = page.locator( 'button[aria-haspopup="true"][aria-label="Options"]' );
		const isOpen = await menuToggle.evaluate( ( el ) => el.getAttribute( 'aria-expanded' ) );

		// If opening and it's already open then exit early.
		if ( isOpen === 'true' && waitFor === 'open' ) {
			return;
		}

		// If closing and it's already closed then exit early.
		if ( isOpen === 'false' && waitFor === 'close' ) {
			return;
		}

		await menuToggle.click();
	}
}

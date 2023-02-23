/**
 * External dependencies.
 */
import {
	createNewPost,
	toggleMoreMenu,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies.
 */
import {
	setSiteKeys,
	startUpTest,
} from '../../../utils';

// Selectors.
const pluginButton = 'button[aria-label="Parse.ly Editor Sidebar"]';

/**
 * Tests for the PCH Editor Sidebar top bar icon.
 */
describe( 'PCH Editor Sidebar top bar icon in the WordPress Post Editor', () => {
	const contentHelperTitle = 'Performance DetailsRelated Top Posts';

	/**
	 * Logs in to WordPress and activates the Parse.ly plugin.
	 */
	beforeAll( async () => {
		await startUpTest();
	} );

	/**
	 * Verifies that the top bar icon gets displayed when the Site ID and API
	 * Secret are not provided.
	 */
	it( 'Should be displayed when the Site ID and API Secret are not provided', async () => {
		expect( await testContentHelperIcon() ).toMatch( contentHelperTitle );
	} );

	/**
	 * Verifies that the top bar icon gets displayed when only the Site ID is
	 * provided.
	 */
	it( 'Should be displayed when only the Site ID is provided.', async () => {
		expect( await testContentHelperIcon( 'blog.parsely.com' ) ).toMatch( contentHelperTitle );
	} );

	/**
	 * Verifies that the top bar icon gets displayed when only the API Secret is
	 * provided.
	 */
	it( 'Should be displayed when only the API Secret is provided', async () => {
		expect( await testContentHelperIcon( '', 'test' ) ).toMatch( contentHelperTitle );
	} );

	/**
	 * Verifies that the top bar icon gets displayed when both the Site ID and
	 * API Secret are provided.
	 */
	it( 'Should be displayed when both the Site ID and API Secret are provided', async () => {
		expect( await testContentHelperIcon( 'blog.parsely.com', 'test' ) ).toMatch( contentHelperTitle );
	} );

	/**
	 * Verifies that the top bar icon does not crash the WordPress Post Editor.
	 *
	 * More information: https://github.com/Parsely/wp-parsely/issues/962
	 */
	it( 'Should not crash the editor', async () => {
		await setSiteKeys( 'blog.parsely.com', 'test' );
		await createNewPost();

		// Close sidebar if it is opened.
		await page.waitForSelector( pluginButton, { visible: true } );
		const toggleSidebarButton = await page.$(
			'.edit-post-header__settings [aria-label="Settings"][aria-expanded="true"]'
		);
		if ( toggleSidebarButton ) {
			await toggleSidebarButton.click();
		}

		// Ensure that the menu opens without crashing the Post Editor.
		await toggleMoreMenu();
		await page.waitForSelector( 'div.components-dropdown-menu__menu', { visible: true } );
		const text = await page.$eval( 'div.components-dropdown-menu__menu', ( element: Element ) => element.textContent );
		expect( await text ).toMatch( 'Parse.ly' );
	} );
} );

/**
 * Tests the top bar icon by clicking on it and verifying that the PCH Editor
 * Sidebar opens.
 *
 * @param {string} siteId
 * @param {string} apiSecret
 * @return {string} Text content found in the PCH Editor Sidebar.
 */
async function testContentHelperIcon( siteId = '', apiSecret = '' ) {
	await setSiteKeys( siteId, apiSecret );
	await createNewPost();

	// Open the sidebar by clicking on the icon, to verify that it is visible and
	// working as expected.
	await page.waitForSelector( pluginButton, { visible: true } );
	const toggleSidebarButton = await page.$(
		pluginButton
	);
	if ( toggleSidebarButton ) {
		await toggleSidebarButton.click();
	}

	// Get the text content of the sidebar.
	await page.waitForSelector( 'div.wp-parsely-content-helper', { visible: true } );
	const text = await page.$eval(
		'div.wp-parsely-content-helper',
		( element: Element ) => element.textContent
	);

	// Close the sidebar for the next test.
	await toggleSidebarButton?.click();

	return text;
}

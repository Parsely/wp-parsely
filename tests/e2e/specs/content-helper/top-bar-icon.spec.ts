/**
 * WordPress dependencies
 */
import {
	createNewPost,
	toggleMoreMenu,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import {
	VALID_API_SECRET,
	VALID_SITE_ID,
	setSiteKeys,
} from '../../utils';

// Selectors.
const pluginButton = 'button[aria-label="Parse.ly"]';

/**
 * Tests for the PCH Editor Sidebar top bar icon.
 */
describe( 'PCH Editor Sidebar top bar icon in the WordPress Post Editor', () => {
	const noRelatedPostsMessage = 'No related posts by author "admin" were found for the specified period and metric.';
	const emptyCredentialsMessage = 'Contact us about advanced plugin features and the Parse.ly dashboard.Existing Parse.ly customers can enable this feature by setting their Site ID and API Secret in wp-parsely options.';

	/**
	 * Verifies that the top bar icon gets displayed when the Site ID and API
	 * Secret are not provided.
	 */
	it( 'Should be displayed when the Site ID and API Secret are not provided', async () => {
		expect( await testContentHelperIcon( '', '' ) )
			.toMatch( emptyCredentialsMessage );
	} );

	/**
	 * Verifies that the top bar icon gets displayed when only the Site ID is
	 * provided.
	 */
	it( 'Should be displayed when only the Site ID is provided.', async () => {
		expect( await testContentHelperIcon( VALID_SITE_ID, '' ) )
			.toMatch( emptyCredentialsMessage );
	} );

	/**
	 * Verifies that the top bar icon gets displayed when only the API Secret is
	 * provided.
	 */
	it( 'Should be displayed when only the API Secret is provided', async () => {
		expect( await testContentHelperIcon( '', VALID_API_SECRET ) )
			.toMatch( emptyCredentialsMessage );
	} );

	/**
	 * Verifies that the top bar icon gets displayed when both the Site ID and
	 * API Secret are provided.
	 */
	it( 'Should be displayed when both the Site ID and API Secret are provided', async () => {
		expect( await testContentHelperIcon(
			VALID_SITE_ID, VALID_API_SECRET,
			'.parsely-related-posts-descr'
		) )
			.toMatch( noRelatedPostsMessage );
	} );

	/**
	 * Verifies that the top bar icon does not crash the WordPress Post Editor.
	 *
	 * More information: https://github.com/Parsely/wp-parsely/issues/962
	 */
	it( 'Should not crash the editor', async () => {
		await setSiteKeys( VALID_SITE_ID, VALID_API_SECRET );
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
 * @param {string} selector
 * @return {string} Text content found in the PCH Editor Sidebar.
 */
async function testContentHelperIcon(
	siteId: string, apiSecret: string, selector = '.content-helper-error-message'
) {
	const contentHelperMessageSelector = '.wp-parsely-content-helper div.components-panel__body.is-opened ' + selector;

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

	// Get the text content of the Related Posts panel.
	await page.waitForSelector( contentHelperMessageSelector );
	await page.waitForFunction( // Wait for the message to appear.
		'document.querySelector("' + contentHelperMessageSelector + '").innerText.length > 0',
		{ polling: 'mutation', timeout: 5000 }
	);
	const text = await page.$eval( contentHelperMessageSelector, ( element: Element ): string => element.textContent ?? '' );

	// Close the sidebar for the next test.
	await toggleSidebarButton?.click();

	return text;
}

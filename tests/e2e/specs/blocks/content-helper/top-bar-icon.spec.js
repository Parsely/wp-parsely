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
	startUpTest,
	setSiteKeys,
} from '../../../utils';

// Selectors.
const pluginButton = 'button[aria-label="Parse.ly"]';

/**
 * Tests for the Content Helper's top bar icon.
 */
describe( 'Content Helper top bar icon in the WordPress Post Editor', () => {
	/**
	 * Logs in to WordPress and activates the Parse.ly plugin.
	 */
	beforeAll( async () => {
		await startUpTest();
	} );

	/**
	 * Verifies that the Content Helper top bar icon will not be displayed when
	 * a Site ID is not provided.
	 */
	it( 'Should not be displayed when a Site ID is not provided', async () => {
		await setSiteKeys( '', '' );
		await createNewPost();
		const content = await page.content();

		expect( content ).not.toMatch( pluginButton );
	} );

	/**
	 * Verifies that the Content Helper top bar icon does not crash the
	 * WordPress Post Editor.
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
		const text = await page.$eval( 'div.components-dropdown-menu__menu', ( element ) => element.textContent );
		expect( await text ).toMatch( 'Parse.ly' );
	} );
} );

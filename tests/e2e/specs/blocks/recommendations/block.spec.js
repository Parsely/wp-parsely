/**
 * External dependencies
 */
import {
	createNewPost,
	enablePageDialogAccept,
	insertBlock,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import {
	activatePluginApiKey,
	setSiteId,
	startUpTest,
} from '../../../utils';

/**
 * Tests for the Recommendations Block.
 */
describe( 'Recommendations Block', () => {
	/**
	 * Prevent browser from locking with dialogs, log in to WordPress,
	 * and activate the Parse.ly plugin.
	 */
	beforeAll( async () => {
		enablePageDialogAccept();
		await startUpTest();
	} );

	/**
	 * Verifies that the block will display results when a valid Site ID is provided.
	 */
	it( 'Should display results when a valid Site ID is provided', async () => {
		await setSiteId( 'wpvip.com' );
		await createNewPost();
		await insertBlock( 'Parse.ly' );

		// A list should appear within the block.
		await page.waitForSelector( '.parsely-recommendations-list' );

		// The Block title should be "Related Content" by default.
		const text = await page.$eval( '.parsely-recommendations-list-title', ( element ) => element.textContent );
		expect( text ).toMatch( 'Related Content' );

		// The list should contain 3 items by default.
		const itemsCount = await page.$$eval( '.parsely-recommendations-list > li', ( element ) => element.length );
		expect( itemsCount ).toBe( 3 );
	} );

	/**
	 * Verifies that the block will display an error when an invalid Site ID is provided.
	 */
	it( 'Should display an error when an invalid Site ID is provided', async () => {
		await activatePluginApiKey();
		await createNewPost();
		await insertBlock( 'Parse.ly' );

		await page.waitForSelector( '.parsely-recommendations-error' );
		const text = await page.$eval( '.parsely-recommendations-error', ( element ) => element.textContent );
		expect( text ).toMatch( 'Access denied. Please verify that your Site ID is valid.' );
	} );

	/**
	 * Verifies that the block will display an error when an empty Site ID is provided.
	 */
	it( 'Should display an error when an empty Site ID is provided', async () => {
		await setSiteId( '' );
		await createNewPost();
		await insertBlock( 'Parse.ly' );

		await page.waitForSelector( '.parsely-recommendations-error' );
		const text = await page.$eval( '.parsely-recommendations-error', ( element ) => element.textContent );
		expect( text ).toMatch( 'A Parse.ly API Key must be set in site options to use this endpoint' );
	} );
} );

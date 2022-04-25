/**
 * External dependencies.
 */
import {
	createNewPost,
	enablePageDialogAccept,
	insertBlock,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies.
 */
import {
	setSiteId,
	startUpTest,
} from '../../../utils';

/**
 * Tests for the Recommendations Block.
 */
describe( 'Recommendations Block', () => {
	/**
	 * Prevents browser from locking with dialogs, logs in to WordPress,
	 * and activates the Parse.ly plugin.
	 */
	beforeAll( async () => {
		enablePageDialogAccept();
		await startUpTest();
	} );

	/**
	 * Proves that the block will display an error when an invalid Site ID is provided.
	 */
	it( 'Should display an error when an invalid Site ID is provided', async () => {
		await setSiteId();
		await createNewPost();
		await insertBlock( 'Parse.ly' );

		await page.waitForSelector( '.parsely-recommendations-error' );
		const text = await page.$eval( '.parsely-recommendations-error', ( element ) => element.textContent );
		expect( text ).toMatch( 'Access denied. Please verify that your Site ID is valid.' );
	} );

	/**
	 * Proves that the block will display an error when an empty Site ID is provided.
	 */
	it( 'Should display an error when an empty Site ID is provided', async () => {
		await setSiteId( '' );
		await createNewPost();
		await insertBlock( 'Parse.ly' );

		await page.waitForSelector( '.parsely-recommendations-error' );
		const text = await page.$eval( '.parsely-recommendations-error', ( element ) => element.textContent );
		expect( text ).toMatch( 'A Parse.ly API Key must be set in site options to use this endpoint' );
	} );

	/**
	 * Proves that the block will display an error when the API is not accessible.
	 *
	 * Note: This test should be placed last in this file.
	 */
	it( 'Should display an error when the Parse.ly API is not accessible', async () => {
		await setSiteId();
		await createNewPost();
		await page.setOfflineMode( true );
		await insertBlock( 'Parse.ly' );

		await page.waitForSelector( '.parsely-recommendations-error' );
		const text = await page.$eval( '.parsely-recommendations-error', ( element ) => element.textContent );

		expect( text ).toMatch( 'The Parse.ly Recommendations API is not accessible. You may be offline.' );
	} );
} );

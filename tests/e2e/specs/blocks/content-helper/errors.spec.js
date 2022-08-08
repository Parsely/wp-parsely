/**
 * Internal dependencies.
 */
import {
	getContentHelperMessage,
	setSiteKeys,
	startUpTest,
} from '../../../utils';

/**
 * Tests for the errors presented by the Content Helper.
 */
describe( 'Content Helper', () => {
	/**
	 * Logs in to WordPress and activates the Parse.ly plugin.
	 */
	beforeAll( async () => {
		await startUpTest();
	} );

	/**
	 * Verifies that the Content Helper will display an error when an invalid
	 * Site ID is provided.
	 */
	it( 'Should display an error when an invalid Site ID is provided', async () => {
		await setSiteKeys( 'e2etest.example.com', 'test' );

		expect( await getContentHelperMessage() ).toMatch( 'Error: Forbidden' );
	} );

	/**
	 * Verifies that the Content Helper will display an error when the API
	 * Secret is not provided.
	 */
	it( 'Should display an error when an API Secret is not provided', async () => {
		await setSiteKeys( 'blog.parsely.com', '' );

		expect( await getContentHelperMessage() ).toMatch( 'Error: A Parse.ly API Secret must be set in site options to use this endpoint' );
	} );

	/**
	 * Verifies that the Content Helper will display an error when the API is
	 * not accessible.
	 */
	it( 'Should display an error when the Parse.ly API is not accessible', async () => {
		await setSiteKeys( 'blog.parsely.com', 'test' );

		expect( await getContentHelperMessage( null, null, true ) ).toMatch( 'WordPress Error: You are probably offline.' );
	} );
} );

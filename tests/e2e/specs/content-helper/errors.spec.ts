/**
 * Internal dependencies
 */
import {
	INVALID_SITE_ID,
	VALID_API_SECRET,
	VALID_SITE_ID,
	getRelatedPostsMessage,
	setSiteKeys,
} from '../../utils';

/**
 * Tests for the errors presented by the PCH Editor Sidebar Related Posts panel.
 */
describe( 'PCH Editor Sidebar Related Posts panel', () => {
	const contactMessage = 'Contact us about advanced plugin features and the Parse.ly dashboard.';

	/**
	 * Verifies that the panel will display an error when an invalid Site ID is
	 * provided.
	 */
	it( 'Should display an error when an invalid Site ID is provided', async () => {
		await setSiteKeys( INVALID_SITE_ID, VALID_API_SECRET );

		expect( await getRelatedPostsMessage( '', '', 'author', 500, '.content-helper-error-message' ) )
			.toMatch( 'Error: Forbidden' );
	} );

	/**
	 * Verifies that the panel will display a "Contact Us" message when the Site
	 * ID and API Secret are not provided.
	 */
	it( 'Should display a "Contact Us" message when the Site ID and API Secret are not provided', async () => {
		await setSiteKeys( '', '' );

		expect( await getRelatedPostsMessage() ).toMatch( contactMessage );
	} );

	/**
	 * Verifies that the panel will display a "Contact Us" message when only the
	 * Site ID is provided.
	 */
	it( 'Should display a "Contact Us" message when only the Site ID is provided', async () => {
		await setSiteKeys( VALID_SITE_ID, '' );

		expect( await getRelatedPostsMessage() ).toMatch( contactMessage );
	} );

	/**
	 * Verifies that the panel will display a "Contact Us" message when only the
	 * API Secret is provided.
	 */
	it( 'Should display a "Contact Us" message when only the API Secret is provided', async () => {
		await setSiteKeys( '', VALID_API_SECRET );

		expect( await getRelatedPostsMessage() ).toMatch( contactMessage );
	} );

	/**
	 * Verifies that the panel will not display a "Contact Us" message when both
	 * the Site ID and API Secret are provided.
	 */
	it( 'Should not display a "Contact Us" message when both the Site ID and API Secret are provided', async () => {
		await setSiteKeys( VALID_SITE_ID, VALID_API_SECRET );

		expect( await getRelatedPostsMessage( '', '', 'author', 500, '.related-posts-descr' ) ).not.toMatch( contactMessage );
	} );
} );

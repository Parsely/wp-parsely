/**
 * WordPress dependencies
 */
import {
	expect,
	test,
} from '@wordpress/e2e-test-utils-playwright';

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
 *
 * @since 3.17.0 Migrated to Playwright.
 */
test.describe( 'PCH Editor Sidebar Related Posts panel', () => {
	const contactMessage = 'Contact us about advanced plugin features and the Parse.ly dashboard.';

	/**
	 * Verifies that the panel will display an error when an invalid Site ID is
	 * provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should display an error when an invalid Site ID is provided', async ( { admin } ) => {
		await setSiteKeys( admin.page, INVALID_SITE_ID, VALID_API_SECRET );

		expect( await getRelatedPostsMessage(
			admin, '', '', 'author', '.content-helper-error-message'
		) ).toMatch( 'Error: Forbidden' );
	} );

	/**
	 * Verifies that the panel will display a "Contact Us" message when the Site
	 * ID and API Secret are not provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should display a "Contact Us" message when the Site ID and API Secret are not provided', async ( { admin } ) => {
		await setSiteKeys( admin.page, '', '' );

		expect( await getRelatedPostsMessage( admin ) ).toMatch( contactMessage );
	} );

	/**
	 * Verifies that the panel will display a "Contact Us" message when only the
	 * Site ID is provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should display a "Contact Us" message when only the Site ID is provided', async ( { admin } ) => {
		await setSiteKeys( admin.page, VALID_SITE_ID, '' );

		expect( await getRelatedPostsMessage( admin ) ).toMatch( contactMessage );
	} );

	/**
	 * Verifies that the panel will display a "Contact Us" message when only the
	 * API Secret is provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should display a "Contact Us" message when only the API Secret is provided', async ( { admin } ) => {
		await setSiteKeys( admin.page, '', VALID_API_SECRET );

		expect( await getRelatedPostsMessage( admin ) ).toMatch( contactMessage );
	} );

	/**
	 * Verifies that the panel will not display a "Contact Us" message when both
	 * the Site ID and API Secret are provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should not display a "Contact Us" message when both the Site ID and API Secret are provided', async ( { admin } ) => {
		await setSiteKeys( admin.page, VALID_SITE_ID, VALID_API_SECRET );

		expect( await getRelatedPostsMessage(
			admin, '', '', 'author', '.related-posts-descr' )
		).not.toMatch( contactMessage );
	} );
} );

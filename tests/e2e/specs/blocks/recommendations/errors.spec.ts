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
	VALID_SITE_ID,
	setSiteKeys,
} from '../../../utils';

/**
 * Tests for the Recommendations Block.
 *
 * @since 3.17.0 Migrated to Playwright.
 */
test.describe( 'Recommendations Block', () => {
	/**
	 * Verifies that the block will display an error when an invalid Site ID is provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should display an error when an invalid Site ID is provided', async ( { admin } ) => {
		const page = admin.page;

		await setSiteKeys( page, INVALID_SITE_ID, '' );
		await admin.createNewPost();
		await admin.editor.insertBlock( { name: 'wp-parsely/recommendations' } );

		await expect( page.getByText(
			'Access denied. Please verify that your Site ID is valid.',
			{ exact: true }
		) ).toBeVisible();
	} );

	/**
	 * Verifies that the block will display an error when an empty Site ID is provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should display an error when an empty Site ID is provided', async ( { admin } ) => {
		const page = admin.page;

		await setSiteKeys( page, '', '' );
		await admin.createNewPost();
		await admin.editor.insertBlock( { name: 'wp-parsely/recommendations' } );

		await expect( page.getByText(
			'To use this Block, a Parse.ly Site ID must be set in the plugin\'s options',
			{ exact: true }
		) ).toBeVisible();
	} );

	/**
	 * Verifies that the block will display an error when the API is not accessible.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should display an error when the Parse.ly API is not accessible', async ( { admin } ) => {
		const page = admin.page;
		const context = admin.context;

		await setSiteKeys( page, VALID_SITE_ID, '' );
		await admin.createNewPost();
		await context.setOffline( true );
		await admin.editor.insertBlock( { name: 'wp-parsely/recommendations' } );

		await expect( page.getByText(
			'The Parse.ly Recommendations API is not accessible. You may be offline.',
			{ exact: true }
		) ).toBeVisible();

		context.setOffline( false );
	} );
} );

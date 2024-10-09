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
	VALID_SITE_ID,
	setSiteKeys,
} from '../utils';

/**
 * Tests for the activation flow of the plugin.
 *
 * @since 3.17.0 Migrated to Playwright.
 */
test.describe( 'Activation flow', (): void => {
	/**
	 * Verifies that the plugin displays an error when the Site ID is not provided.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should show an error message when no Site ID is provided', async ( { admin } ): Promise<void> => {
		const page = admin.page;

		await setSiteKeys( page, '', '' );

		await admin.visitAdminPage( '/options-general.php?page=parsely' );

		const errorMessage = page.getByText(
			'The Parse.ly plugin is not active. You need to provide your Parse.ly Dash Site ID before things get cooking.',
			{ exact: true }
		);

		await expect( errorMessage ).toBeVisible();

		await setSiteKeys( page, VALID_SITE_ID, '' );

		await expect( errorMessage ).toBeHidden();
	} );

	/**
	 * Verifies that the Settings page behaves as expected.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should present a settings page that behaves as expected', async ( { admin } ): Promise<void> => {
		const page = admin.page;

		await admin.visitAdminPage( '/options-general.php?page=parsely' );

		// Initialize locators.
		const basicTab = page.getByRole( 'link', { name: 'Basic' } );
		const basicSection = page.locator( '.basic-section' );
		const contentHelperTab = page.getByRole( 'link', { name: 'Content Helper' } );
		const contentHelperSection = page.locator( '.content-helper-section' );
		const recrawlTab = page.getByRole( 'link', { name: 'Recrawl' } );
		const recrawlSection = page.locator( '.recrawl-section' );
		const advancedTab = page.getByRole( 'link', { name: 'Advanced' } );
		const advancedSection = page.locator( '.advanced-section' );

		// Check that all tabs are present in the Settings page.
		await expect( basicTab ).toBeVisible();
		await expect( contentHelperTab ).toBeVisible();
		await expect( recrawlTab ).toBeVisible();
		await expect( advancedTab ).toBeVisible();

		// Check that by default, the Basic Settings section is active.
		await expect( basicSection ).toBeVisible();
		await expect( contentHelperSection ).toBeHidden();
		await expect( recrawlSection ).toBeHidden();
		await expect( advancedSection ).toBeHidden();

		// Test section visibility when the Basic tab is clicked.
		await basicSection.click();
		await expect( basicSection ).toBeVisible();
		await expect( contentHelperSection ).toBeHidden();
		await expect( recrawlSection ).toBeHidden();
		await expect( advancedSection ).toBeHidden();

		// Test section visibility when the Content Helper tab is clicked.
		await contentHelperTab.click();
		await expect( basicSection ).toBeHidden();
		await expect( contentHelperSection ).toBeVisible();
		await expect( recrawlSection ).toBeHidden();
		await expect( advancedSection ).toBeHidden();

		// Test section visibility when the Recrawl tab is clicked.
		await recrawlTab.click();
		await expect( basicSection ).toBeHidden();
		await expect( contentHelperSection ).toBeHidden();
		await expect( recrawlSection ).toBeVisible();
		await expect( advancedSection ).toBeHidden();

		// Test section visibility when the Advanced tab is clicked.
		await advancedTab.click();
		await expect( basicSection ).toBeHidden();
		await expect( contentHelperSection ).toBeHidden();
		await expect( recrawlSection ).toBeHidden();
		await expect( advancedSection ).toBeVisible();
	} );
} );

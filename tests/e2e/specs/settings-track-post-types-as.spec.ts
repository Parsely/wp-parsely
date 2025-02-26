/**
 * External dependencies
 */
import { type Page } from '@playwright/test';

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
	VALID_API_SECRET,
	VALID_SITE_ID,
	setSiteKeys,
} from '../utils';

/**
 * Tests for the "Track Post Types as" settings.
 *
 * @since 3.17.0 Migrated to Playwright.
 */
test.describe( 'Track Post Types as', () => {
	// Radio button selectors.
	const radioPostAsPost = 'input#track_post_types_as_post_post';
	const radioPostAsPage = '#track_post_types_as_post_page';
	const radioPostAsNone = '#track_post_types_as_post_none';
	const radioPageAsPost = '#track_post_types_as_page_post';
	const radioPageAsPage = '#track_post_types_as_page_page';
	const radioPageAsNone = '#track_post_types_as_page_none';
	const radioAttachmentAsPost = '#track_post_types_as_attachment_post';
	const radioAttachmentAsPage = '#track_post_types_as_attachment_page';
	const radioAttachmentAsNone = '#track_post_types_as_attachment_none';

	/**
	 * Sets a valid Site ID and API Secret.
	 *
	 * Runs before all tests.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test.beforeAll( async ( { browser } ) => {
		const page = await browser.newPage();

		await setSiteKeys( page, VALID_SITE_ID, VALID_API_SECRET );
	} );

	/**
	 * Set default values and save.
	 *
	 * Runs after all tests.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test.afterAll( async ( { browser } ) => {
		const page = await browser.newPage();
		const utils = new Utils( page );

		await utils.activateRecrawlSection();

		await page.click( radioPostAsPost );
		await page.click( radioPageAsPage );
		await page.click( radioAttachmentAsNone );

		await page.click( '#submit' );

		await setSiteKeys( page, '', '' );
	} );

	/**
	 * Wait for last radio button to be ready.
	 *
	 * Runs before each test.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test.beforeEach( async ( { page } ) => {
		const utils = new Utils( page );

		await utils.activateRecrawlSection();
	} );

	/**
	 * Verifies that saving selections in a non-default configuration works.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should be able to save non-default selections', async ( { page } ) => {
		const utils = new Utils( page );

		// Set new radio values
		await page.locator( radioPostAsNone ).click();
		await page.locator( radioPageAsPost ).click();
		await page.locator( radioAttachmentAsPage ).click();

		await utils.saveSettingsAndHardRefresh();

		// Verify that post is tracked as none.
		await expect( page.locator( radioPostAsPost ) ).not.toBeChecked();
		await expect( page.locator( radioPostAsPage ) ).not.toBeChecked();
		await expect( page.locator( radioPostAsNone ) ).toBeChecked();

		// Verify that page is tracked as post
		await expect( page.locator( radioPageAsPost ) ).toBeChecked();
		await expect( page.locator( radioPageAsPage ) ).not.toBeChecked();
		await expect( page.locator( radioPageAsNone ) ).not.toBeChecked();

		// Verify that attachment is tracked as page
		await expect( page.locator( radioAttachmentAsPost ) ).not.toBeChecked();
		await expect( page.locator( radioAttachmentAsPage ) ).toBeChecked();
		await expect( page.locator( radioAttachmentAsNone ) ).not.toBeChecked();
	} );

	/**
	 * Verifies that saving all selections as "do not track" works.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should be able to save everything as none', async ( { page } ) => {
		const utils = new Utils( page );

		// Set all radio values to none.
		await page.locator( radioPostAsNone ).click();
		await page.locator( radioPageAsNone ).click();
		await page.locator( radioAttachmentAsNone ).click();

		await utils.saveSettingsAndHardRefresh();

		// Check that all selections are set to 'none'.
		await expect( page.locator( radioPostAsPost ) ).not.toBeChecked();
		await expect( page.locator( radioPostAsPage ) ).not.toBeChecked();
		await expect( page.locator( radioPostAsNone ) ).toBeChecked();
		await expect( page.locator( radioPageAsPost ) ).not.toBeChecked();
		await expect( page.locator( radioPageAsPage ) ).not.toBeChecked();
		await expect( page.locator( radioPageAsNone ) ).toBeChecked();
		await expect( page.locator( radioAttachmentAsPost ) ).not.toBeChecked();
		await expect( page.locator( radioAttachmentAsPage ) ).not.toBeChecked();
		await expect( page.locator( radioAttachmentAsNone ) ).toBeChecked();
	} );

	/**
	 * Verifies that radio buttons can be navigated and set using the keyboard.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should be navigable with arrow and tab keys', async ( { page } ) => {
		const utils = new Utils( page );

		// Set initial values so we can start from a known position for each radio.
		await page.locator( radioPostAsNone ).click();
		await page.locator( radioPageAsNone ).click();
		await page.locator( radioAttachmentAsNone ).click();

		await utils.saveSettingsAndHardRefresh();

		// Scroll to table to make it easier to view when debugging.
		await page.evaluate( () => {
			document.querySelector( '#track-post-types' )?.scrollIntoView();
		} );

		// Make adjustments to values using keys and save.
		await page.locator( '#track-post-types' ).focus();
		await page.keyboard.press( 'Tab' );
		await page.keyboard.press( 'ArrowLeft' );
		await page.keyboard.press( 'ArrowLeft' );
		await page.keyboard.press( 'ArrowRight' );
		await page.keyboard.press( 'ArrowUp' );
		await page.keyboard.press( 'Tab' );
		await page.keyboard.press( 'ArrowDown' );
		await page.keyboard.press( 'ArrowDown' );

		await utils.saveSettingsAndHardRefresh();

		// The above keys should set the default options. Verify that this is the case.
		await expect( page.locator( radioPostAsPost ) ).toBeChecked();
		await expect( page.locator( radioPostAsPage ) ).not.toBeChecked();
		await expect( page.locator( radioPostAsNone ) ).not.toBeChecked();
		await expect( page.locator( radioPageAsPost ) ).not.toBeChecked();
		await expect( page.locator( radioPageAsPage ) ).toBeChecked();
		await expect( page.locator( radioPageAsNone ) ).not.toBeChecked();
		await expect( page.locator( radioAttachmentAsPost ) ).not.toBeChecked();
		await expect( page.locator( radioAttachmentAsPage ) ).not.toBeChecked();
		await expect( page.locator( radioAttachmentAsNone ) ).toBeChecked();
	} );
} );

/**
 * Provides utility functions for the tests in this file.
 *
 * @since 3.17.0 Migrated utility functions to Playwright.
 */
class Utils {
	/**
	 * The Page object of the calling function.
	 *
	 * @since 3.17.0
	 */
	readonly page: Page;

	/**
	 * Constructor.
	 *
	 * @since 3.17.0
	 *
	 * @param {Page} page The Page object of the calling function.
	 */
	constructor( page: Page ) {
		this.page = page;
	}

	/**
	 * Navigates to the plugin's Settings page and activates the Recrawl section.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	async activateRecrawlSection(): Promise<void> {
		await this.page.goto( '/wp-admin/options-general.php?page=parsely' );
		await this.page.click( '.recrawl-section-tab' );
	}

	/**
	 * Saves settings in the settings page and forces a hard refresh.
	 *
	 * @since 3.17.0 Moved from utils.js and migrated to Playwright.
	 */
	async saveSettingsAndHardRefresh(): Promise<void> {
		const saveButton = this.page.getByRole( 'button', { name: 'Save Changes' } );

		await saveButton.click();
		await saveButton.waitFor();
		await this.page.evaluate( () => {
			location.reload();
		} );
		await saveButton.waitFor();
	}
}

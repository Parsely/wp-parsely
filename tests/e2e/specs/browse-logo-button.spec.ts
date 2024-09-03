/**
 * External dependencies
 */
import * as path from 'path';

/**
 * WordPress dependencies
 */
import {
	expect,
	test,
} from '@wordpress/e2e-test-utils-playwright';

/**
 * Tests the Settings page's Browse button behavior.
 *
 * @since 3.17.0 Migrated to Playwright.
 */
test.describe( 'Browse for logo button', () => {
	// General initializations.
	const uploadedImagePattern = /\/wp-content\/uploads\/\d{4}\/\d{2}\/icon-256x256-?\d*\.png$/;
	const filePathInput = '#media-single-image-logo input.file-path';
	const modalAttachment = 'li.attachment';

	// Media library modal selectors.
	const modalMediaLibrary = 'div.media-modal-content';
	const modalConfirmButton = `${ modalMediaLibrary } button.media-button-select`;
	const modalFileUploadInput = `${ modalMediaLibrary } input[type=file]`;

	/**
	 * Deletes all uploaded images.
	 *
	 * Runs after all tests.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.deleteAllMedia();
	} );

	/**
	 * Clicks the Browse button in the Settings page, to show the Media Library.
	 *
	 * Runs before each test.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test.beforeEach( async ( { admin } ) => {
		const modalSelectFilesButton = '#media-single-image-logo button.browse';

		await admin.visitAdminPage( '/options-general.php?page=parsely' );

		await admin.page.click( modalSelectFilesButton );
	} );

	/**
	 * Verifies that the image path gets set when a new image is uploaded and
	 * confirmed.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should set the file path when a new image is uploaded and confirmed', async ( { page } ) => {
		const imageLocalPath: string = path.resolve(
			__dirname, '../../../.wordpress-org/icon-256x256.png'
		);

		// Upload an image file and confirm the dialog.
		await page.setInputFiles( modalFileUploadInput, imageLocalPath );
		await page.click( modalConfirmButton );

		// Verify that the image path has been updated.
		await expect( page.locator( filePathInput ) )
			.toHaveValue( uploadedImagePattern );
	} );

	/**
	 * Verifies that the image path gets set when an existing image is selected
	 * and confirmed.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should set the file path when an existing image is selected and confirmed', async ( { page } ) => {
		// Select the existing and confirm the dialog.
		await page.click( modalAttachment );
		await page.click( modalConfirmButton );

		// Verify that the image path has been updated.
		await expect( page.locator( filePathInput ) )
			.toHaveValue( uploadedImagePattern );
	} );

	/**
	 * Verifies that the image path doesn't get set when the Media Library modal
	 * gets dismissed by the user.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should not set the file path when dismissing the modal', async ( { page } ) => {
		// Select the existing image but cancel the dialog.
		await page.click( modalAttachment );
		await page.keyboard.press( 'Escape' );

		// Verify that the image path is empty.
		await expect( page.locator( filePathInput ) )
			.toHaveValue( '' );
	} );
} );

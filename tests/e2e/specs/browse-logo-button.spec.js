/**
 * External dependencies
 */
import {
	activatePlugin,
	loginUser,
	visitAdminPage,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { waitForWpAdmin } from '../utils';

/**
 * Initializations
 */
const imageLocalPath = require( 'path' ).resolve( __dirname, '../../..' ) + '/.wordpress-org/icon-256x256.png';
const uploadedImagePattern = /\/wp-content\/uploads\/\d{4}\/\d{2}\/icon-256x256-?\d*\.png$/;
const filePathInput = '#media-single-image-logo input.file-path';
const modalAttachment = 'li.attachment'; // Used in both modals.

// Media library modal
const modalMediaLibrary = 'div.media-modal-content';
const modalSelectFilesButton = '#media-single-image-logo button.browse';
const modalConfirmButton = `${ modalMediaLibrary } button.media-button-select`;
const modalFileUploadInput = `${ modalMediaLibrary } input[type=file]`;

// Edit attachment modal
const modalEditAttachment = 'div.media-modal div.edit-attachment-frame';
const modalDeleteAttachmentLink = `${ modalEditAttachment } button.delete-attachment`;

/**
 * Before all tests, login and activate the Parse.ly plugin.
 */
beforeAll( async () => {
	await loginUser();
	await activatePlugin( 'wp-parsely' );
} );

/**
 * After all tests, remove the uploaded image.
 */
afterAll( async () => {
	// Go to Media Library and select the image.
	await visitAdminPage( '/upload.php' );
	await page.waitForSelector( modalAttachment, {
		visible: true,
	} );
	await page.click( modalAttachment );
	await page.waitForSelector( modalEditAttachment, {
		visible: true,
	} );

	// Confirm image deletion.
	// Note: Dialog handling must be placed before the click event.
	await page.on( 'dialog', async ( dialog ) => {
		await dialog.accept();
	} );
	await page.click( modalDeleteAttachmentLink );
} );

/**
 * Before each test, go to settings page and click the browse button.
 */
beforeEach( async () => {
	// Go to settings page (resets page selections).
	await visitAdminPage( '/options-general.php', '?page=parsely' );
	await waitForWpAdmin();

	// Click browse button and wait for Media Library to appear.
	await page.click( modalSelectFilesButton );
	await page.waitForSelector( modalMediaLibrary, {
		visible: true,
	} );
} );

/**
 * Browse button tests
 */
describe( 'Browse for logo button', () => {
	it( 'Should set the file path when a new image is uploaded and confirmed', async () => {
		// Upload an image file and confirm the dialog.
		const fileInput = await page.$( modalFileUploadInput );
		await fileInput.uploadFile( imageLocalPath );
		await page.click( modalConfirmButton );

		// Verify that that the image path has been updated.
		const filePath = await page.$eval( filePathInput, ( input ) => input.value );
		expect( filePath ).toMatch( uploadedImagePattern );
	} );

	it( 'Should set the file path when an existing image is selected and confirmed', async () => {
		// Select the existing and confirm the dialog.
		await page.click( modalAttachment );
		await page.click( modalConfirmButton );

		// Verify that that the image path has been updated.
		const filePath = await page.$eval( filePathInput, ( input ) => input.value );
		expect( filePath ).toMatch( uploadedImagePattern );
	} );

	it( 'Should not set the file path when quitting the modal', async () => {
		// Select the existing image but cancel the dialog.
		await page.click( modalAttachment );
		await page.keyboard.press( 'Escape' );

		// Verify that the image path is empty.
		const filePath = await page.$eval( filePathInput, ( input ) => input.value );
		expect( filePath ).toMatch( '' );
	} );
} );

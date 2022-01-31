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
import { activatePluginApiKey, checkH2DoesNotExist, deactivatePluginApiKey, waitForWpAdmin } from '../utils';

const selectScreenOptions = async ( recrawl, advanced ) => {
	const [ button ] = await page.$x( '//button[@id="show-settings-link"]' );
	await button.click();

	await page.waitForSelector( '#requires-recrawl' );

	if ( recrawl ) {
		await page.evaluate( () => {
			document.querySelector( '#requires-recrawl' ).parentElement.click();
		} );
	}

	if ( advanced ) {
		await page.evaluate( () => {
			document.querySelector( '#advanced' ).parentElement.click();
		} );
	}

	const [ input ] = await page.$x( '//p[contains(@class, \'submit\')]//input[contains(@name, \'screen-options-apply\')]' );
	await input.click();
};

describe( 'Activation flow', () => {
	beforeEach( async () => {
		await loginUser();
		await activatePlugin( 'wp-parsely' );
	} );

	it( 'Should progress as intended', async () => {
		await deactivatePluginApiKey();

		await visitAdminPage( '/options-general.php', '?page=parsely' );
		await waitForWpAdmin();

		const versionText = await page.$eval( '#wp-parsely_version', ( el ) => el.innerText );
		expect( versionText ).toMatch( /^Version \d+.\d+/ );

		const errorMessage = await page.$eval( '#message.error', ( el ) => el.innerText );
		expect( errorMessage ).toBe(
			'The Parse.ly plugin is not active. You need to provide your Parse.ly Dash Site ID before things get cooking.'
		);

		await activatePluginApiKey();

		await waitForWpAdmin();
		expect( await page.$( '#message.error' ) ).toBe( null );
	} );

	it( 'Should display all admin sections', async () => {
		await visitAdminPage( '/options-general.php', '?page=parsely' );

		await page.waitForXPath( '//h2[contains(text(), "Basic Settings")]' );
		expect( await checkH2DoesNotExist( 'Requires Recrawl Settings' ) ).toBe( true );
		expect( await checkH2DoesNotExist( 'Advanced Settings' ) ).toBe( true );

		await selectScreenOptions( true, true );

		await page.waitForXPath( '//h2[contains(text(), "Basic Settings")]' );
		await page.waitForXPath( '//h2[contains(text(), "Requires Recrawl Settings")]' );
		await page.waitForXPath( '//h2[contains(text(), "Advanced Settings")]' );

		await selectScreenOptions( false, true );

		await page.waitForXPath( '//h2[contains(text(), "Basic Settings")]' );
		await page.waitForXPath( '//h2[contains(text(), "Requires Recrawl Settings")]' );
		expect( await checkH2DoesNotExist( 'Advanced Settings' ) ).toBe( true );

		// Reverting to initial state
		await selectScreenOptions( true, false );
	} );
} );

/**
 * External dependencies
 */
import { activatePlugin, loginUser, visitAdminPage } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { activatePluginApiKey, deactivatePluginApiKey, waitForWpAdmin } from '../utils';

describe( 'Activation flow', () => {
	it( 'Should progress as intended', async () => {
		await loginUser();
		await activatePlugin( 'wp-parsely' );
		await deactivatePluginApiKey();

		await visitAdminPage( '/options-general.php', '?page=parsely' );
		await waitForWpAdmin();

		const versionText = await page.$eval( '#wp-parsely_version', ( el ) => el.innerText );
		expect( versionText ).toMatch( /^Version \d+.\d+/ );

		const errorData = await page.$eval( '#wp-parsely-apikey-error-notice', ( el ) => ( {
			classes: el.classList.value,
			message: el.innerText,
		} ) );

		expect( errorData.classes ).toBe( 'notice notice-error' );
		expect( errorData.message ).toBe(
			'The Parse.ly plugin is not active. You need to provide your Parse.ly Dash Site ID before things get cooking.'
		);

		await activatePluginApiKey();

		await waitForWpAdmin();
		expect( await page.$( '#message.error' ) ).toBe( null );
	} );
} );

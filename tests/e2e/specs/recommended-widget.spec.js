import {
	activatePlugin,
	loginUser,
	visitAdminPage,
} from '@wordpress/e2e-test-utils';

const waitForWpAdmin = () => page.waitForSelector( 'body.wp-admin' );

describe( 'Recommended widget', () => {
	jest.setTimeout( 30000 );
	it( 'Widget should be available', async () => {
		await loginUser();
		await activatePlugin( 'wp-parsely' );
		await visitAdminPage( '/widgets.php', '' );

		await waitForWpAdmin();

		await page.keyboard.press( 'Escape' );

		await page.click( '.block-list-appender' );
		await page.focus( '#block-editor-inserter__search-0' );
		await page.keyboard.type( 'parse.ly recommended widget' );

		const [ button ] = await page.$x( "//button[contains(., 'Parse.ly Recommended Widget')]" );
		await button.click();

		await page.waitForSelector( '.wp-block-legacy-widget__edit-form-title', {
			visible: true,
		} );

		const [ h3 ] = await page.$x( "//h3[contains(., 'Parse.ly Recommended Widget')]" );
		expect( h3 ).toBeTruthy();
	} );
} );

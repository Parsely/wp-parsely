import {
	activatePlugin,
	createNewPost,
	loginUser,
	visitAdminPage,
} from '@wordpress/e2e-test-utils';

describe( 'hola mundo', () => {
	jest.setTimeout( 30000 );
	it( 'should work', async () => {
		await loginUser();
		await activatePlugin( 'wp-parsely' );
		await visitAdminPage( '/options-general.php?page=parsely' );

		const nagDiv = await page.$( '#message.error' );
		expect( nagDiv.innerText ).toBe(
			'The Parse.ly plugin is not active. You need to provide your Parse.ly Dash Site ID before things get cooking.'
		);
	} );
} );

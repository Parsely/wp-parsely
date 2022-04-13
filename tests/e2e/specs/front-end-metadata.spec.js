/**
 * External dependencies
 */
import { createURL, visitAdminPage } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { changeKeysState, selectScreenOptions, startUpTest } from '../utils';

const setMetadataFormat = async ( format ) => {
	await visitAdminPage( '/options-general.php', '?page=parsely' );
	await selectScreenOptions( { recrawl: true, advanced: false } );

	await page.select( '#parsely[meta_type]', format );

	const [ input ] = await page.$x( '//p[contains(@class, \'submit\')]//input[contains(@name, \'submit\')]' );
	await input.click();
};

describe( 'Front end metadata insertion', () => {
	beforeAll( startUpTest );

	beforeEach( async () => {
		await changeKeysState( true, false );
	} );

	it( 'Should insert JSON LD on homepage', async () => {
		await setMetadataFormat( 'json_ld' );

		await page.goto( createURL( '/' ) );
	} );

	it( 'Should insert repeated metas on homepage', async () => {
		await setMetadataFormat( 'repeated_metas' );

		await page.goto( createURL( '/' ) );

		const content = await page.content();

		expect( content ).toContain( '<meta name="parsely-title" content="wp-parsely">' );
		expect( content ).toContain( '<meta name="parsely-link" content="http://localhost:8889">' );
		expect( content ).toContain( '<meta name="parsely-type" content="index">' );
	} );

	it( 'Should insert repeated metas on post page', async () => {
		await setMetadataFormat( 'repeated_metas' );

		await page.goto( createURL( '/', '?p=1' ) );

		const content = await page.content();

		expect( content ).toContain( '<meta name="parsely-title" content="Hello world!">' );
		expect( content ).toContain( '<meta name="parsely-link" content="http://localhost:8889/?p=1">' );
		expect( content ).toContain( '<meta name="parsely-type" content="post">' );
		expect( content ).toContain( '<meta name="parsely-pub-date" content="' );
		expect( content ).toContain( '<meta name="parsely-section" content="Uncategorized">' );
		expect( content ).toContain( '<meta name="parsely-author" content="admin">' );
	} );
} );

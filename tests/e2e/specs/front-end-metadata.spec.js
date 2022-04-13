/**
 * External dependencies
 */
import { createURL } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { changeKeysState, startUpTest } from '../utils';

describe( 'Front end metadata insertion', () => {
	beforeAll( startUpTest );

	it( 'Should insert repeated metas on homepage', async () => {
		await changeKeysState( true, false );

		await page.goto( createURL( '/' ) );

		const content = await page.content();

		expect( content ).toContain( '<meta name="parsely-title" content="wp-parsely">' );
		expect( content ).toContain( '<meta name="parsely-link" content="http://localhost:8889">' );
		expect( content ).toContain( '<meta name="parsely-type" content="index">' );
	} );

	it( 'Should insert repeated metas on post page', async () => {
		await changeKeysState( true, false );

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

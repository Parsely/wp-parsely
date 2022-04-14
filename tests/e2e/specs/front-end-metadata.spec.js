/**
 * External dependencies
 */
import { createURL, visitAdminPage } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { changeKeysState, selectScreenOptions, startUpTest, waitForWpAdmin } from '../utils';

const setMetadataFormat = async ( format ) => {
	await visitAdminPage( '/options-general.php', '?page=parsely' );
	await waitForWpAdmin();

	await page.select( 'select', format );

	const [ input ] = await page.$x( '//p[contains(@class, \'submit\')]//input[contains(@name, \'submit\')]' );
	await input.click();

	await waitForWpAdmin();
};

describe( 'Front end metadata insertion', () => {
	beforeAll( async () => {
		await startUpTest();
		await changeKeysState( true, false );
		await selectScreenOptions( { recrawl: true, advanced: false } );
	} );

	it( 'Should insert JSON LD on homepage', async () => {
		await setMetadataFormat( 'json_ld' );

		await page.goto( createURL( '/' ) );

		const content = await page.content();

		expect( content ).toContain( '<script type="application/ld+json">\n' +
			'{"@context":"https:\\/\\/schema.org","@type":"WebPage","headline":"wp-parsely","url":"http:\\/\\/localhost:8889"}\n' +
		'</script>' );
	} );

	it( 'Should insert JSON LD on post page', async () => {
		await setMetadataFormat( 'json_ld' );

		await page.goto( createURL( '/', '?p=1' ) );

		const content = await page.content();

		expect( content ).toContain( '<script type="application/ld+json">' );
		expect( content ).toContain( '{"@context":"https:\\/\\/schema.org","@type":"NewsArticle","mainEntityOfPage":{"@type":"WebPage","@id":"http:\\/\\/localhost:8889\\/?p=1"},"headline":"Hello world!","url":"http:\\/\\/localhost:8889\\/?p=1","thumbnailUrl":"","image":{"@type":"ImageObject","url":""},' );
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
		expect( content ).toMatch( /<meta name="parsely-pub-date" content=".*Z">/ );
		expect( content ).toContain( '<meta name="parsely-section" content="Uncategorized">' );
		expect( content ).toContain( '<meta name="parsely-author" content="admin">' );
	} );
} );

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
	VALID_SITE_ID,
	setSiteKeys,
} from '../../../utils';

/**
 * Tests for the Recommendations Block's settings functionality.
 *
 * @since 3.17.0 Migrated to Playwright.
 */
test.describe( 'Recommendations Block', () => {
	/**
	 * Verifies that the Block works correctly when changing settings.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 */
	test( 'Should update correctly when any options are changed', async ( { admin } ) => {
		const page = admin.page;
		const editor = admin.editor;
		const utils = new Utils( page );

		// Insert the Block in a new post.
		await setSiteKeys( page, VALID_SITE_ID, '' );
		await admin.createNewPost();
		await editor.insertBlock( { name: 'wp-parsely/recommendations' } );

		// Verify Block default values.
		const listItems = page.locator( '.parsely-recommendations-list > li' );
		await expect( page.locator( '.parsely-recommendations-list-title' ) )
			.toHaveText( 'Related Content' );
		await expect( listItems ).toHaveCount( 3 );
		expect( page.locator( '.parsely-recommendations-image' ) )
			.toBeTruthy();

		// Open sidebar to start changing settings.
		await editor.openDocumentSettingsSidebar();

		// Verify that changing "Title" works.
		const titleInput = page.getByLabel( 'Title', { exact: true } );
		await titleInput.fill( 'Test' );
		await expect( titleInput ).toHaveValue( 'Test' );

		// Verify that changing "Maximum Results" works.
		await page.getByRole( 'slider', { name: 'Maximum Results' } )
			.fill( '5' );
		await expect( listItems ).toHaveCount( 5 );

		// Verify that toggling "Open Links in New Tab" works.
		const internalLinkTargets = await utils.getLinkTargets();
		internalLinkTargets.forEach( function( link ) {
			expect( utils.arraysEqual( link, [ '_self', '' ] ) ).toBe( true );
		} );
		await page.getByLabel( 'Open Links in New Tab' ).click();
		const externalLinkTargets = await utils.getLinkTargets();
		externalLinkTargets.forEach( function( link ) {
			expect( utils.arraysEqual( link, [ '_blank', 'noopener' ] ) ).toBe( true );
		} );

		// For images, verify that original and thumbnail "src" attributes are different.
		const originalImagesUrls = await utils.getResultImageUrls();
		await page.getByLabel( 'Thumbnail from Parse.ly' ).click();
		const parselyImagesUrls = await utils.getResultImageUrls();
		expect( utils.arraysEqual( originalImagesUrls, parselyImagesUrls ) ).toBe( false );

		// Verify that toggling "Show Images" works.
		await page.getByLabel( 'Show Images' ).click();
		await expect( page.locator( '.parsely-recommendations-image' ) )
			.toHaveCount( 0 );
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
	 * Returns whether the passed arrays are equal.
	 *
	 * This function is meant to compare very simple arrays.Please don't use it to
	 * compare arrays that contain objects, or that are complex or large.
	 *
	 * @since 3.17.0 Moved from utils.ts.
	 *
	 * @param {Array<string | null>} array1
	 * @param {Array<string | null>} array2
	 *
	 * @return {boolean} Whether the passed arrays are equal.
	 */
	arraysEqual( array1: ( string | null )[], array2: ( string | null )[] ): boolean {
		return JSON.stringify( array1 ) === JSON.stringify( array2 );
	}

	/**
	 * Returns the "src" attribute of all images contained within the Block.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 *
	 * @return {Promise<Array<string | null>>} The "src" attribute of all images contained within the Block.
	 */
	async getResultImageUrls(): Promise<( string | null )[]> {
		return this.page.locator( '.parsely-recommendations-image' )
			.evaluateAll( ( images: Element[] ) => images.map( ( image: Element ) =>
				image.getAttribute( 'src' )
			) );
	}

	/**
	 * Returns the "target" and "rel" attribute of all links contained within the Block.
	 *
	 * @since 3.17.0 Migrated to Playwright.
	 *
	 * @return {Promise<Array<string, string>>} The "target" and "rel" attributes of all links contained within the Block.
	 */
	async getLinkTargets(): Promise<string[][]> {
		return this.page.locator( '.parsely-recommendations-link' )
			.evaluateAll( ( links: Element[] ) => links.map( ( link: Element ): string[] =>
				[ link.getAttribute( 'target' ) ?? '', link.getAttribute( 'rel' ) ?? '' ]
			) );
	}
}

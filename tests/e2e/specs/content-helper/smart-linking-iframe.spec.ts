/**
 * External dependencies
 */
import { type Page } from '@playwright/test';

/**
 * WordPress dependencies
 */
import { type Editor } from '@wordpress/e2e-test-utils-playwright';

/**
 * Internal dependencies
 */
import { expect, test } from '../../fixtures';
import { VALID_API_SECRET, VALID_SITE_ID, setSiteKeys } from '../../utils';

/**
 * The background color set by `.wp-parsely-block-overlay`. Used to verify the
 * overlay's stylesheet reached the document it is rendered in.
 *
 * @since 3.23.6
 */
const OVERLAY_BACKGROUND_COLOR = 'rgba(255, 255, 255, 0.85)';

/**
 * Anything exposing `locator()`, which both Page and FrameLocator do.
 *
 * @since 3.23.6
 */
type CanvasScope = Pick<Page, 'locator'>;

/**
 * Returns the client ID of the first block in the Editor.
 *
 * @since 3.23.6
 *
 * @param {Page} page The Page object of the calling function.
 *
 * @return {Promise<string>} The first block's client ID.
 */
const getFirstBlockClientId = async ( page: Page ): Promise<string> => {
	return page.evaluate( () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { wp } = window as any;

		return wp.data.select( 'core/block-editor' ).getBlocks()[ 0 ].clientId;
	} );
};

/**
 * Flags a block for the Smart Linking overlay. Dispatching to the store
 * exercises the generation code path without a Parse.ly API request.
 *
 * @since 3.23.6
 *
 * @param {Page}   page     The Page object of the calling function.
 * @param {string} clientId The client ID to overlay, or `all` for the full content overlay.
 */
const addOverlayBlock = async ( page: Page, clientId: string ): Promise<void> => {
	await page.evaluate( ( id: string ) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { wp } = window as any;

		wp.data.dispatch( 'wp-parsely/smart-linking' ).addOverlayBlock( id );
	}, clientId );
};

/**
 * Inserts a paragraph and returns its client ID.
 *
 * @since 3.23.6
 *
 * @param {Editor} editor The Editor object of the calling function.
 * @param {Page}   page   The Page object of the calling function.
 *
 * @return {Promise<string>} The paragraph block's client ID.
 */
const insertParagraph = async ( editor: Editor, page: Page ): Promise<string> => {
	await editor.insertBlock( {
		name: 'core/paragraph',
		attributes: { content: 'Smart Linking overlay test paragraph.' },
	} );

	return getFirstBlockClientId( page );
};

/**
 * Returns the scope holding the Editor canvas, so that assertions work whether
 * or not the canvas is iframed.
 *
 * WordPress 6.5 and later name the canvas iframe. WordPress 6.3 and 6.4 iframe
 * it without a name. Earlier versions do not iframe the Post Editor at all.
 *
 * @since 3.23.6
 *
 * @param {Editor} editor The Editor object of the calling function.
 * @param {Page}   page   The Page object of the calling function.
 *
 * @return {Promise<CanvasScope>} The scope to locate canvas elements in.
 */
const getCanvasScope = async ( editor: Editor, page: Page ): Promise<CanvasScope> => {
	if ( 0 < await page.locator( 'iframe[name="editor-canvas"]' ).count() ) {
		return editor.canvas;
	}

	if ( 0 < await page.locator( 'iframe' ).count() ) {
		return page.frameLocator( 'iframe' ).first();
	}

	return page;
};

/**
 * Tests for the Smart Linking Editor integrations in the Post Editor.
 *
 * The Post Editor is always iframed as of WordPress 7.1, iframed conditionally
 * from 6.3, and never iframed before that. These tests assert behavior in
 * whichever document holds the canvas, so they hold across all of them.
 *
 * @see https://make.wordpress.org/core/2026/08/03/iframed-editor-changes-in-wordpress-7-1/
 *
 * @since 3.23.6
 */
test.describe( 'Smart Linking in the Post Editor', () => {
	test.beforeEach( async ( { admin, page } ) => {
		await setSiteKeys( page, VALID_SITE_ID, VALID_API_SECRET );
		await admin.createNewPost();
	} );

	/**
	 * Reports which canvas mode the suite is running against, to make the other
	 * results in this file easier to interpret. Both modes are supported.
	 *
	 * @since 3.23.6
	 */
	test( 'Should resolve the Editor canvas in either mode', async ( { editor, page } ) => {
		await insertParagraph( editor, page );

		const isIframed = 0 < await page.locator( 'iframe' ).count();
		// eslint-disable-next-line no-console
		console.log( `Editor canvas is ${ isIframed ? 'iframed' : 'not iframed' }.` );

		const canvas = await getCanvasScope( editor, page );
		await expect( canvas.locator( '[data-block]' ).first() ).toBeVisible();
	} );

	/**
	 * @since 3.23.6
	 */
	test( 'Should render the block overlay inside the Editor canvas', async ( { editor, page } ) => {
		const clientId = await insertParagraph( editor, page );
		const canvas = await getCanvasScope( editor, page );

		await addOverlayBlock( page, clientId );

		await expect( canvas.locator( '.wp-parsely-block-overlay' ) ).toBeVisible();
	} );

	/**
	 * The overlay's actual purpose. Fails silently when the block element cannot
	 * be found.
	 *
	 * @since 3.23.6
	 */
	test( 'Should lock the overlaid block against editing', async ( { editor, page } ) => {
		const clientId = await insertParagraph( editor, page );
		const canvas = await getCanvasScope( editor, page );

		await addOverlayBlock( page, clientId );

		await expect( canvas.locator( `[data-block="${ clientId }"]` ) )
			.toHaveAttribute( 'contenteditable', 'false' );
	} );

	/**
	 * @since 3.23.6
	 */
	test( 'Should apply the overlay stylesheet inside the Editor canvas', async ( { editor, page } ) => {
		const clientId = await insertParagraph( editor, page );
		const canvas = await getCanvasScope( editor, page );

		await addOverlayBlock( page, clientId );

		await expect( canvas.locator( '.wp-parsely-block-overlay' ) )
			.toHaveCSS( 'background-color', OVERLAY_BACKGROUND_COLOR );
	} );

	/**
	 * The previous `contenteditable` value must be restored, not hardcoded.
	 *
	 * @since 3.23.6
	 */
	test( 'Should restore the block state when the overlay is removed', async ( { editor, page } ) => {
		const clientId = await insertParagraph( editor, page );
		const canvas = await getCanvasScope( editor, page );
		const blockLocator = canvas.locator( `[data-block="${ clientId }"]` );

		const initialContentEditable =
			await blockLocator.getAttribute( 'contenteditable' );

		await addOverlayBlock( page, clientId );
		await expect( canvas.locator( '.wp-parsely-block-overlay' ) ).toBeVisible();

		await page.evaluate( ( id: string ) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const { wp } = window as any;

			wp.data.dispatch( 'wp-parsely/smart-linking' ).removeOverlayBlock( id );
		}, clientId );

		await expect( canvas.locator( '.wp-parsely-block-overlay' ) ).toBeHidden();
		await expect( blockLocator )
			.toHaveAttribute( 'contenteditable', initialContentEditable ?? 'true' );
		await expect( blockLocator ).not.toHaveAttribute( 'aria-disabled', 'true' );
	} );

	/**
	 * The full content overlay is rendered outside the canvas. Guards against
	 * regressing it while fixing the per-block overlay.
	 *
	 * @since 3.23.6
	 */
	test( 'Should render the full content overlay over the Editor content', async ( { editor, page } ) => {
		await insertParagraph( editor, page );

		await addOverlayBlock( page, 'all' );

		const overlay = page.locator( '.wp-parsely-block-overlay.full-content-overlay' );
		await expect( overlay ).toBeVisible();
		await expect( overlay ).toHaveCSS( 'background-color', OVERLAY_BACKGROUND_COLOR );
	} );
} );

/**
 * Tests for the `smart-link` deep link, used by the "Open in Editor" button on
 * the inbound Smart Link details page.
 *
 * @since 3.23.6
 */
test.describe( 'Smart Linking deep link in the iframed Post Editor', () => {
	const SMART_LINK_UID = 'e2e-smart-link-uid';
	const SMART_LINK_TEXT = 'smart link';

	/**
	 * Creates a draft holding a Smart Link and opens it through the deep link.
	 *
	 * @since 3.23.6
	 *
	 * @param {Page}   page         The Page object of the calling function.
	 * @param {Object} requestUtils The RequestUtils object of the calling function.
	 */
	const createdPostIds: number[] = [];

	const openPostThroughDeepLink = async (
		page: Page,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		requestUtils: any
	): Promise<void> => {
		const post = await requestUtils.createPost( {
			title: 'Smart Linking deep link test',
			content: `<!-- wp:paragraph -->\n<p>Text with a <a href="https://example.com" data-smartlink="${ SMART_LINK_UID }">${ SMART_LINK_TEXT }</a> inside.</p>\n<!-- /wp:paragraph -->`,
			status: 'draft',
			date_gmt: '2026-01-01T00:00:00',
		} );
		createdPostIds.push( post.id );

		await page.goto(
			`wp-admin/post.php?post=${ post.id }&action=edit&smart-link=${ SMART_LINK_UID }`
		);
	};

	test.beforeEach( async ( { page } ) => {
		await setSiteKeys( page, VALID_SITE_ID, VALID_API_SECRET );
	} );

	// Only the posts created here are removed, so that other specs relying on
	// existing content are left untouched.
	test.afterEach( async ( { requestUtils } ) => {
		while ( createdPostIds.length > 0 ) {
			await requestUtils.rest( {
				method: 'DELETE',
				path: `/wp/v2/posts/${ createdPostIds.pop() }`,
				params: { force: true },
			} );
		}
	} );

	/**
	 * The Editor content lookup returns `null` once the canvas is iframed.
	 *
	 * @since 3.23.6
	 */
	test( 'Should not throw when opening a post through the deep link', async ( { editor, page, requestUtils, pageErrors } ) => {
		await openPostThroughDeepLink( page, requestUtils );
		const canvas = await getCanvasScope( editor, page );

		// Wait for the deep link handler to have run.
		await expect(
			canvas.locator( `a[data-smartlink="${ SMART_LINK_UID }"]` )
		).toBeVisible();

		expect( pageErrors ).toEqual( [] );
	} );

	/**
	 * @since 3.23.6
	 */
	test( 'Should select the Smart Link in the Editor canvas', async ( { editor, page, requestUtils } ) => {
		await openPostThroughDeepLink( page, requestUtils );
		const canvas = await getCanvasScope( editor, page );

		await expect(
			canvas.locator( `a[data-smartlink="${ SMART_LINK_UID }"]` )
		).toBeVisible();

		await expect.poll(
			async () => canvas.locator( 'body' ).evaluate(
				( body ) => body.ownerDocument.getSelection()?.toString() ?? ''
			),
			{ timeout: 10_000 }
		).toBe( SMART_LINK_TEXT );
	} );
} );

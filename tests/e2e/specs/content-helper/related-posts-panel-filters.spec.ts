/**
 * WordPress dependencies
 */
import {
	enablePageDialogAccept,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import {
	VALID_API_SECRET,
	VALID_SITE_ID,
	getRelatedPostsMessage,
	setSiteKeys,
	setUserDisplayName,
} from '../../utils';

/**
 * Tests for the PCH Editor Sidebar Related Post filters.
 */
describe( 'PCH Editor Sidebar Related Post panel filters', () => {
	/**
	 * Prevents browser from locking with dialogs, logs in to WordPress,
	 * activates the Parse.ly plugin, and sets valid site keys.
	 */
	beforeAll( async () => {
		enablePageDialogAccept();
		await setSiteKeys( VALID_SITE_ID, VALID_API_SECRET );
	} );

	/**
	 * Verifies that an attempt to fetch results is made when a Site ID and API
	 * Secret are provided.
	 */
	it( 'Should attempt to fetch results when a Site ID and API Secret are provided', async () => {
		await setUserDisplayName( 'admin', '' );

		expect( await getRelatedPostsMessage( '', '', 'author', 500, '.related-posts-empty' ) )
			.toMatch( `No related posts found.` );
	} );

	/**
	 * Verifies that the Related Posts panel will work correctly when a new
	 * taxonomy is added from within the WordPress Post Editor.
	 *
	 * Note: This test does not insert the taxonomy into the database before
	 * selecting it in the WordPress Post Editor. As such, a delay in
	 * intercepting the new value is expected, since it must first be stored
	 * into the database and then picked up by the Related Posts panel.
	 */
	it( 'Should work correctly when a taxonomy is added from within the WordPress Post Editor', async () => {
		const categoryName = 'Analytics That Matter';

		expect( await getRelatedPostsMessage( categoryName, '', 'section', 2000, '.related-posts-descr' ) )
			.toMatch( `Top related posts in the “${ categoryName }” section in the last 7 days.` );
	} );
} );

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
	getTopRelatedPostsMessage,
	setSiteKeys,
	setUserDisplayName,
} from '../../utils';

/**
 * Tests for the PCH Editor Sidebar Related Top Post filters.
 */
describe( 'PCH Editor Sidebar Related Top Post panel filters', () => {
	const messageSelector = '.parsely-top-posts-descr';

	/**
	 * Prevents browser from locking with dialogs, logs in to WordPress,
	 * activates the Parse.ly plugin, and sets valid site keys.
	 */
	beforeAll( async () => {
		enablePageDialogAccept();
		await setSiteKeys( 'blog.parsely.com', VALID_API_SECRET );
	} );

	/**
	 * Verifies that an attempt to fetch results is made when a Site ID and API
	 * Secret are provided.
	 */
	it( 'Should attempt to fetch results when a Site ID and API Secret are provided', async () => {
		await setUserDisplayName( 'admin', '' );

		expect( await getTopRelatedPostsMessage( '', '', 'author', 500, messageSelector ) )
			.toMatch( `No top posts by author "admin" were found for the specified period and metric.` );
	} );

	/**
	 * Verifies that the Related Top Posts panel will work correctly when a new
	 * taxonomy is added from within the WordPress Post Editor.
	 *
	 * Note: This test does not insert the taxonomy into the database before
	 * selecting it in the WordPress Post Editor. As such, a delay in
	 * intercepting the new value is expected, since it must first be stored
	 * into the database and then picked up by the Related Top Posts panel.
	 */
	it( 'Should work correctly when a taxonomy is added from within the WordPress Post Editor', async () => {
		const categoryName = 'Parse.ly Tips';

		expect( await getTopRelatedPostsMessage( categoryName, '', 'section', 2000, messageSelector ) )
			.toMatch( `Top posts in section "${ categoryName }" in the last 7 days.` );
	} );
} );

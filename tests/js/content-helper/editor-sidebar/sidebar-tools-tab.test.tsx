/**
 * Internal dependencies
 */
import { getBoostEngagementUrl } from '../../../../src/content-helper/editor-sidebar/tabs/sidebar-tools-tab';

describe( 'getBoostEngagementUrl', () => {
	/**
	 * Verifies the URL is built correctly on a standard (root) install.
	 *
	 * @since 3.22.1
	 */
	it( 'builds the correct URL on a standard install', () => {
		expect( getBoostEngagementUrl( 'http://example.org/wp-admin/', 123 ) ).toBe(
			'http://example.org/wp-admin/admin.php?page=parsely-dashboard-page#/engagement-boost/123'
		);
	} );

	/**
	 * Verifies the URL is built correctly on a subdirectory install where the
	 * admin URL differs from the site URL (e.g. siteurl = https://example.org/wordpress).
	 *
	 * @since 3.22.1
	 */
	it( 'builds the correct URL on a subdirectory install', () => {
		const url = getBoostEngagementUrl( 'http://example.org/wordpress/wp-admin/', 99 );

		expect( url ).toBe(
			'http://example.org/wordpress/wp-admin/admin.php?page=parsely-dashboard-page#/engagement-boost/99'
		);
		expect( url ).not.toMatch( /^\/wp-admin\// );
	} );
} );

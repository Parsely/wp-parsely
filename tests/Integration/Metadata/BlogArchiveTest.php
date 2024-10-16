<?php
/**
 * Integration Tests: Blog Archive pages metadata
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Metadata;

use Parsely\Metadata;
use Parsely\Parsely;

/**
 * Integration Tests for Blog Archive pages metadata.
 *
 * @see https://docs.parse.ly/metadata-jsonld/
 *
 * @covers \Parsely\Metadata::construct_metadata
 */
final class BlogArchiveTest extends NonPostTestCase {
	/**
	 * Verifies that the metadata generated for Blog Archive pages is as
	 * expected.
	 *
	 * @covers \Parsely\Metadata::__construct
	 * @covers \Parsely\Metadata::construct_metadata
	 * @covers \Parsely\Metadata\Metadata_Builder::get_current_url
	 * @uses \Parsely\Metadata\Metadata_Builder::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::build_basic
	 * @uses \Parsely\Metadata\Metadata_Builder::build_url
	 * @uses \Parsely\Metadata\Page_For_Posts_Builder::build_headline
	 * @uses \Parsely\Metadata\Page_For_Posts_Builder::get_metadata
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Utils\Utils::get_page_on_front
	 * @uses \Parsely\Utils\Utils::get_page_for_posts
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @group metadata
	 */
	public function test_blog_page_for_posts_paged(): void {
		// Setup Parsely object.
		$parsely = new Parsely();

		// Insert a page for the blog posts.
		$page_id = self::factory()->post->create(
			array(
				'post_type'  => 'page',
				'post_title' => 'Page for Posts',
				'post_name'  => 'page-for-posts',
			)
		);

		// Create 2 posts so that posts page has pagination.
		self::factory()->post->create();
		self::factory()->post->create();
		$page = $this->get_post( $page_id );

		// Set permalinks, as Parsely currently strips ?page_id=... from the URL
		// property. See https://github.com/Parsely/wp-parsely/issues/151.
		global $wp_rewrite;
		$wp_rewrite->set_permalink_structure( '/%postname%/' );

		// Set a static page to the homepage, set the newly created page to show
		// the posts, add pagination to posts page.
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', 1 );
		update_option( 'page_for_posts', $page_id );
		update_option( 'posts_per_page', 1 );

		// Make a request to the root of the site to set the global $wp_query
		// object.
		$this->go_to( self::get_permalink( $page_id ) . 'page/2' );

		// Create the structured data for that post.
		$metadata        = new Metadata( $parsely );
		$structured_data = $metadata->construct_metadata( $page );

		// Check the required properties exist.
		$this->assert_data_has_required_properties( $structured_data );

		// The headline should be the title of the post, not the name of the
		// site.
		self::assertSame( 'Page for Posts', $structured_data['headline'] ?? null );
		self::assertSame( self::get_permalink( $page_id ) . 'page/2', $structured_data['url'] ?? null );
	}
}

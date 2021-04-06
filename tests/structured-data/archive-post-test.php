<?php
/**
 * Structured Data Tests for non-posts.
 *
 * @package Parsely\Tests
 */

namespace Parsely\Tests;

/**
 * Structured Data Tests for non-posts.
 *
 * @see https://www.parse.ly/help/integration/jsonld
 * @covers \Parsely::construct_parsely_metadata
 */
final class Archive_Post_Test extends TestCase {
	public function setUp() {
		parent::setUp();

		update_option( 'show_on_front', 'posts' );
		delete_option( 'page_for_posts' );
		delete_option( 'page_on_front' );
	}

	/**
	 * Create 2 posts, set posts per page to 1, navigate to page 2 and test the structured data.
	 */
	public function test_home_page_for_posts_paged() {
		// Setup Parsley object.
		$parsely         = new \Parsely();
		$parsely_options = get_option( \Parsely::OPTIONS_KEY );

		// Insert 2 posts.
		$page_id = $this->factory()->post->create();
		$this->factory()->post->create();
		$page = get_post( $page_id );

		// Set permalinks, as Parsely currently strips ?page_id=... from the URL property.
		// See https://github.com/Parsely/wp-parsely/issues/151
		global $wp_rewrite;
		$wp_rewrite->set_permalink_structure('/%postname%/');

		// Set the homepage to show 1 post per page.
		update_option( 'posts_per_page', 1 );

		// Go to Page 2 of posts.
		$this->go_to( home_url('/page/2' ) );

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $page );

		// Check the required properties exist.
		$this->assert_data_has_required_properties( $structured_data );

		// The headline should be the name of the site, not the post_title of the latest post.
		self::assertEquals( 'Test Blog', $structured_data['headline'] );
		// The URL should be the current page, not the home url.
		self::assertEquals( home_url('/page/2'), $structured_data['url'] );
	}

	/**
	 * Create a single page, set as the posts page (blog archive) but not the home page, go to Page 2, and test the structured data.
	 */
	public function test_blog_page_for_posts_paged() {
		// Setup Parsley object.
		$parsely         = new \Parsely();
		$parsely_options = get_option( \Parsely::OPTIONS_KEY );

		// Insert a page for the blog posts.
		$page_id = $this->factory()->post->create( [ 'post_type' => 'page', 'post_title' => 'Page for Posts', 'post_name' => 'page-for-posts' ] );

		// Create 2 posts so that posts page has pagination
		$this->factory()->post->create();
		$this->factory()->post->create();
		$page    = get_post( $page_id );

		// Set permalinks, as Parsely currently strips ?page_id=... from the URL property.
		// See https://github.com/Parsely/wp-parsely/issues/151
		global $wp_rewrite;
		$wp_rewrite->set_permalink_structure('/%postname%/');

		// Set a static page to the homepage, set the newly created page to show the posts, add pagination to posts page
		update_option( 'show_on_front', 'page' );
		update_option('page_on_front', 1 );
		update_option( 'page_for_posts', $page_id );
		update_option( 'posts_per_page', 1 );

		// Make a request to the root of the site to set the global $wp_query object.
		$this->go_to( get_permalink( $page_id ) . 'page/2');

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $page );

		// Check the required properties exist.
		$this->assert_data_has_required_properties( $structured_data );

		// The headline should be the title of the post, not the name of the Site.
		self::assertEquals( 'Page for Posts', $structured_data['headline'] );
		self::assertEquals( get_permalink( $page_id ) . 'page/2', $structured_data['url'] );
	}

	public function assert_data_has_required_properties( $structured_data ) {
		$required_properties = $this->get_required_properties();

		array_walk(
			$required_properties,
			static function( $property, $index ) use ( $structured_data ) {
				self::assertArrayHasKey( $property, $structured_data, 'Data does not have required property: ' . $property );
			}
		);
	}

	private function get_required_properties() {
		return array(
			'@context',
			'@type',
			'headline',
			'url',
		);
	}
}

<?php
/**
 * Class SampleTest
 *
 * @package WordPress
 */

namespace Parsely\Tests;

use Parsely\Tests\TestCase as ParselyTestCase;

/**
 * Sample test case.
 *
 * @category   Class
 * @package    SampleTest
 */
class SampleTest extends ParselyTestCase {

	/**
	 * Internal variables
	 *
	 * @var string $post Name of the post to test.
	 */
	protected static $post;

	/**
	 * Internal variables
	 *
	 * @var string $news Unused?
	 */
	protected static $news;

	/**
	 * Internal variables
	 *
	 * @var string $local Unused?
	 */
	protected static $local;

	/**
	 * Internal variables
	 *
	 * @var string $example_county Unused?
	 */
	protected static $example_county;

	/**
	 * Internal variables
	 *
	 * @var string $parsely Holds the Parsely object.
	 */
	protected static $parsely;

	/**
	 * Internal variables
	 *
	 * @var string $custom_taxonomy Custom taxonomy for testing.
	 */
	protected static $custom_taxonomy;

	/**
	 * Internal variables
	 *
	 * @var string $taxonomy_factory Unused?
	 */
	protected static $taxonomy_factory;

	/**
	 * Internal variables
	 *
	 * @var string $parsely_html A chunk of HTML that we look for a page.
	 */
	protected static $parsely_html;

	/**
	 * The setUp before the entire class
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public static function setUpBeforeClass() {
	}

	/**
	 * The setUp run before each test
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function setUp() {
		parent::setUp();
		self::$parsely   = new \Parsely();
		$option_defaults = array(
			'apikey'                    => 'blog.parsely.com',
			'content_id_prefix'         => '',
			'use_top_level_cats'        => false,
			'cats_as_tags'              => false,
			'track_authenticated_users' => true,
			'custom_taxonomy_section'   => 'category',
			'lowercase_tags'            => true,
			'track_post_types'          => array( 'post' ),
			'track_page_types'          => array( 'page' ),
		);
		update_option( 'parsely', $option_defaults );
		self::$parsely_html = <<<PARSELYJS
<script data-cfasync="false" id="parsely-cfg" data-parsely-site="blog.parsely.com" src="https://cdn.parsely.com/keys/blog.parsely.com/p.js"></script>
PARSELYJS;
	}


	/**
	 * Test the parsely tag.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_parsely_tag() {
		echo 'NOW IT BEGINS';
		ob_start();
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		echo esc_html( self::$parsely->insert_parsely_javascript() );
		$output = ob_get_clean();
		echo esc_html( $output );
		self::assertContains( self::$parsely_html, $output );
	}


	/**
	 * Check the context `@type` field for a Post and the Homepage.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_parsely_metadata_context_output() {
		// Setup Parsley object.
		$parsely         = new \Parsely();
		$parsely_options = get_option( \Parsely::OPTIONS_KEY );

		// Create a single post
		$post_id = self::factory()->post->create(
			array(
				'post_type'  => 'post',
				'post_title' => 'Home',
			)
		);
		$post    = get_post( $post_id );

		// Go to the homepage
		$this->go_to( '/' );
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $post );

		// The metadata '@type' for the context should be 'WebPage' for the homepage.
		self::assertSame( 'WebPage', $structured_data['@type'] );

		// Go to a single post page
		$this->go_to( '/?p=' . $post_id );

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $post );

		// The metadata '@type' for the context should be 'NewsArticle' for a single post page.
		self::assertSame( 'NewsArticle', $structured_data['@type'] );
	}

	/**
	 *  Check the category
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_parsely_categories() {
		// Setup Parsley object.
		$parsely         = new \Parsely();
		$parsely_options = get_option( \Parsely::OPTIONS_KEY );

		// Insert a single category term, and a Post with that category.
		$category = self::factory()->category->create( array( 'name' => 'Test Category' ) );
		$post_id  = self::factory()->post->create( array( 'post_category' => array( $category ) ) );
		$post     = get_post( $post_id );

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $post );

		// The category in the structured data should match the category of the post.
		self::assertSame( 'Test Category', $structured_data['articleSection'] );
	}

	/**
	 * Check that the tags are lowercase
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_parsely_tags_lowercase() {
		// Setup Parsley object.
		$parsely         = new \Parsely();
		$parsely_options = get_option( \Parsely::OPTIONS_KEY );

		// Create two tags with uppercase names and a single post.
		$tag1    = self::factory()->tag->create( array( 'name' => 'Sample' ) );
		$tag2    = self::factory()->tag->create( array( 'name' => 'Tag' ) );
		$post_id = self::factory()->post->create();
		$post    = get_post( $post_id );

		// Assign the Tags to the Post.
		wp_set_object_terms( $post_id, array( $tag1, $tag2 ), 'post_tag' );

		// Set the Parsely plugin to use Lowercase tags.
		$parsely_options['lowercase_tags'] = true;
		update_option( 'parsely', $parsely_options );

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $post );

		// The structured data should contain both tags in lowercase form.
		self::assertContains( 'sample', $structured_data['keywords'] );
		self::assertContains( 'tag', $structured_data['keywords'] );
	}

	/**
	 * Check the categories as tags.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_parsely_categories_as_tags() {
		// Setup Parsley object.
		$parsely         = new \Parsely();
		$parsely_options = get_option( \Parsely::OPTIONS_KEY );

		// Set the Categories as Tags option to true.
		$parsely_options['cats_as_tags']   = true;
		$parsely_options['lowercase_tags'] = false;
		update_option( 'parsely', $parsely_options );

		// Create 3 categories and a single post with those categories.
		$cat1    = self::factory()->category->create( array( 'name' => 'Test Category' ) );
		$cat2    = self::factory()->category->create( array( 'name' => 'Test Category 2' ) );
		$cat3    = self::factory()->category->create( array( 'name' => 'Test Category 3' ) );
		$post_id = self::factory()->post->create( array( 'post_category' => array( $cat1, $cat2, $cat3 ) ) );
		$post    = get_post( $post_id );

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $post );

		// The structured data should contain all three categories as keywords.
		self::assertContains( 'Test Category', $structured_data['keywords'] );
		self::assertContains( 'Test Category 2', $structured_data['keywords'] );
		self::assertContains( 'Test Category 3', $structured_data['keywords'] );
	}

	/**
	 * Test custom taxonomy terms, categories, and tags in the metadata.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_custom_taxonomy_tags() {
		// Setup Parsley object.
		$parsely         = new \Parsely();
		$parsely_options = get_option( \Parsely::OPTIONS_KEY );

		// Set up the options to force lowercase tags.
		$parsely_options['cats_as_tags'] = true;
		update_option( 'parsely', $parsely_options );

		// Create a custom taxonomy and add a tag for it.
		register_taxonomy( 'hockey', 'post' );
		$custom_tax_tag = self::factory()->tag->create(
			array(
				'name'     => 'Gretzky',
				'taxonomy' => 'hockey',
			)
		);

		// Create a tag and a category and a signle post and assign the category to the post.
		$tag     = self::factory()->tag->create( array( 'name' => 'Tag' ) );
		$cat     = self::factory()->category->create( array( 'name' => 'Category' ) );
		$post_id = self::factory()->post->create( array( 'post_category' => array( $cat ) ) );

		$post = get_post( $post_id );

		// Assign the tag and custom taxonomy to the post.
		wp_set_object_terms( $post_id, array( $custom_tax_tag ), 'hockey' );
		wp_set_object_terms( $post_id, array( $tag ), 'post_tag' );

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $post );

		// The structrued data should contain the category, the post tag, and the custom taxonomy term.
		self::assertContains( 'category', $structured_data['keywords'] );
		self::assertContains( 'tag', $structured_data['keywords'] );
		self::assertContains( 'gretzky', $structured_data['keywords'] );
	}


	/**
	 * Are the top level categories what we expect?
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_use_top_level_cats() {
		// Setup Parsley object.
		$parsely         = new \Parsely();
		$parsely_options = get_option( \Parsely::OPTIONS_KEY );

		// Set Parsely to use top-level categories.
		$parsely_options['use_top_level_cats'] = true;
		update_option( 'parsely', $parsely_options );

		// Create 3 categories and a single post with those categories.
		$cat1    = self::factory()->category->create( array( 'name' => 'Parent Category' ) );
		$cat2    = self::factory()->category->create(
			array(
				'name'   => 'Child Category',
				'parent' => $cat1,
			)
		);
		$post_id = self::factory()->post->create( array( 'post_category' => array( $cat1, $cat2 ) ) );
		$post    = get_post( $post_id );

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $post );

		// The structrued data should contain the parent category.
		self::assertSame( 'Parent Category', $structured_data['articleSection'] );
	}

	/**
	 * Check out the custom taxonomy as section.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_custom_taxonomy_as_section() {
		// Setup Parsley object.
		$parsely         = new \Parsely();
		$parsely_options = get_option( \Parsely::OPTIONS_KEY );

		// Set Parsely to use 'sports' as custom taxonomy for section.
		$parsely_options['custom_taxonomy_section'] = 'sports';

		// Make sure top-level categories are not set to be used.
		$parsely_options['use_top_level_cats'] = false;
		update_option( 'parsely', $parsely_options );

		// Create a custom taxonomy, add a term and child term to it, and add them to a post.
		register_taxonomy( 'sports', 'post' );
		$custom_tax_tag       = self::factory()->term->create(
			array(
				'name'     => 'football',
				'taxonomy' => 'sports',
			)
		);
		$custom_tax_tag_child = self::factory()->term->create(
			array(
				'name'     => 'premiere league',
				'taxonomy' => 'sports',
				'parent'   => $custom_tax_tag,
			)
		);
		$post_id              = self::factory()->post->create();
		$post                 = get_post( $post_id );

		// Set the custom taxonomy terms to the post.
		wp_set_object_terms( $post_id, array( $custom_tax_tag, $custom_tax_tag_child ), 'sports' );

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $post );
		self::assertSame( 'premiere league', $structured_data['articleSection'] );
	}

	/**
	 * Check out the top level taxonomy as a section.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_top_level_taxonomy_as_section() {
		// Setup Parsley object.
		$parsely         = new \Parsely();
		$parsely_options = get_option( \Parsely::OPTIONS_KEY );

		// Set Parsely to use 'sports' as custom taxonomy for section.
		$parsely_options['custom_taxonomy_section'] = 'sports';

		// Make sure top-level categories are not set to be used.
		$parsely_options['use_top_level_cats'] = true;
		update_option( 'parsely', $parsely_options );

		// Create a custom taxonomy, add a term and child term to it, and add them to a post.
		register_taxonomy( 'sports', 'post' );
		$custom_tax_tag       = self::factory()->term->create(
			array(
				'name'     => 'football',
				'taxonomy' => 'sports',
			)
		);
		$custom_tax_tag_child = self::factory()->term->create(
			array(
				'name'     => 'premiere league',
				'taxonomy' => 'sports',
				'parent'   => $custom_tax_tag,
			)
		);
		$post_id              = self::factory()->post->create();
		$post                 = get_post( $post_id );

		// Set the custom taxonomy terms to the post.
		wp_set_object_terms( $post_id, array( $custom_tax_tag, $custom_tax_tag_child ), 'sports' );

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $post );
		self::assertSame( 'football', $structured_data['articleSection'] );
	}

	/**
	 * Check the canonicals.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_http_canonicals() {
		// Setup Parsley object.
		$parsely         = new \Parsely();
		$parsely_options = get_option( \Parsely::OPTIONS_KEY );

		// Set Parsely to not force https canonicals.
		$parsely_options['force_https_canonicals'] = false;
		update_option( 'parsely', $parsely_options );

		// Create a single post.
		$post_id = self::factory()->post->create();
		$post    = get_post( $post_id );

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $post );

		// The url scheme should be 'http'.
		$url = wp_parse_url( $structured_data['url'] );
		self::assertSame( 'http', $url['scheme'] );

		// Set Parsely to force https canonicals.
		$parsely_options['force_https_canonicals'] = true;
		update_option( 'parsely', $parsely_options );

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $post );

		// The url scheme should be 'https'.
		$url = wp_parse_url( $structured_data['url'] );
		self::assertSame( 'https', $url['scheme'] );
	}

	/**
	 * Check the facebook instant articles integration.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_fbia_integration() {
		$options = get_option( 'parsely' );
		$output  = self::$parsely->insert_parsely_tracking_fbia( $registry );
		self::assertTrue( strpos( $output, 'facebook.com/instantarticles' ) > 0 );
		self::assertTrue( strpos( $output, 'blog.parsely.com' ) > 0 );
	}


	/**
	 * Check the AMP integration.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_amp_integration() {
		$options   = get_option( 'parsely' );
		$analytics = array();
		$filter    = self::$parsely->parsely_add_amp_actions();
		$output    = self::$parsely->parsely_add_amp_analytics( $analytics );
		self::assertEmpty( $filter );
		self::assertSame( 'parsely', $output['parsely']['type'] );
		self::assertSame( 'blog.parsely.com', $output['parsely']['config_data']['vars']['apikey'] );
		$options['disable_amp'] = true;
		update_option( 'parsely', $options );
		$filter = self::$parsely->parsely_add_amp_actions();
		self::assertSame( '', $filter );
	}

	/**
	 * Check out page filtering.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_parsely_page_filter() {
		// Setup Parsley object.
		$parsely         = new \Parsely();
		$parsely_options = get_option( \Parsely::OPTIONS_KEY );

		// Create a single post.
		$post_id = $this->factory->post->create();
		$post    = get_post( $post_id );


		// Apply page filtering.
		$headline = 'Completely New And Original Filtered Headline';
		add_filter(
			'after_set_parsely_page',
			function( $args ) use ( $headline ) {
				$args['headline'] = $headline;

				return $args;
			},
			10,
			3
		);

		// Create the structured data for that post.
		$structured_data = $parsely->construct_parsely_metadata( $parsely_options, $post );

		// The structured data should contain the headline from the filter.
		self::assertTrue( strpos( $structured_data['headline'], $headline ) === 0 );
	}

	/**
	 * Make sure users can log in.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_user_logged_in() {
		$options                              = get_option( 'parsely' );
		$options['track_authenticated_users'] = false;
		update_option( 'parsely', $options );
		$new_user = $this->create_test_user( 'bill_brasky' );
		wp_set_current_user( $new_user );
		ob_start();
		echo esc_html( self::$parsely->insert_parsely_javascript() );
		$output = ob_get_clean();
		self::assertNotContains( self::$parsely_html, $output );
	}

	/**
	 * Make sure users can log in to more than one site.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_user_logged_in_multisite() {
		if ( ! is_multisite() ) {
			self::markTestSkipped( "this test can't run without multisite" );
		}

		$new_user    = $this->create_test_user( 'optimus_prime' );
		$second_user = $this->create_test_user( 'megatron' );
		$first_blog  = $this->create_test_blog( 'autobots', $new_user );
		$second_blog = $this->create_test_blog( 'decepticons', $second_user );

		wp_set_current_user( $new_user );
		switch_to_blog( $first_blog );

		$options                              = get_option( 'parsely' );
		$options['track_authenticated_users'] = false;
		$options['apikey']                    = 'blog.parsely.com';
		// Update both blog options.
		update_option( 'parsely', $options );
		update_blog_option( $second_blog, 'parsely', $options );
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );

		self::assertEquals( get_current_blog_id(), $first_blog );
		self::assertTrue( is_user_member_of_blog( $new_user, $first_blog ) );
		self::assertFalse( is_user_member_of_blog( $new_user, $second_blog ) );

		ob_start();
		echo esc_html( self::$parsely->insert_parsely_javascript() );
		$output = ob_get_clean();
		self::assertNotContains( self::$parsely_html, $output );

		switch_to_blog( $second_blog );
		self::assertEquals( get_current_blog_id(), $second_blog );
		self::assertFalse( is_user_member_of_blog( $new_user, get_current_blog_id() ) );

		ob_start();
		echo esc_html( self::$parsely->insert_parsely_javascript() );
		$output = ob_get_clean();
		self::assertContains( self::$parsely_html, $output );
	}

	/**
	 * Data provider for test_get_current_url
	 *
	 * @return array[]
	 */
	public function data_for_test_get_current_url() {
		return array(
			// Start cases with 'force_https_canonicals' = true
			array(
				true,
				'http://example.com',
				'https://example.com',
			),
			array(
				true,
				'https://example.com',
				'https://example.com',
			),
			array(
				true,
				'http://example.com:1234',
				'https://example.com:1234',
			),
			array(
				true,
				'https://example.com:1234',
				'https://example.com:1234',
			),
			// Start cases with 'force_https_canonicals' = false
			array(
				false,
				'http://example.com',
				'http://example.com',
			),
			array(
				false,
				'https://example.com',
				'http://example.com',
			),
			array(
				false,
				'http://example.com:1234',
				'http://example.com:1234',
			),
			array(
				false,
				'https://example.com:1234',
				'http://example.com:1234',
			),
		);
	}

	/**
	 * @category   Function
	 * @package    SampleTest
	 * @dataProvider data_for_test_get_current_url
	 * @covers Parsely::get_current_url
	 */
	public function test_get_current_url( $force_https, $url, $expected ) {
		$options                           = get_option( \Parsely::OPTIONS_KEY );
		$options['force_https_canonicals'] = $force_https;
		update_option( \Parsely::OPTIONS_KEY, $options );

		update_option( 'siteurl', $url );

		// Test homepage
		$this->go_to( '/' );
		$res = self::$parsely->get_current_url();
		self::assertSame( strpos( $res, $expected, 0 ), 0 );

		// Test a specific post
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		$res = self::$parsely->get_current_url();
		self::assertSame( strpos( $res, $expected, 0 ), 0 );

		// Test a random URL
		$this->go_to( '/random-url' );
		$res = self::$parsely->get_current_url();
		self::assertSame( strpos( $res, $expected, 0 ), 0 );
	}
}

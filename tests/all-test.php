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
<script data-cfasync="false" id="parsely-cfg" data-parsely-site="blog.parsely.com" src="//cdn.parsely.com/keys/blog.parsely.com/p.js"></script>
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
	 * Check the parsely page output
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_parsely_ppage_output() {
		$this->go_to( '/' );
		$ppage = self::$parsely->insert_parsely_page();
		self::assertSame( 'WebPage', $ppage['@type'] );
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		$ppage = self::$parsely->insert_parsely_page();
		self::assertSame( 'NewsArticle', $ppage['@type'] );
	}

	/**
	 *  Check the category
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_parsely_categories() {
		$post_array                  = $this->create_test_post_array();
		$cat                         = $this->create_test_category( 'Newssss' );
		$post_array['post_category'] = array( $cat );
		$post                        = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		$ppage = self::$parsely->insert_parsely_page();
		self::assertSame( 'Newssss', $ppage['articleSection'] );
	}

	/**
	 * Check that the tags are lowercase
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_parsely_tags_lowercase() {
		$post_array                = $this->create_test_post_array();
		$post_array['tags_input']  = array( 'Sample', 'Tag' );
		$post                      = $this->factory->post->create( $post_array );
		$options                   = get_option( 'parsely' );
		$options['lowercase_tags'] = true;
		update_option( 'parsely', $options );
		$this->go_to( '/?p=' . $post );
		$ppage = self::$parsely->insert_parsely_page();
		self::assertContains( 'sample', $ppage['keywords'] );
		self::assertContains( 'tag', $ppage['keywords'] );
	}

	/**
	 * Check the categories as tags.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_parsely_cats_as_tags() {
		$options                 = get_option( 'parsely' );
		$options['cats_as_tags'] = true;
		update_option( 'parsely', $options );
		$post_array                  = $this->create_test_post_array();
		$cat_1                       = $this->create_test_category( 'news' );
		$cat_array                   = array(
			'name'   => 'local',
			'parent' => $cat_1,
		);
		$cat_2                       = $this->factory->category->create( $cat_array );
		$cat_array['parent']         = $cat_2;
		$cat_array['name']           = 'sample county';
		$cat_3                       = $this->factory->category->create( $cat_array );
		$post_array['post_category'] = array( $cat_1, $cat_2, $cat_3 );
		$post_array['tags_input']    = array( 'test' );
		$post                        = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		$ppage = self::$parsely->insert_parsely_page();
		self::assertContains( 'news', $ppage['keywords'] );
		self::assertContains( 'local', $ppage['keywords'] );
		self::assertContains( 'sample county', $ppage['keywords'] );
	}

	/**
	 * Check out taxonomy tags.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_custom_taxonomy_tags() {
		$options                 = get_option( 'parsely' );
		$options['cats_as_tags'] = true;
		update_option( 'parsely', $options );
		$post_array               = $this->create_test_post_array();
		$post_array['tags_input'] = array( 'Sample', 'Tag' );
		$post                     = $this->factory->post->create( $post_array );
		$parent_taxonomy          = $this->create_test_taxonomy( 'sports', 'hockey' );
		$child_taxonomy           = $this->factory->term->create(
			array(
				'name'     => 'gretzky',
				'taxonomy' => 'sports',
				'parent'   => $parent_taxonomy,
			)
		);
		wp_set_post_terms( $post, array( $parent_taxonomy, $child_taxonomy ), 'sports' );
		$this->go_to( '/?p=' . $post );
		$ppage = self::$parsely->insert_parsely_page();
		self::assertContains( 'sample', $ppage['keywords'] );
		self::assertContains( 'tag', $ppage['keywords'] );
		self::assertContains( 'gretzky', $ppage['keywords'] );
	}


	/**
	 * Are the top level categories what we expect?
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_use_top_level_cats() {
		$options                       = get_option( 'parsely' );
		$options['use_top_level_cats'] = true;
		update_option( 'parsely', $options );
		$post_array                  = $this->create_test_post_array();
		$cat_1                       = $this->create_test_category( 'news' );
		$cat_array                   = array(
			'name'   => 'local',
			'parent' => $cat_1,
		);
		$cat_2                       = $this->factory->category->create( $cat_array );
		$cat_array['parent']         = $cat_2;
		$cat_array['name']           = 'sample county';
		$cat_3                       = $this->factory->category->create( $cat_array );
		$post_array['post_category'] = array( $cat_1, $cat_2, $cat_3 );
		$post                        = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		$ppage = self::$parsely->insert_parsely_page();
		self::assertSame( 'news', $ppage['articleSection'] );
	}

	/**
	 * Check out the custom taxonomy as section.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_custom_taxonomy_as_section() {
		$options                            = get_option( 'parsely' );
		$options['custom_taxonomy_section'] = 'sports';
		update_option( 'parsely', $options );
		$post_array                  = $this->create_test_post_array();
		$cat                         = $this->create_test_category( 'news' );
		$post_array['post_category'] = array( $cat );
		$post                        = $this->factory->post->create( $post_array );
		$parent_taxonomy             = $this->create_test_taxonomy( 'sports', 'basketball' );
		$child_taxonomy              = $this->factory->term->create(
			array(
				'name'     => 'lebron',
				'taxonomy' => 'sports',
				'parent'   => $parent_taxonomy,
			)
		);
		wp_set_post_terms( $post, array( $parent_taxonomy, $child_taxonomy ), 'sports' );
		$this->go_to( '/?p=' . $post );
		$ppage = self::$parsely->insert_parsely_page();
		self::assertSame( 'lebron', $ppage['articleSection'] );
	}

	/**
	 * Check out the top level taxonomy as a section.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_top_level_taxonomy_as_section() {
		$options                            = get_option( 'parsely' );
		$options['custom_taxonomy_section'] = 'sports';
		$options['use_top_level_cats']      = true;
		update_option( 'parsely', $options );
		$post_array                  = $this->create_test_post_array();
		$cat                         = $this->create_test_category( 'news' );
		$post_array['post_category'] = array( $cat );
		$post                        = $this->factory->post->create( $post_array );
		$parent_taxonomy             = $this->create_test_taxonomy( 'sports', 'basketball' );
		$child_taxonomy              = $this->factory->term->create(
			array(
				'name'     => 'lebron',
				'taxonomy' => 'sports',
				'parent'   => $parent_taxonomy,
			)
		);
		wp_set_post_terms( $post, array( $parent_taxonomy, $child_taxonomy ), 'sports' );
		$this->go_to( '/?p=' . $post );
		$ppage = self::$parsely->insert_parsely_page();
		self::assertSame( 'basketball', $ppage['articleSection'] );
	}

	/**
	 * Check the canonicals.
	 *
	 * @category   Function
	 * @package    SampleTest
	 */
	public function test_http_canonicals() {
		$options    = get_option( 'parsely' );
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		$ppage = self::$parsely->insert_parsely_page();
		self::assertSame( strpos( $ppage['url'], 'http', 0 ), 0 );
		self::assertFalse( strpos( $ppage['url'], 'https', 0 ) );
		$options['force_https_canonicals'] = true;
		update_option( 'parsely', $options );
		$ppage = self::$parsely->insert_parsely_page();
		self::assertSame( strpos( $ppage['url'], 'https', 0 ), 0 );
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
		$options    = get_option( 'parsely' );
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$headline   = 'Completely New And Original Filtered Headline';
		$this->go_to( '/?p=' . $post );
		
		// Apply page filtering.
		add_filter(
			'after_set_parsely_page',
			function( $args ) use ( $headline ) {
				$args['headline'] = $headline;

				return $args;
			},
			10,
			3
		);

		$ppage = self::$parsely->insert_parsely_page();
		self::assertTrue( strpos( $ppage['headline'], $headline ) === 0 );
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
}

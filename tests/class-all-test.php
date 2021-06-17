<?php
/**
 * Class SampleTest
 *
 * @package WordPress
 */

namespace Parsely\Tests;

use Parsely\Tests\TestCase as ParselyTestCase;
use PHPUnit\Framework\Error\Warning as PHPUnit_Warning;

/**
 * Catch-all class for testing.
 * TODO: Break this into multiple targeted files
 *
 * @category   Class
 * @package    All_Test
 */
class All_Test extends ParselyTestCase {

	/**
	 * Internal variables
	 *
	 * @var string $parsely Holds the Parsely object.
	 */
	protected static $parsely;

	/**
	 * The setUp run before each test
	 */
	public function setUp() {
		global $wp_scripts;

		parent::setUp();

		$wp_scripts = new \WP_Scripts();
		self::$parsely   = new \Parsely();

		// Set the default options prior to each test
		ParselyTestCase::set_options();
	}

	/**
	 * Make sure the version is semver-compliant
	 *
	 * @see https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
	 * @see https://regex101.com/r/Ly7O1x/3/
	 */
	public function test_constant_version() {
		self::assertSame(
			1,
			preg_match(
				'/^(?P<major>0|[1-9]\d*)\.(?P<minor>0|[1-9]\d*)\.(?P<patch>0|[1-9]\d*)(?:-(?P<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?P<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/',
				PARSELY_VERSION
			)
		);
	}

	public function test_class_version() {
		self::assertSame( PARSELY_VERSION, \Parsely::VERSION );
	}

	public function test_cache_buster() {
		self::assertSame( PARSELY_VERSION, \Parsely::get_asset_cache_buster() );
	}

	public function test_plugin_url_constant() {
		self::assertTrue( defined( 'PARSELY_PLUGIN_URL' ) && is_string( PARSELY_PLUGIN_URL ) && strlen( PARSELY_PLUGIN_URL ) > 0 );
	}

	/**
	 * Test JavaScript registrations.
	 *
	 * @covers \Parsely::register_js
	 * @group insert-js
	 */
	public function test_parsely_register_js() {
		ob_start();
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		self::$parsely->register_js();
		$output = ob_get_clean();

		self::assertSame(
			'',
			$output,
			'Failed to confirm nothing was printed by register_js()'
		);

		self::assertTrue(
			wp_script_is( 'wp-parsely-api', 'registered' ),
			'Failed to confirm API script was registered'
		);

		self::assertFalse(
			wp_script_is( 'wp-parsely-api', 'enqueued' ),
			'Failed to confirm API script was not enqueued'
		);

		self::assertTrue(
			wp_script_is( 'wp-parsely-tracker', 'registered' ),
			'Failed to confirm API script was registered'
		);

		self::assertFalse(
			wp_script_is( 'wp-parsely-tracker', 'enqueued' ),
			'Failed to confirm API script was not enqueued'
		);
	}

	/**
	 * Test the tracker script enqueue.
	 *
	 * @covers \Parsely::load_js_tracker
	 * @group insert-js
	 */
	public function test_load_js_tracker() {
		ob_start();
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		self::$parsely->register_js();
		echo self::$parsely->load_js_tracker();
		$intermediate_output = ob_get_contents();
		self::assertSame(
			'',
			$intermediate_output,
			'Failed to confirm scripts were not printed by load_js_tracker()'
		);

		self::assertTrue(
			wp_script_is( 'wp-parsely-tracker', 'enqueued' ),
			'Failed to confirm tracker script was enqueued'
		);

		wp_print_scripts();
		$output = ob_get_clean();

		self::assertSame(
			"<script data-cfasync=\"false\" type='text/javascript' data-parsely-site=\"blog.parsely.com\" src='https://cdn.parsely.com/keys/blog.parsely.com/p.js?ver=" . PARSELY_VERSION . "' id=\"parsely-cfg\"></script>\n",
			$output,
			'Failed to confirm script tag was printed correctly'
		);
	}

	/**
	 * Test the API init script enqueue.
	 *
	 * @covers \Parsely::load_js_api
	 * @group insert-js
	 */
	public function test_load_js_api_no_secret() {
		ob_start();
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		self::$parsely->register_js();
		echo self::$parsely->load_js_api();
		$intermediate_output = ob_get_contents();
		self::assertSame(
			'',
			$intermediate_output,
			'Failed to confirm scripts were not printed by load_js_api()'
		);

		self::assertFalse(
			wp_script_is( 'wp-parsely-api', 'enqueued' ),
			'Failed to confirm api script was not enqueued when an API secret is not set'
		);

		wp_print_scripts();
		$output = ob_get_clean();

		self::assertSame(
			'',
			$output,
			'Failed to confirm script was not printed'
		);
	}

	/**
	 * Test the API init script enqueue.
	 *
	 * @covers \Parsely::load_js_api
	 * @group insert-js
	 */
	public function test_load_js_api_with_secret() {
		ob_start();
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		self::$parsely->register_js();

		self::set_options( array( 'api_secret' => 'hunter2' ) );

		echo self::$parsely->load_js_api();
		$intermediate_output = ob_get_contents();
		self::assertSame(
			'',
			$intermediate_output,
			'Failed to confirm scripts were not printed by load_js_api()'
		);

		self::assertTrue(
			wp_script_is( 'wp-parsely-api', 'enqueued' ),
			'Failed to confirm api script was enqueued when an API secret is set'
		);

		wp_print_scripts();
		$output = ob_get_clean();


		self::assertContains(
			"<script type='text/javascript' id='wp-parsely-api-js-extra'>
/* <![CDATA[ */
var wpParsely = {\"apikey\":\"blog.parsely.com\"};
/* ]]> */
</script>",
			$output,
			'Failed to confirm "localized" data were embedded'
		);

		self::assertContains(
			"<script data-cfasync=\"false\" type='text/javascript' src='" . esc_url( PARSELY_PLUGIN_URL ) . "build/init-api.js?ver=" . PARSELY_VERSION . "' id='wp-parsely-api-js'></script>",
			$output,
			'Failed to confirm script tag was printed correctly'
		);
	}

	/**
	 * Check out page filtering.
	 *
	 * @expectedDeprecated after_set_parsely_page
	 * @covers \Parsely::construct_parsely_metadata
	 * @uses \Parsely::__construct
	 * @uses \Parsely::get_author_name
	 * @uses \Parsely::get_author_names
	 * @uses \Parsely::get_bottom_level_term
	 * @uses \Parsely::get_category_name
	 * @uses \Parsely::get_clean_parsely_page_value
	 * @uses \Parsely::get_coauthor_names
	 * @uses \Parsely::get_current_url
	 * @uses \Parsely::get_first_image
	 * @uses \Parsely::get_options
	 * @uses \Parsely::get_tags
	 * @uses \Parsely::post_has_trackable_status
	 * @uses \Parsely::update_metadata_endpoint
	 * @group metadata
	 * @group filters
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
		self::assertSame( strpos( $structured_data['headline'], $headline ), 0 );
	}

	/**
	 * Make sure users can log in.
	 *
	 * @covers \Parsely::load_js_tracker
	 * @group insert-js
	 * @group settings
	 */
	public function test_user_logged_in() {
		ParselyTestCase::set_options( array( 'track_authenticated_users' => false ) );
		$new_user = $this->create_test_user( 'bill_brasky' );
		wp_set_current_user( $new_user );

		ob_start();
		echo self::$parsely->load_js_tracker();

		$intermediate_output = ob_get_contents();
		self::assertSame(
			'',
			$intermediate_output,
			'Failed to confirm scripts were not printed by load_js_tracker()'
		);

		self::assertFalse(
			wp_script_is( 'wp-parsely-api', 'registered' ),
			'Failed to confirm API script was not registered'
		);

		self::assertFalse(
			wp_script_is( 'wp-parsely-api', 'enqueued' ),
			'Failed to confirm API script was not enqueued'
		);

		self::assertFalse(
			wp_script_is( 'wp-parsely-tracker', 'registered' ),
			'Failed to confirm tracker script was not registered'
		);

		self::assertFalse(
			wp_script_is( 'wp-parsely-tracker', 'enqueued' ),
			'Failed to confirm tracker script was not enqueued'
		);

		wp_print_scripts();
		$output = ob_get_clean();

		self::assertSame(
			'',
			$output,
			'Failed to confirm script tags were not printed'
		);
	}

	/**
	 * Make sure users can log in to more than one site.
	 *
	 * @covers \Parsely::load_js_tracker
	 * @group insert-js
	 * @group settings
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

		// These custom options will be used for both blog_ids.
		$custom_options = array(
			'track_authenticated_users' => false,
			'apikey' => 'blog.parsely.com',
		);
		ParselyTestCase::set_options( $custom_options );

		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );

		self::assertEquals( get_current_blog_id(), $first_blog );
		self::assertTrue( is_user_member_of_blog( $new_user, $first_blog ) );
		self::assertFalse( is_user_member_of_blog( $new_user, $second_blog ) );

		ob_start();
		self::$parsely->register_js();
		echo self::$parsely->load_js_tracker();

		$intermediate_output = ob_get_contents();
		self::assertSame(
			'',
			$intermediate_output,
			'Failed to confirm scripts were not printed by load_js_tracker()'
		);

		self::assertFalse(
			wp_script_is( 'wp-parsely-tracker', 'enqueued' ),
			'Failed to confirm tracker script was not enqueued'
		);

		wp_print_scripts();
		$output = ob_get_clean();

		self::assertSame(
			'',
			$output,
			'Failed to confirm script tags were not printed'
		);

		switch_to_blog( $second_blog );
		ParselyTestCase::set_options( $custom_options );

		self::assertEquals( get_current_blog_id(), $second_blog );
		self::assertFalse( is_user_member_of_blog( $new_user, get_current_blog_id() ) );

		ob_start();
		self::$parsely->register_js();
		echo self::$parsely->load_js_tracker();

		$intermediate_output = ob_get_contents();
		self::assertSame(
			'',
			$intermediate_output,
			'Failed to confirm scripts were not printed by load_js_tracker()'
		);

		self::assertTrue(
			wp_script_is( 'wp-parsely-tracker', 'enqueued' ),
			'Failed to confirm tracker script was enqueued'
		);

		wp_print_scripts();
		$output = ob_get_clean();

		self::assertSame(
			"<script data-cfasync=\"false\" type='text/javascript' data-parsely-site=\"blog.parsely.com\" src='https://cdn.parsely.com/keys/blog.parsely.com/p.js?ver=" . PARSELY_VERSION . "' id=\"parsely-cfg\"></script>\n",
			$output,
			'Failed to confirm script tags were printed correctly'
		);
	}

	/**
	 * Test the wp_parsely_load_js_tracker filter
	 * When it returns false, the tracking script should not be enqueued.
	 *
	 * @covers \Parsely::load_js_tracker
	 */
	public function test_load_js_tracker_filter() {
		add_filter( 'wp_parsely_load_js_tracker', '__return_false' );

		ob_start();
		$post_array = $this->create_test_post_array();
		$post = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		echo self::$parsely->load_js_tracker();
		$intermediate_output = ob_get_contents();

		self::assertSame(
			'',
			$intermediate_output,
			'Failed to confirm scripts were not printed by load_js_tracker()'
		);

		wp_print_scripts();

		$output = ob_get_clean();
		self::assertSame(
			'',
			$output,
			'Failed to confirm filter prevented enqueued scripts'
		);
	}

	/**
	 * Test the parsely_filter_insert_javascript filter
	 * When it returns false, the tracking script should not be enqueued.
	 *
	 * @deprecated deprecated since 2.5.0. This test can be removed when the filter is removed.
	 *
	 * @expectedDeprecated parsely_filter_insert_javascript
	 */
	public function test_deprecated_insert_javascript_filter() {
		add_filter( 'parsely_filter_insert_javascript', '__return_false' );

		ob_start();
		$post_array = $this->create_test_post_array();
		$post = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		echo self::$parsely->load_js_tracker();
		$intermediate_output = ob_get_contents();

		self::assertSame(
			'',
			$intermediate_output,
			'Failed to confirm scripts were not printed by load_js_tracker()'
		);

		wp_print_scripts();

		$output = ob_get_clean();
		self::assertSame(
			'',
			$output,
			'Failed to confirm filter prevented enqueued scripts'
		);
	}

	/*
	 * Test the wp_parsely_post_type filter
	 *
	 * @uses \Parsely::get_options()
	 * @uses \Parsely::construct_parsely_metadata()
	 */
	public function test_filter_wp_parsely_post_type() {
		$options = get_option( \Parsely::OPTIONS_KEY );

		$post_array = $this->create_test_post_array();
		$post_id    = $this->factory->post->create( $post_array );
		$post_obj   = get_post( $post_id );
		$this->go_to( '/?p=' . $post_id );

		// Try to change the post type to a supported value - BlogPosting.
		add_filter(
			'wp_parsely_post_type',
			function() {
				return 'BlogPosting';
			}
		);

		$metadata = self::$parsely->construct_parsely_metadata( $options, $post_obj );
		self::assertSame( 'BlogPosting', $metadata['@type'] );

		// Do not run the following assertion for PHP 5.6.
		if ( version_compare( PHP_VERSION, '7.0.0', '<' ) ) {
			return;
		}

		// Try to change the post type to a non-supported value - Not_Supported.
		add_filter(
			'wp_parsely_post_type',
			function() {
				return 'Not_Supported_Type';
			}
		);

		/**
		 * Ideally we use two methods expectWarning and expectWarningMessageMatches to test this error
		 * But they're not available until PHPUnit 8.4 while here we're still running PHPUnit 7.x
		 *
		 * @see 7.5 https://phpunit.readthedocs.io/en/7.5/writing-tests-for-phpunit.html#testing-php-errors
		 * @see 8.4 https://phpunit.readthedocs.io/en/8.4/writing-tests-for-phpunit.html#testing-php-errors-warnings-and-notices
		 */
		self::expectException( PHPUnit_Warning::class );
		self::$parsely->construct_parsely_metadata( $options, $post_obj );
	}
}

<?php
/**
 * Parsely Tracker tests.
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\Tracker;

/**
 * Parsely Tracker tests.
 */
final class TrackerTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Tracker $tracker Holds the Tracker object
	 */
	private static $tracker;

	/**
	 * The setUp run before each test
	 */
	public function set_up(): void {
		parent::set_up();

		self::$tracker = new Tracker( new Parsely() );

		// Set the default options prior to each test.
		TestCase::set_options();
	}

	/**
	 * Test JavaScript registrations.
	 *
	 * @covers \Parsely\Tracker::register_js
	 * @uses \Parsely\Parsely::get_asset_cache_buster
	 * @uses \Parsely\Parsely::api_key_is_missing
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @group insert-js
	 */
	public function test_parsely_register_js(): void {
		ob_start();
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		self::$tracker->register_js();
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
	 * @covers \Parsely\Tracker::load_js_tracker
	 * @uses \Parsely\Parsely::get_asset_cache_buster
	 * @uses \Parsely\Parsely::api_key_is_missing
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Tracker::register_js
	 * @uses \Parsely\Tracker::script_loader_tag
	 * @group insert-js
	 */
	public function test_load_js_tracker(): void {
		ob_start();
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		self::$tracker->register_js();
		self::$tracker->load_js_tracker();
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
			"<script type='text/javascript' data-parsely-site=\"blog.parsely.com\" src='https://cdn.parsely.com/keys/blog.parsely.com/p.js?ver=" . Parsely::VERSION . "' id=\"parsely-cfg\"></script>\n",
			$output,
			'Failed to confirm script tag was printed correctly'
		);
	}

	/**
	 * Test the tracker script enqueue.
	 *
	 * @covers \Parsely\Tracker::load_js_tracker
	 * @uses \Parsely\Parsely::get_asset_cache_buster
	 * @uses \Parsely\Parsely::api_key_is_missing
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Tracker::register_js
	 * @uses \Parsely\Tracker::script_loader_tag
	 * @group insert-js
	 */
	public function test_load_js_tracker_with_cloudflare(): void {
		add_filter( 'wp_parsely_enable_cfasync_attribute', '__return_true' );

		ob_start();
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		self::$tracker->register_js();
		self::$tracker->load_js_tracker();

		wp_print_scripts();
		$output = ob_get_clean();

		self::assertSame(
			"<script data-cfasync=\"false\" type='text/javascript' data-parsely-site=\"blog.parsely.com\" src='https://cdn.parsely.com/keys/blog.parsely.com/p.js?ver=" . Parsely::VERSION . "' id=\"parsely-cfg\"></script>\n",
			$output,
			'Failed to confirm script tag was printed correctly'
		);
	}

	/**
	 * Test the API init script enqueue.
	 *
	 * @covers \Parsely\Tracker::load_js_api
	 * @uses \Parsely\Parsely::api_key_is_missing
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::get_asset_cache_buster
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Tracker::register_js
	 * @group insert-js
	 */
	public function test_load_js_api_no_secret(): void {
		ob_start();
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		self::$tracker->register_js();
		self::$tracker->load_js_api();
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
	 * @covers \Parsely\Tracker::load_js_api
	 * @uses \Parsely\Parsely::api_key_is_missing
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::get_asset_cache_buster
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Tracker::register_js
	 * @uses \Parsely\Tracker::script_loader_tag
	 * @group insert-js
	 */
	public function test_load_js_api_with_secret(): void {
		ob_start();
		$post_array = $this->create_test_post_array();
		$post       = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post );
		self::$tracker->register_js();

		self::set_options( array( 'api_secret' => 'hunter2' ) );

		self::$tracker->load_js_api();
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


		self::assertStringContainsString(
			"<script type='text/javascript' id='wp-parsely-api-js-extra'>
/* <![CDATA[ */
var wpParsely = {\"apikey\":\"blog.parsely.com\"};
/* ]]> */
</script>",
			$output,
			'Failed to confirm "localized" data were embedded'
		);

		self::assertStringContainsString(
			"<script type='text/javascript' src='" . esc_url( plugin_dir_url( PARSELY_FILE ) ) . 'build/init-api.js?ver=' . Parsely::VERSION . "' id='wp-parsely-api-js'></script>",
			$output,
			'Failed to confirm script tag was printed correctly'
		);
	}
}

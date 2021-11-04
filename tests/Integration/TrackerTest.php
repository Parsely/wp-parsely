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
}

<?php
/**
 * Parsely REST API tests.
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\Rest;


/**
 * Parsely REST API tests.
 */
final class RestTest extends TestCase {
	/**
	 * Internal variable
	 *
	 * @var Rest $rest Holds the Rest object
	 */
	private static $rest;

	/**
	 * The setUp run before each test
	 */
	public function set_up(): void {
		parent::set_up();

		self::$rest = new Rest( new Parsely() );
	}

	/**
	 * Test whether the logic has been enqueued in the `rest_api_init` hook.
	 *
	 * @covers \Parsely\Rest\run;
	 */
	public function test_register_enqueued_rest_init() {
		self::$rest->run();
		$this->assertSame(
			10,
			has_action( 'rest_api_init', array( self::$rest, 'register_parsely_meta' ) )
		);
	}

	/**
	 * Test whether the logic has been enqueued in the `rest_api_init` hook with a filter that disables it.
	 *
	 * @covers \Parsely\Rest\run;
	 */
	public function test_register_enqueued_rest_init_filter() {
		add_filter( 'wp_parsely_enable_rest_api_support', '__return_false' );
		self::$rest->run();
		$this->assertSame(
			false,
			has_action( 'rest_api_init', array( self::$rest, 'register_parsely_meta' ) )
		);
	}

	/**
	 * Test that the REST fields are registered to WordPress REST API.
	 *
	 * @covers \Parsely\Rest\register_parsely_meta
	 */
	public function test_register_parsely_meta_registers_fields() {
		global $wp_rest_additional_fields;

		self::$rest->register_parsely_meta();

		$this->assertEquals( array( 'get_callback' ), array_keys( $wp_rest_additional_fields['post']['parsely-meta'] ) );
		$this->assertEquals( array( 'get_callback' ), array_keys( $wp_rest_additional_fields['page']['parsely-meta'] ) );
	}
}

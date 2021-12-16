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
	 * Internal Parsely variable
	 *
	 * @var Parsely $parsely Holds the Parsely object
	 */
	private static $parsely;

	/**
	 * The setUp run before each test
	 */
	public function set_up(): void {
		parent::set_up();

		self::$parsely = new Parsely();
		self::$rest    = new Rest( self::$parsely );
	}

	/**
	 * Test whether the logic has been enqueued in the `rest_api_init` hook.
	 *
	 * @covers \Parsely\Rest::run
	 */
	public function test_register_enqueued_rest_init(): void {
		self::$rest->run();
		self::assertSame(
			10,
			has_action( 'rest_api_init', array( self::$rest, 'register_meta' ) )
		);
	}

	/**
	 * Test whether the logic has been enqueued in the `rest_api_init` hook with a filter that disables it.
	 *
	 * @covers \Parsely\Rest::run
	 */
	public function test_register_enqueued_rest_init_filter(): void {
		add_filter( 'wp_parsely_enable_rest_api_support', '__return_false' );
		self::$rest->run();
		self::assertFalse( has_action( 'rest_api_init', array( self::$rest, 'register_meta' ) ) );
	}

	/**
	 * Test that the REST fields are registered to WordPress REST API.
	 *
	 * @covers \Parsely\Rest::register_meta
	 */
	public function test_register_meta_registers_fields(): void {
		global $wp_rest_additional_fields;

		self::$rest->register_meta();

		$this->assertParselyRestFieldIsConstructedCorrectly( 'page', $wp_rest_additional_fields );

		// Cleaning up the registered fields.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$wp_rest_additional_fields = array();
	}

	/**
	 * Test that the REST fields are can be modified using the `wp_parsely_rest_object_types` filter.
	 *
	 * @covers \Parsely\Rest::register_meta
	 */
	public function test_register_meta_with_filter(): void {
		global $wp_rest_additional_fields;

		add_filter(
			'wp_parsely_rest_object_types',
			function() {
				return array( 'term' );
			}
		);

		self::$rest->register_meta();

		// Should only be 1, including term. Post and page should be left out by the filter.
		self::assertCount( 1, $wp_rest_additional_fields );

		$this->assertParselyRestFieldIsConstructedCorrectly( 'term', $wp_rest_additional_fields );

		// Cleaning up the registered fields.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$wp_rest_additional_fields = array();
	}

	/**
	 * Test that the get_rest_callback method is able to generate the `parsely` object for the REST API.
	 *
	 * @covers \Parsely\Rest::parsely_rest_get_callback
	 */
	public function test_get_rest_callback(): void {
		$post_id = self::factory()->post->create();

		$meta_object = self::$rest->parsely_rest_get_callback( get_post( $post_id, 'ARRAY_A' ) );
		$expected    = array(
			'version' => '1.0.0',
			'meta'    => self::$parsely->construct_parsely_metadata( self::$parsely->get_options(), get_post( $post_id ) ),
		);

		self::assertEquals( $expected, $meta_object );
	}

	/**
	 * Assert that the Parsely REST field is constructed correctly.
	 * This is a helper function for the tests above.
	 *
	 * @param string $post_type                 Post type.
	 * @param array  $wp_rest_additional_fields Global variable.
	 * @return void
	 */
	private function assertParselyRestFieldIsConstructedCorrectly( string $post_type, array $wp_rest_additional_fields ): void {
		self::assertArrayHasKey( $post_type, $wp_rest_additional_fields );
		self::assertArrayHasKey( 'parsely', $wp_rest_additional_fields[ $post_type ] );
		self::assertIsArray( $wp_rest_additional_fields[ $post_type ]['parsely'] );
		self::assertNull( $wp_rest_additional_fields[ $post_type ]['parsely']['update_callback'] );
		self::assertNull( $wp_rest_additional_fields[ $post_type ]['parsely']['schema'] );
	}
}

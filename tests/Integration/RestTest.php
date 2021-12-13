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
	 * @covers \Parsely\Rest::run;
	 */
	public function test_register_enqueued_rest_init(): void {
		self::$rest->run();
		self::assertSame(
			10,
			has_action( 'rest_api_init', array( self::$rest, 'register_parsely_meta' ) )
		);
	}

	/**
	 * Test whether the logic has been enqueued in the `rest_api_init` hook with a filter that disables it.
	 *
	 * @covers \Parsely\Rest::run;
	 */
	public function test_register_enqueued_rest_init_filter(): void {
		add_filter( 'wp_parsely_enable_rest_api_support', '__return_false' );
		self::$rest->run();
		self::assertFalse( has_action( 'rest_api_init', array( self::$rest, 'register_parsely_meta' ) ) );
	}

	/**
	 * Test that the REST fields are registered to WordPress REST API.
	 *
	 * @covers \Parsely\Rest::register_parsely_meta
	 */
	public function test_register_parsely_meta_registers_fields(): void {
		global $wp_rest_additional_fields;

		self::$rest->register_parsely_meta();

		$this->assertParselyRestFieldIsConstructedCorrectly( 'post', $wp_rest_additional_fields );
		$this->assertParselyRestFieldIsConstructedCorrectly( 'page', $wp_rest_additional_fields );

		// Cleaning up the registered fields.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$wp_rest_additional_fields = array();
	}

	/**
	 * Test that the REST fields are can be modified using the `wp_parsely_rest_object_types` filter.
	 *
	 * @covers \Parsely\Rest::register_parsely_meta
	 */
	public function test_register_parsely_meta_with_filter(): void {
		global $wp_rest_additional_fields;

		add_filter(
			'wp_parsely_rest_object_types',
			function( $object_types ) {
				return array( 'term' );
			}
		);

		self::$rest->register_parsely_meta();

		// Should only be 1, including term. Post and page should be left out by the filter.
		self::assertCount( 1, $wp_rest_additional_fields );

		$this->assertParselyRestFieldIsConstructedCorrectly( 'term', $wp_rest_additional_fields );

		// Cleaning up the registered fields.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$wp_rest_additional_fields = array();
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
		self::assertArrayHasKey( 'version', $wp_rest_additional_fields[ $post_type ]['parsely']['get_callback'] );
		self::assertIsString( $wp_rest_additional_fields[ $post_type ]['parsely']['get_callback']['version'] );
		self::assertArrayHasKey( 'meta', $wp_rest_additional_fields[ $post_type ]['parsely']['get_callback'] );
		self::assertNull( $wp_rest_additional_fields[ $post_type ]['parsely']['update_callback'] );
		self::assertNull( $wp_rest_additional_fields[ $post_type ]['parsely']['schema'] );
	}
}

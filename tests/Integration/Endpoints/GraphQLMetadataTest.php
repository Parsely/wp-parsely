<?php
/**
 * Parse.ly GraphQL Metadata tests.
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Endpoints;

use Parsely\Parsely;
use Parsely\Endpoints\GraphQL_Metadata;
use Parsely\Tests\Integration\TestCase;

/**
 * Parse.ly GraphQL Metadata tests.
 */
final class GraphQLMetadataTest extends TestCase {
	/**
	 * Internal variable
	 *
	 * @var GraphQL_Metadata $graphql Holds the GraphQL object
	 */
	private static $graphql;

	/**
	 * Internal Parsely variable
	 *
	 * @var Parsely $parsely Holds the Parsely object
	 */
	private static $parsely;

	/**
	 * The setup run before each test.
	 */
	public function set_up(): void {
		parent::set_up();

		self::$parsely = new Parsely();
		self::$graphql = new GraphQL_Metadata( self::$parsely );
	}

	/**
	 * Test that GraphQL types are set to be registered if there's an API key defined.
	 *
	 * @since 3.2.0
	 *
	 * @covers \Parsely\Endpoints\GraphQL_Metadata::run
	 * @uses \Parsely\Endpoints\Metadata_Endpoint::__construct
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::get_options
	 */
	public function test_graphql_enqueued(): void {
		self::set_options( array( 'apikey' => 'testkey' ) );

		self::$graphql->run();
		self::assertEquals( 10, has_filter( 'graphql_register_types', array( self::$graphql, 'register_meta' ) ) );
	}

	/**
	 * Test that GraphQL types are not registered if there's a filter.
	 *
	 * @since 3.2.0
	 *
	 * @covers \Parsely\Endpoints\GraphQL_Metadata::run
	 * @uses \Parsely\Endpoints\Metadata_Endpoint::__construct
	 */
	public function test_graphql_enqueued_filter(): void {
		self::set_options( array( 'apikey' => 'testkey' ) );
		add_filter( 'wp_parsely_enable_graphql_support', '__return_false' );

		self::$graphql->run();
		self::assertFalse( has_filter( 'graphql_register_types', array( self::$graphql, 'register_meta' ) ) );
	}

	/**
	 * Test that GraphQL types are not registered if there's no API key.
	 *
	 * @since 3.2.0
	 *
	 * @covers \Parsely\Endpoints\GraphQL_Metadata::run
	 * @uses \Parsely\Endpoints\Metadata_Endpoint::__construct
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::get_options
	 */
	public function test_graphql_enqueued_no_api_key(): void {
		self::$graphql->run();
		self::assertFalse( has_filter( 'graphql_register_types', array( self::$graphql, 'register_meta' ) ) );
	}
}

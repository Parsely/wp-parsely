<?php
/**
 * Parsely GraphQL Metadata tests.
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
	 * Stores
	 *
	 * @var array<string, mixed> $call_history
	 */
	public static $call_history = array(
		'register_graphql_object_type' => false,
		'register_graphql_field'       => false,
	);

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
	 * The setUp run before each test
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
	 */
	public function test_graphql_enqueued_no_api_key(): void {
		self::$graphql->run();
		self::assertFalse( has_filter( 'graphql_register_types', array( self::$graphql, 'register_meta' ) ) );
	}

	/**
	 * Tests if the functions to register items into GraphQL have been called.
	 *
	 * @since 3.2.0
	 *
	 * @covers \Parsely\Endpoints\GraphQL_Metadata::register_meta
	 * @uses \Parsely\Endpoints\GraphQL_Metadata::register_object_types()
	 * @uses \Parsely\Endpoints\GraphQL_Metadata::register_fields()
	 */
	public function test_graphql_registers_types(): void {
		self::$graphql->register_meta();

		self::assertEquals( 'ParselyMetaContainer', self::$call_history['register_graphql_object_type']['type_name'] );
		self::assertEquals( 'ContentNode', self::$call_history['register_graphql_field']['type_name'] );
		self::assertEquals( 'parsely', self::$call_history['register_graphql_field']['field_name'] );

		self::$call_history['register_graphql_object_type'] = false;
		self::$call_history['register_graphql_field']       = false;
	}
}


/**
 * Mock WPGraphQL functions. The plugin is not installed by default with wp-parsely.
 */
namespace Parsely\Endpoints;

/**
 * Mock function.
 *
 * @see https://wpgraphqldocs.gatsbyjs.io/functions/register_graphql_object_type/
 *
 * @param string $type_name The name of the Type. This must be unique across all Types of any kind in the GraphQL Schema.
 * @param array  $config Configuration for the field.
 *
 * @return void
 */
function register_graphql_object_type( string $type_name, array $config ) {
	\Parsely\Tests\Integration\Endpoints\GraphQLMetadataTest::$call_history['register_graphql_object_type'] = array(
		'type_name' => $type_name,
		'config'    => $config,
	);
}

/**
 * Mock function.
 *
 * @see https://wpgraphqldocs.gatsbyjs.io/functions/register_graphql_field/
 *
 * @param string $type_name The name of the GraphQL Type in the Schema to register the field to.
 * @param string $field_name The name of the field. Should be unique to the Type the field is being registered to.
 * @param array  $config Configuration for the field.
 *
 * @return void
 */
function register_graphql_field( string $type_name, string $field_name, array $config ): void {
	\Parsely\Tests\Integration\Endpoints\GraphQLMetadataTest::$call_history['register_graphql_field'] = array(
		'type_name'  => $type_name,
		'field_name' => $field_name,
		'config'     => $config,
	);
}

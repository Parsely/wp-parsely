<?php
/**
 * Integration Tests: Parsely Remote API
 *
 * @package Parsely\Tests
 * @since   3.5.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RemoteAPI;

use Parsely\RemoteAPI\Base_Endpoint_Remote;
use Parsely\RemoteAPI\Cache;
use Parsely\RemoteAPI\Remote_API_Cache;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration Tests for the Parse.ly Remote API.
 */
abstract class BaseRemoteAPITest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Base_Endpoint_Remote $remote_api Holds an instance of the class being tested.
	 */
	protected static $remote_api;

	/**
	 * Initializes all required values for the test.
	 */
	abstract public static function initialize(): void;

	/**
	 * Provides data for test_api_url().
	 *
	 * @return \ArrayIterator<string, mixed>
	 */
	abstract public function data_api_url(): iterable;

	/**
	 * Runs once before all tests.
	 */
	public static function set_up_before_class(): void {
		static::initialize();
	}

	/**
	 * Verifies the basic generation of the API URL.
	 *
	 * @dataProvider data_api_url
	 * @covers \Parsely\RemoteAPI\Related_API::get_api_url
	 * @covers \Parsely\RemoteAPI\Analytics_Posts_API::get_api_url
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\RemoteAPI\Base_Endpoint_Remote::validate_required_constraints
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::get_api_url
	 *
	 * @param array<string, mixed> $query Test query arguments.
	 * @param string               $url Expected generated URL.
	 */
	public function test_api_url( array $query, string $url ): void {
		self::set_options( array( 'apikey' => 'my-key' ) );
		self::assertSame( $url, self::$remote_api->get_api_url( $query ) );
	}

	/**
	 * Verifies that the cache is used instead of the api when there's a cache
	 * hit.
	 *
	 * @covers \Parsely\RemoteAPI\Remote_API_Cache::get_items
	 * @covers \Parsely\RemoteAPI\Remote_API_Cache::__construct
	 * @uses \Parsely\RemoteAPI\Base_Endpoint_Remote::get_endpoint
	 */
	public function test_remote_api_cache_returns_cached_value(): void {
		$api_mock = $this->getMockBuilder( get_class( self::$remote_api ) )
			->disableOriginalConstructor()
			->getMock();

		// If this method is called, that means our cache did not hit as expected.
		$api_mock->expects( self::never() )->method( 'get_items' );
		$api_mock->method( 'get_endpoint' )->willReturn( self::$remote_api->get_endpoint() ); // Passing call to non-mock method.

		$cache_key = 'parsely_api_' . wp_hash( self::$remote_api->get_endpoint() ) . '_' . wp_hash( $this->wp_json_encode( array() ) );

		$object_cache = $this->createMock( Cache::class );
		$object_cache->method( 'get' )
			->willReturn( (object) array( 'cache_hit' => true ) );

		$object_cache->expects( self::once() )
			->method( 'get' )
			->with(
				self::equalTo( $cache_key ),
				self::equalTo( 'wp-parsely' ),
				self::equalTo( false ),
				self::isNull()
			);

		/**
		 * Variable.
		 *
		 * @var Remote_API_Cache
		 */
		$remote_api_cache = $this->getMockBuilder( Remote_API_Cache::class )
			->setConstructorArgs( array( $api_mock, $object_cache ) )
			->setMethodsExcept( array( 'get_items' ) )
			->getMock();

		self::assertEquals( (object) array( 'cache_hit' => true ), $remote_api_cache->get_items( array() ) );
	}

	/**
	 * Verifies that when the cache misses, the api is used instead and the
	 * resultant value is cached.
	 *
	 * @covers \Parsely\RemoteAPI\Remote_API_Cache::get_items
	 * @covers \Parsely\RemoteAPI\Remote_API_Cache::__construct
	 * @uses \Parsely\RemoteAPI\Base_Endpoint_Remote::get_endpoint
	 */
	public function test_caching_decorator_returns_uncached_value(): void {
		$api_mock = $this->getMockBuilder( get_class( self::$remote_api ) )
			->disableOriginalConstructor()
			->getMock();

		$api_mock->method( 'get_items' )
			->willReturn( (object) array( 'cache_hit' => false ) );

		// If this method is _NOT_ called, that means our cache did not miss as expected.
		$api_mock->expects( self::once() )->method( 'get_items' );
		$api_mock->method( 'get_endpoint' )->willReturn( self::$remote_api->get_endpoint() ); // Passing call to non-mock method.

		$cache_key = 'parsely_api_' . wp_hash( self::$remote_api->get_endpoint() ) . '_' . wp_hash( $this->wp_json_encode( array() ) );

		$object_cache = $this->createMock( Cache::class );
		$object_cache->method( 'get' )
			->willReturn( false );

		$object_cache->expects( self::once() )
			->method( 'get' )
			->with(
				self::equalTo( $cache_key ),
				self::equalTo( 'wp-parsely' ),
				self::equalTo( false ),
				self::isNull()
			);

		/**
		 * Variable.
		 *
		 * @var Remote_API_Cache
		 */
		$remote_api_cache = $this->getMockBuilder( Remote_API_Cache::class )
			->setConstructorArgs( array( $api_mock, $object_cache ) )
			->setMethodsExcept( array( 'get_items' ) )
			->getMock();

		self::assertEquals( (object) array( 'cache_hit' => false ), $remote_api_cache->get_items( array() ) );
	}
}

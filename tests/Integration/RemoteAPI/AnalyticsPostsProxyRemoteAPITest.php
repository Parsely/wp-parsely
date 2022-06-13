<?php
/**
 * Integration Tests: Parsely `/analytics/posts` Remote API
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\RemoteAPI\Cache;
use Parsely\RemoteAPI\Cached_Proxy;
use Parsely\RemoteAPI\Analytics_Posts_Proxy;

/**
 * Integration Tests for the Parsely `/analytics/posts` Remote API.
 */
final class AnalyticsPostsRemoteAPITest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Parsely $parsely Holds the Parsely object.
	 */
	private static $parsely;

	/**
	 * Setup method called before each test.
	 */
	public function set_up(): void {
		parent::set_up();

		self::$parsely = new Parsely();
	}

	/**
	 * Data provider for test_analytics_posts_api_url().
	 *
	 * @return iterable
	 */
	public function data_analytics_posts_api_url(): iterable {
		yield 'Basic (Expected data)' => array(
			array(
				'apikey' => 'my-key',
				'limit'  => 5,
			),
			'https://api.parsely.com/v2/analytics/posts?apikey=my-key&limit=5',
		);
	}

	/**
	 * Verifies the basic generation of the API URL.
	 *
	 * @dataProvider data_analytics_posts_api_url
	 * @covers \Parsely\RemoteAPI\Analytics_Posts_Proxy::get_api_url
	 * @uses \Parsely\RemoteAPI\Base_Proxy::__construct
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::get_api_key
	 * @uses \Parsely\Parsely::get_options
	 *
	 * @param array  $query Test query arguments.
	 * @param string $url Expected generated URL.
	 */
	public function test_analytics_posts_api_url( array $query, string $url ): void {
		self::set_options( array( 'apikey' => 'my-key' ) );
		$proxy = new Analytics_Posts_Proxy( self::$parsely );
		self::assertEquals( $url, $proxy->get_api_url( $query ) );
	}

	/**
	 * Verifies that the cache is used instead of the proxy when there's a cache
	 * hit.
	 *
	 * @covers \Parsely\RemoteAPI\Cached_Proxy::get_items
	 * @covers \Parsely\RemoteAPI\Cached_Proxy::__construct
	 */
	public function test_analytics_posts_cached_proxy_returns_cached_value(): void {
		$proxy = $this->getMockBuilder( Analytics_Posts_Proxy::class )
			->disableOriginalConstructor()
			->getMock();

		// If this method is called, that means our cache did not hit as
		// expected.
		$proxy->expects( self::never() )->method( 'get_items' );

		$cache_key = 'parsely_api_' . wp_hash( wp_json_encode( $proxy ) ) . '_' . wp_hash( wp_json_encode( array() ) );

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

		$cached_proxy = $this->getMockBuilder( Cached_Proxy::class )
			->setConstructorArgs( array( $proxy, $object_cache ) )
			->setMethodsExcept( array( 'get_items' ) )
			->getMock();

		self::assertEquals( (object) array( 'cache_hit' => true ), $cached_proxy->get_items( array() ) );
	}

	/**
	 * Verifies that when the cache misses, the proxy is used instead and the
	 * resultant value is cached.
	 *
	 * @covers \Parsely\RemoteAPI\Cached_Proxy::get_items
	 * @covers \Parsely\RemoteAPI\Cached_Proxy::__construct
	 */
	public function test_analytics_posts_caching_decorator_returns_uncached_value(): void {
		$proxy = $this->getMockBuilder( Analytics_Posts_Proxy::class )
			->disableOriginalConstructor()
			->getMock();

		$proxy->method( 'get_items' )
			->willReturn( (object) array( 'cache_hit' => false ) );

		// If this method is _NOT_ called, that means our cache did not miss as
		// expected.
		$proxy->expects( self::once() )->method( 'get_items' );

		$cache_key = 'parsely_api_' . wp_hash( wp_json_encode( $proxy ) ) . '_' . wp_hash( wp_json_encode( array() ) );

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

		$cached_proxy = $this->getMockBuilder( Cached_Proxy::class )
			->setConstructorArgs( array( $proxy, $object_cache ) )
			->setMethodsExcept( array( 'get_items' ) )
			->getMock();

		self::assertEquals( (object) array( 'cache_hit' => false ), $cached_proxy->get_items( array() ) );
	}
}

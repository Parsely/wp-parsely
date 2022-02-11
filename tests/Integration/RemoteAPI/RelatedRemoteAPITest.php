<?php
/**
 * Parsely `/related` Remote API Integration tests.
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\RemoteAPI\Related_Caching_Decorator;
use Parsely\RemoteAPI\Related_Proxy;
use WP_Error;
use WP_Object_Cache;

/**
 * Parsely `/related` Remote API tests.
 */
final class RelatedRemoteAPITest extends TestCase {
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
	}

	/**
	 * Data provider for test_related_api_url().
	 *
	 * @return array[]
	 */
	public function data_related_api_url(): array {
		return array(
			'Basic (Expected data)'                   => array(
				array(
					'apikey'         => 'my-key',
					'pub_date_start' => '7d',
					'sort'           => 'score',
					'boost'          => 'views',
					'limit'          => 5,
				),
				'https://api.parsely.com/v2/related?apikey=my-key&boost=views&limit=5&pub_date_start=7d&sort=score',
			),
			'published_within value of 0'             => array(
				array(
					'apikey' => 'my-key',
					'sort'   => 'score',
					'boost'  => 'views',
					'limit'  => 5,
				),
				'https://api.parsely.com/v2/related?apikey=my-key&boost=views&limit=5&sort=score',
			),
			'Sort on publish date (no boost param)'   => array(
				array(
					'apikey' => 'my-key',
					'sort'   => 'pub_date',
					'limit'  => 5,
				),
				'https://api.parsely.com/v2/related?apikey=my-key&limit=5&sort=pub_date',
			),
			'Rank by relevance only (no boost param)' => array(
				array(
					'apikey' => 'my-key',
					'sort'   => 'score',
					'limit'  => 5,
				),
				'https://api.parsely.com/v2/related?apikey=my-key&limit=5&sort=score',
			),
		);
	}

	/**
	 * Test the basic generation of the API URL.
	 *
	 * @dataProvider data_related_api_url
	 * @covers Parsely\RemoteAPI\Related_Proxy:get_api_url
	 *
	 * @param array  $query Test query arguments.
	 * @param string $url Expected generated URL.
	 */
	public function test_related_api_url( array $query, string $url ): void {
		self::set_options( array( 'apikey' => 'my-key' ) );
		$proxy = new Related_Proxy( self::$parsely, $query );
		self::assertEquals( $url, $proxy->get_api_url( $query ) );
	}

	/**
	 * Test that the cache is used instead of the proxy when there's a cache hit.
	 *
	 * @covers Parsely\RemoteAPI\Related_Caching_Decorator::get_items
	 */
	public function test_related_caching_decorator_returns_cached_value(): void {
		$proxy = $this->getMockBuilder( Related_Proxy::class )
			->disableOriginalConstructor()
			->getMock();

		// If this method is called, that means our cache did not hit as expected.
		$proxy->expects( $this->never() )->method( 'get_items' );

		$cache_key = 'api_recos-abcdef123456';

		$object_cache = $this->createStub( WP_Object_Cache::class );
		$object_cache->method( 'get' )
			->willReturn( (object) array( 'cache_hit' => true ) );

		$object_cache->expects( $this->once() )
			->method( 'get' )
			->with(
				$this->equalTo( $cache_key ),
				$this->equalTo( 'wp-parsely' ),
				$this->equalTo( false ),
				$this->isNull()
			);

		$caching_decorator = $this->getMockBuilder( Related_Caching_Decorator::class )
			->setConstructorArgs( array( $proxy, $object_cache ) )
			->setMethodsExcept( array( 'get_items' ) )
			->getMock();

		self::setPrivateProperty( Related_Caching_Decorator::class, $caching_decorator, 'cache_key', $cache_key );

		$this->assertEquals( (object) array( 'cache_hit' => true ), $caching_decorator->get_items() );
	}

	/**
	 * Test that when the cache misses, the proxy is used instead and the resultant value is cached.
	 *
	 * @covers Parsely\RemoteAPI\Related_Caching_Decorator::get_items
	 */
	public function test_related_caching_decorator_returns_uncached_value(): void {
		$proxy = $this->getMockBuilder( Related_Proxy::class )
			->disableOriginalConstructor()
			->getMock();

		$proxy->method( 'get_items' )
			->willReturn( (object) array( 'cache_hit' => false ) );

		// If this method is _NOT_ called, that means our cache did not miss as expected.
		$proxy->expects( $this->once() )->method( 'get_items' );

		$cache_key = 'api_recos-abcdef123456';

		$object_cache = $this->createStub( WP_Object_Cache::class );
		$object_cache->method( 'get' )
			->willReturn( false );

		$object_cache->expects( $this->once() )
			->method( 'get' )
			->with(
				$this->equalTo( $cache_key ),
				$this->equalTo( 'wp-parsely' ),
				$this->equalTo( false ),
				$this->isNull()
			);

		$caching_decorator = $this->getMockBuilder( Related_Caching_Decorator::class )
			->setConstructorArgs( array( $proxy, $object_cache ) )
			->setMethodsExcept( array( 'get_items' ) )
			->getMock();

		self::setPrivateProperty( Related_Caching_Decorator::class, $caching_decorator, 'cache_key', $cache_key );

		$this->assertEquals( (object) array( 'cache_hit' => false ), $caching_decorator->get_items() );
	}
}

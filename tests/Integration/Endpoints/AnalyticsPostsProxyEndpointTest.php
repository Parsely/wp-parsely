<?php
/**
 * Integration Tests: Analytics Posts Proxy Endpoint
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\Endpoints\Analytics_Posts_API_Proxy;
use Parsely\RemoteAPI\Analytics_Posts_Proxy;
use WP_Error;
use WP_REST_Request;
use WP_REST_Server;

/**
 * Integration Tests for the Analytics Posts API Proxy Endpoint.
 */
final class AnalyticsPostsProxyEndpointTest extends TestCase {
	/**
	 * Holds a reference to the global $wp_rest_server object to restore in
	 * tear_down().
	 *
	 * @var WP_REST_Server $wp_rest_server_global_backup
	 */
	private $wp_rest_server_global_backup;

	/**
	 * Holds a reference to the callback that initializes the endpoint to remove
	 * in tear_down().
	 *
	 * @var callable $rest_api_init_analytics_posts_proxy
	 */
	private $rest_api_init_analytics_posts_proxy;

	/**
	 * Setup method called before each test.
	 *
	 * Sets up globals and initializes the Endpoint.
	 */
	public function set_up(): void {
		parent::set_up();

		TestCase::set_options();

		$this->wp_rest_server_global_backup        = $GLOBALS['wp_rest_server'] ?? null;
		$this->rest_api_init_analytics_posts_proxy = static function () {
			$endpoint = new Analytics_Posts_API_Proxy(
				new Parsely(),
				new Analytics_Posts_Proxy( new Parsely() )
			);
			$endpoint->run();
		};
		add_action( 'rest_api_init', $this->rest_api_init_analytics_posts_proxy );
	}

	/**
	 * Teardown method called after each test.
	 *
	 * Resets globals.
	 */
	public function tear_down(): void {
		parent::tear_down();
		remove_action( 'rest_api_init', $this->rest_api_init_analytics_posts_proxy );

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['wp_rest_server'] = $this->wp_rest_server_global_backup;
	}

	/**
	 * Verifies that the route is registered.
	 *
	 * @covers \Parsely\Endpoints\Analytics_Posts_API_Proxy::run
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::__construct
	 * @uses \Parsely\RemoteAPI\Base_Proxy::__construct
	 */
	public function test_register_routes_by_default() {
		$routes = rest_get_server()->get_routes();
		self::assertArrayHasKey( '/wp-parsely/v1/analytics/posts', $routes );
		self::assertCount( 1, $routes['/wp-parsely/v1/analytics/posts'] );
		self::assertSame( array( 'GET' => true ), $routes['/wp-parsely/v1/analytics/posts'][0]['methods'] );
	}

	/**
	 * Verifies that the route is not registered when the
	 * wp_parsely_enable_analytics_posts_api_proxy filter is set to false.
	 *
	 * @covers \Parsely\Endpoints\Analytics_Posts_API_Proxy::run
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::__construct
	 * @uses \Parsely\RemoteAPI\Base_Proxy::__construct
	 */
	public function test_do_not_register_routes_when_analytics_posts_proxy_is_disabled() {

		// Override some setup steps in order to set the
		// wp_parsely_enable_analytics_posts_api_proxy filter to false.
		remove_action( 'rest_api_init', $this->rest_api_init_analytics_posts_proxy );
		$this->rest_api_init_analytics_posts_proxy = static function () {
			// Analytics_Posts_Proxy should be mocked here?
			$endpoint = new Analytics_Posts_API_Proxy(
				new Parsely(),
				new Analytics_Posts_Proxy( new Parsely() )
			);
			add_filter( 'wp_parsely_enable_analytics_posts_api_proxy', '__return_false' );
			$endpoint->run();
		};
		add_action( 'rest_api_init', $this->rest_api_init_analytics_posts_proxy );

		$routes = rest_get_server()->get_routes();
		self::assertFalse( array_key_exists( '/wp-parsely/v1/analytics/posts', $routes ) );
	}

	/**
	 * Verifies that calls to `GET /wp-parsely/v1/analytics/posts` return
	 * results in the expected format.
	 *
	 * @covers \Parsely\Endpoints\Analytics_Posts_API_Proxy::get_items
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::__construct
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::permission_callback
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::run
	 * @uses \Parsely\RemoteAPI\Base_Proxy::__construct
	 * @uses \Parsely\RemoteAPI\Base_Proxy::get_api_url
	 * @uses \Parsely\RemoteAPI\Base_Proxy::get_items
	 * @uses \Parsely\Parsely::api_key_is_missing
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::get_api_key
	 * @uses \Parsely\Parsely::get_options
	 */
	public function test_get_items() {
		TestCase::set_options( array( 'apikey' => 'example.com' ) );
		TestCase::set_options( array( 'api_secret' => 'test' ) );

		$dispatched  = 0;
		$date_format = get_option( 'date_format' );

		add_filter(
			'pre_http_request',
			function () use ( &$dispatched ) {
				$dispatched++;
				return array(
					'body' => '{"data":[{"_hits": 142, "author": "Aakash Shah", "authors": ["Aakash Shah"], "full_content_word_count": 3624, "image_url": "https://blog.parse.ly/wp-content/uploads/2021/06/Web-Analytics-Tool.png?w=150&h=150&crop=1", "link": "https://blog.parse.ly/web-analytics-software-tools/?itm_source=parsely-api", "metadata": "", "metrics": {"views": 142}, "pub_date": "2020-04-06T13:30:58", "section": "Analytics That Matter", "tags": ["animalz", "parsely_smart:entity:Bounce rate", "parsely_smart:entity:Customer analytics", "parsely_smart:entity:Digital marketing", "parsely_smart:entity:Google Analytics", "parsely_smart:entity:Marketing strategy", "parsely_smart:entity:Multivariate testing in marketing", "parsely_smart:entity:Open source", "parsely_smart:entity:Pageview", "parsely_smart:entity:Search engine optimization", "parsely_smart:entity:Social media", "parsely_smart:entity:Social media analytics", "parsely_smart:entity:Usability", "parsely_smart:entity:User experience design", "parsely_smart:entity:Web analytics", "parsely_smart:entity:Web traffic", "parsely_smart:entity:Website", "parsely_smart:entity:World Wide Web", "parsely_smart:iab:Business", "parsely_smart:iab:Graphics", "parsely_smart:iab:Software", "parsely_smart:iab:Technology"], "thumb_url_medium": "https://images.parsely.com/XCmTXuOf8yVbUYTxj2abQ4RSDkM=/85x85/smart/https%3A//blog.parse.ly/wp-content/uploads/2021/06/Web-Analytics-Tool.png%3Fw%3D150%26h%3D150%26crop%3D1", "title": "9 Types of Web Analytics Tools \u2014 And How to Know Which Ones You Really Need", "url": "https://blog.parse.ly/web-analytics-software-tools/?itm_source=parsely-api"}, {"_hits": 40, "author": "Stephanie Schwartz and Andrew Butler", "authors": ["Stephanie Schwartz and Andrew Butler"], "full_content_word_count": 1785, "image_url": "https://blog.parse.ly/wp-content/uploads/2021/05/pexels-brett-jordan-998501-1024x768-2.jpeg?w=150&h=150&crop=1", "link": "https://blog.parse.ly/5-tagging-best-practices-content-strategy/?itm_source=parsely-api", "metadata": "", "metrics": {"views": 40}, "pub_date": "2021-04-30T20:30:24", "section": "Analytics That Matter", "tags": ["parsely_smart:entity:Analytics", "parsely_smart:entity:Best practice", "parsely_smart:entity:Hashtag", "parsely_smart:entity:Metadata", "parsely_smart:entity:Search engine", "parsely_smart:entity:Search engine optimization", "parsely_smart:entity:Tag (metadata)", "parsely_smart:iab:Business", "parsely_smart:iab:Science", "parsely_smart:iab:Software", "parsely_smart:iab:Technology"], "thumb_url_medium": "https://images.parsely.com/ap3YSufqxnLpz6zzQshoks3snXI=/85x85/smart/https%3A//blog.parse.ly/wp-content/uploads/2021/05/pexels-brett-jordan-998501-1024x768-2.jpeg%3Fw%3D150%26h%3D150%26crop%3D1", "title": "5 Tagging Best Practices For Getting the Most Out of Your Content Strategy", "url": "https://blog.parse.ly/5-tagging-best-practices-content-strategy/?itm_source=parsely-api"}]}',
				);
			}
		);

		$response = rest_get_server()->dispatch( new WP_REST_Request( 'GET', '/wp-parsely/v1/analytics/posts' ) );

		self::assertSame( 1, $dispatched );
		self::assertSame( 200, $response->get_status() );
		self::assertEquals(
			(object) array(
				'data' => array(
					(object) array(
						'author' => 'Aakash Shah',
						'date'   => wp_date( $date_format, strtotime( '2020-04-06T13:30:58' ) ),
						'id'     => 'https://blog.parse.ly/web-analytics-software-tools/?itm_source=parsely-api',
						'title'  => '9 Types of Web Analytics Tools — And How to Know Which Ones You Really Need',
						'url'    => 'https://blog.parse.ly/web-analytics-software-tools/?itm_source=parsely-api',
						'views'  => 142,
					),
					(object) array(
						'author' => 'Stephanie Schwartz and Andrew Butler',
						'date'   => wp_date( $date_format, strtotime( '2021-04-30T20:30:24' ) ),
						'id'     => 'https://blog.parse.ly/5-tagging-best-practices-content-strategy/?itm_source=parsely-api',
						'title'  => '5 Tagging Best Practices For Getting the Most Out of Your Content Strategy',
						'url'    => 'https://blog.parse.ly/5-tagging-best-practices-content-strategy/?itm_source=parsely-api',
						'views'  => 40,
					),
				),
			),
			$response->get_data()
		);
	}

	/**
	 * Verifies that calling `GET /wp-parsely/v1/analytics/posts` returns an
	 * error and does not perform a remote call when the apikey is not populated
	 * in site options.
	 *
	 * @covers \Parsely\Endpoints\Analytics_Posts_API_Proxy::get_items
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::__construct
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::permission_callback
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::run
	 * @uses \Parsely\RemoteAPI\Base_Proxy::__construct
	 * @uses \Parsely\Parsely::api_key_is_missing
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::get_options
	 */
	public function test_get_items_fails_without_apikey_set() {
		TestCase::set_options( array( 'apikey' => '' ) );

		$dispatched = 0;

		add_filter(
			'pre_http_request',
			function () use ( &$dispatched ) {
				$dispatched++;
				return null;
			}
		);

		$response = rest_get_server()->dispatch( new WP_REST_Request( 'GET', '/wp-parsely/v1/analytics/posts' ) );

		self::assertSame( 200, $response->get_status() );
		$data = $response->get_data();

		self::assertSame( 0, $dispatched );
		self::assertObjectHasAttribute( 'data', $data );
		self::assertEmpty( $data->data );

		self::assertObjectHasAttribute( 'error', $data );
		self::assertEquals(
			new WP_Error( 400, 'A Parse.ly API Key must be set in site options to use this endpoint' ),
			$data->error
		);
	}
}

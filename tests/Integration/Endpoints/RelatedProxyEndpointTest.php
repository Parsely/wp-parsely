<?php
/**
 * Parsely Related API Proxy Endpoint tests.
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\Endpoints\Related_API_Proxy;
use Parsely\RemoteAPI\Related_Proxy;
use WP_Error;
use WP_REST_Request;
use WP_REST_Server;

/**
 * Parsely REST API tests.
 */
final class RelatedProxyEndpointTest extends TestCase {
	/**
	 * Hold a reference to the global $wp_rest_server object to restore in tearDown.
	 *
	 * @var WP_REST_Server $wp_rest_server_global_backup
	 */
	private $wp_rest_server_global_backup;

	/**
	 * Hold a reference to the callback that initializes the endpoint to remove in tearDown.
	 *
	 * @var callable $rest_api_init_related_proxy
	 */
	private $rest_api_init_related_proxy;

	/**
	 * Set up globals & initialize the Endpoint.
	 */
	public function setUp(): void {
		parent::setUp();

		// Set the default options prior to each test.
		TestCase::set_options();

		$this->wp_rest_server_global_backup = $GLOBALS['wp_rest_server'] ?? null;
		$this->rest_api_init_related_proxy  = static function () {
			// Related_Proxy should be mocked here?
			$endpoint = new Related_API_Proxy( new Parsely(), new Related_Proxy( new Parsely() ) );
			$endpoint->run();
		};
		add_action( 'rest_api_init', $this->rest_api_init_related_proxy );
	}

	/**
	 * Reset globals.
	 */
	public function tearDown(): void {
		parent::tearDown();
		remove_action( 'rest_api_init', $this->rest_api_init_related_proxy );

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['wp_rest_server'] = $this->wp_rest_server_global_backup;
	}

	/**
	 * Confirm the route is registered.
	 *
	 * @covers \Parsely\Endpoints\Related_API_Proxy::run
	 * @uses \Parsely\Endpoints\Related_API_Proxy::__construct
	 * @uses \Parsely\RemoteAPI\Base_Proxy::__construct
	 */
	public function test_register_routes_by_default() {
		$routes = rest_get_server()->get_routes();
		self::assertArrayHasKey( '/wp-parsely/v1/related', $routes );
		self::assertCount( 1, $routes['/wp-parsely/v1/related'] );
		self::assertSame( array( 'GET' => true ), $routes['/wp-parsely/v1/related'][0]['methods'] );
	}

	/**
	 * Confirm the route is not registered when the wp_parsely_enable_related_api_proxy
	 * filter is set to false.
	 *
	 * @covers \Parsely\Endpoints\Related_API_Proxy::run
	 * @uses \Parsely\Endpoints\Related_API_Proxy::__construct
	 * @uses \Parsely\RemoteAPI\Base_Proxy::__construct
	 */
	public function test_do_not_register_routes_when_related_proxy_is_disabled() {

		// Override some setup steps in order to set the wp_parsely_enable_related_api_proxy
		// filter to false.
		remove_action( 'rest_api_init', $this->rest_api_init_related_proxy );
		$this->rest_api_init_related_proxy = static function () {
			// Related_Proxy should be mocked here?
			$endpoint = new Related_API_Proxy( new Parsely(), new Related_Proxy( new Parsely() ) );
			add_filter( 'wp_parsely_enable_related_api_proxy', '__return_false' );
			$endpoint->run();
		};
		add_action( 'rest_api_init', $this->rest_api_init_related_proxy );

		$routes = rest_get_server()->get_routes();
		self::assertFalse( array_key_exists( '/wp-parsely/v1/related', $routes ) );
	}

	/**
	 * Confirm that calls to `GET /wp-parsely/v1/related` get results in the expected format.
	 *
	 * @covers \Parsely\Endpoints\Related_API_Proxy::get_items
	 * @uses \Parsely\Endpoints\Related_API_Proxy::__construct
	 * @uses \Parsely\Endpoints\Related_API_Proxy::permission_callback
	 * @uses \Parsely\Endpoints\Related_API_Proxy::run
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

		$dispatched = 0;

		add_filter(
			'pre_http_request',
			function () use ( &$dispatched ) {
				$dispatched++;
				return array(
					'body' => '{"data":[{"image_url":"https:\/\/example.com\/img.png","thumb_url_medium":"https:\/\/example.com\/thumb.png","title":"something","url":"https:\/\/example.com"},{"image_url":"https:\/\/example.com\/img2.png","thumb_url_medium":"https:\/\/example.com\/thumb2.png","title":"something2","url":"https:\/\/example.com\/2"}]}',
				);
			}
		);

		$response = rest_get_server()->dispatch( new WP_REST_Request( 'GET', '/wp-parsely/v1/related' ) );

		self::assertSame( 1, $dispatched );
		self::assertSame( 200, $response->get_status() );
		self::assertEquals(
			(object) array(
				'data' => array(
					(object) array(
						'image_url'        => 'https://example.com/img.png',
						'thumb_url_medium' => 'https://example.com/thumb.png',
						'title'            => 'something',
						'url'              => 'https://example.com',
					),
					(object) array(
						'image_url'        => 'https://example.com/img2.png',
						'thumb_url_medium' => 'https://example.com/thumb2.png',
						'title'            => 'something2',
						'url'              => 'https://example.com/2',
					),
				),
			),
			$response->get_data()
		);
	}

	/**
	 * Confirm that calls to `GET /wp-parsely/v1/related` gets an error and makes no remote call when the apikey is not populated in site options.
	 *
	 * @covers \Parsely\Endpoints\Related_API_Proxy::get_items
	 * @uses \Parsely\Endpoints\Related_API_Proxy::__construct
	 * @uses \Parsely\Endpoints\Related_API_Proxy::permission_callback
	 * @uses \Parsely\Endpoints\Related_API_Proxy::run
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

		$response = rest_get_server()->dispatch( new WP_REST_Request( 'GET', '/wp-parsely/v1/related' ) );

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

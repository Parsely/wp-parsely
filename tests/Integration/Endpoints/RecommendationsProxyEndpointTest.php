<?php
/**
 * Parsely Recommendations API Proxy Endpoint tests.
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\Endpoints\Recommendations_API_Proxy;
use WP_Error;
use WP_REST_Request;
use WP_REST_Server;

/**
 * Parsely REST API tests.
 */
final class RecommendationsProxyEndpointTest extends TestCase {
	/**
	 * Set up globals & initialize the Endpoint.
	 */
	public function setUp(): void {
		parent::setUp();
		add_filter( 'wp_parsely_enable_recommendations_endpoint', '__return_true' );
		self::set_options( array( 'apikey' => 'example.com' ) );

		$this->wp_rest_server_global_backup        = $GLOBALS['wp_rest_server'] ?? null;
		$this->rest_api_init_recommendations_proxy = function () {
			$endpoint = new Recommendations_API_Proxy( new Parsely() );
			$endpoint->run();
		};
		add_action( 'rest_api_init', $this->rest_api_init_recommendations_proxy );
	}

	/**
	 * Reset globals.
	 */
	public function tearDown(): void {
		parent::tearDown();
		remove_action( 'rest_api_init', $this->rest_api_init_recommendations_proxy );

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['wp_rest_server'] = $this->wp_rest_server_global_backup;

		// Restore default options.
		self::set_options();
		remove_filter( 'wp_parsely_enable_recommendations_endpoint', '__return_true' );
	}

	/**
	 * Confirm the the route is registered.
	 *
	 * @covers Recommendations_API_Proxy::register_rest_route
	 */
	public function test_register_routes() {
		$routes = rest_get_server()->get_routes();
		$this->assertArrayHasKey( '/wp-parsely/v1/recommendations', $routes );
		$this->assertCount( 1, $routes['/wp-parsely/v1/recommendations'] );
		$this->assertEquals( array( 'GET' => true ), $routes['/wp-parsely/v1/recommendations'][0]['methods'] );
	}

	/**
	 * Confirm that calls to `GET /wp-parsely/v1/recommendations` get results in the expected format.
	 *
	 * @covers Recommendations_API_Proxy::get_items
	 */
	public function test_get_items() {
		$request  = new WP_REST_Request( 'GET', '/wp-parsely/v1/recommendations' );
		$response = null;
		self::mock_remote_network_request(
			function () use ( &$response, $request ) {
				$response = rest_get_server()->dispatch( $request );
			},
			'{"data":[{"image_url":"https:\/\/example.com\/img.png","title":"something","url":"https:\/\/example.com"},{"image_url":"https:\/\/example.com\/img2.png","title":"something2","url":"https:\/\/example.com\/2"}]}'
		);

		$this->assertSame( 200, $response->get_status() );
		$this->assertEquals(
			(object) array(
				'data' => array(
					(object) array(
						'image_url' => 'https://example.com/img.png',
						'title'     => 'something',
						'url'       => 'https://example.com',
					),
					(object) array(
						'image_url' => 'https://example.com/img2.png',
						'title'     => 'something2',
						'url'       => 'https://example.com/2',
					),
				),
			),
			$response->get_data()
		);
	}

	/**
	 * Confirm that calls to `GET /wp-parsely/v1/recommendations` gets an error and makes no remote call when the apikey is not populated in site options.
	 *
	 * @covers Recommendations_API_Proxy::get_items
	 */
	public function test_get_items_fails_without_apikey_set() {
		delete_option( 'parsely' );
		$request    = new WP_REST_Request( 'GET', '/wp-parsely/v1/recommendations' );
		$response   = null;
		$dispatched = TestCase::mock_remote_network_request(
			function () use ( &$response, $request ) {
				$response = rest_get_server()->dispatch( $request );
			}
		);

		$this->assertSame( 200, $response->get_status() );
		$data = $response->get_data();

		$this->assertSame( 0, $dispatched );
		$this->assertObjectHasAttribute( 'data', $data );
		$this->assertEmpty( $data->data );

		$this->assertObjectHasAttribute( 'error', $data );
		$this->assertEquals(
			new WP_Error( 400, 'A Parse.ly API Key must be set in site options to use this endpoint' ),
			$data->error
		);
	}
}

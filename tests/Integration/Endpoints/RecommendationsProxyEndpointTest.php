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
use WP_REST_Request;
use WP_REST_Server;
use WP_Test_REST_Controller_Testcase;

/**
 * Parsely REST API tests.
 */
final class RecommendationsProxyEndpointTest extends WP_Test_REST_Controller_Testcase {
	/**
	 * Set up globals & initialize the Endpoint.
	 */
	public function setUp(): void {
		parent::setUp();
		$this->parsely_global_backup        = $GLOBALS['parsely'] ?? null;
		$GLOBALS['parsely']                 = new Parsely();
		$this->wp_rest_server_global_backup = $GLOBALS['wp_rest_server'] ?? null;
		$this->endpoint                     = new Recommendations_API_Proxy();
		$this->endpoint->run();
	}

	/**
	 * Reset globals.
	 */
	public function tearDown(): void {
		parent::tearDown();
		$GLOBALS['parsely'] = $this->parsely_global_backup;
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['wp_rest_server'] = $this->wp_rest_server_global_backup;
	}

	/**
	 * Confirm the the route is registered.
	 *
	 * @covers Recommendations_API_Proxy::register_rest_route
	 */
	public function test_register_routes() {
		$routes = rest_get_server()->get_routes();
		$this->assertArrayHasKey( '/wp-parsely/v1/recommendations', $routes );
		$this->assertSame( 1, count( $routes['/wp-parsely/v1/recommendations'] ) );
		$this->assertEquals( array( 'GET' => true ), $routes['/wp-parsely/v1/recommendations'][0]['methods'] );
	}

	/**
	 * Undocumented function (required to implement WP_Test_REST_Controller_Testcase)
	 */
	public function test_context_param() {
		$this->markTestSkipped();
	}

	/**
	 * Confirm that calls to `GET /wp-parsely/v1/recommendations` get results in the expected format.
	 *
	 * @covers Recommendations_API_Proxy::get_items
	 */
	public function test_get_items() {
		$request  = new WP_REST_Request( 'GET', '/wp-parsely/v1/recommendations' );
		$response = null;
		TestCase::mock_remote_network_request(
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
	 * Undocumented function (required to implement WP_Test_REST_Controller_Testcase)
	 */
	public function test_get_item() {
		$this->markTestSkipped();
	}

	/**
	 * Undocumented function (required to implement WP_Test_REST_Controller_Testcase)
	 */
	public function test_create_item() {
		$this->markTestSkipped();
	}

	/**
	 * Undocumented function (required to implement WP_Test_REST_Controller_Testcase)
	 */
	public function test_update_item() {
		$this->markTestSkipped();
	}

	/**
	 * Undocumented function (required to implement WP_Test_REST_Controller_Testcase)
	 */
	public function test_delete_item() {
		$this->markTestSkipped();
	}

	/**
	 * Undocumented function (required to implement WP_Test_REST_Controller_Testcase)
	 */
	public function test_prepare_item() {
		$this->markTestSkipped();
	}

	/**
	 * Undocumented function (required to implement WP_Test_REST_Controller_Testcase)
	 */
	public function test_get_item_schema() {
		$this->markTestSkipped();
	}
}

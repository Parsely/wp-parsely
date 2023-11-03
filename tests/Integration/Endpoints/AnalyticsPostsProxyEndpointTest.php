<?php
/**
 * Integration Tests: Analytics Posts Proxy Endpoint
 *
 * @package Parsely\Tests
 * @since   3.5.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Endpoints\Analytics_Posts_API_Proxy;
use Parsely\Endpoints\Base_API_Proxy;
use Parsely\Parsely;
use Parsely\RemoteAPI\Analytics_Posts_API;
use WP_Error;
use WP_REST_Request;

use function Parsely\Utils\get_date_format;

/**
 * Integration Tests for the Analytics Posts API Proxy Endpoint.
 */
final class AnalyticsPostsProxyEndpointTest extends ProxyEndpointTest {

	/**
	 * Initializes all required values for the test.
	 */
	public static function initialize(): void {
		self::$route      = '/wp-parsely/v1/stats/posts';
		self::$filter_key = 'stats_posts';
	}

	/**
	 * Returns the endpoint to be used in tests.
	 *
	 * @return Base_API_Proxy
	 */
	public function get_endpoint(): Base_API_Proxy {
		return new Analytics_Posts_API_Proxy(
			new Parsely(),
			new Analytics_Posts_API( new Parsely() )
		);
	}

	/**
	 * Verifies that the route is registered.
	 *
	 * @covers \Parsely\Endpoints\Analytics_Posts_API_Proxy::run
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::__construct
	 * @uses \Parsely\Endpoints\Base_API_Proxy::register_endpoint
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 */
	public function test_register_routes_by_default(): void {
		parent::run_test_register_routes_by_default();
	}

	/**
	 * Verifies that the route is not registered when the
	 * wp_parsely_enable_analytics_posts_api_proxy filter is set to false.
	 *
	 * @covers \Parsely\Endpoints\Analytics_Posts_API_Proxy::run
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::__construct
	 * @uses \Parsely\Endpoints\Base_API_Proxy::register_endpoint
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 */
	public function test_verify_that_route_is_not_registered_when_proxy_is_disabled(): void {
		parent::run_test_do_not_register_route_when_proxy_is_disabled();
	}

	/**
	 * Verifies forbidden error when current user doesn't have proper
	 * capabilities.
	 *
	 * @covers \Parsely\Endpoints\Base_API_Proxy::permission_callback
	 *
	 * @uses \Parsely\Endpoints\Base_API_Proxy::register_endpoint
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::register_endpoint
	 */
	public function test_access_of_analytics_posts_endpoint_is_forbidden(): void {
		$response = rest_get_server()->dispatch(
			new WP_REST_Request( 'GET', self::$route )
		);
		/**
		 * Variable.
		 *
		 * @var WP_Error
		 */
		$error = $response->as_error();

		self::assertSame( 401, $response->get_status() );
		self::assertSame( 'rest_forbidden', $error->get_error_code() );
		self::assertSame(
			'Sorry, you are not allowed to do that.',
			$error->get_error_message()
		);
	}

	/**
	 * Verifies that calling `GET /wp-parsely/v1/stats/posts` returns an
	 * error and does not perform a remote call when the Site ID is not populated
	 * in site options.
	 *
	 * @covers \Parsely\Endpoints\Analytics_Posts_API_Proxy::get_items
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::__construct
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::permission_callback
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::run
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_API_Proxy::get_data
	 * @uses \Parsely\Endpoints\Base_API_Proxy::register_endpoint
	 */
	public function test_get_items_fails_when_site_id_is_not_set(): void {
		$this->set_admin_user();
		parent::run_test_get_items_fails_without_site_id_set();
	}

	/**
	 * Verifies that calling `GET /wp-parsely/v1/stats/posts` returns an
	 * error and does not perform a remote call when the API Secret is not
	 * populated in site options.
	 *
	 * @covers \Parsely\Endpoints\Analytics_Posts_API_Proxy::get_items
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::__construct
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::permission_callback
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::run
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_API_Proxy::get_data
	 * @uses \Parsely\Endpoints\Base_API_Proxy::register_endpoint
	 */
	public function test_get_items_fails_when_api_secret_is_not_set(): void {
		$this->set_admin_user();
		parent::run_test_get_items_fails_without_api_secret_set();
	}

	/**
	 * Verifies default user capability filter.
	 *
	 * @covers \Parsely\Endpoints\Analytics_Posts_API_Proxy::permission_callback
	 *
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_Endpoint::is_user_allowed_to_make_api_call
	 */
	public function test_user_is_allowed_to_make_proxy_api_call_if_default_user_capability_is_changed(): void {
		$this->login_as_contributor();
		add_filter(
			'wp_parsely_user_capability_for_all_private_apis',
			function () {
				return 'edit_posts';
			}
		);

		$proxy_api = new Analytics_Posts_API_Proxy(
			new Parsely(),
			new Analytics_Posts_API( new Parsely() )
		);

		self::assertTrue( $proxy_api->permission_callback() );
	}

	/**
	 * Verifies endpoint specific user capability filter.
	 *
	 * @covers \Parsely\Endpoints\Analytics_Posts_API_Proxy::permission_callback
	 *
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_Endpoint::is_user_allowed_to_make_api_call
	 */
	public function test_user_is_allowed_to_make_proxy_api_call_if_endpoint_specific_user_capability_is_changed(): void {
		$this->login_as_contributor();
		add_filter(
			'wp_parsely_user_capability_for_analytics_posts_api',
			function () {
				return 'edit_posts';
			}
		);

		$proxy_api = new Analytics_Posts_API_Proxy(
			new Parsely(),
			new Analytics_Posts_API( new Parsely() )
		);

		self::assertTrue( $proxy_api->permission_callback() );
	}

	/**
	 * Verifies that calls to `GET /wp-parsely/v1/stats/posts` return
	 * results in the expected format.
	 *
	 * @covers \Parsely\Endpoints\Analytics_Posts_API_Proxy::get_items
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::__construct
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::generate_data
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::permission_callback
	 * @uses \Parsely\Endpoints\Analytics_Posts_API_Proxy::run
	 * @uses \Parsely\Endpoints\Base_API_Proxy::get_data
	 * @uses \Parsely\Endpoints\Base_API_Proxy::register_endpoint
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::get_api_secret
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\RemoteAPI\Base_Endpoint_Remote::get_api_url
	 * @uses \Parsely\RemoteAPI\Base_Endpoint_Remote::get_items
	 * @uses \Parsely\RemoteAPI\Base_Endpoint_Remote::get_request_options
	 */
	public function test_get_items(): void {
		$this->set_admin_user();
		TestCase::set_options(
			array(
				'apikey'     => 'example.com',
				'api_secret' => 'test',
			)
		);

		$dispatched  = 0;
		$date_format = get_date_format();

		add_filter(
			'pre_http_request',
			function () use ( &$dispatched ) {
				$dispatched++;
				return array(
					'body' => '{"data":[
						{
							"author": "Aakash Shah",
							"metrics": {"views": 142},
							"pub_date": "2020-04-06T13:30:58",
							"thumb_url_medium": "https://images.parsely.com/XCmTXuOf8yVbUYTxj2abQ4RSDkM=/85x85/smart/https%3A//blog.parse.ly/wp-content/uploads/2021/06/Web-Analytics-Tool.png%3Fw%3D150%26h%3D150%26crop%3D1",
							"title": "9 Types of Web Analytics Tools \u2014 And How to Know Which Ones You Really Need",
							"url": "https://blog.parse.ly/web-analytics-software-tools/?itm_source=parsely-api"
						},
						{
							"author": "Stephanie Schwartz and Andrew Butler",
							"metrics": {"views": 40},
							"pub_date": "2021-04-30T20:30:24",
							"thumb_url_medium": "https://images.parsely.com/ap3YSufqxnLpz6zzQshoks3snXI=/85x85/smart/https%3A//blog.parse.ly/wp-content/uploads/2021/05/pexels-brett-jordan-998501-1024x768-2.jpeg%3Fw%3D150%26h%3D150%26crop%3D1",
							"title": "5 Tagging Best Practices For Getting the Most Out of Your Content Strategy",
							"url": "https://blog.parse.ly/5-tagging-best-practices-content-strategy/?itm_source=parsely-api"
						}
					]}',
				);
			}
		);

		$rest_request = new WP_REST_Request( 'GET', '/wp-parsely/v1/stats/posts' );
		$rest_request->set_param( 'itm_source', 'wp-parsely-content-helper' );

		$response = rest_get_server()->dispatch( $rest_request );

		self::assertSame( 1, $dispatched );
		self::assertSame( 200, $response->get_status() );
		self::assertEquals(
			(object) array(
				'data' => array(
					(object) array(
						'author'       => 'Aakash Shah',
						'date'         => wp_date( $date_format, strtotime( '2020-04-06T13:30:58' ) ),
						'id'           => 'https://blog.parse.ly/web-analytics-software-tools/',
						'dashUrl'      => PARSELY::DASHBOARD_BASE_URL . '/example.com/find?url=https%3A%2F%2Fblog.parse.ly%2Fweb-analytics-software-tools%2F',
						'thumbnailUrl' => 'https://images.parsely.com/XCmTXuOf8yVbUYTxj2abQ4RSDkM=/85x85/smart/https%3A//blog.parse.ly/wp-content/uploads/2021/06/Web-Analytics-Tool.png%3Fw%3D150%26h%3D150%26crop%3D1',
						'title'        => '9 Types of Web Analytics Tools — And How to Know Which Ones You Really Need',
						'url'          => 'https://blog.parse.ly/web-analytics-software-tools/?itm_source=wp-parsely-content-helper',
						'views'        => '142',
						'postId'       => 0,
					),
					(object) array(
						'author'       => 'Stephanie Schwartz and Andrew Butler',
						'date'         => wp_date( $date_format, strtotime( '2021-04-30T20:30:24' ) ),
						'id'           => 'https://blog.parse.ly/5-tagging-best-practices-content-strategy/',
						'dashUrl'      => PARSELY::DASHBOARD_BASE_URL . '/example.com/find?url=https%3A%2F%2Fblog.parse.ly%2F5-tagging-best-practices-content-strategy%2F',
						'thumbnailUrl' => 'https://images.parsely.com/ap3YSufqxnLpz6zzQshoks3snXI=/85x85/smart/https%3A//blog.parse.ly/wp-content/uploads/2021/05/pexels-brett-jordan-998501-1024x768-2.jpeg%3Fw%3D150%26h%3D150%26crop%3D1',
						'title'        => '5 Tagging Best Practices For Getting the Most Out of Your Content Strategy',
						'url'          => 'https://blog.parse.ly/5-tagging-best-practices-content-strategy/?itm_source=wp-parsely-content-helper',
						'views'        => '40',
						'postId'       => 0,
					),
				),
			),
			$response->get_data()
		);
	}
}

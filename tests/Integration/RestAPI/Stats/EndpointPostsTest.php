<?php
/**
 * Integration test for the Stats API, Endpoint_Posts class
 *
 * @package Parsely
 * @since 3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\Stats;

use Parsely\Parsely;
use Parsely\REST_API\Stats\Endpoint_Posts;
use Parsely\REST_API\Stats\Stats_Controller;
use Parsely\Tests\Integration\RestAPI\BaseEndpointTest;
use Parsely\Tests\Integration\TestCase;
use Parsely\Utils\Utils;
use WP_Error;
use WP_REST_Request;

/**
 * Integration test for the Stats API, Endpoint_Posts class.
 *
 * @since 3.17.0
 */
class EndpointPostsTest extends BaseEndpointTest {
	/**
	 * The endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Endpoint_Posts
	 */
	private $endpoint;

	/**
	 * Setup method called before each test.
	 *
	 * @since 3.17.0
	 */
	public function set_up(): void {
		// Initialize the specific endpoint for this test class.
		$this->api_controller = new Stats_Controller( $this->parsely );
		$this->endpoint       = new Endpoint_Posts( $this->api_controller );

		parent::set_up();
	}

	/**
	 * Gets the test endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @return Endpoint_Posts
	 */
	public function get_endpoint(): \Parsely\REST_API\Base_Endpoint {
		return $this->endpoint;
	}

	/**
	 * Verifies that the route is registered.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Posts::register_routes
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_route_is_registered(): void {
		$routes = rest_get_server()->get_routes();

		// Check that the route is registered.
		$expected_route = $this->get_endpoint()->get_full_endpoint( '/' );
		self::assertArrayHasKey( $expected_route, $routes );

		// Check that the route is associated with the GET method.
		$route_data = $routes[ $expected_route ];
		self::assertArrayHasKey( 'GET', $route_data[0]['methods'] );
	}

	/**
	 * Verifies that the endpoint is not available if the API Secret is not set.
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Posts::is_available_to_current_user
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_access_error_if_api_secret_is_not_set(): void {
		TestCase::set_options(
			array(
				'apikey' => 'test',
			)
		);
		$route    = $this->get_endpoint()->get_full_endpoint( '/' );
		$response = rest_get_server()->dispatch(
			new WP_REST_Request( 'GET', $route )
		);

		$error = $response->as_error();
		self::assertNotNull( $error );
		self::assertSame( 403, $response->get_status() );
		self::assertSame( 'parsely_api_secret_not_set', $error->get_error_code() );
		self::assertSame(
			'A Parse.ly API Secret must be set in site options to use this endpoint',
			$error->get_error_message()
		);
	}

	/**
	 * Verifies forbidden error when current user doesn't have proper
	 * capabilities.
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Posts::is_available_to_current_user
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\REST_API\Base_Endpoint::get_default_access_capability
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_access_of_stats_posts_endpoint_is_forbidden(): void {
		TestCase::set_options(
			array(
				'apikey'     => 'test-api-key',
				'api_secret' => 'test-secret',
			)
		);
		$this->set_current_user_to_contributor();

		$route    = $this->get_endpoint()->get_full_endpoint( '/' );
		$response = rest_get_server()->dispatch(
			new WP_REST_Request( 'GET', $route )
		);
		/**
		 * Variable.
		 *
		 * @var WP_Error $error
		 */
		$error = $response->as_error();

		self::assertSame( 403, $response->get_status() );
		self::assertSame( 'rest_forbidden', $error->get_error_code() );
		self::assertSame(
			'Sorry, you are not allowed to do that.',
			$error->get_error_message()
		);
	}

	/**
	 * Verifies that calls to the endpoint return the expected data, in the
	 * expected format.
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Posts::get_posts
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_api_secret
	 * @uses \Parsely\Parsely::get_dash_url
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::get_url_with_itm_source
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\REST_API\Base_Endpoint::get_default_access_capability
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_date_format
	 * @uses \Parsely\Utils\Utils::parsely_is_https_supported
	 */
	public function test_get_posts(): void {
		TestCase::set_options(
			array(
				'apikey'     => 'example.com',
				'api_secret' => 'test-secret',
			)
		);
		$this->set_current_user_to_admin();

		$dispatched  = 0;
		$date_format = Utils::get_date_format();

		add_filter(
			'pre_http_request',
			function () use ( &$dispatched ): array {
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

		$rest_request = new WP_REST_Request( 'GET', '/wp-parsely/v2/stats/posts' );
		$rest_request->set_param( 'itm_source', 'wp-parsely-content-helper' );

		$response = rest_get_server()->dispatch( $rest_request );

		/**
		 * The response data.
		 *
		 * @var array<string, mixed> $response_data
		 */
		$response_data = $response->get_data();

		self::assertSame( 1, $dispatched );
		self::assertSame( 200, $response->get_status() );
		self::assertEquals(
			array(
				array(
					'author'       => 'Aakash Shah',
					'date'         => wp_date( $date_format, strtotime( '2020-04-06T13:30:58' ) ),
					'id'           => 'https://blog.parse.ly/web-analytics-software-tools/',
					'dashUrl'      => PARSELY::DASHBOARD_BASE_URL . '/example.com/find?url=https%3A%2F%2Fblog.parse.ly%2Fweb-analytics-software-tools%2F',
					'thumbnailUrl' => 'https://images.parsely.com/XCmTXuOf8yVbUYTxj2abQ4RSDkM=/85x85/smart/https%3A//blog.parse.ly/wp-content/uploads/2021/06/Web-Analytics-Tool.png%3Fw%3D150%26h%3D150%26crop%3D1',
					'title'        => '9 Types of Web Analytics Tools — And How to Know Which Ones You Really Need',
					'url'          => 'https://blog.parse.ly/web-analytics-software-tools/?itm_source=wp-parsely-content-helper',
					'views'        => '142',
					'postId'       => 0,
					'rawUrl'       => 'https://blog.parse.ly/web-analytics-software-tools/',
				),
				array(
					'author'       => 'Stephanie Schwartz and Andrew Butler',
					'date'         => wp_date( $date_format, strtotime( '2021-04-30T20:30:24' ) ),
					'id'           => 'https://blog.parse.ly/5-tagging-best-practices-content-strategy/',
					'dashUrl'      => PARSELY::DASHBOARD_BASE_URL . '/example.com/find?url=https%3A%2F%2Fblog.parse.ly%2F5-tagging-best-practices-content-strategy%2F',
					'thumbnailUrl' => 'https://images.parsely.com/ap3YSufqxnLpz6zzQshoks3snXI=/85x85/smart/https%3A//blog.parse.ly/wp-content/uploads/2021/05/pexels-brett-jordan-998501-1024x768-2.jpeg%3Fw%3D150%26h%3D150%26crop%3D1',
					'title'        => '5 Tagging Best Practices For Getting the Most Out of Your Content Strategy',
					'url'          => 'https://blog.parse.ly/5-tagging-best-practices-content-strategy/?itm_source=wp-parsely-content-helper',
					'views'        => '40',
					'postId'       => 0,
					'rawUrl'       => 'https://blog.parse.ly/5-tagging-best-practices-content-strategy/',
				),
			),
			$response_data['data']
		);

		self::assertEquals(
			array(
				'limit'      => 5,
				'sort'       => 'views',
				'page'       => 1,
				'itm_source' => 'wp-parsely-content-helper',
			),
			$response_data['params']
		);
	}
}

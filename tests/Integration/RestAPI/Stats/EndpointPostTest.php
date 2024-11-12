<?php
/**
 * Integration test for the Stats API endpoint, Endpoint_Post class.
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\Stats;

use Parsely\Parsely;
use Parsely\REST_API\Stats\Endpoint_Post;
use Parsely\REST_API\Stats\Stats_Controller;
use Parsely\Tests\Integration\RestAPI\BaseEndpointTest;
use Parsely\Tests\Integration\TestCase;
use WP_Error;
use WP_REST_Request;

/**
 * Integration test for the Stats API endpoint, Endpoint_Post class.
 *
 * @since 3.17.0
 */
class EndpointPostTest extends BaseEndpointTest {
	/**
	 * The endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Endpoint_Post
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
		$this->endpoint       = new Endpoint_Post( $this->api_controller );

		parent::set_up();
	}

	/**
	 * Gets the test endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @return Endpoint_Post
	 */
	public function get_endpoint(): \Parsely\REST_API\Base_Endpoint {
		return $this->endpoint;
	}

	/**
	 * Verifies that the route is registered.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::register_routes
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
	 * @uses \Parsely\REST_API\Base_Endpoint::get_registered_routes
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::__construct
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::get_endpoint_name
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::get_itm_source_param_args
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_route_is_registered(): void {
		$routes            = rest_get_server()->get_routes();
		$registered_routes = $this->get_endpoint()->get_registered_routes();

		// Assert that the routes are registered when the filter returns true.
		foreach ( $registered_routes as $route ) {
			$expected_route = $this->get_endpoint()->get_full_endpoint( $route );
			$route_data     = $routes[ $expected_route ];
			self::assertArrayHasKey( $expected_route, $routes );

			// Check that the route is associated with the GET method, since all
			// the routes in this endpoint are GET routes.
			self::assertArrayHasKey( 'GET', $route_data[0]['methods'] );
		}
	}

	/**
	 * Verifies that the endpoint is not available if the API Secret is not set.
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::is_available_to_current_user
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
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::__construct
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::get_endpoint_name
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::register_routes
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::get_itm_source_param_args
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_access_error_if_api_secret_is_not_set(): void {
		$test_post_id = $this->create_test_post();
		TestCase::set_options(
			array(
				'apikey' => 'test',
			)
		);
		$route    = $this->get_endpoint()->get_full_endpoint( '/' . $test_post_id . '/details' );
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
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::is_available_to_current_user
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
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::__construct
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::get_endpoint_name
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::register_routes
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::get_itm_source_param_args
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_access_of_stats_post_endpoint_is_forbidden(): void {
		$test_post_id = $this->create_test_post();
		TestCase::set_options(
			array(
				'apikey'     => 'test-api-key',
				'api_secret' => 'test-secret',
			)
		);
		$this->set_current_user_to_contributor();

		$route    = $this->get_endpoint()->get_full_endpoint( '/' . $test_post_id . '/details' );
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
	 * Verifies that calls to the stats/{post_id}/details endpoint return the
	 * expected data, in the expected format.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::get_post_details
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
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::__construct
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::get_endpoint_name
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::register_routes
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::extract_post_data
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::get_itm_source_param_args
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::set_itm_source_from_request
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_formatted_duration
	 * @uses \Parsely\Utils\Utils::parsely_is_https_supported
	 */
	public function test_get_details(): void {
		$test_post_id = $this->create_test_post();
		$route        = $this->get_endpoint()->get_full_endpoint( '/' . $test_post_id . '/details' );

		TestCase::set_options(
			array(
				'apikey'     => 'example.com',
				'api_secret' => 'test-secret',
			)
		);
		$this->set_current_user_to_admin();

		$dispatched = 0;

		add_filter(
			'pre_http_request',
			function () use ( &$dispatched ): array {
				$dispatched++;
				return array(
					'body' => '
						{"data":[{
							"avg_engaged": 1.911,
							"metrics": {
								"views": 2158,
								"visitors": 1537
							},
							"url": "https://example.com"
						}]}
					',
				);
			}
		);

		$response = rest_get_server()->dispatch( new WP_REST_Request( 'GET', $route ) );

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
					'avgEngaged' => '1:55',
					'dashUrl'    => Parsely::DASHBOARD_BASE_URL . '/example.com/find?url=https%3A%2F%2Fexample.com',
					'id'         => 'https://example.com',
					'postId'     => 0,
					'url'        => 'https://example.com',
					'views'      => '2,158',
					'visitors'   => '1,537',
					'rawUrl'     => 'https://example.com',
				),
			),
			$response_data['data']
		);
	}

	/**
	 * Verifies that calls to the stats/{post_id}/referrers endpoint return the
	 * expected data, in the expected format.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::get_post_referrers
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_api_secret
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
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
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::__construct
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::generate_referrer_types_data
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::generate_referrers_data
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::get_endpoint_name
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::get_i18n_percentage
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::register_routes
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::get_itm_source_param_args
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::set_itm_source_from_request
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::convert_to_positive_integer
	 */
	public function test_get_referrers(): void {
		$test_post_id = $this->create_test_post();
		$route        = $this->get_endpoint()->get_full_endpoint( '/' . $test_post_id . '/referrers' );

		TestCase::set_options(
			array(
				'apikey'     => 'example.com',
				'api_secret' => 'test-secret',
			)
		);
		$this->set_current_user_to_admin();

		$dispatched = 0;

		add_filter(
			'pre_http_request',
			function () use ( &$dispatched ): array {
				$dispatched++;
				return array(
					'body' => '{"data":[
						{
							"metrics": {"referrers_views": 1500},
							"name": "google",
							"type": "search"
						},
						{
							"metrics": {"referrers_views": 100},
							"name": "blog.parse.ly",
							"type": "internal"
						},
						{
							"metrics": {"referrers_views": 50},
							"name": "bing",
							"type": "search"
						},
						{
							"metrics": {"referrers_views": 30},
							"name": "facebook.com",
							"type": "social"
						},
						{
							"metrics": {"referrers_views": 10},
							"name": "okt.to",
							"type": "other"
						},
						{
							"metrics": {"referrers_views": 10},
							"name": "yandex",
							"type": "search"
						},
						{
							"metrics": {"referrers_views": 10},
							"name": "parse.ly",
							"type": "internal"
						},
						{
							"metrics": {"referrers_views": 10},
							"name": "yahoo!",
							"type": "search"
						},
						{
							"metrics": {"referrers_views": 5},
							"name": "site1.com",
							"type": "other"
						},
						{
							"metrics": {"referrers_views": 5},
							"name": "link.site2.com",
							"type": "other"
						}
					]}',
				);
			}
		);

		$expected_top = array(
			'direct'        => array(
				'views'                  => '770',
				'viewsPercentage'        => '30.80',
				'datasetViewsPercentage' => '31.43',
			),
			'google'        => array(
				'views'                  => '1,500',
				'viewsPercentage'        => '60.00',
				'datasetViewsPercentage' => '61.22',
			),
			'blog.parse.ly' => array(
				'views'                  => '100',
				'viewsPercentage'        => '4.00',
				'datasetViewsPercentage' => '4.08',
			),
			'bing'          => array(
				'views'                  => '50',
				'viewsPercentage'        => '2.00',
				'datasetViewsPercentage' => '2.04',
			),
			'facebook.com'  => array(
				'views'                  => '30',
				'viewsPercentage'        => '1.20',
				'datasetViewsPercentage' => '1.22',
			),
			'totals'        => array(
				'views'                  => '2,450',
				'viewsPercentage'        => '98.00',
				'datasetViewsPercentage' => '100.00',
			),
		);

		$expected_types = array(
			'social'   => array(
				'views'           => '30',
				'viewsPercentage' => '1.20',
			),
			'search'   => array(
				'views'           => '1,570',
				'viewsPercentage' => '62.80',
			),
			'other'    => array(
				'views'           => '20',
				'viewsPercentage' => '0.80',
			),
			'internal' => array(
				'views'           => '110',
				'viewsPercentage' => '4.40',
			),
			'direct'   => array(
				'views'           => '770',
				'viewsPercentage' => '30.80',
			),
			'totals'   => array(
				'views'           => '2,500',
				'viewsPercentage' => '100.00',
			),
		);

		$request = new WP_REST_Request( 'GET', $route );
		$request->set_param( 'total_views', '2,500' );

		$response = rest_get_server()->dispatch( $request );

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
				'top'   => $expected_top,
				'types' => $expected_types,
			),
			$response_data['data']
		);
	}

	/**
	 * Verifies that calls to the stats/{post_id}/related endpoint return the
	 * expected data, in the expected format.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::get_related_posts
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_api_secret
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
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::__construct
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::get_endpoint_name
	 * @uses \Parsely\REST_API\Stats\Endpoint_Post::register_routes
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::get_itm_source_param_args
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::set_itm_source_from_request
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_of_url
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_get_related_posts(): void {
		$test_post_id = $this->create_test_post();
		$route        = $this->get_endpoint()->get_full_endpoint( '/' . $test_post_id . '/related' );

		TestCase::set_options(
			array(
				'apikey'     => 'example.com',
				'api_secret' => 'test-secret',
			)
		);
		$this->set_current_user_to_admin();

		$dispatched = 0;

		add_filter(
			'pre_http_request',
			function () use ( &$dispatched ): array {
				$dispatched++;
				return array(
					'body' => '{"data":[
						{
							"image_url":"https:\/\/example.com\/img.png",
							"thumb_url_medium":"https:\/\/example.com\/thumb.png",
							"title":"something",
							"url":"https:\/\/example.com"
						},
						{
							"image_url":"https:\/\/example.com\/img2.png",
							"thumb_url_medium":"https:\/\/example.com\/thumb2.png",
							"title":"something2",
							"url":"https:\/\/example.com\/2"
						}
					]}',
				);
			}
		);

		$response = rest_get_server()->dispatch( new WP_REST_Request( 'GET', $route ) );
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
					'image_url'        => 'https://example.com/img.png',
					'thumb_url_medium' => 'https://example.com/thumb.png',
					'title'            => 'something',
					'url'              => 'https://example.com',
				),
				array(
					'image_url'        => 'https://example.com/img2.png',
					'thumb_url_medium' => 'https://example.com/thumb2.png',
					'title'            => 'something2',
					'url'              => 'https://example.com/2',
				),
			),
			$response_data['data']
		);
	}
}

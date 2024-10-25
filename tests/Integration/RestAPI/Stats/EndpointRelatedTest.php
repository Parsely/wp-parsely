<?php
/**
 * Integration test for the related endpoint, Endpoint_Related class.
 *
 * @package Parsely\Tests
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\Stats;

use Parsely\REST_API\Stats\Endpoint_Related;
use Parsely\REST_API\Stats\Stats_Controller;
use Parsely\Tests\Integration\RestAPI\BaseEndpointTest;
use Parsely\Tests\Integration\TestCase;
use WP_REST_Request;

/**
 * Integration test for the related endpoint, Endpoint_Related class.
 *
 * @since 3.17.0
 */
class EndpointRelatedTest extends BaseEndpointTest {
	/**
	 * The endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Endpoint_Related
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
		$this->endpoint       = new Endpoint_Related( $this->api_controller );

		parent::set_up();
	}

	/**
	 * Gets the test endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @return Endpoint_Related
	 */
	public function get_endpoint(): \Parsely\REST_API\Base_Endpoint {
		return $this->endpoint;
	}

	/**
	 * Verifies that the route is registered.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Related::register_routes
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::__construct
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::get_endpoint_name
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::is_available_to_current_user
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::get_itm_source_param_args
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
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
	 * Verifies that the endpoint is available to everyone, even if they are not
	 * logged in.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Related::is_available_to_current_user
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
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::__construct
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::get_endpoint_name
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::get_related_posts
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::register_routes
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::get_itm_source_param_args
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::set_itm_source_from_request
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_of_url
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_access_of_related_posts_is_available_to_everyone(): void {
		TestCase::set_options(
			array(
				'apikey'     => 'test-api-key',
				'api_secret' => 'test-secret',
			)
		);
		wp_set_current_user( 0 );

		$dispatched = 0;
		$this->mock_api_response( $dispatched );

		$route   = $this->get_endpoint()->get_full_endpoint( '/' );
		$request = new WP_REST_Request( 'GET', $route );
		$request->set_param( 'url', 'https://example.com/a-post' );
		$response = rest_get_server()->dispatch( $request );

		self::assertEquals( 1, $dispatched );
		self::assertSame( 200, $response->get_status() );
	}

	/**
	 * Mocks the API response of the Parse.ly API.
	 *
	 * @since 3.17.0
	 *
	 * @param int &$dispatched The number of times the API was dispatched.
	 */
	private function mock_api_response( int &$dispatched ): void {
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
	}

	/**
	 * Verifies that calls to the `stats/related` return the expected data, in the
	 * expected format, despite the user being unauthenticated.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Related::get_related_posts
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
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::__construct
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::get_endpoint_name
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::is_available_to_current_user
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::register_routes
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::get_itm_source_param_args
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::set_itm_source_from_request
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_of_url
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_get_related_posts(): void {
		$route = $this->get_endpoint()->get_full_endpoint( '/' );

		TestCase::set_options(
			array(
				'apikey'     => 'example.com',
				'api_secret' => 'test-secret',
			)
		);

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

		$request = new WP_REST_Request( 'GET', $route );
		$request->set_param( 'url', 'https://example.com/a-post' );
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

	/**
	 * Verifies that the endpoint is not available if the API Secret is not set.
	 *
	 * This test is disabled since the endpoint does not require an API Secret.
	 *
	 * @since 3.17.0
	 *
	 * @coversNothing
	 */
	public function test_is_available_to_current_user_returns_error_api_secret_not_set(): void {
		self::assertTrue( true );
	}
}

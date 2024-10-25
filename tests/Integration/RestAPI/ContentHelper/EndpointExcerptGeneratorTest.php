<?php
/**
 * Integration tests for the Endpoint_Excerpt_Generator class.
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\ContentHelper;

use Parsely\REST_API\Content_Helper\Endpoint_Excerpt_Generator;
use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\Services\Suggestions_API\Suggestions_API_Service;
use Parsely\Tests\Integration\RestAPI\BaseEndpointTest;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

/**
 * Integration tests for the Endpoint_Excerpt_Generator class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Excerpt_Generator
 */
class EndpointExcerptGeneratorTest extends BaseEndpointTest {
	use ContentHelperFeatureTestTrait;

	/**
	 * The endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Endpoint_Excerpt_Generator
	 */
	private $endpoint;

	/**
	 * Sets up the test environment.
	 *
	 * @since 3.17.0
	 */
	public function set_up(): void {
		// Initialize the specific endpoint for this test class.
		$this->api_controller = new Content_Helper_Controller( $this->parsely );
		$this->endpoint       = new Endpoint_Excerpt_Generator( $this->api_controller );

		parent::set_up();
	}

	/**
	 * Gets the test endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @return Endpoint_Excerpt_Generator
	 */
	public function get_endpoint(): \Parsely\REST_API\Base_Endpoint {
		return $this->endpoint;
	}

	/**
	 * Tests that the endpoint is correctly registered.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Excerpt_Generator::register_routes
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
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
	 * @uses \Parsely\REST_API\Content_Helper\Content_Helper_Controller::get_route_prefix
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_route_is_registered(): void {
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'plugins_loaded' );
		$routes = rest_get_server()->get_routes();

		// Check that the excerpt-generator/generate route is registered.
		$expected_route = $this->get_endpoint()->get_full_endpoint( 'generate' );
		self::assertArrayHasKey( $expected_route, $routes );

		// Check that the route is associated with the POST method.
		$route_data = $routes[ $expected_route ];
		self::assertArrayHasKey( 'POST', $route_data[0]['methods'] );
	}

	/**
	 * Tests that the generate_excerpt method returns a valid response.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Excerpt_Generator::generate_excerpt
	 * @uses \Parsely\Parsely::get_suggestions_api
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\Services\Base_API_Service::__construct
	 * @uses \Parsely\Services\Base_API_Service::register_endpoint
	 * @uses \Parsely\Services\Base_Service_Endpoint::__construct
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Brief::get_endpoint
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Headline::get_endpoint
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Linked_Reference::get_endpoint
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::register_endpoints
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_generate_excerpt_returns_valid_response(): void {
		// Mock the Suggest_Brief_API to control the response.
		$mock_suggestions_api = $this->createMock( Suggestions_API_Service::class );
		$mock_suggestions_api->expects( self::once() )
						->method( 'get_brief_suggestions' )
						->willReturn( array( array( 'summary' => 'This is a test excerpt.' ) ) );

		self::set_protected_property( $this->get_endpoint(), 'suggestions_api', $mock_suggestions_api );

		// Create a mock request.
		$request = new WP_REST_Request( 'POST', '/excerpt-generator/generate' );
		$request->set_param( 'text', 'Test content' );
		$request->set_param( 'title', 'Test title' );
		$request->set_param( 'persona', 'journalist' );
		$request->set_param( 'style', 'neutral' );

		// Call the generate_excerpt method.
		$response = $this->get_endpoint()->generate_excerpt( $request );

		// Assert that the response is a WP_REST_Response and contains the correct data.
		self::assertInstanceOf( WP_REST_Response::class, $response );

		/**
		 * The response data.
		 *
		 * @var array<mixed,array<mixed>> $data The response data.
		 */
		$data = $response->get_data();
		self::assertArrayHasKey( 'data', $data );
		self::assertEquals( 'This is a test excerpt.', $data['data']['summary'] );
	}

	/**
	 * Tests that the generate_excerpt method returns an error if Suggest_Brief_API fails.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Excerpt_Generator::generate_excerpt
	 * @uses \Parsely\Parsely::get_suggestions_api
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\Services\Base_API_Service::__construct
	 * @uses \Parsely\Services\Base_API_Service::register_endpoint
	 * @uses \Parsely\Services\Base_Service_Endpoint::__construct
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Brief::get_endpoint
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Headline::get_endpoint
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Linked_Reference::get_endpoint
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::register_endpoints
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_generate_excerpt_returns_error_on_failure(): void {
		// Mock the Suggest_Brief_API to simulate a failure.
		$mock_suggestions_api = $this->createMock( Suggestions_API_Service::class );
		$mock_suggestions_api->expects( self::once() )
						->method( 'get_brief_suggestions' )
						->willReturn( new WP_Error( 'api_error', 'API request failed' ) );

		self::set_protected_property( $this->get_endpoint(), 'suggestions_api', $mock_suggestions_api );

		// Create a mock request.
		$request = new WP_REST_Request( 'POST', '/excerpt-generator/generate' );
		$request->set_param( 'text', 'Test content' );
		$request->set_param( 'title', 'Test title' );
		$request->set_param( 'persona', 'journalist' );
		$request->set_param( 'style', 'neutral' );

		// Call the generate_excerpt method.
		$response = $this->get_endpoint()->generate_excerpt( $request );

		// Assert that the response is a WP_Error.
		self::assertInstanceOf( WP_Error::class, $response );
		self::assertEquals( 'api_error', $response->get_error_code() );
	}
}

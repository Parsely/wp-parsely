<?php
/**
 * Integration tests for the Endpoint_Title_Suggestions class.
 *
 * @package Parsely
 * @since 3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\ContentHelper;

use Parsely\REST_API\Content_Helper\Endpoint_Title_Suggestions;
use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\RemoteAPI\ContentSuggestions\Suggest_Headline_API;
use Parsely\Tests\Integration\RestAPI\BaseEndpointTest;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

/**
 * Integration tests for the Endpoint_Title_Suggestions class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Title_Suggestions
 */
class EndpointTitleSuggestionsTest extends BaseEndpointTest {
	use ContentHelperFeatureTestTrait;

	/**
	 * The endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Endpoint_Title_Suggestions
	 */
	private $endpoint;

	/**
	 * Set up the test environment.
	 *
	 * @since 3.17.0
	 */
	public function set_up(): void {
		// Initialize the specific endpoint for this test class.
		$this->api_controller = new Content_Helper_Controller( $this->parsely );
		$this->endpoint       = new Endpoint_Title_Suggestions( $this->api_controller );

		parent::set_up();
	}

	/**
	 * Get the test endpoint instance.
	 *
	 * @return Endpoint_Title_Suggestions
	 * @since 3.17.0
	 */
	public function get_endpoint(): \Parsely\REST_API\Base_Endpoint {
		return $this->endpoint;
	}

	/**
	 * Test that the endpoint is correctly registered.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Title_Suggestions::register_routes
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
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
		$routes = rest_get_server()->get_routes();

		// Check that the title-suggestions/generate route is registered.
		$expected_route = $this->get_endpoint()->get_full_endpoint( 'generate' );
		self::assertArrayHasKey( $expected_route, $routes );

		// Check that the route is associated with the POST method.
		$route_data = $routes[ $expected_route ];
		self::assertArrayHasKey( 'POST', $route_data[0]['methods'] );
	}

	/**
	 * Test that the generate_titles method returns a valid response.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Title_Suggestions::generate_titles
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_generate_titles_returns_valid_response(): void {
		// Mock the Suggest_Headline_API to control the response.
		$mock_suggest_api = $this->createMock( Suggest_Headline_API::class );
		$mock_suggest_api->expects( self::once() )
						->method( 'get_titles' )
						->willReturn( array( 'title1', 'title2', 'title3' ) );

		$this->set_protected_property( $this->get_endpoint(), 'suggest_headline_api', $mock_suggest_api );

		// Create a mock request.
		$request = new WP_REST_Request( 'POST', '/title-suggestions/generate' );
		$request->set_param( 'text', 'Test content' );
		$request->set_param( 'limit', 3 );
		$request->set_param( 'style', 'neutral' );
		$request->set_param( 'persona', 'journalist' );

		// Call the generate_titles method.
		$response = $this->get_endpoint()->generate_titles( $request );

		// Assert that the response is a WP_REST_Response and contains the correct data.
		self::assertInstanceOf( WP_REST_Response::class, $response );

		/**
		 * The response data.
		 *
		 * @var array<mixed> $data The response data.
		 */
		$data = $response->get_data();
		self::assertArrayHasKey( 'data', $data );
		self::assertEquals( array( 'title1', 'title2', 'title3' ), $data['data'] );
	}

	/**
	 * Test that the generate_titles method returns an error if Suggest_Headline_API fails.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Title_Suggestions::generate_titles
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_generate_titles_returns_error_on_failure(): void {
		// Mock the Suggest_Headline_API to simulate a failure.
		$mock_suggest_api = $this->createMock( Suggest_Headline_API::class );
		$mock_suggest_api->expects( self::once() )
						->method( 'get_titles' )
						->willReturn( new WP_Error( 'api_error', 'API request failed' ) );

		$this->set_protected_property( $this->get_endpoint(), 'suggest_headline_api', $mock_suggest_api );

		// Create a mock request.
		$request = new WP_REST_Request( 'POST', '/title-suggestions/generate' );
		$request->set_param( 'text', 'Test content' );
		$request->set_param( 'limit', 3 );
		$request->set_param( 'style', 'neutral' );
		$request->set_param( 'persona', 'journalist' );

		// Call the generate_titles method.
		$response = $this->get_endpoint()->generate_titles( $request );

		// Assert that the response is a WP_Error.
		self::assertInstanceOf( WP_Error::class, $response );
		self::assertEquals( 'api_error', $response->get_error_code() );
	}
}

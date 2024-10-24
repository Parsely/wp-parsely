<?php
/**
 * Integration tests for the Endpoint_Title_Suggestions class.
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\ContentHelper;

use Parsely\REST_API\Content_Helper\Endpoint_Title_Suggestions;
use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\RemoteAPI\ContentSuggestions\Suggest_Headline_API;
use Parsely\Services\Suggestions_API\Suggestions_API_Service;
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
	 * Sets up the test environment.
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
	 * Gets the test endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @return Endpoint_Title_Suggestions
	 */
	public function get_endpoint(): \Parsely\REST_API\Base_Endpoint {
		return $this->endpoint;
	}

	/**
	 * Tests that the endpoint is correctly registered.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Title_Suggestions::register_routes
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
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
	 * Tests that the generate_titles method returns a valid response.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Title_Suggestions::generate_titles
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
	public function test_generate_titles_returns_valid_response(): void {
		// Mock the Suggestions API `get_title_suggestions` method to return a list of titles.
		$mock_suggestions_api = $this->createMock( Suggestions_API_Service::class );
		$mock_suggestions_api->expects( self::once() )
			->method( 'get_title_suggestions' )
			->willReturn( array( 'title1', 'title2', 'title3' ) );

		self::set_protected_property( $this->get_endpoint(), 'suggestions_api', $mock_suggestions_api );

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
	 * Tests that the generate_titles method returns an error if Suggest_Headline_API fails.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Title_Suggestions::generate_titles
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
	public function test_generate_titles_returns_error_on_failure(): void {
		// Mock the Suggestions API `get_title_suggestions` method to return an error.
		$mock_suggestions_api = $this->createMock( Suggestions_API_Service::class );
		$mock_suggestions_api->expects( self::once() )
							->method( 'get_title_suggestions' )
							->willReturn( new WP_Error( 'api_error', 'API request failed' ) );

		self::set_protected_property( $this->get_endpoint(), 'suggestions_api', $mock_suggestions_api );

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

<?php
/**
 * Integration tests for the Endpoint_Smart_Linking class.
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\ContentHelper;

use Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking;
use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\RemoteAPI\ContentSuggestions\Suggest_Linked_Reference_API;
use Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Linked_Reference;
use Parsely\Services\Suggestions_API\Suggestions_API_Service;
use Parsely\Tests\Integration\RestAPI\BaseEndpointTest;
use Parsely\Models\Smart_Link;
use Parsely\Tests\Integration\TestCase;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_UnitTestCase_Base;

/**
 * Integration tests for the Endpoint_Smart_Linking class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking
 */
class EndpointSmartLinkingTest extends BaseEndpointTest {
	use ContentHelperFeatureTestTrait;

	/**
	 * The endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Endpoint_Smart_Linking
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
		$this->endpoint       = new Endpoint_Smart_Linking( $this->api_controller );

		parent::set_up();

		// Setup fake API key and secret.
		TestCase::set_options(
			array(
				'apikey'     => 'test-apikey',
				'api_secret' => 'test-secret',
			)
		);
	}

	/**
	 * Gets the test endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @return Endpoint_Smart_Linking
	 */
	public function get_endpoint(): \Parsely\REST_API\Base_Endpoint {
		return $this->endpoint;
	}

	/**
	 * Tests that the endpoint is correctly registered.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::register_routes
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
	 * @uses \Parsely\REST_API\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\REST_API\Base_Endpoint::get_default_access_capability
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

		// Check that the smart-linking/generate route is registered.
		$expected_route = $this->get_endpoint()->get_full_endpoint( 'generate' );
		self::assertArrayHasKey( $expected_route, $routes );

		// Check that the route is associated with the POST method.
		$route_data = $routes[ $expected_route ];
		self::assertArrayHasKey( 'POST', $route_data[0]['methods'] );
	}

	/**
	 * Tests that the generate_smart_links method returns a valid response.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::generate_smart_links
	 * @uses \Parsely\Models\Base_Model::__construct
	 * @uses \Parsely\Models\Smart_Link::__construct
	 * @uses \Parsely\Models\Smart_Link::generate_uid
	 * @uses \Parsely\Models\Smart_Link::get_post_id_by_url
	 * @uses \Parsely\Models\Smart_Link::set_href
	 * @uses \Parsely\Models\Smart_Link::to_array
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_generate_smart_links_returns_valid_response(): void {
		// Create a mocked Suggestions API that returns two smart links.
		$mock_suggestions_api = $this->createMock( Suggestions_API_Service::class );
		$mock_suggestions_api->expects( self::once() )
						->method( 'get_smart_links' )
						->willReturn(
							array(
								new Smart_Link( 'link1', 'http://example.com/1', 'Example 1', 0, 0 ),
								new Smart_Link( 'link2', 'http://example.com/2', 'Example 2', 0, 1 ),
							)
						);

		self::set_protected_property( $this->get_endpoint(), 'suggestions_api', $mock_suggestions_api );

		// Create a mock request.
		$request = new WP_REST_Request( 'POST', '/smart-linking/generate' );
		$request->set_param( 'text', 'Test content' );
		$request->set_param( 'max_links', 2 );
		$request->set_param( 'url_exclusion_list', array( 'http://excluded.com' ) );

		// Call the generate_smart_links method.
		$response = $this->get_endpoint()->generate_smart_links( $request );

		// Assert that the response is a WP_REST_Response and contains the correct data.
		self::assertInstanceOf( WP_REST_Response::class, $response );

		/**
		 * The response data.
		 *
		 * @var array<mixed,array<mixed>> $data The response data.
		 */
		$data = $response->get_data();
		self::assertArrayHasKey( 'data', $data );
		self::assertCount( 2, $data['data'] );
	}

	/**
	 * Tests that the generate_smart_links method returns an error if Suggest_Linked_Reference_API fails.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::generate_smart_links
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_generate_smart_links_returns_error_on_failure(): void {
		// Mock the Suggestions API `get_smart_links` method to return a WP_Error.
		$mock_suggestions_api = $this->createMock( Suggestions_API_Service::class );
		$mock_suggestions_api->expects( self::once() )
							->method( 'get_smart_links' )
							->willReturn( new WP_Error( 'api_error', 'API request failed' ) );

		self::set_protected_property( $this->get_endpoint(), 'suggestions_api', $mock_suggestions_api );

		// Create a mock request.
		$request = new WP_REST_Request( 'POST', '/smart-linking/generate' );
		$request->set_param( 'text', 'Test content' );
		$request->set_param( 'max_links', 2 );
		$request->set_param( 'url_exclusion_list', array( 'http://excluded.com' ) );

		// Call the generate_smart_links method.
		$response = $this->get_endpoint()->generate_smart_links( $request );

		// Assert that the response is a WP_Error.
		self::assertInstanceOf( WP_Error::class, $response );
		self::assertEquals( 'api_error', $response->get_error_code() );
	}

	/**
	 * Tests that the add_smart_link method returns a valid response when adding a new smart link.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::add_smart_link
	 * @uses \Parsely\Models\Base_Model::__construct
	 * @uses \Parsely\Models\Base_Model::serialize
	 * @uses \Parsely\Models\Smart_Link::__construct
	 * @uses \Parsely\Models\Smart_Link::deserialize
	 * @uses \Parsely\Models\Smart_Link::exists
	 * @uses \Parsely\Models\Smart_Link::generate_uid
	 * @uses \Parsely\Models\Smart_Link::get_post_id_by_url
	 * @uses \Parsely\Models\Smart_Link::get_smart_link
	 * @uses \Parsely\Models\Smart_Link::get_smart_link_object_by_uid
	 * @uses \Parsely\Models\Smart_Link::load
	 * @uses \Parsely\Models\Smart_Link::save
	 * @uses \Parsely\Models\Smart_Link::set_href
	 * @uses \Parsely\Models\Smart_Link::set_source_post_id
	 * @uses \Parsely\Models\Smart_Link::set_uid
	 * @uses \Parsely\Models\Smart_Link::to_array
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
	 * @uses \Parsely\REST_API\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\REST_API\Base_Endpoint::get_default_access_capability
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
	public function test_add_smart_link_returns_valid_response(): void {
		// Create mocked post.
		$post = WP_UnitTestCase_Base::factory()->post->create_and_get();
		self::assertNotWPError( $post );
		$post_id = $post->ID; // @phpstan-ignore-line

		// Create a mock request.
		$request = new WP_REST_Request( 'POST', $this->get_endpoint()->get_full_endpoint( $post_id . '/add' ) );

		$smart_link_data = array(
			'uid'    => md5( 'link1' ),
			'href'   => 'http://example.com/1',
			'title'  => 'Example 1',
			'text'   => 'Example 1',
			'offset' => 0,
		);
		$request->set_param( 'link', $smart_link_data );

		// Dispatch the request.
		$response = rest_get_server()->dispatch( $request );

		// Assert that the response is a WP_REST_Response and contains the correct data.
		self::assertInstanceOf( WP_REST_Response::class, $response );

		/**
		 * The response data.
		 *
		 * @var array<mixed,array<mixed>> $data The response data.
		 */
		$data = $response->get_data();

		self::assertNotTrue( $response->is_error() );

		self::assertArrayHasKey( 'data', $data );
		self::assertIsObject( $data['data'] );

		$smart_link_attributes = array(
			'smart_link_id',
			'uid',
			'href',
			'text',
			'offset',
			'applied',
			'source',
			'destination',
		);

		foreach ( $smart_link_attributes as $attribute ) {
			self::assertObjectHasProperty( $attribute, $data['data'] );
		}
	}

	/**
	 * Tests that the add_multiple_smart_links method returns a valid response when adding multiple smart links.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::add_multiple_smart_links
	 * @uses \Parsely\Models\Base_Model::__construct
	 * @uses \Parsely\Models\Base_Model::serialize
	 * @uses \Parsely\Models\Smart_Link::__construct
	 * @uses \Parsely\Models\Smart_Link::deserialize
	 * @uses \Parsely\Models\Smart_Link::exists
	 * @uses \Parsely\Models\Smart_Link::generate_uid
	 * @uses \Parsely\Models\Smart_Link::get_post_id_by_url
	 * @uses \Parsely\Models\Smart_Link::get_smart_link
	 * @uses \Parsely\Models\Smart_Link::get_smart_link_object_by_uid
	 * @uses \Parsely\Models\Smart_Link::load
	 * @uses \Parsely\Models\Smart_Link::save
	 * @uses \Parsely\Models\Smart_Link::set_href
	 * @uses \Parsely\Models\Smart_Link::set_source_post_id
	 * @uses \Parsely\Models\Smart_Link::set_uid
	 * @uses \Parsely\Models\Smart_Link::to_array
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
	 * @uses \Parsely\REST_API\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\REST_API\Base_Endpoint::get_default_access_capability
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
	public function test_add_multiple_smart_links_returns_valid_response(): void {
		// Create mocked post.
		$post = WP_UnitTestCase_Base::factory()->post->create_and_get();
		self::assertNotWPError( $post );
		$post_id = $post->ID; // @phpstan-ignore-line

		// Create a mock request.
		$request = new WP_REST_Request( 'POST', $this->get_endpoint()->get_full_endpoint( $post_id . '/add-multiple' ) );

		$smart_links_data = array(
			array(
				'uid'    => md5( 'link1' ),
				'href'   => 'http://example.com/1',
				'title'  => 'Example 1',
				'text'   => 'Example 1',
				'offset' => 0,
			),
			array(
				'uid'    => md5( 'link2' ),
				'href'   => 'http://example.com/2',
				'title'  => 'Example 2',
				'text'   => 'Example 2',
				'offset' => 0,
			),
			array(
				'uid'    => md5( 'link3' ),
				'href'   => 'http://example.com/3',
				'title'  => 'Example 3',
				'text'   => 'Example 3',
				'offset' => 0,
			),
		);
		$request->set_param( 'links', $smart_links_data );

		// Dispatch the request.
		$response = rest_get_server()->dispatch( $request );

		// Assert that the response is a WP_REST_Response and contains the correct data.
		self::assertInstanceOf( WP_REST_Response::class, $response );

		/**
		 * The response data.
		 *
		 * @var array<mixed,array<mixed>> $data The response data.
		 */
		$data = $response->get_data();

		self::assertNotTrue( $response->is_error() );

		self::assertArrayHasKey( 'data', $data );
		self::assertArrayHasKey( 'added', $data['data'] );
		self::assertIsArray( $data['data']['added'] );
		self::assertCount( 3, $data['data']['added'] );

		$smart_link_attributes = array(
			'smart_link_id',
			'uid',
			'href',
			'text',
			'offset',
			'applied',
			'source',
			'destination',
		);

		foreach ( $data['data']['added'] as $smart_link ) {
			foreach ( $smart_link_attributes as $attribute ) {
				self::assertArrayHasKey( $attribute, $smart_link );
			}
		}
	}
}

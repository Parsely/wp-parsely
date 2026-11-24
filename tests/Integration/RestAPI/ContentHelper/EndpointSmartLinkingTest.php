<?php
/**
 * Integration tests for the Endpoint_Smart_Linking class.
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\ContentHelper;

use Parsely\Content_Helper\Editor_Sidebar;
use Parsely\Content_Helper\Editor_Sidebar\Smart_Linking;
use Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking;
use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\Services\Suggestions_API\Suggestions_API_Service;
use Parsely\Tests\Integration\RestAPI\BaseEndpointTest;
use Parsely\Models\Smart_Link;
use Parsely\Models\Smart_Link_Status;
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
	 * @uses \Parsely\Models\Smart_Link::set_href
	 * @uses \Parsely\Models\Smart_Link::to_array
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_post_id_by_url
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
	 * @uses \Parsely\Utils\Utils::get_post_id_by_url
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
			'href'   => array(
				'raw' => 'http://example.com/1',
			),
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

		self::assertObjectHasProperty( 'raw', $data['data']->href );
		self::assertObjectHasProperty( 'itm', $data['data']->href );

		// Assert that ITM parameters are added to the href.
		self::assertStringContainsString( 'itm_campaign=wp-parsely', $data['data']->href->itm );
		self::assertStringContainsString( 'itm_medium=smart-link', $data['data']->href->itm );
		self::assertStringContainsString( 'itm_source=smart-linking', $data['data']->href->itm );
		self::assertStringContainsString( 'itm_term=' . $smart_link_data['uid'], $data['data']->href->itm );
	}

	/**
	 * Verifies that only web URLs are accepted as Smart Link hrefs.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::validate_smart_link_params
	 * @covers \Parsely\Models\Smart_Link::is_valid_href
	 *
	 * @dataProvider data_smart_link_hrefs
	 *
	 * @param string $href       The href to submit.
	 * @param bool   $is_allowed Whether the href should be accepted.
	 */
	public function test_add_smart_link_validates_href_scheme( string $href, bool $is_allowed ): void {
		$post = WP_UnitTestCase_Base::factory()->post->create_and_get();
		self::assertNotWPError( $post );
		$post_id = $post->ID; // @phpstan-ignore-line

		$uid     = md5( $href );
		$request = new WP_REST_Request( 'POST', $this->get_endpoint()->get_full_endpoint( $post_id . '/add' ) );
		$request->set_param(
			'link',
			array(
				'uid'    => $uid,
				'href'   => array( 'raw' => $href ),
				'title'  => 'Example',
				'text'   => 'Example',
				'offset' => 0,
			)
		);

		$response = rest_get_server()->dispatch( $request );

		if ( ! $is_allowed ) {
			self::assertSame( 400, $response->get_status() );
			return;
		}

		self::assertSame( 200, $response->get_status() );

		/**
		 * The response data.
		 *
		 * @var array<mixed,array<mixed>> $data The response data.
		 */
		$data = $response->get_data();

		self::assertArrayHasKey( 'data', $data );
		self::assertIsObject( $data['data'] );

		// The href must be kept exactly as submitted, as it is matched against
		// the anchors in the post's content.
		self::assertSame( $href, $data['data']->href->raw );
	}

	/**
	 * Provides hrefs for the href scheme validation test.
	 *
	 * @since 3.24.2
	 *
	 * @return array<string, array{string, bool}>
	 */
	public function data_smart_link_hrefs(): array {
		return array(
			'https URL'           => array( 'https://example.com/post-name/', true ),
			'http URL with query' => array( 'http://example.com/?p=42', true ),
			'relative path'       => array( '/relative/path/', true ),
			'fragment'            => array( '#anchor', true ),
			'fragment with colon' => array( '#section:details', false ),
			'javascript scheme'   => array( 'javascript:alert(document.cookie)', false ),
			'mixed-case script'   => array( 'JaVaScRiPt:alert(1)', false ),
			'script with tab'     => array( "java\tscript:alert(1)", false ),
			'data scheme'         => array( 'data:text/html;base64,PHN2Zz4=', false ),
			'vbscript scheme'     => array( 'vbscript:msgbox(1)', false ),
			'non-web scheme'      => array( 'mailto:someone@example.com', false ),
		);
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
	 * @uses \Parsely\Utils\Utils::get_post_id_by_url
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
				'href'   => array(
					'raw' => 'http://example.com/1',
				),
				'title'  => 'Example 1',
				'text'   => 'Example 1',
				'offset' => 0,
			),
			array(
				'uid'    => md5( 'link2' ),
				'href'   => array(
					'raw' => 'http://example.com/2',
				),
				'title'  => 'Example 2',
				'text'   => 'Example 2',
				'offset' => 0,
			),
			array(
				'uid'    => md5( 'link3' ),
				'href'   => array(
					'raw' => 'http://example.com/3',
				),
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

			self::assertArrayHasKey( 'raw', $smart_link['href'] );
			self::assertArrayHasKey( 'itm', $smart_link['href'] );

			// Assert that ITM parameters are added to the href.
			self::assertStringContainsString( 'itm_campaign=wp-parsely', $smart_link['href']['itm'] );
			self::assertStringContainsString( 'itm_medium=smart-link', $smart_link['href']['itm'] );
			self::assertStringContainsString( 'itm_source=smart-linking', $smart_link['href']['itm'] );
			self::assertStringContainsString( 'itm_term=' . $smart_link['uid'], $smart_link['href']['itm'] );
		}
	}

	/**
	 * Verifies that adding a Smart Link with the UID of a stored one fails,
	 * unless the request asks to update it.
	 *
	 * @since 3.26.1
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::add_smart_link
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::get_smart_link_from_params
	 * @uses \Parsely\Models\Smart_Link
	 */
	public function test_add_smart_link_with_an_existing_uid_requires_update(): void {
		$post_id = $this->create_post_for_smart_links();
		$link    = $this->get_link_params( 'existing' );

		self::assertSame(
			200,
			$this->dispatch_add_smart_link( $post_id, $link )->get_status(),
			'Fixture is wrong: the Smart Link should be added.'
		);

		$link['text'] = 'Updated text';

		$response = $this->dispatch_add_smart_link( $post_id, $link );

		/** @var array{error: array{name: string}} $data */
		$data = $response->get_data();

		self::assertSame( 409, $response->get_status() );
		self::assertSame( 'smart_link_exists', $data['error']['name'] );

		self::assertSame( 200, $this->dispatch_add_smart_link( $post_id, $link, true )->get_status() );
		self::assertSame( 'Updated text', Smart_Link::get_smart_link( $link['uid'], $post_id )->text );
	}

	/**
	 * Verifies that setting a post's Smart Links saves the passed ones, and
	 * removes the stored ones the request doesn't include.
	 *
	 * @since 3.26.1
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::get_smart_link_from_params
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::set_smart_links
	 * @uses \Parsely\Models\Smart_Link
	 * @uses \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::add_multiple_smart_links
	 */
	public function test_set_smart_links_saves_and_removes_links(): void {
		$post_id = $this->create_post_for_smart_links();
		$links   = array(
			$this->get_link_params( 'a' ),
			$this->get_link_params( 'b' ),
			$this->get_link_params( 'c' ),
		);

		$request = new WP_REST_Request( 'POST', $this->get_endpoint()->get_full_endpoint( $post_id . '/add-multiple' ) );
		$request->set_param( 'links', array( $links[0], $links[1] ) );

		self::assertSame(
			200,
			rest_get_server()->dispatch( $request )->get_status(),
			'Fixture is wrong: the Smart Links should be added.'
		);

		$request = new WP_REST_Request( 'POST', $this->get_endpoint()->get_full_endpoint( $post_id . '/set' ) );
		$request->set_param( 'links', array( $links[1], $links[2] ) );

		$response = rest_get_server()->dispatch( $request );

		self::assertSame( 200, $response->get_status() );

		/** @var array{data: array{saved: array<array{uid: string}>, removed: array<array{uid: string}>}} $data */
		$data = $response->get_data();

		self::assertSame( array( $links[1]['uid'], $links[2]['uid'] ), array_column( $data['data']['saved'], 'uid' ) );
		self::assertSame( array( $links[0]['uid'] ), array_column( $data['data']['removed'], 'uid' ) );

		$stored_uids = array_map(
			function ( Smart_Link $link ): string {
				return $link->get_uid();
			},
			Smart_Link::get_outbound_smart_links( $post_id, Smart_Link_Status::APPLIED )
		);
		sort( $stored_uids );

		$expected_uids = array( $links[1]['uid'], $links[2]['uid'] );
		sort( $expected_uids );

		self::assertSame( $expected_uids, $stored_uids );
	}

	/**
	 * Registers the post type and taxonomies that Smart Links are stored with,
	 * and creates a post to add them to.
	 *
	 * @since 3.26.1
	 *
	 * @return int The post's ID.
	 */
	private function create_post_for_smart_links(): int {
		( new Smart_Linking( new Editor_Sidebar( $this->parsely ) ) )->run();

		/** @var int */
		return self::factory()->post->create();
	}

	/**
	 * Returns the parameters of a Smart Link to an external URL.
	 *
	 * @since 3.26.1
	 *
	 * @param string $name A name that makes the Smart Link unique.
	 * @return array{uid: string, href: array{raw: string}, title: string, text: string, offset: int} The Smart Link parameters.
	 */
	private function get_link_params( string $name ): array {
		$href = 'http://example.com/' . $name;
		$text = 'Example ' . $name;

		return array(
			'uid'    => ( new Smart_Link( $href, $text, $text, 0 ) )->get_uid(),
			'href'   => array( 'raw' => $href ),
			'title'  => $text,
			'text'   => $text,
			'offset' => 0,
		);
	}

	/**
	 * Dispatches a request to add a Smart Link to a post.
	 *
	 * @since 3.26.1
	 *
	 * @param int          $post_id The post's ID.
	 * @param array<mixed> $link    The Smart Link parameters.
	 * @param bool         $update  Whether to update a stored Smart Link with the same UID.
	 * @return WP_REST_Response The response.
	 */
	private function dispatch_add_smart_link( int $post_id, array $link, bool $update = false ): WP_REST_Response {
		$request = new WP_REST_Request( 'POST', $this->get_endpoint()->get_full_endpoint( $post_id . '/add' ) );
		$request->set_param( 'link', $link );
		$request->set_param( 'update', $update );

		return rest_get_server()->dispatch( $request );
	}
}

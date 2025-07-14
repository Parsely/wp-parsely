<?php
/**
 * Integration test for the Utils API endpoint, Endpoint_Post class.
 *
 * @package Parsely
 * @since   3.20.5
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\Utils;

use Parsely\REST_API\Base_Endpoint;
use Parsely\REST_API\Utils\Endpoint_Post;
use Parsely\REST_API\Utils\Utils_Controller;
use Parsely\Tests\Integration\RestAPI\BaseEndpointTest;
use Parsely\Tests\Integration\TestCase;
use WP_Error;
use WP_REST_Request;

/**
 * Integration test for the Utils API endpoint, Endpoint_Post class.
 *
 * @since 3.20.5
 */
class EndpointUtilsPostTest extends BaseEndpointTest {
	/**
	 * The endpoint instance.
	 *
	 * @since 3.20.5
	 *
	 * @var Endpoint_Post
	 */
	private $endpoint;

	/**
	 * Setup method called before each test.
	 *
	 * @since 3.20.5
	 */
	public function set_up(): void {
		// Initialize the specific endpoint for this test class.
		$this->api_controller = new Utils_Controller( $this->parsely );
		$this->endpoint       = new Endpoint_Post( $this->api_controller );

		parent::set_up();

		TestCase::set_options(
			array(
				'apikey'     => 'test-api-key',
				'api_secret' => 'test-secret',
			)
		);
	}

	/**
	 * Gets the test endpoint instance.
	 *
	 * @since 3.20.5
	 *
	 * @return Endpoint_Post
	 */
	public function get_endpoint(): Base_Endpoint {
		return $this->endpoint;
	}

	/**
	 * Verifies that the route is registered.
	 *
	 * @since 3.20.5
	 *
	 * @covers \Parsely\REST_API\Utils\Endpoint_Post::register_routes
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
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 * @uses \Parsely\REST_API\Utils\Endpoint_Post::get_endpoint_name
	 * @uses \Parsely\REST_API\Utils\Utils_Controller::get_route_prefix
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
	 * @covers \Parsely\REST_API\Utils\Endpoint_Post::is_available_to_current_user
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
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\REST_API\Utils\Endpoint_Post::get_endpoint_name
	 * @uses \Parsely\REST_API\Utils\Endpoint_Post::register_routes
	 * @uses \Parsely\REST_API\Utils\Utils_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_access_error_if_api_secret_is_not_set(): void {
		$test_post_id = $this->create_test_post();
		TestCase::set_options(
			array(
				'apikey'     => 'test',
				'api_secret' => '',
			)
		);

		$route    = $this->get_endpoint()->get_full_endpoint( '/' . $test_post_id . '/rest-route' );
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
	 * @covers \Parsely\REST_API\Utils\Endpoint_Post::is_available_to_current_user
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
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\REST_API\Utils\Endpoint_Post::get_endpoint_name
	 * @uses \Parsely\REST_API\Utils\Endpoint_Post::register_routes
	 * @uses \Parsely\REST_API\Utils\Utils_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_access_of_stats_post_endpoint_is_forbidden(): void {
		$test_post_id = $this->create_test_post();
		$this->set_current_user_to_contributor();

		$route    = $this->get_endpoint()->get_full_endpoint( '/' . $test_post_id . '/rest-route' );
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
	 * Verifies that get_rest_route() works as expected with WordPress built-in
	 * post types.
	 *
	 * @since 3.20.5
	 *
	 * @covers \Parsely\REST_API\Utils\Endpoint_Post::get_rest_route
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
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\REST_API\Utils\Endpoint_Post::get_endpoint_name
	 * @uses \Parsely\REST_API\Utils\Endpoint_Post::register_routes
	 * @uses \Parsely\REST_API\Utils\Utils_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_get_rest_route_with_built_in_post_types(): void {
		self::assertSame( '/wp/v2/posts', $this->get_base_rest_route( 'post' ) );
		self::assertSame( '/wp/v2/pages', $this->get_base_rest_route( 'page' ) );
	}

	/**
	 * Verifies that get_rest_route() works as expected with custom post types.
	 *
	 * @since 3.20.5
	 *
	 * @covers \Parsely\REST_API\Utils\Endpoint_Post::get_rest_route
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
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\REST_API\Utils\Endpoint_Post::get_endpoint_name
	 * @uses \Parsely\REST_API\Utils\Endpoint_Post::register_routes
	 * @uses \Parsely\REST_API\Utils\Utils_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_get_rest_route_with_custom_post_types(): void {
		register_post_type( 'cpt_rest', array( 'show_in_rest' => true ) );
		register_post_type( 'cpt_no_rest', array( 'show_in_rest' => false ) );
		register_post_type(
			'cpt_private',
			array(
				'show_in_rest' => true,
				'public'       => false,
			)
		);
		register_post_type(
			'cpt_public',
			array(
				'show_in_rest' => true,
				'public'       => true,
			)
		);
		register_post_type(
			'cpt_custom_rest_base',
			array(
				'show_in_rest' => true,
				'rest_base'    => 'custom_rest_base',
			)
		);

		self::assertSame( '/wp/v2/cpt_rest', $this->get_base_rest_route( 'cpt_rest' ) );
		self::assertSame( '/wp/v2/cpt_private', $this->get_base_rest_route( 'cpt_private' ) );
		self::assertSame( '/wp/v2/cpt_public', $this->get_base_rest_route( 'cpt_public' ) );
		self::assertSame( '/wp/v2/custom_rest_base', $this->get_base_rest_route( 'cpt_custom_rest_base' ) );

		// Post types that aren't registered with the REST API should return an
		// empty string.
		self::assertSame( '', $this->get_base_rest_route( 'cpt_no_rest' ) );

		// Clean up.
		unregister_post_type( 'cpt_rest' );
		unregister_post_type( 'cpt_no_rest' );
		unregister_post_type( 'cpt_private' );
		unregister_post_type( 'cpt_public' );
		unregister_post_type( 'cpt_custom_rest_base' );
	}

	/**
	 * Verifies that get_rest_route() works as expected when the route has been
	 * modified by filters.
	 *
	 * @since 3.20.5
	 *
	 * @covers \Parsely\REST_API\Utils\Endpoint_Post::get_rest_route
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
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\REST_API\Utils\Endpoint_Post::get_endpoint_name
	 * @uses \Parsely\REST_API\Utils\Endpoint_Post::register_routes
	 * @uses \Parsely\REST_API\Utils\Utils_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_get_rest_route_with_filtered_routes(): void {
		// Test `rest_route_for_post_type_items` filter.
		register_post_type( 'cpt_filtered_route', array( 'show_in_rest' => true ) );
		add_filter(
			'rest_route_for_post_type_items',
			$filtered_route_callback = function ( $route, $post_type ) {
				if ( 'cpt_filtered_route' === $post_type->name ) {
					$route = '/wp/v2/filtered_route';
				}

				return $route;
			},
			10,
			2
		);
		self::assertSame( '/wp/v2/filtered_route', $this->get_base_rest_route( 'cpt_filtered_route' ) );

		// Test `rest_route_for_post` filter.
		register_post_type( 'cpt_filtered_route_2', array( 'show_in_rest' => true ) );
		add_filter(
			'rest_route_for_post',
			$filtered_route_2_callback = function ( $route, $post ) {
				if ( '/wp/v2/cpt_filtered_route_2/' . $post->ID === $route ) {
					$route = '/wp/v2/filtered_route_2';
				}

				return $route;
			},
			10,
			2
		);
		self::assertSame( '/wp/v2/filtered_route_2', $this->get_base_rest_route( 'cpt_filtered_route_2' ) );

		// Clean up.
		remove_filter( 'rest_route_for_post_type_items', $filtered_route_callback );
		remove_filter( 'rest_route_for_post', $filtered_route_2_callback );
		unregister_post_type( 'cpt_filtered_route' );
		unregister_post_type( 'cpt_filtered_route_2' );
	}

	/**
	 * Returns the base REST route for the passed post type.
	 *
	 * @since 3.20.5
	 *
	 * @param string $post_type The post type for which to get the base REST route.
	 * @return string The base REST route for the post type.
	 */
	public function get_base_rest_route( string $post_type ): string {
		$post_id = self::factory()->post->create( array( 'post_type' => $post_type ) ); /** @var int $post_id */
		$route   = $this->get_endpoint()->get_full_endpoint( '/' . $post_id . '/rest-route' );

		/** @var string $data */
		// @phpstan-ignore offsetAccess.nonOffsetAccessible
		$data = rest_get_server()->dispatch( new WP_REST_Request( 'GET', $route ) )->get_data()['data'];

		// Return the data without the Post ID.
		return str_replace( "/$post_id", '', $data );
	}
}

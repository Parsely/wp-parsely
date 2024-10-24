<?php
/**
 * Base API Endpoint
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI;

use Parsely\Parsely;
use Parsely\REST_API\Base_API_Controller;
use Parsely\REST_API\Base_Endpoint;
use Parsely\REST_API\REST_API_Controller;
use Parsely\Tests\Integration\TestCase;
use Parsely\Tests\Traits\TestsReflection;
use WP_Error;

/**
 * Integration tests for the Base_Endpoint class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\REST_API\Base_Endpoint
 */
class BaseEndpointTest extends TestCase {
	use TestsReflection;

	/**
	 * The test endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Base_Endpoint
	 */
	private $test_endpoint;

	/**
	 * API controller.
	 *
	 * @since 3.17.0
	 *
	 * @var Base_API_Controller
	 */
	protected $api_controller;

	/**
	 * Parsely instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Parsely
	 */
	protected $parsely;

	/**
	 * Holds a reference to the callback that initializes the endpoint to remove
	 * in tear_down().
	 *
	 * @since 3.17.0
	 *
	 * @var callable $rest_api_init_proxy
	 */
	protected $rest_api_init_proxy;

	/**
	 * Holds a reference to the global $wp_rest_server object to restore in
	 * tear_down().
	 *
	 * @since 3.17.0
	 *
	 * @var \WP_REST_Server $wp_rest_server_global_backup
	 */
	private $wp_rest_server_global_backup;

	/**
	 * Constructor that initializes the Parsely and API controller instances.
	 *
	 * @since 3.17.0
	 *
	 * @param string|null  $name The name of the test.
	 * @param array<mixed> $data The data for the test.
	 * @param string       $data_name The name of the data.
	 */
	public function __construct( $name = null, array $data = array(), $data_name = '' ) {
		// Create Parsely class, if not already created (by an inherited class).
		if ( null === $this->parsely ) {
			$this->parsely = new Parsely();
		}

		// Create API controller, if not already created (by an inherited class).
		if ( null === $this->api_controller ) {
			$this->api_controller = new REST_API_Controller( $this->parsely );
		}

		parent::__construct( $name, $data, $data_name );
	}

	/**
	 * Setup method called before each test.
	 *
	 * @since 3.17.0
	 */
	public function set_up(): void {
		parent::set_up();
		TestCase::set_options();
		$this->set_current_user_to_admin();

		$this->wp_rest_server_global_backup = $GLOBALS['wp_rest_server'] ?? null;

		// Create a concrete class for testing purposes.
		$this->test_endpoint = new class($this->api_controller) extends Base_Endpoint {

			/**
			 * Gets the endpoint name.
			 *
			 * @since 3.17.0
			 *
			 * @return string
			 */
			public static function get_endpoint_name(): string {
				return 'test';
			}

			/**
			 * Registers the test route.
			 *
			 * @since 3.17.0
			 */
			public function register_routes(): void {
				$this->register_rest_route(
					'/test-route',
					array( 'GET' ),
					array( $this, 'get_test_data' )
				);
			}

			/**
			 * Gets test data.
			 *
			 * @since 3.17.0
			 *
			 * @return array<mixed>
			 */
			public function get_test_data(): array {
				return array( 'data' => 'test' );
			}
		};

		$this->initialize_rest_endpoint();
	}

	/**
	 * Tears down the test environment.
	 *
	 * @since 3.17.0
	 */
	public function tear_down(): void {
		remove_action( 'plugins_loaded', $this->rest_api_init_proxy );
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['wp_rest_server'] = $this->wp_rest_server_global_backup;

		parent::tear_down();
	}

	/**
	 * Returns the test endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @return Base_Endpoint
	 */
	public function get_endpoint(): Base_Endpoint {
		return $this->test_endpoint;
	}

	/**
	 * Tests that the route is correctly registered in WordPress.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_Endpoint::init
	 * @covers \Parsely\REST_API\Base_Endpoint::register_routes
	 * @covers \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 */
	public function test_route_is_registered(): void {
		$routes = rest_get_server()->get_routes();

		// Check that the namespace route is registered.
		$expected_namespace = '/' . $this->api_controller->get_full_namespace();
		self::assertArrayHasKey( $expected_namespace, $routes );

		// Check that the test route is registered.
		$expected_route = $this->get_endpoint()->get_full_endpoint( 'test-route' );
		self::assertArrayHasKey( $expected_route, $routes );

		// Check that the route is associated with the correct method.
		$route_data = $routes[ $expected_route ];
		self::assertArrayHasKey( 'GET', $route_data[0]['methods'] );
	}

	/**
	 * Tests that the route is correctly registered in WordPress, depending on the filter.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_Endpoint::init
	 * @covers \Parsely\REST_API\Base_Endpoint::register_routes
	 * @covers \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @covers \Parsely\REST_API\Base_Endpoint::get_registered_routes
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Base_API_Controller::get_route_prefix
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::get_endpoint_name
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\REST_API\Base_Endpoint::get_default_access_capability
	 * @uses \Parsely\REST_API\Content_Helper\Content_Helper_Controller::get_route_prefix
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_endpoint_is_registered_based_on_filter(): void {
		$filter_name = 'wp_parsely_api_' .
						\Parsely\Utils\Utils::convert_endpoint_to_filter_key( $this->get_endpoint()::get_endpoint_name() ) .
						'_endpoint_enabled';

		// Test when the filter allows the endpoint to be enabled.
		add_filter( $filter_name, '__return_true' );
		$this->get_endpoint()->init();
		$routes            = rest_get_server()->get_routes();
		$registered_routes = $this->get_endpoint()->get_registered_routes();

		// Assert that the routes are registered when the filter returns true.
		foreach ( $registered_routes as $route ) {
			self::assertArrayHasKey( $this->get_endpoint()->get_full_endpoint( $route ), $routes );
		}

		// Reset the environment.
		$this->tear_down();

		// Now test when the filter disables the endpoint.
		remove_all_filters( $filter_name );
		add_filter( $filter_name, '__return_false' );
		$this->get_endpoint()->init();
		$routes            = rest_get_server()->get_routes();
		$registered_routes = $this->get_endpoint()->get_registered_routes();

		// Assert that the route is NOT registered when the filter returns false.
		foreach ( $registered_routes as $route ) {
			self::assertArrayNotHasKey( $this->get_endpoint()->get_full_endpoint( $route ), $routes );
		}
	}

	/**
	 * Tests is_available_to_current_user returns WP_Error if API key or secret is not set.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @covers \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_is_available_to_current_user_returns_error_site_id_not_set(): void {
		TestCase::set_options(
			array(
				'apikey'     => '',
				'api_secret' => '',
			)
		);

		$result = $this->get_endpoint()->is_available_to_current_user();

		self::assertInstanceOf( WP_Error::class, $result );
		self::assertEquals( 'parsely_site_id_not_set', $result->get_error_code() );
	}

	/**
	 * Tests is_available_to_current_user returns WP_Error if API key or secret is not set.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @covers \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_is_available_to_current_user_returns_error_api_secret_not_set(): void {
		TestCase::set_options(
			array(
				'apikey'     => 'test-apikey',
				'api_secret' => '',
			)
		);

		$result = $this->get_endpoint()->is_available_to_current_user();

		self::assertInstanceOf( WP_Error::class, $result );
		self::assertEquals( 'parsely_api_secret_not_set', $result->get_error_code() );
	}

	/**
	 * Tests apply_capability_filters method.
	 *
	 * @covers \Parsely\REST_API\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 */
	public function test_apply_capability_filters(): void {
		add_filter(
			'wp_parsely_user_capability_for_all_private_apis',
			function () {
				return 'edit_posts';
			}
		);

		$result = $this->get_endpoint()->apply_capability_filters( 'publish_posts' );
		self::assertEquals( 'edit_posts', $result );
	}

	/**
	 * Tests validate_apikey_and_secret returns true when API key and secret are set.
	 *
	 * @covers \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_validate_site_id_and_secret_returns_true(): void {
		TestCase::set_options(
			array(
				'apikey'     => 'test-apikey',
				'api_secret' => 'test-secret',
			)
		);

		$result = $this->get_endpoint()->validate_site_id_and_secret();

		self::assertTrue( $result );
	}

	/**
	 * Initializes the REST endpoint.
	 *
	 * @since 3.17.0
	 */
	protected function initialize_rest_endpoint(): void {
		// Initialize the endpoint when the plugins are loaded.
		$this->rest_api_init_proxy = function () {
			$this->get_endpoint()->init();
		};
		add_action( 'plugins_loaded', $this->rest_api_init_proxy );

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'plugins_loaded' );
	}
}

<?php
/**
 * Integration tests for the Endpoint_Credentials_Settings class
 *
 * @package Parsely
 * @since   3.25.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\Settings;

use Parsely\Parsely;
use Parsely\REST_API\Settings\Endpoint_Credentials_Settings;
use Parsely\REST_API\Settings\Settings_Controller;
use Parsely\Tests\Integration\TestCase;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

/**
 * Integration tests for the Endpoint_Credentials_Settings class.
 *
 * @since 3.25.0
 *
 * @covers \Parsely\REST_API\Settings\Endpoint_Credentials_Settings
 * @covers \Parsely\Validator::sanitize_site_id
 */
class EndpointCredentialsSettingsTest extends TestCase {
	/**
	 * The endpoint's route.
	 *
	 * @since 3.25.0
	 *
	 * @var string
	 */
	private const ROUTE = '/wp-parsely/v2/settings/credentials';

	/**
	 * The endpoint instance.
	 *
	 * @since 3.25.0
	 *
	 * @var Endpoint_Credentials_Settings
	 */
	private Endpoint_Credentials_Settings $endpoint;

	/**
	 * The URLs of the HTTP requests sent during the test.
	 *
	 * @since 3.25.0
	 *
	 * @var array<string>
	 */
	private array $http_requests = array();

	/**
	 * Sets up the test environment.
	 *
	 * @since 3.25.0
	 */
	public function set_up(): void {
		parent::set_up();

		TestCase::set_options(
			array(
				'apikey'     => '',
				'api_secret' => '',
			)
		);
		$this->set_current_user_to_admin();
		$this->register_endpoint( new Parsely() );

		add_filter( 'pre_http_request', array( $this, 'block_http_request' ), 10, 3 );
	}

	/**
	 * Tears down the test environment.
	 *
	 * @since 3.25.0
	 */
	public function tear_down(): void {
		// Otherwise the route carries over into later tests.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['wp_rest_server'] = null;

		parent::tear_down();
	}

	/**
	 * Verifies that the route is registered for POST and PUT requests.
	 *
	 * @since 3.25.0
	 */
	public function test_route_is_registered(): void {
		$routes = rest_get_server()->get_routes();

		self::assertSame( self::ROUTE, $this->endpoint->get_full_endpoint() );
		self::assertArrayHasKey( self::ROUTE, $routes );
		self::assertArrayHasKey( 'POST', $routes[ self::ROUTE ][0]['methods'] );
		self::assertArrayHasKey( 'PUT', $routes[ self::ROUTE ][0]['methods'] );
	}

	/**
	 * Verifies that the Settings API controller registers the endpoint.
	 *
	 * @since 3.25.0
	 *
	 * @covers \Parsely\REST_API\Settings\Settings_Controller::init
	 */
	public function test_settings_controller_registers_the_endpoint(): void {
		$controller = new Settings_Controller( new Parsely() );
		$controller->init();

		self::assertArrayHasKey( 'settings/credentials', $controller->get_endpoints() );
		self::assertInstanceOf(
			Endpoint_Credentials_Settings::class,
			$controller->get_endpoints()['settings/credentials']
		);
	}

	/**
	 * Verifies that the Site ID is set when none is stored, leaving the rest
	 * of the options untouched, a stored API Secret included.
	 *
	 * @since 3.25.0
	 *
	 * @dataProvider provide_methods
	 *
	 * @param string $method The HTTP method.
	 */
	public function test_sets_site_id_when_none_is_stored( string $method ): void {
		TestCase::set_options(
			array(
				'apikey'     => '',
				'api_secret' => 'stored-api-secret',
			)
		);
		$expected           = $this->get_stored_options();
		$expected['apikey'] = 'example.com';

		$response = $this->send_request( array( 'site_id' => 'example.com' ), $method );

		self::assertSame( 200, $response->get_status() );
		self::assertSame( array( 'site_id' => 'example.com' ), $response->get_data() );
		self::assertSame( $expected, $this->get_stored_options() );
		self::assertSame( array(), $this->http_requests );
	}

	/**
	 * Provides the HTTP methods the endpoint accepts.
	 *
	 * @since 3.25.0
	 *
	 * @return iterable<string, array{0: string}>
	 */
	public static function provide_methods(): iterable {
		yield 'POST' => array( 'POST' );
		yield 'PUT' => array( 'PUT' );
	}

	/**
	 * Verifies that the Site ID is set on a fresh install, storing the options
	 * the settings page would store.
	 *
	 * @since 3.25.0
	 */
	public function test_sets_site_id_when_no_options_are_stored(): void {
		delete_option( Parsely::OPTIONS_KEY );
		$parsely = new Parsely();
		$this->register_endpoint( $parsely );

		$expected           = $parsely->get_options();
		$expected['apikey'] = 'example.com';

		$response = $this->send_request( array( 'site_id' => 'example.com' ) );

		self::assertSame( 200, $response->get_status() );
		self::assertSame( array( 'site_id' => 'example.com' ), $response->get_data() );
		self::assertSame( $expected, $this->get_stored_options() );
		self::assertSame( array(), $this->http_requests );
	}

	/**
	 * Verifies that the Site ID is sanitized as the settings page does.
	 *
	 * @since 3.25.0
	 */
	public function test_stores_the_sanitized_site_id(): void {
		$response = $this->send_request( array( 'site_id' => '  Example.COM ' ) );

		self::assertSame( 200, $response->get_status() );
		self::assertSame( array( 'site_id' => 'example.com' ), $response->get_data() );
		self::assertSame( 'example.com', $this->get_stored_options()['apikey'] );
	}

	/**
	 * Verifies that setting the Site ID that is already stored succeeds
	 * without writing, so that requests can be retried.
	 *
	 * @since 3.25.0
	 */
	public function test_succeeds_when_the_same_site_id_is_stored(): void {
		TestCase::set_options(
			array(
				'apikey'     => 'example.com',
				'api_secret' => 'stored-api-secret',
			)
		);
		$expected = $this->get_stored_options();
		$writes   = $this->count_option_writes();

		$response = $this->send_request( array( 'site_id' => 'example.com' ) );

		self::assertSame( 200, $response->get_status() );
		self::assertSame( array( 'site_id' => 'example.com' ), $response->get_data() );
		self::assertSame( $expected, $this->get_stored_options() );
		self::assertSame( $writes, $this->count_option_writes() );
		self::assertSame( array(), $this->http_requests );
	}

	/**
	 * Verifies that a Site ID stored as it was typed, as earlier versions of
	 * the settings page stored it, counts as the same once sanitized.
	 *
	 * @since 3.25.0
	 */
	public function test_succeeds_when_the_same_site_id_is_stored_unsanitized(): void {
		TestCase::set_options( array( 'apikey' => '  Example.COM ' ) );
		$expected = $this->get_stored_options();
		$writes   = $this->count_option_writes();

		$response = $this->send_request( array( 'site_id' => 'example.com' ) );

		self::assertSame( 200, $response->get_status() );
		self::assertSame( array( 'site_id' => '  Example.COM ' ), $response->get_data() );
		self::assertSame( $expected, $this->get_stored_options() );
		self::assertSame( $writes, $this->count_option_writes() );
	}

	/**
	 * Verifies that a different Site ID than the one stored is refused.
	 *
	 * @since 3.25.0
	 */
	public function test_refuses_a_different_site_id_than_the_one_stored(): void {
		TestCase::set_options( array( 'apikey' => 'stored.example.com' ) );

		$this->assert_refused(
			array( 'site_id' => 'example.com' ),
			409,
			'parsely_site_id_conflict'
		);
	}

	/**
	 * Verifies that the Site ID is not set when the credentials are managed
	 * through the `wp_parsely_credentials` filter.
	 *
	 * @since 3.25.0
	 */
	public function test_refuses_when_credentials_are_managed(): void {
		add_filter(
			'wp_parsely_credentials',
			static function () {
				return array(
					'is_managed' => true,
					'site_id'    => 'managed.example.com',
				);
			}
		);
		// Whether credentials are managed is determined on instantiation.
		$this->register_endpoint( new Parsely() );

		$this->assert_refused(
			array( 'site_id' => 'example.com' ),
			409,
			'parsely_credentials_managed'
		);
	}

	/**
	 * Verifies that a write that doesn't stick is reported, for the caller to
	 * retry.
	 *
	 * @since 3.25.0
	 */
	public function test_reports_a_site_id_that_was_not_saved(): void {
		add_filter(
			'pre_update_option_' . Parsely::OPTIONS_KEY,
			static function ( $value, $old_value ) {
				return $old_value;
			},
			10,
			2
		);

		$this->assert_refused(
			array( 'site_id' => 'example.com' ),
			500,
			'parsely_site_id_not_saved'
		);
	}

	/**
	 * Verifies that a missing or invalid Site ID is refused.
	 *
	 * @since 3.25.0
	 *
	 * @dataProvider provide_invalid_bodies
	 *
	 * @param array<string, mixed> $body The request body.
	 */
	public function test_refuses_an_invalid_site_id( array $body ): void {
		$this->assert_refused( $body, 400, 'parsely_invalid_site_id' );
	}

	/**
	 * Provides request bodies without a valid Site ID.
	 *
	 * @since 3.25.0
	 *
	 * @return iterable<string, array{0: array<string, mixed>}>
	 */
	public static function provide_invalid_bodies(): iterable {
		yield 'missing' => array( array() );
		yield 'null' => array( array( 'site_id' => null ) );
		yield 'empty' => array( array( 'site_id' => '' ) );
		yield 'whitespace' => array( array( 'site_id' => '   ' ) );
		yield 'empty once sanitized' => array( array( 'site_id' => '<b></b>' ) );
		yield 'number' => array( array( 'site_id' => 123 ) );
		yield 'boolean' => array( array( 'site_id' => true ) );
		yield 'array' => array( array( 'site_id' => array( 'example.com' ) ) );
	}

	/**
	 * Verifies that users who can't manage options are refused, even though
	 * the endpoint doesn't require a Site ID.
	 *
	 * @since 3.25.0
	 */
	public function test_refuses_users_without_manage_options(): void {
		self::set_current_user_to( 'test_editor', 'editor' );

		$this->assert_refused(
			array( 'site_id' => 'example.com' ),
			403,
			'rest_forbidden'
		);
	}

	/**
	 * Verifies that the endpoint is available to administrators before any
	 * credentials are set.
	 *
	 * @since 3.25.0
	 */
	public function test_is_available_without_credentials(): void {
		self::assertTrue( $this->endpoint->is_available_to_current_user() );
	}

	/**
	 * Records and blocks an outgoing HTTP request.
	 *
	 * @since 3.25.0
	 *
	 * @param false|array<mixed>|WP_Error $response    The preempted response.
	 * @param array<mixed>                $parsed_args The request arguments.
	 * @param string                      $url         The request URL.
	 * @return WP_Error
	 */
	public function block_http_request( $response, array $parsed_args, string $url ): WP_Error {
		$this->http_requests[] = $url;

		return new WP_Error( 'http_request_blocked', 'HTTP requests are blocked in this test.' );
	}

	/**
	 * Asserts that the request is refused with the passed status and code, and
	 * that the stored options are left untouched.
	 *
	 * @since 3.25.0
	 *
	 * @param array<string, mixed> $body   The request body.
	 * @param int                  $status The expected HTTP status.
	 * @param string               $code   The expected error code.
	 */
	private function assert_refused( array $body, int $status, string $code ): void {
		$expected = $this->get_stored_options();
		$writes   = $this->count_option_writes();

		$response = $this->send_request( $body );

		/** @var array<string, mixed> $data */
		$data = $response->get_data();
		self::assertSame( $status, $response->get_status() );
		self::assertSame( $code, $data['code'] );
		self::assertSame( $expected, $this->get_stored_options() );
		self::assertSame( $writes, $this->count_option_writes() );
	}

	/**
	 * Returns how many times the plugin's options have been written.
	 *
	 * @since 3.25.0
	 *
	 * @return int The number of writes.
	 */
	private function count_option_writes(): int {
		return did_action( 'add_option_' . Parsely::OPTIONS_KEY ) +
			did_action( 'update_option_' . Parsely::OPTIONS_KEY );
	}

	/**
	 * Returns the plugin's options as stored in the database.
	 *
	 * @since 3.25.0
	 *
	 * @return array<string, mixed> The stored options, or an empty array.
	 */
	private function get_stored_options(): array {
		$options = get_option( Parsely::OPTIONS_KEY );

		return is_array( $options ) ? $options : array();
	}

	/**
	 * Sends a request to the endpoint, with the passed body as JSON.
	 *
	 * @since 3.25.0
	 *
	 * @param array<string, mixed> $body   The request body.
	 * @param string               $method The HTTP method.
	 * @return WP_REST_Response The response.
	 */
	private function send_request( array $body, string $method = 'POST' ): WP_REST_Response {
		$request = new WP_REST_Request( $method, self::ROUTE );
		$request->set_header( 'Content-Type', 'application/json' );
		$request->set_body( $this->wp_json_encode( $body ) );

		return rest_do_request( $request );
	}

	/**
	 * Registers the endpoint's route for the passed Parsely instance, replacing
	 * any previously registered one.
	 *
	 * @since 3.25.0
	 *
	 * @param Parsely $parsely The Parsely instance.
	 */
	private function register_endpoint( Parsely $parsely ): void {
		if ( isset( $this->endpoint ) ) {
			remove_action( 'rest_api_init', array( $this->endpoint, 'register_routes' ) );
		}

		$this->endpoint = new Endpoint_Credentials_Settings( new Settings_Controller( $parsely ) );
		$this->endpoint->init();

		// Recreate the server, which registers the routes.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['wp_rest_server'] = null;
		rest_get_server();
	}
}

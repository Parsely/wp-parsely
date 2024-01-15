<?php
/**
 * Integration Tests: PCH Dashboard Widget Settings Endpoint
 *
 * @package Parsely\Tests
 * @since   3.13.0
 */

declare(strict_types=1);

namespace Parsely\Tests\ContentHelper;

use Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta;
use Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint;
use Parsely\Parsely;
use Parsely\Tests\Integration\ProxyEndpointTest;
use WP_REST_Request;

use function Parsely\Utils\convert_endpoint_to_filter_key;

/**
 * Integration Tests for the PCH Dashboard Widget Settings Endpoint.
 *
 * @since 3.13.0
 */
final class DashboardWidgetSettingsEndpointTest extends ProxyEndpointTest {
	/**
	 * Initializes all required values for the test.
	 *
	 * @since 3.13.0
	 */
	public static function initialize(): void {
		$route = Dashboard_Widget_Settings_Endpoint::get_route();

		self::$route      = '/wp-parsely/v1' . $route;
		self::$filter_key = convert_endpoint_to_filter_key( $route );
	}

	/**
	 * Returns the endpoint to be used in tests.
	 *
	 * @since 3.13.0
	 *
	 * @return Base_Endpoint_User_Meta The endpoint to be used in tests.
	 */
	public function get_endpoint(): Base_Endpoint_User_Meta {
		return new Dashboard_Widget_Settings_Endpoint( new Parsely() );
	}

	/**
	 * Verifies that the route is registered.
	 *
	 * @since 3.13.0
	 *
	 * @covers \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::get_route
	 * @covers \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::run
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_Endpoint::is_user_allowed_to_make_api_call
	 * @uses \Parsely\Endpoints\Base_Endpoint::permission_callback
	 * @uses \Parsely\Endpoints\Base_Endpoint::register_endpoint
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::__construct
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::get_subvalues_specs
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_subvalues_specs
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Utils\convert_endpoint_to_filter_key
	 */
	public function test_register_routes_by_default(): void {
		parent::run_test_register_routes_by_default(
			array(
				'GET' => true,
				'PUT' => true,
			)
		);
	}

	/**
	 * Verifies that the route is not registered when the endpoint filter is set
	 * to false.
	 *
	 * @since 3.13.0
	 *
	 * @covers \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::run
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_Endpoint::register_endpoint
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::__construct
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::get_route
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::get_subvalues_specs
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_subvalues_specs
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Utils\convert_endpoint_to_filter_key
	 */
	public function test_verify_that_route_is_not_registered_when_proxy_is_disabled(): void {
		parent::run_test_do_not_register_route_when_proxy_is_disabled();
	}

	/**
	 * Verifies default user capability filter.
	 *
	 * @since 3.13.0
	 *
	 * @covers \Parsely\Endpoints\Base_Endpoint::permission_callback
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_Endpoint::is_user_allowed_to_make_api_call
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::__construct
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::get_subvalues_specs
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_subvalues_specs
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Utils\convert_endpoint_to_filter_key
	 */
	public function test_user_is_allowed_to_make_proxy_api_call_if_default_user_capability_is_changed(): void {
		parent::run_test_user_is_allowed_to_make_proxy_api_call_if_default_user_capability_is_changed();
	}

	/**
	 * Verifies endpoint specific user capability filter.
	 *
	 * @since 3.13.0
	 *
	 * @covers \Parsely\Endpoints\Base_Endpoint::permission_callback
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_Endpoint::is_user_allowed_to_make_api_call
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::__construct
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::get_subvalues_specs
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_subvalues_specs
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Utils\convert_endpoint_to_filter_key
	 */
	public function test_user_is_allowed_to_make_proxy_api_call_if_endpoint_specific_user_capability_is_changed(): void {
		parent::run_test_user_is_allowed_to_make_proxy_api_call_if_endpoint_specific_user_capability_is_changed();
	}

	/**
	 * Verifies that the endpoint returns the correct default settings.
	 *
	 * @since 3.13.0
	 *
	 * @covers \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::__construct
	 * @covers \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::get_subvalues_specs
	 * @covers \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::get_value
	 * @covers \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_subvalues_specs
	 * @covers \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::process_request
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_Endpoint::is_user_allowed_to_make_api_call
	 * @uses \Parsely\Endpoints\Base_Endpoint::permission_callback
	 * @uses \Parsely\Endpoints\Base_Endpoint::register_endpoint
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::run
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_meta_key
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_route
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Utils\convert_endpoint_to_filter_key
	 */
	public function test_endpoint_returns_settings_on_get_request(): void {
		$this->set_admin_user();
		$settings = rest_do_request(
			new WP_REST_Request(
				'GET',
				self::$route
			)
		)->get_data();
		$expected = $this->wp_json_encode(
			array(
				'Metric' => 'views',
				'Period' => '7d',
			)
		);

		self::assertSame( $expected, $settings );
	}

	/**
	 * Verifies that the endpoint can correctly handle PUT requests.
	 *
	 * @since 3.13.0
	 *
	 * @param string $test_data The data to send in the PUT request.
	 * @param string $expected The expected value of the setting after the PUT request.
	 *
	 * @covers \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::get_subvalues_specs
	 * @covers \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::get_value
	 * @covers \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::sanitize_subvalue
	 * @covers \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::sanitize_value
	 * @covers \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::set_value
	 * @covers \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_subvalues_specs
	 * @covers \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::process_request
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_Endpoint::is_user_allowed_to_make_api_call
	 * @uses \Parsely\Endpoints\Base_Endpoint::permission_callback
	 * @uses \Parsely\Endpoints\Base_Endpoint::register_endpoint
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::__construct
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::run
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_meta_key
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_route
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Utils\convert_endpoint_to_filter_key
	 *
	 * @dataProvider provide_put_requests_data
	 */
	public function test_endpoint_correctly_handles_put_requests(
		string $test_data,
		string $expected
	): void {
		$settings = $this->send_put_request( $test_data );
		self::assertSame( $expected, $settings );
	}

	/**
	 * Provides data for testing PUT requests.
	 *
	 * @since 3.13.0
	 *
	 * @return iterable<string, mixed>
	 */
	public function provide_put_requests_data(): iterable {
		$default_settings = $this->generate_json( 'views', '7d' );
		$valid_settings   = $this->generate_json( 'avg_engaged', '1h' );

		// Valid non-default settings. They should be returned unmodified.
		yield 'valid period and metric values' => array(
			'test_data' => $valid_settings,
			'expected'  => $valid_settings,
		);

		// Missing or problematic keys. Defaults for all values should be returned.
		yield 'valid period value, no metric value' => array(
			'test_data' => $this->generate_json( null, '1h' ),
			'expected'  => $default_settings,
		);
		yield 'valid metric value, no period value' => array(
			'test_data' => $this->generate_json( 'avg_engaged' ),
			'expected'  => $default_settings,
		);
		yield 'no values' => array(
			'test_data' => $this->generate_json(),
			'expected'  => $default_settings,
		);

		// Invalid values. They should be adjusted to their defaults.
		yield 'invalid period value' => array(
			'test_data' => $this->generate_json( 'avg_engaged', 'invalid' ),
			'expected'  => $this->generate_json( 'avg_engaged', '7d' ),
		);
		yield 'invalid metric value' => array(
			'test_data' => $this->generate_json( 'invalid', '1h' ),
			'expected'  => $this->generate_json( 'views', '1h' ),
		);
		yield 'invalid period and metric values' => array(
			'test_data' => $this->generate_json( 'invalid', 'invalid' ),
			'expected'  => $default_settings,
		);

		// Invalid extra data passed. Any such data should be discarded.
		yield 'invalid additional value' => array(
			'test_data' => $this->generate_json(
				'avg_engaged',
				'1h',
				array( 'invalid' )
			),
			'expected'  => $valid_settings,
		);
		yield 'invalid additional key/value pair' => array(
			'test_data' => $this->generate_json(
				'avg_engaged',
				'1h',
				array( 'invalid_key' => 'invalid_value' )
			),
			'expected'  => $valid_settings,
		);
	}

	/**
	 * Generates a JSON string for the passed period, metric, and extra data.
	 *
	 * @since 3.13.0
	 *
	 * @param string|null         $metric The Metric value.
	 * @param string|null         $period The Period value.
	 * @param array<mixed, mixed> $extra_data Any Extra key/value pairs to add.
	 * @return string The generated JSON string.
	 */
	protected function generate_json(
		?string $metric = null,
		?string $period = null,
		array $extra_data = array()
	): string {
		$array = array();

		if ( null !== $metric ) {
			$array['Metric'] = $metric;
		}

		if ( null !== $period ) {
			$array['Period'] = $period;
		}

		return $this->wp_json_encode( array_merge( $array, $extra_data ) );
	}

	/**
	 * Sends a PUT request to the endpoint.
	 *
	 * @since 3.13.0
	 *
	 * @param string $data The data to be sent in the request.
	 * @return string The response returned by the endpoint.
	 */
	protected function send_put_request( string $data ): string {
		$this->set_admin_user();
		$result = $this->send_wp_rest_request( 'PUT', self::$route, $data );

		if ( ! is_string( $result ) ) {
			return '';
		}

		return $result;
	}
}

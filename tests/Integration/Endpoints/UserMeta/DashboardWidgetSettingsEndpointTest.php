<?php
/**
 * Integration Tests: PCH Dashboard Widget Settings Endpoint
 *
 * @package Parsely\Tests
 * @since   3.13.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Endpoints\UserMeta;

use Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta;
use Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint;
use Parsely\Parsely;
use Parsely\Utils\Utils;

/**
 * Integration Tests for the PCH Dashboard Widget Settings Endpoint.
 *
 * @since 3.13.0
 */
final class DashboardWidgetSettingsEndpointTest extends BaseUserMetaEndpointTest {
	/**
	 * The endpoint's default value.
	 *
	 * @since 3.13.0
	 *
	 * @var array<string, mixed>
	 */
	protected $default_value = array(
		'Metric' => 'views',
		'Period' => '7d',
	);

	/**
	 * Initializes all required values for the test.
	 *
	 * @since 3.13.0
	 */
	public static function initialize(): void {
		$route = Dashboard_Widget_Settings_Endpoint::get_route();

		self::$route      = '/wp-parsely/v1' . $route;
		self::$filter_key = Utils::convert_endpoint_to_filter_key( $route );
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
	 * @uses \Parsely\Endpoints\Base_Endpoint::register_endpoint
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::__construct
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::get_subvalues_specs
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::is_available_to_current_user
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_subvalues_specs
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
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
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_verify_that_route_is_not_registered_when_endpoint_is_disabled(): void {
		parent::run_test_do_not_register_route_when_proxy_is_disabled();
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
	 * @uses \Parsely\Endpoints\Base_Endpoint::register_endpoint
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::is_available_to_current_user
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::run
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_meta_key
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_route
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_endpoint_returns_value_on_get_request(): void {
		parent::run_test_endpoint_returns_value_on_get_request();
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
	 * @uses \Parsely\Endpoints\Base_Endpoint::register_endpoint
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::__construct
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::is_available_to_current_user
	 * @uses \Parsely\Endpoints\User_Meta\Base_Endpoint_User_Meta::run
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_meta_key
	 * @uses \Parsely\Endpoints\User_Meta\Dashboard_Widget_Settings_Endpoint::get_route
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 *
	 * @dataProvider provide_put_requests_data
	 */
	public function test_endpoint_correctly_handles_put_requests(
		string $test_data,
		string $expected
	): void {
		$value = $this->send_put_request( $test_data );
		self::assertSame( $expected, $value );
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
		$array = $this->default_value;
		unset( $array['Metric'], $array['Period'] );

		if ( null !== $metric ) {
			$array['Metric'] = $metric;
		}

		if ( null !== $period ) {
			$array['Period'] = $period;
		}

		ksort( $array );

		return $this->wp_json_encode( array_merge( $array, $extra_data ) );
	}
}

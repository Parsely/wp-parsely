<?php
/**
 * Integration tests for the Endpoint_Dashboard_Widget_Settings class
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\Settings;

use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings;

/**
 * Integration tests for the Endpoint_Dashboard_Widget_Settings class.
 *
 * @since 3.17.0
 */
class EndpointDashboardWidgetSettingsTest extends BaseSettingsEndpointTest {
	/**
	 * The endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Endpoint_Dashboard_Widget_Settings
	 */
	private $endpoint;

	/**
	 * Setup method called before each test.
	 *
	 * @since 3.17.0
	 */
	public function set_up(): void {
		// Initialize the specific endpoint for this test class.
		$this->api_controller = new Content_Helper_Controller( $this->parsely );
		$this->endpoint       = new Endpoint_Dashboard_Widget_Settings( $this->api_controller );

		parent::set_up();
	}

	/**
	 * Returns the endpoint to be used in tests.
	 *
	 * @since 3.17.0
	 *
	 * @return \Parsely\REST_API\Base_Endpoint
	 */
	public function get_endpoint(): \Parsely\REST_API\Base_Endpoint {
		return $this->endpoint;
	}

	/**
	 * Returns the default value for the endpoint.
	 *
	 * @since 3.17.0
	 *
	 * @return array<string, mixed> The default value for the endpoint.
	 */
	public function get_default_value(): array {
		return array(
			'Metric' => 'views',
			'Period' => '7d',
		);
	}

	/**
	 * Generates a JSON array for the passed period, metric, and extra data.
	 *
	 * @since 3.13.0
	 * @since 3.17.0 Moved from old test class.
	 *
	 * @param string|null         $metric The Metric value.
	 * @param string|null         $period The Period value.
	 * @param array<mixed, mixed> $extra_data Any Extra key/value pairs to add.
	 * @return array<mixed> The generated JSON array.
	 */
	protected function generate_json(
		?string $metric = null,
		?string $period = null,
		array $extra_data = array()
	): array {
		$array = $this->get_default_value();
		unset( $array['Metric'], $array['Period'] );

		if ( null !== $metric ) {
			$array['Metric'] = $metric;
		}

		if ( null !== $period ) {
			$array['Period'] = $period;
		}

		ksort( $array );

		return array_merge( $array, $extra_data );
	}

	/**
	 * Verifies that the route is registered.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::register_routes
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Content_Helper\Content_Helper_Controller::get_route_prefix
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::__construct
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::init
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::get_subvalues_specs
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_route_is_registered(): void {
		parent::run_test_route_is_registered();
	}

	/**
	 * Verifies that the endpoint returns the correct default settings.
	 *
	 * @since 3.13.0
	 * @since 3.17.0 Moved from old test class.
	 *
	 * @covers \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::process_request
	 * @covers \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::get_settings
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Content_Helper\Content_Helper_Controller::get_route_prefix
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::__construct
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::init
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::register_routes
	 * @uses \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::get_meta_key
	 * @uses \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::get_subvalues_specs
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_endpoint_returns_value_on_get_request(): void {
		parent::run_test_endpoint_returns_value_on_get_request();
	}

	/**
	 * Verifies that the endpoint can correctly handle PUT requests.
	 *
	 * @since 3.13.0
	 * @since 3.17.0 Moved from old test class.
	 *
	 * @param array<mixed> $test_data The data to send in the PUT request.
	 * @param array<mixed> $expected The expected value of the setting after the PUT request.
	 *
	 * @covers \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::get_subvalues_specs
	 * @covers \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::sanitize_subvalue
	 * @covers \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::sanitize_value
	 * @covers \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::set_settings
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\Content_Helper\Content_Helper_Controller::get_route_prefix
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::__construct
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_valid_values
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::init
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::register_routes
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_default
	 * @uses \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings::get_meta_key
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @dataProvider provide_put_requests_data
	 */
	public function test_endpoint_correctly_handles_put_requests(
		array $test_data,
		array $expected
	): void {
		$value = $this->send_put_request( $test_data );
		self::assertSame( $expected, $value );
	}
}

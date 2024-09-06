<?php
/**
 * Integration tests for the Endpoint_Editor_Sidebar_Settings class
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\Settings;

use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings;

/**
 * Integration tests for the Endpoint_Editor_Sidebar_Settings class.
 *
 * @since 3.17.0
 */
class EndpointEditorSidebarSettingsTest extends BaseSettingsEndpointTest {
	/**
	 * The endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Endpoint_Editor_Sidebar_Settings
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
		$this->endpoint       = new Endpoint_Editor_Sidebar_Settings( $this->api_controller );

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
			'InitialTabName'   => 'tools',
			'PerformanceStats' => array(
				'Period'            => '7d',
				'VisibleDataPoints' => array( 'views', 'visitors', 'avgEngaged', 'recirculation' ),
				'VisiblePanels'     => array( 'overview', 'categories', 'referrers' ),
			),
			'RelatedPosts'     => array(
				'FilterBy'    => 'unavailable',
				'FilterValue' => '',
				'Metric'      => 'views',
				'Open'        => false,
				'Period'      => '7d',
			),
			'SmartLinking'     => array(
				'MaxLinks'     => 10,
				'MaxLinkWords' => 4,
				'Open'         => false,
			),
			'TitleSuggestions' => array(
				'Open'    => false,
				'Persona' => 'journalist',
				'Tone'    => 'neutral',
			),
		);
	}

	/**
	 * Verifies that the route is registered.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::register_routes
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
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_subvalues_specs
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
	 * @covers \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::process_request
	 * @covers \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_settings
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
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_meta_key
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_subvalues_specs
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_endpoint_returns_value_on_get_request(): void {
		parent::run_test_endpoint_returns_value_on_get_request();
	}

	/**
	 * Verifies that the endpoint can correctly handle PUT requests.
	 *
	 * @param array<mixed> $test_data The data to send in the PUT request.
	 * @param array<mixed> $expected The expected value of the setting after the PUT request.
	 *
	 * @since 3.13.0
	 * @since 3.17.0 Moved from old test class.
	 *
	 * @covers \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_subvalues_specs
	 * @covers \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::sanitize_subvalue
	 * @covers \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::sanitize_value
	 * @covers \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::set_settings
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
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_nested_specs
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_valid_values
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::init
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::register_routes
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_default
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_meta_key
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @dataProvider provide_put_requests_data*
	 */
	public function test_endpoint_correctly_handles_put_requests(
		array $test_data,
		array $expected
	): void {
		$value = $this->send_put_request( $test_data );
		self::assertSame( $expected, $value );
	}

	/**
	 * Tests that the endpoint can correctly handle PUT requests with valid
	 * nested PerformanceStats values.
	 *
	 * @since 3.14.0
	 * @since 3.17.0 Moved from old test class.
	 *
	 * @covers \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::sanitize_subvalue
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
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_nested_specs
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_valid_values
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::init
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::register_routes
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::sanitize_value
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::set_settings
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_meta_key
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_subvalues_specs
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_valid_nested_performance_stats_settings_period(): void {
		$this->set_current_user_to_admin();

		$value = $this->send_put_request(
			$this->generate_json(
				'views',
				'7d',
				array(
					'PerformanceStats' => array(
						'Period'            => '1h',
						'VisibleDataPoints' => array( 'views', 'avgEngaged', 'recirculation' ),
						'VisiblePanels'     => array( 'overview', 'referrers' ),
					),
				)
			)
		);

		$expected = array_merge(
			$this->get_default_value(),
			array(
				'PerformanceStats' => array(
					'Period'            => '1h',
					'VisibleDataPoints' => array( 'views', 'avgEngaged', 'recirculation' ),
					'VisiblePanels'     => array( 'overview', 'referrers' ),
				),
			)
		);

		self::assertSame( $expected, $value );
	}

	/**
	 * Generates a JSON array for the passed period, metric, and extra data.
	 *
	 * @since 3.13.0
	 * @since 3.17.0 Moved from old test class.
	 *
	 * @param string|null         $metric The RelatedPostsMetric value.
	 * @param string|null         $period The RelatedPostsPeriod value.
	 * @param array<mixed, mixed> $extra_data Any Extra key/value pairs to add.
	 * @return array<mixed> The generated JSON array.
	 */
	protected function generate_json(
		?string $metric = null,
		?string $period = null,
		array $extra_data = array()
	): array {
		$array = $this->get_default_value();
		assert( is_array( $array['RelatedPosts'] ) );

		unset( $array['RelatedPosts']['Metric'], $array['RelatedPosts']['Period'] );

		if ( null !== $metric ) {
			$array['RelatedPosts']['Metric'] = $metric;
		}

		if ( null !== $period ) {
			$array['RelatedPosts']['Period'] = $period;
		}

		$merged_array = array_merge( $array, $extra_data );

		$this->ksortRecursive( $merged_array, SORT_NATURAL | SORT_FLAG_CASE );

		return $merged_array;
	}

	/**
	 * Recursively sorts an array by key using a specified sort flag.
	 *
	 * @since 3.14.3
	 * @since 3.17.0 Moved from old test class.
	 *
	 * @param array<mixed, mixed|array> &$unsorted_array The array to be sorted, passed by reference.
	 * @param int                       $sort_flags Optional sorting flags. Defaults to SORT_REGULAR.
	 */
	private function ksortRecursive( array &$unsorted_array, int $sort_flags = SORT_REGULAR ): void {
		ksort( $unsorted_array, $sort_flags );
		foreach ( $unsorted_array as &$value ) {
			if ( is_array( $value ) ) {
				$this->ksortRecursive( $value, $sort_flags );
			}
		}
	}
}

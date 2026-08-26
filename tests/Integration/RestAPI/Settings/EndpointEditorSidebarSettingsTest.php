<?php
/**
 * Integration tests for the Endpoint_Editor_Sidebar_Settings class
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\Settings;

use Parsely\Content_Helper\Suggestion_Defaults;
use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings;
use WP_REST_Request;
use WP_REST_Response;

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
	 * Teardown method called after each test.
	 *
	 * @since 3.24.0
	 */
	public function tear_down(): void {
		// Tests here configure the site's defaults. The next test's endpoint
		// snapshots them in its constructor, before its own set_up runs.
		self::set_options();

		parent::tear_down();
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
		// Note: Array keys should be sorted alphabetically.
		return array(
			'ExcerptSuggestions' => array(
				'Length'  => 160,
				'Persona' => 'journalist',
				'Tone'    => 'neutral',
			),
			'InitialTabName'     => 'tools',
			'PerformanceStats'   => array(
				'Period'            => '7d',
				'VisibleDataPoints' => array( 'views', 'visitors', 'avgEngaged', 'recirculation' ),
				'VisiblePanels'     => array( 'overview', 'categories', 'referrers' ),
			),
			'RelatedPosts'       => array(
				'Metric' => 'views',
				'Open'   => false,
				'Period' => '7d',
			),
			'SmartLinking'       => array(
				'MaxLinks'     => 10,
				'MaxLinkWords' => 4,
				'Open'         => false,
			),
			'TitleSuggestions'   => array(
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
	 * Verifies that out-of-range or non-integer excerpt lengths are replaced
	 * with the default value.
	 *
	 * @since 3.24.0
	 *
	 * @param mixed $length   The Length value to send in the PUT request.
	 * @param int   $expected The expected stored Length value.
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
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_default
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
	 * @dataProvider provide_excerpt_length_data
	 */
	public function test_excerpt_length_is_validated( $length, int $expected ): void {
		$data = $this->get_default_value();
		assert( is_array( $data['ExcerptSuggestions'] ) );
		$data['ExcerptSuggestions']['Length'] = $length;

		$value = $this->send_put_request( $data );
		assert( is_array( $value['ExcerptSuggestions'] ) );

		self::assertSame( $expected, $value['ExcerptSuggestions']['Length'] );
	}

	/**
	 * Verifies that the ExcerptSuggestions defaults come from the site-wide
	 * settings of the Excerpt Suggestions feature.
	 *
	 * @since 3.24.0
	 *
	 * @covers \Parsely\Content_Helper\Suggestion_Defaults::get_default_length
	 * @covers \Parsely\Content_Helper\Suggestion_Defaults::get_default_persona
	 * @covers \Parsely\Content_Helper\Suggestion_Defaults::get_default_tone
	 * @covers \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_subvalues_specs
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::init
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::register_routes
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_meta_key
	 * @dataProvider provide_site_default_data
	 *
	 * @param array<string, mixed> $feature_options The feature's stored options.
	 * @param array<string, mixed> $expected        The expected defaults.
	 */
	public function test_excerpt_defaults_come_from_site_settings(
		array $feature_options,
		array $expected
	): void {
		// Only the feature under test is stored. Parsely::get_options() fills
		// in the remaining Content Intelligence features from its defaults.
		$options                   = self::DEFAULT_OPTIONS;
		$options['content_helper'] = array( 'excerpt_suggestions' => $feature_options );
		update_option( \Parsely\Parsely::OPTIONS_KEY, $options );

		$this->set_current_user_to_admin();
		delete_user_meta(
			get_current_user_id(),
			'parsely_content_helper_settings_editor_sidebar'
		);

		// The base endpoint snapshots the specs, and therefore the defaults,
		// in its constructor. Build the endpoint after the options are stored,
		// as a real request would.
		$endpoint = new Endpoint_Editor_Sidebar_Settings( $this->api_controller );
		$value    = $endpoint->get_settings()->get_data();

		assert( is_array( $value ) && is_array( $value['ExcerptSuggestions'] ) );
		self::assertSame( $expected, $value['ExcerptSuggestions'] );
	}

	/**
	 * Verifies that a stored value saved before a setting existed is resolved
	 * against the current specifications, rather than returned as it stands.
	 *
	 * Users who saved settings before 3.24.0 have no `Length`, their
	 * `ExcerptSuggestions` still carries the `Open` setting that was removed,
	 * and their tone and persona hold the defaults of the day.
	 *
	 * @since 3.24.0
	 * @since 3.24.1 The stored legacy tone and persona take the site's defaults.
	 *
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_settings
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_stored_settings
	 * @covers \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_inheritable_keys
	 * @covers \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_legacy_defaults
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_length
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_persona
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_tone
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::init
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::register_routes
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_meta_key
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_subvalues_specs
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::sanitize_subvalue
	 */
	public function test_a_pre_3_24_0_stored_value_takes_the_current_defaults(): void {
		$options                   = self::DEFAULT_OPTIONS;
		$options['content_helper'] = array(
			'excerpt_suggestions' => array(
				'default_length'  => 220,
				'default_tone'    => 'analytical',
				'default_persona' => 'techAnalyst',
			),
		);
		update_option( \Parsely\Parsely::OPTIONS_KEY, $options );

		$this->set_current_user_to_admin();
		update_user_meta(
			get_current_user_id(),
			'parsely_content_helper_settings_editor_sidebar',
			array(
				'InitialTabName'     => 'tools',
				'ExcerptSuggestions' => array(
					'Open'    => true,
					'Persona' => 'journalist',
					'Tone'    => 'neutral',
				),
			)
		);

		// init() is what sets the endpoint's current user, so the stored value
		// is read rather than the one belonging to user 0.
		$endpoint = new Endpoint_Editor_Sidebar_Settings( $this->api_controller );
		$endpoint->init();
		$value = $endpoint->get_settings()->get_data();

		assert( is_array( $value ) && is_array( $value['ExcerptSuggestions'] ) );

		// The site's defaults reach the user: the stored tone and persona are
		// the defaults of the day, so they express no choice to preserve.
		self::assertSame( 220, $value['ExcerptSuggestions']['Length'] );
		self::assertSame( 'techAnalyst', $value['ExcerptSuggestions']['Persona'] );
		self::assertSame( 'analytical', $value['ExcerptSuggestions']['Tone'] );

		// The removed setting is dropped.
		self::assertArrayNotHasKey( 'Open', $value['ExcerptSuggestions'] );

		// Settings absent from the stored value are filled in.
		self::assertArrayHasKey( 'SmartLinking', $value );
		self::assertArrayHasKey( 'TitleSuggestions', $value );
	}

	/**
	 * Verifies that invalid stored values are repaired on read.
	 *
	 * The Editor Sidebar bundle relies on this, as it no longer validates the
	 * payload it is given.
	 *
	 * @since 3.24.0
	 *
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_settings
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_length
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_persona
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_tone
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::init
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::register_routes
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_meta_key
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_subvalues_specs
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::sanitize_subvalue
	 */
	public function test_invalid_stored_values_are_repaired_on_read(): void {
		$this->set_current_user_to_admin();
		update_user_meta(
			get_current_user_id(),
			'parsely_content_helper_settings_editor_sidebar',
			array(
				'InitialTabName'     => 'nonexistent',
				'PerformanceStats'   => array(
					'Period'        => '99d',
					'VisiblePanels' => array( 'overview', 'bogus' ),
				),
				'RelatedPosts'       => array(
					'Metric' => 'bogus',
					'Open'   => 'not-a-boolean',
				),
				'ExcerptSuggestions' => array( 'Length' => 99999 ),
			)
		);

		$endpoint = new Endpoint_Editor_Sidebar_Settings( $this->api_controller );
		$endpoint->init();
		$value = $endpoint->get_settings()->get_data();

		assert(
			is_array( $value ) &&
			is_array( $value['PerformanceStats'] ) &&
			is_array( $value['RelatedPosts'] ) &&
			is_array( $value['ExcerptSuggestions'] )
		);

		self::assertSame( 'tools', $value['InitialTabName'] );
		self::assertSame( '7d', $value['PerformanceStats']['Period'] );
		self::assertSame( array( 'overview' ), $value['PerformanceStats']['VisiblePanels'] );
		self::assertSame( 'views', $value['RelatedPosts']['Metric'] );
		self::assertFalse( $value['RelatedPosts']['Open'] );
		self::assertSame(
			Suggestion_Defaults::DEFAULT_LENGTH,
			$value['ExcerptSuggestions']['Length']
		);
	}

	/**
	 * Verifies that a site-wide default keeps reaching a setting that the user
	 * has never set, even after saving other settings.
	 *
	 * The Editor Sidebar sends the whole settings tree on every change, so the
	 * defaults it was served come back as if they had been chosen.
	 *
	 * @since 3.24.1
	 *
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::set_settings
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::strip_inherited_values
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_length
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_persona
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_tone
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_feature_options
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_personas
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_tones
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::init
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::__construct
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_default
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_stored_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_valid_values
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::init
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::merge_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::register_routes
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::sanitize_value
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_inheritable_keys
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_meta_key
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_subvalues_specs
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::sanitize_subvalue
	 */
	public function test_an_unset_setting_keeps_following_the_site_default(): void {
		$this->set_current_user_to_admin();
		$this->set_suggestion_defaults(
			array(
				'default_persona' => 'techAnalyst',
				'default_tone'    => 'analytical',
			),
			array(
				'default_persona' => 'businessAnalyst',
				'default_tone'    => 'serious',
			)
		);

		// Save an unrelated setting, sending the whole tree as the sidebar does.
		$endpoint = $this->get_initialized_endpoint();
		$settings = $this->get_endpoint_settings( $endpoint );

		$settings['InitialTabName'] = 'performance';
		$this->send_endpoint_put_request( $endpoint, $settings );

		// The tab is stored, but the defaults that came along with it are not.
		$stored         = $this->get_stored_settings();
		$stored_excerpt = $stored['ExcerptSuggestions'] ?? array();
		$stored_title   = $stored['TitleSuggestions'] ?? array();
		assert( is_array( $stored_excerpt ) && is_array( $stored_title ) );

		self::assertSame( 'performance', $stored['InitialTabName'] ?? null );
		self::assertArrayNotHasKey( 'Persona', $stored_excerpt );
		self::assertArrayNotHasKey( 'Tone', $stored_excerpt );
		self::assertArrayNotHasKey( 'Persona', $stored_title );
		self::assertArrayNotHasKey( 'Tone', $stored_title );

		$this->set_suggestion_defaults(
			array(
				'default_persona' => 'journalist',
				'default_tone'    => 'humorous',
			),
			array(
				'default_persona' => 'politicalAnalyst',
				'default_tone'    => 'skeptical',
			)
		);
		$value = $this->get_endpoint_settings( $this->get_initialized_endpoint() );

		assert( is_array( $value['ExcerptSuggestions'] ) && is_array( $value['TitleSuggestions'] ) );
		self::assertSame( 'journalist', $value['ExcerptSuggestions']['Persona'] );
		self::assertSame( 'humorous', $value['ExcerptSuggestions']['Tone'] );
		self::assertSame( 'politicalAnalyst', $value['TitleSuggestions']['Persona'] );
		self::assertSame( 'skeptical', $value['TitleSuggestions']['Tone'] );
		self::assertSame( 'performance', $value['InitialTabName'] );
	}

	/**
	 * Verifies that a setting the user has set is not moved by a later change
	 * to the site-wide default, including one that moves onto their value.
	 *
	 * @since 3.24.1
	 *
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::set_settings
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::strip_inherited_values
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_length
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_persona
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_tone
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_feature_options
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_personas
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_tones
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::init
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::__construct
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_default
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_stored_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_valid_values
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::init
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::merge_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::register_routes
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::sanitize_value
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_inheritable_keys
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_meta_key
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_subvalues_specs
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::sanitize_subvalue
	 */
	public function test_a_set_setting_is_not_moved_by_the_site_default(): void {
		$this->set_current_user_to_admin();
		$this->set_suggestion_defaults( array( 'default_tone' => 'analytical' ) );

		$endpoint = $this->get_initialized_endpoint();
		$settings = $this->get_endpoint_settings( $endpoint );
		assert( is_array( $settings['ExcerptSuggestions'] ) );

		$settings['ExcerptSuggestions']['Tone'] = 'formal';
		$this->send_endpoint_put_request( $endpoint, $settings );

		// The site's default moves onto the user's choice, and they then save
		// an unrelated setting. Their choice must not dissolve into the default.
		$this->set_suggestion_defaults( array( 'default_tone' => 'formal' ) );
		$endpoint = $this->get_initialized_endpoint();
		$settings = $this->get_endpoint_settings( $endpoint );

		$settings['InitialTabName'] = 'performance';
		$this->send_endpoint_put_request( $endpoint, $settings );

		$this->set_suggestion_defaults( array( 'default_tone' => 'humorous' ) );
		$value = $this->get_endpoint_settings( $this->get_initialized_endpoint() );

		assert( is_array( $value['ExcerptSuggestions'] ) );
		self::assertSame( 'formal', $value['ExcerptSuggestions']['Tone'] );
	}

	/**
	 * Verifies that settings absent from a PUT request keep their value, rather
	 * than being reset to their default.
	 *
	 * @since 3.24.1
	 *
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::merge_settings
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::set_settings
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_length
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_persona
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_tone
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_feature_options
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_personas
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_tones
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::init
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::__construct
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_default
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_nested_specs
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_stored_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_valid_values
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::init
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::register_routes
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::sanitize_value
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::strip_inherited_values
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_inheritable_keys
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_meta_key
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_subvalues_specs
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::sanitize_subvalue
	 */
	public function test_settings_absent_from_a_put_request_keep_their_value(): void {
		$this->set_current_user_to_admin();
		update_user_meta(
			get_current_user_id(),
			'parsely_content_helper_settings_editor_sidebar',
			array(
				'PerformanceStats' => array( 'VisibleDataPoints' => array( 'views' ) ),
				'RelatedPosts'     => array( 'Period' => '30d' ),
				'SmartLinking'     => array( 'MaxLinks' => 25 ),
			)
		);

		$value = $this->send_endpoint_put_request(
			$this->get_initialized_endpoint(),
			array( 'InitialTabName' => 'performance' )
		);

		assert(
			is_array( $value['PerformanceStats'] ) &&
			is_array( $value['RelatedPosts'] ) &&
			is_array( $value['SmartLinking'] )
		);

		self::assertSame( 'performance', $value['InitialTabName'] );
		self::assertSame( '30d', $value['RelatedPosts']['Period'] );
		self::assertSame( 25, $value['SmartLinking']['MaxLinks'] );

		// A setting holding a list is replaced rather than merged into.
		self::assertSame( array( 'views' ), $value['PerformanceStats']['VisibleDataPoints'] );
	}

	/**
	 * Verifies that stored settings are normalized only once, so that a choice
	 * matching a later site-wide default is not mistaken for an untouched one.
	 *
	 * @since 3.24.1
	 *
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_stored_settings
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::normalize_stored_settings
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_length
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_persona
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_tone
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_feature_options
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_personas
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_tones
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::init
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::__construct
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_default
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_valid_values
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::init
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::register_routes
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::sanitize_value
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_inheritable_keys
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_legacy_defaults
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_meta_key
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_subvalues_specs
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::sanitize_subvalue
	 */
	public function test_stored_settings_are_normalized_only_once(): void {
		$this->set_current_user_to_admin();
		$this->set_suggestion_defaults(
			array(
				'default_persona' => 'techAnalyst',
				'default_tone'    => 'analytical',
			)
		);

		// A pre-3.24.0 value holding a real choice alongside a legacy default.
		update_user_meta(
			get_current_user_id(),
			'parsely_content_helper_settings_editor_sidebar',
			array(
				'ExcerptSuggestions' => array(
					'Persona' => 'journalist',
					'Tone'    => 'formal',
				),
			)
		);

		$value = $this->get_endpoint_settings( $this->get_initialized_endpoint() );
		assert( is_array( $value['ExcerptSuggestions'] ) );

		self::assertSame( 'formal', $value['ExcerptSuggestions']['Tone'] );
		self::assertSame( 'techAnalyst', $value['ExcerptSuggestions']['Persona'] );

		// Normalizing again would drop the choice, as it now matches the site's
		// default. A later change to that default must still not move the user.
		$this->set_suggestion_defaults( array( 'default_tone' => 'formal' ) );
		$this->get_endpoint_settings( $this->get_initialized_endpoint() );

		$this->set_suggestion_defaults( array( 'default_tone' => 'humorous' ) );
		$value = $this->get_endpoint_settings( $this->get_initialized_endpoint() );

		assert( is_array( $value['ExcerptSuggestions'] ) );
		self::assertSame( 'formal', $value['ExcerptSuggestions']['Tone'] );
	}

	/**
	 * Verifies that a stored value which sanitization rejects does not count as
	 * a setting the user has set.
	 *
	 * Such a value is resolved to the setting's default on read, and the sidebar
	 * sends that default straight back.
	 *
	 * @since 3.24.1
	 *
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::is_stored_override
	 * @covers \Parsely\REST_API\Settings\Base_Settings_Endpoint::strip_inherited_values
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_length
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_persona
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_tone
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_feature_options
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_personas
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_tones
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::init
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::__construct
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_default
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_stored_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::get_valid_values
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::init
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::merge_settings
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::register_routes
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::sanitize_value
	 * @uses \Parsely\REST_API\Settings\Base_Settings_Endpoint::set_settings
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_endpoint_name
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_inheritable_keys
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_legacy_defaults
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_meta_key
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::get_subvalues_specs
	 * @uses \Parsely\REST_API\Settings\Endpoint_Editor_Sidebar_Settings::sanitize_subvalue
	 */
	public function test_a_rejected_stored_value_is_not_treated_as_set(): void {
		$this->set_current_user_to_admin();
		$this->set_suggestion_defaults( array( 'default_length' => 220 ) );

		// An out-of-range length, which get_settings() repairs to the site's.
		update_user_meta(
			get_current_user_id(),
			'parsely_content_helper_settings_editor_sidebar',
			array( 'ExcerptSuggestions' => array( 'Length' => 99999 ) )
		);

		$endpoint = $this->get_initialized_endpoint();
		$settings = $this->get_endpoint_settings( $endpoint );
		assert( is_array( $settings['ExcerptSuggestions'] ) );
		self::assertSame( 220, $settings['ExcerptSuggestions']['Length'] );

		// The author saves an unrelated setting, sending the repaired value back.
		$settings['InitialTabName'] = 'performance';
		$this->send_endpoint_put_request( $endpoint, $settings );

		$this->set_suggestion_defaults( array( 'default_length' => 90 ) );
		$value = $this->get_endpoint_settings( $this->get_initialized_endpoint() );

		assert( is_array( $value['ExcerptSuggestions'] ) );
		self::assertSame( 90, $value['ExcerptSuggestions']['Length'] );
	}

	/**
	 * Stores the passed site-wide generation defaults.
	 *
	 * @since 3.24.1
	 *
	 * @param array<string, mixed> $excerpt_options The Excerpt Suggestions options.
	 * @param array<string, mixed> $title_options   The Title Suggestions options.
	 */
	private function set_suggestion_defaults(
		array $excerpt_options,
		array $title_options = array()
	): void {
		$options                   = self::DEFAULT_OPTIONS;
		$options['content_helper'] = array(
			'excerpt_suggestions' => $excerpt_options,
			'title_suggestions'   => $title_options,
		);

		update_option( \Parsely\Parsely::OPTIONS_KEY, $options );
	}

	/**
	 * Returns an endpoint built against the site's current options, as a real
	 * request would, with the current user set.
	 *
	 * @since 3.24.1
	 *
	 * @return Endpoint_Editor_Sidebar_Settings The endpoint.
	 */
	private function get_initialized_endpoint(): Endpoint_Editor_Sidebar_Settings {
		$endpoint = new Endpoint_Editor_Sidebar_Settings( $this->api_controller );
		$endpoint->init();

		return $endpoint;
	}

	/**
	 * Returns the settings that the passed endpoint responds with.
	 *
	 * @since 3.24.1
	 *
	 * @param Endpoint_Editor_Sidebar_Settings $endpoint The endpoint to query.
	 * @return array<string, mixed> The settings.
	 */
	private function get_endpoint_settings(
		Endpoint_Editor_Sidebar_Settings $endpoint
	): array {
		$value = $endpoint->get_settings()->get_data();
		assert( is_array( $value ) );

		return $value;
	}

	/**
	 * Sends a PUT request to the passed endpoint.
	 *
	 * @since 3.24.1
	 *
	 * @param Endpoint_Editor_Sidebar_Settings $endpoint The endpoint to send to.
	 * @param array<string, mixed>             $data     The settings to send.
	 * @return array<string, mixed> The settings the endpoint responds with.
	 */
	private function send_endpoint_put_request(
		Endpoint_Editor_Sidebar_Settings $endpoint,
		array $data
	): array {
		$request = new WP_REST_Request( 'PUT', '/' );
		$request->set_body( $this->wp_json_encode( $data ) );
		$request->set_header( 'content-type', 'application/json' );

		$response = $endpoint->set_settings( $request );
		self::assertInstanceOf( WP_REST_Response::class, $response );

		$value = $response->get_data();
		assert( is_array( $value ) );

		return $value;
	}

	/**
	 * Returns the current user's stored settings, as they are stored.
	 *
	 * @since 3.24.1
	 *
	 * @return array<string, mixed> The stored settings.
	 */
	private function get_stored_settings(): array {
		$settings = get_user_meta(
			get_current_user_id(),
			'parsely_content_helper_settings_editor_sidebar',
			true
		);

		return is_array( $settings ) ? $settings : array();
	}

	/**
	 * Provides data for testing the site-wide defaults.
	 *
	 * @since 3.24.0
	 *
	 * @return array<string, array<mixed>> The test data.
	 */
	public function provide_site_default_data(): array {
		$shipped = array(
			'Length'  => Suggestion_Defaults::DEFAULT_LENGTH,
			'Persona' => Suggestion_Defaults::DEFAULT_PERSONA,
			'Tone'    => Suggestion_Defaults::DEFAULT_TONE,
		);

		return array(
			'configured defaults'      => array(
				array(
					'default_length'  => 220,
					'default_tone'    => 'analytical',
					'default_persona' => 'techAnalyst',
				),
				array(
					'Length'  => 220,
					'Persona' => 'techAnalyst',
					'Tone'    => 'analytical',
				),
			),
			'missing keys'             => array( array(), $shipped ),
			'out-of-range length'      => array( array( 'default_length' => 99999 ), $shipped ),
			'non-integer length'       => array( array( 'default_length' => 'abc' ), $shipped ),
			'unknown tone and persona' => array(
				array(
					'default_tone'    => 'bogus',
					'default_persona' => 'bogus',
				),
				$shipped,
			),
		);
	}

	/**
	 * Provides data for testing the excerpt length validation.
	 *
	 * @since 3.24.0
	 *
	 * @return array<string, array<mixed>> The test data.
	 */
	public function provide_excerpt_length_data(): array {
		$default = Endpoint_Editor_Sidebar_Settings::DEFAULT_EXCERPT_LENGTH;

		return array(
			'in range'       => array( 200, 200 ),
			'minimum'        => array( Endpoint_Editor_Sidebar_Settings::MIN_EXCERPT_LENGTH, Endpoint_Editor_Sidebar_Settings::MIN_EXCERPT_LENGTH ),
			'maximum'        => array( Endpoint_Editor_Sidebar_Settings::MAX_EXCERPT_LENGTH, Endpoint_Editor_Sidebar_Settings::MAX_EXCERPT_LENGTH ),
			'below minimum'  => array( 10, $default ),
			'above maximum'  => array( 99999, $default ),
			'negative'       => array( -5, $default ),
			'string'         => array( 'abc', $default ),
			'numeric string' => array( '200', $default ),
			'boolean'        => array( true, $default ),
		);
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

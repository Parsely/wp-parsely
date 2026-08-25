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
		// The endpoint snapshots the site's defaults in its constructor, so a
		// preceding test's options would otherwise leak into the snapshot.
		self::set_options();

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
	 * Users who saved settings before 3.24.0 have no `Length`, and their
	 * `ExcerptSuggestions` still carries the `Open` setting that was removed.
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

		// The site's length reaches the user, rather than the shipped default.
		self::assertSame( 220, $value['ExcerptSuggestions']['Length'] );

		// The user's own choices stand.
		self::assertSame( 'journalist', $value['ExcerptSuggestions']['Persona'] );
		self::assertSame( 'neutral', $value['ExcerptSuggestions']['Tone'] );

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

<?php
/**
 * Integration Tests: Headline Testing scripts
 *
 * @package Parsely\Tests
 * @since   3.21.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\Headline_Testing;

use const Parsely\PARSELY_VERSION;

/**
 * Integration Tests for the Headline Testing scripts.
 *
 * @since 3.21.0
 */
final class HeadlineTestingScriptsTest extends TestCase {
	/**
	 * Headline_Testing object.
	 *
	 * @since 3.21.0
	 *
	 * @var Headline_Testing $headline_testing Holds the Headline_Testing object.
	 */
	private static $headline_testing;

	/**
	 * Advanced script string used in assertions.
	 *
	 * @since 3.21.0
	 *
	 * @var string $advanced_script_string Holds the advanced script string.
	 */
	private static $advanced_script_string = 'id="parsely-headline-testing-advanced-js-after"';

	/**
	 * Setup method called before each test.
	 *
	 * @since 3.21.0
	 */
	public function set_up(): void {
		global $wp_scripts;

		parent::set_up();
		TestCase::set_options();

		// Reset WordPress scripts global to prevent state leakage between tests.
		// phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		$wp_scripts             = new \WP_Scripts();
		self::$headline_testing = new Headline_Testing( new Parsely() );
	}

	/**
	 * Verifies that the action is not being registered when the the feature is
	 * disabled.
	 *
	 * @since 3.21.0
	 *
	 * @covers \Parsely\Headline_Testing::can_enable_feature
	 * @covers \Parsely\Headline_Testing::enqueue_headline_testing_script
	 * @covers \Parsely\Headline_Testing::enqueue_one_line_script
	 * @covers \Parsely\Headline_Testing::run
	 * @uses \Parsely\Headline_Testing::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_do_not_register_action_when_enabled_option_is_off(): void {
		// Headline Testing should be off by default.
		self::$headline_testing->run();
		self::assertFalse(
			has_action(
				'wp_enqueue_scripts',
				array( self::$headline_testing, 'enqueue_headline_testing_script' )
			)
		);
	}

	/**
	 * Verifies that the action gets registered when the the feature is enabled.
	 *
	 * @since 3.21.0
	 *
	 * @covers \Parsely\Headline_Testing::can_enable_feature
	 * @covers \Parsely\Headline_Testing::enqueue_headline_testing_script
	 * @covers \Parsely\Headline_Testing::enqueue_one_line_script
	 * @covers \Parsely\Headline_Testing::run
	 * @uses \Parsely\Headline_Testing::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_register_action_when_enabled_option_is_on(): void {
		TestCase::set_options( array( 'headline_testing' => array( 'enabled' => true ) ) );
		self::$headline_testing->run();

		self::assertSame(
			10,
			has_action(
				'wp_enqueue_scripts',
				array( self::$headline_testing, 'enqueue_headline_testing_script' )
			)
		);
	}

	/**
	 * Verifies that run() does not register the action when no Site ID is set.
	 *
	 * @since 3.21.0
	 *
	 * @covers \Parsely\Headline_Testing::can_enable_feature
	 * @covers \Parsely\Headline_Testing::run
	 * @uses \Parsely\Headline_Testing::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_do_not_register_action_when_no_site_id_is_set(): void {
		TestCase::set_options(
			array(
				'apikey'           => '',
				'headline_testing' => array( 'enabled' => true ),
			)
		);

		self::$headline_testing->run();

		// Should not be enqueued as the Site ID is empty.
		self::assertFalse(
			has_action(
				'wp_enqueue_scripts',
				array( self::$headline_testing, 'enqueue_headline_testing_script' )
			)
		);
	}

	/**
	 * Verifies that enqueuing functionality works as expected.
	 *
	 * @since 3.21.0
	 *
	 * @covers \Parsely\Headline_Testing::can_enable_feature
	 * @covers \Parsely\Headline_Testing::enqueue_headline_testing_script
	 * @covers \Parsely\Headline_Testing::enqueue_one_line_script
	 * @covers \Parsely\Headline_Testing::run
	 * @uses \Parsely\Headline_Testing::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_default_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_script_is_registered_and_enqueued(): void {
		$this->enable_headline_testing();

		self::$headline_testing->run();

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'wp_enqueue_scripts' );

		// Should be enqueued as the headline testing option is enabled and the Site ID is set.
		$this->assert_is_script_registered( 'parsely-headline-testing-one-line' );
		$this->assert_is_script_enqueued( 'parsely-headline-testing-one-line' );
	}

	/**
	 * Verifies that the HTML markup is correctly output when using the one-line
	 * script.
	 *
	 * @since 3.21.0
	 *
	 * @covers \Parsely\Headline_Testing::can_enable_feature
	 * @covers \Parsely\Headline_Testing::enqueue_headline_testing_script
	 * @covers \Parsely\Headline_Testing::enqueue_one_line_script
	 * @covers \Parsely\Headline_Testing::run
	 * @uses \Parsely\Headline_Testing::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_default_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_markup_with_one_line_script_installation_method(): void {
		$this->enable_headline_testing();

		self::$headline_testing->run();

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'wp_enqueue_scripts' );

		ob_start();
		wp_print_scripts();
		$output = (string) ob_get_clean();

		// Markup should contain the one-line script and not the advanced script.
		$this->assert_one_line_script_in_output( $output );
		self::assertStringNotContainsString( self::$advanced_script_string, $output );
	}

	/**
	 * Verifies that the HTML markup is correctly output when using the one-line
	 * script with an additional option.
	 *
	 * @since 3.21.0
	 *
	 * @covers \Parsely\Headline_Testing::can_enable_feature
	 * @covers \Parsely\Headline_Testing::enqueue_headline_testing_script
	 * @covers \Parsely\Headline_Testing::enqueue_one_line_script
	 * @covers \Parsely\Headline_Testing::add_data_attributes_to_script_tag
	 * @covers \Parsely\Headline_Testing::run
	 * @uses \Parsely\Headline_Testing::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_default_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_markup_with_one_line_script_and_additional_option(): void {
		$this->enable_headline_testing( array( 'enable_live_updates' => true ) );

		self::$headline_testing->run();

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'wp_enqueue_scripts' );

		ob_start();
		wp_print_scripts();
		$output = (string) ob_get_clean();

		// Markup should contain the one-line script with the option's attribute.
		$this->assert_one_line_script_in_output( $output, array( 'data-enable-live-updates' => 'true' ) );
		self::assertStringNotContainsString( self::$advanced_script_string, $output );
	}

	/**
	 * Verifies that running multiple wp_enqueue_scripts actions doesn't add
	 * duplicate attributes to the script markup.
	 *
	 * @since 3.21.0
	 *
	 * @covers \Parsely\Headline_Testing::can_enable_feature
	 * @covers \Parsely\Headline_Testing::enqueue_headline_testing_script
	 * @covers \Parsely\Headline_Testing::enqueue_one_line_script
	 * @covers \Parsely\Headline_Testing::add_data_attributes_to_script_tag
	 * @covers \Parsely\Headline_Testing::run
	 * @uses \Parsely\Headline_Testing::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_default_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_firing_multiple_wp_enqueue_scripts_does_not_duplicate_attributes(): void {
		$this->enable_headline_testing( array( 'enable_live_updates' => true ) );

		self::$headline_testing->run();

		// Trigger wp_enqueue_scripts multiple times.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'wp_enqueue_scripts' );
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'wp_enqueue_scripts' );
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'wp_enqueue_scripts' );

		ob_start();
		wp_print_scripts();
		$output = (string) ob_get_clean();

		// Markup should contain the option's attribute only once.
		self::assertStringContainsString( 'data-enable-live-updates="true"', $output );
		$count = substr_count( $output, 'data-enable-live-updates="true"' );
		self::assertSame(
			1,
			$count,
			'The data-enable-live-updates attribute should appear exactly once, but appeared ' . $count . ' times.'
		);
	}

	/**
	 * Verifies that the HTML markup is correctly output when using the advanced
	 * script.
	 *
	 * @since 3.21.0
	 *
	 * @covers \Parsely\Headline_Testing::can_enable_feature
	 * @covers \Parsely\Headline_Testing::enqueue_headline_testing_script
	 * @covers \Parsely\Headline_Testing::enqueue_advanced_script
	 * @covers \Parsely\Headline_Testing::run
	 * @uses \Parsely\Headline_Testing::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_default_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_markup_with_advanced_script_installation_method(): void {
		$this->enable_headline_testing( array( 'installation_method' => 'advanced' ) );

		self::$headline_testing->run();

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'wp_enqueue_scripts' );

		ob_start();
		wp_print_scripts();
		$output = (string) ob_get_clean();

		// Markup should contain the advanced script and not the one-line script.
		self::assertStringContainsString( self::$advanced_script_string, $output );
		$this->assert_one_line_script_not_in_output( $output );
	}

	/**
	 * Verifies that the HTML markup is correctly output when using the advanced
	 * script with an additional option.
	 *
	 * @since 3.21.0
	 *
	 * @covers \Parsely\Headline_Testing::can_enable_feature
	 * @covers \Parsely\Headline_Testing::enqueue_headline_testing_script
	 * @covers \Parsely\Headline_Testing::enqueue_advanced_script
	 * @covers \Parsely\Headline_Testing::run
	 * @uses \Parsely\Headline_Testing::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_default_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_markup_with_advanced_script_and_additional_option(): void {
		$this->enable_headline_testing(
			array(
				'installation_method' => 'advanced',
				'enable_live_updates' => true,
			)
		);

		self::$headline_testing->run();

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'wp_enqueue_scripts' );

		ob_start();
		wp_print_scripts();
		$output = (string) ob_get_clean();

		// Markup should contain the advanced script with the option's config.
		self::assertStringContainsString( self::$advanced_script_string, $output );
		self::assertStringContainsString( 'enableLiveUpdates: true', $output );
		$this->assert_one_line_script_not_in_output( $output );
	}

	/**
	 * Adds Headline Testing feature options, setting the feature to enabled and
	 * respecting any passed setting values.
	 *
	 * Default values will be used for any unspecified settings.
	 *
	 * @since 3.21.0
	 *
	 * @param array<string, mixed> $settings Custom settings to save.
	 */
	private function enable_headline_testing( array $settings = array() ): void {
		TestCase::set_options(
			array(
				'headline_testing' => array_merge(
					( new Parsely() )->get_default_options()['headline_testing'],
					array( 'enabled' => true ),
					$settings
				),
			)
		);
	}

	/**
	 * Asserts that the one-line headline testing script tag is present in the
	 * given HTML output.
	 *
	 * Uses a regex with lookaheads to verify each attribute independently,
	 * making the assertion robust against WordPress changes to attribute order
	 * or HTML entity encoding variants (e.g. &amp; vs &#038;).
	 *
	 * @since 3.22.1
	 *
	 * @param string               $output      The HTML output to search.
	 * @param array<string,string> $extra_attrs Optional extra attributes to assert on the tag.
	 */
	private function assert_one_line_script_in_output( string $output, array $extra_attrs = array() ): void {
		$version    = preg_quote( PARSELY_VERSION, '~' );
		$lookaheads = '(?=[^>]*\bid="parsely-headline-testing-one-line-js")'
			. '(?=[^>]*\bsrc="https://experiments\.parsely\.com/vip-experiments\.js'
			. '\?apiKey=demoaccount\.parsely\.com(?:&amp;|&#038;)ver=' . $version . '")';

		foreach ( $extra_attrs as $attr => $value ) {
			$lookaheads .= '(?=[^>]*\b' . preg_quote( $attr, '~' ) . '="' . preg_quote( $value, '~' ) . '")';
		}

		self::assertMatchesRegularExpression( '~<script' . $lookaheads . '~', $output );
	}

	/**
	 * Asserts that the one-line headline testing script tag is not present in
	 * the given HTML output.
	 *
	 * @since 3.22.1
	 *
	 * @param string $output The HTML output to search.
	 */
	private function assert_one_line_script_not_in_output( string $output ): void {
		self::assertStringNotContainsString( 'id="parsely-headline-testing-one-line-js"', $output );
	}
}

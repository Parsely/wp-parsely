<?php
/**
 * Integration Tests: Consent feature
 *
 * @package Parsely\Tests
 * @since   3.24.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Consent;
use Parsely\Parsely;

require_once __DIR__ . '/wp-consent-api-stubs.php';

/**
 * Integration Tests for the Consent feature.
 *
 * @since 3.24.0
 */
final class ConsentTest extends TestCase {
	/**
	 * Consent object.
	 *
	 * @since 3.24.0
	 *
	 * @var Consent $consent Holds the Consent object.
	 */
	private static $consent;

	/**
	 * Setup method called before each test.
	 *
	 * @since 3.24.0
	 */
	public function set_up(): void {
		global $wp_scripts;

		parent::set_up();
		TestCase::set_options();

		// Reset WordPress scripts global to prevent state leakage between tests.
		// phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		$wp_scripts    = new \WP_Scripts();
		self::$consent = new Consent( new Parsely() );
	}

	/**
	 * Verifies that the action is not being registered when the feature is
	 * disabled.
	 *
	 * @since 3.24.0
	 *
	 * @covers \Parsely\Consent::can_enable_feature
	 * @covers \Parsely\Consent::run
	 * @uses \Parsely\Consent::__construct
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
		// Consent mode should be off by default.
		self::$consent->run();
		self::assertFalse(
			has_action(
				'wp_enqueue_scripts',
				array( self::$consent, 'attach_consent_scripts' )
			)
		);
	}

	/**
	 * Verifies that the action gets registered when the feature is enabled.
	 *
	 * The action must run after Scripts::enqueue_js_tracker() (priority 10)
	 * has enqueued the tracker handle the inline scripts attach to.
	 *
	 * @since 3.24.0
	 *
	 * @covers \Parsely\Consent::can_enable_feature
	 * @covers \Parsely\Consent::run
	 * @uses \Parsely\Consent::__construct
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
		$this->enable_consent();
		self::$consent->run();

		self::assertSame(
			11,
			has_action(
				'wp_enqueue_scripts',
				array( self::$consent, 'attach_consent_scripts' )
			)
		);
	}

	/**
	 * Verifies that run() does not register the action when no Site ID is set.
	 *
	 * @since 3.24.0
	 *
	 * @covers \Parsely\Consent::can_enable_feature
	 * @covers \Parsely\Consent::run
	 * @uses \Parsely\Consent::__construct
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
				'apikey'  => '',
				'consent' => array( 'enabled' => true ),
			)
		);

		self::$consent->run();

		self::assertFalse(
			has_action(
				'wp_enqueue_scripts',
				array( self::$consent, 'attach_consent_scripts' )
			)
		);
	}

	/**
	 * Verifies that no consent script is output when the tracker itself is not
	 * enqueued (untracked page, logged-in user, filtered out, ...).
	 *
	 * @since 3.24.0
	 *
	 * @covers \Parsely\Consent::attach_consent_scripts
	 * @covers \Parsely\Consent::can_enable_feature
	 * @covers \Parsely\Consent::run
	 * @uses \Parsely\Consent::__construct
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
	public function test_no_output_when_tracker_is_not_enqueued(): void {
		$this->enable_consent();
		self::$consent->run();

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'wp_enqueue_scripts' );

		ob_start();
		wp_print_scripts();
		$output = (string) ob_get_clean();

		self::assertStringNotContainsString( 'enable_consent_tracking', $output );
	}

	/**
	 * Verifies that the consent inline scripts attach to the tracker handle,
	 * with the built-in WP Consent API bridge when no filter bridge exists.
	 *
	 * @since 3.24.0
	 *
	 * @covers \Parsely\Consent::attach_consent_scripts
	 * @covers \Parsely\Consent::can_enable_feature
	 * @covers \Parsely\Consent::get_filter_bridge
	 * @covers \Parsely\Consent::enqueue_wp_consent_api_bridge
	 * @covers \Parsely\Consent::run
	 * @uses \Parsely\Consent::__construct
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
	public function test_built_in_wp_consent_api_bridge_is_attached(): void {
		$this->enable_consent();
		self::$consent->run();
		$this->enqueue_fake_tracker();

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'wp_enqueue_scripts' );

		ob_start();
		wp_print_scripts();
		$output = (string) ob_get_clean();

		// The before inline switches the tracker into consent mode ahead of it.
		self::assertStringContainsString( 'id="wp-parsely-tracker-js-before"', $output );
		self::assertStringContainsString( 'window.PARSELY.enable_consent_tracking = true;', $output );

		// Built-in bridge: the built script (whose decision logic is
		// unit-tested in tests/js/lib/consent-bridge.test.ts) prints before
		// the tracker as its dependency, with the baked config data inline.
		self::assertStringContainsString( 'build/consent.js', $output );
		self::assertStringContainsString( 'window.wpParselyConsentConfig = ', $output );
		self::assertStringContainsString( '"prefix":"wp_consent"', $output );
		self::assertLessThan(
			strpos( $output, 'build/consent.js' ),
			strpos( $output, 'wpParselyConsentConfig' ),
			'The config data inline must print before the bridge script.'
		);
		self::assertContains(
			'wp-parsely-consent',
			wp_scripts()->registered['wp-parsely-tracker']->deps,
			'The tracker must depend on the bridge so it executes first.'
		);
	}

	/**
	 * Verifies that the site's declared consent type is baked into the bridge
	 * server-side (the Consent API's own script and localized data print
	 * after these inlines, so they cannot be read at seed time).
	 *
	 * @since 3.24.0
	 *
	 * @covers \Parsely\Consent::attach_consent_scripts
	 * @covers \Parsely\Consent::can_enable_feature
	 * @covers \Parsely\Consent::get_filter_bridge
	 * @covers \Parsely\Consent::enqueue_wp_consent_api_bridge
	 * @covers \Parsely\Consent::run
	 * @uses \Parsely\Consent::__construct
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
	public function test_declared_consent_type_is_baked_into_the_bridge(): void {
		// The stubbed wp_get_consent_type() mirrors the real one: it reads
		// the wp_get_consent_type filter, which is how a CMP declares the
		// site's regime.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- the hook belongs to the WP Consent API.
		add_filter(
			'wp_get_consent_type',
			static function (): string {
				return 'optout';
			}
		);

		$this->enable_consent();
		self::$consent->run();
		$this->enqueue_fake_tracker();

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'wp_enqueue_scripts' );

		ob_start();
		wp_print_scripts();
		$output = (string) ob_get_clean();

		self::assertStringContainsString( '"consentType":"optout"', $output );
	}

	/**
	 * Verifies that a bridge supplied via the wp_parsely_consent_bridge filter
	 * replaces the built-in WP Consent API bridge entirely.
	 *
	 * @since 3.24.0
	 *
	 * @covers \Parsely\Consent::attach_consent_scripts
	 * @covers \Parsely\Consent::can_enable_feature
	 * @covers \Parsely\Consent::get_filter_bridge
	 * @covers \Parsely\Consent::run
	 * @uses \Parsely\Consent::__construct
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
	public function test_filter_bridge_replaces_built_in_bridge(): void {
		add_filter(
			'wp_parsely_consent_bridge',
			static function (): array {
				return array(
					'before' => '/* custom-bridge-before */',
					'after'  => '/* custom-bridge-after */',
				);
			}
		);

		$this->enable_consent();
		self::$consent->run();
		$this->enqueue_fake_tracker();

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'wp_enqueue_scripts' );

		ob_start();
		wp_print_scripts();
		$output = (string) ob_get_clean();

		// Consent mode is on, with the custom bridge...
		self::assertStringContainsString( 'window.PARSELY.enable_consent_tracking = true;', $output );
		self::assertStringContainsString( '/* custom-bridge-before */', $output );
		self::assertStringContainsString( '/* custom-bridge-after */', $output );

		// ...and without any trace of the built-in bridge.
		self::assertStringNotContainsString( 'build/consent.js', $output );
		self::assertStringNotContainsString( 'wpParselyConsentConfig', $output );
	}

	/**
	 * Enables the Consent feature, respecting any passed setting values.
	 *
	 * @since 3.24.0
	 *
	 * @param array<string, mixed> $settings Custom settings to save.
	 */
	private function enable_consent( array $settings = array() ): void {
		TestCase::set_options(
			array(
				'consent' => array_merge(
					( new Parsely() )->get_default_options()['consent'],
					array( 'enabled' => true ),
					$settings
				),
			)
		);
	}

	/**
	 * Registers and enqueues a stand-in for the tracker script, so the consent
	 * inline scripts have a handle to attach to without involving the Scripts
	 * class enqueue conditions.
	 *
	 * @since 3.24.0
	 */
	private function enqueue_fake_tracker(): void {
		wp_register_script(
			'wp-parsely-tracker',
			'https://example.com/tracker.js',
			array(),
			'1.0',
			false
		);
		wp_enqueue_script( 'wp-parsely-tracker' );
	}
}

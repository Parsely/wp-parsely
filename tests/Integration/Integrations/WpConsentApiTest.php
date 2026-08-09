<?php
/**
 * Integration Tests: WP Consent API Integration
 *
 * @package Parsely\Tests
 * @since   3.24.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Integrations;

use Parsely\Integrations\Wp_Consent_Api;
use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;

use const Parsely\PARSELY_FILE;

require_once __DIR__ . '/../wp-consent-api-stubs.php';

/**
 * Integration Tests for the WP Consent API Integration.
 *
 * The wp-consent-api plugin is stubbed (see wp-consent-api-stubs.php), so the
 * API-absent no-op path of integrate() cannot be exercised here — once the
 * stubs are defined, `function_exists( 'wp_has_consent' )` is true for the
 * remainder of the test process.
 *
 * @since 3.24.0
 */
final class WpConsentApiTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @since 3.24.0
	 *
	 * @var Wp_Consent_Api $wp_consent_api Holds the Wp_Consent_Api object.
	 */
	private static $wp_consent_api;

	/**
	 * Setup method called before each test.
	 *
	 * @since 3.24.0
	 */
	public function set_up(): void {
		parent::set_up();
		TestCase::set_options();

		$GLOBALS['wp_parsely_test_cookie_info'] = array();
		self::$wp_consent_api                   = new Wp_Consent_Api( new Parsely() );
	}

	/**
	 * Verifies that integrate() registers the compliance filter and declares
	 * the tracker's cookies.
	 *
	 * @since 3.24.0
	 *
	 * @covers \Parsely\Integrations\Wp_Consent_Api::integrate
	 * @covers \Parsely\Integrations\Wp_Consent_Api::declare_cookies
	 * @uses \Parsely\Integrations\Integration::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_integrate_registers_compliance_filter_and_declares_cookies(): void {
		self::$wp_consent_api->integrate();

		self::assertSame(
			10,
			has_filter(
				'wp_consent_api_registered_' . plugin_basename( PARSELY_FILE ),
				array( self::$wp_consent_api, 'declare_compliance' )
			)
		);

		$cookie_info = $GLOBALS['wp_parsely_test_cookie_info'];
		self::assertArrayHasKey( '_parsely_visitor', $cookie_info );
		self::assertArrayHasKey( '_parsely_session', $cookie_info );

		// Both cookies register under one service and category: the API
		// derives a service's category from its cookies, so mixing categories
		// would misclassify the Parse.ly service as a whole.
		foreach ( $cookie_info as $info ) {
			self::assertSame( 'Parse.ly', $info['plugin_or_service'] );
			self::assertSame( 'statistics', $info['category'] );
		}
	}

	/**
	 * Verifies that compliance is declared only while the Consent feature is
	 * enabled: with consent mode off the tracker ignores consent state, and
	 * claiming compliance would misreport to the API's Site Health check.
	 *
	 * @since 3.24.0
	 *
	 * @covers \Parsely\Integrations\Wp_Consent_Api::declare_compliance
	 * @covers \Parsely\Integrations\Wp_Consent_Api::integrate
	 * @uses \Parsely\Integrations\Wp_Consent_Api::declare_cookies
	 * @uses \Parsely\Integrations\Integration::__construct
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_default_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_compliance_declaration_follows_the_consent_option(): void {
		self::$wp_consent_api->integrate();
		$hook = 'wp_consent_api_registered_' . plugin_basename( PARSELY_FILE );

		// Consent feature off (default): not compliant.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.DynamicHooknameFound -- the hook belongs to the WP Consent API.
		self::assertFalse( apply_filters( $hook, false ) );

		// Consent feature on: compliant.
		TestCase::set_options(
			array(
				'consent' => array( 'enabled' => true ),
			)
		);
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.DynamicHooknameFound -- the hook belongs to the WP Consent API.
		self::assertTrue( apply_filters( $hook, false ) );
	}
}

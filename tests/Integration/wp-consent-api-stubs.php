<?php
/**
 * Test stand-ins for the WP Consent API plugin's global functions
 *
 * The wp-consent-api plugin is not part of the test environment, so tests
 * that exercise the plugin's Consent API paths require this file to make
 * `function_exists()` guards pass. The stubs mirror the real functions'
 * signatures and filter usage (they are global, unprefixed functions by
 * design — the API reserves the wp_* names for an eventual core merge).
 *
 * NOTE: once required, the functions exist for the remainder of the test
 * process, so the "API absent" code paths can no longer be exercised in the
 * same run.
 *
 * @package Parsely\Tests
 * @since   3.24.0
 */

declare(strict_types=1);

if ( ! function_exists( 'wp_has_consent' ) ) {
	/**
	 * Stand-in for the WP Consent API's wp_has_consent().
	 *
	 * Presence is what the plugin's guards check; tests that need specific
	 * consent state drive it through cookies/filters, not this return value.
	 *
	 * @since 3.24.0
	 *
	 * @param string      $category     The consent category.
	 * @param string|null $requested_by Optional plugin basename asking.
	 * @return bool
	 */
	function wp_has_consent( string $category, ?string $requested_by = null ): bool { // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedFunctionFound,Generic.CodeAnalysis.UnusedFunctionParameter -- mirrors the WP Consent API.
		return true;
	}
}

if ( ! function_exists( 'wp_get_consent_type' ) ) {
	/**
	 * Stand-in for the WP Consent API's wp_get_consent_type().
	 *
	 * Mirrors the real implementation exactly: the value comes from the
	 * `wp_get_consent_type` filter with an empty-string default, so tests
	 * control it by adding that filter.
	 *
	 * @since 3.24.0
	 *
	 * @return string The consent type ('optin', 'optout', or '').
	 */
	function wp_get_consent_type(): string { // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedFunctionFound -- mirrors the WP Consent API.
		/** @var string */
		return apply_filters( 'wp_get_consent_type', '' ); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- the hook belongs to the WP Consent API.
	}
}

if ( ! function_exists( 'wp_add_cookie_info' ) ) {
	/**
	 * Recording stand-in for the WP Consent API's wp_add_cookie_info().
	 *
	 * Captures declarations into $GLOBALS['wp_parsely_test_cookie_info'],
	 * keyed by cookie name, for assertions.
	 *
	 * @since 3.24.0
	 *
	 * @param string $name                    The name of the cookie.
	 * @param string $plugin_or_service       Plugin or service that sets the cookie.
	 * @param string $category                The consent category.
	 * @param string $expires                 Time until the cookie expires.
	 * @param string $cookie_function         What the cookie is meant to do.
	 * @param string $collected_personal_data Type of personal data collected.
	 * @param bool   $member_cookie           Whether relevant for members only.
	 * @param bool   $administrator_cookie    Whether relevant for administrators only.
	 * @param string $type                    One of 'HTTP', 'LOCALSTORAGE', or 'API'.
	 * @param string $domain                  Optional domain the cookie is set on.
	 */
	function wp_add_cookie_info( // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedFunctionFound -- mirrors the WP Consent API.
		string $name,
		string $plugin_or_service,
		string $category,
		string $expires,
		string $cookie_function,
		string $collected_personal_data = '',
		bool $member_cookie = false,
		bool $administrator_cookie = false,
		string $type = 'HTTP',
		string $domain = '' 
	): void {
		$GLOBALS['wp_parsely_test_cookie_info'][ $name ] = array(
			'plugin_or_service'       => $plugin_or_service,
			'category'                => $category,
			'expires'                 => $expires,
			'cookie_function'         => $cookie_function,
			'collected_personal_data' => $collected_personal_data,
			'member_cookie'           => $member_cookie,
			'administrator_cookie'    => $administrator_cookie,
			'type'                    => $type,
			'domain'                  => $domain,
		);
	}
}

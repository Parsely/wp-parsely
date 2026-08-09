<?php
/**
 * Integrations: WP Consent API integration class
 *
 * @package Parsely
 * @since   3.24.0
 */

declare(strict_types=1);

namespace Parsely\Integrations;

use const Parsely\PARSELY_FILE;

/**
 * Integrates the plugin with the WordPress Consent API
 * (https://wordpress.org/plugins/wp-consent-api/), the WordPress-native
 * standard that consent management plugins register with.
 *
 * Two declarations, both inert without the Consent API plugin:
 *
 *  - Cookie information: registers the cookies the Parse.ly tracker sets, so
 *    CMP-generated cookie policies describe them accurately. Always accurate,
 *    so always declared.
 *  - Compliance: the `wp_consent_api_registered_{plugin}` filter tells the
 *    API (and its Site Health check) that this plugin follows the standard.
 *    Declared ONLY while the Consent feature is enabled — with consent mode
 *    off the tracker sets cookies regardless of consent, and claiming
 *    compliance would misreport. A site owner seeing wp-parsely listed as
 *    unregistered has a truthful prompt to enable consent mode.
 *
 * Deliberately absent: server-side `wp_has_consent()` gating. It reads
 * `$_COOKIE` at render time, so any markup decision based on it gets baked
 * into full-page caches and served to visitors with different consent state.
 * All consent behavior stays client-side, in the Consent feature's bridge.
 *
 * @since 3.24.0
 */
class Wp_Consent_Api extends Integration {
	/**
	 * Applies the hooks that integrate the plugin with the WP Consent API.
	 *
	 * @since 3.24.0
	 */
	public function integrate(): void {
		if ( ! function_exists( 'wp_has_consent' ) ) {
			return;
		}

		add_filter(
			'wp_consent_api_registered_' . plugin_basename( PARSELY_FILE ),
			array( $this, 'declare_compliance' )
		);

		$this->declare_cookies();
	}

	/**
	 * Returns whether the plugin should declare Consent API compliance.
	 *
	 * True only while the Consent feature is enabled: that is when the
	 * tracker actually honors consent state.
	 *
	 * @since 3.24.0
	 *
	 * @return bool True if the plugin currently follows the Consent API.
	 */
	public function declare_compliance(): bool {
		$options = self::$parsely->get_options();

		return true === $options['consent']['enabled'];
	}

	/**
	 * Declares the cookies the Parse.ly tracker sets to the Consent API's
	 * cookie-information registry.
	 *
	 * Both cookies are registered under the `statistics` category and a
	 * single "Parse.ly" service string. The tracker's anonymous mode sets no
	 * cookies at all, so there is nothing to declare under
	 * `statistics-anonymous` — and the API derives a service's category from
	 * its registered cookies, so mixing categories under one service would
	 * misclassify the service as a whole.
	 *
	 * Durations mirror the tracker's own defaults: the visitor cookie lives
	 * 13 months, the session cookie 30 minutes.
	 *
	 * @since 3.24.0
	 */
	private function declare_cookies(): void {
		if ( ! function_exists( 'wp_add_cookie_info' ) ) {
			return;
		}

		wp_add_cookie_info(
			'_parsely_visitor',
			'Parse.ly',
			'statistics',
			__( '13 months', 'wp-parsely' ),
			__( 'Store a unique visitor ID for content analytics.', 'wp-parsely' ),
			__( 'Randomly generated visitor identifier', 'wp-parsely' )
		);

		wp_add_cookie_info(
			'_parsely_session',
			'Parse.ly',
			'statistics',
			__( '30 minutes', 'wp-parsely' ),
			__( 'Group a visit into a session for content analytics.', 'wp-parsely' ),
			__( 'Randomly generated session identifier', 'wp-parsely' )
		);
	}
}

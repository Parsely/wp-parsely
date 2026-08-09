<?php
/**
 * Consent feature class
 *
 * @package Parsely
 * @since   3.24.0
 */

declare(strict_types=1);

namespace Parsely;

use Parsely\Utils\Utils;

/**
 * Switches the Parse.ly tracker into consent mode and attaches a CMP bridge.
 *
 * Consent support is part of the tracker core: every current p.js bundle
 * understands `PARSELY.enable_consent_tracking`, `PARSELY.initialConsent` and
 * `PARSELY.setConsent()`. This class only activates it. While consent mode is
 * on and the visitor has not granted analytics consent, the tracker sends
 * anonymized pings with ephemeral, non-identifying IDs and sets no cookies; a
 * grant switches the visitor to normal identified tracking.
 *
 * TRI-STATE CONTRACT: the tracker distinguishes 'denied' (an explicit refusal
 * — zero beacons by default) from 'undecided' (hasn't answered — anonymous
 * ping, ephemeral ID). A bridge must therefore never report a denial merely
 * because consent has not been granted YET: many CMPs fire their callbacks on
 * plain page load, before any user choice, and an unguarded "false" there
 * silently misclassifies every undecided visitor as a refuser.
 *
 * @since 3.24.0
 */
class Consent {
	/**
	 * Instance of Parsely class.
	 *
	 * @var Parsely
	 */
	protected $parsely;

	/**
	 * Constructor.
	 *
	 * @since 3.24.0
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Registers the Consent feature.
	 *
	 * @since 3.24.0
	 */
	public function run(): void {
		if ( false === $this->can_enable_feature() ) {
			return;
		}

		// Priority 11: after Scripts::enqueue_js_tracker() (priority 10) has
		// enqueued the tracker handle the inline scripts attach to.
		add_action( 'wp_enqueue_scripts', array( $this, 'attach_consent_scripts' ), 11 );
	}

	/**
	 * Returns whether the Consent feature can be enabled.
	 *
	 * @since 3.24.0
	 *
	 * @return bool True if the feature can be enabled, false otherwise.
	 */
	public function can_enable_feature(): bool {
		$options = $this->parsely->get_options();

		return true === $options['consent']['enabled'] &&
			'' !== $this->parsely->get_site_id();
	}

	/**
	 * Attaches consent mode to the tracker handle.
	 *
	 * An inline ahead of p.js switches the tracker into consent mode. The
	 * bridge then comes from one of two places: a site-supplied one via the
	 * wp_parsely_consent_bridge filter (attached as before/after inlines), or
	 * the built-in WP Consent API bridge (a built script, enqueued as a
	 * dependency of the tracker so it executes first).
	 *
	 * @since 3.24.0
	 */
	public function attach_consent_scripts(): void {
		if ( ! wp_script_is( 'wp-parsely-tracker', 'enqueued' ) ) {
			// The tracker isn't rendering on this request (untracked post type,
			// logged-in user, wp_parsely_load_js_tracker filter, ...), so there
			// is nothing to make consent-aware.
			return;
		}

		$bridge = $this->get_filter_bridge();

		$before = "window.PARSELY = window.PARSELY || {};\nwindow.PARSELY.enable_consent_tracking = true;";

		if ( '' === $bridge['before'] && '' === $bridge['after'] ) {
			if ( ! function_exists( 'wp_has_consent' ) ) {
				// No bridge at all: no site-supplied bridge, and no WP Consent
				// API for the built-in one to talk to. Without any consent
				// source, consent mode would stamp every beacon as consented
				// with no consent mechanism behind the claim — so refuse to
				// activate, leaving the tracker exactly as it is with the
				// feature off. This also makes the option safe to enable
				// before the site's CMP is installed.
				return;
			}

			// No site-supplied bridge: use the built-in WP Consent API bridge.
			wp_add_inline_script( 'wp-parsely-tracker', $before, 'before' );
			$this->enqueue_wp_consent_api_bridge();
			return;
		}

		if ( '' !== $bridge['before'] ) {
			$before .= "\n" . $bridge['before'];
		}

		wp_add_inline_script( 'wp-parsely-tracker', $before, 'before' );

		if ( '' !== $bridge['after'] ) {
			wp_add_inline_script( 'wp-parsely-tracker', $bridge['after'], 'after' );
		}
	}

	/**
	 * Returns the site-supplied CMP bridge, as before/after JavaScript.
	 * Both strings are empty when no filter is registered — the caller then
	 * falls back to the built-in WP Consent API bridge.
	 *
	 * @since 3.24.0
	 *
	 * @return array{before: string, after: string}
	 */
	private function get_filter_bridge(): array {
		/**
		 * Filters the JavaScript bridge between the site's consent management
		 * platform and the Parse.ly tracker's consent mode.
		 *
		 * 'before' is emitted ahead of the tracker tag. Seed
		 * `PARSELY.initialConsent` here, and ONLY from a real recorded prior
		 * choice: `true` for a prior grant, `false` for a prior explicit
		 * refusal, and leave it UNSET when the visitor has not answered.
		 *
		 * 'after' is emitted behind the tracker tag. Register CMP listeners
		 * here and call `PARSELY.setConsent(true)` on a grant,
		 * `PARSELY.setConsent(false)` ONLY on an explicit refusal or
		 * revocation.
		 *
		 * EXACTLY ONE BRIDGE PER SITE: implementations must ASSIGN to
		 * 'before'/'after' rather than append. When two register, the later
		 * one replaces the earlier one's JS — deliberately, since two bridges
		 * pushing (possibly contradictory) state into the tracker would race.
		 * A site that needs to combine consent sources should do so INSIDE a
		 * single bridge, where the precedence is explicit.
		 *
		 * Returning any non-empty 'before' or 'after' replaces the built-in
		 * WP Consent API bridge entirely.
		 *
		 * @since 3.24.0
		 *
		 * @param array{before: string, after: string} $bridge The bridge JavaScript.
		 */
		$filtered = apply_filters(
			'wp_parsely_consent_bridge',
			array(
				'before' => '',
				'after'  => '',
			)
		);

		// Filters can return anything at runtime; normalize to the declared shape.
		/** @var mixed $filtered */
		if ( ! is_array( $filtered ) ) {
			$filtered = array();
		}

		return array(
			'before' => is_string( $filtered['before'] ?? null ) ? $filtered['before'] : '',
			'after'  => is_string( $filtered['after'] ?? null ) ? $filtered['after'] : '',
		);
	}

	/**
	 * Enqueues the built-in bridge to the WordPress Consent API
	 * (build/consent.js; sources: src/js/consent.ts and the unit-tested
	 * decision logic in src/js/lib/consent-bridge.ts).
	 *
	 * The bridge must execute before the tracker script, so it is registered
	 * as a dependency of the wp-parsely-tracker handle — WordPress then
	 * guarantees the print order.
	 *
	 * The Consent API's cookie prefix, the site's declared consent type, and
	 * the waitfor flag are resolved server-side via the same filters the API
	 * itself applies, and passed as a data inline: the API's own script and
	 * its localized `consent_api` object print in the footer AFTER this
	 * script, so they cannot be read at execution time. All three values are
	 * site-level configuration, so baking them into markup is page-cache
	 * safe. A CMP-set `window.wp_consent_type` still takes precedence at
	 * runtime, and a late-defined type (server-side geo detection) resolves
	 * via the API's wp_consent_type_defined event.
	 *
	 * @since 3.24.0
	 */
	private function enqueue_wp_consent_api_bridge(): void {
		$consent_asset = Utils::get_asset_info( 'build/consent.asset.php' );

		wp_register_script(
			'wp-parsely-consent',
			plugin_dir_url( PARSELY_FILE ) . 'build/consent.js',
			$consent_asset['dependencies'],
			$consent_asset['version'],
			true
		);

		$tracker = wp_scripts()->query( 'wp-parsely-tracker', 'registered' );
		if ( $tracker instanceof \_WP_Dependency && ! in_array( 'wp-parsely-consent', $tracker->deps, true ) ) {
			$tracker->deps[] = 'wp-parsely-consent';
		}

		wp_enqueue_script( 'wp-parsely-consent' );

		$consent_type = function_exists( 'wp_get_consent_type' ) ? wp_get_consent_type() : '';

		// The same filters the Consent API's own config applies.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- the hooks belong to the WP Consent API.
		$prefix = apply_filters( 'wp_consent_cookie_prefix', 'wp_consent' );
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- the hooks belong to the WP Consent API.
		$waitfor = (bool) apply_filters( 'wp_consent_api_waitfor_consent_hook', false );

		$config = array(
			'prefix'      => $prefix,
			'consentType' => $consent_type,
			'waitFor'     => $waitfor,
		);

		wp_add_inline_script(
			'wp-parsely-consent',
			'window.wpParselyConsentConfig = ' . (string) wp_json_encode( $config ) . ';',
			'before'
		);
	}
}

<?php
/**
 * Consent feature class
 *
 * @package Parsely
 * @since   3.24.0
 */

declare(strict_types=1);

namespace Parsely;

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
	 * Attaches the consent-mode inline scripts to the tracker handle.
	 *
	 * The `before` inline runs ahead of p.js: it switches the tracker into
	 * consent mode and may seed `PARSELY.initialConsent` from a recorded prior
	 * choice. The `after` inline runs behind p.js and registers the CMP
	 * listeners that push later choices into `PARSELY.setConsent()`.
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

		$bridge = $this->get_bridge();

		$before = "window.PARSELY = window.PARSELY || {};\nwindow.PARSELY.enable_consent_tracking = true;";
		if ( '' !== $bridge['before'] ) {
			$before .= "\n" . $bridge['before'];
		}

		wp_add_inline_script( 'wp-parsely-tracker', $before, 'before' );

		if ( '' !== $bridge['after'] ) {
			wp_add_inline_script( 'wp-parsely-tracker', $bridge['after'], 'after' );
		}
	}

	/**
	 * Returns the CMP bridge to attach, as before/after JavaScript.
	 *
	 * @since 3.24.0
	 *
	 * @return array{before: string, after: string}
	 */
	private function get_bridge(): array {
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

		$bridge = array(
			'before' => is_string( $filtered['before'] ?? null ) ? $filtered['before'] : '',
			'after'  => is_string( $filtered['after'] ?? null ) ? $filtered['after'] : '',
		);

		if ( '' === $bridge['before'] && '' === $bridge['after'] ) {
			return $this->get_wp_consent_api_bridge();
		}

		return $bridge;
	}

	/**
	 * Returns the built-in bridge to the WordPress Consent API.
	 *
	 * The WP Consent API (https://github.com/WordPress/wp-consent-api) is the
	 * WordPress-native consent standard that CMP plugins register with. This
	 * bridge maps its `statistics` category to the tracker's consent mode, so
	 * any CMP speaking the Consent API works without Parse.ly-specific code.
	 * It is inert when no such CMP is present: the cookie never exists and the
	 * consent-change event never fires, leaving every visitor 'undecided'.
	 *
	 * The `before` half reads the recorded choice straight from the
	 * `wp_consent_statistics` cookie rather than through the Consent API's
	 * `wp_has_consent()` JavaScript helper, for two reasons: the helper's
	 * script may not have loaded yet when this inline runs, and the helper
	 * collapses the tri-state — under an opt-out consent type it reports
	 * "has consent" for visitors who never answered. Only an explicit
	 * recorded choice may seed `initialConsent`.
	 *
	 * (Deliberate follow-up, not implemented: honoring `wp_consent_type`
	 * "optout" regimes by treating an absent choice as consent is a
	 * jurisdiction-dependent policy decision that belongs in site
	 * configuration, not in a default.)
	 *
	 * @since 3.24.0
	 *
	 * @return array{before: string, after: string}
	 */
	private function get_wp_consent_api_bridge(): array {
		$before = <<<'JS'
( function() {
	var match = document.cookie.match( /(?:^|;\s*)wp_consent_statistics=(allow|deny)/ );
	if ( null !== match ) {
		window.PARSELY.initialConsent = 'allow' === match[ 1 ];
	}
} )();
JS;

		$after = <<<'JS'
( function() {
	document.addEventListener( 'wp_listen_for_consent_change', function( event ) {
		var changed = event.detail;
		if ( ! changed || 'undefined' === typeof changed.statistics ) {
			return;
		}
		if ( window.PARSELY && 'function' === typeof window.PARSELY.setConsent ) {
			// The event only ever reports an explicit choice ('allow' or
			// 'deny'), so mapping non-allow to a denial is safe here.
			window.PARSELY.setConsent( 'allow' === changed.statistics );
		}
	} );
} )();
JS;

		return array(
			'before' => $before,
			'after'  => $after,
		);
	}
}

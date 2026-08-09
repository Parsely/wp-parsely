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
	 * The WP Consent API (https://wordpress.org/plugins/wp-consent-api/) is
	 * the WordPress-native consent standard that CMP plugins register with.
	 * This bridge maps its categories to the tracker's consent mode, so any
	 * CMP speaking the Consent API works without Parse.ly-specific code. It
	 * is inert when no such CMP is present.
	 *
	 * CATEGORY MAPPING. `statistics` is identified analytics and maps to
	 * consented/denied directly. `statistics-anonymous` (anonymous,
	 * non-identifying measurement) maps to the tracker's anonymous modes: an
	 * undecided visitor is already measured anonymously, and for a visitor
	 * who denied `statistics` but allowed `statistics-anonymous`, the bridge
	 * sets the tracker's `emit_on_denied` flag so the anonymous cookieless
	 * ping continues. That flag is off by default in the tracker on purpose
	 * (the site, not Parse.ly, must decide anonymous pings are lawful);
	 * setting it from a CMP-recorded `statistics-anonymous` allow is exactly
	 * such a site-level, visitor-consented instruction. One mapping is lossy
	 * and documented as such: a visitor who denied `statistics-anonymous`
	 * while `statistics` is unanswered is recorded as denied, because zero
	 * beacons is the only tracker state that honors refusing even anonymous
	 * measurement.
	 *
	 * UNANSWERED VISITORS mirror `wp_has_consent()`: under a declared
	 * opt-out regime — or when no consent type is declared at all — an
	 * unanswered visitor counts as consented; under opt-in they stay
	 * undecided (anonymous measurement). A recorded choice always wins.
	 *
	 * WHY VALUES ARE BAKED SERVER-SIDE: the Consent API's script and its
	 * localized `consent_api` object print in the footer AFTER these
	 * inlines, so the cookie prefix, consent type, and waitfor flag are
	 * resolved in PHP (site-level config, page-cache-safe) via the same
	 * filters the API itself applies. `window.wp_consent_type`, when a CMP
	 * has set it by the time the inline runs, still takes precedence, and a
	 * late-defined type (server-side geo detection, signaled by the waitfor
	 * flag) is handled by the `wp_consent_type_defined` listener.
	 *
	 * EVENT SEMANTICS: `wp_listen_for_consent_change` fires per category and
	 * only on an actual change (a re-affirmed choice is silent), so initial
	 * state must come from the cookies — which is what the `before` half
	 * does, ahead of the tracker script.
	 *
	 * @since 3.24.0
	 *
	 * @return array{before: string, after: string}
	 */
	private function get_wp_consent_api_bridge(): array {
		$consent_type = function_exists( 'wp_get_consent_type' ) ? wp_get_consent_type() : '';

		// The same filters the Consent API's own config applies.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- the hooks belong to the WP Consent API.
		$prefix = apply_filters( 'wp_consent_cookie_prefix', 'wp_consent' );
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- the hooks belong to the WP Consent API.
		$waitfor = (bool) apply_filters( 'wp_consent_api_waitfor_consent_hook', false );

		$baked = sprintf(
			'var prefix = %s, bakedType = %s, bakedWaitFor = %s;',
			wp_json_encode( $prefix ),
			wp_json_encode( $consent_type ),
			wp_json_encode( $waitfor )
		);

		$helpers = <<<'JS'
	function choice( category ) {
		var safePrefix = prefix.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
		var match = document.cookie.match( new RegExp( '(?:^|;\\s*)' + safePrefix + '_' + category + '=(allow|deny)' ) );
		return null === match ? '' : match[ 1 ];
	}
JS;

		$before = <<<'JS'
	var consentType = 'undefined' !== typeof window.wp_consent_type ? window.wp_consent_type : bakedType;
	var waitFor = 'undefined' !== typeof window.waitfor_consent_hook ? window.waitfor_consent_hook : bakedWaitFor;
	var stats = choice( 'statistics' );

	if ( 'allow' === stats ) {
		window.PARSELY.initialConsent = true;
	} else if ( 'deny' === stats ) {
		window.PARSELY.initialConsent = false;
		if ( 'allow' === choice( 'statistics-anonymous' ) ) {
			// The visitor consented to anonymous measurement: permit the
			// anonymous cookieless ping while identified tracking is denied.
			window.PARSELY.emit_on_denied = true;
		}
	} else if ( 'deny' === choice( 'statistics-anonymous' ) ) {
		// Refused even anonymous measurement; denied (zero beacons) is the
		// only tracker state that honors that.
		window.PARSELY.initialConsent = false;
	} else if ( waitFor && 'undefined' === typeof window.wp_consent_type ) {
		// The consent type arrives late (e.g. server-side geo detection);
		// the wp_consent_type_defined listener decides then.
	} else if ( ! consentType || -1 !== String( consentType ).indexOf( 'optout' ) ) {
		// Mirror wp_has_consent(): an opt-out regime, or no declared consent
		// management at all, treats an unanswered visitor as consented.
		window.PARSELY.initialConsent = true;
	}
	// Otherwise (opt-in, unanswered): stay undecided — the tracker's
	// anonymous, cookieless measurement mode.
JS;

		$after = <<<'JS'
	function setConsent( granted ) {
		if ( window.PARSELY && 'function' === typeof window.PARSELY.setConsent ) {
			window.PARSELY.setConsent( granted );
		}
	}

	// Fires per category and only on an actual change; detail is a
	// string-keyed bag with a single entry.
	document.addEventListener( 'wp_listen_for_consent_change', function( event ) {
		var changed = event.detail || {};
		for ( var category in changed ) {
			if ( ! Object.prototype.hasOwnProperty.call( changed, category ) ) {
				continue;
			}
			var value = changed[ category ];
			if ( 'statistics' === category ) {
				if ( 'allow' === value ) {
					setConsent( true );
				} else if ( 'deny' === value ) {
					window.PARSELY.emit_on_denied = 'allow' === choice( 'statistics-anonymous' );
					setConsent( false );
				}
			} else if ( 'statistics-anonymous' === category ) {
				if ( 'allow' === value ) {
					// Matters while statistics is denied: permits the
					// anonymous cookieless ping.
					window.PARSELY.emit_on_denied = true;
				} else if ( 'deny' === value ) {
					window.PARSELY.emit_on_denied = false;
					if ( '' === choice( 'statistics' ) ) {
						// Refused even anonymous measurement while
						// statistics is unanswered; denied is the only
						// zero-beacon state.
						setConsent( false );
					}
				}
			}
		}
	} );

	// Late-defined consent type (geo detection). Only an unanswered visitor
	// is affected; mirror wp_has_consent() for the now-known regime.
	document.addEventListener( 'wp_consent_type_defined', function() {
		if ( '' !== choice( 'statistics' ) || 'deny' === choice( 'statistics-anonymous' ) ) {
			return;
		}
		var lateType = 'undefined' !== typeof window.wp_consent_type ? window.wp_consent_type : '';
		if ( ! lateType || -1 !== String( lateType ).indexOf( 'optout' ) ) {
			setConsent( true );
		}
	} );
JS;

		return array(
			'before' => "( function() {\n" . $baked . "\n" . $helpers . "\n" . $before . "\n} )();",
			'after'  => "( function() {\n" . $baked . "\n" . $helpers . "\n" . $after . "\n} )();",
		);
	}
}

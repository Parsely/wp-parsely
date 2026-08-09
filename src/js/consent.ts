/**
 * The Consent feature's built-in bridge to the WP Consent API: window/DOM
 * glue around the pure decision logic in `lib/consent-bridge.ts`.
 *
 * Loaded (as a dependency of the tracker script, so it executes first) only
 * when the Consent feature is enabled and no custom bridge is supplied via
 * the `wp_parsely_consent_bridge` filter. The PHP side bakes the site-level
 * Consent API config (cookie prefix, declared consent type, waitfor flag)
 * into `window.wpParselyConsentConfig`, because the Consent API's own script
 * and localized data print after this one.
 */

/**
 * Internal dependencies
 */
import {
	ChangeActions,
	SeedDecision,
	decideChangeActions,
	decideInitialSeed,
	lateTypeGrantsConsent,
	readChoice,
} from './lib/consent-bridge';

interface ConsentConfig {
	prefix: string;
	consentType: string;
	waitFor: boolean;
}

function getConfig(): ConsentConfig {
	const config = window.wpParselyConsentConfig ?? {};

	return {
		prefix: config.prefix ?? 'wp_consent',
		consentType: config.consentType ?? '',
		waitFor: config.waitFor ?? false,
	};
}

function getChoices( prefix: string ) {
	return {
		statistics: readChoice( document.cookie, prefix, 'statistics' ),
		statisticsAnonymous: readChoice( document.cookie, prefix, 'statistics-anonymous' ),
	};
}

/**
 * Applies a consent grant or denial to the tracker, race-free: via
 * setConsent() when the tracker has loaded, via initialConsent (which the
 * tracker reads at initialization) when it has not.
 *
 * @param {boolean} granted Whether consent is granted.
 */
function applyConsent( granted: boolean ): void {
	window.PARSELY = window.PARSELY ?? {};

	if ( typeof window.PARSELY.setConsent === 'function' ) {
		window.PARSELY.setConsent( granted );
	} else {
		window.PARSELY.initialConsent = granted;
	}
}

function applySeed( seed: SeedDecision ): void {
	window.PARSELY = window.PARSELY ?? {};

	if ( undefined !== seed.initialConsent ) {
		window.PARSELY.initialConsent = seed.initialConsent;
	}
	if ( undefined !== seed.emitOnDenied ) {
		window.PARSELY.emit_on_denied = seed.emitOnDenied;
	}
}

function applyActions( actions: ChangeActions ): void {
	window.PARSELY = window.PARSELY ?? {};

	if ( undefined !== actions.emitOnDenied ) {
		window.PARSELY.emit_on_denied = actions.emitOnDenied;
	}
	if ( undefined !== actions.setConsent ) {
		applyConsent( actions.setConsent );
	}
}

( function initConsentBridge(): void {
	const config = getConfig();

	// A CMP-set runtime consent type takes precedence over the baked one.
	const runtimeTypeDefined = 'undefined' !== typeof window.wp_consent_type;
	const consentType = runtimeTypeDefined ? String( window.wp_consent_type ) : config.consentType;
	const waitForType = ! runtimeTypeDefined && (
		'undefined' !== typeof window.waitfor_consent_hook
			? Boolean( window.waitfor_consent_hook )
			: config.waitFor
	);

	applySeed( decideInitialSeed( getChoices( config.prefix ), consentType, waitForType ) );

	// Fires per category and only on an actual change (a re-affirmed choice
	// is silent); detail is a string-keyed bag with a single entry.
	document.addEventListener( 'wp_listen_for_consent_change', ( event: Event ): void => {
		const changed = ( event as CustomEvent ).detail ?? {};

		for ( const category in changed ) {
			if ( ! Object.prototype.hasOwnProperty.call( changed, category ) ) {
				continue;
			}
			applyActions(
				decideChangeActions( category, String( changed[ category ] ), getChoices( config.prefix ) )
			);
		}
	} );

	// Late-defined consent type (server-side geo detection); only a
	// still-unanswered visitor is affected.
	document.addEventListener( 'wp_consent_type_defined', (): void => {
		const lateType = 'undefined' !== typeof window.wp_consent_type
			? String( window.wp_consent_type )
			: '';

		if ( lateTypeGrantsConsent( lateType, getChoices( config.prefix ) ) ) {
			applyConsent( true );
		}
	} );
}() );

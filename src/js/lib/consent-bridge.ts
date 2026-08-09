/**
 * Pure decision logic for the built-in WP Consent API bridge.
 *
 * Everything here is side-effect free (no window/document access), so the
 * consent decision table — the most compliance-sensitive logic in the plugin
 * — is unit-testable in isolation. The DOM/tracker glue lives in
 * `src/js/consent.ts`.
 *
 * Category mapping (see also the Consent class in PHP): `statistics` is
 * identified analytics and maps to the tracker's consented/denied states.
 * `statistics-anonymous` (anonymous, non-identifying measurement) maps to
 * the tracker's anonymous modes: an undecided visitor is already measured
 * anonymously, and a visitor who denied `statistics` but allowed
 * `statistics-anonymous` gets the tracker's `emit_on_denied` flag, so the
 * anonymous cookieless ping continues. One mapping is lossy and deliberate:
 * a visitor who denied `statistics-anonymous` while `statistics` is
 * unanswered is recorded as denied, because zero beacons is the only tracker
 * state that honors refusing even anonymous measurement.
 */

/**
 * A recorded consent choice: 'allow', 'deny', or '' when no choice has been
 * recorded. The WP Consent API stores choices in cookies named
 * `{prefix}_{category}`; a missing cookie is the third state.
 */
export type ConsentChoice = 'allow' | 'deny' | '';

interface RecordedChoices {
	statistics: ConsentChoice;
	statisticsAnonymous: ConsentChoice;
}

export interface SeedDecision {
	initialConsent?: boolean;
	emitOnDenied?: boolean;
}

export interface ChangeActions {
	setConsent?: boolean;
	emitOnDenied?: boolean;
}

/**
 * Reads a recorded consent choice for a category from a document.cookie
 * string.
 *
 * @param {string} cookieString The document.cookie string.
 * @param {string} prefix       The Consent API cookie prefix (default `wp_consent`).
 * @param {string} category     The consent category.
 *
 * @return {ConsentChoice} The recorded choice, or '' when none exists.
 */
export function readChoice( cookieString: string, prefix: string, category: string ): ConsentChoice {
	const safe = ( prefix + '_' + category ).replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
	const match = cookieString.match( new RegExp( '(?:^|;\\s*)' + safe + '=(allow|deny)' ) );

	return null === match ? '' : ( match[ 1 ] as ConsentChoice );
}

/**
 * Returns whether a consent type treats an unanswered visitor as consented,
 * mirroring the WP Consent API's own wp_has_consent(): an opt-out regime
 * (substring match, as the API does) or no declared consent management at
 * all means consent is assumed until refused.
 *
 * @param {string} consentType The declared consent type ('optin', 'optout', '' ...).
 *
 * @return {boolean} True if an unanswered visitor counts as consented.
 */
export function assumesConsentWhenUnanswered( consentType: string ): boolean {
	return '' === consentType || -1 !== consentType.indexOf( 'optout' );
}

/**
 * Decides the initial tracker consent state, ahead of the tracker script.
 *
 * A recorded choice always wins. For unanswered visitors the decision
 * mirrors wp_has_consent() for the declared regime — unless the consent
 * type is determined late (waitForType), in which case the decision is
 * deferred to the wp_consent_type_defined handler.
 *
 * @param {RecordedChoices} choices     The recorded category choices.
 * @param {string}          consentType The effective consent type.
 * @param {boolean}         waitForType True when the type is not yet known
 *                                      (waitfor_consent_hook set and no
 *                                      runtime wp_consent_type yet).
 *
 * @return {SeedDecision} Tracker state to seed; empty means stay undecided.
 */
export function decideInitialSeed(
	choices: RecordedChoices,
	consentType: string,
	waitForType: boolean
): SeedDecision {
	if ( 'allow' === choices.statistics ) {
		return { initialConsent: true };
	}

	if ( 'deny' === choices.statistics ) {
		const decision: SeedDecision = { initialConsent: false };
		if ( 'allow' === choices.statisticsAnonymous ) {
			// The visitor consented to anonymous measurement: permit the
			// anonymous cookieless ping while identified tracking is denied.
			decision.emitOnDenied = true;
		}
		return decision;
	}

	if ( 'deny' === choices.statisticsAnonymous ) {
		// Refused even anonymous measurement; denied (zero beacons) is the
		// only tracker state that honors that.
		return { initialConsent: false };
	}

	if ( waitForType ) {
		// The consent type arrives late (e.g. server-side geo detection);
		// the wp_consent_type_defined handler decides then.
		return {};
	}

	if ( assumesConsentWhenUnanswered( consentType ) ) {
		return { initialConsent: true };
	}

	// Opt-in, unanswered: stay undecided — the tracker's anonymous,
	// cookieless measurement mode.
	return {};
}

/**
 * Decides the tracker actions for a single wp_listen_for_consent_change
 * entry. The event fires per category and only on an actual change.
 *
 * @param {string}          category The changed category.
 * @param {string}          value    The new value ('allow' or 'deny').
 * @param {RecordedChoices} choices  The recorded choices AFTER the change.
 *
 * @return {ChangeActions} Tracker actions to apply; empty means none.
 */
export function decideChangeActions(
	category: string,
	value: string,
	choices: RecordedChoices
): ChangeActions {
	if ( 'statistics' === category ) {
		if ( 'allow' === value ) {
			return { setConsent: true };
		}
		if ( 'deny' === value ) {
			return {
				setConsent: false,
				emitOnDenied: 'allow' === choices.statisticsAnonymous,
			};
		}
		return {};
	}

	if ( 'statistics-anonymous' === category ) {
		if ( 'allow' === value ) {
			// Matters while statistics is denied: permits the anonymous
			// cookieless ping.
			return { emitOnDenied: true };
		}
		if ( 'deny' === value ) {
			const actions: ChangeActions = { emitOnDenied: false };
			if ( '' === choices.statistics ) {
				// Refused even anonymous measurement while statistics is
				// unanswered; denied is the only zero-beacon state.
				actions.setConsent = false;
			}
			return actions;
		}
	}

	return {};
}

/**
 * Decides whether a late-defined consent type (wp_consent_type_defined,
 * fired by CMPs that determine the regime server-side, e.g. by geo lookup)
 * grants consent to a still-unanswered visitor.
 *
 * @param {string}          lateType The consent type as now defined.
 * @param {RecordedChoices} choices  The recorded category choices.
 *
 * @return {boolean} True if the visitor should be granted consent.
 */
export function lateTypeGrantsConsent( lateType: string, choices: RecordedChoices ): boolean {
	if ( '' !== choices.statistics || 'deny' === choices.statisticsAnonymous ) {
		// A recorded choice already decided; the late type changes nothing.
		return false;
	}

	return assumesConsentWhenUnanswered( lateType );
}

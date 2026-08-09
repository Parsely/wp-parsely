/**
 * Internal dependencies
 */
import {
	assumesConsentWhenUnanswered,
	decideChangeActions,
	decideInitialSeed,
	lateTypeGrantsConsent,
	readChoice,
} from '../../../src/js/lib/consent-bridge';

describe( 'lib/consent-bridge', () => {
	describe( 'readChoice', () => {
		test( 'reads allow, deny, and absent as the three states', () => {
			expect( readChoice( 'wp_consent_statistics=allow', 'wp_consent', 'statistics' ) ).toBe( 'allow' );
			expect( readChoice( 'wp_consent_statistics=deny', 'wp_consent', 'statistics' ) ).toBe( 'deny' );
			expect( readChoice( 'genre=fiction', 'wp_consent', 'statistics' ) ).toBe( '' );
			expect( readChoice( '', 'wp_consent', 'statistics' ) ).toBe( '' );
		} );

		test( 'finds the cookie among others and respects boundaries', () => {
			const jar = 'a=1; wp_consent_statistics-anonymous=allow; wp_consent_statistics=deny; b=2';
			expect( readChoice( jar, 'wp_consent', 'statistics' ) ).toBe( 'deny' );
			expect( readChoice( jar, 'wp_consent', 'statistics-anonymous' ) ).toBe( 'allow' );
		} );

		test( 'ignores unrecognized values', () => {
			expect( readChoice( 'wp_consent_statistics=maybe', 'wp_consent', 'statistics' ) ).toBe( '' );
		} );

		test( 'honors a filtered cookie prefix, including regex specials', () => {
			expect( readChoice( 'acme_consent_statistics=allow', 'acme_consent', 'statistics' ) ).toBe( 'allow' );
			expect( readChoice( 'a.b_statistics=deny', 'a.b', 'statistics' ) ).toBe( 'deny' );
			// The dot must not act as a regex wildcard.
			expect( readChoice( 'aXb_statistics=deny', 'a.b', 'statistics' ) ).toBe( '' );
		} );
	} );

	describe( 'assumesConsentWhenUnanswered', () => {
		test( 'mirrors wp_has_consent for the regime', () => {
			// No declared consent management: consent is assumed.
			expect( assumesConsentWhenUnanswered( '' ) ).toBe( true );
			// Opt-out regimes, matched by substring as the API does.
			expect( assumesConsentWhenUnanswered( 'optout' ) ).toBe( true );
			expect( assumesConsentWhenUnanswered( 'optout-eu' ) ).toBe( true );
			// Opt-in: no consent until granted.
			expect( assumesConsentWhenUnanswered( 'optin' ) ).toBe( false );
		} );
	} );

	describe( 'decideInitialSeed', () => {
		type Case = [
			string,
			ReturnType<typeof decideInitialSeed>,
			Parameters<typeof decideInitialSeed>[0],
			string,
			boolean,
		];

		const cases: Case[] = [
			[
				'recorded statistics allow seeds consented',
				{ initialConsent: true },
				{ statistics: 'allow', statisticsAnonymous: '' },
				'optin',
				false,
			],
			[
				'recorded statistics deny seeds denied',
				{ initialConsent: false },
				{ statistics: 'deny', statisticsAnonymous: '' },
				'optin',
				false,
			],
			[
				'statistics deny + statistics-anonymous allow keeps the anonymous ping',
				{ initialConsent: false, emitOnDenied: true },
				{ statistics: 'deny', statisticsAnonymous: 'allow' },
				'optin',
				false,
			],
			[
				'statistics unanswered + statistics-anonymous deny seeds denied (lossy mapping)',
				{ initialConsent: false },
				{ statistics: '', statisticsAnonymous: 'deny' },
				'optout',
				false,
			],
			[
				'unanswered under opt-in stays undecided',
				{},
				{ statistics: '', statisticsAnonymous: '' },
				'optin',
				false,
			],
			[
				'unanswered under opt-out is consented (mirror wp_has_consent)',
				{ initialConsent: true },
				{ statistics: '', statisticsAnonymous: '' },
				'optout',
				false,
			],
			[
				'unanswered with no declared consent type is consented (mirror wp_has_consent)',
				{ initialConsent: true },
				{ statistics: '', statisticsAnonymous: '' },
				'',
				false,
			],
			[
				'unanswered with a late-arriving consent type defers',
				{},
				{ statistics: '', statisticsAnonymous: '' },
				'',
				true,
			],
			[
				'a recorded choice wins even when the type is late',
				{ initialConsent: true },
				{ statistics: 'allow', statisticsAnonymous: '' },
				'',
				true,
			],
		];

		test.each( cases )( '%s', ( _label, expected, choices, consentType, waitForType ) => {
			expect( decideInitialSeed( choices, consentType, waitForType ) ).toEqual( expected );
		} );
	} );

	describe( 'decideChangeActions', () => {
		test( 'statistics allow grants consent', () => {
			expect(
				decideChangeActions( 'statistics', 'allow', { statistics: 'allow', statisticsAnonymous: '' } )
			).toEqual( { setConsent: true } );
		} );

		test( 'statistics deny revokes; anonymous ping follows the statistics-anonymous choice', () => {
			expect(
				decideChangeActions( 'statistics', 'deny', { statistics: 'deny', statisticsAnonymous: 'allow' } )
			).toEqual( { setConsent: false, emitOnDenied: true } );
			expect(
				decideChangeActions( 'statistics', 'deny', { statistics: 'deny', statisticsAnonymous: '' } )
			).toEqual( { setConsent: false, emitOnDenied: false } );
		} );

		test( 'statistics-anonymous allow permits the anonymous ping', () => {
			expect(
				decideChangeActions( 'statistics-anonymous', 'allow', { statistics: 'deny', statisticsAnonymous: 'allow' } )
			).toEqual( { emitOnDenied: true } );
		} );

		test( 'statistics-anonymous deny stops the ping; denies outright while statistics is unanswered', () => {
			expect(
				decideChangeActions( 'statistics-anonymous', 'deny', { statistics: 'deny', statisticsAnonymous: 'deny' } )
			).toEqual( { emitOnDenied: false } );
			expect(
				decideChangeActions( 'statistics-anonymous', 'deny', { statistics: '', statisticsAnonymous: 'deny' } )
			).toEqual( { emitOnDenied: false, setConsent: false } );
		} );

		test( 'unrelated categories and unrecognized values do nothing', () => {
			expect(
				decideChangeActions( 'marketing', 'allow', { statistics: '', statisticsAnonymous: '' } )
			).toEqual( {} );
			expect(
				decideChangeActions( 'statistics', 'maybe', { statistics: '', statisticsAnonymous: '' } )
			).toEqual( {} );
		} );
	} );

	describe( 'lateTypeGrantsConsent', () => {
		test( 'grants for opt-out or undeclared regimes while unanswered', () => {
			expect( lateTypeGrantsConsent( 'optout', { statistics: '', statisticsAnonymous: '' } ) ).toBe( true );
			expect( lateTypeGrantsConsent( '', { statistics: '', statisticsAnonymous: '' } ) ).toBe( true );
			expect( lateTypeGrantsConsent( 'optin', { statistics: '', statisticsAnonymous: '' } ) ).toBe( false );
		} );

		test( 'never overrides a recorded choice', () => {
			expect( lateTypeGrantsConsent( 'optout', { statistics: 'deny', statisticsAnonymous: '' } ) ).toBe( false );
			expect( lateTypeGrantsConsent( 'optout', { statistics: 'allow', statisticsAnonymous: '' } ) ).toBe( false );
			expect( lateTypeGrantsConsent( 'optout', { statistics: '', statisticsAnonymous: 'deny' } ) ).toBe( false );
		} );
	} );
} );

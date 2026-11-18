/**
 * Internal dependencies
 */
import {
	getSettingsFromJson,
} from '../../../../src/content-helper/editor-sidebar/editor-sidebar';

describe( 'getSettingsFromJson', () => {
	afterEach( () => {
		delete ( window as { wpParselyContentHelperSettings?: string } )
			.wpParselyContentHelperSettings;
	} );

	/**
	 * The settings endpoint resolves stored values against its specifications,
	 * so a payload it produced needs no further repair here. These cases cover
	 * the payload not being one.
	 *
	 * @since 3.24.0
	 */
	test( 'should return the defaults when the payload is unparseable', () => {
		const settings = getSettingsFromJson( 'not json' );

		expect( settings.ExcerptSuggestions.Length ).toBe( 160 );
		expect( settings.ExcerptSuggestions.Tone ).toBe( 'neutral' );
		expect( settings.TitleSuggestions.Persona ).toBe( 'journalist' );
	} );

	test( 'should return the defaults when the payload is empty', () => {
		window.wpParselyContentHelperSettings = '[]';

		const settings = getSettingsFromJson();

		expect( settings.ExcerptSuggestions.Length ).toBe( 160 );
		expect( settings.InitialTabName ).toBe( 'tools' );
	} );

	test( 'should keep the defaults when the endpoint returned an error', () => {
		// rest_do_request returns an error as an array, which is injected as-is.
		window.wpParselyContentHelperSettings = JSON.stringify( {
			code: 'rest_forbidden',
			message: 'Sorry, you are not allowed to do that.',
		} );

		const settings = getSettingsFromJson();

		expect( settings.ExcerptSuggestions.Length ).toBe( 160 );
		expect( settings.ExcerptSuggestions.Persona ).toBe( 'journalist' );
		expect( settings.TitleSuggestions.Tone ).toBe( 'neutral' );
	} );

	test( 'should pass a resolved payload through', () => {
		window.wpParselyContentHelperSettings = JSON.stringify( {
			InitialTabName: 'performance',
			ExcerptSuggestions: {
				Length: 220,
				Persona: 'techAnalyst',
				Tone: 'analytical',
			},
		} );

		const settings = getSettingsFromJson();

		expect( settings.InitialTabName ).toBe( 'performance' );
		expect( settings.ExcerptSuggestions ).toEqual( {
			Length: 220,
			Persona: 'techAnalyst',
			Tone: 'analytical',
		} );
	} );
} );

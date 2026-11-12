/**
 * Internal dependencies
 */
import {
	TitleSuggestionsProvider,
} from '../../../src/content-helper/editor-sidebar/title-suggestions/provider';

const mockApiFetch = jest.fn();

jest.mock( '@wordpress/api-fetch', () => ( {
	__esModule: true,
	default: ( options: { path: string } ) => mockApiFetch( options ),
} ) );

describe( 'PCH Title Suggestions provider', () => {
	beforeEach( () => {
		mockApiFetch.mockResolvedValue( { data: [ 'A title.' ] } );
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	/**
	 * Parses the query string off the path the provider requested.
	 *
	 * @since 3.24.0
	 *
	 * @return {URLSearchParams} The request's query parameters.
	 */
	function requestedParams(): URLSearchParams {
		const { path } = mockApiFetch.mock.calls[ 0 ][ 0 ];

		return new URLSearchParams( path.slice( path.indexOf( '?' ) ) );
	}

	test( 'should send the tone as the style parameter the endpoint registers', async () => {
		await TitleSuggestionsProvider.getInstance()
			.generateTitles( 'Post content.', 3, 'formal', 'techAnalyst' );

		const params = requestedParams();

		// Unregistered arguments are dropped silently, so asserting that `style`
		// is present does not on its own prove `tone` is gone.
		expect( params.get( 'style' ) ).toBe( 'formal' );
		expect( params.has( 'tone' ) ).toBe( false );
	} );

	test( 'should send the stored keys rather than the display labels', async () => {
		await TitleSuggestionsProvider.getInstance()
			.generateTitles( 'Post content.', 3, 'formal', 'techAnalyst' );

		const params = requestedParams();

		// `techAnalyst` differs from its label `Tech Analyst` by more than case.
		expect( params.get( 'persona' ) ).toBe( 'techAnalyst' );
		expect( params.get( 'style' ) ).toBe( 'formal' );
	} );

	test( 'should pass a typed custom tone and persona through unchanged', async () => {
		await TitleSuggestionsProvider.getInstance()
			.generateTitles( 'Post content.', 3, 'snarky', 'war reporter' );

		const params = requestedParams();

		expect( params.get( 'style' ) ).toBe( 'snarky' );
		expect( params.get( 'persona' ) ).toBe( 'war reporter' );
	} );

	test( 'should send the limit', async () => {
		await TitleSuggestionsProvider.getInstance()
			.generateTitles( 'Post content.', 5, 'formal', 'techAnalyst' );

		expect( requestedParams().get( 'limit' ) ).toBe( '5' );
	} );
} );

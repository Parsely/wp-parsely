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
	 * Returns the query parameters of the request that was sent.
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
		expect( params.get( 'style' ) ).toBe( 'Formal' );
		expect( params.has( 'tone' ) ).toBe( false );
	} );

	test( 'should send the persona and the limit', async () => {
		await TitleSuggestionsProvider.getInstance()
			.generateTitles( 'Post content.', 5, 'formal', 'techAnalyst' );

		const params = requestedParams();

		expect( params.get( 'persona' ) ).toBe( 'Tech Analyst' );
		expect( params.get( 'limit' ) ).toBe( '5' );
	} );
} );

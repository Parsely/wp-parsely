import {
	ContentHelperError,
	ContentHelperErrorCode,
} from '../../../src/blocks/content-helper/content-helper-error';

describe( 'ContentHelperError class', () => {
	test( 'should set retryFetch to true for query formulation errors', () => {
		const code = ContentHelperErrorCode.CannotFormulateApiQuery;
		expect( getRetryFetch( code ) ).toBe( true );
	} );

	test( 'should set retryFetch to true for API fetch errors', () => {
		const code = ContentHelperErrorCode.FetchError;
		expect( getRetryFetch( code ) ).toBe( true );
	} );

	test( 'should set retryFetch to false for API Forbidden errors', () => {
		const code = ContentHelperErrorCode.ParselyApiForbidden;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'should set retryFetch to false when API response contains error', () => {
		const code = ContentHelperErrorCode.ParselyApiResponseContainsError;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'should set retryFetch to false when API returns no data', () => {
		const code = ContentHelperErrorCode.ParselyApiReturnedNoData;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'should set retryFetch to false when API returns too many results', () => {
		const code = ContentHelperErrorCode.ParselyApiReturnedTooManyResults;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'should set retryFetch to false when the API secret is not set', () => {
		const code = ContentHelperErrorCode.PluginSettingsApiSecretNotSet;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'should set retryFetch to false when the Site ID is not set', () => {
		const code = ContentHelperErrorCode.PluginSettingsSiteIdNotSet;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'should set retryFetch to false when the current post is not published', () => {
		const code = ContentHelperErrorCode.PostIsNotPublished;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'should set retryFetch to true for unknown errors', () => {
		const code = 'Any other error' as ContentHelperErrorCode;
		expect( getRetryFetch( code ) ).toBe( true );
	} );

	/**
	 * Returns the retryFetch property's value for the given error code.
	 *
	 * @param {ContentHelperErrorCode} code The error code to be examined.
	 * @return {boolean} The retryFetch property value.
	 */
	function getRetryFetch( code: ContentHelperErrorCode ): boolean {
		return new ContentHelperError( 'message', code ).retryFetch;
	}
} );

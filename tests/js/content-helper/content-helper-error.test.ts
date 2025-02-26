/**
 * Internal dependencies
 */
import {
	ContentHelperError,
	ContentHelperErrorCode,
} from '../../../src/content-helper/common/content-helper-error';

/**
 * Verifies that the retryFetch property of the ContentHelperErrorCode class
 * gets set to the correct value depending on the error code.
 */
describe( 'ContentHelperError class should set retryFetch to', () => {
	test( 'true when a query formulation error occurs', () => {
		const code = ContentHelperErrorCode.CannotFormulateApiQuery;
		expect( getRetryFetch( code ) ).toBe( true );
	} );

	test( 'true for API fetch errors', () => {
		const code = ContentHelperErrorCode.FetchError;
		expect( getRetryFetch( code ) ).toBe( true );
	} );

	test( 'true for HTTP errors', () => {
		const code = ContentHelperErrorCode.HttpRequestFailed;
		expect( getRetryFetch( code ) ).toBe( true );
	} );

	test( 'false for API Forbidden errors', () => {
		const code = ContentHelperErrorCode.ParselyApiForbidden;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'false when the API response contains an error', () => {
		const code = ContentHelperErrorCode.ParselyApiResponseContainsError;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'false when the API returns no data', () => {
		const code = ContentHelperErrorCode.ParselyApiReturnedNoData;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'false when the API returns too many results', () => {
		const code = ContentHelperErrorCode.ParselyApiReturnedTooManyResults;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'false when the API secret is not set', () => {
		const code = ContentHelperErrorCode.PluginSettingsApiSecretNotSet;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'false when the Site ID is not set', () => {
		const code = ContentHelperErrorCode.PluginSettingsSiteIdNotSet;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'false when the current post is not published', () => {
		const code = ContentHelperErrorCode.PostIsNotPublished;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	test( 'true when an unknown error occurs', () => {
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

/**
 * Internal dependencies
 */
import {
	ContentHelperError,
	ContentHelperErrorCode,
} from '../../../src/content-helper/common/content-helper-error';

/**
 * All the error codes of the ContentHelperErrorCode class.
 */
const errorCodes = [
	ContentHelperErrorCode.AccessToFeatureDisabled,
	ContentHelperErrorCode.FetchError,
	ContentHelperErrorCode.HttpRequestFailed,
	ContentHelperErrorCode.ParselyAborted,
	ContentHelperErrorCode.ParselyApiForbidden,
	ContentHelperErrorCode.ParselyApiResponseContainsError,
	ContentHelperErrorCode.ParselyApiReturnedNoData,
	ContentHelperErrorCode.ParselyApiReturnedTooManyResults,
	ContentHelperErrorCode.PluginCredentialsNotSetMessageDetected,
	ContentHelperErrorCode.PluginSettingsApiSecretNotSet,
	ContentHelperErrorCode.PluginSettingsSiteIdNotSet,
	ContentHelperErrorCode.PostIsNotPublished,
	ContentHelperErrorCode.UnknownError,

	// Suggestions API.
	ContentHelperErrorCode.ParselySuggestionsApiAuthUnavailable,
	ContentHelperErrorCode.ParselySuggestionsApiNoAuthentication,
	ContentHelperErrorCode.ParselySuggestionsApiNoAuthorization,
	ContentHelperErrorCode.ParselySuggestionsApiNoData,
	ContentHelperErrorCode.ParselySuggestionsApiNoDataManualLinking,
	ContentHelperErrorCode.ParselySuggestionsApiOpenAiError,
	ContentHelperErrorCode.ParselySuggestionsApiOpenAiSchema,
	ContentHelperErrorCode.ParselySuggestionsApiOpenAiUnavailable,
	ContentHelperErrorCode.ParselySuggestionsApiResponseValidationError,
	ContentHelperErrorCode.ParselySuggestionsApiSchemaError,
	ContentHelperErrorCode.ParselySuggestionsInvalidRequest,
];

/**
 * Errors that can be retried when encountered (soft errors).
 */
const softErrorCodes = [
	ContentHelperErrorCode.FetchError,
	ContentHelperErrorCode.HttpRequestFailed,
	ContentHelperErrorCode.ParselySuggestionsApiAuthUnavailable,
	ContentHelperErrorCode.ParselySuggestionsApiOpenAiError,
	ContentHelperErrorCode.ParselySuggestionsApiOpenAiSchema,
	ContentHelperErrorCode.ParselySuggestionsApiOpenAiUnavailable,
	ContentHelperErrorCode.ParselySuggestionsApiSchemaError,
];

/**
 * Verifies that all error codes within the ContentHelperErrorCode class are
 * being tested.
 *
 * @since 3.20.4
 */
test( 'All Content Intelligence error codes are being tested', () => {
	expect( Object.values( ContentHelperErrorCode ) ).toEqual( errorCodes );
} );

/**
 * Verifies that the retryFetch property of the ContentHelperErrorCode class
 * gets set to the correct value depending on the error code.
 *
 * @since 3.9.0
 */
describe( 'ContentHelperError class should set retryFetch to', () => {
	/**
	 * Loops through all the error codes and checks if the retryFetch property
	 * is set to true for soft errors and false for hard errors.
	 *
	 * @since 3.9.0
	 * @since 3.20.4 Implemented looping instead of individual testing each error code.
	 */
	errorCodes.forEach( ( code ) => {
		const expected = softErrorCodes.includes( code );

		test( `${ expected } for ${ code }`, () => {
			expect( getRetryFetch( code ) ).toBe( expected );
		} );
	} );

	/**
	 * Returns the retryFetch property's value for a non-registered error code.
	 *
	 * Before version 3.21.0, this test would return true. Since version 3.21.0,
	 * we handle non-registered error codes as hard errors that should return
	 * false.
	 *
	 * @since 3.9.0
	 * @since 3.20.4 Returns false instead of true for non-registered error codes.
	 */
	test( 'false when any other error occurs', () => {
		const code = 'some_other_error_code' as ContentHelperErrorCode;
		expect( getRetryFetch( code ) ).toBe( false );
	} );

	/**
	 * Returns the retryFetch property's value for the given error code.
	 *
	 * @since 3.9.0
	 *
	 * @param {ContentHelperErrorCode} code The error code to be examined.
	 *
	 * @return {boolean} The retryFetch property value.
	 */
	function getRetryFetch( code: ContentHelperErrorCode ): boolean {
		return new ContentHelperError( 'message', code ).retryFetch;
	}
} );

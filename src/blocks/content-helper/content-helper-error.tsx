/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Enumeration of all the possible errors that might get thrown or processed by
 * the Content Helper during error handling. All errors thrown by the Content
 * Helper should start with a "ch_" prefix.
 */
export enum ContentHelperErrorCode {
	CannotFormulateApiQuery = 'ch_cannot_formulate_api_query',
	FetchError = 'fetch_error', // apiFetch() failure, possibly caused by ad blocker.
	ParselyApiForbidden = 403, // Intentionally without quotes.
	ParselyApiResponseContainsError = 'ch_response_contains_error',
	ParselyApiReturnedNoData = 'ch_parsely_api_returned_no_data',
	ParselyApiReturnedTooManyResults = 'ch_parsely_api_returned_too_many_results',
	PluginCredentialsNotSetMessageDetected = 'parsely_credentials_not_set_message_detected',
	PluginSettingsApiSecretNotSet = 'parsely_api_secret_not_set',
	PluginSettingsSiteIdNotSet = 'parsely_site_id_not_set',
	PostIsNotPublished = 'ch_post_not_published',
}

/**
 * Defines the props structure for ContentHelperErrorMessage.
 *
 * @since 3.9.0
 *
 */
interface ContentHelperErrorMessageProps {
	children?: string;
	className?: string;
	testId?: string
}

/**
 * Returns an error message JSX Element that can contain HTML.
 *
 * Warning: Any HTML passed to this function must be sanitized.
 *
 * @since 3.9.0
 *
 * @param {ContentHelperErrorMessageProps} props The error message props.
 *
 * @return {JSX.Element} The error message JSX Element.
 */
const ContentHelperErrorMessage = (
	props: ContentHelperErrorMessageProps|null = null
): JSX.Element => {
	let innerHtml = '';
	if ( props?.children ) {
		innerHtml = props.children;
	}

	let classNames = 'content-helper-error-message';
	if ( props?.className ) {
		classNames += ' ' + props.className;
	}

	return (
		<div className={ classNames }
			data-testid={ props?.testId }
			dangerouslySetInnerHTML={ { __html: innerHtml } }
		/>
	);
};

/**
 * Returns a customized error message JSX Element for when credentials are
 * empty.
 *
 * @since 3.9.0
 *
 * @param {ContentHelperErrorMessageProps|null} props The error message props.
 *
 * @return {JSX.Element} The error message JSX Element.
 */
const EmptyCredentialsMessage = (
	props: ContentHelperErrorMessageProps|null = null
): JSX.Element => {
	return (
		<ContentHelperErrorMessage
			className={ props?.className }
			testId="empty-credentials-message">
			{ window.wpParselyEmptyCredentialsMessage }
		</ContentHelperErrorMessage>
	);
};

/**
 * Returns the passed JSX Element or an error message JSX Element if credentials
 * are empty.
 *
 * @since 3.9.0
 *
 * @param {JSX.Element}                         element The desired JSX element.
 * @param {ContentHelperErrorMessageProps|null} props   The error message props.
 *
 * @return {JSX.Element} The passed JSX Element or the error message JSX Element.
 */
export const ElementOrEmptyCredentialsMessage = (
	element: JSX.Element,
	props: ContentHelperErrorMessageProps|null = null
): JSX.Element => {
	if ( window.wpParselyEmptyCredentialsMessage ) {
		return EmptyCredentialsMessage( props );
	}

	return element;
};

/**
 * Extends the standard JS Error class for use with the Content Helper.
 *
 * @see https://github.com/microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
 */
export class ContentHelperError extends Error {
	protected code: ContentHelperErrorCode;
	protected hint: string | null = null;
	public retryFetch: boolean;

	constructor( message: string, code: ContentHelperErrorCode, prefix = __( 'Error: ', 'wp-parsely' ) ) {
		super( prefix + message );
		this.name = this.constructor.name;
		this.code = code;

		// Errors for which we should not retry a fetch operation.
		const noRetryFetchErrors: Array<ContentHelperErrorCode> = [
			ContentHelperErrorCode.ParselyApiForbidden,
			ContentHelperErrorCode.ParselyApiResponseContainsError,
			ContentHelperErrorCode.ParselyApiReturnedNoData,
			ContentHelperErrorCode.ParselyApiReturnedTooManyResults,
			ContentHelperErrorCode.PluginCredentialsNotSetMessageDetected,
			ContentHelperErrorCode.PluginSettingsApiSecretNotSet,
			ContentHelperErrorCode.PluginSettingsSiteIdNotSet,
			ContentHelperErrorCode.PostIsNotPublished,
		];

		this.retryFetch = ! noRetryFetchErrors.includes( this.code );

		// Set the prototype explicitly.
		Object.setPrototypeOf( this, ContentHelperError.prototype );
	}

	/**
	 * Renders the error's message.
	 *
	 * @param {ContentHelperErrorMessageProps|null} props The props needed for the function.
	 *
	 * @return {JSX.Element} The resulting JSX Element.
	 */
	public Message( props: ContentHelperErrorMessageProps|null = null ): JSX.Element {
		// Handle cases where credentials are not set.
		const CredentialsNotSetErrorCodes = [
			ContentHelperErrorCode.PluginCredentialsNotSetMessageDetected,
			ContentHelperErrorCode.PluginSettingsSiteIdNotSet,
			ContentHelperErrorCode.PluginSettingsApiSecretNotSet,
		];
		if ( CredentialsNotSetErrorCodes.includes( this.code ) ) {
			return EmptyCredentialsMessage( props );
		}

		// Errors that need a hint.
		if ( this.code === ContentHelperErrorCode.FetchError ) {
			this.hint = this.Hint( __(
				'This error can sometimes be caused by ad-blockers or browser tracking protections. Please add this site to any applicable allow lists and try again.',
				'wp-parsely'
			) );
		}
		if ( this.code === ContentHelperErrorCode.ParselyApiForbidden ) {
			this.hint = this.Hint( __(
				"Please ensure that the Site ID and API Secret given in the plugin's settings are correct.",
				'wp-parsely'
			) );
		}

		return (
			<ContentHelperErrorMessage
				className={ props?.className }
				testId="error">
				{ `<p>${ this.message }</p>${ this.hint ? this.hint : '' }` }
			</ContentHelperErrorMessage>
		);
	}

	/**
	 * Shows a hint in order to provide clarity in regards to the error.
	 *
	 * @param {string} hint The hint to display
	 */
	protected Hint( hint: string ): string {
		return `<p className="content-helper-error-message-hint" data-testid="content-helper-error-message-hint"><strong>${ __( 'Hint:', 'wp-parsely' ) }</strong> ${ hint }</p>`;
	}
}

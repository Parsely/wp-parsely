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
	ApiNoData = 'ch_api_no_data',
	ApiTooManyResults = 'ch_api_too_many_results',
	FetchError = 'fetch_error', // apiFetch() failure, possibly caused by ad blocker.
	PostNotPublished = 'ch_post_not_published',
	ResponseError = 'ch_response_error',
}

/**
 * Extends the standard JS Error class with an error code field and an optional
 * prefix to the error message.
 *
 * @see https://github.com/microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
 */
export class ContentHelperError extends Error {
	public code: string;
	public prefix: string;

	constructor( message: string, code: string, prefix = __( 'Error: ', 'wp-parsely' ) ) {
		super( prefix + message );
		this.name = this.constructor.name;
		this.code = code;

		// Set the prototype explicitly.
		Object.setPrototypeOf( this, ContentHelperError.prototype );
	}
}

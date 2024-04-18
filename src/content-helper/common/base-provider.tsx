/**
 * WordPress dependencies
 */
// eslint-disable-next-line import/named
import apiFetch, { APIFetchOptions } from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ContentHelperError, ContentHelperErrorCode } from './content-helper-error';

/**
 * The response structure of the API.
 *
 * @since 3.15.0
 */
export interface ContentHelperAPIResponse<T> {
	error?: Error;
	data: T;
}

export abstract class BaseProvider {
	/**
	 * The AbortController instance used to cancel the fetch request.
	 *
	 * @since 3.15.0
	 */
	private static abortController: AbortController = new AbortController();

	/**
	 * Cancels the fetch request.
	 *
	 * @since 3.15.0
	 */
	public static cancelRequest(): void {
		BaseProvider.abortController.abort();
		BaseProvider.abortController = new AbortController();
	}

	/**
	 * Fetches data from the API. Either resolves with the data or rejects with an error.
	 *
	 * This method is a wrapper around apiFetch() that automatically adds the AbortController signal.
	 *
	 * @param { APIFetchOptions } options The options to pass to apiFetch
	 *
	 * @return { Promise<ContentHelperAPIResponse<any>> } The fetched data
	 */
	protected static async fetch<T>( options: APIFetchOptions ): Promise<T> {
		options.signal = BaseProvider.abortController.signal;
		try {
			const response = await apiFetch<ContentHelperAPIResponse<T>>( options );

			// Validate API side errors.
			if ( response.error ) {
				return Promise.reject(
					new ContentHelperError(
						response.error.message,
						ContentHelperErrorCode.ParselyApiResponseContainsError,
					),
				);
			}

			return response.data;
		} catch ( wpError: any ) { // eslint-disable-line @typescript-eslint/no-explicit-any
			if ( wpError.name === 'AbortError' ) {
				return Promise.reject(
					new ContentHelperError(
						__( 'The operation was aborted.', 'wp-parsely' ),
						ContentHelperErrorCode.ParselyAborted,
					),
				);
			}
			return Promise.reject( new ContentHelperError( wpError.message, wpError.code ) );
		}
	}
}

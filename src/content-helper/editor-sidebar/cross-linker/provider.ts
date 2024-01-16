/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { ContentHelperError, ContentHelperErrorCode } from '../../common/content-helper-error';

/**
 * Structure of a link suggestion returned by the
 * `content-suggestions/suggest-links` endpoint.
 *
 * @since 3.14.0
 */
export type LinkSuggestion = {
	href: string;
	text: string;
	title: string;
	offset: number;
};

/**
 * Specifies the form of the response returned by the
 * `content-suggestions/suggest-links` WordPress REST API endpoint.
 *
 * @since 3.14.0
 */
interface CrossLinkerApiResponse {
	error?: Error;
	data: LinkSuggestion[];
}

/**
 * Returns data from the `content-suggestions/suggest-links` WordPress REST API
 * endpoint.
 *
 * @since 3.14.0
 */
export class CrossLinkerProvider {
	/**
	 * Returns a list of suggested links for the given content.
	 *
	 * @param {string} content         The content to generate links for.
	 * @param {number} maxLinkLength   The maximum length of the links to return.
	 * @param {number} maxLinksPerPost The maximum number of links to return.
	 *
	 * @return {Promise<LinkSuggestion[]>} The resulting list of links.
	 */
	static async generateCrossLinks(
		content: string,
		maxLinkLength: number = 4,
		maxLinksPerPost: number = 10,
	): Promise<LinkSuggestion[]> {
		let response;

		try {
			response = await apiFetch<CrossLinkerApiResponse>( {
				method: 'POST',
				path: addQueryArgs( '/wp-parsely/v1/content-suggestions/suggest-links', {
					max_link_length: maxLinkLength,
					max_links: maxLinksPerPost,
				} ),
				data: {
					content,
				},
			} );
		} catch ( wpError: any ) { // eslint-disable-line @typescript-eslint/no-explicit-any
			return Promise.reject( new ContentHelperError( wpError.message, wpError.code ) );
		}

		if ( response?.error ) {
			return Promise.reject(
				new ContentHelperError(
					response.error.message,
					ContentHelperErrorCode.ParselyApiResponseContainsError,
				),
			);
		}

		return response.data ?? [];
	}
}

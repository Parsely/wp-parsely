/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { ContentHelperError, ContentHelperErrorCode } from '../../common/content-helper-error';
import { DEFAULT_MAX_LINK_WORDS, DEFAULT_MAX_LINKS } from './smart-linking';

/**
 * Structure of a link suggestion returned by the
 * `content-suggestions/suggest-linked-reference` endpoint.
 *
 * @since 3.14.0
 */
export type LinkSuggestion = {
	href: string;
	text: string;
	title: string;
	offset: number;
	linked?: boolean;
};

/**
 * Specifies the form of the response returned by the
 * `content-suggestions/suggest-linked-reference` WordPress REST API endpoint.
 *
 * @since 3.14.0
 */
interface SmartLinkingApiResponse {
	error?: Error;
	data: LinkSuggestion[];
}

/**
 * Returns data from the `content-suggestions/suggest-linked-reference` WordPress REST API
 * endpoint.
 *
 * @since 3.14.0
 */
export class SmartLinkingProvider {
	/**
	 * Returns a list of suggested links for the given content.
	 *
	 * @param {string} content         The content to generate links for.
	 * @param {number} maxLinkWords    The maximum number of words in links.
	 * @param {number} maxLinksPerPost The maximum number of links to return.
	 *
	 * @return {Promise<LinkSuggestion[]>} The resulting list of links.
	 */
	static async generateSmartLinks(
		content: string,
		maxLinkWords: number = DEFAULT_MAX_LINK_WORDS,
		maxLinksPerPost: number = DEFAULT_MAX_LINKS,
	): Promise<LinkSuggestion[]> {
		let response;
		return[
			{
				"href": "http:\/\/wpvip.com\/2023\/06\/09\/best-practices-for-building-an-enterprise-wordpress-website\/",
				"title": "best practices for building an enterprise wordpress website",
				"text": "enterprise-level solutions",
				"offset": 0
			},
			{
				"href": "http:\/\/wpvip.com\/2023\/08\/28\/optimize-developer-experience\/",
				"title": "meet our new tools to optimize the developer experience",
				"text": "The VIP Experience",
				"offset": 0
			},
			{
				"href": "http:\/\/wpvip.com\/2022\/08\/03\/wordpress-vip-top-tier-review-signal\/",
				"title": "when speed, performance, and uptime count, wordpress vip is again a top tier choice",
				"text": "Scalability",
				"offset": 0
			},
			{
				"href": "http:\/\/wpvip.com\/2023\/03\/13\/boosting-front-end-site-performance-on-wordpress\/",
				"title": "boosting front end site performance on wordpress",
				"text": "Performance Optimization",
				"offset": 0
			},
			{
				"href": "http:\/\/wpvip.com\/2023\/07\/19\/wordpress-security-features\/",
				"title": "security 1",
				"text": "Security",
				"offset": 0
			},
			{
				"href": "http:\/\/wpvip.com\/2023\/07\/19\/wordpress-security-features\/",
				"title": "security 2",
				"text": "Security",
				"offset": 1
			}
		];
		try {
			response = await apiFetch<SmartLinkingApiResponse>( {
				method: 'POST',
				path: addQueryArgs( '/wp-parsely/v1/content-suggestions/suggest-linked-reference', {
					max_link_words: maxLinkWords,
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

/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { BaseProvider } from '../../common/base-provider';
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
};

/**
 * Returns data from the `content-suggestions/suggest-linked-reference` WordPress REST API
 * endpoint.
 *
 * @since 3.14.0
 */
export class SmartLinkingProvider extends BaseProvider {
	/**
	 * Returns a list of suggested links for the given content.
	 *
	 * @param {string}   content          The content to generate links for.
	 * @param {number}   maxLinkWords     The maximum number of words in links.
	 * @param {number}   maxLinksPerPost  The maximum number of links to return.
	 * @param {string[]} urlExclusionList A list of URLs to exclude from the suggestions.
	 *
	 * @return {Promise<LinkSuggestion[]>} The resulting list of links.
	 */
	static async generateSmartLinks(
		content: string,
		maxLinkWords: number = DEFAULT_MAX_LINK_WORDS,
		maxLinksPerPost: number = DEFAULT_MAX_LINKS,
		urlExclusionList: string[] = [],
	): Promise<LinkSuggestion[]> {
		const response = await BaseProvider.fetch<LinkSuggestion[]>( {
			method: 'POST',
			path: addQueryArgs( '/wp-parsely/v1/content-suggestions/suggest-linked-reference', {
				max_link_words: maxLinkWords,
				max_links: maxLinksPerPost,
			} ),
			data: {
				url_exclusion_list: urlExclusionList,
				text: content,
			},
		} );

		return response ?? [];
	}
}

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
	uid?: string;
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
	 * The singleton instance of the SmartLinkingProvider.
	 *
	 * @since 3.15.0
	 */
	private static instance: SmartLinkingProvider;

	/**
	 * Returns the singleton instance of the SmartLinkingProvider.
	 *
	 * @since 3.15.0
	 *
	 * @return {SmartLinkingProvider} The singleton instance.
	 */
	public static getInstance(): SmartLinkingProvider {
		if ( ! this.instance ) {
			this.instance = new SmartLinkingProvider();
		}
		return this.instance;
	}

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
	public async generateSmartLinks(
		content: string,
		maxLinkWords: number = DEFAULT_MAX_LINK_WORDS,
		maxLinksPerPost: number = DEFAULT_MAX_LINKS,
		urlExclusionList: string[] = [],
	): Promise<LinkSuggestion[]> {
		return [
			{
				uid: '9befadbab33de885cf9a739ab0b50f0d',
				href: 'http:\/\/wpvip.com\/2022\/06\/08\/wordpress-myths\/',
				title: 'busting 10 myths about wordpress and wordpress vip',
				text: 'WordPress VIP is the gold standard',
				offset: 0,
			},
			{
				uid: '74217439c37f4659e1e7ae8fb328e11d',
				href: 'http:\/\/wpvip.com\/2022\/11\/02\/avoiding-cms-disaster-raising-your-wordpress-security-to-the-next-level\/',
				title: 'avoiding cms disaster: raising your wordpress security to the next level',
				text: 'Its core strengths lie in',
				offset: 0,
			},
			{
				uid: '9b4b3a564dcce2235a30907b9e2a9c98',
				href: 'http:\/\/wpvip.com\/2021\/04\/09\/how-the-wordpress-gutenberg-block-editor-empowers-enterprise-content-creators\/',
				title: 'how the wordpress gutenberg block editor empowers enterprise content creators',
				text: 'a robust suite of digital publishing tools',
				offset: 0,
			},
		];

		const response = await this.fetch<LinkSuggestion[]>( {
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

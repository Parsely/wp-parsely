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
	applied: boolean;
	match?: LinkSuggestionMatch;
};

/**
 * Structure of a link suggestion match, that is filled in by the
 * processing of the smart links.
 */
export type LinkSuggestionMatch = {
	blockId: string;
	startAt: number;
	endAt: number;
}

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
		/*return [
			{
				uid: '3ba4e35e2eca3002207b63fac3c0911b',
				href: 'http:\/\/wpvip.com\/2021\/12\/23\/secure-wordpress-hosting\/',
				title: 'a guide to choosing the most secure wordpress hosting',
				text: 'WordPress Enterprise',
				offset: 0,
			},
			{
				uid: '883f036bec79f24dc79ca9c75d7bb2e9',
				href: 'http:\/\/wpvip.com\/2023\/02\/16\/wordpress-org-vs-wordpress-com-vs-wordpress-vip-whats-the-difference\/',
				title: 'wordpress.org vs wordpress.com vs wordpress vip: what\u2019s the difference?',
				text: 'VIP Experience',
				offset: 0,
			},
			{
				uid: '5a61bc47559692a0ec91a15447430568',
				href: 'http:\/\/wpvip.com\/2022\/06\/08\/wordpress-myths\/',
				title: 'busting 10 myths about wordpress and wordpress vip',
				text: 'Scalability',
				offset: 0,
			},
			{
				uid: '83c8256011779fb29ea33b42251fb993',
				href: 'http:\/\/wpvip.com\/2021\/05\/20\/wordpress-vip-is-fedramp-authorized\/',
				title: 'wordpress vip is fedramp authorized',
				text: 'Security',
				offset: 0,
			},
		];*/
		/*return [
			{
				uid: 'cf71c5c475bc7578013b7e6234832de4',
				href: 'http:\/\/wpvip.com\/2023\/02\/16\/wordpress-org-vs-wordpress-com-vs-wordpress-vip-whats-the-difference\/',
				title: 'wordpress.org vs wordpress.com vs wordpress vip: what\u2019s the difference?',
				text: 'WordPress Enterprise',
				offset: 0,
				applied: false,
			},
			{
				uid: 'f16cb0363e8705c4d2e8f7c94412b192',
				href: 'http:\/\/wpvip.com\/2023\/02\/16\/wordpress-org-vs-wordpress-com-vs-wordpress-vip-whats-the-difference\/',
				title: 'wordpress.org vs wordpress.com vs wordpress vip: what\u2019s the difference?',
				text: 'WordPress VIP',
				offset: 1,
				applied: false,
			},
			{
				uid: '8809b316cced142250c66d35d2681f1e',
				href: 'http:\/\/wpvip.com\/2022\/06\/08\/wordpress-myths\/',
				title: 'busting 10 myths about wordpress and wordpress vip',
				text: 'scalability',
				offset: 0,
				applied: false,
			},
			{
				uid: '0ecd03591abebc70c1b9ee6a8110b9a3',
				href: 'http:\/\/wpvip.com\/2021\/12\/23\/secure-wordpress-hosting\/',
				title: 'a guide to choosing the most secure wordpress hosting',
				text: 'custom development, security, scalability, and high performance',
				offset: 0,
				applied: false,
			},
		];*/
		return [
			{
				uid: '6e507388132fe7a97f2efac112ed2ebd',
				href: 'http:\/\/wpvip.com\/2021\/12\/23\/secure-wordpress-hosting\/',
				title: 'a guide to choosing the most secure wordpress hosting',
				text: 'platform',
				offset: 0,
				applied: false,
			},
			{
				uid: 'db7a115cc2ef900f2c066a897db4cf28',
				href: 'http:\/\/wpvip.com\/2021\/06\/14\/yet-another-top-tier-award-for-wordpress-vip-in-hosting-performance-review\/',
				title: '\u201cyet another\u201d top tier award for wordpress vip in hosting performance review',
				text: 'performance',
				offset: 1,
				applied: false,
			},
			{
				uid: '751b0938f1ecc0ae17f1bc196c42ba98',
				href: 'http:\/\/wpvip.com\/2021\/09\/15\/six-questions-with-zephr-about-first-party-data-and-the-customer-journey\/',
				title: 'six questions with zephr about first-party data and the customer journey',
				text: 'performance',
				offset: 0,
				applied: false,
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

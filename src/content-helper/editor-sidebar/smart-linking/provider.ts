/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { BaseProvider } from '../../common/base-provider';
import { DEFAULT_MAX_LINKS } from './smart-linking';

/**
 * Structure of a link suggestion returned by the
 * `content-suggestions/suggest-linked-reference` endpoint.
 *
 * @since 3.14.0
 * @since 3.16.0 Added the `applied`, `match`, `post_id`, and `post_type` properties.
 */
export type SmartLink = {
	uid: string;
	href: string;
	text: string;
	title: string;
	offset: number;
	applied: boolean;
	match?: SmartLinkMatch;
	post_id?: number|false;
	post_type?: string;
};

/**
 * Structure of a link suggestion match, that is filled in by the
 * processing of the smart links.
 *
 * @since 3.16.0
 */
export type SmartLinkMatch = {
	blockId: string;
	blockPosition: number;
	blockOffset: number;
	blockLinkPosition: number;
}

/**
 * Returns data from the `content-suggestions/suggest-linked-reference`
 * WordPress REST API endpoint.
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
	 * @param {number}   maxLinksPerPost  The maximum number of links to return.
	 * @param {string[]} urlExclusionList A list of URLs to exclude from the suggestions.
	 *
	 * @return {Promise<SmartLink[]>} The resulting list of links.
	 */
	public async generateSmartLinks(
		content: string,
		maxLinksPerPost: number = DEFAULT_MAX_LINKS,
		urlExclusionList: string[] = [],
	): Promise<SmartLink[]> {
		const response = await this.fetch<SmartLink[]>( {
			method: 'POST',
			path: addQueryArgs( '/wp-parsely/v1/content-suggestions/suggest-linked-reference', {
				max_links: maxLinksPerPost,
			} ),
			data: {
				url_exclusion_list: urlExclusionList,
				text: content,
			},
		} );

		return response ?? [];
	}

	public async addSmartLink( postID: number, linkSuggestion: SmartLink ) {
		// /wp-parsely/v1/smart-linking/[post-id]/add
		const response = await this.fetch<SmartLink>( {
			method: 'POST',
			path: `/wp-parsely/v1/smart-linking/${ postID }/add`,
			data: {
				link: linkSuggestion,
			},
		} );

		return response;
	}

	/**
	 * Get the post type of post by its URL.
	 *
	 * @since 3.16.0
	 *
	 * @param {string} url The URL of the post.
	 *
	 * @return {Promise<string>} The post type of the post.
	 */
	public async getPostTypeByURL( url: string ): Promise<string> {
		const response = await this.fetch<{ post_type: string }>( {
			method: 'POST',
			path: '/wp-parsely/v1/smart-linking/url-to-post-type',
			data: {
				url,
			},
		} );

		return response.post_type;
	}
}

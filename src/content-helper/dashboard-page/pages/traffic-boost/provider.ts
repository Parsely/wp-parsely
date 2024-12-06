import { BaseWordPressProvider, HydratedPost } from '../../../common/base-wordpress-provider';
import { InboundSmartLink } from '../../../editor-sidebar/smart-linking/provider';

/**
 * Represents a Traffic Boost link.
 *
 * Stores the target post and the smart link associated with it.
 *
 * @since 3.18.0
 */
export interface TrafficBoostLink {
    targetPost: HydratedPost;
    smart_link?: InboundSmartLink;
    isSuggestion: boolean;
}

/**
 * Represents the response from the Get Smart Links endpoint.
 *
 * @since 3.18.0
 */
export interface GetSmartLinksResponse {
    data: {
        inbound: InboundSmartLink[];
        outbound: never[];
    };
}

/**
 * Traffic Boost provider class.
 *
 * Provides methods to fetch Traffic Boost links and inbound smart links,
 * and to generate boost links.
 *
 * @since 3.18.0
 */
/**
 * Returns data from the WordPress REST API endpoints related to Traffic Boost functionality.
 *
 * @since 3.18.0
 */
export class TrafficBoostProvider extends BaseWordPressProvider {
	/**
	 * The singleton instance of the TrafficBoostProvider.
	 *
	 * @since 3.18.0
	 */
	protected static instance: TrafficBoostProvider;

	/**
	 * Returns the singleton instance of the TrafficBoostProvider.
	 *
	 * @since 3.18.0
	 *
	 * @return {TrafficBoostProvider} The singleton instance.
	 */
	public static getInstance(): TrafficBoostProvider {
		if ( ! TrafficBoostProvider.instance ) {
			TrafficBoostProvider.instance = new TrafficBoostProvider();
		}
		return TrafficBoostProvider.instance as TrafficBoostProvider;
	}

	/**
	 * Generates boost link suggestions for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {number} postId The ID of the post to generate boost links for.
	 *
	 * @return {Promise<TrafficBoostLink[]>} The list of boost link suggestions.
	 */
	public async generateBoostLinks( postId: number ): Promise<TrafficBoostLink[]> {
		// As a mockup, this method right now will fetch the WordPress API and return a random number of posts.
		const fetchedPosts = await this.getPosts( {
			page: 1,
			per_page: 10,
			exclude: [ postId ],
			order: 'asc',
			orderby: 'date',
		} );

		return fetchedPosts.data.map( ( post ) => ( {
			targetPost: post,
			isSuggestion: true,
		} ) );
	}

	/**
	 * Gets the inbound smart links for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {number} postId The ID of the post to get inbound smart links for.
	 *
	 * @return {Promise<InboundSmartLink[]>} The list of inbound smart links.
	 */
	public async getInboundSmartLinks( postId: number ): Promise<InboundSmartLink[]> {
		const requestPath = `/wp-parsely/v2/content-helper/smart-linking/${ postId }/get`;

		const inboundSmartLinks = await this.fetch<GetSmartLinksResponse>( {
			path: requestPath,

		} );

		return inboundSmartLinks.data.inbound;
	}

	/**
	 * Gets the boost links for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {number} postId The ID of the post to get boost links for.
	 *
	 * @return {Promise<TrafficBoostLink[]>} The list of boost links.
	 */
	public async getBoostLinks( postId: number ): Promise<TrafficBoostLink[]> {
		// Request inbound smart links for the post.
		const inboundSmartLinks = await this.getInboundSmartLinks( postId );

		// Now we need to fetch the posts for the inbound smart links.
		const fetchedPosts = await this.getPosts( {
			include: inboundSmartLinks.map( ( link ) => link.source?.post_id ),
			posts_per_page: 100,
		} );

		if ( fetchedPosts.total_items > 100 ) {
			// eslint-disable-next-line no-console
			console.warn( 'Parse.ly: More than 100 inbound smart links. This is not supported yet.' );
		}

		return fetchedPosts.data.map( ( post ) => ( {
			targetPost: post,
			smart_link: inboundSmartLinks.find( ( link ) => link.source?.post_id === post.id ),
			isSuggestion: false,
		} ) );
	}
}

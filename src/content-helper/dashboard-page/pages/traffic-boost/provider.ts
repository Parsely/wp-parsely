/**
 * Internal dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseWordPressProvider, HydratedPost } from '../../../common/base-wordpress-provider';
import { ContentHelperError, ContentHelperErrorCode } from '../../../common/content-helper-error';
import { InboundSmartLink } from '../../../editor-sidebar/smart-linking/provider';

/**
 * Represents a Traffic Boost link.
 *
 * Stores the target post and the smart link associated with it.
 *
 * @since 3.18.0
 */
export interface TrafficBoostLink {
	uid: string;
	targetPost: HydratedPost;
	smartLink?: InboundSmartLink;
	isSuggestion: boolean;
}

/**
 * Represents the response from the Generate Suggestions endpoint.
 *
 * @since 3.18.0
 */
interface InboundSmartLinkDataResponse {
	data: InboundSmartLink[];
}

/**
 * Represents the response from the Generate Placement endpoint.
 *
 * @since 3.18.0
 */
interface InboundSmartLinkPlacementResponse {
	data: InboundSmartLink;
}

/**
 * Represents the response from the Discard Suggestions endpoint.
 *
 * @since 3.18.0
 */
interface DiscardSuggestionsResponse {
	success: number;
	failed: number;
}

/**
 * Represents a success response.
 *
 * @since 3.18.0
 */
interface SuccessResponse {
	data: {
		success: boolean;
	};
}

/**
 * Represents an error response.
 *
 * @since 3.18.0
 */
interface ErrorResponse {
	error: string;
	message: string;
	data: object;
}

/**
 * Represents the response from the Accept Suggestion endpoint.
 *
 * @since 3.18.0
 */
type AcceptSuggestionResponse = {
	data: {
		did_replace_link?: boolean;
		post_content: string;
	};
} & ( SuccessResponse & ErrorResponse );

/**
 * Represents the response from the Update Inbound Link endpoint.
 *
 * @since 3.18.0
 */
type UpdateInboundLinkResponse = {
	data: {
		smart_link: InboundSmartLink;
		restore_original: boolean;
		did_replace_link: boolean;
		post_content: string;
	};
} & ( SuccessResponse & ErrorResponse );

/**
 * Represents the return value from the acceptSuggestion method.
 *
 * @since 3.18.0
 */
type AcceptSuggestionReturn = {
	success: boolean;
	didReplaceLink: boolean;
	postContent: string;
};

/**
 * Represents the response from the Discard Suggestion endpoint.
 *
 * @since 3.18.0
 */
type DiscardSuggestionResponse = SuccessResponse & ErrorResponse;

/**
 * Traffic Boost provider class.
 *
 * Provides methods to fetch Traffic Boost links and inbound smart links,
 * and to generate boost links.
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
		return TrafficBoostProvider.instance;
	}

	/**
	 * Gets the existing suggestions for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {number} postId The ID of the post to get suggestions for.
	 *
	 * @return {Promise<TrafficBoostLink[]>} The list of existing suggestions.
	 */
	public async getExistingSuggestions( postId: number ): Promise<TrafficBoostLink[]> {
		const response = await this.fetch<InboundSmartLinkDataResponse>( {
			method: 'GET',
			path: `/wp-parsely/v2/content-helper/traffic-boost/${ postId }/get-suggestions`,
		} );

		const postIds = response.data.map( ( inboundSmartLink ) => inboundSmartLink.source?.post_id );

		if ( postIds.length === 0 ) {
			return [];
		}

		return this.createTrafficBoostLinks( response.data );
	}

	/**
	 * Generates suggestions for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {number}  postId                   The ID of the post to generate suggestions for.
	 * @param {Object}  options                  The options for the suggestions.
	 * @param {number}  options.max_items        The maximum number of items to generate.
	 * @param {boolean} options.discard_previous Whether to discard previous suggestions.
	 * @param {boolean} options.save             Whether to save the suggestions.
	 *
	 * @return {Promise<TrafficBoostLink[]>} The list of suggestions.
	 */
	public async generateSuggestions(
		postId: number,
		options?: {
			max_items?: number;
			save?: boolean;
			discard_previous?: boolean;
		},
	): Promise<TrafficBoostLink[]> {
		const response = await this.fetch<InboundSmartLinkDataResponse>( {
			method: 'POST',
			path: `/wp-parsely/v2/content-helper/traffic-boost/${ postId }/generate`,
			data: {
				max_items: options?.max_items ?? 10,
				save: options?.save ?? false,
			},
		} );

		// Filter out any smart links that are not valid.
		const validSmartLinks = response.data.filter( ( inboundSmartLink ) => inboundSmartLink.validation?.valid );

		return this.createTrafficBoostLinks( validSmartLinks );
	}

	/**
	 * Generates a placement suggestion for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {HydratedPost}     sourcePost       The source post.
	 * @param {HydratedPost}     destinationPost  The destination post.
	 * @param {TrafficBoostLink} trafficBoostLink The traffic boost link to generate a placement for.
	 * @param {string[]}         ignoreKeywords   The keywords to ignore.
	 *
	 * @return {Promise<TrafficBoostLink>} The generated suggestion.
	 */
	public async generateSuggestionForPost(
		sourcePost: HydratedPost,
		destinationPost: HydratedPost,
		trafficBoostLink: TrafficBoostLink,
		ignoreKeywords?: string[],
	): Promise<TrafficBoostLink> {
		const requestPath = `/wp-parsely/v2/content-helper/traffic-boost/${ sourcePost.id }/generate-placement/${ destinationPost.id }`;

		const response = await this.fetch<InboundSmartLinkPlacementResponse>( {
			method: 'POST',
			path: requestPath,
			data: {
				ignore_keywords: ignoreKeywords,
			},
		} );

		if ( ! response.data ) {
			throw new ContentHelperError(
				__( 'Couldn\'t find a good link placement.', 'wp-parsely' ),
				ContentHelperErrorCode.UnknownError,
				''
			);
		}

		trafficBoostLink.smartLink = response.data;

		return trafficBoostLink;
	}

	/**
	 * Removes an inbound link from a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {number}  postId          The ID of the post to remove the inbound link from.
	 * @param {number}  smartLinkId     The ID of the inbound smart link to remove.
	 * @param {boolean} restoreOriginal Whether to restore the original link.
	 *
	 * @return {Promise<boolean>} Whether the inbound link was removed.
	 */
	public async removeInboundLink( postId: number, smartLinkId: number, restoreOriginal: boolean ): Promise<boolean> {
		const requestPath = `/wp-parsely/v2/content-helper/traffic-boost/${ postId }/delete-inbound/${ smartLinkId }`;

		const response = await this.fetch<SuccessResponse>( {
			method: 'DELETE',
			path: requestPath,
			data: {
				restore_original: restoreOriginal,
			},
		} );

		return response.data.success;
	}

	/**
	 * Updates an inbound smart link.
	 *
	 * @since 3.18.0
	 *
	 * @param {number}  postId                   The ID of the post to update the inbound smart link for.
	 * @param {number}  smartLinkId              The ID of the inbound smart link to update.
	 * @param {Object}  options                  The options to pass to the API.
	 * @param {string}  options.text             The new text of the smart link.
	 * @param {boolean} options.restore_original Whether to restore the original link.
	 * @param {number}  options.offset           The new offset of the smart link.
	 *
	 * @return {Promise<boolean>} Whether the inbound smart link was updated.
	 */
	public async updateInboundLink(
		postId: number,
		smartLinkId: number,
		options: {
			text?: string;
			offset?: number;
			restore_original?: boolean;
		} ): Promise<UpdateInboundLinkResponse> {
		const requestPath = `/wp-parsely/v2/content-helper/traffic-boost/${ postId }/update-inbound/${ smartLinkId }`;

		const response = await this.fetch<UpdateInboundLinkResponse>( {
			method: 'POST',
			path: requestPath,
			data: options,
		} );

		return response;
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
		const requestPath = `/wp-parsely/v2/content-helper/traffic-boost/${ postId }/get-inbound`;

		const inboundSmartLinks = await this.fetch<InboundSmartLinkDataResponse>( {
			path: requestPath,
		} );

		return inboundSmartLinks.data;
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
	public async getInboundLinks( postId: number ): Promise<TrafficBoostLink[]> {
		// Request inbound smart links for the post.
		const inboundSmartLinks = await this.getInboundSmartLinks( postId );

		if ( inboundSmartLinks.length === 0 ) {
			return [];
		}

		return this.createTrafficBoostLinks( inboundSmartLinks );
	}

	/**
	 * Accepts a suggestion for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {number} postId         The ID of the post to accept the suggestion for.
	 * @param {number} suggestionId   The ID of the suggestion to accept.
	 * @param {Object} options        The options to pass to the API.
	 * @param {string} options.text   The new text of the smart link.
	 * @param {number} options.offset The new offset of the smart link.
	 *
	 * @return {Promise<boolean>} Whether the suggestion was accepted.
	 */
	public async acceptSuggestion(
		postId: number,
		suggestionId: number,
		options?: {
			text?: string;
			offset?: number;
		},
	): Promise<AcceptSuggestionReturn> {
		const response = await this.fetch<AcceptSuggestionResponse>( {
			method: 'POST',
			path: `/wp-parsely/v2/content-helper/traffic-boost/${ postId }/accept-suggestion/${ suggestionId }`,
			data: {
				text: options?.text,
				offset: options?.offset,
			},
		} );

		if ( response.data.success ) {
			return {
				success: true,
				didReplaceLink: response.data.did_replace_link ?? false,
				postContent: response.data.post_content,
			};
		}

		throw new ContentHelperError(
			response.message ?? __( 'Unknown error.', 'wp-parsely' ),
			response.error as ContentHelperErrorCode ?? ContentHelperErrorCode.UnknownError,
			'' // No prefix for this error.
		);
	}

	/**
	 * Discards all existing suggestions for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {number} postId The ID of the post to discard suggestions for.
	 *
	 * @return {Promise<void>} The promise that resolves when the suggestions are discarded.
	 */
	public async discardSuggestions( postId: number ): Promise<DiscardSuggestionsResponse> {
		const response = await this.fetch<{ data: DiscardSuggestionsResponse }>( {
			method: 'DELETE',
			path: `/wp-parsely/v2/content-helper/traffic-boost/${ postId }/discard-suggestions`,
		} );

		return response.data;
	}

	/**
	 * Discards a specific suggestion for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {number} postId       The ID of the post to discard the suggestion for.
	 * @param {number} suggestionId The ID of the suggestion to discard.
	 *
	 * @return {Promise<DiscardSuggestionResponse>} The promise that resolves when the suggestion is discarded.
	 */
	public async discardSuggestion( postId: number, suggestionId: number ): Promise<DiscardSuggestionResponse> {
		const response = await this.fetch<{ data: DiscardSuggestionResponse }>( {
			method: 'DELETE',
			path: `/wp-parsely/v2/content-helper/traffic-boost/${ postId }/discard-suggestion/${ suggestionId }`,
		} );

		return response.data;
	}

	/**
	 * Creates a suggestion for a given post, without generating the placement.
	 *
	 * @since 3.18.0
	 *
	 * @param {HydratedPost} post The post to create a suggestion for.
	 *
	 * @return {Promise<TrafficBoostLink>} The suggestion.
	 */
	public createSuggestion( post: HydratedPost ): TrafficBoostLink {
		return {
			uid: `suggestion-${ post.id }-${ Date.now() }`,
			targetPost: post,
			isSuggestion: true,
		};
	}

	/**
	 * Creates traffic boost links from inbound smart links.
	 *
	 * @since 3.18.0
	 *
	 * @param {InboundSmartLink[]} inboundSmartLinks The inbound smart links to create traffic boost links from.
	 *
	 * @return {Promise<TrafficBoostLink[]>} The traffic boost links.
	 */
	private async createTrafficBoostLinks( inboundSmartLinks: InboundSmartLink[] ): Promise<TrafficBoostLink[]> {
		// Split the inbound smart links into buckets of source post types.
		const smartLinksByPostType = inboundSmartLinks.reduce( ( acc, inboundSmartLink ) => {
			// Get the post REST endpoint for the inbound smart link source post type.
			const postRestEndpoint = inboundSmartLink.post_data?.type.rest;

			if ( ! postRestEndpoint ) {
				return acc;
			}

			if ( ! acc[ postRestEndpoint ] ) {
				acc[ postRestEndpoint ] = [];
			}

			acc[ postRestEndpoint ].push( inboundSmartLink );
			return acc;
		}, {} as Record<string, InboundSmartLink[]> );

		// Get the posts for the inbound smart links in parallel.
		const getPostsPromises = Object.entries( smartLinksByPostType ).map( async ( [ postRestEndpoint, smartLinks ] ) => {
			// Get the post IDs from the inbound smart links.
			const postIds = smartLinks.map( ( inboundSmartLink ) => inboundSmartLink.source?.post_id );

			// Fetch the posts for the inbound smart links.
			const fetchedPosts = await this.getPosts( {
				include: postIds,
				posts_per_page: 100,
				status: 'any',
				rest_endpoint: postRestEndpoint,
			} );

			return fetchedPosts.data;
		} );

		const fetchedPosts = await Promise.all( getPostsPromises );

		// Create the traffic boost links.
		const trafficBoostLinks = inboundSmartLinks.map( ( inboundSmartLink ) => {
			const sourcePost = fetchedPosts.flat().find( ( p ) => p.id === inboundSmartLink.source?.post_id );

			if ( ! sourcePost ) {
				return false;
			}

			return this.createTrafficBoostLink( inboundSmartLink, sourcePost );
		} ).filter( ( link ) => link !== false );

		return trafficBoostLinks;
	}

	/**
	 * Creates a traffic boost link from an inbound smart link.
	 *
	 * @since 3.18.0
	 *
	 * @param {InboundSmartLink} inboundSmartLink The inbound smart link to create the traffic boost link from.
	 * @param {HydratedPost}     targetPost       The target post to create the traffic boost link for.
	 *
	 * @return {TrafficBoostLink} The traffic boost link.
	 */
	private createTrafficBoostLink( inboundSmartLink: InboundSmartLink, targetPost: HydratedPost ): TrafficBoostLink {
		return {
			uid: inboundSmartLink.uid + '-' + Date.now(),
			targetPost,
			smartLink: inboundSmartLink,
			isSuggestion: ! inboundSmartLink.applied, // Suggestions are not applied.
		};
	}
}

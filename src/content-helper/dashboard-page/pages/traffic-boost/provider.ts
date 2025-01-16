/**
 * Internal dependencies
 */
import { BaseWordPressProvider, HydratedPost } from '../../../common/base-wordpress-provider';
import { InboundSmartLink } from '../../../editor-sidebar/smart-linking/provider';

/**
 * Represents the type of link.
 *
 * @since 3.18.0
 */
export type LinkType = 'external' | 'internal' | 'smart';

/**
 * Represents the links for a post.
 *
 * @since 3.18.0
 */
export interface PostLinks extends Record<LinkType, HTMLAnchorElement[]> {
	total: number;
}

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
	postLinks: PostLinks;
	smartLink?: InboundSmartLink;
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
	 * Populates the post links for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {HydratedPost} post The post to populate the links for.
	 *
	 * @return {PostLinks} The post links.
	 */
	private populatePostLinks( post: HydratedPost ): PostLinks {
		const postContent = post.content.raw;
		const siteUrl = new URL( post.guid.raw ).hostname;

		// Create a new DOMParser instance.
		const parser = new DOMParser();
		const doc = parser.parseFromString( postContent, 'text/html' );
		const links = doc.querySelectorAll( 'a' );

		// Filter out links that have no text.
		const linksWithText = Array.from( links ).filter( ( link ) => link.textContent?.trim() !== '' );

		// Classify the links into external, internal, and smart.
		// Smart links contain the data-smartlink attribute.
		const smartLinks = linksWithText.filter( ( link ) => link.hasAttribute( 'data-smartlink' ) );

		// Internal links contain the site URL in the href attribute.
		const internalLinks = linksWithText.filter( ( link ) => link.href.includes( siteUrl ) );

		// External links are links that do not contain the site URL in the href attribute.
		const externalLinks = linksWithText.filter( ( link ) => ! link.href.includes( siteUrl ) );

		return {
			external: externalLinks,
			internal: internalLinks,
			smart: smartLinks,
			total: linksWithText.length,
		};
	}

	/**
	 * Creates a mocked smart link for a given post.
	 *
	 * This method will be removed once we have implemented fetching from the
	 * Parse.ly API.
	 *
	 * @since 3.18.0
	 *
	 * @param {HydratedPost} sourcePost    The source post to create the smart link from.
	 * @param {number}       destinationId The ID of the destination post.
	 *
	 * @return {InboundSmartLink} The mocked smart link.
	 */
	private createMockedSmartLink(
		sourcePost: HydratedPost,
		destinationId: number,
	): InboundSmartLink {
		const splitIntoBlocks = ( text: string, size: number ) => {
			const words = text.split( ' ' );

			return words.reduce( ( blocks, word ) => {
				const last = blocks[ blocks.length - 1 ];

				if ( ( last + ' ' + word ).trim().length <= size ) {
					blocks[ blocks.length - 1 ] = ( last + ' ' + word ).trim();
				} else {
					blocks.push( word );
				}

				return blocks;
			}, [ '' ] );
		};

		const tempDiv = document.createElement( 'div' );
		tempDiv.innerHTML = sourcePost.content.rendered;
		const plainContent = tempDiv.textContent ?? tempDiv.innerText ?? '';
		const blocks = splitIntoBlocks( plainContent, 50 );
		const text = blocks[ Math.floor( Math.random() * blocks.length ) ];
		const trimmedText = text.trim();

		return {
			uid: sourcePost.id.toString(),
			href: sourcePost.guid.raw,
			text: trimmedText,
			title: sourcePost.title.raw,
			offset: 0,
			applied: false,
			destination: {
				post_id: destinationId,
				post_type: 'Post',
			},
			source: {
				post_id: sourcePost.id,
				post_type: sourcePost.type,
			},
		};
	}

	/**
	 * Generates boost link suggestions for a given post.
	 *
	 * Note: This method will be removed once we have implemented fetching from the
	 * Parse.ly API.
	 *
	 * @since 3.18.0
	 *
	 * @param {number} postId              The ID of the post to generate boost links for.
	 * @param {number} numberOfSuggestions The number of suggestions to generate.
	 * @return {Promise<TrafficBoostLink[]>} The list of boost link suggestions.
	 */
	public async generateBoostLinks( postId: number, numberOfSuggestions: number = 10 ): Promise<TrafficBoostLink[]> {
		// As a mockup, this method right now will fetch the WordPress API and return a random number of posts.
		const fetchedPosts = await this.getPosts( {
			page: 1,
			per_page: 30,
			exclude: [ postId ],
			order: 'asc',
			orderby: 'date',
		} );

		// Filter posts without a title
		const postsWithTitle = fetchedPosts.data.filter( ( post ) => post.title.raw !== '' );

		// Filter to get numberOfSuggestions random posts.
		const randomPosts = postsWithTitle.sort( () => Math.random() - 0.5 ).slice( 0, numberOfSuggestions );

		const suggestions = randomPosts.map( ( post ) => {
			return {
				uid: `suggestion-${ post.id }-${ Date.now() }`,
				smartLink: this.createMockedSmartLink( post, postId ),
				postLinks: this.populatePostLinks( post ),
				targetPost: post,
				isSuggestion: true,
			};
		} );

		return suggestions;
	}

	/**
	 * Generates suggestions for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {number} postId The ID of the post to generate suggestions for.
	 *
	 * @return {Promise<TrafficBoostLink[]>} The list of suggestions.
	 */
	public async generateSuggestions( postId: number ): Promise<TrafficBoostLink[]> {
		// TODO: Generate suggestions for a given post.
		// As a mockup, we'll just return a list of suggestions with a delay between 500 and 2000ms.
		return new Promise( ( resolve ) => {
			setTimeout( () => {
				const randomNumberOfSuggestions = Math.floor( Math.random() * 10 ) + 1;
				resolve( this.generateBoostLinks( postId, randomNumberOfSuggestions ) );
			}, Math.floor( Math.random() * 1500 ) + 500 ); // Random time between 500 and 2000ms.
		} );
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
			postLinks: this.populatePostLinks( post ),
			isSuggestion: true,
		};
	}

	/**
	 * Generates a suggestion for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {TrafficBoostLink} suggestion The suggestion to generate.
	 *
	 * @return {Promise<TrafficBoostLink>} The generated suggestion.
	 */
	public async generateSuggestionForPost( suggestion: TrafficBoostLink ): Promise<TrafficBoostLink> {
		// TODO: Trigger the generation of the placement to Parse.ly AI.
		// As a mockup, after 5 seconds, we'll mark the link as not generating placement.
		return new Promise( ( resolve ) => {
			setTimeout( () => {
				suggestion.smartLink = this.createMockedSmartLink( suggestion.targetPost, suggestion.targetPost.id );

				resolve( suggestion );
			}, 5000 );
		} );
	}

	/**
	 * Accepts a suggestion for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {TrafficBoostLink} suggestion The suggestion to accept.
	 *
	 * @return {Promise<TrafficBoostLink>} The accepted suggestion.
	 */
	public async acceptSuggestion( suggestion: TrafficBoostLink ): Promise<TrafficBoostLink> {
		// TODO: Accept the suggestion and generate the placement.
		// As a mockup, wait between 500 and 2000ms before resolving.
		return new Promise( ( resolve ) => {
			setTimeout( () => {
				suggestion.isSuggestion = false;

				resolve( suggestion );
			}, Math.floor( Math.random() * 1500 ) + 500 ); // Random time between 500 and 2000ms.
		} );
	}

	/**
	 * Removes an inbound link from a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param {TrafficBoostLink} link The inbound link to remove.
	 *
	 * @return {Promise<void>} The promise that resolves when the inbound link is removed.
	 */
	public async removeInboundLink( link: TrafficBoostLink ): Promise<void> {
		// TODO: Remove the inbound link from the post.
		// As a mockup, we'll just wait between 500 and 2000ms before resolving.
		return new Promise( ( resolve ) => {
			setTimeout( () => {
				link.smartLink = undefined;
				resolve();
			}, Math.floor( Math.random() * 1500 ) + 500 ); // Random time between 500 and 2000ms.
		} );
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
	public async getInboundLinks( postId: number ): Promise<TrafficBoostLink[]> {
		// Request inbound smart links for the post.
		const inboundSmartLinks = await this.getInboundSmartLinks( postId );

		if ( inboundSmartLinks.length === 0 ) {
			return [];
		}

		// Now we need to fetch the posts for the inbound smart links.
		const fetchedPosts = await this.getPosts( {
			include: inboundSmartLinks.map( ( link ) => link.source?.post_id ),
			posts_per_page: 100,
		} );

		if ( fetchedPosts.total_items > 100 ) {
			// eslint-disable-next-line no-console
			console.warn( 'Parse.ly: More than 100 inbound smart links. This is not supported yet.' );
		}

		return fetchedPosts.data
			.map( ( post ) => ( {
				uid: `inbound-${ post.id }-${ Date.now() }`,
				targetPost: post,
				postLinks: this.populatePostLinks( post ),
				smartLink: inboundSmartLinks.find( ( link ) => link.source?.post_id === post.id ),
				isSuggestion: false,
			} ) )
			.filter( ( link ) => link.smartLink !== undefined );
	}
}

/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { select } from '@wordpress/data';
// eslint-disable-next-line import/named
import { Post, Taxonomy, User } from '@wordpress/core-data';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { RelatedTopPostData } from './models/related-top-post-data';

/**
 * The form of the query that gets posted to the analytics/posts WordPress REST
 * API endpoint.
 */
interface RelatedTopPostsApiQuery {
	message: string;
	query: null | {
		[ key: string ]: string | number | Taxonomy;
	};
}

/**
 * The form of the response returned by the /analytics/posts WordPress REST API
 * endpoint.
 */
interface RelatedTopPostsApiResponse {
	error?: object;
	data?: RelatedTopPostData[];
}

/**
 * The form of the result returned by the getRelatedTopPosts() function.
 */
interface GetRelatedTopPostsResult {
	message: string;
	posts: RelatedTopPostData[];
}

export const RELATED_POSTS_DEFAULT_LIMIT = 5;
export const RELATED_POSTS_DEFAULT_TIME_RANGE = 3; // in days

class ContentHelperProvider {
	/**
	 * Returns related top-performing posts to the one that is currently being
	 * edited within the WordPress Block Editor.
	 *
	 * The 'related' status is determined by the current post's Author, Category
	 * or tag.
	 *
	 * @return {Promise<GetRelatedTopPostsResult>} Object containing message and posts.
	 */
	static async getRelatedTopPosts(): Promise<GetRelatedTopPostsResult> {
		const editor = select( 'core/editor' );

		// Get post's author.
		const currentPost: Post = editor.getCurrentPost();
		const author: User = select( 'core' ).getEntityRecord( 'root', 'user', currentPost.author );

		// Get post's first category.
		const categoryIds = editor.getEditedPostAttribute( 'categories' ) as Array<number>;
		const category: Taxonomy = select( 'core' ).getEntityRecord( 'taxonomy', 'category', categoryIds[ 0 ] );

		// Get post's first tag.
		const tagIds = editor.getEditedPostAttribute( 'tags' ) as Array<number>;
		const tag: Taxonomy = select( 'core' ).getEntityRecord( 'taxonomy', 'post_tag', tagIds[ 0 ] );

		// Create API query.
		const apiQuery = this.buildRelatedTopPostsApiQuery( author, category, tag );
		if ( apiQuery.query === null ) {
			return Promise.reject( apiQuery.message );
		}

		// Fetch results from API and set the Content Helper's message.
		let data;
		try {
			data = await this.fetchRelatedTopPostsFromWpEndpoint( apiQuery );
		} catch ( error ) {
			return Promise.reject( error );
		}

		/* translators: %s: message such as "from category Foo", %d: number of days */
		let message = sprintf( __( 'Top-performing posts %1$s in last %2$d days.', 'wp-parsely' ), apiQuery.message, RELATED_POSTS_DEFAULT_TIME_RANGE );
		if ( data.length === 0 ) {
			message = `${ __( 'The Parse.ly API did not return any results for top-performing posts', 'wp-parsely' ) } ${ apiQuery.message }.`;
		}

		return { message, posts: data };
	}

	/**
	 * Fetches the related top-performing posts data from the WordPress REST API.
	 *
	 * @param {RelatedTopPostsApiQuery} query
	 * @return {Promise<Array<RelatedTopPostData>>} Array of fetched posts.
	 */
	private static async fetchRelatedTopPostsFromWpEndpoint( query: RelatedTopPostsApiQuery ): Promise<RelatedTopPostData[]> {
		let response;

		try {
			response = await apiFetch( {
				path: addQueryArgs( '/wp-parsely/v1/analytics/posts', query.query ),
			} ) as RelatedTopPostsApiResponse;
		} catch ( wpError ) {
			return Promise.reject( wpError );
		}

		if ( response?.error ) {
			return Promise.reject( response.error );
		}

		return response?.data || [];
	}

	/**
	 * Builds the query object used in the API for performing the related
	 * top-performing posts request.
	 *
	 * @param {User}     author   The post's author.
	 * @param {Taxonomy} category The post's category.
	 * @param {Taxonomy} tag      The post's tag.
	 * @return {RelatedTopPostsApiQuery} The query object.
	 */
	private static buildRelatedTopPostsApiQuery( author: User, category: Taxonomy, tag: Taxonomy ): RelatedTopPostsApiQuery {
		const limit = RELATED_POSTS_DEFAULT_LIMIT;

		// All fetching criteria are empty.
		if ( ! author && ! category && ! tag ) {
			return ( {
				query: null,
				message: __( "Error: Cannot perform request because the post's Author, Category and Tag are empty.", 'wp-parsely' ),
			} );
		}

		// A tag exists.
		if ( tag ) {
			return ( {
				query: { limit, tag },
				/* translators: %s: message such as "with tag Foo" */
				message: sprintf( __( 'with tag "%1$s"', 'wp-parsely' ), tag.name ),
			} );
		}

		// A category exists.
		if ( category?.name ) {
			return ( {
				query: { limit, section: category.name },
				/* translators: %s: message such as "from category Foo" */
				message: sprintf( __( 'from category "%1$s"', 'wp-parsely' ), category.name ),
			} );
		}

		// Only the post author exists.
		return ( {
			query: { limit, author: author.name },
			/* translators: %s: message such as "by author John" */
			message: sprintf( __( 'by author "%1$s"', 'wp-parsely' ), author.name ),
		} );
	}
}

export default ContentHelperProvider;

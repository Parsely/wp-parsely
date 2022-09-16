/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
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
		[ key: string ]: string;
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
		const data = await this.fetchRelatedTopPostsFromWpEndpoint( apiQuery );
		let message = `${ __( 'Top-performing posts', 'wp-parsely' ) } ${ apiQuery.message }.`;

		if ( typeof data === 'string' ) {
			return { message: data, posts: [] };
		}

		if ( data.length === 0 ) {
			message = `${ __( 'The Parse.ly API did not return any results for top-performing posts', 'wp-parsely' ) } ${ apiQuery.message }.`;
		}

		return { message, posts: data };
	}

	/**
	 * Fetches the related top-performing posts data from the WordPress REST API.
	 *
	 * @param {RelatedTopPostsApiQuery} fetchDataQueryResult
	 * @return {Promise<Array<RelatedTopPostData>>} Array of fetched posts or empty array.
	 */
	private static async fetchRelatedTopPostsFromWpEndpoint( fetchDataQueryResult: RelatedTopPostsApiQuery ): Promise<RelatedTopPostData[] | string> {
		let response;

		try {
			response = await apiFetch( {
				path: addQueryArgs( '/wp-parsely/v1/analytics/posts', fetchDataQueryResult.query ),
			} ) as RelatedTopPostsApiResponse;
		} catch ( wpError ) {
			return `${ __( 'WordPress Error:', 'wp-parsely' ) } ${ wpError.message }`;
		}

		if ( response?.error ) {
			const errorMessage = JSON.stringify( response.error ).match( /\[\"(.*?)\"\]/ )[ 1 ];
			return `${ __( 'Error:', 'wp-parsely' ) } ${ errorMessage }`;
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
		// Number of maximum posts to fetch. The actual number of returned posts
		// might be lower.
		const limit = 5;

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
				message: `${ __( 'with the tag', 'wp-parsely' ) } "${ tag.name }"`,
			} );
		}

		// A category exists.
		if ( category?.name ) {
			return ( {
				query: { limit, section: category.name },
				message: `${ __( 'in the category', 'wp-parsely' ) } "${ category.name }"`,
			} );
		}

		// Only the post author exists.
		return ( {
			query: { limit, author: author.name },
			message: `${ __( 'by the author', 'wp-parsely' ) } "${ author.name }"`,
		} );
	}
}

export default ContentHelperProvider;

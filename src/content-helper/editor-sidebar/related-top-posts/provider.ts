/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { select } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
// eslint-disable-next-line import/named
import { Post, Taxonomy, User } from '@wordpress/core-data';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import {
	ContentHelperError,
	ContentHelperErrorCode,
} from '../../common/content-helper-error';
import { AnalyticsApiOptionalQueryParams, getApiPeriodParams } from '../../common/utils/api';
import { PostData } from '../../common/utils/post';

/**
 * The form of the query that gets posted to the analytics/posts WordPress REST
 * API endpoint.
 */
interface RelatedTopPostsApiQuery {
	message: string; // Selected filter message to be displayed to the user.
	query: AnalyticsApiOptionalQueryParams
}

/**
 * The form of the response returned by the /stats/posts WordPress REST API
 * endpoint.
 */
interface RelatedTopPostsApiResponse {
	error?: Error;
	data?: PostData[];
}

/**
 * The form of the result returned by the getRelatedTopPosts() function.
 */
export interface GetRelatedTopPostsResult {
	message: string;
	posts: PostData[];
}

export const RELATED_POSTS_DEFAULT_LIMIT = 5;

export class RelatedTopPostsProvider {
	/**
	 * Returns related top posts to the one that is currently being edited
	 * within the WordPress Block Editor.
	 *
	 * The 'related' status is determined by the current post's Author, Category
	 * or tag.
	 *
	 * @param {string} period The period for which to fetch data.
	 * @param {string} metric The metric to sort by.
	 *
	 * @return {Promise<GetRelatedTopPostsResult>} Object containing message and posts.
	 */
	static async getRelatedTopPosts( period: string, metric: string ): Promise<GetRelatedTopPostsResult> {
		const editor = select( 'core/editor' );

		// Get post's author.
		const currentPost: Post = editor.getCurrentPost();
		const author: User = select( 'core' ).getEntityRecord( 'root', 'user', currentPost.author );

		// Get post's first category.
		const categoryIds = editor.getEditedPostAttribute( 'categories' ) as Array<number>;
		const category: Taxonomy = select( 'core' ).getEntityRecord( 'taxonomy', 'category', categoryIds?.[ 0 ] );

		// Get post's first tag.
		const tagIds = editor.getEditedPostAttribute( 'tags' ) as Array<number>;
		const tag: Taxonomy = select( 'core' ).getEntityRecord( 'taxonomy', 'post_tag', tagIds?.[ 0 ] );

		// Create API query.
		let apiQuery;
		try {
			apiQuery = this.buildRelatedTopPostsApiQuery(
				period, metric, author, category, tag
			);
		} catch ( contentHelperError ) {
			return Promise.reject( contentHelperError );
		}

		// Fetch results from API and set the message.
		let data;
		try {
			data = await this.fetchRelatedTopPostsFromWpEndpoint( apiQuery );
		} catch ( contentHelperError ) {
			return Promise.reject( contentHelperError );
		}

		const message = this.generateMessage(
			data.length === 0, period, apiQuery.message
		);

		return { message, posts: data };
	}

	/**
	 * Generates the message that will be displayed above the related top posts.
	 *
	 * @param {boolean} dataIsEmpty     Whether the API returned no data.
	 * @param {string}  period          The period for which data was fetched.
	 * @param {string}  apiQueryMessage The message within the query.
	 *
	 * @return {string} The generated message.
	 */
	private static generateMessage(
		dataIsEmpty: boolean, period: string, apiQueryMessage: string
	): string {
		if ( dataIsEmpty ) {
			return sprintf(
				/* translators: 1: message such as "in category Foo" */
				__(
					'No top posts %1$s were found for the specified period and metric.',
					'wp-parsely'
				), apiQueryMessage
			);
		}

		if ( '1' === period ) {
			return sprintf(
				/* translators: 1: message such as "in category Foo" */
				__( 'Top posts %1$s in last 24 hours.', 'wp-parsely' ),
				apiQueryMessage, period
			);
		}

		return sprintf(
			/* translators: 1: message such as "in category Foo", 2: number of days */
			__( 'Top posts %1$s in last %2$d days.', 'wp-parsely' ),
			apiQueryMessage, period
		);
	}

	/**
	 * Fetches the related top posts data from the WordPress REST API.
	 *
	 * @param {RelatedTopPostsApiQuery} query
	 * @return {Promise<Array<PostData>>} Array of fetched posts.
	 */
	private static async fetchRelatedTopPostsFromWpEndpoint( query: RelatedTopPostsApiQuery ): Promise<PostData[]> {
		let response;

		try {
			response = await apiFetch<RelatedTopPostsApiResponse>( {
				path: addQueryArgs( '/wp-parsely/v1/stats/posts', {
					...query.query,
					itm_source: 'wp-parsely-content-helper',
				} ),
			} );
		} catch ( wpError: any ) { // eslint-disable-line @typescript-eslint/no-explicit-any
			return Promise.reject( new ContentHelperError(
				wpError.message, wpError.code
			) );
		}

		if ( response?.error ) {
			return Promise.reject( new ContentHelperError(
				response.error.message,
				ContentHelperErrorCode.ParselyApiResponseContainsError
			) );
		}

		return response?.data ?? [];
	}

	/**
	 * Builds the query object used in the API for performing the related
	 * top posts request.
	 *
	 * @param {string}   period   The period for which to fetch data.
	 * @param {string}   metric   The metric to sort by.
	 * @param {User}     author   The post's author.
	 * @param {Taxonomy} category The post's category.
	 * @param {Taxonomy} tag      The post's tag.
	 *
	 * @return {RelatedTopPostsApiQuery} The query object.
	 */
	private static buildRelatedTopPostsApiQuery(
		period: string, metric:string, author: User, category: Taxonomy, tag: Taxonomy
	): RelatedTopPostsApiQuery {
		const commonQueryParams = {
			...getApiPeriodParams( parseInt( period ) ),
			limit: RELATED_POSTS_DEFAULT_LIMIT,
			sort: metric,
		};

		// A tag exists.
		if ( tag?.name ) {
			return ( {
				query: { tag: tag.name, ...commonQueryParams },
				/* translators: %s: message such as "with tag Foo" */
				message: sprintf( __( 'with tag "%1$s"', 'wp-parsely' ), tag.name ),
			} );
		}

		// A category exists.
		if ( category?.name ) {
			return ( {
				query: { section: category.name, ...commonQueryParams },
				/* translators: %s: message such as "in category Foo" */
				message: sprintf( __( 'in category "%1$s"', 'wp-parsely' ), category.name ),
			} );
		}

		// Fallback to author.
		if ( author?.name ) {
			return ( {
				query: { author: author.name, ...commonQueryParams },
				/* translators: %s: message such as "by author John" */
				message: sprintf( __( 'by author "%1$s"', 'wp-parsely' ), author.name ),
			} );
		}

		// No filter could be picked. The query cannot be formulated.
		throw new ContentHelperError(
			__( "Cannot formulate query because the post's Tag, Category and Author are empty.", 'wp-parsely' ),
			ContentHelperErrorCode.CannotFormulateApiQuery
		);
	}
}

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
import {
	AnalyticsApiOptionalQueryParams,
	getApiPeriodParams,
} from '../../common/utils/api';
import {
	Metric,
	Period,
	PostFilterType,
	getPeriodDescription,
} from '../../common/utils/constants';
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
	 * @param {Period}         period     The period for which to fetch data.
	 * @param {Metric}         metric     The metric to sort by.
	 * @param {PostFilterType} filterType The selected filter type.
	 *
	 * @return {Promise<GetRelatedTopPostsResult>} Object containing message and posts.
	 */
	static async getRelatedTopPosts(
		period: Period, metric: Metric, filterType: PostFilterType
	): Promise<GetRelatedTopPostsResult> {
		// Create API query.
		let apiQuery;
		try {
			apiQuery = this.buildRelatedTopPostsApiQuery(
				period, metric, filterType
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
	 * @since 3.11.0
	 *
	 * @param {boolean} dataIsEmpty     Whether the API returned no data.
	 * @param {Period}  period          The period for which data was fetched.
	 * @param {string}  apiQueryMessage The message within the query.
	 *
	 * @return {string} The generated message.
	 */
	private static generateMessage(
		dataIsEmpty: boolean, period: Period, apiQueryMessage: string
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

		return sprintf(
			/* translators: 1: message such as "in category Foo", 2: period such as "last 7 days"*/
			__( 'Top posts %1$s in the %2$s.', 'wp-parsely' ),
			apiQueryMessage, getPeriodDescription( period, true )
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
	 * @param {Period}         period     The period for which to fetch data.
	 * @param {Metric}         metric     The metric to sort by.
	 * @param {PostFilterType} filterType The selected filter type.
	 *
	 * @return {RelatedTopPostsApiQuery} The query object.
	 */
	private static buildRelatedTopPostsApiQuery(
		period: Period, metric:Metric, filterType: PostFilterType
	): RelatedTopPostsApiQuery {
		const core = select( 'core' );
		const editor = select( 'core/editor' );
		const commonQueryParams = {
			...getApiPeriodParams( period ),
			limit: RELATED_POSTS_DEFAULT_LIMIT,
			sort: metric,
		};

		if ( PostFilterType.Tag === filterType ) {
			// Get post's first tag.
			const tagIds = editor.getEditedPostAttribute( 'tags' ) as Array<number>;
			const tag: Taxonomy = core.getEntityRecord( 'taxonomy', 'post_tag', tagIds?.[ 0 ] );

			if ( undefined === tag ) {
				throw new ContentHelperError(
					__( 'No tags are assigned to this page.', 'wp-parsely' ),
					ContentHelperErrorCode.CannotFormulateApiQuery,
					''
				);
			}

			return ( {
				query: { tag: tag.name, ...commonQueryParams },
				/* translators: %s: message such as "with tag Foo" */
				message: sprintf( __( 'with tag "%1$s"', 'wp-parsely' ), tag.name ),
			} );
		}

		if ( PostFilterType.Section === filterType ) {
			// Get post's first category.
			const categoryIds = editor.getEditedPostAttribute( 'categories' ) as Array<number>;
			const category: Taxonomy = core.getEntityRecord( 'taxonomy', 'category', categoryIds?.[ 0 ] );

			if ( undefined === category ) {
				throw new ContentHelperError(
					__( 'No section is assigned to this page.', 'wp-parsely' ),
					ContentHelperErrorCode.CannotFormulateApiQuery,
					''
				);
			}

			return ( {
				query: { section: category.name, ...commonQueryParams },
				/* translators: %s: message such as "in category Foo" */
				message: sprintf( __( 'in section "%1$s"', 'wp-parsely' ), category.name ),
			} );
		}

		if ( PostFilterType.Author === filterType ) {
			// Get post's author.
			const currentPost: Post = editor.getCurrentPost();
			const author: User = core.getEntityRecord( 'root', 'user', currentPost.author );

			if ( undefined === author ) {
				throw new ContentHelperError(
					__( 'No author is assigned to this page.', 'wp-parsely' ),
					ContentHelperErrorCode.CannotFormulateApiQuery,
					''
				);
			}

			return ( {
				query: { author: author.name, ...commonQueryParams },
				/* translators: %s: message such as "by author John" */
				message: sprintf( __( 'by author "%1$s"', 'wp-parsely' ), author.name ),
			} );
		}

		// No filter type has been specified. The query cannot be formulated.
		throw new ContentHelperError(
			__( 'No valid filter type has been specified.', 'wp-parsely' ),
			ContentHelperErrorCode.CannotFormulateApiQuery
		);
	}
}

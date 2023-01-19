/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import {
	ContentHelperError,
	ContentHelperErrorCode,
} from '../../blocks/content-helper/content-helper-error';
import { TopPostData } from './top-posts/model';
import {
	convertDateToString,
	removeDaysFromDate,
} from '../../blocks/shared/utils/date';

/**
 * The form of the response returned by the /stats/posts WordPress REST API
 * endpoint.
 */
interface TopPostsApiResponse {
	error?: Error;
	data?: TopPostData[];
}

/**
 * The form of the result returned by the getTopPosts() function.
 */
export interface GetTopPostsResult {
	posts: TopPostData[];
}

export const TOP_POSTS_DEFAULT_LIMIT = 3;
export const TOP_POSTS_DEFAULT_TIME_RANGE = 7; // In days.

class TopPostsProvider {
	private dataPeriodStart: string;
	private dataPeriodEnd: string;

	/**
	 * Constructor.
	 */
	constructor() {
		this.dataPeriodEnd = convertDateToString( new Date() ) + 'T23:59';
		this.dataPeriodStart = removeDaysFromDate(
			this.dataPeriodEnd,
			TOP_POSTS_DEFAULT_TIME_RANGE - 1
		) + 'T00:00';
	}

	/**
	 * Returns the site's top-performing posts.
	 *
	 * @return {Promise<GetTopPostsResult>} Object containing message and posts.
	 */
	public async getTopPosts(): Promise<GetTopPostsResult> {
		let data;

		try {
			data = await this.fetchTopPostsFromWpEndpoint();
		} catch ( contentHelperError ) {
			return Promise.reject( contentHelperError );
		}

		return { posts: data };
	}

	/**
	 * Fetches the site's top-performing posts data from the WordPress REST API.
	 *
	 * @return {Promise<Array<TopPostData>>} Array of fetched posts.
	 */
	private async fetchTopPostsFromWpEndpoint(): Promise<TopPostData[]> {
		let response;

		try {
			response = await apiFetch( {
				path: addQueryArgs( '/wp-parsely/v1/stats/posts', {
					limit: TOP_POSTS_DEFAULT_LIMIT,
					period_start: this.dataPeriodStart,
					period_end: this.dataPeriodEnd,
				} ),
			} ) as TopPostsApiResponse;
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

		return response?.data || [];
	}
}

export default TopPostsProvider;

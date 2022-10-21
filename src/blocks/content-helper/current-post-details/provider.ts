/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import {
	PostPerformanceData,
	PostPerformanceReferrerData,
} from './post-performance-data';

/**
 * Specifies the form of the response returned by the `/analytics/post/detail`
 * WordPress REST API endpoint.
 */
 interface analyticsApiResponse {
	error?: object;
	data: PostPerformanceData[];
}

/**
 * Specifies the form of the response returned by the `/referrers/post/detail`
 * WordPress REST API endpoint.
 */
interface referrersApiResponse {
	error?: object;
	data: PostPerformanceReferrerData;
}

/**
 * Provides current post details data for use in other components.
 */
class CurrentPostDetailsProvider {
	/**
	 * Returns details about the post that is currently being edited within the
	 * WordPress Block Editor.
	 *
	 * @return {Promise<PostPerformanceData>} The current post's details.
	 */
	static async getCurrentPostDetails(): Promise<PostPerformanceData> {
		const editor = select( 'core/editor' );

		// We cannot show data for non-published posts.
		if ( false === editor.isCurrentPostPublished() ) {
			return Promise.reject(
				__( 'This post is not published, so its details are unavailable.', 'wp-parsely' )
			);
		}

		// Get post URL.
		const postUrl = editor.getPermalink();

		// Fetch results from API and set the Content Helper's message.
		let performanceData, referrerData;
		try {
			[ performanceData, referrerData ] = await Promise.all( [
				this.fetchPerformanceDataFromWpEndpoint( postUrl ),
				this.fetchReferrerDataFromWpEndpoint( postUrl ),
			] );
		} catch ( error ) {
			return Promise.reject( error );
		}

		return { ...performanceData, referrers: referrerData };
	}

	/**
	 * Fetches the performance data for the current post from the WordPress REST
	 * API.
	 *
	 * @param {string} postUrl
	 * @return {Promise<PostPerformanceData> } The current post's details.
	 */
	private static async fetchPerformanceDataFromWpEndpoint( postUrl: string ): Promise<PostPerformanceData> {
		let response;

		try {
			response = await apiFetch( {
				path: addQueryArgs(
					'/wp-parsely/v1/analytics/post/detail', { url: postUrl }
				),
			} ) as analyticsApiResponse;
		} catch ( wpError ) {
			return Promise.reject( wpError );
		}

		if ( response?.error ) {
			return Promise.reject( response.error );
		}

		// No data was returned.
		if ( response.data.length === 0 ) {
			return Promise.reject(
				__( 'No data was found for the URL', 'wp-parsely' ) + ` ${ postUrl }`
			);
		}

		// Data for multiple URLs was returned.
		if ( response.data.length > 1 ) {
			return Promise.reject(
				__( 'Error: multiple results were returned for the URL', 'wp-parsely' ) + `${ postUrl }`
			);
		}

		return response.data[ 0 ];
	}

	/**
	 * Fetches referrer data for the current post from the WordPress REST API.
	 * Returns data for the last 7 days (today included) by default.
	 *
	 * @param {string} postUrl  The post's URL.
	 * @param {string} fromDate The start date in "YYYY-MM-DD" format.
	 * @param {string} toDate   The end date in "YYYY-MM-DD" format.
	 * @return {Promise<PostPerformanceReferrerData>} The post's referrer data.
	 */
	private static async fetchReferrerDataFromWpEndpoint(
		postUrl: string,
		fromDate: string = null,
		toDate: string = this.convertDateToString( new Date() ) + 'T23:59',
	): Promise<PostPerformanceReferrerData> {
		let response;

		// Set default start date if needed.
		if ( null === fromDate ) {
			fromDate = this.removeDaysFromDate( toDate, 6 ) + 'T00:00';
		}

		// Query WordPress API endpoint.
		try {
			response = await apiFetch( {
				path: addQueryArgs(
					'/wp-parsely/v1/referrers/post/detail',
					{ url: postUrl, period_start: fromDate, period_end: toDate }
				),
			} ) as referrersApiResponse;
		} catch ( wpError ) {
			return Promise.reject( wpError );
		}

		if ( response?.error ) {
			return Promise.reject( response.error );
		}

		return response.data;
	}

	/**
	 * Removes the given number of days from a "YYYY-MM-DD" string, and returns
	 * the result in the same format.
	 *
	 * @param {string} date The date in "YYYY-MM-DD" format.
	 * @param {number} days The number of days to remove from the date.
	 * @return {string} The resulting date in "YYYY-MM-DD" format.
	 */
	private static removeDaysFromDate( date: string, days: number ): string {
		const pastDate = new Date( date );
		pastDate.setDate( pastDate.getDate() - days );

		return this.convertDateToString( pastDate );
	}

	/**
	 * Converts a date to a string in "YYYY-MM-DD" format.
	 *
	 * @param {Date} date The  date to format.
	 * @return {string} The date in "YYYY-MM-DD" format.
	 */
	private static convertDateToString( date: Date ): string {
		return date.toISOString().substring( 0, 10 );
	}
}

export default CurrentPostDetailsProvider;

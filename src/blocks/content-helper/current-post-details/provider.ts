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
	private dataPeriodDays: number;
	private dataPeriodStart: string;
	private dataPeriodEnd: string;

	/**
	 * Constructor.
	 */
	constructor() {
		// Return data for the last 7 days (today included).
		this.setDataPeriod( 7 );
	}

	/**
	 * Returns details about the post that is currently being edited within the
	 * WordPress Block Editor.
	 *
	 * @return {Promise<PostPerformanceData>} The current post's details.
	 */
	public async getCurrentPostDetails(): Promise<PostPerformanceData> {
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

		const period = { start: this.dataPeriodStart, end: this.dataPeriodEnd, days: this.dataPeriodDays };
		return { ...performanceData, referrers: referrerData, period };
	}

	/**
	 * Fetches the performance data for the current post from the WordPress REST
	 * API.
	 *
	 * @param {string} postUrl
	 * @return {Promise<PostPerformanceData> } The current post's details.
	 */
	private async fetchPerformanceDataFromWpEndpoint( postUrl: string ): Promise<PostPerformanceData> {
		let response;

		try {
			response = await apiFetch( {
				path: addQueryArgs(
					'/wp-parsely/v1/analytics/post/detail', {
						url: postUrl,
						period_start: this.dataPeriodStart,
						period_end: this.dataPeriodEnd,
					} ),
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
	 *
	 * @param {string} postUrl The post's URL.
	 * @return {Promise<PostPerformanceReferrerData>} The post's referrer data.
	 */
	private async fetchReferrerDataFromWpEndpoint(
		postUrl: string,
	): Promise<PostPerformanceReferrerData> {
		let response;

		// Query WordPress API endpoint.
		try {
			response = await apiFetch( { path: addQueryArgs(
				'/wp-parsely/v1/referrers/post/detail', {
					url: postUrl,
					period_start: this.dataPeriodStart,
					period_end: this.dataPeriodEnd,
				} ),
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
	 * Sets the period for which to fetch the data.
	 *
	 * @param {number} days Number of last days to get the data for.
	 */
	private setDataPeriod( days: number ) {
		this.dataPeriodDays = days;
		this.dataPeriodEnd = this.convertDateToString( new Date() ) + 'T23:59';
		this.dataPeriodStart = this.removeDaysFromDate( this.dataPeriodEnd, this.dataPeriodDays - 1 ) + 'T00:00';
	}

	/**
	 * Removes the given number of days from a "YYYY-MM-DD" string, and returns
	 * the result in the same format.
	 *
	 * @param {string} date The date in "YYYY-MM-DD" format.
	 * @param {number} days The number of days to remove from the date.
	 * @return {string} The resulting date in "YYYY-MM-DD" format.
	 */
	private removeDaysFromDate( date: string, days: number ): string {
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
	private convertDateToString( date: Date ): string {
		return date.toISOString().substring( 0, 10 );
	}
}

export default CurrentPostDetailsProvider;

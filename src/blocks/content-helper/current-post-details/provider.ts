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
import { CurrentPostDetailsData } from './data';

/**
 * The form of the response returned by the /analytics/post/detail WordPress
 * REST API endpoint.
 */
 interface CurrentPostDetailsApiResponse {
	error?: object;
	data: CurrentPostDetailsData[];
}

class CurrentPostDetailsProvider {
	/**
	 * Returns details about the post that is currently being edited within the
	 * WordPress Block Editor.
	 *
	 * @return {Promise<CurrentPostDetailsData>} The current post's details.
	 */
	static async getCurrentPostDetails(): Promise<CurrentPostDetailsData> {
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
		let data;
		try {
			data = await this.fetchCurrentPostDetailsFromWpEndpoint( postUrl );
		} catch ( error ) {
			return Promise.reject( error );
		}

		return data;
	}

	/**
	 * Fetches the details of the current post from the WordPress REST API.
	 *
	 * @param {string} postUrl
	 * @return {Promise<CurrentPostDetailsData> } The current post's details.
	 */
	private static async fetchCurrentPostDetailsFromWpEndpoint( postUrl: string ): Promise<CurrentPostDetailsData> {
		let response;

		try {
			response = await apiFetch( {
				path: addQueryArgs(
					'/wp-parsely/v1/analytics/post/detail', { url: postUrl }
				),
			} ) as CurrentPostDetailsApiResponse;
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
}

export default CurrentPostDetailsProvider;

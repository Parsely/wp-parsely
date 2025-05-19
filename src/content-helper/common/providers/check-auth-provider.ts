/**
 * Internal dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import { BaseProvider } from './base-provider';

/**
 * Type definition for the Authorization request parameters.
 *
 * @since 3.19.0
 */
interface AuthRequestParams {
	auth_scope: 'suggestions_api' | 'traffic_boost';
}

/**
 * Type definition for the Authorization request parameters.
 *
 * @since 3.19.0
 */
export interface AuthResponse {
	code: number;
	message: string;
}

export class CheckAuthProvider extends BaseProvider {
	/**
	 * The singleton instance of the CheckAuthProvider.
	 *
	 * @since 3.19.0
	 */
	private static instance: CheckAuthProvider;

	/**
	 * Returns the singleton instance of the CheckAuthProvider.
	 *
	 * @since 3.19.0
	 *
	 * @return {CheckAuthProvider} The singleton instance.
	 */
	public static getInstance(): CheckAuthProvider {
		if ( ! this.instance ) {
			this.instance = new CheckAuthProvider();
		}

		return this.instance;
	}

	/**
	 * Returns whether the Site ID is authorized to use the Suggestions API or
	 * Suggestions API feature.
	 *
	 * @since 3.19.0
	 *
	 * @param {AuthRequestParams} args The request parameters.
	 *
	 * @return {Promise<AuthResponse>} Whether the Site ID is authorized.
	 */
	public async getAuthorizationResponse( args: AuthRequestParams ): Promise<AuthResponse> {
		const response = this.fetch<AuthResponse>( {
			method: 'POST',
			path: addQueryArgs(
				'/wp-parsely/v2/content-helper/check-auth', {
					...args,
				} ),
		} );

		return response;
	}
}

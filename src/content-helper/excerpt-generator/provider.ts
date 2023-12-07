/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { ContentHelperError, ContentHelperErrorCode } from '../common/content-helper-error';

interface ExcerptGeneratorApiResponse {
	error?: Error;
	data: string;
}

export class ExcerptGeneratorProvider {
	public async generateExcerpt( title: string, content: string ): Promise<string> {
		let response;
		try {
			response = await apiFetch<ExcerptGeneratorApiResponse>( {
				path: addQueryArgs( '/wp-parsely/v1/content-suggestions/suggest-meta-description', {
					title,
					content,
				} ),
			} );
		} catch ( wpError: any ) { // eslint-disable-line @typescript-eslint/no-explicit-any
			return Promise.reject( new ContentHelperError( wpError.message, wpError.code ) );
		}

		if ( response?.error ) {
			return Promise.reject( new ContentHelperError(
				response.error.message,
				ContentHelperErrorCode.ParselyApiResponseContainsError
			) );
		}

		return response?.data ?? '';
	}
}

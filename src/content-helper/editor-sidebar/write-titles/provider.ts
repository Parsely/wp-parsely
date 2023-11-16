import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ContentHelperError, ContentHelperErrorCode } from '../../common/content-helper-error';

interface WriteTitleApiResponse {
	error?: Error;
	data: string[],
}

export class WriteTitleProvider {
	public async generateTitles( content: string, limit: number = 3 ): Promise<string[]> {
		let response;

		try {
			response = await apiFetch<WriteTitleApiResponse>( {
				path: addQueryArgs( '/wp-parsely/v1/content-suggestions/write-title', {
					content,
					limit,
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
}

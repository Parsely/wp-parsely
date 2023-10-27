import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ContentHelperError, ContentHelperErrorCode } from '../../common/content-helper-error';

interface WriteTitleApiResponse {
	error?: Error;
	data: Array<any>[], // eslint-disable-line @typescript-eslint/no-explicit-any
}
export class WriteTitleProvider {
	public async generateTitles( content: string, limit: number = 3 ): Promise<Array<any>> { // eslint-disable-line @typescript-eslint/no-explicit-any
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

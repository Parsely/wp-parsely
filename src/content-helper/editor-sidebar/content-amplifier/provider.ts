/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import {
	ContentHelperError,
	ContentHelperErrorCode,
} from '../../common/content-helper-error';
import { PostData } from '../../common/utils/post';

interface ContentAmplifierApiResponse {
	error?: Error;
	data?: PostData[];
}

export interface GetContentAmplifierResult {
	message: string;
	posts: PostData[];
}

export class ContentAmplifierProvider {
	static async updateExternalPost( postId: number, permalink: string ): Promise<boolean> {
		let response;

		try {
			response = await apiFetch<ContentAmplifierApiResponse>( {
				method: 'POST',
				path: addQueryArgs( `/wp-parsely/v1/smart-linking/${ postId }/apply-smart-links`, {
					itm_source: 'wp-parsely-content-helper',
					permalink,
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

		return true;
	}
}

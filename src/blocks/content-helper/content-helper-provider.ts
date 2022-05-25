/**
 * External dependencies
 */
import { select } from '@wordpress/data';
import { Schema } from '@wordpress/core-data';
import Post = Schema.Post;
import Taxonomy = Schema.Taxonomy;
import User = Schema.User;

/**
 * Internal dependencies
 */
import { SuggestedPost } from './models/SuggestedPost';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

interface ApiResponse {
	error?: string;
	data?: SuggestedPost[];
}

class ContentHelperProvider {
	static async getTopPosts(): Promise<SuggestedPost[]> {
		const currentPost: Post = select( 'core/editor' ).getCurrentPost();
		const category = select( 'core' ).getEntityRecord( 'taxonomy', 'category', currentPost.categories[ 0 ] ) as Taxonomy;
		const user = select( 'core' ).getEntityRecord( 'root', 'user', currentPost.author ) as User;

		if ( ! user && ! category ) {
			return Promise.reject();
		}

		return this.fetchData( user, category );
	}

	static async fetchData( user: User, category: Taxonomy ): Promise<SuggestedPost[]> {
		const query = {
			limit: 5,
			// TODO: Figure out how to use the author
			author: user.name,
		};

		let response;
		let error;

		try {
			response = await apiFetch( {
				path: addQueryArgs( '/wp-parsely/v1/analytics/posts', { query } ),
			} ) as ApiResponse;
		} catch ( wpError ) {
			error = wpError;
		}

		if ( response?.error ) {
			error = response.error;
		}

		if ( error ) {
			// TODO: Return actual error message
			return Promise.reject();
		}

		return response?.data || [];
	}
}

export default ContentHelperProvider;

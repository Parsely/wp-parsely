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
		const tag = currentPost.tags[ 0 ];
		const user = select( 'core' ).getEntityRecord( 'root', 'user', currentPost.author ) as User;

		if ( ! user && ! category ) {
			return Promise.reject( 'No user or categories were found.' );
		}

		const data = await this.fetchData( user, category, tag );
		return this.processData( data );
	}

	private static async fetchData( user: User, category: Taxonomy, tag: string ): Promise<SuggestedPost[]> {
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
			return Promise.reject( error );
		}

		return response?.data || [];
	}

	private static processData( data: SuggestedPost[] ): SuggestedPost[] {
		return data.map( ( p ) => {
			// @ts-ignore
			p.statsUrl = `${ window.wpParselyContentHelperPrefix }?url=${ p.url }`;
			return p;
		} );
	}
}

export default ContentHelperProvider;

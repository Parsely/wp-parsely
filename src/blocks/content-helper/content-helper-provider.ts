/**
 * External dependencies
 */
import { select } from '@wordpress/data';
// eslint-disable-next-line import/named
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
		const tag = select( 'core' ).getEntityRecord( 'taxonomy', 'post_tag', Number( currentPost.tags[ 0 ] ) ) as Taxonomy;
		const user = select( 'core' ).getEntityRecord( 'root', 'user', currentPost.author ) as User;

		if ( ! category && ! user && ! tag ) {
			return Promise.reject( 'Cannot make request to Parse.ly API because User, Category and Tag are empty.' );
		}

		const data = await this.fetchData( user, category, tag );
		if ( data.length === 0 ) {
			return Promise.reject( 'The Parse.ly API did not return any posts.' );
		}

		return this.processData( data );
	}

	private static async fetchData( user: User, category: Taxonomy, tag: Taxonomy ): Promise<SuggestedPost[]> {
		const query = this.buildFetchDataQuery( user, category, tag );
		let response;
		let error;

		try {
			response = await apiFetch( {
				path: addQueryArgs( '/wp-parsely/v1/analytics/posts', query ),
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

	private static buildFetchDataQuery( user: User, category: Taxonomy, tag: Taxonomy ) {
		const limit = 5;

		if ( tag ) {
			return { limit, tag };
		}
		if ( category?.name ) {
			return { limit, section: category.name };
		}
		if ( user?.name ) {
			return { limit, author: user.name }; // User display name.
		}

		return { limit };
	}
}

export default ContentHelperProvider;
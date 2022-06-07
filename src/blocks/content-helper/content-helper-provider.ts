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
import { GetTopPostsResult, BuildFetchDataQueryResult } from './models/ContentHelperProviderFunctionResults';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

interface ApiResponse {
	error?: string;
	data?: SuggestedPost[];
}

class ContentHelperProvider {
	static async getTopPosts(): Promise<GetTopPostsResult> {
		const currentPost: Post = select( 'core/editor' ).getCurrentPost();
		const category = select( 'core' ).getEntityRecord( 'taxonomy', 'category', currentPost.categories[ 0 ] ) as Taxonomy;
		const tag = select( 'core' ).getEntityRecord( 'taxonomy', 'post_tag', Number( currentPost.tags[ 0 ] ) ) as Taxonomy;
		const user = select( 'core' ).getEntityRecord( 'root', 'user', currentPost.author ) as User;

		const fetchQueryResult = this.buildFetchDataQuery( user, category, tag );
		if ( fetchQueryResult.query === null ) {
			return Promise.reject( fetchQueryResult.message );
		}

		const data = await this.fetchData( fetchQueryResult );
		if ( data.length === 0 ) {
			return Promise.reject( 'The Parse.ly API did not return any results.' );
		}

		const message = `Top-performing posts ${ fetchQueryResult.message }.`;
		return { message, posts: this.processData( data ) };
	}

	private static async fetchData( fetchDataQueryResult: BuildFetchDataQueryResult ): Promise<SuggestedPost[]> {
		let response;
		let error;

		try {
			response = await apiFetch( {
				path: addQueryArgs( '/wp-parsely/v1/analytics/posts', fetchDataQueryResult.query ),
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

	private static buildFetchDataQuery( user: User, category: Taxonomy, tag: Taxonomy ): BuildFetchDataQueryResult {
		const limit = 5;

		if ( ! category && ! user && ! tag ) {
			return ( {
				query: null,
				message: "Error: Cannot perform request because the post's Author, Category and Tag are empty.",
			} );
		}

		if ( tag ) {
			return ( {
				query: { limit, tag },
				message: `with the tag "${ tag.name }"`,
			} );
		}
		if ( category?.name ) {
			return ( {
				query: { limit, section: category.name },
				message: `in the category "${ category.name }"`,
			} );
		}

		return ( {
			query: { limit, author: user.name },
			message: `by the author "${ user.name }"`,
		} );
	}
}

export default ContentHelperProvider;

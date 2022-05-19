/**
 * External dependencies
 */
import { select } from '@wordpress/data';
import { Schema } from '@wordpress/core-data';
import Post = Schema.Post;

/**
 * Internal dependencies
 */
import SuggestedPost from './models/SuggestedPost';

class ContentHelperProvider {
	static async getTopPosts(): Promise<SuggestedPost[]> {
		const currentPost: Post = select( 'core/editor' ).getCurrentPost();
		const category = select( 'core' ).getEntityRecord( 'taxonomy', 'category', currentPost.categories[ 0 ] );
		const user = select( 'core' ).getEntityRecord( 'root', 'user', currentPost.author );

		return this.fetchData( user, category );
	}

	static async fetchData( user: any, category: any ): Promise<SuggestedPost[]> {
		// Faking some network delay
		await new Promise( ( r ) => setTimeout( r, 500 ) );

		// TODO: Fetch data with user and category
		return [
			{
				id: 1,
				title: 'Demo Post 1',
				author: 'Some author',
				date: 'December 15, 2022',
				viewUrl: 'http://www.example.com',
				statsUrl: 'http://www.example.com',
			},
			{
				id: 2,
				title: 'Demo Post 2',
				author: 'Some author',
				date: 'December 15, 2022',
				viewUrl: 'http://www.example.com',
				statsUrl: 'http://www.example.com',
			},
			{
				id: 3,
				title: 'Demo Post 3',
				author: 'Some author',
				date: 'December 15, 2022',
				viewUrl: 'http://www.example.com',
				statsUrl: 'http://www.example.com',
			},
			{
				id: 4,
				title: 'Demo Post 4',
				author: 'Some author',
				date: 'December 15, 2022',
				viewUrl: 'http://www.example.com',
				statsUrl: 'http://www.example.com',
			},
			{
				id: 5,
				title: 'Demo Post 5',
				author: 'Some author',
				date: 'December 15, 2022',
				viewUrl: 'http://www.example.com',
				statsUrl: 'http://www.example.com',
			},
		];
	}
}

export default ContentHelperProvider;

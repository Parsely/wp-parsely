/**
 * External dependencies
 */
import { select } from '@wordpress/data';

class ContentHelperProvider {
	static getTopPosts() {
		const post = select( 'core/editor' ).getCurrentPost();
		const category = select( 'core' ).getEntityRecord( 'taxonomy', 'category', post.categories[ 0 ] );
		const user = select( 'core' ).getEntityRecord( 'root', 'user', post.author );

		this.fetchData( user, category );

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

	static fetchData( user, category ) {
		// Fetch data with user and category
	}
}

export default ContentHelperProvider;

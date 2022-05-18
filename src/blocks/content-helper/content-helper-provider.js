/**
 * External dependencies
 */
import { select } from '@wordpress/data';

class ContentHelperProvider {
	static getTopPosts() {
		const post = select( 'core/editor' ).getCurrentPost();
		const term = select( 'core' ).getEntityRecord( 'taxonomy', 'category', 3 );
		const users = select( 'core' ).getEntityRecord( 'root', 'user', 1 );

		return [
			{
				id: 1,
				title: 'Demo Post 1',
				author: 'Some author',
				date: 'Some date',
				viewUrl: 'http://www.example.com',
				statsUrl: 'http://www.example.com',
			},
			{
				id: 2,
				title: 'Demo Post 2',
				author: 'Some author',
				date: 'Some date',
				viewUrl: 'http://www.example.com',
				statsUrl: 'http://www.example.com',
			},
			{
				id: 3,
				title: 'Demo Post 3',
				author: 'Some author',
				date: 'Some date',
				viewUrl: 'http://www.example.com',
				statsUrl: 'http://www.example.com',
			},
			{
				id: 4,
				title: 'Demo Post 4',
				author: 'Some author',
				date: 'Some date',
				viewUrl: 'http://www.example.com',
				statsUrl: 'http://www.example.com',
			},
			{
				id: 5,
				title: 'Demo Post 5',
				author: 'Some author',
				date: 'Some date',
				viewUrl: 'http://www.example.com',
				statsUrl: 'http://www.example.com',
			},
		];
	}
}

export default ContentHelperProvider;

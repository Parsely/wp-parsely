/**
 * External dependencies
 */
import { Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ContentHelperProvider from '../content-helper-provider';
import RelatedTopPostListItem from './related-top-post-list-item';
import { RelatedTopPostData } from '../models/related-top-post-data';

const FETCH_RETRIES = 3;

function RelatedTopPostList() {
	const [ loading, setLoading ] = useState<boolean>( true );
	const [ error, setError ] = useState<string>( null );
	const [ message, setMessage ] = useState<string>( null );
	const [ posts, setPosts ] = useState<RelatedTopPostData[]>( [] );

	useEffect( () => {
		const fetchPosts = async ( retries: number ) => {
			ContentHelperProvider.getRelatedTopPosts()
				.then( ( result ) => {
					setPosts( result.posts );
					setMessage( result.message );
					setLoading( false );
				} )
				.catch( async ( err: string ) => {
					if ( retries > 0 ) {
						await new Promise( ( r ) => setTimeout( r, 500 ) );
						await fetchPosts( retries - 1 );
					} else {
						setLoading( false );
						setError( err );
					}
				} );
		};

		setLoading( true );
		fetchPosts( FETCH_RETRIES );
	}, [] );

	if ( error ) {
		return <p>{ error }</p>;
	}

	const postList = posts.map( ( post ) => <RelatedTopPostListItem key={ post.id } post={ post } /> );
	return (
		<>
			<p>{ message }</p>
			{ loading ? <Spinner /> : postList }
		</>
	);
}

export default RelatedTopPostList;

/**
 * External dependencies
 */
import { Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ContentHelperProvider from '../content-helper-provider';
import PostCard from './PostCard';
import { SuggestedPost } from '../models/SuggestedPost';

const FETCH_RETRIES = 3;

function PostsList() {
	const [ loading, setLoading ] = useState<boolean>( true );
	const [ error, setError ] = useState<string>( null );
	const [ message, setMessage ] = useState<string>( null );
	const [ posts, setPosts ] = useState<SuggestedPost[]>( [] );

	const fetchPosts = async ( retries: number ) => {
		ContentHelperProvider.getTopPosts()
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

	useEffect( () => {
		setLoading( true );
		fetchPosts( FETCH_RETRIES );
	}, [] );

	const body = error ? <p>{ error }</p> : posts.map( ( post ) => <PostCard key={ post.id } post={ post } /> );

	return (
		<>
			<p>{ message }</p>
			{ loading ? <Spinner /> : body }
		</>
	);
}

export default PostsList;

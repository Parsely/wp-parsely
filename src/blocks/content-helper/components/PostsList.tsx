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

function PostsList() {
	const [ loading, setLoading ] = useState<boolean>( true );
	const [ posts, setPosts ] = useState<SuggestedPost[]>( [] );

	const fetchPosts = async ( retry: boolean ) => {
		ContentHelperProvider.getTopPosts()
			.then( ( p ) => {
				setPosts( p );
				setLoading( false );
			} )
			.catch( async () => {
				// TODO: Print error message
				if ( retry ) {
					await new Promise( ( r ) => setTimeout( r, 1000 ) );
					await fetchPosts( false );
				}
			} );
	};

	useEffect( () => {
		setLoading( true );
		fetchPosts( true );
	}, [] );

	return (
		<>
			<p>Related posts that performed well in the past:</p>
			{ loading ? <Spinner /> : posts.map( ( post ) => <PostCard key={ post.id } post={ post } /> ) }
		</>
	);
}

export default PostsList;

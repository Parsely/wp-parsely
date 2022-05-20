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

	const fetchPosts = async () => {
		const fetchedPosts = await ContentHelperProvider.getTopPosts();
		setPosts( fetchedPosts );
	};

	useEffect( () => {
		fetchPosts().then( () => setLoading( false ) );
	}, [] );

	return (
		<>
			<p>Related posts that performed well in the past:</p>
			{ loading ? <Spinner /> : posts.map( ( post ) => <PostCard key={ post.id } post={ post } /> ) }
		</>
	);
}

export default PostsList;

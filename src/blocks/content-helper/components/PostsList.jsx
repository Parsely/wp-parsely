/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import ContentHelperProvider from '../content-helper-provider';
import PostCard from './PostCard.jsx';
import { Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

function PostsList() {
	const [ loading, setLoading ] = useState( true );
	const [ posts, setPosts ] = useState( [] );

	useEffect( async () => {
		const fetchedPosts = await ContentHelperProvider.getTopPosts();
		setPosts( fetchedPosts );
		setLoading( false );
	}, [] );

	return (
		<>
			<p>Related posts that performed well in the past:</p>
			{ loading ? <Spinner /> : posts.map( ( post ) => <PostCard key={ post.id } post={ post } /> ) }
		</>
	);
}

export default PostsList;

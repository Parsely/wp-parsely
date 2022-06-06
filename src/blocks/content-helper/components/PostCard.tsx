/**
 * External dependencies
 */
import { Button, Card, CardBody, CardHeader } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { SuggestedPost } from '../models/SuggestedPost';

interface PostCardProps {
	post: SuggestedPost;
}

function PostCard( { post }: PostCardProps ) {
	return (
		<>
			<Card size="small" elevation={ 2 }>
				<CardHeader><b>{ post.title }</b></CardHeader>
				<CardBody>
					<ul>
						<li>Views: { post.views }</li>
						<li>Published: { post.date }</li>
						<li>Author: { post.author }</li>
					</ul>
					<p>
						<Button href={ post.url } target="_blank" variant="primary">Open Post</Button> { ' ' }
						<Button href={ post.statsUrl } target="_blank" variant="secondary">Post Stats</Button>
					</p>
				</CardBody>
			</Card>
			<br />
		</>
	);
}

export default PostCard;

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
			<Card>
				<CardHeader><b>{ post.title }</b></CardHeader>
				<CardBody>
					<p>Published on { post.date } by <em>{ post.author }</em>.</p>
					<p>
						<Button href={ post.viewUrl } target="_blank" variant="primary">Open Post</Button> { ' ' }
						<Button href={ post.statsUrl } target="_blank" variant="secondary">Post Stats</Button>
					</p>
				</CardBody>
			</Card>
			<br />
		</>
	);
}

export default PostCard;

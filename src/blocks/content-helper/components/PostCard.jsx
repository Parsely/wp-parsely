/**
 * External dependencies
 */
import { Button, Card, CardBody, CardHeader } from '@wordpress/components';

function PostCard( { post } ) {
	return (
		<>
			<Card>
				<CardHeader><b>{ post.title }</b></CardHeader>
				<CardBody>
					<p>Published on December 15, 2022 by Author</p>
					<p><Button variant="primary">Open Post</Button> <Button variant="secondary">Post Stats</Button></p>
				</CardBody>
			</Card>
			<br />
		</>
	);
}

export default PostCard;

import { Button, Card, CardBody, CardHeader } from '@wordpress/components';

function PostCard( props ) {
	return (
		<>
			<Card>
				<CardHeader><b>{ props.title }</b></CardHeader>
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

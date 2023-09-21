/**
 * Internal dependencies
 */
import { TopPostData } from '../model';
import { TopPostListItem } from './top-posts-list-item';

/**
 * Defines the props structure for TopPostsList.
 *
 * @since 3.10.0
 */
interface TopPostsListProps {
	posts: TopPostData[];
	metric: string;
}

/**
 * Returns an ordered list element containing Top Posts.
 *
 * @since 3.10.0
 *
 * @param {TopPostsListProps} props The component's props.
 *
 * @return {JSX.Element} The JSX Element.
 */
export function TopPostsList( { posts, metric }: TopPostsListProps ): JSX.Element {
	return (
		<ol className="parsely-top-posts">
			{ posts.map( ( post: TopPostData ): JSX.Element =>
				<TopPostListItem key={ post.id } metric={ metric } post={ post } />
			) }
		</ol>
	);
}

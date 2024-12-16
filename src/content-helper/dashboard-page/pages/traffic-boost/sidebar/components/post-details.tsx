/**
 * WordPress dependencies
 */
import { format } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { HydratedPost } from '../../../../../common/base-wordpress-provider';
import { Thumbnail } from '../../../../../common/components/thumbnail';

/**
 * Defines the props structure for PostDetailsSidebar.
 *
 * @since 3.18.0
 */
interface PostDetailsSidebarProps {
    post: HydratedPost;
}

/**
 * Component that displays post details including thumbnail and meta information.
 *
 * @since 3.18.0
 *
 * @param {PostDetailsSidebarProps} props Component props.
 */
export const PostDetailsSidebar = ( { post }: PostDetailsSidebarProps ): React.JSX.Element => {
	const prettyDate = format( 'M j, o', post.date ?? '' );

	return (
		<div className="traffic-boost-post-details">
			<Thumbnail
				post={ post }
				size={ 100 }
				className="traffic-boost-thumbnail"
			/>
			<div className="post-details">
				<div className="post-title">
					{ post.title.rendered !== ''
						? post.title.rendered
						: __( '(no title)', 'wp-parsely' ) }
				</div>
				<div className="post-meta">
					<span className="post-date">{ prettyDate }</span>
					<span className="post-author">{ post.author?.name }</span>
				</div>
				<div className="post-categories">
					{ post.categories.map( ( category ) => (
						<span key={ category.id }>{ category.name }</span>
					) ) }
				</div>
			</div>
		</div>
	);
};

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { RelatedTopPostData } from '../models/related-top-post-data';
import ViewsIcon from '../icons/views-icon';
import PublishedLinkIcon from '../icons/published-link-icon';

interface RelatedTopPostListItemProps {
	post: RelatedTopPostData;
}

function RelatedTopPostListItem( { post }: RelatedTopPostListItemProps ): JSX.Element {
	return (
		<div className="parsely-top-post" data-testid="parsely-top-post">
			<div className="parsely-top-post-title">
				<a className="parsely-top-post-stats-link" href={ post.statsUrl } target="_blank" rel="noreferrer" title={ __( 'View in Parse.ly', 'wp-parsely' ) }>
					{ post.title }
				</a>
				<a className="parsely-top-post-link" href={ post.url } target="_blank" rel="noreferrer" title={ __( 'View Published Post', 'wp-parsely' ) }>
					<PublishedLinkIcon />
				</a>
			</div>
			<ul className="parsely-top-post-info">
				<li className="parsely-top-post-date">{ post.date }</li>
				<li className="parsely-top-post-author">{ post.author }</li>
				<li className="parsely-top-post-views"><ViewsIcon />{ post.views }</li>
			</ul>
		</div>
	);
}

export default RelatedTopPostListItem;

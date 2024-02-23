/**
 * WordPress dependencies
 */
import { Dashicon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { EditIcon } from '../../common/icons/edit-icon';
import { OpenLinkIcon } from '../../common/icons/open-link-icon';
import { ViewsIcon } from '../../common/icons/views-icon';
import { getSmartShortDate } from '../../common/utils/date';
import {
	PostListItemMetric,
	PostListItemProps,
	getPostEditUrl,
} from '../../common/utils/post';

export function RelatedPostListItem(
	{ metric, post }: Readonly<PostListItemProps>
): JSX.Element {
	return (
		<li className="parsely-related-post" data-testid="parsely-related-post">
			<div className="parsely-related-post-title">
				<a className="parsely-related-post-stats-link" href={ post.dashUrl } target="_blank" rel="noreferrer">
					<span className="screen-reader-text">
						{ __( 'View in Parse.ly (opens new tab)', 'wp-parsely' ) }
					</span>
					{ post.title }
				</a>

				<a className="parsely-related-post-view-link" href={ post.url } target="_blank" rel="noreferrer">
					<span className="screen-reader-text">
						{ __( 'View Post (opens new tab)', 'wp-parsely' ) }
					</span>
					<OpenLinkIcon />
				</a>

				{
					0 !== post.postId &&
					<a className="parsely-related-post-edit-link" href={ getPostEditUrl( post.postId ) } target="_blank" rel="noreferrer">
						<span className="screen-reader-text">
							{ __( 'Edit Post (opens new tab)', 'wp-parsely' ) }
						</span>
						<EditIcon />
					</a>
				}
			</div>
			<p className="parsely-related-post-info">
				<span className="parsely-related-post-date">
					<span className="screen-reader-text">{ __( 'Date', 'wp-parsely' ) }</span>
					{ getSmartShortDate( new Date( post.date ) ) }
				</span>
				<span className="parsely-related-post-author">
					<span className="screen-reader-text">{ __( 'Author', 'wp-parsely' ) }</span>
					{ post.author }
				</span>
				<PostListItemMetric
					metric={ metric }
					post={ post }
					viewsIcon={ <ViewsIcon /> }
					avgEngagedIcon={ <Dashicon icon="clock" /> }
				/>
			</p>
		</li>
	);
}

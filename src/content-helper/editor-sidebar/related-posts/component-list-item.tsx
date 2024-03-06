/**
 * WordPress dependencies
 */
import { Button, Dashicon, Tooltip } from "@wordpress/components";
import { __ } from '@wordpress/i18n';
import { check, copySmall, edit, external, Icon } from "@wordpress/icons";

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
		<div className="related-post-single" data-testid="related-post-single">
			<div className="related-post-title">
				<a
					className="related-post-stats-link"
					href={ post.dashUrl }
					target="_blank"
					rel="noreferrer"
				>
					<span className="screen-reader-text">
						{ __( 'View in Parse.ly (opens new tab)', 'wp-parsely' ) }
					</span>
					{ post.title }
				</a>

				<a
					className="related-post-view-link"
					href={ post.url }
					target="_blank"
					rel="noreferrer"
				>
					<span className="screen-reader-text">
						{ __( 'View Post (opens new tab)', 'wp-parsely' ) }
					</span>
					<Tooltip
						text={ __( 'View Post', 'wp-parsely' ) }
					>
						<Icon icon={ external } size={16} />
					</Tooltip>
				</a>

				{ 0 === post.postId && (
					<a
						className="related-post-edit-link"
						href={ getPostEditUrl( post.postId ) }
						target="_blank"
						rel="noreferrer"
					>
						<span className="screen-reader-text">
							{ __( 'Edit Post (opens new tab)', 'wp-parsely' ) }
						</span>
						<Tooltip
							text={ __( 'Edit Post', 'wp-parsely' ) }
						>
							<Icon icon={ edit } size={16} />
						</Tooltip>
					</a>
				) }
			</div>
			<div className="related-post-info">
				<span className="related-post-date">
					<span className="screen-reader-text">{ __( 'Date', 'wp-parsely' ) }</span>
					{ getSmartShortDate( new Date( post.date ) ) }
				</span>
				<span className="related-post-author">
					<span className="screen-reader-text">{ __( 'Author', 'wp-parsely' ) }</span>
					{ post.author }
				</span>
			</div>
			<div className="related-post-links">
				<div className="related-post-linked">
					<Icon icon={ check } size={ 18 } />
					{ __( 'Linked', 'wp-parsely' ) }
				</div>
				<div className="related-post-metric">
					<PostListItemMetric
						metric={ metric }
						post={ post }
						viewsIcon={ <Icon icon={ <ViewsIcon /> } size={ 18 } /> }
						avgEngagedIcon={ <Dashicon icon="clock" size={ 18 } /> }
					/>
				</div>
				<div className="related-post-copy-url">
					<Button variant="link" >
						{ __( 'Copy URL', 'wp-parsely' ) }
						<Icon icon={ copySmall } size={ 18 } />
					</Button>
				</div>
			</div>
		</div>
	);
}

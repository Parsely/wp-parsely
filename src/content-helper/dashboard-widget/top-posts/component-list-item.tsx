/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TopPostData } from './model';
import { impreciseNumber } from '../../../blocks/shared/functions';
import PublishedLinkIcon from '../../../blocks/content-helper/icons/published-link-icon';
import { getSmartShortDate } from '../../../blocks/shared/utils/date';

interface TopPostListItemProps {
	post: TopPostData;
}

/**
 * Returns a single list item depicting a post.
 *
 * @param {TopPostData} post The Post to be shown.
 */
function TopPostListItem( { post }: TopPostListItemProps ): JSX.Element {
	return (
		<li className="parsely-top-post">
			<div className="parsely-top-post-wrapper">

				<div className="parsely-top-post-thumbnail">
					<span className="screen-reader-text">Thumbnail</span>
					<img src={ post.thumbUrlMedium } alt={ __( 'Post thumbnail', 'wp-parsely' ) } />
				</div>

				<div className="parsely-top-post-data">

					<span className="parsely-top-post-views">
						<span className="screen-reader-text">Number of Views</span>
						{ impreciseNumber( post.views.toString() ) }
					</span>

					{ getPostTitleElement( { post } ) }

					<a className="parsely-top-post-icon-link" href={ post.url } target="_blank" rel="noreferrer">
						<span className="screen-reader-text">
							{ __( 'View Published Post (opens in new tab)', 'wp-parsely' ) }
						</span>
						<PublishedLinkIcon />
					</a>

					<div className="parsely-top-post-metadata">
						<span className="parsely-top-post-date">
							<span className="screen-reader-text">Date</span>
							{ getSmartShortDate( new Date( post.date ) ) }
						</span>
						<span className="parsely-top-post-author">
							<span className="screen-reader-text">Author</span>
							{ post.author }
						</span>
					</div>

				</div>

			</div>
		</li>
	);
}

/**
 * Returns the Post title as a link (for editing the Post) or a div if the Post
 * has no valid ID.
 *
 * @param {TopPostData} post The Post from which to get the data.
 */
function getPostTitleElement( { post }: TopPostListItemProps ): JSX.Element {
	const titleLinkUrl = `/wp-admin/post.php?post=${ post.postId }&action=edit`;

	let titleLink =
		<a className="parsely-top-post-title" href={ titleLinkUrl } target="_blank" rel="noreferrer">
			<span className="screen-reader-text">
				{ __( 'View in Parse.ly (opens in new tab)', 'wp-parsely' ) }
			</span>
			{ post.title }
		</a>;

	if ( 0 === post.postId ) {
		titleLink = <div className="parsely-top-post-title">{ post.title }</div>;
	}

	return titleLink;
}

export default TopPostListItem;

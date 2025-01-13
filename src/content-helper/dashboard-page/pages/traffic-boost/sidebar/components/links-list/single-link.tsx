/**
 * Internal Dependencies
 */
import { Thumbnail } from '../../../../../../common/components/thumbnail';
import { TrafficBoostLink } from '../../../provider';

/**
 * Defines the props structure for SingleLink.
 *
 * @since 3.18.0
 */
type SingleLinkProps = {
    suggestion: TrafficBoostLink;
	isActive: boolean;
	onClick?: ( suggestion: TrafficBoostLink ) => void;
};

/**
 * Displays a single traffic boost link.
 *
 * @since 3.18.0
 *
 * @param {SingleLinkProps} props Component props.
 */
export const SingleLink = ( {
	suggestion,
	isActive,
	onClick,
}: SingleLinkProps ): React.JSX.Element => {
	const suggestedPost = suggestion.targetPost;

	/**
	 * Handles the click event for the single link.
	 *
	 * @since 3.18.0
	 */
	const onClickHandler = () => {
		onClick?.( suggestion );
	};

	return (
		<div
			className={ `traffic-boost-single-link ${ isActive ? 'active' : '' }` }
			onClick={ onClickHandler }
			onKeyDown={ ( e ) => {
				if ( e.key === 'Enter' || e.key === ' ' ) {
					onClickHandler();
				}
			} }
			role="button"
			tabIndex={ 0 }
		>
			<div className="single-link-thumbnail">
				<Thumbnail
					post={ suggestedPost }
					size={ 52 }
					className="traffic-boost-preview-thumbnail"
				/>
			</div>
			<div className="single-link-details">
				<div className="single-link-title">
					{ suggestedPost.title.rendered }
				</div>
			</div>
		</div>
	);
};

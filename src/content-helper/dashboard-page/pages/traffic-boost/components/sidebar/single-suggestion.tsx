/**
 * Internal Dependencies
 */
import { Thumbnail } from '../../../../../common/components/thumbnail';
import { TrafficBoostSuggestion } from '../../provider';

/**
 * Defines the props structure for SingleSuggestion.
 *
 * @since 3.18.0
 */
type SingleSuggestionProps = {
    suggestion: TrafficBoostSuggestion;
    isActive: boolean;
    onClick?: () => void;
};

/**
 * Displays a single suggestion for traffic boosting.
 *
 * @since 3.18.0
 *
 * @param {SingleSuggestionProps} props Component props.
 */
export const SingleSuggestion = ( {
	suggestion,
	isActive,
	onClick,
}: SingleSuggestionProps ): React.JSX.Element => {
	const suggestedPost = suggestion.source_post;
	return (
		<div
			className={ `traffic-boost-single-suggestion ${ isActive ? 'active' : '' }` }
			onClick={ onClick }
			onKeyDown={ ( e ) => {
				if ( e.key === 'Enter' || e.key === ' ' ) {
					onClick?.();
				}
			} }
			role="button"
			tabIndex={ 0 }
		>
			<div className="single-suggestion-thumbnail">
				<Thumbnail
					post={ suggestedPost }
					size={ 52 }
					className="traffic-boost-preview-thumbnail"
				/>
			</div>
			<div className="single-suggestion-details">
				<div className="single-suggestion-title">
					{ suggestedPost.title.rendered }
				</div>
			</div>
		</div>
	);
};

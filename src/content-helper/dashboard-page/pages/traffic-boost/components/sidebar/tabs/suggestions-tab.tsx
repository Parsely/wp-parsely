/**
 * External dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { SuggestionsList } from '../suggestions-list';
import { TrafficBoostSuggestion } from '../../../provider';

/**
 * Defines the props structure for SuggestionsTab.
 *
 * @since 3.18.0
 */
interface SuggestionsTabProps {
	onSuggestionClick?: ( suggestion: TrafficBoostSuggestion ) => void;
	onTotalItemsChange?: ( totalItems: number ) => void;
}

/**
 * Component that renders the suggestions tab.
 *
 * @since 3.18.0
 *
 * @param {SuggestionsTabProps} props Component props.
 */
const SuggestionsTab = ( {
	onSuggestionClick,
	onTotalItemsChange,
}: SuggestionsTabProps ): React.JSX.Element => {
	const [ activeSuggestion, setActiveSuggestion ] = useState<TrafficBoostSuggestion | null>( null );

	const handleSuggestionClick = ( suggestion: TrafficBoostSuggestion ) => {
		setActiveSuggestion( suggestion );
		onSuggestionClick?.( suggestion );
	};

	return (
		<SuggestionsList
			onSuggestionClick={ handleSuggestionClick }
			onTotalItemsChange={ onTotalItemsChange }
			activeSuggestionId={ activeSuggestion?.source_post.id }
		/>
	);
};

export default SuggestionsTab;

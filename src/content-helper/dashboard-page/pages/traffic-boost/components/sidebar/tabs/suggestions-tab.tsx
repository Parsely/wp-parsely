/**
 * External dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { TrafficBoostLink } from '../../../provider';
import { TrafficBoostStore } from '../../../store';
import { LinksList } from '../links-list/links-list';

/**
 * Defines the props structure for SuggestionsTab.
 *
 * @since 3.18.0
 */
interface SuggestionsTabProps {
	onSuggestionClick?: ( suggestion: TrafficBoostLink ) => void;
	activeLink: TrafficBoostLink | null;
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
	activeLink,
}: SuggestionsTabProps ): React.JSX.Element => {
	const { suggestions, currentPage, itemsPerPage } = useSelect( ( select ) => ( {
		selectedLink: select( TrafficBoostStore ).getSelectedLink(),
		suggestions: select( TrafficBoostStore ).getSuggestions(),
		currentPage: select( TrafficBoostStore ).getSuggestionsPage(),
		itemsPerPage: select( TrafficBoostStore ).getSuggestionsItemsPerPage(),
	} ), [] );

	const { setSuggestionsPage, setSuggestionsItemsPerPage } = useDispatch( TrafficBoostStore );

	return (
		<LinksList
			links={ suggestions }
			onClick={ onSuggestionClick }
			activeLink={ activeLink?.isSuggestion ? activeLink : null }
			currentPage={ currentPage }
			itemsPerPage={ itemsPerPage }
			onPageChange={ setSuggestionsPage }
			onItemsPerPageChange={ setSuggestionsItemsPerPage }
		/>
	);
};

export default SuggestionsTab;

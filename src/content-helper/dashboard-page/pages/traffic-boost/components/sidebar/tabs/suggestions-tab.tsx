/**
 * External dependencies
 */
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { LinksList } from '../links-list/links-list';
import { TrafficBoostLink } from '../../../provider';
import { DashboardProvider } from '../../../../../provider';

/**
 * Defines the props structure for SuggestionsTab.
 *
 * @since 3.18.0
 */
interface SuggestionsTabProps {
	onSuggestionClick?: ( suggestion: TrafficBoostLink ) => void;
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
	const fetchSuggestions = useCallback( async ( page: number, perPage: number ) => {
		const provider = DashboardProvider.getInstance();
		const fetchedSuggestions = await provider.getPosts( { page, per_page: perPage } );

		// Map the fetched suggestions to the TrafficBoostLink format.
		const mappedSuggestions = fetchedSuggestions.data.map( ( post ) => ( {
			targetPost: post,
		} ) );
		onTotalItemsChange?.( fetchedSuggestions.total_items );

		return {
			data: mappedSuggestions,
			totalPages: fetchedSuggestions.total_pages,
			totalItems: fetchedSuggestions.total_items,
		};
	}, [ onTotalItemsChange ] );

	const handleSuggestionClick = ( suggestion: TrafficBoostLink ) => {
		onSuggestionClick?.( suggestion );
	};

	return (
		<LinksList
			links={ [] }
			isLoading={ false }
			onSuggestionClick={ handleSuggestionClick }
			onFetchPage={ fetchSuggestions }
			minItemsPerPage={ 3 }
		/>
	);
};

export default SuggestionsTab;

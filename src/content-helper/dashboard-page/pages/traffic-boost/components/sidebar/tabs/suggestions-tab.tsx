/**
 * External dependencies
 */
import { useCallback, useState } from '@wordpress/element';

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
	const [ error, setError ] = useState<string | null>( null );

	const fetchSuggestions = useCallback( async ( page: number, perPage: number ) => {
		try {
			const provider = DashboardProvider.getInstance();
			const fetchedSuggestions = await provider.getPosts( { page, per_page: perPage } );
			const mappedSuggestions = fetchedSuggestions.data.map( ( post ) => ( {
				targetPost: post,
			} ) );
			onTotalItemsChange?.( fetchedSuggestions.total_items );

			return {
				data: mappedSuggestions,
				totalPages: fetchedSuggestions.total_pages,
				totalItems: fetchedSuggestions.total_items,
			};
		} catch ( err ) {
			const message = err instanceof Error ? err.message : 'Failed to fetch suggestions';
			setError( message );
			throw err;
		}
	}, [ onTotalItemsChange ] );

	const handleSuggestionClick = ( suggestion: TrafficBoostLink ) => {
		onSuggestionClick?.( suggestion );
	};

	return (
		<LinksList
			links={ [] }
			isLoading={ false }
			error={ error }
			onSuggestionClick={ handleSuggestionClick }
			onFetchPage={ fetchSuggestions }
			minItemsPerPage={ 3 }
		/>
	);
};

export default SuggestionsTab;

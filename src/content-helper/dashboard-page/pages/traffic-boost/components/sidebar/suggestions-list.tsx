/**
 * WordPress dependencies
 */
import {
	Button,
	__experimentalNumberControl as NumberControl,
	Spinner,
} from '@wordpress/components';
import { debounce } from '@wordpress/compose';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { chevronLeft, chevronRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { HydratedPost } from '../../../../../common/base-wordpress-provider';
import { DashboardProvider } from '../../../../provider';
import { TrafficBoostSuggestion } from '../../provider';
import { SingleSuggestion } from './single-suggestion';

/**
 * Defines the props structure for SuggestionsList.
 *
 * @since 3.18.0
 */
interface SuggestionsListProps {
	minItemsPerPage?: number;
	activeSuggestionId?: number;
	onTotalItemsChange?: ( total: number ) => void;
	onSuggestionClick?: ( suggestion: TrafficBoostSuggestion ) => void;
}

/**
 * Displays a list of suggestions for traffic boosting.
 *
 * @since 3.18.0
 *
 * @param {SuggestionsListProps} props - Component props.
 */
export const SuggestionsList = ( {
	activeSuggestionId,
	minItemsPerPage = 3,
	onTotalItemsChange,
	onSuggestionClick,
}: SuggestionsListProps ): React.JSX.Element => {
	const [ posts, setPosts ] = useState<HydratedPost[]>( [] );
	const [ currentPage, setCurrentPage ] = useState<number>( 1 );
	const [ totalPages, setTotalPages ] = useState<number>( 1 );
	const [ isLoading, setIsLoading ] = useState<boolean>( true );
	const [ itemsPerPage, setItemsPerPage ] = useState<number | null>( null );
	const containerRef = useRef<HTMLDivElement>( null );
	const lastContainerHeight = useRef<number>( 0 );

	/**
	 * Calculates the number of items per page based on the container height.
	 *
	 * @since 3.18.0
	 */
	const calculateItemsPerPage = useCallback( () => {
		if ( ! containerRef.current || 0 === totalPages ) {
			return;
		}

		// Height of the container.
		const containerHeight = containerRef.current.clientHeight;

		// If the container height hasn't changed, don't recalculate.
		if ( containerHeight === lastContainerHeight.current ) {
			return;
		}
		lastContainerHeight.current = containerHeight;

		// Size of a single suggestion item including border.
		const itemHeight = 85; // 84px + 2px border
		// Size of pagination including border.
		const paginationHeight = totalPages > 0 ? 60 : 0;

		const availableHeight = containerHeight - paginationHeight;
		const calculatedItems = Math.floor( availableHeight / itemHeight );
		let newItemsPerPage = Math.max( 1, calculatedItems );

		if ( newItemsPerPage < minItemsPerPage ) {
			newItemsPerPage = minItemsPerPage;
		}

		setItemsPerPage( newItemsPerPage );
	}, [ minItemsPerPage, totalPages ] );

	/**
	 * Debounced version of calculateItemsPerPage to prevent excessive recalculations.
	 *
	 * @since 3.18.0
	 */
	const debouncedCalculateItemsPerPage = debounce( calculateItemsPerPage, 200 );

	/**
	 * Handles the resize event to recalculate items per page.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		debouncedCalculateItemsPerPage();

		const resizeObserver = new ResizeObserver( debouncedCalculateItemsPerPage );

		if ( containerRef.current ) {
			resizeObserver.observe( containerRef.current );
		}

		return () => {
			resizeObserver.disconnect();
			debouncedCalculateItemsPerPage.cancel();
		};
	}, [ debouncedCalculateItemsPerPage ] );

	/**
	 * Fetches posts when the current page or items per page changes,
	 * either triggered by the user or automatically by the resize observer.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( itemsPerPage === null ) {
			return;
		}

		const fetchPosts = async () => {
			setIsLoading( true );
			// TODO: Replace this with a query that gets the suggestions.
			try {
				const fetchedPosts = await DashboardProvider.getInstance().getPosts( {
					per_page: itemsPerPage,
					page: currentPage,
					order: 'asc',
				} );

				setPosts( fetchedPosts.data );
				setTotalPages( fetchedPosts.total_pages );
				onTotalItemsChange?.( fetchedPosts.total_items );
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( error );
			} finally {
				setIsLoading( false );
			}
		};

		fetchPosts();
	}, [ currentPage, itemsPerPage, onTotalItemsChange ] );

	/**
	 * Handles the previous page navigation.
	 *
	 * @since 3.18.0
	 */
	const handlePrevious = () => {
		setCurrentPage( ( prev ) => Math.max( prev - 1, 1 ) );
	};

	/**
	 * Handles the next page navigation.
	 *
	 * @since 3.18.0
	 */
	const handleNext = () => {
		setCurrentPage( ( prev ) => Math.min( prev + 1, totalPages ) );
	};

	/**
	 * Renders the suggestions list and handles loading and empty state.
	 *
	 * @since 3.18.0
	 */
	const renderSuggestionsList = () => {
		if ( ( isLoading && posts.length === 0 ) || itemsPerPage === null ) {
			return <Spinner />;
		}

		if ( posts.length === 0 ) {
			return <p>{ __( 'No posts found.', 'wp-parsely' ) }</p>;
		}

		return (
			<div className="traffic-boost-suggestions-list">
				{ posts.map( ( post ) => {
					const suggestion = {
						source_post: post,
						destination_post: post, // Using same post as placeholder
					};
					return (
						<SingleSuggestion
							key={ post.id }
							suggestion={ suggestion }
							isActive={ post.id === activeSuggestionId }
							onClick={ () => onSuggestionClick?.( suggestion ) }
						/>
					);
				} ) }
			</div>
		);
	};

	return (
		<div className="traffic-boost-suggestions" ref={ containerRef }>
			{ renderSuggestionsList() }
			{ totalPages > 1 && (
				<div className="suggestions-pagination">
					<div className="page-selector">
						<span>{ __( 'Page', 'wp-parsely' ) }</span>
						<NumberControl
							value={ currentPage }
							onChange={ ( value ) => {
								let selectedPage = parseInt( value ?? '1', 10 );
								if ( selectedPage > totalPages ) {
									selectedPage = totalPages;
								} else if ( selectedPage < 1 ) {
									selectedPage = 1;
								}
								setCurrentPage( selectedPage );
							} }
							min={ 1 }
							max={ totalPages }
							dragDirection="e"
						/>
						<span>
							{ __( 'of', 'wp-parsely' ) } { totalPages }
						</span>
					</div>
					<div className="page-navigation">
						<Button
							icon={ chevronLeft }
							onClick={ handlePrevious }
							disabled={ currentPage === 1 }
						/>
						<Button
							icon={ chevronRight }
							onClick={ handleNext }
							disabled={ currentPage >= totalPages }
						/>
					</div>
				</div>
			) }
		</div>
	);
};

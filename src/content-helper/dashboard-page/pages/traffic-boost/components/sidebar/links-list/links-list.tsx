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
import { TrafficBoostLink } from '../../../provider';
import { SingleLink } from './single-link';
import { ContentHelperError } from '../../../../../../common/content-helper-error';
import './links-list.scss';

/**
 * Defines the result structure for LinksList fetch.
 *
 * @since 3.18.0
 */
export interface LinksListFetchResult {
	data: TrafficBoostLink[];
	totalPages: number;
	totalItems: number;
}
/**
 * Defines the props structure for LinksList.
 *
 * @since 3.18.0
 */
interface LinksListProps {
	links: TrafficBoostLink[];
	isLoading: boolean;
	error: string | null;
	onSuggestionClick?: ( suggestion: TrafficBoostLink ) => void;
	minItemsPerPage?: number;
	onFetchPage: ( page: number, perPage: number ) => Promise<LinksListFetchResult>;
	onFetchError?: ( error: ContentHelperError ) => void;
}

/**
 * Displays a list of traffic boost links.
 *
 * @since 3.18.0
 *
 * @param {LinksListProps} props - Component props.
 */
export const LinksList = ( {
	links: initialLinks,
	onSuggestionClick,
	minItemsPerPage = 3,
	onFetchPage,
	onFetchError,
}: LinksListProps ): React.JSX.Element => {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ error, setError ] = useState<ContentHelperError | null>( null );

	const [ links, setLinks ] = useState<TrafficBoostLink[]>( initialLinks );

	const [ currentPage, setCurrentPage ] = useState<number>( 1 );
	const [ totalPages, setTotalPages ] = useState<number>( 1 );
	const [ totalItems, setTotalItems ] = useState<number>( 0 );
	const [ itemsPerPage, setItemsPerPage ] = useState<number>( 0 );

	const [ activeLinkPostId, setActiveLinkPostId ] = useState<number | null>( null );

	const containerRef = useRef<HTMLDivElement>( null );
	const lastContainerHeight = useRef<number>( 0 );

	/**
	 * Calculates the number of items that can fit in the container.
	 *
	 * This calculation is based on the container's height and accounts for
	 * the height of individual items and pagination controls.
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
	 * Debounced version of calculateItemsPerPage to avoid excessive calculations.
	 *
	 * @since 3.18.0
	 */
	const debouncedCalculateItemsPerPage = debounce( calculateItemsPerPage, 200 );

	/**
	 * Sets up the resize observer to recalculate items per page when container size changes.
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
	 * Fetches suggestions data when page or items per page changes.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const fetchData = async () => {
			try {
				setIsLoading( true );

				const pageToFetch = currentPage;
				const result = await onFetchPage( pageToFetch, itemsPerPage );

				setLinks( result.data );
				setTotalPages( result.totalPages );
				setTotalItems( result.totalItems );
			} catch ( err ) {
				setError( err as ContentHelperError );
				onFetchError?.( err as ContentHelperError );
			} finally {
				setIsLoading( false );
			}
		};

		if ( itemsPerPage > 0 ) {
			fetchData();
		}
	}, [ currentPage, itemsPerPage, onFetchError, onFetchPage ] );

	/**
	 * Adjusts the current page if it exceeds the total number of pages.
	 *
	 * This is to handle the case where the total number of items is less than the
	 * number of items per page, and will trigger a fetch.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const calculatedTotalPages = Math.ceil( totalItems / itemsPerPage );

		if ( calculatedTotalPages < currentPage && calculatedTotalPages > 0 ) {
			setCurrentPage( calculatedTotalPages );
		}
	}, [ totalItems, itemsPerPage, currentPage ] );

	/**
	 * Handles navigation to the previous page of suggestions.
	 *
	 * @since 3.18.0
	 */
	const handlePrevious = () => {
		setCurrentPage( ( prev ) => Math.max( prev - 1, 1 ) );
	};

	/**
	 * Handles navigation to the next page of suggestions.
	 *
	 * @since 3.18.0
	 */
	const handleNext = () => {
		setCurrentPage( ( prev ) => Math.min( prev + 1, totalPages ) );
	};

	const onSuggestionClickHandler = ( suggestion: TrafficBoostLink ) => {
		setActiveLinkPostId( suggestion.targetPost.id );
		onSuggestionClick?.( suggestion );
	};

	/**
	 * Renders the suggestions list and handles loading and empty state.
	 *
	 * @since 3.18.0
	 */
	const renderLinksList = () => {
		if ( ( isLoading && links.length === 0 ) || itemsPerPage === null ) {
			return <Spinner />;
		}

		if ( error ) {
			return <p>{ error.message }</p>;
		}

		if ( links.length === 0 ) {
			return <p>{ __( 'No posts found.', 'wp-parsely' ) }</p>;
		}

		return (
			<div className="traffic-boost-links-list">
				{ links.map( ( link: TrafficBoostLink ) => {
					return (
						<SingleLink
							key={ link.targetPost.id }
							suggestion={ link }
							isActive={ link.targetPost.id === activeLinkPostId }
							onClick={ onSuggestionClickHandler }
						/>
					);
				} ) }
			</div>
		);
	};

	return (
		<div className="traffic-boost-links" ref={ containerRef }>
			{ renderLinksList() }
			{ totalPages > 1 && (
				<div className="links-pagination">
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

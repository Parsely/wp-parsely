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
import './links-list.scss';

/**
 * Defines the props structure for LinksList.
 *
 * @since 3.18.0
 */
interface LinksListProps {
	links: TrafficBoostLink[];
	minItemsPerPage?: number;
	currentPage?: number;
	itemsPerPage?: number;
	onClick?: ( link: TrafficBoostLink ) => void;
	onPageChange?: ( page: number ) => void;
	onItemsPerPageChange?: ( itemsPerPage: number ) => void;
}

/**
 * Displays a list of traffic boost links.
 *
 * @since 3.18.0
 *
 * @param {LinksListProps} props - Component props.
 */
export const LinksList = ( {
	links,
	onClick,
	minItemsPerPage = 3,
	currentPage = 1,
	itemsPerPage = 3,
	onPageChange,
	onItemsPerPageChange,
}: LinksListProps ): React.JSX.Element => {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ visibleLinks, setVisibleLinks ] = useState<TrafficBoostLink[]>(
		links.slice( 0, itemsPerPage )
	);
	const [ totalPages, setTotalPages ] = useState<number>(
		Math.ceil( links.length / itemsPerPage )
	);
	const [ activeLinkPostId, setActiveLinkPostId ] = useState<number | null>( null );

	const containerRef = useRef<HTMLDivElement>( null );
	const lastContainerHeight = useRef<number>( 0 );

	/**
	 * Calculates the number of items that can fit in the container.
	 *
	 * @since 3.18.0
	 */
	const calculateItemsPerPage = useCallback( () => {
		if ( ! containerRef.current ) {
			onItemsPerPageChange?.( minItemsPerPage );
			return;
		}

		const containerHeight = containerRef.current.clientHeight;

		if ( containerHeight === lastContainerHeight.current ) {
			return;
		}
		lastContainerHeight.current = containerHeight;

		const itemHeight = 85;
		const paginationHeight = 60;
		const availableHeight = containerHeight - paginationHeight;
		const calculatedItems = Math.floor( availableHeight / itemHeight );
		const newItemsPerPage = Math.max( minItemsPerPage, calculatedItems );

		onItemsPerPageChange?.( newItemsPerPage );
		setIsLoading( false );
	}, [ minItemsPerPage, onItemsPerPageChange ] );

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
	 * Updates visible links when page, itemsPerPage, or links change
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const startIndex = ( currentPage - 1 ) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const calculatedTotalPages = Math.ceil( links.length / itemsPerPage );

		setVisibleLinks( links.slice( startIndex, endIndex ) );
		setTotalPages( calculatedTotalPages );

		// Adjust current page if it exceeds total pages
		if ( calculatedTotalPages < currentPage && calculatedTotalPages > 0 ) {
			onPageChange?.( calculatedTotalPages );
		}
	}, [ currentPage, itemsPerPage, links, onPageChange ] );

	/**
	 * Handles navigation to the previous page of suggestions.
	 *
	 * @since 3.18.0
	 */
	const handlePrevious = () => {
		onPageChange?.( Math.max( currentPage - 1, 1 ) );
	};

	/**
	 * Handles navigation to the next page of suggestions.
	 *
	 * @since 3.18.0
	 */
	const handleNext = () => {
		onPageChange?.( Math.min( currentPage + 1, totalPages ) );
	};

	const onSuggestionClickHandler = ( suggestion: TrafficBoostLink ) => {
		setActiveLinkPostId( suggestion.targetPost.id );
		onClick?.( suggestion );
	};

	/**
	 * Renders the suggestions list and handles loading and empty state.
	 *
	 * @since 3.18.0
	 */
	const renderLinksList = (): React.JSX.Element | null => {
		if ( isLoading && visibleLinks.length === 0 ) {
			return <Spinner />;
		}

		// If we have links data but nothing is visible yet, don't show the "no posts" message
		const isInitialState = links.length > 0 && visibleLinks.length === 0;
		if ( isInitialState ) {
			return null;
		}

		if ( visibleLinks.length === 0 ) {
			return <p>{ __( 'No posts found.', 'wp-parsely' ) }</p>;
		}

		return (
			<div className="traffic-boost-links-list">
				{ visibleLinks.map( ( link: TrafficBoostLink ) => {
					return (
						<SingleLink
							key={ link.targetPost.id + ( link.smart_link?.uid ?? '' ) }
							suggestion={ link }
							isActive={ link.targetPost.id === activeLinkPostId }
							onClick={ onSuggestionClickHandler }
						/>
					);
				} ) }
			</div>
		);
	};

	const handlePageChange = ( value?: string ) => {
		if ( ! value ) {
			return;
		}

		let selectedPage = parseInt( value, 10 );
		if ( selectedPage > totalPages ) {
			selectedPage = totalPages;
		} else if ( selectedPage < 1 ) {
			selectedPage = 1;
		}
		onPageChange?.( selectedPage );
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
							onChange={ handlePageChange }
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

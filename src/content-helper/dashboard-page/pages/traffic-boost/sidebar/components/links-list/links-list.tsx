/**
 * WordPress dependencies
 */
import { Button, Spinner } from '@wordpress/components';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { next, previous } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { TrafficBoostLink } from '../../../provider';
import './links-list.scss';
import { SingleLink } from './single-link';

/**
 * Defines the props structure for LinksList.
 *
 * @since 3.18.0
 */
interface LinksListProps {
	children?: React.ReactNode;
	links: TrafficBoostLink[];
	activeLink: TrafficBoostLink | null;
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
	children,
	links,
	onClick,
	activeLink,
	minItemsPerPage = 3,
	currentPage = 1,
	itemsPerPage = 3,
	onPageChange,
	onItemsPerPageChange,
}: LinksListProps ): React.JSX.Element => {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ visibleLinks, setVisibleLinks ] = useState<TrafficBoostLink[]>( [] );
	const [ totalPages, setTotalPages ] = useState<number>( 1 );
	const [ activeLinkPostId, setActiveLinkPostId ] = useState<number | null>( activeLink?.targetPost.id ?? null );

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
	 * Sets the active link post ID when the active link changes.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		setActiveLinkPostId( activeLink?.targetPost.id ?? null );
	}, [ activeLink ] );

	/**
	 * Sets up the resize observer to recalculate items per page when container size changes.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		calculateItemsPerPage();

		const resizeObserver = new ResizeObserver( calculateItemsPerPage );

		if ( containerRef.current ) {
			resizeObserver.observe( containerRef.current );
		}

		return () => {
			resizeObserver.disconnect();
		};
	}, [ calculateItemsPerPage ] );

	/**
	 * Updates visible links when page, itemsPerPage, or links change
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const calculatedTotalPages = Math.max( 1, Math.ceil( links.length / itemsPerPage ) );
		setTotalPages( calculatedTotalPages );

		const startIndex = ( currentPage - 1 ) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setVisibleLinks( links.slice( startIndex, endIndex ) );

		// Adjust current page if it exceeds total pages
		if ( calculatedTotalPages < currentPage && calculatedTotalPages > 0 ) {
			onPageChange?.( calculatedTotalPages );
		}
	}, [ currentPage, itemsPerPage, links, onPageChange ] );

	/**
	 * Sets the active link page when the active link changes.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( activeLink && links ) {
			// Find the index of the active link in the full list
			const activeIndex = links.findIndex( ( link ) =>
				link.targetPost.id === activeLink.targetPost.id
			);

			if ( activeIndex !== -1 ) {
				// Calculate the correct page number based on the link's position
				const pageNumber = Math.floor( activeIndex / itemsPerPage ) + 1;
				onPageChange?.( pageNumber );
			}
		}
	}, [ activeLink, links, itemsPerPage, onPageChange ] );

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
							key={ link.targetPost.id + ( link.smartLink?.uid ?? '' ) }
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

			<div className="links-pagination">
				<div className="links-pagination-children">
					{ children }
				</div>
				{ links.length > itemsPerPage && totalPages > 0 && (
					<>
						<div className="page-selector">
							<span>{ __( 'Page', 'wp-parsely' ) }</span>
							<select
								value={ currentPage }
								onChange={ ( e ) => handlePageChange( e.target.value ) }
							>
								{ Array.from( { length: Math.max( 1, totalPages ) }, ( _, i ) => i + 1 ).map( ( page ) => (
									<option key={ page } value={ page }>
										{ page }
									</option>
								) ) }
							</select>
							<span>
								{ __( 'of', 'wp-parsely' ) } { totalPages }
							</span>
						</div>
						<div className="page-navigation">
							<Button
								icon={ previous }
								onClick={ handlePrevious }
								disabled={ currentPage <= 1 }
							/>
							<Button
								icon={ next }
								onClick={ handleNext }
								disabled={ currentPage >= totalPages }
							/>
						</div>
					</>
				) }
			</div>
		</div>
	);
};

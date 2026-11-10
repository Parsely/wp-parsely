/**
 * WordPress dependencies
 */
import { SearchControl } from '@wordpress/components';
import { useDebounce } from '@wordpress/compose';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { EventProps, Telemetry } from '../../../../js/telemetry/telemetry';
import { PageBody, PageContainer, PageHeader, PostsTable } from '../../components';
import { PageChangeMethod } from '../../components/posts-table/component';
import './traffic-boost.scss';

/**
 * Tracks a Traffic Boost event without waiting for it.
 *
 * Telemetry.trackEvent() rejects when the Tracks script never loads (an ad
 * blocker, for instance), so the rejection is consumed here.
 *
 * @since 3.26.0
 *
 * @param {string}     eventName  The name of the event to track.
 * @param {EventProps} properties The properties of the event to track.
 */
const trackTrafficBoostEvent = ( eventName: string, properties: EventProps ): void => {
	Promise.resolve( Telemetry.trackEvent( eventName, properties ) ).catch( () => {} );
};

/**
 * Tracks a page change made through the posts table pagination.
 *
 * @since 3.26.0
 *
 * @param {PageChangeMethod} method How the user changed the page.
 */
const trackPageChange = ( method: PageChangeMethod ): void => {
	trackTrafficBoostEvent( 'traffic_boost_page_changed', { method } );
};

/**
 * Tracks a page change made through the page number input.
 *
 * @since 3.26.0
 */
const trackPageInput = (): void => trackPageChange( 'input' );

/**
 * Traffic Boost page component.
 *
 * @since 3.19.0
 */
export const TrafficBoostPage = (): React.JSX.Element => {
	const [ searchQuery, setSearchQuery ] = useState<string>( '' );
	const [ currentPage, setCurrentPage ] = useState<number>( 1 );

	// Stable, so a re-render (a page change, say) doesn't cancel a pending search.
	const applySearch = useCallback( ( value: string ) => {
		setSearchQuery( value );
		setCurrentPage( 1 );
	}, [] );
	const debouncedSetSearchQuery = useDebounce( applySearch, 300 );

	// Results show 300 ms after typing stops, which also catches pauses partway
	// through a word. A search is only tracked once its results have stayed up
	// for a second (or the user leaves the page first), and not again until the
	// query changes. Only its length and the number of results are sent, never
	// the query.
	const lastTrackedSearch = useRef<string>( '' );
	const trackSearch = useCallback( ( search: string, resultCount: number ) => {
		const query = search.trim();

		if ( '' === query || query === lastTrackedSearch.current ) {
			lastTrackedSearch.current = query;
			return;
		}

		lastTrackedSearch.current = query;
		trackTrafficBoostEvent( 'traffic_boost_searched', {
			query_length: query.length,
			result_count: resultCount,
		} );
	}, [] );

	// A plain timer rather than useDebounce, which cancels on unmount: a search
	// still pending when the user leaves (clicking a result, say) is sent then.
	const searchInput = useRef<string>( '' );
	const pendingSearch = useRef<{ search: string; resultCount: number } | null>( null );
	const searchTimer = useRef<ReturnType<typeof setTimeout>>();

	const cancelSearchTracking = useCallback( (): void => {
		clearTimeout( searchTimer.current );
		pendingSearch.current = null;
	}, [] );

	const flushSearchTracking = useCallback( (): void => {
		const pending = pendingSearch.current;
		cancelSearchTracking();

		if ( pending ) {
			trackSearch( pending.search, pending.resultCount );
		}
	}, [ cancelSearchTracking, trackSearch ] );

	useEffect( () => flushSearchTracking, [ flushSearchTracking ] );

	const handlePostsLoaded = useCallback( ( search: string, resultCount: number ): void => {
		// A response for a search the user has since typed over.
		if ( search !== searchInput.current ) {
			return;
		}

		clearTimeout( searchTimer.current );
		pendingSearch.current = { search, resultCount };
		searchTimer.current = setTimeout( flushSearchTracking, 1000 );
	}, [ flushSearchTracking ] );

	// Typing again means the search on screen wasn't the one the user wanted,
	// so its pending tracking is dropped. If they type back to that same query,
	// the list doesn't reload and that search goes untracked; that's rarer than
	// counting a pause as a search.
	const handleSearchChange = useCallback( ( value: string ) => {
		searchInput.current = value;
		cancelSearchTracking();
		debouncedSetSearchQuery( value );
	}, [ cancelSearchTracking, debouncedSetSearchQuery ] );

	// The page input changes on every keystroke, so only track it once the user
	// pauses. The callback must be stable, or each re-render cancels the debounce.
	const debouncedTrackPageInput = useDebounce( trackPageInput, 1000 );

	const handlePageChange = useCallback( ( method: PageChangeMethod ) => {
		if ( 'input' === method ) {
			debouncedTrackPageInput();
			return;
		}

		trackPageChange( method );
	}, [ debouncedTrackPageInput ] );

	return (
		<PageContainer name="traffic-boost">
			<PageHeader>
				<h1>{ __( 'Manage Engagement Boost (beta)', 'wp-parsely' ) }</h1>
			</PageHeader>
			<PageBody>
				<div className="traffic-boost-search-container">
					<SearchControl
						value={ searchQuery }
						onChange={ handleSearchChange }
						label={ __( 'Search', 'wp-parsely' ) }
						placeholder={ __( 'Search', 'wp-parsely' ) }
						__nextHasNoMarginBottom
					/>
				</div>
				<PostsTable
					currentPage={ currentPage }
					setCurrentPage={ setCurrentPage }
					onPageChange={ handlePageChange }
					onPostsLoaded={ handlePostsLoaded }
					query={ {
						status: 'publish',
						per_page: 10,
						search: searchQuery,
						search_columns: [ 'post_title', 'post_excerpt' ],
					} }
				/>
			</PageBody>
		</PageContainer>
	);
};

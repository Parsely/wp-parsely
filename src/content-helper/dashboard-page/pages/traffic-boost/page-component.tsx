/**
 * WordPress dependencies
 */
import { SearchControl } from '@wordpress/components';
import { useDebounce } from '@wordpress/compose';
import { useCallback, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Telemetry } from '../../../../js/telemetry/telemetry';
import { PageBody, PageContainer, PageHeader, PostsTable } from '../../components';
import { PageChangeMethod } from '../../components/posts-table/component';
import './traffic-boost.scss';

/**
 * Tracks a page change made through the posts table pagination.
 *
 * @since 3.26.0
 *
 * @param {PageChangeMethod} method How the user changed the page.
 */
const trackPageChange = ( method: PageChangeMethod ): void => {
	Telemetry.trackEvent( 'traffic_boost_page_changed', { method } );
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
	const debouncedSetSearchQuery = useDebounce( ( value: string ) => {
		setSearchQuery( value );
		setCurrentPage( 1 );
		Telemetry.trackEvent( 'traffic_boost_searched', { query_length: value.length } );
	}, 300 );

	const [ currentPage, setCurrentPage ] = useState<number>( 1 );

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
						onChange={ debouncedSetSearchQuery }
						label={ __( 'Search', 'wp-parsely' ) }
						placeholder={ __( 'Search', 'wp-parsely' ) }
						__nextHasNoMarginBottom
					/>
				</div>
				<PostsTable
					currentPage={ currentPage }
					setCurrentPage={ setCurrentPage }
					onPageChange={ handlePageChange }
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

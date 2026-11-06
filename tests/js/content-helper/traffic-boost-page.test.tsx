/// <reference types="@wordpress/jest-console" />

/**
 * External dependencies
 */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { PostsTable } from '../../../src/content-helper/dashboard-page/components';
import { TrafficBoostPage } from '../../../src/content-helper/dashboard-page/pages/traffic-boost/page-component';
import { DashboardProvider } from '../../../src/content-helper/dashboard-page/provider';
import { Telemetry } from '../../../src/js/telemetry/telemetry';

jest.mock( '../../../src/js/telemetry/telemetry', () => ( {
	Telemetry: { trackEvent: jest.fn() },
} ) );

jest.mock(
	'../../../src/content-helper/dashboard-page/components/posts-table/components/single-post-row',
	() => ( {
		SinglePostRow: ( { post }: { post: { id: number } } ) => (
			<tr><td>{ `Post ${ post.id }` }</td></tr>
		),
	} )
);

const getPostsMock = jest.fn();

jest.mock( '../../../src/content-helper/dashboard-page/provider', () => ( {
	DashboardProvider: { getInstance: jest.fn() },
} ) );

jest.mock( '../../../src/content-helper/common/providers/stats-provider', () => ( {
	StatsProvider: {
		getInstance: () => ( { getStatsForPosts: jest.fn().mockResolvedValue( [] ) } ),
	},
} ) );

const trackEvent = Telemetry.trackEvent as jest.Mock;

describe( 'Traffic Boost page telemetry', () => {
	beforeEach( () => {
		jest.useFakeTimers();
		trackEvent.mockClear();
		getPostsMock.mockReset();
		getPostsMock.mockResolvedValue( {
			data: [ { id: 1 }, { id: 2 } ],
			total_pages: 5,
		} );
		( DashboardProvider.getInstance as jest.Mock ).mockReturnValue( {
			getPosts: getPostsMock,
		} );
	} );

	afterEach( () => {
		jest.useRealTimers();
	} );

	/**
	 * Waits for the posts table to finish loading.
	 */
	const waitForLoad = async (): Promise<void> => {
		await waitFor( () => expect(
			document.querySelector( '.posts-table-pagination-controls .components-spinner' )
		).toBeNull() );
	};

	/**
	 * Renders the Traffic Boost page and waits for the first posts load.
	 */
	const renderPage = async (): Promise<void> => {
		render( <TrafficBoostPage /> );
		await screen.findByText( 'Post 1' );
		await waitForLoad();
	};

	/**
	 * Returns the pagination buttons (previous, next).
	 */
	const getNavButtons = (): HTMLButtonElement[] => Array.from(
		document.querySelectorAll<HTMLButtonElement>( '.page-navigation button' )
	);

	it( 'tracks next and previous page clicks', async () => {
		await renderPage();

		fireEvent.click( getNavButtons()[ 1 ] );
		await waitForLoad();
		fireEvent.click( getNavButtons()[ 0 ] );
		await waitForLoad();

		expect( trackEvent ).toHaveBeenNthCalledWith(
			1, 'traffic_boost_page_changed', { method: 'next' }
		);
		expect( trackEvent ).toHaveBeenNthCalledWith(
			2, 'traffic_boost_page_changed', { method: 'previous' }
		);
		expect( trackEvent ).toHaveBeenCalledTimes( 2 );

		// NumberControl warns once per run about its deprecated default size.
		expect( console ).toHaveWarned();
	} );

	it( 'tracks page input once after the user pauses', async () => {
		await renderPage();
		const input = screen.getByRole( 'spinbutton' );

		fireEvent.change( input, { target: { value: '2' } } );
		await waitForLoad();
		fireEvent.change( input, { target: { value: '3' } } );
		await waitForLoad();
		expect( trackEvent ).not.toHaveBeenCalled();

		act( () => {
			jest.advanceTimersByTime( 1000 );
		} );

		expect( trackEvent ).toHaveBeenCalledTimes( 1 );
		expect( trackEvent ).toHaveBeenCalledWith(
			'traffic_boost_page_changed', { method: 'input' }
		);
	} );

	it( 'tracks searches with the query length only', async () => {
		await renderPage();

		fireEvent.change( screen.getByRole( 'searchbox' ), {
			target: { value: 'hello' },
		} );
		expect( trackEvent ).not.toHaveBeenCalled();

		act( () => {
			jest.advanceTimersByTime( 300 );
		} );
		await waitForLoad();

		expect( trackEvent ).toHaveBeenCalledTimes( 1 );
		expect( trackEvent ).toHaveBeenCalledWith(
			'traffic_boost_searched', { query_length: 5 }
		);
	} );

	it( 'does not track page changes from tables without onPageChange', async () => {
		const setCurrentPage = jest.fn();
		const query = { per_page: 10 };
		render(
			<PostsTable
				query={ query }
				currentPage={ 1 }
				setCurrentPage={ setCurrentPage }
				hideStats
			/>
		);
		await screen.findByText( 'Post 1' );
		await waitForLoad();

		fireEvent.click( getNavButtons()[ 1 ] );

		expect( setCurrentPage ).toHaveBeenCalledTimes( 1 );
		expect( trackEvent ).not.toHaveBeenCalled();
	} );
	it( 'consumes the rejection when the Tracks script never loads', async () => {
		await renderPage();
		const blocked = Promise.reject( new Error( 'Telemetry library not loaded' ) );
		const consume = jest.spyOn( blocked, 'catch' );
		trackEvent.mockReturnValueOnce( blocked ).mockReturnValueOnce( blocked );

		fireEvent.click( getNavButtons()[ 1 ] );
		await waitForLoad();
		fireEvent.change( screen.getByRole( 'searchbox' ), {
			target: { value: 'hello' },
		} );
		act( () => {
			jest.advanceTimersByTime( 300 );
		} );
		await waitForLoad();

		expect( trackEvent ).toHaveBeenCalledTimes( 2 );
		expect( consume ).toHaveBeenCalledTimes( 2 );
	} );
} );

/// <reference types="@wordpress/jest-console" />

/**
 * External dependencies
 */
import '@testing-library/jest-dom';
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

const mockGetStatsForPosts = jest.fn();

jest.mock( '../../../src/content-helper/common/providers/stats-provider', () => ( {
	StatsProvider: {
		getInstance: () => ( { getStatsForPosts: mockGetStatsForPosts } ),
	},
} ) );

const trackEvent = Telemetry.trackEvent as jest.Mock;

describe( 'Traffic Boost page telemetry', () => {
	beforeEach( () => {
		jest.useFakeTimers();
		trackEvent.mockClear();
		getPostsMock.mockReset();
		mockGetStatsForPosts.mockReset();
		mockGetStatsForPosts.mockResolvedValue( [] );
		getPostsMock.mockResolvedValue( {
			data: [ { id: 1 }, { id: 2 } ],
			total_items: 42,
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
	const renderPage = async (): Promise<ReturnType<typeof render>> => {
		const rendered = render( <TrafficBoostPage /> );
		await screen.findByText( 'Post 1' );
		await waitForLoad();
		return rendered;
	};

	/**
	 * Types a search and lets the posts table apply it and load the results.
	 *
	 * @param {string} value The search to type.
	 */
	const search = async ( value: string ): Promise<void> => {
		fireEvent.change( screen.getByRole( 'searchbox' ), { target: { value } } );
		act( () => {
			jest.advanceTimersByTime( 300 );
		} );
		await waitForLoad();
	};

	/**
	 * Lets the search tracking delay pass.
	 */
	const settle = (): void => {
		act( () => {
			jest.advanceTimersByTime( 1000 );
		} );
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

	it( 'does not track page input that keeps the current page', async () => {
		await renderPage();

		// Clamped to page 1, the page already shown.
		fireEvent.change( screen.getByRole( 'spinbutton' ), { target: { value: '0' } } );
		act( () => {
			jest.advanceTimersByTime( 1000 );
		} );

		expect( trackEvent ).not.toHaveBeenCalled();
	} );

	it( 'tracks a search with its length and result count, never the query', async () => {
		await renderPage();

		await search( 'hello' );
		expect( trackEvent ).not.toHaveBeenCalled();
		settle();

		expect( trackEvent ).toHaveBeenCalledTimes( 1 );
		expect( trackEvent ).toHaveBeenCalledWith(
			'traffic_boost_searched', { query_length: 5, result_count: 42 }
		);
	} );

	it( 'tracks one search when the user pauses partway through typing', async () => {
		await renderPage();

		await search( 'g' );
		await search( 'garde' );
		await search( 'garden' );
		settle();

		expect( trackEvent ).toHaveBeenCalledTimes( 1 );
		expect( trackEvent ).toHaveBeenCalledWith(
			'traffic_boost_searched', { query_length: 6, result_count: 42 }
		);
	} );

	it( 'does not track a search again when paging through its results', async () => {
		await renderPage();

		await search( 'hello' );
		settle();
		fireEvent.click( getNavButtons()[ 1 ] );
		await waitForLoad();
		settle();

		expect( trackEvent ).toHaveBeenCalledTimes( 2 );
		expect( trackEvent ).toHaveBeenNthCalledWith(
			1, 'traffic_boost_searched', { query_length: 5, result_count: 42 }
		);
		expect( trackEvent ).toHaveBeenNthCalledWith(
			2, 'traffic_boost_page_changed', { method: 'next' }
		);
	} );

	it( 'does not track a search the user resumes typing over', async () => {
		await renderPage();

		await search( 'foo' );
		act( () => {
			jest.advanceTimersByTime( 800 );
		} );
		fireEvent.change( screen.getByRole( 'searchbox' ), {
			target: { value: 'foob' },
		} );
		act( () => {
			jest.advanceTimersByTime( 250 );
		} );
		expect( trackEvent ).not.toHaveBeenCalled();

		act( () => {
			jest.advanceTimersByTime( 50 );
		} );
		await waitForLoad();
		settle();

		expect( trackEvent ).toHaveBeenCalledTimes( 1 );
		expect( trackEvent ).toHaveBeenCalledWith(
			'traffic_boost_searched', { query_length: 4, result_count: 42 }
		);
	} );

	it( 'does not search for text the user deletes again', async () => {
		await renderPage();
		const searchbox = screen.getByRole( 'searchbox' );

		await search( 'hello' );
		fireEvent.change( searchbox, { target: { value: 'hellox' } } );
		act( () => {
			jest.advanceTimersByTime( 100 );
		} );
		fireEvent.change( searchbox, { target: { value: 'hello' } } );
		act( () => {
			jest.advanceTimersByTime( 300 );
		} );
		await waitForLoad();
		settle();

		expect( getPostsMock ).not.toHaveBeenCalledWith(
			expect.objectContaining( { search: 'hellox' } )
		);
		expect( searchbox ).toHaveValue( 'hello' );
		expect( trackEvent ).not.toHaveBeenCalled();
	} );

	it( 'tracks a search with no results, without requesting stats', async () => {
		await renderPage();
		mockGetStatsForPosts.mockClear();
		getPostsMock.mockResolvedValue( { data: [], total_items: 0, total_pages: 0 } );

		await search( 'zzz' );
		settle();

		expect( mockGetStatsForPosts ).not.toHaveBeenCalled();
		expect( trackEvent ).toHaveBeenCalledTimes( 1 );
		expect( trackEvent ).toHaveBeenCalledWith(
			'traffic_boost_searched', { query_length: 3, result_count: 0 }
		);
	} );

	it( 'tracks a search even when the stats request fails', async () => {
		await renderPage();
		mockGetStatsForPosts.mockRejectedValue( new Error( 'Forbidden' ) );

		await search( 'hello' );
		settle();

		expect( trackEvent ).toHaveBeenCalledTimes( 1 );
		expect( trackEvent ).toHaveBeenCalledWith(
			'traffic_boost_searched', { query_length: 5, result_count: 42 }
		);

		// The table logs the failed stats request.
		expect( console ).toHaveErrored();
	} );

	it( 'ignores a slow response for a search the user has typed over', async () => {
		await renderPage();
		let resolveSlow: ( value: unknown ) => void = () => {};
		getPostsMock.mockImplementation( ( { search: query }: { search: string } ) => {
			if ( 'gar' === query ) {
				return new Promise( ( resolve ) => {
					resolveSlow = resolve;
				} );
			}
			return Promise.resolve( { data: [ { id: 2 } ], total_items: 5, total_pages: 1 } );
		} );

		fireEvent.change( screen.getByRole( 'searchbox' ), { target: { value: 'gar' } } );
		act( () => {
			jest.advanceTimersByTime( 300 );
		} );
		await search( 'garden' );
		await act( async () => {
			resolveSlow( { data: [ { id: 1 } ], total_items: 9, total_pages: 1 } );
		} );
		settle();

		expect( trackEvent ).toHaveBeenCalledTimes( 1 );
		expect( trackEvent ).toHaveBeenCalledWith(
			'traffic_boost_searched', { query_length: 6, result_count: 5 }
		);

		// The newer ("garden") results stay on screen; the slow ("gar")
		// response that resolved afterwards must not overwrite them.
		expect( screen.getByText( 'Post 2' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'Post 1' ) ).not.toBeInTheDocument();

		// Nor are stats requested for its posts.
		expect( mockGetStatsForPosts ).not.toHaveBeenCalledWith(
			[ { id: 1 } ], expect.anything()
		);
	} );

	it( 'ignores slow stats for a search the user has typed over', async () => {
		await renderPage();
		let resolveSlowStats: ( value: unknown ) => void = () => {};
		getPostsMock.mockImplementation( ( { search: query }: { search: string } ) => Promise.resolve(
			'gar' === query
				? { data: [ { id: 1 } ], total_items: 9, total_pages: 1 }
				: { data: [ { id: 2 } ], total_items: 5, total_pages: 1 }
		) );
		mockGetStatsForPosts.mockImplementation( ( posts: { id: number }[] ) => {
			if ( 1 === posts[ 0 ].id ) {
				return new Promise( ( resolve ) => {
					resolveSlowStats = resolve;
				} );
			}
			return Promise.resolve( [] );
		} );

		fireEvent.change( screen.getByRole( 'searchbox' ), { target: { value: 'gar' } } );
		act( () => {
			jest.advanceTimersByTime( 300 );
		} );
		await act( async () => {} );
		await search( 'garden' );
		await act( async () => {
			resolveSlowStats( [] );
		} );

		expect( screen.getByText( 'Post 2' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'Post 1' ) ).not.toBeInTheDocument();
	} );

	it( 'does not track results that arrive after typing resumes', async () => {
		await renderPage();
		let resolveGarden: ( value: unknown ) => void = () => {};
		let resolveGardens: ( value: unknown ) => void = () => {};
		getPostsMock.mockImplementation( ( { search: query }: { search: string } ) => new Promise( ( resolve ) => {
			if ( 'garden' === query ) {
				resolveGarden = resolve;
			} else {
				resolveGardens = resolve;
			}
		} ) );

		fireEvent.change( screen.getByRole( 'searchbox' ), { target: { value: 'garden' } } );
		act( () => {
			jest.advanceTimersByTime( 300 );
		} );
		fireEvent.change( screen.getByRole( 'searchbox' ), { target: { value: 'gardens' } } );
		await act( async () => {
			resolveGarden( { data: [ { id: 1 } ], total_items: 13, total_pages: 2 } );
		} );
		act( () => {
			jest.advanceTimersByTime( 2300 );
		} );
		await act( async () => {
			resolveGardens( { data: [ { id: 2 } ], total_items: 1, total_pages: 1 } );
		} );
		settle();

		expect( trackEvent ).toHaveBeenCalledTimes( 1 );
		expect( trackEvent ).toHaveBeenCalledWith(
			'traffic_boost_searched', { query_length: 7, result_count: 1 }
		);
	} );

	it( 'does not show an error from a search the user has typed over', async () => {
		await renderPage();
		let rejectSlow: ( reason: unknown ) => void = () => {};
		getPostsMock.mockImplementation( ( { search: query }: { search: string } ) => {
			if ( 'gar' === query ) {
				return new Promise( ( _resolve, reject ) => {
					rejectSlow = reject;
				} );
			}
			return Promise.resolve( { data: [ { id: 2 } ], total_items: 5, total_pages: 1 } );
		} );

		fireEvent.change( screen.getByRole( 'searchbox' ), { target: { value: 'gar' } } );
		act( () => {
			jest.advanceTimersByTime( 300 );
		} );
		await search( 'garden' );
		await act( async () => {
			rejectSlow( new Error( 'Slow request failed' ) );
		} );

		expect( screen.getByText( 'Post 2' ) ).toBeInTheDocument();
		expect( screen.queryByText( /Slow request failed/ ) ).not.toBeInTheDocument();

		// The table logs the failed request.
		expect( console ).toHaveErrored();
	} );

	it( 'clears an error once the next search loads', async () => {
		await renderPage();
		mockGetStatsForPosts.mockRejectedValueOnce( new Error( 'Forbidden' ) );

		await search( 'hello' );
		expect( screen.getByText( 'Error: Forbidden' ) ).toBeInTheDocument();

		let resolveSearch: ( value: unknown ) => void = () => {};
		getPostsMock.mockImplementationOnce( () => new Promise( ( resolve ) => {
			resolveSearch = resolve;
		} ) );
		fireEvent.change( screen.getByRole( 'searchbox' ), { target: { value: 'garden' } } );
		act( () => {
			jest.advanceTimersByTime( 300 );
		} );

		// While the search loads, the error stays up rather than the rows from
		// before it.
		expect( screen.getByText( 'Error: Forbidden' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'Post 1' ) ).not.toBeInTheDocument();

		await act( async () => {
			resolveSearch( { data: [ { id: 3 } ], total_items: 1, total_pages: 1 } );
		} );

		expect( await screen.findByText( 'Post 3' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'Error: Forbidden' ) ).not.toBeInTheDocument();
		expect( getNavButtons() ).toHaveLength( 2 );

		// The table logs the failed stats request.
		expect( console ).toHaveErrored();
	} );

	it( 'sends a pending search when the user leaves the page', async () => {
		const { unmount } = await renderPage();

		await search( 'hello' );
		expect( trackEvent ).not.toHaveBeenCalled();
		unmount();

		expect( trackEvent ).toHaveBeenCalledTimes( 1 );
		expect( trackEvent ).toHaveBeenCalledWith(
			'traffic_boost_searched', { query_length: 5, result_count: 42 }
		);
	} );

	it( 'does not track a search that resolves after the page is left', async () => {
		const { unmount } = await renderPage();

		let resolveSearch: ( value: unknown ) => void = () => {};
		getPostsMock.mockImplementation( () => new Promise( ( resolve ) => {
			resolveSearch = resolve;
		} ) );

		fireEvent.change( screen.getByRole( 'searchbox' ), { target: { value: 'hello' } } );
		act( () => {
			jest.advanceTimersByTime( 300 );
		} );

		unmount();
		await act( async () => {
			resolveSearch( { data: [ { id: 1 } ], total_items: 7, total_pages: 1 } );
		} );
		settle();

		expect( trackEvent ).not.toHaveBeenCalled();
	} );

	it( 'does not track an empty search', async () => {
		await renderPage();

		await search( '   ' );
		settle();

		expect( trackEvent ).not.toHaveBeenCalled();
	} );

	it( 'does not track clearing the search box', async () => {
		await renderPage();

		await search( 'hello' );
		settle();
		await search( '' );
		settle();

		expect( trackEvent ).toHaveBeenCalledTimes( 1 );
		expect( trackEvent ).toHaveBeenCalledWith(
			'traffic_boost_searched', { query_length: 5, result_count: 42 }
		);
	} );

	it( 'tracks a search again once it is cleared and typed again', async () => {
		await renderPage();

		await search( 'hello' );
		settle();
		await search( '' );
		act( () => {
			jest.advanceTimersByTime( 500 );
		} );
		await search( 'hello' );
		settle();

		expect( trackEvent ).toHaveBeenCalledTimes( 2 );
		expect( trackEvent ).toHaveBeenNthCalledWith(
			2, 'traffic_boost_searched', { query_length: 5, result_count: 42 }
		);
	} );

	it( 'does not track a search again after typing back to it', async () => {
		await renderPage();
		const searchbox = screen.getByRole( 'searchbox' );

		await search( 'hello' );
		settle();
		fireEvent.change( searchbox, { target: { value: 'hellox' } } );
		act( () => {
			jest.advanceTimersByTime( 100 );
		} );
		fireEvent.change( searchbox, { target: { value: 'hello' } } );
		act( () => {
			jest.advanceTimersByTime( 300 );
		} );
		fireEvent.click( getNavButtons()[ 1 ] );
		await waitForLoad();
		settle();

		expect( trackEvent ).toHaveBeenCalledTimes( 2 );
		expect( trackEvent ).toHaveBeenNthCalledWith(
			1, 'traffic_boost_searched', { query_length: 5, result_count: 42 }
		);
		expect( trackEvent ).toHaveBeenNthCalledWith(
			2, 'traffic_boost_page_changed', { method: 'next' }
		);
	} );

	it( 'keeps a pending search when the page changes before it applies', async () => {
		await renderPage();

		fireEvent.change( screen.getByRole( 'searchbox' ), {
			target: { value: 'hello' },
		} );
		fireEvent.click( getNavButtons()[ 1 ] );
		await waitForLoad();

		act( () => {
			jest.advanceTimersByTime( 300 );
		} );
		await waitForLoad();
		settle();

		expect( trackEvent ).toHaveBeenCalledTimes( 2 );
		expect( trackEvent ).toHaveBeenNthCalledWith(
			1, 'traffic_boost_page_changed', { method: 'next' }
		);
		expect( trackEvent ).toHaveBeenNthCalledWith(
			2, 'traffic_boost_searched', { query_length: 5, result_count: 42 }
		);
		expect( getPostsMock ).toHaveBeenLastCalledWith(
			expect.objectContaining( { search: 'hello' } )
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
} );

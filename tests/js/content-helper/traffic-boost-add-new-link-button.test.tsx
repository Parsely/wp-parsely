/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { AddNewLinkButton } from '../../../src/content-helper/dashboard-page/pages/traffic-boost/sidebar/components/add-new-link-button';
import { DashboardProvider } from '../../../src/content-helper/dashboard-page/provider';

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
		getInstance: () => ( { getStatsForPosts: () => Promise.resolve( [] ) } ),
	},
} ) );

describe( 'Traffic Boost Add Source Post popover', () => {
	beforeEach( () => {
		jest.useFakeTimers();
		getPostsMock.mockReset();
		getPostsMock.mockResolvedValue( {
			data: [ { id: 1 } ],
			total_items: 1,
			total_pages: 1,
		} );
		( DashboardProvider.getInstance as jest.Mock ).mockReturnValue( {
			getPosts: getPostsMock,
		} );
	} );

	afterEach( () => {
		jest.useRealTimers();
	} );

	/**
	 * Clicks the Add Source Post button, then lets the popover position itself.
	 */
	const clickAddSourcePost = async (): Promise<void> => {
		fireEvent.click( screen.getByRole( 'button', { name: 'Add Source Post' } ) );
		await act( async () => {} );
	};

	/**
	 * Renders the button and opens its popover.
	 */
	const openPopover = async (): Promise<void> => {
		render(
			<AddNewLinkButton disabled={ false } onPostClick={ jest.fn() } suggestions={ [] } />
		);
		await clickAddSourcePost();
	};

	/**
	 * Sets the search box text, then lets time pass.
	 *
	 * @param {string} value The text in the box.
	 * @param {number} ms    The time to let pass, in milliseconds.
	 */
	const type = ( value: string, ms: number ): void => {
		fireEvent.change( screen.getByRole( 'searchbox' ), { target: { value } } );
		act( () => {
			jest.advanceTimersByTime( ms );
		} );
	};

	it( 'does not search for text the user deletes again', async () => {
		await openPopover();
		type( 'garden', 300 );
		await screen.findByText( 'Post 1' );

		type( 'gardenx', 100 );
		type( 'garden', 300 );

		expect( screen.getByRole( 'searchbox' ) ).toHaveValue( 'garden' );
		expect( getPostsMock ).not.toHaveBeenCalledWith(
			expect.objectContaining( { search: 'gardenx' } )
		);

		// Nor do the keystrokes refetch the posts.
		expect( getPostsMock ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'drops a search still pending when the popover closes', async () => {
		await openPopover();
		type( 'gar', 100 );
		fireEvent.keyDown( screen.getByRole( 'searchbox' ), { key: 'Escape' } );
		act( () => {
			jest.advanceTimersByTime( 1000 );
		} );
		await clickAddSourcePost();

		expect( screen.getByRole( 'searchbox' ) ).toHaveValue( '' );
		expect( getPostsMock ).not.toHaveBeenCalled();
	} );
} );

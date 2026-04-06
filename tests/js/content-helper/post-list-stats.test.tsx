import { render, waitFor } from '@testing-library/react';
import { showParselyPostsStatsResponse } from '../../../src/content-helper/post-list-stats/post-list-stats';

describe( 'src/content-helper/post-list-stats', () => {
	it( 'should just update placeholders on empty response', async (): Promise<void> => {
		await waitFor( (): void => {
			render( getPageContent( 2 ) );
		} );

		showParselyPostsStatsResponse();

		expect( getAllPostStatsElements().length ).toBe( 2 );
		expect( getPostStatsElement( 'key-1' )?.textContent ).toBe( '—' );
		expect( getPostStatsElement( 'key-2' )?.textContent ).toBe( '—' );
		expect( getStatsErrorElement() ).toBeNull();
	} );

	it( 'should show parsely stats', async (): Promise<void> => {
		await waitFor( (): void => {
			render( getPageContent( 7 ) );
		} );

		window.wpParselyPostsStatsResponse = JSON.stringify( {
			data: {
				'key-1': { page_views: '0', visitors: '0', avg_time: '0s' },
				'key-3': { page_views: '3', visitors: '3', avg_time: '3s' },
				'key-4': { page_views: '4' },
				'key-5': { visitors: '5' },
				'key-6': { avg_time: '6s' },
			},
			error: null,
		} );

		showParselyPostsStatsResponse();

		expect( getPlaceholderElement() ).toBeNull();
		expect( getStatsErrorElement() ).toBeNull();

		const allPostStats = document.querySelectorAll( '.parsely-post-stats' );
		expect( allPostStats.length ).toBe( 7 );

		const postStat1 = getPostStatsElement( 'key-1' );
		expect( getPageViewsElement( postStat1 )?.textContent ).toBe( 'Page views: 0' );
		expect( getVisitorsElement( postStat1 )?.textContent ).toBe( 'Visitors: 0' );
		expect( getAvgTimeElement( postStat1 )?.textContent ).toBe( 'Avg. time: 0s' );

		const postStat2 = getPostStatsElement( 'key-2' );
		expect( postStat2?.textContent ).toBe( '—' );

		const postStat3 = getPostStatsElement( 'key-3' );
		expect( getPageViewsElement( postStat3 )?.textContent ).toBe( 'Page views: 3' );
		expect( getVisitorsElement( postStat3 )?.textContent ).toBe( 'Visitors: 3' );
		expect( getAvgTimeElement( postStat3 )?.textContent ).toBe( 'Avg. time: 3s' );

		const postStat4 = getPostStatsElement( 'key-4' );
		expect( getPageViewsElement( postStat4 )?.textContent ).toBe( 'Page views: 4' );
		expect( getVisitorsElement( postStat4 ) ).toBeNull();
		expect( getAvgTimeElement( postStat4 ) ).toBeNull();

		const postStat5 = getPostStatsElement( 'key-5' );
		expect( getPageViewsElement( postStat5 ) ).toBeNull();
		expect( getVisitorsElement( postStat5 )?.textContent ).toBe( 'Visitors: 5' );
		expect( getAvgTimeElement( postStat5 ) ).toBeNull();

		const postStat6 = getPostStatsElement( 'key-6' );
		expect( getPageViewsElement( postStat6 ) ).toBeNull();
		expect( getVisitorsElement( postStat6 ) ).toBeNull();
		expect( getAvgTimeElement( postStat6 )?.textContent ).toBe( 'Avg. time: 6s' );

		const postStat7 = getPostStatsElement( 'key-7' );
		expect( postStat7?.textContent ).toBe( '—' );
	} );

	it( 'should show parsely stats error', async (): Promise<void> => {
		await waitFor( (): void => {
			render( getPageContent( 2 ) );
		} );

		window.wpParselyPostsStatsResponse = JSON.stringify( {
			data: null,
			error: {
				code: 404,
				message: 'Not Found.',
				htmlMessage: '<p>HTML Error Message</p>',
			},
		} );

		showParselyPostsStatsResponse();

		expect( getPlaceholderElement() ).toBeNull();
		expect( getStatsErrorElement()?.innerHTML ).toBe( '<p>HTML Error Message</p>' );

		const allPostStats = document.querySelectorAll( '.parsely-post-stats' );
		expect( allPostStats.length ).toBe( 2 );

		const postStat1 = getPostStatsElement( 'key-1' );
		expect( postStat1?.textContent ).toBe( '—' );

		const postStat2 = getPostStatsElement( 'key-2' );
		expect( postStat2?.textContent ).toBe( '—' );
	} );
} );

/**
 * Replicates the DOM structure on which we have to show Parsely Stats Response.
 *
 * @param {number} numOfPlaceholders Number of placeholders which we are going to show in page.
 */
function getPageContent( numOfPlaceholders: number ): React.JSX.Element {
	return (
		<>
			{ /* WP have this element before admin notices and we need this to test the API error */ }
			<hr className="wp-header-end" />
			{ getParselyStatsPlaceholders( numOfPlaceholders ) }
		</>
	);
}

function getParselyStatsPlaceholders( numOfPlaceholders: number ): React.JSX.Element[] {
	const placeholders: React.JSX.Element[] = [];

	for ( let i = 1; i <= numOfPlaceholders; i++ ) {
		placeholders.push(
			// This placeholder content should be kept in sync with Post_List_Stats
			<div className="parsely-post-stats" key={ i } data-stats-key={ `key-${ i }` }>
				<span className="parsely-post-stats-placeholder">&mdash;</span>
			</div>
		);
	}

	return placeholders;
}

function getAllPostStatsElements(): NodeListOf<Element> {
	return document.querySelectorAll( '.parsely-post-stats' );
}

function getPlaceholderElement(): Element | null {
	return document.querySelector( `.parsely-post-stats-placeholder` );
}

function getPostStatsElement( key: string ): Element | null {
	return document.querySelector( `[data-stats-key="${ key }"]` );
}

function getPageViewsElement( postStatElement: Element | null ): Element | null {
	return postStatElement ? postStatElement.querySelector( '.parsely-post-page-views .screen-reader-text' ) : null;
}

function getVisitorsElement( postStatElement: Element | null ): Element | null {
	return postStatElement ? postStatElement.querySelector( '.parsely-post-visitors .screen-reader-text' ) : null;
}

function getAvgTimeElement( postStatElement: Element | null ): Element | null {
	return postStatElement ? postStatElement.querySelector( '.parsely-post-avg-time .screen-reader-text' ) : null;
}

function getStatsErrorElement(): Element | null {
	return document.querySelector( '.error-parsely-stats' );
}

/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import {
	PerformanceOverviewPanel,
} from '../../../../src/content-helper/editor-sidebar/performance-stats/component-panel-overview';
import {
	PerformanceData,
} from '../../../../src/content-helper/editor-sidebar/performance-stats/model';

// Mock the settings, so that all data points are visible.
jest.mock( '../../../../src/content-helper/common/settings/provider', () => ( {
	SettingsProvider: ( { children }: { children: React.ReactNode } ) => children,
	useSettings: () => ( {
		settings: {
			PerformanceStats: {
				Period: '7d',
				VisibleDataPoints: [ 'views', 'visitors', 'avgEngaged', 'recirculation' ],
				VisiblePanels: [ 'overview' ],
			},
		},
		setSettings: jest.fn(),
	} ),
} ) );

/**
 * Performance data without a recirculation rate.
 *
 * @since 3.27.0
 */
const performanceData: PerformanceData = {
	author: 'Author',
	avgEngaged: '1:55',
	dashUrl: 'https://dash.parsely.com/example.com/find?url=https%3A%2F%2Fexample.com',
	date: 'Nov 25, 2026',
	id: 1,
	referrers: { top: [], types: [] },
	title: 'Title',
	url: 'https://example.com',
	views: '2,158',
	visitors: '1,537',
};

/**
 * Returns the value element of the data point with the passed title.
 *
 * @since 3.27.0
 *
 * @param {string} title The data point's title.
 *
 * @return {Element | null} The data point's value element.
 */
const getDataPointValue = ( title: string ): Element | null => {
	return screen.getByText( title ).closest( '.data-point' )?.querySelector( '.data-point-value' ) ?? null;
};

describe( 'PerformanceOverviewPanel', () => {
	/**
	 * Verifies that the recirculation rate is shown as a percentage.
	 *
	 * @since 3.27.0
	 */
	it( 'shows the recirculation rate as a percentage', () => {
		render( <PerformanceOverviewPanel data={ { ...performanceData, recirculationRate: '7.73' } } /> );

		expect( getDataPointValue( 'Recirculation' ) ).toHaveTextContent( '7.73%' );
	} );

	/**
	 * Verifies that N/A is shown when the API returns no recirculation rate.
	 *
	 * @since 3.27.0
	 */
	it( 'shows N/A when the recirculation rate is missing', () => {
		render( <PerformanceOverviewPanel data={ performanceData } /> );

		expect( getDataPointValue( 'Recirculation' ) ).toHaveTextContent( 'N/A' );
	} );
} );

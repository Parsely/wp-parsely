/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

/**
 * Internal dependencies
 */
import ParselyRecommendations from '../../../src/blocks/recommendations/components/parsely-recommendations';
import RecommendationsStore from '../../../src/blocks/recommendations/recommendations-store';

describe( 'Recommendations Block', () => {
	it( 'should display loading text', () => {
		render(
			<RecommendationsStore>
				<ParselyRecommendations />
			</RecommendationsStore>
		);

		const loadingText = screen.getByText( /Loading/i );

		expect( loadingText ).toBeVisible();
	} );
} );

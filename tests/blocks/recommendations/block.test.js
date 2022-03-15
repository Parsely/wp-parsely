/**
 * External dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ParselyRecommendations from '../../../src/blocks/recommendations/components/parsely-recommendations';
import RecommendationsStore from '../../../src/blocks/recommendations/recommendations-store';

test( 'My sample test', () => {
	render(
		<RecommendationsStore>
			<ParselyRecommendations />
		</RecommendationsStore>
	);

	expect( true ).toBeTruthy();
} );

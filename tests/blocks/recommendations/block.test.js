/**
 * External dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ParselyRecommendations from '../../../src/blocks/recommendations/components/parsely-recommendations';

test( 'My sample test', () => {
	render( <ParselyRecommendations /> );

	expect( true ).toBeTruthy();
} );

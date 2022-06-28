/**
 * External dependencies.
 */
import {
	render,
	screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';

/**
 * Internal dependencies.
 */
import ContentHelper from '../../../../src/blocks/content-helper/content-helper';
import ContentHelperProvider from '../../../../src/blocks/content-helper/content-helper-provider';

describe( 'Content Helper', () => {
	it( 'should display loading text when starting', () => {
		render(
			<ContentHelperProvider>
				<ContentHelper />
			</ContentHelperProvider>
		);

		const loadingText = screen.getByText( /Loading/i );

		expect( loadingText ).toBeVisible();
	} );
} );

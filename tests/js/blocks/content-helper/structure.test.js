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
import RelatedTopPostList from '../../../../src/blocks/content-helper/components/related-top-post-list';

describe( 'Content Helper', () => {
	it( 'should display spinner when starting', () => {
		render( <RelatedTopPostList /> );

		const spinner = screen.getByRole( 'presentation' );
		expect( spinner ).toBeVisible();
		expect( spinner ).toHaveClass( 'components-spinner' );
	} );
} );

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
import PostList from '../../../../src/blocks/content-helper/components/post-list';

describe( 'Content Helper', () => {
	it( 'should display spinner when starting', () => {
		render( <PostList /> );

		const spinner = screen.getByRole( 'presentation' );
		expect( spinner ).toBeVisible();
		expect( spinner ).toHaveClass( 'components-spinner' );
	} );
} );

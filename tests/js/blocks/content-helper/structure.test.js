/**
 * External dependencies.
 */
import {
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

/**
 * Internal dependencies.
 */
import RelatedTopPostList from '../../../../src/blocks/content-helper/components/related-top-post-list';
import ContentHelperProvider from '../../../../src/blocks/content-helper/content-helper-provider';

jest.mock( '../../../../src/blocks/content-helper/content-helper-provider' );

describe( 'Content Helper', () => {
	test( 'should display spinner when starting', () => {
		const getRelatedTopPostsMock = jest
			.spyOn( ContentHelperProvider, 'getRelatedTopPosts' )
			.mockImplementation( () => Promise.resolve( {} ) );

		render( <RelatedTopPostList /> );

		expect( getRelatedTopPostsMock ).toHaveBeenCalled();

		const spinner = getSpinner();
		expect( spinner ).toBeInTheDocument();
		expect( spinner ).toBeVisible();
	} );

	test( 'should show contact us message when parsely site id is not set', async () => {
		const getRelatedTopPostsMock = jest
			.spyOn( ContentHelperProvider, 'getRelatedTopPosts' )
			.mockImplementation( () => Promise.reject( {
				errors: {
					parsely_site_id_not_set: 'error msg',
				},
			} ) );

		render( <RelatedTopPostList /> );
		expect( getSpinner() ).toBeInTheDocument();

		await waitFor( () => screen.findByTestId( 'parsely-contact-us' ), { timeout: 3000 } );

		expect( getRelatedTopPostsMock ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const contactUsMessage = getContactUsMessage();
		expect( contactUsMessage ).toBeInTheDocument();
		expect( contactUsMessage ).toBeVisible();
	} );

	test( 'should show contact us message when parsely secret is not set', async () => {
		const getRelatedTopPostsMock = jest
			.spyOn( ContentHelperProvider, 'getRelatedTopPosts' )
			.mockImplementation( () => Promise.reject( {
				errors: {
					parsely_api_secret_not_set: 'error msg',
				},
			} ) );

		render( <RelatedTopPostList /> );
		expect( getSpinner() ).toBeInTheDocument();

		await waitFor( () => screen.findByTestId( 'parsely-contact-us' ), { timeout: 3000 } );

		expect( getRelatedTopPostsMock ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const contactUsMessage = getContactUsMessage();
		expect( contactUsMessage ).toBeInTheDocument();
		expect( contactUsMessage ).toBeVisible();
	} );

	test( 'should show error message when API returns the error', async () => {
		const getRelatedTopPostsMock = jest
			.spyOn( ContentHelperProvider, 'getRelatedTopPosts' )
			.mockImplementation( () => Promise.reject( {
				message: 'fake error from api',
			} ) );

		render( <RelatedTopPostList /> );
		expect( getSpinner() ).toBeInTheDocument();

		await waitFor( () => screen.findByTestId( 'api-error' ), { timeout: 3000 } );

		expect( getRelatedTopPostsMock ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const apiError = screen.queryByTestId( 'api-error' );
		expect( apiError ).toBeInTheDocument();
		expect( apiError ).toBeVisible();
		expect( apiError.textContent ).toEqual( 'Error: fake error from api' );
	} );

	test( 'should show error message when WordPress REST API returns the error', async () => {
		const getRelatedTopPostsMock = jest
			.spyOn( ContentHelperProvider, 'getRelatedTopPosts' )
			.mockImplementation( () => Promise.reject( {
				error: [ 'fake error from WP api' ],
			} ) );

		render( <RelatedTopPostList /> );
		expect( getSpinner() ).toBeInTheDocument();

		await waitFor( () => screen.findByTestId( 'wp-api-error' ), { timeout: 3000 } );

		expect( getRelatedTopPostsMock ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const wpApiError = screen.queryByTestId( 'wp-api-error' );
		expect( wpApiError ).toBeInTheDocument();
		expect( wpApiError ).toBeVisible();
		expect( wpApiError.textContent ).toEqual( 'Error: fake error from WP api' );
	} );

	function getSpinner() {
		return screen.queryByTestId( 'parsely-spinner-wrapper' );
	}

	function getContactUsMessage() {
		return screen.queryByTestId( 'parsely-contact-us' );
	}
} );

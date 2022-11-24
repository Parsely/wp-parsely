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
import ContentHelperProvider, { RELATED_POSTS_DEFAULT_LIMIT, RELATED_POSTS_DEFAULT_TIME_RANGE } from '../../../../src/blocks/content-helper/content-helper-provider';

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

	test( 'should show not data message when there is no tag, category or author in the post', async () => {
		const getRelatedTopPostsMock = jest
			.spyOn( ContentHelperProvider, 'getRelatedTopPosts' )
			.mockImplementation( () => Promise.resolve( {
				message: 'The Parse.ly API did not return any results for top-performing posts',
				posts: [],
			} ) );

		await waitFor( async () => {
			await render( <RelatedTopPostList /> );
		} );

		expect( getRelatedTopPostsMock ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const topPostDesc = getTopPostDesc();
		expect( topPostDesc ).toBeInTheDocument();
		expect( topPostDesc ).toBeVisible();
		expect( topPostDesc.textContent ).toEqual( 'The Parse.ly API did not return any results for top-performing posts' );
	} );

	test( 'should show a single top post with description and proper attributes', async () => {
		const getRelatedTopPostsMock = jest
			.spyOn( ContentHelperProvider, 'getRelatedTopPosts' )
			.mockImplementation( () => Promise.resolve( {
				message: `Top-performing posts from category "Developers" in last ${ RELATED_POSTS_DEFAULT_TIME_RANGE } days.`,
				posts: getRelatedTopPostsApiMock( 1 ),
			} ) );

		await waitFor( async () => {
			await render( <RelatedTopPostList /> );
		} );

		expect( getRelatedTopPostsMock ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const topPostDesc = getTopPostDesc();
		expect( topPostDesc ).toBeInTheDocument();
		expect( topPostDesc ).toBeVisible();
		expect( topPostDesc.textContent ).toEqual( `Top-performing posts from category "Developers" in last ${ RELATED_POSTS_DEFAULT_TIME_RANGE } days.` );

		const topPosts = getTopPosts();
		expect( topPosts.length ).toEqual( 1 );

		// test top post attributes
		const firstTopPost = topPosts[ 0 ];
		const statsLink = firstTopPost.querySelector( '.parsely-top-post-stats-link' );
		const postLink = firstTopPost.querySelector( '.parsely-top-post-link' );

		expect( firstTopPost.querySelector( '.parsely-top-post-title' ).textContent ).toEqual( 'Title 1' );
		expect( statsLink.getAttribute( 'href' ) ).toEqual( 'https://dash.parsely.com/example.com/post-1' );
		expect( statsLink.getAttribute( 'title' ) ).toEqual( 'View in Parse.ly' );
		expect( statsLink.getAttribute( 'target' ) ).toEqual( '_blank' );
		expect( postLink.getAttribute( 'href' ) ).toEqual( 'http://example.com/post-1' );
		expect( postLink.getAttribute( 'title' ) ).toEqual( 'View Published Post' );
		expect( postLink.getAttribute( 'target' ) ).toEqual( '_blank' );
		expect( firstTopPost.querySelector( '.parsely-top-post-date' ).textContent ).toEqual( 'Jan 1, 2022' );
		expect( firstTopPost.querySelector( '.parsely-top-post-author' ).textContent ).toEqual( 'Author 1' );
		expect( firstTopPost.querySelector( '.parsely-top-post-views' ).textContent ).toEqual( '1' );
	} );

	test( 'should show 5 posts by default', async () => {
		const getRelatedTopPostsMock = jest
			.spyOn( ContentHelperProvider, 'getRelatedTopPosts' )
			.mockImplementation( () => Promise.resolve( {
				message: `Top-performing posts with tag "Developers" in last ${ RELATED_POSTS_DEFAULT_TIME_RANGE } days.`,
				posts: getRelatedTopPostsApiMock(),
			} ) );

		await waitFor( async () => {
			await render( <RelatedTopPostList /> );
		} );

		expect( getRelatedTopPostsMock ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();
		expect( getTopPostDesc().textContent ).toEqual( `Top-performing posts with tag "Developers" in last ${ RELATED_POSTS_DEFAULT_TIME_RANGE } days.` );
		expect( getTopPosts().length ).toEqual( 5 );
	} );

	function getSpinner() {
		return screen.queryByTestId( 'parsely-spinner-wrapper' );
	}

	function getTopPostDesc() {
		return screen.queryByTestId( 'parsely-top-posts-desc' );
	}

	function getTopPosts() {
		return screen.queryAllByTestId( 'parsely-top-post' );
	}

	function getContactUsMessage() {
		return screen.queryByTestId( 'parsely-contact-us' );
	}

	function getRelatedTopPostsApiMock( postsCount = RELATED_POSTS_DEFAULT_LIMIT ) {
		const posts = [];

		for ( let i = 1; i <= postsCount; i++ ) {
			posts.push( {
				author: `Author ${ i }`,
				date: `Jan ${ i }, 2022`,
				id: `http://example.com/post-${ i }`,
				statsUrl: `https://dash.parsely.com/example.com/post-${ i }`,
				title: `Title ${ i }`,
				url: `http://example.com/post-${ i }`,
				views: i,
			} );
		}

		return posts;
	}
} );

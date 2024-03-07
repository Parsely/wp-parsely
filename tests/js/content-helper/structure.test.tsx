/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import {
	render,
	screen,
	waitFor,
} from '@testing-library/react';

/**
 * Internal dependencies
 */
import {
	ContentHelperError,
	ContentHelperErrorCode,
} from '../../../src/content-helper/common/content-helper-error';
import {
	DASHBOARD_BASE_URL,
} from '../../../src/content-helper/common/utils/constants';
import {
	RelatedPostsPanel,
} from '../../../src/content-helper/editor-sidebar/related-posts/component';
import {
	GetRelatedPostsResult,
	RELATED_POSTS_DEFAULT_LIMIT,
	RelatedPostsProvider,
} from '../../../src/content-helper/editor-sidebar/related-posts/provider';

const relatedPostList =
	<RelatedPostsPanel />;

describe( 'PCH Editor Sidebar Related Post panel', () => {
	test( 'should display spinner when starting', async () => {
		const getRelatedPostsFn = getRelatedPostsMockFn( () => Promise.resolve( {
			message: 'Testing that the spinner appears and disappears.',
			posts: [],
		} ) );

		await waitFor( async () => {
			render( relatedPostList );
			expect( getSpinner() ).toBeInTheDocument();
		} );

		expect( getRelatedPostsFn ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();
	} );

	test( 'should show contact us message when Parse.ly Site ID is not set', async () => {
		const getRelatedPostsFn = getRelatedPostsMockFn( () => Promise.reject( new ContentHelperError(
			'Error message.',
			ContentHelperErrorCode.PluginSettingsSiteIdNotSet
		) ) );

		expect( await verifyCredentialsNotSetMessage( getRelatedPostsFn ) ).toBeTruthy();
	} );

	test( 'should show contact us message when Parse.ly API Secret is not set', async () => {
		const getRelatedPostsFn = getRelatedPostsMockFn( () => Promise.reject( new ContentHelperError(
			'Error message.',
			ContentHelperErrorCode.PluginSettingsApiSecretNotSet
		) ) );

		expect( await verifyCredentialsNotSetMessage( getRelatedPostsFn ) ).toBeTruthy();
	} );

	test( 'should show error message when API returns the error', async () => {
		const getRelatedPostsFn = getRelatedPostsMockFn( () => Promise.reject( new ContentHelperError(
			'Fake error from API.',
			ContentHelperErrorCode.ParselyApiResponseContainsError
		) ) );

		expect( await verifyApiErrorMessage( getRelatedPostsFn ) ).toBeTruthy();
	} );

	test( 'should show error message and hint when API fetch is failed', async () => {
		const getRelatedPostsFn = getRelatedPostsMockFn( () => Promise.reject( new ContentHelperError(
			'Fake error from API.',
			ContentHelperErrorCode.FetchError
		) ) );

		expect( await verifyApiErrorMessage( getRelatedPostsFn ) ).toBeTruthy();

		const apiErrorHint = screen.queryByTestId( 'content-helper-error-message-hint' );
		expect( apiErrorHint ).toBeInTheDocument();
		expect( apiErrorHint ).toBeVisible();
		expect( apiErrorHint?.textContent ).toEqual(
			'Hint: This error can sometimes be caused by ad-blockers or browser tracking protections. Please add this site to any applicable allow lists and try again.'
		);
	} );

	test( 'should show no results message when there is no tag, category or author in the post', async () => {
		const getRelatedPostsFn = getRelatedPostsMockFn( () => Promise.resolve( {
			message: 'The Parse.ly API did not return any results for posts by "author".',
			posts: [],
		} ) );

		await waitFor( async () => {
			render( relatedPostList );
			expect( getSpinner() ).toBeInTheDocument();
		} );

		expect( getRelatedPostsFn ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const topPostDesc = getTopPostDesc();
		expect( topPostDesc ).toBeInTheDocument();
		expect( topPostDesc ).toBeVisible();
		expect( topPostDesc?.textContent ).toEqual( 'The Parse.ly API did not return any results for posts by "author".' );
	} );

	test( 'should show a single post with description and proper attributes', async () => {
		const getRelatedPostsFn = getRelatedPostsMockFn( () => Promise.resolve( {
			message: `Posts in category "Developers" in last 7 days.`,
			posts: getRelatedPostsMockData( 1 ),
		} ) );

		await waitFor( async () => {
			render( relatedPostList );
			expect( getSpinner() ).toBeInTheDocument();
		} );

		expect( getRelatedPostsFn ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const topPostDesc = getTopPostDesc();
		expect( topPostDesc ).toBeInTheDocument();
		expect( topPostDesc ).toBeVisible();
		expect( topPostDesc?.textContent ).toEqual( `Posts in category "Developers" in last 7 days.` );

		const topPosts = getTopPosts();
		expect( topPosts.length ).toEqual( 1 );

		// test post attributes
		const firstTopPost = topPosts[ 0 ];
		const statsLink = firstTopPost.querySelector( '.parsely-related-post-stats-link' );
		const viewPostLink = firstTopPost.querySelector( '.parsely-related-post-view-link' );
		const editPostLink = firstTopPost.querySelector( '.parsely-related-post-edit-link' );

		expect( statsLink?.getAttribute( 'href' ) ).toEqual( `${ DASHBOARD_BASE_URL }/example.com/post-1` );
		expect( statsLink?.getAttribute( 'target' ) ).toEqual( '_blank' );
		expect( statsLink?.childNodes[ 0 ].textContent ).toEqual( 'View in Parse.ly (opens new tab)' );
		expect( statsLink?.childNodes[ 1 ].textContent ).toEqual( 'Title 1' );
		expect( viewPostLink?.getAttribute( 'href' ) ).toEqual( 'http://example.com/post-1' );
		expect( viewPostLink?.getAttribute( 'target' ) ).toEqual( '_blank' );
		expect( viewPostLink?.childNodes[ 0 ].textContent ).toEqual( 'View Post (opens new tab)' );
		expect( editPostLink?.getAttribute( 'href' ) ).toEqual( '/wp-admin/post.php?post=1&action=edit' );
		expect( editPostLink?.getAttribute( 'target' ) ).toEqual( '_blank' );
		expect( editPostLink?.childNodes[ 0 ].textContent ).toEqual( 'Edit Post (opens new tab)' );
		expect( firstTopPost.querySelector( '.parsely-related-post-date' )?.childNodes[ 1 ].textContent ).toEqual( 'Jan 1, 2022' );
		expect( firstTopPost.querySelector( '.parsely-related-post-author' )?.childNodes[ 1 ].textContent ).toEqual( 'Name 1' );
		expect( firstTopPost.querySelector( '.parsely-post-metric-data' )?.childNodes[ 2 ].textContent ).toEqual( '1' );
	} );

	test( 'should show 5 posts by default', async () => {
		const getRelatedPostsFn = getRelatedPostsMockFn( () => Promise.resolve( {
			message: `Posts with tag "Developers" in last 7 days.`,
			posts: getRelatedPostsMockData(),
		} ) );

		await waitFor( async () => {
			render( relatedPostList );
			expect( getSpinner() ).toBeInTheDocument();
		} );

		expect( getRelatedPostsFn ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();
		expect( getTopPostDesc()?.textContent ).toEqual( `Posts with tag "Developers" in last 7 days.` );
		expect( getTopPosts().length ).toEqual( 5 );
	} );

	function getSpinner() {
		return screen.queryByTestId( 'parsely-spinner-wrapper' );
	}

	function getTopPostDesc() {
		return screen.queryByTestId( 'parsely-related-posts-descr' );
	}

	function getTopPosts() {
		return screen.queryAllByTestId( 'parsely-related-post' );
	}

	function getCredentialsNotSetMessage() {
		return screen.queryByTestId( 'empty-credentials-message' );
	}

	function getRelatedPostsMockFn( mockFn: () => Promise<GetRelatedPostsResult> ) {
		return jest
			.spyOn( RelatedPostsProvider, 'getRelatedPosts' )
			.mockImplementation( mockFn );
	}

	function getRelatedPostsMockData( postsCount = RELATED_POSTS_DEFAULT_LIMIT ) {
		const posts = [];

		for ( let i = 1; i <= postsCount; i++ ) {
			posts.push( {
				author: `Name ${ i }`,
				avgEngaged: `${ i }:00`,
				dashUrl: `${ DASHBOARD_BASE_URL }/example.com/post-${ i }`,
				date: `Jan ${ i }, 2022`,
				id: i,
				postId: i,
				title: `Title ${ i }`,
				thumbnailUrl: `http://example.com/post-${ i }.jpg`,
				url: `http://example.com/post-${ i }`,
				rawUrl: `http://example.com/post-${ i }`,
				views: i,
			} );
		}

		return posts;
	}

	async function verifyCredentialsNotSetMessage( getRelatedPostsFn: jest.SpyInstance<Promise<GetRelatedPostsResult>> ) {
		render( relatedPostList );
		expect( getSpinner() ).toBeInTheDocument();

		await waitFor( () => screen.findByTestId( 'empty-credentials-message' ), { timeout: 3000 } );

		expect( getRelatedPostsFn ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const contactUsMessage = getCredentialsNotSetMessage();
		expect( contactUsMessage ).toBeInTheDocument();
		expect( contactUsMessage ).toBeVisible();

		return true;
	}

	async function verifyApiErrorMessage( getRelatedPostsFn: jest.SpyInstance<Promise<GetRelatedPostsResult>> ) {
		render( relatedPostList );
		expect( getSpinner() ).toBeInTheDocument();

		await waitFor( () => screen.findByTestId( 'error' ), { timeout: 3000 } );

		expect( getRelatedPostsFn ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const apiError = screen.queryByTestId( 'error' );
		expect( apiError ).toBeInTheDocument();
		expect( apiError ).toBeVisible();
		expect( apiError?.textContent?.startsWith( 'Error: Fake error from API.' ) ).toBeTruthy();

		return true;
	}
} );

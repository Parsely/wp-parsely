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
	Metric,
	Period,
} from '../../../src/content-helper/common/utils/constants';
import {
	RelatedTopPostList,
} from '../../../src/content-helper/editor-sidebar/related-top-posts/component-list';
import {
	GetRelatedTopPostsResult,
	RELATED_POSTS_DEFAULT_LIMIT,
	RelatedTopPostsProvider,
} from '../../../src/content-helper/editor-sidebar/related-top-posts/provider';

const postData = {
	authors: [],
	isPage: false,
	categories: [],
	tags: [],
};

describe( 'PCH Editor Sidebar Related Top Post panel', () => {
	test( 'should display spinner when starting', async () => {
		const getRelatedTopPostsFn = getRelatedTopPostsMockFn( () => Promise.resolve( {
			message: 'Testing that the spinner appears and disappears.',
			posts: [],
		} ) );

		await waitFor( async () => {
			render( <RelatedTopPostList period={ Period.Days7 } metric={ Metric.Views } postData={ postData } /> );
			expect( getSpinner() ).toBeInTheDocument();
		} );

		expect( getRelatedTopPostsFn ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();
	} );

	test( 'should show contact us message when Parse.ly Site ID is not set', async () => {
		const getRelatedTopPostsFn = getRelatedTopPostsMockFn( () => Promise.reject( new ContentHelperError(
			'Error message.',
			ContentHelperErrorCode.PluginSettingsSiteIdNotSet
		) ) );

		expect( await verifyCredentialsNotSetMessage( getRelatedTopPostsFn ) ).toBeTruthy();
	} );

	test( 'should show contact us message when Parse.ly API Secret is not set', async () => {
		const getRelatedTopPostsFn = getRelatedTopPostsMockFn( () => Promise.reject( new ContentHelperError(
			'Error message.',
			ContentHelperErrorCode.PluginSettingsApiSecretNotSet
		) ) );

		expect( await verifyCredentialsNotSetMessage( getRelatedTopPostsFn ) ).toBeTruthy();
	} );

	test( 'should show error message when API returns the error', async () => {
		const getRelatedTopPostsFn = getRelatedTopPostsMockFn( () => Promise.reject( new ContentHelperError(
			'Fake error from API.',
			ContentHelperErrorCode.ParselyApiResponseContainsError
		) ) );

		expect( await verifyApiErrorMessage( getRelatedTopPostsFn ) ).toBeTruthy();
	} );

	test( 'should show error message and hint when API fetch is failed', async () => {
		const getRelatedTopPostsFn = getRelatedTopPostsMockFn( () => Promise.reject( new ContentHelperError(
			'Fake error from API.',
			ContentHelperErrorCode.FetchError
		) ) );

		expect( await verifyApiErrorMessage( getRelatedTopPostsFn ) ).toBeTruthy();

		const apiErrorHint = screen.queryByTestId( 'content-helper-error-message-hint' );
		expect( apiErrorHint ).toBeInTheDocument();
		expect( apiErrorHint ).toBeVisible();
		expect( apiErrorHint?.textContent ).toEqual(
			'Hint: This error can sometimes be caused by ad-blockers or browser tracking protections. Please add this site to any applicable allow lists and try again.'
		);
	} );

	test( 'should show no results message when there is no tag, category or author in the post', async () => {
		const getRelatedTopPostsFn = getRelatedTopPostsMockFn( () => Promise.resolve( {
			message: 'The Parse.ly API did not return any results for top posts by "author".',
			posts: [],
		} ) );

		await waitFor( async () => {
			render( <RelatedTopPostList period={ Period.Days7 } metric={ Metric.Views } postData={ postData } /> );
			expect( getSpinner() ).toBeInTheDocument();
		} );

		expect( getRelatedTopPostsFn ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const topPostDesc = getTopPostDesc();
		expect( topPostDesc ).toBeInTheDocument();
		expect( topPostDesc ).toBeVisible();
		expect( topPostDesc?.textContent ).toEqual( 'The Parse.ly API did not return any results for top posts by "author".' );
	} );

	test( 'should show a single top post with description and proper attributes', async () => {
		const getRelatedTopPostsFn = getRelatedTopPostsMockFn( () => Promise.resolve( {
			message: `Top posts in category "Developers" in last 7 days.`,
			posts: getRelatedTopPostsMockData( 1 ),
		} ) );

		await waitFor( async () => {
			render( <RelatedTopPostList period={ Period.Days7 } metric={ Metric.Views } postData={ postData } /> );
			expect( getSpinner() ).toBeInTheDocument();
		} );

		expect( getRelatedTopPostsFn ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const topPostDesc = getTopPostDesc();
		expect( topPostDesc ).toBeInTheDocument();
		expect( topPostDesc ).toBeVisible();
		expect( topPostDesc?.textContent ).toEqual( `Top posts in category "Developers" in last 7 days.` );

		const topPosts = getTopPosts();
		expect( topPosts.length ).toEqual( 1 );

		// test top post attributes
		const firstTopPost = topPosts[ 0 ];
		const statsLink = firstTopPost.querySelector( '.parsely-top-post-stats-link' );
		const viewPostLink = firstTopPost.querySelector( '.parsely-top-post-view-link' );
		const editPostLink = firstTopPost.querySelector( '.parsely-top-post-edit-link' );

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
		expect( firstTopPost.querySelector( '.parsely-top-post-date' )?.childNodes[ 1 ].textContent ).toEqual( 'Jan 1, 2022' );
		expect( firstTopPost.querySelector( '.parsely-top-post-author' )?.childNodes[ 1 ].textContent ).toEqual( 'Name 1' );
		expect( firstTopPost.querySelector( '.parsely-top-post-metric-data' )?.childNodes[ 2 ].textContent ).toEqual( '1' );
	} );

	test( 'should show 5 posts by default', async () => {
		const getRelatedTopPostsFn = getRelatedTopPostsMockFn( () => Promise.resolve( {
			message: `Top posts with tag "Developers" in last 7 days.`,
			posts: getRelatedTopPostsMockData(),
		} ) );

		await waitFor( async () => {
			render( <RelatedTopPostList period={ Period.Days7 } metric={ Metric.Views } postData={ postData } /> );
			expect( getSpinner() ).toBeInTheDocument();
		} );

		expect( getRelatedTopPostsFn ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();
		expect( getTopPostDesc()?.textContent ).toEqual( `Top posts with tag "Developers" in last 7 days.` );
		expect( getTopPosts().length ).toEqual( 5 );
	} );

	function getSpinner() {
		return screen.queryByTestId( 'parsely-spinner-wrapper' );
	}

	function getTopPostDesc() {
		return screen.queryByTestId( 'parsely-top-posts-descr' );
	}

	function getTopPosts() {
		return screen.queryAllByTestId( 'parsely-top-post' );
	}

	function getCredentialsNotSetMessage() {
		return screen.queryByTestId( 'empty-credentials-message' );
	}

	function getRelatedTopPostsMockFn( mockFn: () => Promise<GetRelatedTopPostsResult> ) {
		return jest
			.spyOn( RelatedTopPostsProvider, 'getRelatedTopPosts' )
			.mockImplementation( mockFn );
	}

	function getRelatedTopPostsMockData( postsCount = RELATED_POSTS_DEFAULT_LIMIT ) {
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
				views: i,
			} );
		}

		return posts;
	}

	async function verifyCredentialsNotSetMessage( getRelatedTopPostsFn: jest.SpyInstance<Promise<GetRelatedTopPostsResult>> ) {
		render( <RelatedTopPostList period={ Period.Days7 } metric={ Metric.Views } postData={ postData } /> );
		expect( getSpinner() ).toBeInTheDocument();

		await waitFor( () => screen.findByTestId( 'empty-credentials-message' ), { timeout: 3000 } );

		expect( getRelatedTopPostsFn ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const contactUsMessage = getCredentialsNotSetMessage();
		expect( contactUsMessage ).toBeInTheDocument();
		expect( contactUsMessage ).toBeVisible();

		return true;
	}

	async function verifyApiErrorMessage( getRelatedTopPostsFn: jest.SpyInstance<Promise<GetRelatedTopPostsResult>> ) {
		render( <RelatedTopPostList period={ Period.Days7 } metric={ Metric.Views } postData={ postData } /> );
		expect( getSpinner() ).toBeInTheDocument();

		await waitFor( () => screen.findByTestId( 'error' ), { timeout: 3000 } );

		expect( getRelatedTopPostsFn ).toHaveBeenCalled();
		expect( getSpinner() ).toBeNull();

		const apiError = screen.queryByTestId( 'error' );
		expect( apiError ).toBeInTheDocument();
		expect( apiError ).toBeVisible();
		expect( apiError?.textContent?.startsWith( 'Error: Fake error from API.' ) ).toBeTruthy();

		return true;
	}
} );

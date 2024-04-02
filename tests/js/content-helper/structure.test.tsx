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

// Mock the SettingsProvider component.
jest.mock( '../../../src/content-helper/common/settings/provider', () => ( {
	SettingsProvider: ( { children }: { children: React.ReactNode } ) => children,
	useSettings: () => ( {
		settings: {
			RelatedPosts: {
				FilterBy: 'tag',
				FilterValue: '',
				Metric: 'views',
				Open: true,
				Period: '7d',
			},
		},
		setSettings: jest.fn(),
	} ),
} ) );

/**
 * Structure of the mock post data.
 *
 * @since 3.14.3
 */
type MockPostData = {
	authors: {
		name: string;
	}[];
	categories: {
		name: string;
	}[];
	tags: {
		name: string;
	}[];
};

/**
 * Initial mock post data to be returned by the usePostData hook.
 *
 * @since 3.14.3
 */
const mockPostData: MockPostData = {
	authors: [ { name: 'admin' } ],
	categories: [],
	tags: [],
};
jest.mock( '../../../src/content-helper/editor-sidebar/related-posts/hooks', () => {
	return {
		...jest.requireActual( '../../../src/content-helper/editor-sidebar/related-posts/hooks' ),
		usePostData: jest.fn( () => mockPostData ),
	};
} );

const relatedPostsPanel = <RelatedPostsPanel />;

describe( 'PCH Editor Sidebar Related Post panel', () => {
	afterEach( () => {
		jest.clearAllMocks();
		setMockPostData( [ 'admin' ], [], [] );
	} );

	test( 'should display spinner when starting', async () => {
		const getRelatedPostsFn = getRelatedPostsMockFn( () => Promise.resolve( {
			message: 'Testing that the spinner appears and disappears.',
			posts: [],
		} ) );

		await waitFor( async () => {
			render( relatedPostsPanel );
			expect( getLoadingMessage() ).toBeInTheDocument();
		} );

		expect( getRelatedPostsFn ).toHaveBeenCalled();
		expect( getLoadingMessage() ).toBeNull();
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

	test( 'should show no results message when there is no tag or category in the post', async () => {
		const getRelatedPostsFn = getRelatedPostsMockFn( () => Promise.resolve( {
			message: 'The Parse.ly API did not return any results for posts by "author".',
			posts: [],
		} ) );

		setMockPostData( [ 'admin' ], [], [] );

		await waitFor( async () => {
			render( relatedPostsPanel );
			expect( getLoadingMessage() ).toBeInTheDocument();
		} );

		expect( getRelatedPostsFn ).toHaveBeenCalled();
		expect( getLoadingMessage() ).toBeNull();

		const relatedPostDescr = getRelatedPostDescr();
		expect( relatedPostDescr ).toBeInTheDocument();
		expect( relatedPostDescr ).toBeVisible();

		// When there is no tag or category in the post, it should fallback to the author.
		expect( relatedPostDescr?.textContent ).toEqual( 'Top related posts by admin in the last 7 days.' );
		expect( getRelatedPostsEmptyMessage() ).toBeInTheDocument();
	} );

	test( 'should show a single post with description and proper attributes', async () => {
		const getRelatedPostsFn = getRelatedPostsMockFn( () => Promise.resolve( {
			message: `Posts in category "Developers" in last 7 days.`,
			posts: getRelatedPostsMockData( 1 ),
		} ) );

		setMockPostData( [], [ 'Developers' ], [] );

		await waitFor( async () => {
			render( relatedPostsPanel );
			expect( getLoadingMessage() ).toBeInTheDocument();
		} );

		expect( getRelatedPostsFn ).toHaveBeenCalled();
		expect( getLoadingMessage() ).toBeNull();

		const relatedPostDescr = getRelatedPostDescr();
		expect( relatedPostDescr ).toBeInTheDocument();
		expect( relatedPostDescr ).toBeVisible();
		expect( relatedPostDescr?.textContent ).toEqual( `Top related posts in the “Developers” section in the last 7 days.` );

		const relatedPosts = getRelatedPosts();
		expect( relatedPosts.length ).toEqual( 1 );
		const firstPost = relatedPosts[ 0 ];

		// Post title that links to the post in the website.
		const viewPostLink = firstPost.querySelector( 'div.related-post-title a' );
		expect( viewPostLink?.getAttribute( 'href' ) ).toEqual( 'http://example.com/post-1' );
		expect( viewPostLink?.getAttribute( 'target' ) ).toEqual( '_blank' );
		expect( viewPostLink?.childNodes[ 0 ].textContent ).toEqual( 'View on website (opens new tab)' );

		// Parse.ly icon that links to the post in the Parse.ly dashboard.
		const viewInDashLink = firstPost.querySelector( 'div.related-post-info > div:nth-child(3) > a:nth-child(2)' );
		expect( viewInDashLink?.getAttribute( 'href' ) ).toEqual( `${ DASHBOARD_BASE_URL }/example.com/post-1` );
		expect( viewInDashLink?.getAttribute( 'target' ) ).toEqual( '_blank' );
		expect( viewInDashLink?.getAttribute( 'aria-label' ) ).toEqual( 'View in Parse.ly' );

		// Copy URL button that copies the post's URL to the clipboard.
		const copyUrlButton = firstPost.querySelector( 'div.related-post-info > div:nth-child(3) > button' );
		expect( copyUrlButton?.getAttribute( 'aria-label' ) ).toEqual( 'Copy URL to clipboard' );
	} );

	test( 'should show 5 posts by default', async () => {
		const getRelatedPostsFn = getRelatedPostsMockFn( () => Promise.resolve( {
			message: `Top related posts with the “Developers” tag in the last 7 days.`,
			posts: getRelatedPostsMockData(),
		} ) );

		setMockPostData( [ 'admin' ], [ 'Developers' ], [ 'Developers' ] );

		await waitFor( async () => {
			render( relatedPostsPanel );
			expect( getLoadingMessage() ).toBeInTheDocument();
		} );

		expect( getRelatedPostsFn ).toHaveBeenCalled();
		expect( getLoadingMessage() ).toBeNull();
		expect( getRelatedPostDescr()?.textContent ).toEqual( `Top related posts with the “Developers” tag in the last 7 days.` );
		expect( getRelatedPosts().length ).toEqual( 5 );
	} );

	/**
	 * Sets the mock post data to be returned by the usePostData hook.
	 *
	 * @since 3.14.3
	 *
	 * @param { string[] } authors    The authors of the post.
	 * @param { string[] } categories The categories of the post.
	 * @param { string[] } tags       The tags of the post.
	 */
	function setMockPostData( authors: string[], categories: string[], tags: string[] ) {
		mockPostData.authors = authors.map( ( name ) => ( { name } ) );
		mockPostData.categories = categories.map( ( name ) => ( { name } ) );
		mockPostData.tags = tags.map( ( name ) => ( { name } ) );
	}

	function getLoadingMessage() {
		return screen.queryByTestId( 'parsely-related-posts-loading-message' );
	}

	function getRelatedPostDescr() {
		return screen.queryByTestId( 'parsely-related-posts-descr' );
	}

	function getRelatedPosts() {
		return screen.queryAllByTestId( 'related-post-single' );
	}

	function getRelatedPostsEmptyMessage() {
		return screen.queryByTestId( 'parsely-related-posts-empty' );
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
		render( relatedPostsPanel );
		expect( getLoadingMessage() ).toBeInTheDocument();

		await waitFor( () => screen.findByTestId( 'empty-credentials-message' ), { timeout: 3000 } );

		expect( getRelatedPostsFn ).toHaveBeenCalled();
		expect( getLoadingMessage() ).toBeNull();

		const contactUsMessage = getCredentialsNotSetMessage();
		expect( contactUsMessage ).toBeInTheDocument();
		expect( contactUsMessage ).toBeVisible();

		return true;
	}

	async function verifyApiErrorMessage( getRelatedPostsFn: jest.SpyInstance<Promise<GetRelatedPostsResult>> ) {
		render( relatedPostsPanel );
		expect( getLoadingMessage() ).toBeInTheDocument();

		await waitFor( () => screen.findByTestId( 'error' ), { timeout: 3000 } );

		expect( getRelatedPostsFn ).toHaveBeenCalled();
		expect( getLoadingMessage() ).toBeNull();

		const apiError = screen.queryByTestId( 'error' );
		expect( apiError ).toBeInTheDocument();
		expect( apiError ).toBeVisible();
		expect( apiError?.textContent?.startsWith( 'Error: Fake error from API.' ) ).toBeTruthy();

		return true;
	}
} );

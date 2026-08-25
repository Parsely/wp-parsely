/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import type {
	ExcerptSuggestionsSettings,
} from '../../../src/content-helper/common/settings';
import {
	DEFAULT_PERSONA,
	DEFAULT_TONE,
} from '../../../src/content-helper/common/utils/constants';
import {
	PostExcerptSuggestions,
} from '../../../src/content-helper/editor-sidebar/excerpt-suggestions/component-panel';
import {
	DEFAULT_EXCERPT_LENGTH,
	SETTINGS_SAVE_DELAY,
} from '../../../src/content-helper/editor-sidebar/excerpt-suggestions/constants';
import {
	ExcerptSuggestionsProvider,
} from '../../../src/content-helper/editor-sidebar/excerpt-suggestions/provider';
import { Telemetry } from '../../../src/js/telemetry/telemetry';

/**
 * The editor state that the mocked `@wordpress/data` selectors report.
 *
 * @since 3.24.0
 */
const mockEditorState = {
	excerpt: '',
	content: 'Post content.',
	title: 'Post title.',
	postId: 1 as string | number | null,
	isSaving: false,
	isAutosaving: false,
	isPreviewing: false,
	isDeleting: false,
	saveSucceeded: true,
};

/**
 * The listeners registered through the mocked `subscribe`, so that tests can
 * drive the save watcher by hand.
 *
 * @since 3.24.0
 */
const mockSaveListeners: Array<() => void> = [];

const mockEditPost = jest.fn( ( edits: { excerpt: string } ) => {
	mockEditorState.excerpt = edits.excerpt;
} );
const mockCreateSuccessNotice = jest.fn();
const mockSetSettings = jest.fn();

/**
 * The settings reported by the mocked `useSettings` hook.
 *
 * Deliberately never updated in response to `setSettings`, reproducing the
 * stale snapshot a component holds between renders.
 *
 * @since 3.24.0
 */
const mockSettings: { ExcerptSuggestions: ExcerptSuggestionsSettings } = {
	ExcerptSuggestions: {
		Length: DEFAULT_EXCERPT_LENGTH,
		Persona: DEFAULT_PERSONA,
		Tone: DEFAULT_TONE,
	},
};

jest.mock( '@wordpress/data', () => ( {
	select: () => ( {
		getCurrentPostId: () => mockEditorState.postId,
		getEditedPostAttribute: ( attribute: string ) =>
			'excerpt' === attribute ? mockEditorState.excerpt : mockEditorState.title,
		getEditedPostContent: () => mockEditorState.content,
		isSavingPost: () => mockEditorState.isSaving,
		isAutosavingPost: () => mockEditorState.isAutosaving,
		isPreviewingPost: () => mockEditorState.isPreviewing,
		isDeletingPost: () => mockEditorState.isDeleting,
		didPostSaveRequestSucceed: () => mockEditorState.saveSucceeded,
	} ),
	useSelect: ( mapSelect: ( select: unknown ) => unknown ) =>
		mapSelect( () => ( {
			getEditedPostAttribute: ( attribute: string ) =>
				'excerpt' === attribute ? mockEditorState.excerpt : mockEditorState.title,
			getEditedPostContent: () => mockEditorState.content,
		} ) ),
	useDispatch: () => ( {
		editPost: mockEditPost,
		createSuccessNotice: mockCreateSuccessNotice,
	} ),
	subscribe: ( listener: () => void ) => {
		mockSaveListeners.push( listener );

		return () => {
			mockSaveListeners.splice( mockSaveListeners.indexOf( listener ), 1 );
		};
	},
} ) );

jest.mock( '@wordpress/editor', () => ( { store: 'core/editor' } ) );
jest.mock( '@wordpress/notices', () => ( { store: 'core/notices' } ) );

// Stubbed to keep the suite from loading the whole block editor for the single
// component it needs.
jest.mock( '@wordpress/block-editor', () => ( {
	__experimentalInspectorPopoverHeader: ( { title }: { title: string } ) => title,
} ) );

// Autocomplete pulls this in, and its store setup needs the unmocked
// `@wordpress/data`. Nothing here renders an autocomplete.
jest.mock( '@wordpress/rich-text', () => ( {
	create: jest.fn(),
	getTextContent: jest.fn(),
	insert: jest.fn(),
	isCollapsed: jest.fn(),
	slice: jest.fn(),
	useAnchor: jest.fn(),
} ) );

jest.mock( '../../../src/content-helper/common/settings', () => ( {
	useSettings: () => ( {
		settings: mockSettings,
		setSettings: mockSetSettings,
	} ),
} ) );

// Avoid "ReferenceError: ResizeObserver is not defined" error.
window.ResizeObserver =
	window.ResizeObserver ||
	jest.fn().mockImplementation( () => ( {
		disconnect: jest.fn(),
		observe: jest.fn(),
		unobserve: jest.fn(),
	} ) );

describe( 'PCH Excerpt Suggestions panel', () => {
	beforeEach( () => {
		mockEditorState.excerpt = '';
		mockEditorState.content = 'Post content.';
		mockEditorState.title = 'Post title.';
		mockEditorState.postId = 1;
		mockEditorState.isSaving = false;
		mockEditorState.isAutosaving = false;
		mockEditorState.isPreviewing = false;
		mockEditorState.isDeleting = false;
		mockEditorState.saveSucceeded = true;
		mockSaveListeners.length = 0;

		mockSettings.ExcerptSuggestions = {
			Length: DEFAULT_EXCERPT_LENGTH,
			Persona: DEFAULT_PERSONA,
			Tone: DEFAULT_TONE,
		};
	} );

	afterEach( async () => {
		// The save watcher lives in module scope, so it outlives both the
		// component and the test. Switching post tears it down.
		mockEditorState.postId = -1;
		await notifySaveListeners();

		delete window.wpParselyContentHelperDefaults;
		jest.clearAllMocks();
	} );

	describe( 'generation request', () => {
		test( 'should send the persisted tone, persona and length', async () => {
			const generate = mockGenerateExcerpt();

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			expect( generate ).toHaveBeenCalledWith(
				'Post title.', 'Post content.', DEFAULT_PERSONA, DEFAULT_TONE, DEFAULT_EXCERPT_LENGTH
			);
		} );

		test( 'should send a length other than the default', async () => {
			const generate = mockGenerateExcerpt();
			mockSettings.ExcerptSuggestions.Length = 220;

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			expect( generate ).toHaveBeenCalledWith(
				'Post title.', 'Post content.', DEFAULT_PERSONA, DEFAULT_TONE, 220
			);
		} );

		test( 'should send the length untouched when the tone falls back', async () => {
			const generate = mockGenerateExcerpt();
			window.wpParselyContentHelperDefaults = {
				excerptSuggestions: { persona: 'techAnalyst', tone: 'analytical' },
			};
			mockSettings.ExcerptSuggestions.Length = 220;
			mockSettings.ExcerptSuggestions.Tone = 'custom';

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			expect( generate ).toHaveBeenCalledWith(
				'Post title.', 'Post content.', DEFAULT_PERSONA, 'analytical', 220
			);
		} );

		test( 'should use the shipped defaults when the site injects none', async () => {
			const generate = mockGenerateExcerpt();
			mockSettings.ExcerptSuggestions.Persona = 'custom';
			mockSettings.ExcerptSuggestions.Tone = 'custom';

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			expect( generate ).toHaveBeenCalledWith(
				'Post title.', 'Post content.', DEFAULT_PERSONA, DEFAULT_TONE, DEFAULT_EXCERPT_LENGTH
			);
		} );

		test( 'should use the site defaults for an empty custom value', async () => {
			const generate = mockGenerateExcerpt();
			window.wpParselyContentHelperDefaults = {
				excerptSuggestions: { persona: 'techAnalyst', tone: 'analytical' },
			};
			mockSettings.ExcerptSuggestions.Persona = 'custom';
			mockSettings.ExcerptSuggestions.Tone = 'custom';

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			expect( generate ).toHaveBeenCalledWith(
				'Post title.', 'Post content.', 'techAnalyst', 'analytical', DEFAULT_EXCERPT_LENGTH
			);
		} );

		test( 'should keep a tone and persona the author entered', async () => {
			const generate = mockGenerateExcerpt();
			window.wpParselyContentHelperDefaults = {
				excerptSuggestions: { persona: 'techAnalyst', tone: 'analytical' },
			};
			mockSettings.ExcerptSuggestions.Persona = 'editorialWriter';
			mockSettings.ExcerptSuggestions.Tone = 'snarky';

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			expect( generate ).toHaveBeenCalledWith(
				'Post title.', 'Post content.', 'editorialWriter', 'snarky', DEFAULT_EXCERPT_LENGTH
			);
		} );

		test( 'should apply the generated excerpt to the post', async () => {
			mockGenerateExcerpt();

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			expect( mockEditPost ).toHaveBeenCalledWith( { excerpt: 'Generated excerpt.' } );
		} );

		test( 'should not apply the excerpt when the post changed during the request', async () => {
			mockGenerateExcerpt( async () => {
				mockEditorState.postId = 2;
				return 'Generated excerpt.';
			} );

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			expect( mockEditPost ).not.toHaveBeenCalled();
		} );
	} );

	describe( 'loading state across remounts', () => {
		test( 'should not stay stuck when the panel remounts mid-request', async () => {
			let finishRequest: ( excerpt: string ) => void = () => undefined;
			mockGenerateExcerpt(
				() => new Promise( ( resolve ) => {
					finishRequest = resolve;
				} )
			);

			// Start the request, then unmount as collapsing the panel would.
			const firstPanel = render( <PostExcerptSuggestions /> );
			await clickGenerate();
			const busyBeforeUnmount = getGenerateButton().getAttribute( 'aria-disabled' );
			firstPanel.unmount();

			// Re-expanding mid-request must show the request as still running.
			const secondPanel = render( <PostExcerptSuggestions /> );
			const busyAfterRemount = getGenerateButton().getAttribute( 'aria-disabled' );

			// Resolved before asserting, so a failure cannot leave the shared
			// generation state stuck and cascade into the other tests.
			await act( async () => {
				finishRequest( 'Generated excerpt.' );
			} );

			expect( busyBeforeUnmount ).toBe( 'true' );
			expect( busyAfterRemount ).toBe( 'true' );
			expect( getGenerateButton() ).not.toHaveAttribute( 'aria-disabled' );
			secondPanel.unmount();
		} );
	} );

	describe( 'settings persistence', () => {
		test( 'should merge consecutive changes instead of overwriting them', async () => {
			render( <PostExcerptSuggestions /> );

			await openSettings();
			await changeTone( 'formal' );
			await changeLength( 200 );

			// `useSettings` keeps reporting the original snapshot, so the second
			// change must still build on the first one.
			expect( lastPersistedSettings() ).toEqual( {
				Length: 200,
				Persona: DEFAULT_PERSONA,
				Tone: 'formal',
			} );
		} );
	} );

	describe( 'save outcome telemetry', () => {
		test( 'should report an accepted excerpt that survives the save', async () => {
			const trackEvent = mockTrackEvent();
			mockGenerateExcerpt();

			render( <PostExcerptSuggestions /> );
			await clickGenerate();
			await completeSave();

			expect( trackEvent ).toHaveBeenCalledWith(
				'excerpt_generator_accepted', { modified: false }
			);
		} );

		test( 'should report a discarded excerpt that was reverted', async () => {
			const trackEvent = mockTrackEvent();
			mockEditorState.excerpt = 'Author excerpt.';
			mockGenerateExcerpt();

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			mockEditorState.excerpt = 'Author excerpt.';
			await completeSave();

			expect( trackEvent ).toHaveBeenCalledWith(
				'excerpt_generator_discarded', { via: 'editor_undo' }
			);
		} );

		test( 'should report nothing when the excerpt was rewritten', async () => {
			const trackEvent = mockTrackEvent();
			mockGenerateExcerpt();

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			mockEditorState.excerpt = 'Something the author wrote instead.';
			await completeSave();

			expect( reportedOutcomes( trackEvent ) ).toEqual( [] );
		} );

		test( 'should not attribute a save that started before the generation', async () => {
			const trackEvent = mockTrackEvent();
			mockGenerateExcerpt();

			// A save is already in flight when the generation completes.
			mockEditorState.isSaving = true;
			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			await notifySaveListeners();
			mockEditorState.isSaving = false;
			await notifySaveListeners();

			expect( reportedOutcomes( trackEvent ) ).toEqual( [] );

			// The next save does express an outcome.
			await completeSave();

			expect( trackEvent ).toHaveBeenCalledWith(
				'excerpt_generator_accepted', { modified: false }
			);
		} );

		test( 'should ignore autosaves', async () => {
			const trackEvent = mockTrackEvent();
			mockGenerateExcerpt();

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			mockEditorState.isAutosaving = true;
			await completeSave();

			expect( reportedOutcomes( trackEvent ) ).toEqual( [] );
		} );

		test( 'should report nothing when the save failed', async () => {
			const trackEvent = mockTrackEvent();
			mockGenerateExcerpt();

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			mockEditorState.saveSucceeded = false;
			await completeSave();

			expect( reportedOutcomes( trackEvent ) ).toEqual( [] );
		} );
	} );

	describe( 'snackbar undo', () => {
		test( 'should restore the excerpt the author started with', async () => {
			const trackEvent = mockTrackEvent();
			mockEditorState.excerpt = 'Author excerpt.';
			mockGenerateExcerpt();

			render( <PostExcerptSuggestions /> );
			await clickGenerate();
			await clickUndo();

			expect( mockEditPost ).toHaveBeenLastCalledWith( { excerpt: 'Author excerpt.' } );
			expect( trackEvent ).toHaveBeenCalledWith(
				'excerpt_generator_discarded', { via: 'snackbar' }
			);
		} );

		test( 'should restore the original excerpt after regenerating', async () => {
			mockEditorState.excerpt = 'Author excerpt.';
			mockGenerateExcerpt();

			render( <PostExcerptSuggestions /> );
			await clickGenerate();
			await clickGenerate();
			await clickUndo();

			expect( mockEditPost ).toHaveBeenLastCalledWith( { excerpt: 'Author excerpt.' } );
		} );

		test( 'should do nothing once the notice outlives its generation', async () => {
			const trackEvent = mockTrackEvent();
			mockGenerateExcerpt();

			render( <PostExcerptSuggestions /> );
			await clickGenerate();

			// The notice stays on screen after the editor moves to another
			// post, whose excerpt must be left alone.
			mockEditorState.postId = 2;
			await notifySaveListeners();

			mockEditPost.mockClear();
			await clickUndo();

			expect( mockEditPost ).not.toHaveBeenCalled();
			expect( reportedOutcomes( trackEvent ) ).toEqual( [] );
		} );
	} );

	/**
	 * Stubs the excerpt generation request.
	 *
	 * @since 3.24.0
	 *
	 * @param {Function} implementation The request implementation to use.
	 *
	 * @return {jest.SpyInstance} The generateExcerpt spy.
	 */
	function mockGenerateExcerpt(
		implementation: () => Promise<string> = async () => 'Generated excerpt.'
	): jest.SpyInstance {
		return jest
			.spyOn( ExcerptSuggestionsProvider.getInstance(), 'generateExcerpt' )
			.mockImplementation( implementation );
	}

	/**
	 * Captures telemetry events instead of sending them.
	 *
	 * @since 3.24.0
	 *
	 * @return {jest.SpyInstance} The trackEvent spy.
	 */
	function mockTrackEvent(): jest.SpyInstance {
		return jest
			.spyOn( Telemetry, 'trackEvent' )
			.mockImplementation( async () => undefined );
	}

	/**
	 * Returns the outcome events reported through the passed spy.
	 *
	 * Only the press event is dropped, so that an unexpected event fails the
	 * assertion rather than being filtered out of it.
	 *
	 * @since 3.24.0
	 *
	 * @param {jest.SpyInstance} trackEvent The Telemetry.trackEvent spy.
	 *
	 * @return {string[]} The reported outcome event names.
	 */
	function reportedOutcomes( trackEvent: jest.SpyInstance ): string[] {
		return trackEvent.mock.calls
			.map( ( [ event ] ) => event as string )
			.filter( ( event ) => 'excerpt_generator_pressed' !== event );
	}

	/**
	 * Returns the Excerpt Suggestions settings of the last persisted call.
	 *
	 * @since 3.24.0
	 *
	 * @return {Object} The persisted Excerpt Suggestions settings.
	 */
	function lastPersistedSettings(): ExcerptSuggestionsSettings {
		const calls = mockSetSettings.mock.calls;

		return calls[ calls.length - 1 ][ 0 ].ExcerptSuggestions;
	}

	/**
	 * Returns the panel's Generate button, whatever its current label.
	 *
	 * @since 3.24.0
	 *
	 * @return {HTMLElement} The Generate button.
	 */
	function getGenerateButton(): HTMLElement {
		return screen.getByRole( 'button', { name: /Generat|Regenerate/ } );
	}

	/**
	 * Requests an excerpt and waits for the request to settle.
	 *
	 * @since 3.24.0
	 */
	async function clickGenerate(): Promise<void> {
		await act( async () => {
			getGenerateButton().click();
		} );
	}

	/**
	 * Activates the Undo action of the most recent snackbar notice.
	 *
	 * The notice is rendered by the editor rather than the panel, so the
	 * action is taken from the recorded createSuccessNotice call.
	 *
	 * @since 3.24.0
	 */
	async function clickUndo(): Promise<void> {
		const notices = mockCreateSuccessNotice.mock.calls;
		const { actions } = notices[ notices.length - 1 ][ 1 ];

		await act( async () => {
			actions[ 0 ].onClick();
		} );
	}

	/**
	 * Opens the settings popover, mounting its controls.
	 *
	 * @since 3.24.0
	 */
	async function openSettings(): Promise<void> {
		await act( async () => {
			screen.getByRole( 'button', {
				name: 'Excerpt Suggestions settings',
			} ).click();
		} );
	}

	/**
	 * Selects a tone, which is persisted without waiting for the debounce.
	 *
	 * @since 3.24.0
	 *
	 * @param {string} tone The tone to select.
	 */
	async function changeTone( tone: string ): Promise<void> {
		await act( async () => {
			fireEvent.change( screen.getByLabelText( 'Tone' ), {
				target: { value: tone },
			} );
		} );
	}

	/**
	 * Sets the desired length, then waits out the debounce so the change is
	 * persisted rather than left pending.
	 *
	 * @since 3.24.0
	 *
	 * @param {number} length The length to set.
	 */
	async function changeLength( length: number ): Promise<void> {
		const slider = screen
			.getAllByLabelText( 'Desired length (characters)' )
			.find( ( input ) => 'range' === ( input as HTMLInputElement ).type );

		await act( async () => {
			fireEvent.change( slider as HTMLInputElement, {
				target: { value: String( length ) },
			} );
		} );

		await act( async () => {
			await new Promise( ( resolve ) => setTimeout( resolve, SETTINGS_SAVE_DELAY + 100 ) );
		} );
	}

	/**
	 * Runs every listener registered through the mocked subscribe, standing in
	 * for an editor store change.
	 *
	 * @since 3.24.0
	 */
	async function notifySaveListeners(): Promise<void> {
		await act( async () => {
			[ ...mockSaveListeners ].forEach( ( listener ) => listener() );
		} );
	}

	/**
	 * Runs a save from start to finish, using the currently configured
	 * save state.
	 *
	 * @since 3.24.0
	 */
	async function completeSave(): Promise<void> {
		mockEditorState.isSaving = true;
		await notifySaveListeners();

		mockEditorState.isSaving = false;
		await notifySaveListeners();
	}
} );

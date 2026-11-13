/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import {
	TitleSuggestionsPanel,
} from '../../../src/content-helper/editor-sidebar/title-suggestions/component';
import {
	TitleSuggestionsProvider,
} from '../../../src/content-helper/editor-sidebar/title-suggestions/provider';

/**
 * The TitleSuggestions settings the mocked `useSettings` hook reports.
 *
 * @since 3.24.0
 */
const mockSettings = {
	TitleSuggestions: {
		Open: false,
		Persona: 'journalist' as string,
		Tone: 'neutral' as string,
	},
};

const mockStoreState = {
	loading: false,
	titles: [] as Array<{ title: string, isPinned: boolean }>,
};

const mockSetTitles = jest.fn();
const mockSetLoading = jest.fn();

jest.mock( '@wordpress/data', () => ( {
	dispatch: () => ( { pinTitle: jest.fn() } ),
	useDispatch: ( store: unknown ) => (
		'core/notices' === store
			? { createNotice: jest.fn() }
			: {
				setTitles: mockSetTitles,
				setLoading: mockSetLoading,
				setAcceptedTitle: jest.fn(),
				setOriginalTitle: jest.fn(),
			}
	),
	useSelect: ( mapSelect: ( select: ( s: unknown ) => unknown ) => unknown ) =>
		mapSelect( ( store: unknown ) => (
			'core/editor' === store
				? {
					getEditedPostContent: () => 'Post content.',
					getEditedPostAttribute: () => 'Post title.',
				}
				: {
					isLoading: () => mockStoreState.loading,
					getTitles: () => mockStoreState.titles,
					getAcceptedTitle: () => undefined,
					getOriginalTitle: () => undefined,
				}
		) ),
	createReduxStore: () => 'wp-parsely/write-titles',
	register: jest.fn(),
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
	useSettings: () => ( { settings: mockSettings, setSettings: jest.fn() } ),
} ) );

jest.mock( '../../../src/js/telemetry/telemetry', () => ( {
	Telemetry: { trackEvent: jest.fn() },
} ) );

jest.mock( '../../../src/@types/gutenberg/types', () => ( {
	dispatchCoreEditor: { editPost: jest.fn() },
	GutenbergFunction: {},
} ) );

describe( 'PCH Title Suggestions panel', () => {
	beforeEach( () => {
		mockSettings.TitleSuggestions.Tone = 'neutral';
		mockSettings.TitleSuggestions.Persona = 'journalist';
		mockStoreState.loading = false;
		mockStoreState.titles = [];
		window.wpParselyContentHelperDefaults = {
			titleSuggestions: { persona: 'techAnalyst', tone: 'analytical' },
		};
	} );

	afterEach( () => {
		delete window.wpParselyContentHelperDefaults;
		jest.restoreAllMocks();
		jest.clearAllMocks();
	} );

	/**
	 * Returns the panel's generate button.
	 *
	 * @since 3.24.0
	 *
	 * @return {HTMLElement} The generate button.
	 */
	function getGenerateButton(): HTMLElement {
		return screen.getByRole( 'button', { name: /Generate Titles/i } );
	}

	/**
	 * Presses the generate button and waits for the request it starts.
	 *
	 * @since 3.24.0
	 */
	async function clickGenerate(): Promise<void> {
		await act( async () => {
			getGenerateButton().click();
		} );
	}

	/**
	 * Selecting Custom without typing stores the sentinel. The button has to
	 * stay usable, or the site default it resolves to is unreachable.
	 *
	 * @since 3.24.0
	 */
	test( 'should allow generating with an empty custom tone', () => {
		mockSettings.TitleSuggestions.Tone = 'custom';

		render( <TitleSuggestionsPanel /> );

		expect( getGenerateButton() ).not.toBeDisabled();
	} );

	test( 'should allow generating with an empty custom persona', () => {
		mockSettings.TitleSuggestions.Persona = 'custom';

		render( <TitleSuggestionsPanel /> );

		expect( getGenerateButton() ).not.toBeDisabled();
	} );

	test( 'should send the site defaults for an empty custom tone and persona', async () => {
		const generate = jest
			.spyOn( TitleSuggestionsProvider.prototype, 'generateTitles' )
			.mockResolvedValue( [] );

		mockSettings.TitleSuggestions.Tone = 'custom';
		mockSettings.TitleSuggestions.Persona = 'custom';

		render( <TitleSuggestionsPanel /> );
		await clickGenerate();

		expect( generate ).toHaveBeenCalledWith(
			'Post content.', 3, 'analytical', 'techAnalyst'
		);
	} );

	/**
	 * Clearing the free-text field stores an empty string rather than the
	 * sentinel, so the same visible state arrives by two routes.
	 *
	 * @since 3.24.0
	 */
	test( 'should treat a cleared custom value like the sentinel', async () => {
		const generate = jest
			.spyOn( TitleSuggestionsProvider.prototype, 'generateTitles' )
			.mockResolvedValue( [] );

		mockSettings.TitleSuggestions.Tone = '';
		mockSettings.TitleSuggestions.Persona = '';

		render( <TitleSuggestionsPanel /> );
		await clickGenerate();

		expect( generate ).toHaveBeenCalledWith(
			'Post content.', 3, 'analytical', 'techAnalyst'
		);
	} );

	test( 'should send an author\'s own tone and persona untouched', async () => {
		const generate = jest
			.spyOn( TitleSuggestionsProvider.prototype, 'generateTitles' )
			.mockResolvedValue( [] );

		mockSettings.TitleSuggestions.Tone = 'snarky';
		mockSettings.TitleSuggestions.Persona = 'editorialWriter';

		render( <TitleSuggestionsPanel /> );
		await clickGenerate();

		expect( generate ).toHaveBeenCalledWith(
			'Post content.', 3, 'snarky', 'editorialWriter'
		);
	} );

	test( 'should disable the button while a request is running', () => {
		mockStoreState.loading = true;

		render( <TitleSuggestionsPanel /> );

		expect(
			screen.getByRole( 'button', { name: /Generating Titles/i } )
		).toBeDisabled();
	} );
} );

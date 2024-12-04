/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { ContentHelperError } from '../../../common/content-helper-error';
import { HydratedPost } from '../../../common/base-wordpress-provider';

/**
 * Available tab names in the Traffic Boost sidebar.
 */
export enum TrafficBoostSidebarTabs {
	SUGGESTIONS = 'suggestions',
	BOOST_LINKS = 'boost-links',
}

/**
 * The shape of the suggestions tab state.
 */
type SuggestionsTabState = {
	suggestions: HydratedPost[];
	selectedSuggestion: HydratedPost | null;
	currentPage: number;
};

/**
 * The shape of the boost links tab state.
 */
type BoostLinksTabState = {
	links: HydratedPost[];
	selectedBoostLink: HydratedPost | null;
	currentPage: number;
};

/**
 * The shape of the Traffic Boost store state.
 */
type TrafficBoostState = {
	isLoading: boolean;
	error: ContentHelperError | null;
	selectedPost: HydratedPost | null;
	currentPost: HydratedPost | null;
	selectedTab: TrafficBoostSidebarTabs;
	suggestionsTab: SuggestionsTabState;
	boostLinksTab: BoostLinksTabState;
};

/********** Actions **********/

interface SetLoadingAction {
	type: 'SET_LOADING';
	isLoading: boolean;
}

interface SetErrorAction {
	type: 'SET_ERROR';
	error: ContentHelperError | null;
}

interface SetSelectedHydratedPostAction {
	type: 'SET_SELECTED_HYDRATED_POST';
	post: HydratedPost | null;
}

interface SetCurrentHydratedPostAction {
	type: 'SET_CURRENT_HYDRATED_POST';
	post: HydratedPost | null;
}

interface SetSelectedTabAction {
	type: 'SET_SELECTED_TAB';
	tab: TrafficBoostSidebarTabs;
}

interface SetSuggestionsAction {
	type: 'SET_SUGGESTIONS';
	suggestions: HydratedPost[];
}

interface SetSelectedSuggestionAction {
	type: 'SET_SELECTED_SUGGESTION';
	suggestion: HydratedPost | null;
}

interface SetSuggestionsPageAction {
	type: 'SET_SUGGESTIONS_PAGE';
	page: number;
}

interface SetBoostLinksAction {
	type: 'SET_BOOST_LINKS';
	links: HydratedPost[];
}

interface SetSelectedBoostLinkAction {
	type: 'SET_SELECTED_BOOST_LINK';
	link: HydratedPost | null;
}

interface SetBoostLinksPageAction {
	type: 'SET_BOOST_LINKS_PAGE';
	page: number;
}

type ActionTypes =
	| SetLoadingAction
	| SetErrorAction
	| SetSelectedHydratedPostAction
	| SetCurrentHydratedPostAction
	| SetSelectedTabAction
	| SetSuggestionsAction
	| SetSelectedSuggestionAction
	| SetSuggestionsPageAction
	| SetBoostLinksAction
	| SetSelectedBoostLinkAction
	| SetBoostLinksPageAction;

const defaultState: TrafficBoostState = {
	isLoading: false,
	error: null,
	selectedPost: null,
	currentPost: null,
	selectedTab: TrafficBoostSidebarTabs.SUGGESTIONS,
	suggestionsTab: {
		suggestions: [],
		selectedSuggestion: null,
		currentPage: 1,
	},
	boostLinksTab: {
		links: [],
		selectedBoostLink: null,
		currentPage: 1,
	},
};

/**
 * The Traffic Boost store.
 */
export const TrafficBoostStore = createReduxStore( 'wp-parsely/traffic-boost', {
	initialState: defaultState,
	reducer( state: TrafficBoostState = defaultState, action: ActionTypes ): TrafficBoostState {
		switch ( action.type ) {
			case 'SET_LOADING':
				return {
					...state,
					isLoading: action.isLoading,
				};
			case 'SET_ERROR':
				return {
					...state,
					error: action.error,
				};
			case 'SET_SELECTED_HYDRATED_POST':
				return {
					...state,
					selectedPost: action.post,
				};
			case 'SET_CURRENT_HYDRATED_POST':
				return {
					...state,
					currentPost: action.post,
				};
			case 'SET_SELECTED_TAB':
				return {
					...state,
					selectedTab: action.tab,
				};
			case 'SET_SUGGESTIONS':
				return {
					...state,
					suggestionsTab: {
						...state.suggestionsTab,
						suggestions: action.suggestions,
					},
				};
			case 'SET_SELECTED_SUGGESTION':
				return {
					...state,
					suggestionsTab: {
						...state.suggestionsTab,
						selectedSuggestion: action.suggestion,
					},
				};
			case 'SET_SUGGESTIONS_PAGE':
				return {
					...state,
					suggestionsTab: {
						...state.suggestionsTab,
						currentPage: action.page,
					},
				};
			case 'SET_BOOST_LINKS':
				return {
					...state,
					boostLinksTab: {
						...state.boostLinksTab,
						links: action.links,
					},
				};
			case 'SET_SELECTED_BOOST_LINK':
				return {
					...state,
					boostLinksTab: {
						...state.boostLinksTab,
						selectedBoostLink: action.link,
					},
				};
			case 'SET_BOOST_LINKS_PAGE':
				return {
					...state,
					boostLinksTab: {
						...state.boostLinksTab,
						currentPage: action.page,
					},
				};
			default:
				return state;
		}
	},
	actions: {
		setLoading( isLoading: boolean ): SetLoadingAction {
			return {
				type: 'SET_LOADING',
				isLoading,
			};
		},
		setError( error: ContentHelperError | null ): SetErrorAction {
			return {
				type: 'SET_ERROR',
				error,
			};
		},
		setSelectedHydratedPost( post: HydratedPost | null ): SetSelectedHydratedPostAction {
			return {
				type: 'SET_SELECTED_HYDRATED_POST',
				post,
			};
		},
		setCurrentHydratedPost( post: HydratedPost | null ): SetCurrentHydratedPostAction {
			return {
				type: 'SET_CURRENT_HYDRATED_POST',
				post,
			};
		},
		setSelectedTab( tab: TrafficBoostSidebarTabs ): SetSelectedTabAction {
			return {
				type: 'SET_SELECTED_TAB',
				tab,
			};
		},
		setSuggestions( suggestions: HydratedPost[] ): SetSuggestionsAction {
			return {
				type: 'SET_SUGGESTIONS',
				suggestions,
			};
		},
		setSelectedSuggestion( suggestion: HydratedPost | null ): SetSelectedSuggestionAction {
			return {
				type: 'SET_SELECTED_SUGGESTION',
				suggestion,
			};
		},
		setSuggestionsPage( page: number ): SetSuggestionsPageAction {
			return {
				type: 'SET_SUGGESTIONS_PAGE',
				page,
			};
		},
		setBoostLinks( links: HydratedPost[] ): SetBoostLinksAction {
			return {
				type: 'SET_BOOST_LINKS',
				links,
			};
		},
		setSelectedBoostLink( link: HydratedPost | null ): SetSelectedBoostLinkAction {
			return {
				type: 'SET_SELECTED_BOOST_LINK',
				link,
			};
		},
		setBoostLinksPage( page: number ): SetBoostLinksPageAction {
			return {
				type: 'SET_BOOST_LINKS_PAGE',
				page,
			};
		},
	},
	selectors: {
		isLoading( state: TrafficBoostState ): boolean {
			return state.isLoading;
		},
		getError( state: TrafficBoostState ): ContentHelperError | null {
			return state.error;
		},
		getSelectedHydratedPost( state: TrafficBoostState ): HydratedPost | null {
			return state.selectedPost;
		},
		getCurrentHydratedPost( state: TrafficBoostState ): HydratedPost | null {
			return state.currentPost;
		},
		getSelectedTab( state: TrafficBoostState ): TrafficBoostSidebarTabs {
			return state.selectedTab;
		},
		getSuggestions( state: TrafficBoostState ): HydratedPost[] {
			return state.suggestionsTab.suggestions;
		},
		getSelectedSuggestion( state: TrafficBoostState ): HydratedPost | null {
			return state.suggestionsTab.selectedSuggestion;
		},
		getSuggestionsPage( state: TrafficBoostState ): number {
			return state.suggestionsTab.currentPage;
		},
		getBoostLinks( state: TrafficBoostState ): HydratedPost[] {
			return state.boostLinksTab.links;
		},
		getSelectedBoostLink( state: TrafficBoostState ): HydratedPost | null {
			return state.boostLinksTab.selectedBoostLink;
		},
		getBoostLinksPage( state: TrafficBoostState ): number {
			return state.boostLinksTab.currentPage;
		},
	},
} );

register( TrafficBoostStore );

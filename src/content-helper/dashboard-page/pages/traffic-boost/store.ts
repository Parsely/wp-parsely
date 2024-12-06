/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { HydratedPost } from '../../../common/base-wordpress-provider';
import { ContentHelperError } from '../../../common/content-helper-error';
import { TrafficBoostLink } from './provider';

/**
 * Available tab names in the Traffic Boost sidebar.
 *
 * @since 3.18.0
 */
export enum TrafficBoostSidebarTabs {
	SUGGESTIONS = 'suggestions',
	BOOST_LINKS = 'boost-links',
}

/**
 * The shape of the suggestions tab state.
 *
 * @since 3.18.0
 */
type SuggestionsTabState = {
	suggestions: TrafficBoostLink[];
	currentPage: number;
	itemsPerPage: number;
};

/**
 * The shape of the boost links tab state.
 *
 * @since 3.18.0
 */
type BoostLinksTabState = {
	links: TrafficBoostLink[];
	currentPage: number;
	itemsPerPage: number;
};

/**
 * The shape of the Traffic Boost store state.
 *
 * @since 3.18.0
 */
type TrafficBoostState = {
	loading: string[];
	error: ContentHelperError | null;
	currentPost: HydratedPost | null;
	selectedTab: TrafficBoostSidebarTabs;
	selectedLink: TrafficBoostLink | null;
	suggestionsTab: SuggestionsTabState;
	boostLinksTab: BoostLinksTabState;
};

/********** Actions **********/

/**
 * Interface for the SetLoadingAction.
 *
 * @since 3.18.0
 */
interface SetLoadingAction {
	type: 'SET_LOADING';
	isLoading: boolean;
	loadingType: string;
}

/**
 * Interface for the SetErrorAction.
 *
 * @since 3.18.0
 */
interface SetErrorAction {
	type: 'SET_ERROR';
	error: ContentHelperError | null;
}

/**
 * Interface for the SetCurrentHydratedPostAction.
 *
 * @since 3.18.0
 */
interface SetCurrentHydratedPostAction {
	type: 'SET_CURRENT_HYDRATED_POST';
	post: HydratedPost | null;
}

/**
 * Interface for the SetSelectedTabAction.
 *
 * @since 3.18.0
 */
interface SetSelectedTabAction {
	type: 'SET_SELECTED_TAB';
	tab: TrafficBoostSidebarTabs;
}

/**
 * Interface for the SetSuggestionsAction.
 *
 * @since 3.18.0
 */
interface SetSuggestionsAction {
	type: 'SET_SUGGESTIONS';
	suggestions: TrafficBoostLink[];
}

/**
 * Interface for the SetSuggestionsPageAction.
 *
 * @since 3.18.0
 */
interface SetSuggestionsPageAction {
	type: 'SET_SUGGESTIONS_PAGE';
	page: number;
}

/**
 * Interface for the SetBoostLinksAction.
 *
 * @since 3.18.0
 */
interface SetBoostLinksAction {
	type: 'SET_BOOST_LINKS';
	links: TrafficBoostLink[];
}

/**
 * Interface for the SetBoostLinksPageAction.
 *
 * @since 3.18.0
 */
interface SetBoostLinksPageAction {
	type: 'SET_BOOST_LINKS_PAGE';
	page: number;
}

/**
 * Interface for the SetSuggestionsItemsPerPageAction.
 *
 * @since 3.18.0
 */
interface SetSuggestionsItemsPerPageAction {
	type: 'SET_SUGGESTIONS_ITEMS_PER_PAGE';
	itemsPerPage: number;
}

/**
 * Interface for the SetBoostLinksItemsPerPageAction.
 *
 * @since 3.18.0
 */
interface SetBoostLinksItemsPerPageAction {
	type: 'SET_BOOST_LINKS_ITEMS_PER_PAGE';
	itemsPerPage: number;
}

/**
 * Interface for the SetSelectedLinkAction.
 *
 * @since 3.18.0
 */
interface SetSelectedLinkAction {
	type: 'SET_SELECTED_LINK';
	link: TrafficBoostLink | null;
}

/**
 * Union type for all possible action types.
 *
 * @since 3.18.0
 */
type ActionTypes =
	| SetLoadingAction
	| SetErrorAction
	| SetCurrentHydratedPostAction
	| SetSelectedTabAction
	| SetSuggestionsAction
	| SetSuggestionsPageAction
	| SetBoostLinksAction
	| SetBoostLinksPageAction
	| SetSuggestionsItemsPerPageAction
	| SetBoostLinksItemsPerPageAction
	| SetSelectedLinkAction;

/**
 * Default state for the Traffic Boost store.
 *
 * @since 3.18.0
 */
const defaultState: TrafficBoostState = {
	loading: [],
	error: null,
	currentPost: null,
	selectedTab: TrafficBoostSidebarTabs.SUGGESTIONS,
	selectedLink: null,
	suggestionsTab: {
		suggestions: [],
		currentPage: 1,
		itemsPerPage: 0,
	},
	boostLinksTab: {
		links: [],
		currentPage: 1,
		itemsPerPage: 0,
	},
};

/**
 * The Traffic Boost store.
 *
 * @since 3.18.0
 */
export const TrafficBoostStore = createReduxStore( 'wp-parsely/traffic-boost', {
	initialState: defaultState,
	reducer( state: TrafficBoostState = defaultState, action: ActionTypes ): TrafficBoostState {
		switch ( action.type ) {
			case 'SET_LOADING':
				if ( ! action.loadingType ) {
					action.loadingType = 'default';
				}

				return {
					...state,
					loading: action.isLoading
						? [ ...state.loading, action.loadingType ]
						: state.loading.filter( ( type ) => type !== action.loadingType ),
				};
			case 'SET_ERROR':
				return {
					...state,
					error: action.error,
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
			case 'SET_BOOST_LINKS_PAGE':
				return {
					...state,
					boostLinksTab: {
						...state.boostLinksTab,
						currentPage: action.page,
					},
				};
			case 'SET_SUGGESTIONS_ITEMS_PER_PAGE':
				return {
					...state,
					suggestionsTab: {
						...state.suggestionsTab,
						itemsPerPage: action.itemsPerPage,
					},
				};
			case 'SET_BOOST_LINKS_ITEMS_PER_PAGE':
				return {
					...state,
					boostLinksTab: {
						...state.boostLinksTab,
						itemsPerPage: action.itemsPerPage,
					},
				};
			case 'SET_SELECTED_LINK':
				return {
					...state,
					selectedLink: action.link,
				};
			default:
				return state;
		}
	},
	actions: {
		setLoading( isLoading: boolean, loadingType: string = 'default' ): SetLoadingAction {
			return {
				type: 'SET_LOADING',
				isLoading,
				loadingType,
			};
		},
		setError( error: ContentHelperError | null ): SetErrorAction {
			return {
				type: 'SET_ERROR',
				error,
			};
		},
		setCurrentPost( post: HydratedPost | null ): SetCurrentHydratedPostAction {
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
		setSuggestions( suggestions: TrafficBoostLink[] ): SetSuggestionsAction {
			return {
				type: 'SET_SUGGESTIONS',
				suggestions,
			};
		},
		setSuggestionsPage( page: number ): SetSuggestionsPageAction {
			return {
				type: 'SET_SUGGESTIONS_PAGE',
				page,
			};
		},
		setBoostLinks( links: TrafficBoostLink[] ): SetBoostLinksAction {
			return {
				type: 'SET_BOOST_LINKS',
				links,
			};
		},
		setBoostLinksPage( page: number ): SetBoostLinksPageAction {
			return {
				type: 'SET_BOOST_LINKS_PAGE',
				page,
			};
		},
		setSuggestionsItemsPerPage( itemsPerPage: number ): SetSuggestionsItemsPerPageAction {
			return {
				type: 'SET_SUGGESTIONS_ITEMS_PER_PAGE',
				itemsPerPage,
			};
		},
		setBoostLinksItemsPerPage( itemsPerPage: number ): SetBoostLinksItemsPerPageAction {
			return {
				type: 'SET_BOOST_LINKS_ITEMS_PER_PAGE',
				itemsPerPage,
			};
		},
		setSelectedLink( link: TrafficBoostLink | null ): SetSelectedLinkAction {
			return {
				type: 'SET_SELECTED_LINK',
				link,
			};
		},
	},
	selectors: {
		isLoading( state: TrafficBoostState ): boolean {
			return state.loading.length > 0;
		},
		getError( state: TrafficBoostState ): ContentHelperError | null {
			return state.error;
		},
		getCurrentPost( state: TrafficBoostState ): HydratedPost | null {
			return state.currentPost;
		},
		getSelectedTab( state: TrafficBoostState ): TrafficBoostSidebarTabs {
			return state.selectedTab;
		},
		getSuggestions( state: TrafficBoostState ): TrafficBoostLink[] {
			return state.suggestionsTab.suggestions;
		},
		getSuggestionsPage( state: TrafficBoostState ): number {
			return state.suggestionsTab.currentPage;
		},
		getSuggestionsItemsPerPage( state: TrafficBoostState ): number {
			return state.suggestionsTab.itemsPerPage;
		},
		getBoostLinks( state: TrafficBoostState ): TrafficBoostLink[] {
			return state.boostLinksTab.links;
		},
		getBoostLinksPage( state: TrafficBoostState ): number {
			return state.boostLinksTab.currentPage;
		},
		getBoostLinksItemsPerPage( state: TrafficBoostState ): number {
			return state.boostLinksTab.itemsPerPage;
		},
		isSuggestionsLoading( state: TrafficBoostState ): boolean {
			return state.loading.includes( 'suggestions' );
		},
		getSelectedLink( state: TrafficBoostState ): TrafficBoostLink | null {
			return state.selectedLink;
		},
	},
} );

register( TrafficBoostStore );

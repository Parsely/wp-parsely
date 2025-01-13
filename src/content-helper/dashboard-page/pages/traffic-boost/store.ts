/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { HydratedPost } from '../../../common/base-wordpress-provider';
import { ContentHelperError } from '../../../common/content-helper-error';
import { TrafficBoostLink, LinkType } from './provider';

/**
 * Available tab names in the Traffic Boost sidebar.
 *
 * @since 3.18.0
 */
export enum TrafficBoostSidebarTabs {
	SUGGESTIONS = 'suggestions',
	INBOUND_LINKS = 'inbound-links',
	SETTINGS = 'settings',
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
type InboundLinksTabState = {
	links: TrafficBoostLink[];
	currentPage: number;
	itemsPerPage: number;
};

/**
 * The shape of the preview state.
 *
 * @since 3.18.0
 */
type PreviewState = {
	selectedLinkType: LinkType | null;
	frontendPreview: boolean;
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
	preview: PreviewState;
	suggestionsTab: SuggestionsTabState;
	inboundLinksTab: InboundLinksTabState;
	acceptingLinks: string[];
	removingLinks: string[];
	isGeneratingSuggestions: boolean;
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
 * Interface for the SetInboundLinksAction.
 *
 * @since 3.18.0
 */
interface SetInboundLinksAction {
	type: 'SET_INBOUND_LINKS';
	links: TrafficBoostLink[];
}

/**
 * Interface for the SetInboundLinksPageAction.
 *
 * @since 3.18.0
 */
interface SetInboundLinksPageAction {
	type: 'SET_INBOUND_LINKS_PAGE';
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
 * Interface for the SetInboundLinksItemsPerPageAction.
 *
 * @since 3.18.0
 */
interface SetInboundLinksItemsPerPageAction {
	type: 'SET_INBOUND_LINKS_ITEMS_PER_PAGE';
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
 * Interface for the SetPreviewLinkTypeAction.
 *
 * @since 3.18.0
 */
interface SetPreviewLinkTypeAction {
	type: 'SET_PREVIEW_LINK_TYPE';
	linkType: LinkType | null;
}

/**
 * Interface for the SetFrontendPreviewAction.
 *
 * @since 3.18.0
 */
interface SetFrontendPreviewAction {
	type: 'SET_FRONTEND_PREVIEW';
	enabled: boolean;
}

/**
 * Interface for the AddSuggestionAction.
 *
 * @since 3.18.0
 */
interface AddSuggestionAction {
	type: 'ADD_SUGGESTION';
	suggestion: TrafficBoostLink;
	select: boolean;
}

/**
 * Interface for the RemoveSuggestionAction.
 *
 * @since 3.18.0
 */
interface RemoveSuggestionAction {
	type: 'REMOVE_SUGGESTION';
	suggestion: TrafficBoostLink;
	updateSelectedLink: boolean;
}

/**
 * Interface for the AddInboundLinkAction.
 *
 * @since 3.18.0
 */
interface AddInboundLinkAction {
	type: 'ADD_INBOUND_LINK';
	link: TrafficBoostLink;
	select: boolean;
}

/**
 * Interface for the RemoveInboundLinkAction.
 *
 * @since 3.18.0
 */
interface RemoveInboundLinkAction {
	type: 'REMOVE_INBOUND_LINK';
	link: TrafficBoostLink;
	updateSelectedLink: boolean;
}

/**
 * Interface for the UpdateSuggestionAction.
 *
 * @since 3.18.0
 */
interface UpdateSuggestionAction {
	type: 'UPDATE_SUGGESTION';
	suggestion: TrafficBoostLink;
}

/**
 * Interface for the SetIsAcceptingAction.
 *
 * @since 3.18.0
 */
interface SetIsAcceptingAction {
	type: 'SET_IS_ACCEPTING';
	link: TrafficBoostLink;
	value: boolean;
}

/**
 * Interface for the SetIsRemovingAction.
 *
 * @since 3.18.0
 */
interface SetIsRemovingAction {
	type: 'SET_IS_REMOVING';
	link: TrafficBoostLink;
	value: boolean;
}

/**
 * Interface for the SetIsGeneratingSuggestionsAction.
 *
 * @since 3.18.0
 */
interface SetIsGeneratingSuggestionsAction {
	type: 'SET_IS_GENERATING_SUGGESTIONS';
	value: boolean;
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
	| SetInboundLinksAction
	| SetInboundLinksPageAction
	| SetSuggestionsItemsPerPageAction
	| SetInboundLinksItemsPerPageAction
	| SetSelectedLinkAction
	| SetPreviewLinkTypeAction
	| SetFrontendPreviewAction
	| AddSuggestionAction
	| RemoveSuggestionAction
	| AddInboundLinkAction
	| RemoveInboundLinkAction
	| UpdateSuggestionAction
	| SetIsAcceptingAction
	| SetIsRemovingAction
	| SetIsGeneratingSuggestionsAction;

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
	preview: {
		selectedLinkType: null,
		frontendPreview: false,
	},
	suggestionsTab: {
		suggestions: [],
		currentPage: 1,
		itemsPerPage: 0,
	},
	inboundLinksTab: {
		links: [],
		currentPage: 1,
		itemsPerPage: 0,
	},
	acceptingLinks: [],
	removingLinks: [],
	isGeneratingSuggestions: false,
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
			case 'SET_INBOUND_LINKS':
				return {
					...state,
					inboundLinksTab: {
						...state.inboundLinksTab,
						links: action.links,
					},
				};
			case 'SET_INBOUND_LINKS_PAGE':
				return {
					...state,
					inboundLinksTab: {
						...state.inboundLinksTab,
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
			case 'SET_INBOUND_LINKS_ITEMS_PER_PAGE':
				return {
					...state,
					inboundLinksTab: {
						...state.inboundLinksTab,
						itemsPerPage: action.itemsPerPage,
					},
				};
			case 'SET_SELECTED_LINK':
				return {
					...state,
					selectedLink: action.link,
				};
			case 'SET_PREVIEW_LINK_TYPE':
				return {
					...state,
					preview: {
						...state.preview,
						selectedLinkType: action.linkType,
					},
				};
			case 'SET_FRONTEND_PREVIEW':
				return {
					...state,
					preview: {
						...state.preview,
						frontendPreview: action.enabled,
					},
				};
			case 'ADD_SUGGESTION':
				return {
					...state,
					suggestionsTab: {
						...state.suggestionsTab,
						suggestions: [ action.suggestion, ...state.suggestionsTab.suggestions ],
					},
					selectedLink: action.select ? action.suggestion : state.selectedLink,
				};
			case 'REMOVE_SUGGESTION':
				const remainingSuggestions = state.suggestionsTab.suggestions.filter(
					( suggestion ) => suggestion.uid !== action.suggestion.uid
				);

				return {
					...state,
					suggestionsTab: {
						...state.suggestionsTab,
						suggestions: remainingSuggestions,
					},
					selectedLink: action.updateSelectedLink && state.selectedLink?.uid === action.suggestion.uid
						? remainingSuggestions[ 0 ] ?? null
						: state.selectedLink,
				};
			case 'ADD_INBOUND_LINK':
				return {
					...state,
					inboundLinksTab: {
						...state.inboundLinksTab,
						links: [ action.link, ...state.inboundLinksTab.links ],
					},
					selectedLink: action.select ? action.link : state.selectedLink,
				};
			case 'REMOVE_INBOUND_LINK':
				const remainingLinks = state.inboundLinksTab.links.filter(
					( link ) => link.uid !== action.link.uid
				);

				return {
					...state,
					inboundLinksTab: {
						...state.inboundLinksTab,
						links: remainingLinks,
					},
					selectedLink: action.updateSelectedLink && state.selectedLink?.uid === action.link.uid
						? remainingLinks[ 0 ] ?? null
						: state.selectedLink,
				};
			case 'UPDATE_SUGGESTION':
				const isMatchingSuggestion = ( suggestion: TrafficBoostLink ) =>
					suggestion.uid === action.suggestion.uid;

				const updatedSuggestions = state.suggestionsTab.suggestions.map( ( suggestion ) =>
					isMatchingSuggestion( suggestion ) ? action.suggestion : suggestion
				);

				return {
					...state,
					suggestionsTab: {
						...state.suggestionsTab,
						suggestions: updatedSuggestions,
					},
					selectedLink: state.selectedLink?.uid === action.suggestion.uid
						? action.suggestion
						: state.selectedLink,
				};
			case 'SET_IS_ACCEPTING':
				return {
					...state,
					acceptingLinks: action.value
						? [ ...state.acceptingLinks, action.link.uid ]
						: state.acceptingLinks.filter( ( uid ) => uid !== action.link.uid ),
				};
			case 'SET_IS_REMOVING':
				return {
					...state,
					removingLinks: action.value
						? [ ...state.removingLinks, action.link.uid ]
						: state.removingLinks.filter( ( uid ) => uid !== action.link.uid ),
				};
			case 'SET_IS_GENERATING_SUGGESTIONS':
				return {
					...state,
					isGeneratingSuggestions: action.value,
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
		setInboundLinks( links: TrafficBoostLink[] ): SetInboundLinksAction {
			return {
				type: 'SET_INBOUND_LINKS',
				links,
			};
		},
		setInboundLinksPage( page: number ): SetInboundLinksPageAction {
			return {
				type: 'SET_INBOUND_LINKS_PAGE',
				page,
			};
		},
		setSuggestionsItemsPerPage( itemsPerPage: number ): SetSuggestionsItemsPerPageAction {
			return {
				type: 'SET_SUGGESTIONS_ITEMS_PER_PAGE',
				itemsPerPage,
			};
		},
		setInboundLinksItemsPerPage( itemsPerPage: number ): SetInboundLinksItemsPerPageAction {
			return {
				type: 'SET_INBOUND_LINKS_ITEMS_PER_PAGE',
				itemsPerPage,
			};
		},
		setSelectedLink( link: TrafficBoostLink | null ): SetSelectedLinkAction {
			return {
				type: 'SET_SELECTED_LINK',
				link,
			};
		},
		setPreviewLinkType( linkType: LinkType | null ): SetPreviewLinkTypeAction {
			return {
				type: 'SET_PREVIEW_LINK_TYPE',
				linkType,
			};
		},
		setFrontendPreview( enabled: boolean ): SetFrontendPreviewAction {
			return {
				type: 'SET_FRONTEND_PREVIEW',
				enabled,
			};
		},
		addSuggestion( suggestion: TrafficBoostLink, select: boolean = true ): AddSuggestionAction {
			return {
				type: 'ADD_SUGGESTION',
				suggestion,
				select,
			};
		},
		removeSuggestion( suggestion: TrafficBoostLink, updateSelectedLink: boolean = true ): RemoveSuggestionAction {
			return {
				type: 'REMOVE_SUGGESTION',
				suggestion,
				updateSelectedLink,
			};
		},
		addInboundLink( link: TrafficBoostLink, select: boolean = true ): AddInboundLinkAction {
			return {
				type: 'ADD_INBOUND_LINK',
				link,
				select,
			};
		},
		removeInboundLink( link: TrafficBoostLink, updateSelectedLink: boolean = true ): RemoveInboundLinkAction {
			return {
				type: 'REMOVE_INBOUND_LINK',
				link,
				updateSelectedLink,
			};
		},
		updateSuggestion( suggestion: TrafficBoostLink ): UpdateSuggestionAction {
			return {
				type: 'UPDATE_SUGGESTION',
				suggestion,
			};
		},
		setIsAccepting( link: TrafficBoostLink, value: boolean ): SetIsAcceptingAction {
			return {
				type: 'SET_IS_ACCEPTING',
				link,
				value,
			};
		},
		setIsRemoving( link: TrafficBoostLink, value: boolean ): SetIsRemovingAction {
			return {
				type: 'SET_IS_REMOVING',
				link,
				value,
			};
		},
		setIsGeneratingSuggestions( value: boolean ): SetIsGeneratingSuggestionsAction {
			return {
				type: 'SET_IS_GENERATING_SUGGESTIONS',
				value,
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
		getInboundLinks( state: TrafficBoostState ): TrafficBoostLink[] {
			return state.inboundLinksTab.links;
		},
		getInboundLinksPage( state: TrafficBoostState ): number {
			return state.inboundLinksTab.currentPage;
		},
		getInboundLinksItemsPerPage( state: TrafficBoostState ): number {
			return state.inboundLinksTab.itemsPerPage;
		},
		isSuggestionsLoading( state: TrafficBoostState ): boolean {
			return state.loading.includes( 'suggestions' );
		},
		getSelectedLink( state: TrafficBoostState ): TrafficBoostLink | null {
			return state.selectedLink;
		},
		getPreviewLinkType( state: TrafficBoostState ): LinkType | null {
			return state.preview.selectedLinkType;
		},
		isFrontendPreview( state: TrafficBoostState ): boolean {
			return state.preview.frontendPreview;
		},
		isAccepting( state: TrafficBoostState, link: TrafficBoostLink ): boolean {
			return state.acceptingLinks.includes( link.uid );
		},
		isRemoving( state: TrafficBoostState, link: TrafficBoostLink ): boolean {
			return state.removingLinks.includes( link.uid );
		},
		isGeneratingSuggestions( state: TrafficBoostState ): boolean {
			return state.isGeneratingSuggestions;
		},
	},
} );

register( TrafficBoostStore );

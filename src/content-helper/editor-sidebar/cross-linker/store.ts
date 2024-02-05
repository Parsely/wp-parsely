/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';
import { ContentHelperError } from '../../common/content-helper-error';
import { SidebarSettings } from '../editor-sidebar';
import { DEFAULT_MAX_LINK_WORDS, DEFAULT_MAX_LINKS } from './cross-linker';

/**
 * Internal dependencies
 */
import { LinkSuggestion } from './provider';

/**
 * The shape of the CrossLinker store state.
 */
type CrossLinkerState = {
	isLoading: boolean;
	fullContent: boolean;
	error: ContentHelperError | null;
	sidebarSettings: SidebarSettings | null;
	crossLinkerSettings: {
		maxLinkWords?: number;
		maxLinksPerPost?: number;
		settingsOpen?: boolean;
	}
	suggestedLinks: LinkSuggestion[] | null;
	overlayBlocks: string[];
};

/** Actions */
interface SetLoadingAction {
	type: 'SET_LOADING';
	isLoading: boolean;
}

interface SetErrorAction {
	type: 'SET_ERROR';
	error: ContentHelperError | null;
}

interface SetOverlayBlocksAction {
	type: 'SET_OVERLAY_BLOCKS';
	overlayBlocks: string[];
}

interface AddOverlayBlockAction {
	type: 'ADD_OVERLAY_BLOCK';
	block: string;
}

interface RemoveOverlayBlockAction {
	type: 'REMOVE_OVERLAY_BLOCK';
	block: string;
}

interface SetFullContentAction {
	type: 'SET_FULL_CONTENT';
	fullContent: boolean;
}

interface SetSettingsAction {
	type: 'SET_SETTINGS';
	sidebarSettings: SidebarSettings;
}

interface SetCrossLinkerSettingsAction {
	type: 'SET_CROSSLINKER_SETTINGS';
	crossLinkerSettings: {
		settingsOpen?: boolean
		maxLinkWords?: number;
		maxLinksPerPost?: number;
	};
}

interface SetSuggestedLinksAction {
	type: 'SET_SUGGESTED_LINKS';
	suggestedLinks: LinkSuggestion[] | null;
}

type ActionTypes = SetLoadingAction | SetOverlayBlocksAction | SetCrossLinkerSettingsAction |
	AddOverlayBlockAction | RemoveOverlayBlockAction |SetFullContentAction |
	SetSettingsAction | SetSuggestedLinksAction | SetErrorAction;

const defaultState: CrossLinkerState = {
	isLoading: false,
	fullContent: false,
	suggestedLinks: null,
	error: null,
	sidebarSettings: null,
	crossLinkerSettings: { },
	overlayBlocks: [],
};

/**
 * The CrossLinker store.
 *
 * @since 3.14.0
 */
export const CrossLinkerStore = createReduxStore( 'wp-parsely/cross-linker', {
	initialState: defaultState,
	reducer( state: CrossLinkerState = defaultState, action: ActionTypes ): CrossLinkerState {
		switch ( action.type ) {
			case 'SET_LOADING':
				return {
					...state,
					isLoading: action.isLoading,
				};
			case 'SET_OVERLAY_BLOCKS':
				return {
					...state,
					overlayBlocks: action.overlayBlocks,
				};
			case 'SET_ERROR':
				return {
					...state,
					error: action.error,
				};
			case 'ADD_OVERLAY_BLOCK':
				return {
					...state,
					overlayBlocks: [ ...state.overlayBlocks, action.block ],
				};
			case 'REMOVE_OVERLAY_BLOCK':
				// If the action is 'all', remove all overlay blocks.
				if ( action.block === 'all' ) {
					return {
						...state,
						overlayBlocks: [],
					};
				}
				return {
					...state,
					overlayBlocks: state.overlayBlocks.filter( ( block ) => block !== action.block ),
				};
			case 'SET_FULL_CONTENT':
				return {
					...state,
					fullContent: action.fullContent,
				};
			case 'SET_SETTINGS':
				return {
					...state,
					sidebarSettings: action.sidebarSettings,
				};
			case 'SET_CROSSLINKER_SETTINGS':
				return {
					...state,
					crossLinkerSettings: {
						...state.crossLinkerSettings,
						...action.crossLinkerSettings,
					},
				};
			case 'SET_SUGGESTED_LINKS':
				return {
					...state,
					suggestedLinks: action.suggestedLinks,
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
		setOverlayBlocks( overlayBlocks: string[] ): SetOverlayBlocksAction {
			return {
				type: 'SET_OVERLAY_BLOCKS',
				overlayBlocks,
			};
		},
		setError( error: ContentHelperError | null ): SetErrorAction {
			return {
				type: 'SET_ERROR',
				error,
			};
		},
		addOverlayBlock( block: string ): AddOverlayBlockAction {
			return {
				type: 'ADD_OVERLAY_BLOCK',
				block,
			};
		},
		removeOverlayBlock( block: string ): RemoveOverlayBlockAction {
			return {
				type: 'REMOVE_OVERLAY_BLOCK',
				block,
			};
		},
		setFullContent( fullContent: boolean ): SetFullContentAction {
			return {
				type: 'SET_FULL_CONTENT',
				fullContent,
			};
		},
		setSettings( sidebarSettings: SidebarSettings ): SetSettingsAction {
			return {
				type: 'SET_SETTINGS',
				sidebarSettings,
			};
		},
		setMaxLinkWords( maxLinkWords: number ): SetCrossLinkerSettingsAction {
			return {
				type: 'SET_CROSSLINKER_SETTINGS',
				crossLinkerSettings: {
					maxLinkWords,
				},
			};
		},
		setMaxLinks( maxLinksPerPost: number ): SetCrossLinkerSettingsAction {
			return {
				type: 'SET_CROSSLINKER_SETTINGS',
				crossLinkerSettings: {
					maxLinksPerPost,
				},
			};
		},
		setSettingsOpen( settingsOpen: boolean ): SetCrossLinkerSettingsAction {
			return {
				type: 'SET_CROSSLINKER_SETTINGS',
				crossLinkerSettings: {
					settingsOpen,
				},
			};
		},
		setSuggestedLinks( suggestedLinks: LinkSuggestion[] | null ): SetSuggestedLinksAction {
			return {
				type: 'SET_SUGGESTED_LINKS',
				suggestedLinks,
			};
		},
	},
	selectors: {
		isLoading( state: CrossLinkerState ): boolean {
			return state.isLoading;
		},
		isFullContent( state: CrossLinkerState ): boolean {
			return state.fullContent;
		},
		getError( state: CrossLinkerState ): ContentHelperError | null {
			return state.error;
		},
		getOverlayBlocks( state: CrossLinkerState ): string[] {
			return state.overlayBlocks;
		},
		getSettings( state: CrossLinkerState ): SidebarSettings | null {
			return state.sidebarSettings;
		},
		areSettingsOpen( state: CrossLinkerState ): boolean {
			return state.crossLinkerSettings.settingsOpen ?? state.sidebarSettings?.CrossLinksSettingsOpen ?? false;
		},
		getMaxLinkWords( state: CrossLinkerState ): number {
			return state.crossLinkerSettings.maxLinkWords ?? state.sidebarSettings?.CrossLinksMaxLinkWords ?? DEFAULT_MAX_LINK_WORDS;
		},
		getMaxLinks( state: CrossLinkerState ): number {
			return state.crossLinkerSettings.maxLinksPerPost ?? state.sidebarSettings?.CrossLinksMaxLinks ?? DEFAULT_MAX_LINKS;
		},
		getSuggestedLinks( state: CrossLinkerState ): LinkSuggestion[] | null {
			return state.suggestedLinks;
		},
	},
} );

register( CrossLinkerStore );

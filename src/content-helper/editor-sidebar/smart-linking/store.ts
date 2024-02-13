/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';
import { ContentHelperError } from '../../common/content-helper-error';
import { DEFAULT_MAX_LINK_WORDS, DEFAULT_MAX_LINKS } from './smart-linking';

/**
 * Internal dependencies
 */
import { LinkSuggestion } from './provider';

export type SmartLinkingSettingsProps = {
	settingsOpen?: boolean;
	maxLinkWords?: number;
	maxLinksPerPost?: number;
};

/**
 * The shape of the SmartLinking store state.
 */
type SmartLinkingState = {
	isLoading: boolean;
	fullContent: boolean;
	error: ContentHelperError | null;
	settings: SmartLinkingSettingsProps;
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
	settings: SmartLinkingSettingsProps;
}

interface SetSuggestedLinksAction {
	type: 'SET_SUGGESTED_LINKS';
	suggestedLinks: LinkSuggestion[] | null;
}

type ActionTypes = SetLoadingAction | SetOverlayBlocksAction | SetSettingsAction |
	AddOverlayBlockAction | RemoveOverlayBlockAction |SetFullContentAction |
	SetSuggestedLinksAction | SetErrorAction;

const defaultState: SmartLinkingState = {
	isLoading: false,
	fullContent: false,
	suggestedLinks: null,
	error: null,
	settings: { },
	overlayBlocks: [],
};

/**
 * The SmartLinking store.
 *
 * @since 3.14.0
 */
export const SmartLinkingStore = createReduxStore( 'wp-parsely/smart-linking', {
	initialState: defaultState,
	reducer( state: SmartLinkingState = defaultState, action: ActionTypes ): SmartLinkingState {
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
					settings: {
						...state.settings,
						...action.settings,
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
		setSmartLinkingSettings( settings: SmartLinkingSettingsProps ): SetSettingsAction {
			return {
				type: 'SET_SETTINGS',
				settings,
			};
		},
		setMaxLinkWords( maxLinkWords: number ): SetSettingsAction {
			return {
				type: 'SET_SETTINGS',
				settings: {
					maxLinkWords,
				},
			};
		},
		setMaxLinks( maxLinksPerPost: number ): SetSettingsAction {
			return {
				type: 'SET_SETTINGS',
				settings: {
					maxLinksPerPost,
				},
			};
		},
		setSettingsOpen( settingsOpen: boolean ): SetSettingsAction {
			return {
				type: 'SET_SETTINGS',
				settings: {
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
		isLoading( state: SmartLinkingState ): boolean {
			return state.isLoading;
		},
		isFullContent( state: SmartLinkingState ): boolean {
			return state.fullContent;
		},
		getError( state: SmartLinkingState ): ContentHelperError | null {
			return state.error;
		},
		getSmartLinkingSettings( state: SmartLinkingState ): SmartLinkingSettingsProps {
			return state.settings;
		},
		getOverlayBlocks( state: SmartLinkingState ): string[] {
			return state.overlayBlocks;
		},
		areSettingsOpen( state: SmartLinkingState ): boolean {
			return state.settings.settingsOpen ?? false;
		},
		getMaxLinkWords( state: SmartLinkingState ): number {
			return state.settings.maxLinkWords ?? DEFAULT_MAX_LINK_WORDS;
		},
		getMaxLinks( state: SmartLinkingState ): number {
			return state.settings.maxLinksPerPost ?? DEFAULT_MAX_LINKS;
		},
		getSuggestedLinks( state: SmartLinkingState ): LinkSuggestion[] | null {
			return state.suggestedLinks;
		},
	},
} );

register( SmartLinkingStore );

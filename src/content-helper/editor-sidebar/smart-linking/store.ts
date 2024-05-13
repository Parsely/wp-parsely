/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';
import { ContentHelperError } from '../../common/content-helper-error';
import { DEFAULT_MAX_LINKS, DEFAULT_MAX_LINK_WORDS } from './smart-linking';

/**
 * Internal dependencies
 */
import { SmartLink } from './provider';
import { sortSmartLinks } from './utils';

/**
 * Defines the props structure for SmartLinkingSettings.
 *
 * @since 3.14.0
 */
export type SmartLinkingSettingsProps = {
	maxLinkWords?: number;
	maxLinksPerPost?: number;
};

/**
 * Enum for the applyTo setting.
 *
 * @since 3.14.3
 */
export enum ApplyToOptions {
	All = 'all',
	Selected = 'selected',
}

/**
 * The shape of the SmartLinking store state.
 *
 * @since 3.14.0
 */
type SmartLinkingState = {
	isReady: boolean;
	isLoading: boolean;
	applyTo: ApplyToOptions|null;
	fullContent: boolean;
	error: ContentHelperError | null;
	settings: SmartLinkingSettingsProps;
	smartLinks: SmartLink[];
	overlayBlocks: string[];
	wasAlreadyClicked: boolean;
	isRetrying: boolean;
	retryAttempt: number;
};

/********** Actions **********/

/**
 * Interface for the SetIsReadyAction.
 *
 * @since 3.15.0
 */
interface SetIsReadyAction {
	type: 'SET_IS_READY';
	isReady: boolean;
}
/**
 * Interface for the SetLoadingAction.
 *
 * @since 3.14.0
 */
interface SetLoadingAction {
	type: 'SET_LOADING';
	isLoading: boolean;
}

/**
 * Interface for the SetErrorAction.
 *
 * @since 3.14.0
 */
interface SetErrorAction {
	type: 'SET_ERROR';
	error: ContentHelperError | null;
}

/**
 * Interface for the SetOverlayBlocksAction.
 *
 * @since 3.14.0
 */
interface SetOverlayBlocksAction {
	type: 'SET_OVERLAY_BLOCKS';
	overlayBlocks: string[];
}

/**
 * Interface for the AddOverlayBlockAction.
 *
 * @since 3.14.0
 */
interface AddOverlayBlockAction {
	type: 'ADD_OVERLAY_BLOCK';
	block: string;
}

/**
 * Interface for the RemoveOverlayBlockAction.
 *
 * @since 3.14.0
 */
interface RemoveOverlayBlockAction {
	type: 'REMOVE_OVERLAY_BLOCK';
	block: string;
}

/**
 * Interface for the SetFullContentAction.
 *
 * @since 3.14.0
 */
interface SetFullContentAction {
	type: 'SET_FULL_CONTENT';
	fullContent: boolean;
}

/**
 * Interface for the SetSettingsAction.
 *
 * @since 3.14.0
 */
interface SetSettingsAction {
	type: 'SET_SETTINGS';
	settings: SmartLinkingSettingsProps;
}

/**
 * Interface for the SetWasAlreadyClickedAction.
 *
 * @since 3.14.0
 */
interface SetWasAlreadyClickedAction {
	type: 'SET_WAS_ALREADY_CLICKED';
	wasAlreadyClicked: boolean;
}

/**
 * Interface for the SetApplyToAction.
 *
 * @since 3.14.3
 */
interface SetApplyToAction {
	type: 'SET_APPLY_TO';
	applyTo: ApplyToOptions|null;
}

/**
 * Interface for the SetIsRetryingAction.
 *
 * @since 3.15.0
 */
interface SetIsRetryingAction {
	type: 'SET_IS_RETRYING';
	isRetrying: boolean;
}

interface SetSmartLinksAction {
	type: 'SET_SMART_LINKS';
	smartLinks: SmartLink[];
}

interface AddSmartLinkAction {
	type: 'ADD_SMART_LINK';
	smartLink: SmartLink;
}

interface AddSmartLinksAction {
	type: 'ADD_SMART_LINKS';
	smartLinks: SmartLink[];
}

interface RemoveSmartLinkAction {
	type: 'REMOVE_SMART_LINK';
	uid: string;
}

interface PurgeSmartLinksSuggestionsAction {
	type: 'PURGE_SMART_LINKS_SUGGESTIONS';
}

/**
 * Interface for the IncrementRetryAttemptAction.
 *
 * @since 3.15.0
 */
interface IncrementRetryAttemptAction {
	type: 'INCREMENT_RETRY_ATTEMPT';
}

type ActionTypes = SetIsReadyAction | SetLoadingAction | SetOverlayBlocksAction | SetSettingsAction |
	AddOverlayBlockAction | RemoveOverlayBlockAction |SetFullContentAction |
	SetErrorAction| SetWasAlreadyClickedAction | SetApplyToAction | IncrementRetryAttemptAction |
	SetIsRetryingAction | SetSmartLinksAction | AddSmartLinkAction | AddSmartLinksAction | RemoveSmartLinkAction |
	PurgeSmartLinksSuggestionsAction;

const defaultState: SmartLinkingState = {
	isReady: false,
	isLoading: false,
	applyTo: null,
	fullContent: false,
	smartLinks: [],
	error: null,
	settings: { },
	overlayBlocks: [],
	wasAlreadyClicked: false,
	isRetrying: false,
	retryAttempt: 0,
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
			case 'SET_IS_READY':
				return {
					...state,
					isReady: action.isReady,
				};
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
			case 'SET_WAS_ALREADY_CLICKED':
				return {
					...state,
					wasAlreadyClicked: action.wasAlreadyClicked,
				};
			case 'SET_APPLY_TO':
				return {
					...state,
					applyTo: action.applyTo,
				};
			case 'SET_IS_RETRYING':
				return {
					...state,
					isRetrying: action.isRetrying,
					retryAttempt: action.isRetrying === state.isRetrying ? state.retryAttempt : 0,
				};
			case 'INCREMENT_RETRY_ATTEMPT':
				return {
					...state,
					retryAttempt: state.retryAttempt + 1,
				};
			case 'SET_SMART_LINKS':
				return {
					...state,
					smartLinks: sortSmartLinks( action.smartLinks ),
				};
			case 'ADD_SMART_LINK':
				// If the UID is already there, just update it, otherwise add it.
				const existingIndex = state.smartLinks.findIndex( ( link ) => link.uid === action.smartLink.uid );
				if ( existingIndex !== -1 ) {
					const newSmartLinks = [ ...state.smartLinks ];
					newSmartLinks[ existingIndex ] = action.smartLink;
					return {
						...state,
						smartLinks: sortSmartLinks( newSmartLinks ),
					};
				}
				return {
					...state,
					smartLinks: sortSmartLinks( [ ...state.smartLinks, action.smartLink ] ),
				};
			case 'ADD_SMART_LINKS':
				// If the UID is already there, just update it, otherwise add it.
				const newSmartLinks = [ ...state.smartLinks ];
				action.smartLinks.forEach( ( link ) => {
					// eslint-disable-next-line @typescript-eslint/no-shadow
					const existingIndex = state.smartLinks.findIndex( ( l ) => l.uid === link.uid );
					if ( existingIndex !== -1 ) {
						newSmartLinks[ existingIndex ] = link;
					} else {
						newSmartLinks.push( link );
					}
				} );
				return {
					...state,
					smartLinks: sortSmartLinks( newSmartLinks ),
				};
			case 'REMOVE_SMART_LINK':
				return {
					...state,
					smartLinks:
						sortSmartLinks( state.smartLinks.filter( ( link ) => link.uid !== action.uid ) ),
				};
			case 'PURGE_SMART_LINKS_SUGGESTIONS':
				return {
					...state,
					smartLinks:
						sortSmartLinks( state.smartLinks.filter( ( link ) => link.applied ) ),
				};
			default:
				return state;
		}
	},
	actions: {
		setIsReady( isReady: boolean ): SetIsReadyAction {
			return {
				type: 'SET_IS_READY',
				isReady,
			};
		},
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
		setAlreadyClicked( wasAlreadyClicked: boolean ): SetWasAlreadyClickedAction {
			return {
				type: 'SET_WAS_ALREADY_CLICKED',
				wasAlreadyClicked,
			};
		},
		setApplyTo( applyTo: ApplyToOptions|null ): SetApplyToAction {
			return {
				type: 'SET_APPLY_TO',
				applyTo,
			};
		},
		setIsRetrying( isRetrying: boolean ): SetIsRetryingAction {
			return {
				type: 'SET_IS_RETRYING',
				isRetrying,
			};
		},
		incrementRetryAttempt(): IncrementRetryAttemptAction {
			return {
				type: 'INCREMENT_RETRY_ATTEMPT',
			};
		},
		setSmartLinks( smartLinks: SmartLink[] ): SetSmartLinksAction {
			return {
				type: 'SET_SMART_LINKS',
				smartLinks,
			};
		},
		addSmartLink( smartLink: SmartLink ): AddSmartLinkAction {
			return {
				type: 'ADD_SMART_LINK',
				smartLink,
			};
		},
		updateSmartLink( smartLink: SmartLink ): AddSmartLinkAction {
			// Alias of addSmartLink
			return {
				type: 'ADD_SMART_LINK',
				smartLink,
			};
		},
		addSmartLinks( smartLinks: SmartLink[] ): AddSmartLinksAction {
			return {
				type: 'ADD_SMART_LINKS',
				smartLinks,
			};
		},
		removeSmartLink( uid: string ): RemoveSmartLinkAction {
			return {
				type: 'REMOVE_SMART_LINK',
				uid,
			};
		},
		purgeSmartLinksSuggestions(): PurgeSmartLinksSuggestionsAction {
			return {
				type: 'PURGE_SMART_LINKS_SUGGESTIONS',
			};
		},
	},
	selectors: {
		isReady( state: SmartLinkingState ): boolean {
			return state.isReady;
		},
		isLoading( state: SmartLinkingState ): boolean {
			return state.isLoading;
		},
		isFullContent( state: SmartLinkingState ): boolean {
			return state.fullContent;
		},
		getApplyTo( state: SmartLinkingState ): ApplyToOptions|null {
			return state.applyTo;
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
		getMaxLinkWords( state: SmartLinkingState ): number {
			return state.settings.maxLinkWords ?? DEFAULT_MAX_LINK_WORDS;
		},
		getMaxLinks( state: SmartLinkingState ): number {
			return state.settings.maxLinksPerPost ?? DEFAULT_MAX_LINKS;
		},
		getSuggestedLinks( state: SmartLinkingState ): SmartLink[] {
			return state.smartLinks.filter( ( link ) => ! link.applied );
		},
		wasAlreadyClicked( state: SmartLinkingState ): boolean {
			return state.wasAlreadyClicked;
		},
		isRetrying( state: SmartLinkingState ): boolean {
			return state.isRetrying;
		},
		getRetryAttempt( state: SmartLinkingState ): number {
			return state.retryAttempt;
		},
		hasUnappliedLinks( state: SmartLinkingState ): boolean {
			return state.smartLinks.some( ( link ) => ! link.applied );
		},
		getSmartLinks( state: SmartLinkingState ): SmartLink[] {
			return state.smartLinks;
		},
	},
} );

register( SmartLinkingStore );

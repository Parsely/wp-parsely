import { createReduxStore, register,  } from '@wordpress/data';

type CrossLinkerState = {
	isLoading: boolean;
	settingsOpen: boolean;
	fullContent: boolean;
	settings: {
		maxLinkLength: number;
		maxLinksPerPost: number;
	}
	overlayBlocks: string[];
	generatingBlock: string;
};

interface SetLoadingAction {
	type: 'SET_LOADING';
	isLoading: boolean;
}

interface SetSettingsOpenAction {
	type: 'SET_SETTINGS_OPEN';
	settingsOpen: boolean;
}

interface SetOverlayBlocksAction {
	type: 'SET_OVERLAY_BLOCKS';
	overlayBlocks: string[];
}

interface SetGeneratingBlockAction {
	type: 'SET_GENERATING_BLOCK';
	generatingBlock: string;
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
	settings: {
		maxLinkLength?: number;
		maxLinksPerPost?: number;
	};
}

type ActionTypes = SetLoadingAction | SetSettingsOpenAction | SetOverlayBlocksAction |
	SetGeneratingBlockAction | 	AddOverlayBlockAction | RemoveOverlayBlockAction |
	SetFullContentAction | SetSettingsAction;

const defaultState: CrossLinkerState = {
	isLoading: false,
	fullContent: false,
	settingsOpen: false,
	settings: {
		maxLinkLength: 4,
		maxLinksPerPost: 10,
	},
	overlayBlocks: [],
	generatingBlock: '',
};

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
			case 'SET_SETTINGS_OPEN':
				return {
					...state,
					settingsOpen: action.settingsOpen,
				};
			case 'SET_GENERATING_BLOCK':
				return {
					...state,
					generatingBlock: action.generatingBlock,
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
		setGeneratingBlock( generatingBlock: string ): SetGeneratingBlockAction {
			return {
				type: 'SET_GENERATING_BLOCK',
				generatingBlock,
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
		setMaxLinkLength( maxLinkLength: number ): SetSettingsAction {
			return {
				type: 'SET_SETTINGS',
				settings: {
					maxLinkLength,
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
		setSettingsOpen( settingsOpen: boolean ): SetSettingsOpenAction {
			return {
				type: 'SET_SETTINGS_OPEN',
				settingsOpen,
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
		areSettingsOpen( state: CrossLinkerState ): boolean {
			return state.settingsOpen;
		},
		getOverlayBlocks( state: CrossLinkerState ): string[] {
			return state.overlayBlocks;
		},
		getGeneratingBlock( state: CrossLinkerState ): string {
			return state.generatingBlock;
		},
		getMaxLinkLength( state: CrossLinkerState ): number {
			return state.settings.maxLinkLength;
		},
		getMaxLinks( state: CrossLinkerState ): number {
			return state.settings.maxLinksPerPost;
		},
	},
} );

register( CrossLinkerStore );

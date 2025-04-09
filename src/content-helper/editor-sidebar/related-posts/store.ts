/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';
import { PostData } from '../../common/utils/post';
import { PostFilters } from '../../common/utils/constants';

interface PostsState {
	isFirstRun: boolean;
	isLoading: boolean;
	filters: PostFilters;
	posts: PostData[];
}

interface SetFirstRunAction {
	type: 'SET_FIRST_RUN';
	isFirstRun: boolean;
}

interface SetLoadingAction {
	type: 'SET_LOADING';
	isLoading: boolean;
}

interface SetPostsAction {
	type: 'SET_POSTS';
	posts: PostData[];
}

interface SetFilterParamsAction {
	type: 'SET_FILTERS';
	filters: PostFilters;
}

type ActionTypes = SetFirstRunAction | SetLoadingAction | SetPostsAction | SetFilterParamsAction;

const defaultState: PostsState = {
	isFirstRun: true,
	isLoading: false,
	filters: {
		author: '',
		section: '',
		tags: [],
	},
	posts: [],
};

export const RelatedPostsStore = createReduxStore( 'wp-parsely/related-posts', {
	initialState: defaultState,
	reducer( state: PostsState = defaultState, action: ActionTypes ): PostsState {
		switch ( action.type ) {
			case 'SET_FIRST_RUN':
				return {
					...state,
					isFirstRun: action.isFirstRun,
				};
			case 'SET_LOADING':
				return {
					...state,
					isLoading: action.isLoading,
				};
			case 'SET_POSTS':
				return {
					...state,
					posts: action.posts,
				};
			case 'SET_FILTERS':
				return {
					...state,
					filters: action.filters,
				};
			default:
				return state;
		}
	},
	actions: {
		setFirstRun( isFirstRun: boolean ): SetFirstRunAction {
			return {
				type: 'SET_FIRST_RUN',
				isFirstRun,
			};
		},
		setLoading( isLoading: boolean ): SetLoadingAction {
			return {
				type: 'SET_LOADING',
				isLoading,
			};
		},
		setPosts( posts: PostData[] ): SetPostsAction {
			return {
				type: 'SET_POSTS',
				posts,
			};
		},
		setFilters( filters: PostFilters ): SetFilterParamsAction {
			return {
				type: 'SET_FILTERS',
				filters,
			};
		},
	},
	selectors: {
		getState( state: PostsState ): PostsState {
			return state;
		},
		isFirstRun( state: PostsState ): boolean {
			return state.isFirstRun;
		},
		isLoading( state: PostsState ): boolean {
			return state.isLoading;
		},
		getPosts( state: PostsState ): PostData[] {
			return state.posts;
		},
		getFilters( state: PostsState ) {
			return state.filters;
		},
	},
} );

register( RelatedPostsStore );

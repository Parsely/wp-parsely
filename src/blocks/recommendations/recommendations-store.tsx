/**
 * External dependencies
 */
import { createContext, useContext, useReducer } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { RecommendationsAction } from './constants';
import { Recommendation } from './models/Recommendation';

interface RecommendationState {
	isLoaded: boolean;
	recommendations: Recommendation[] | undefined;
	uuid: string | null;
	clientId: string | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RecommendationsContext = createContext( {} as any );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = ( state: RecommendationState, action: any ): RecommendationState => {
	switch ( action.type ) {
		case RecommendationsAction.Error:
			return { ...state, isLoaded: true, error: action.error, recommendations: undefined };
		case RecommendationsAction.Loaded:
			return { ...state, isLoaded: true };
		case RecommendationsAction.Recommendations: {
			const { recommendations } = action;
			if ( ! Array.isArray( recommendations ) ) {
				return { ...state, recommendations: undefined };
			}
			const validRecommendations = recommendations.map(
				// eslint-disable-next-line camelcase
				( { title, url, image_url, thumb_url_medium } ) => ( {
					title,
					url,
					image_url, // eslint-disable-line camelcase
					thumb_url_medium, // eslint-disable-line camelcase
				} )
			);
			return { ...state, isLoaded: true, error: undefined, recommendations: validRecommendations };
		}
		default:
			return { ...state };
	}
};

interface RecommendationStore {
	clientId?: string;
	children: JSX.Element | JSX.Element[];
}

const RecommendationsStore = ( props: RecommendationStore ) => {
	const defaultState: RecommendationState = {
		isLoaded: false,
		recommendations: undefined,
		uuid: window.PARSELY?.config?.uuid || null,
		clientId: props?.clientId || null,
		error: null,
	};

	const [ state, dispatch ] = useReducer( reducer, defaultState );
	return <RecommendationsContext.Provider value={ { state, dispatch } } { ...props } />;
};

export const useRecommendationsStore = () => useContext( RecommendationsContext );

export default RecommendationsStore;

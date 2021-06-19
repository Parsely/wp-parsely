/**
 * External dependencies
 */
import { createContext, useContext, useReducer } from '@wordpress/element';

// TODO: consider using createReduxStore https://github.com/WordPress/gutenberg/tree/a7e2895829c16ecd77a5ba22d84f1dee1cfb0977/packages/data#registering-a-store

const RecommendationsContext = createContext();

const reducer = ( state, action ) => {
	switch ( action.type ) {
		case 'ERROR':
			return { ...state, error: action.error };
		case 'RECOMMENDATIONS': {
			const { recommendations = [] } = action;
			const validRecommendations = recommendations.map(
				// eslint-disable-next-line camelcase
				( { title, url, image_url, thumb_url_medium } ) => ( {
					title,
					url,
					image_url,
					thumb_url_medium,
				} )
			);
			return { ...state, isLoaded: true, recommendations: validRecommendations };
		}
		default:
			return { ...state };
	}
};

const RecommendationsStore = ( props ) => {
	const defaultState = {
		isLoaded: false,
		recommendations: [],
		uuid: window.PARSELY?.config?.uuid,
		clientId: props.clientId,
	};

	const [ state, dispatch ] = useReducer( reducer, defaultState );
	return <RecommendationsContext.Provider value={ { state, dispatch } } { ...props } />;
};

export const useRecommendationsStore = () => useContext( RecommendationsContext );

export default RecommendationsStore;

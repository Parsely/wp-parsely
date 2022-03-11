import { RECOMMENDED_BLOCK_ERROR, RECOMMENDED_BLOCK_LOADED, RECOMMENDED_BLOCK_RECOMMENDATIONS } from './constants';

export const setError = ( { error } ) => ( {
	type: RECOMMENDED_BLOCK_ERROR,
	error,
} );

export const setRecommendations = ( { recommendations } ) => ( {
	type: RECOMMENDED_BLOCK_RECOMMENDATIONS,
	recommendations,
} );

export const setLoaded = () => ( {
	type: RECOMMENDED_BLOCK_LOADED,
} );

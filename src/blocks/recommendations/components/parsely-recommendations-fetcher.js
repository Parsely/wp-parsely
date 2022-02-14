/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useDebounce } from '@wordpress/compose';
import { useCallback, useEffect } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { setError, setRecommendations } from '../actions';
import { useRecommendationsStore } from '../recommendations-store';

const ParselyRecommendationsFetcher = ( { boost, limit, sort } ) => {
	const {
		state: { error },
		dispatch,
	} = useRecommendationsStore();

	const query = {
		boost,
		limit,
		sort,
		url: window.location.href,
	};

	async function fetchRecosFromWpApi() {
		return apiFetch( {
			path: addQueryArgs( '/wp-parsely/v1/related', { query } ),
		} );
	}

	async function fetchRecos() {
		let response;
		try {
			response = await fetchRecosFromWpApi();
		} catch ( wpError ) {
			dispatch( setError( { error: wpError } ) );
			return;
		}

		const data = response?.data || [];
		dispatch( setRecommendations( { recommendations: data } ) );
	}

	const apiMemoProps = [ ...Object.values( query ), error ];

	const updateRecosWhenPropsChange = useCallback( fetchRecos, apiMemoProps );

	const debouncedUpdate = useDebounce( updateRecosWhenPropsChange, 300 );

	/**
	 * Fetch recommendations:
	 * - On component mount
	 * - When an attribute changes that affects the API call.
	 *   (This happens in the Editor context when someone changes a setting.)
	 */
	useEffect( debouncedUpdate, apiMemoProps );

	// This is a data-only component and does not render
	return null;
};

export default ParselyRecommendationsFetcher;

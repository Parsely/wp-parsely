/**
 * External dependencies
 */
import classNames from 'classnames';
import apiFetch from '@wordpress/api-fetch';
import { useDebounce } from '@wordpress/compose';
import { useCallback, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { fetchRelated } from '../../../js/lib/parsely-api';
import ParselyRecommendationsListItem from './parsely-recommendations-list-item';
import { useRecommendationsStore } from '../recommendations-store';

export default function ParselyRecommendations( {
	boost,
	layoutstyle,
	limit,
	imagestyle,
	personalized,
	savedresults,
	showimages,
	sort,
	title,
} ) {
	const {
		state: { error, isLoaded, recommendations, uuid },
		dispatch,
	} = useRecommendationsStore();

	let decodedSavedResults = [];
	if ( 'string' === typeof savedresults ) {
		try {
			if ( savedresults?.length ) {
				decodedSavedResults = JSON.parse( savedresults );
			}
		} catch ( e ) {}
	} else {
		decodedSavedResults = savedresults;
	}

	// TODO: if decodedSavedResults?.length, render those instead of fetching etc.
	console.log( { decodedSavedResults } );

	const apiQueryArgs = {
		boost,
		limit,
		sort,
	};

	if ( personalized && uuid ) {
		apiQueryArgs.uuid = uuid;
	} else {
		apiQueryArgs.url = window.location.href;
	}

	const apiMemoProps = [ ...Object.values( apiQueryArgs ), error ];

	async function fetchRecosFromWpApi() {
		return apiFetch( {
			path: addQueryArgs( '/wp-parsely/v1/recommendations', apiQueryArgs ),
		} );
	}

	async function fetchRecos() {
		// TODO before landing: Attempt to cache in localStorage keyed on attributes
		let response;
		try {
			response = await fetchRelated( apiQueryArgs );
		} catch ( parselyError ) {
			try {
				response = await fetchRecosFromWpApi();
			} catch ( wpError ) {
				dispatch( 'ERROR', { error: wpError } );
			}
		}

		const data = response?.data || [];
		dispatch( { type: 'RECOMMENDATIONS', recommendations: data } );
	}

	// Fetch recommendations on mount (useEffect w/ an empty dependency array ~ `componentDidMount`).
	useEffect( () => {
		fetchRecos();
	}, [] );

	const updateRecosWhenPropsChange = useCallback( fetchRecos, apiMemoProps );

	const debouncedUpdate = useDebounce( updateRecosWhenPropsChange, 300 );

	/**
	 * Fetch recommendations when an attribute changes that affects the API call.
	 * This happens in the Editor context when someone changes a setting.
	 */
	useEffect( () => {
		if ( ! isLoaded ) {
			return;
		}
		debouncedUpdate();
	}, apiMemoProps );

	if ( ! isLoaded ) {
		// TODO improve
		return <span className="parsely-recommendations__loading">{ __( 'Loading…', 'wp-parsely' ) }</span>;
	}

	if ( error ) {
		return false;
	}

	if ( ! recommendations.length ) {
		return false;
	}

	return (
		<>
			{ title && <p className="parsely-recommendations__list-title">{ title }</p> }
			<ul
				className={ classNames(
					'parsely-recommendations__ul',
					layoutstyle && `parsely-recommendations__ul-${ layoutstyle }`
				) }
			>
				{ recommendations.map( ( recommendation, index ) => (
					<ParselyRecommendationsListItem
						imagestyle={ imagestyle }
						imageAlt={ __( 'Image for link', 'wp-parsely' ) }
						key={ index }
						recommendation={ recommendation }
						showimages={ showimages }
					/>
				) ) }
			</ul>
		</>
	);
}

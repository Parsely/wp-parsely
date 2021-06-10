/**
 * External dependencies
 */
import { useDebounce } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { fetchRelated } from '../../../js/lib/parsely-api';

export default function ParselyRecommendations( {
	boost,
	displaydirection,
	limit,
	personalized,
	pubstart,
	sortrecs,
	title,
} ) {
	const [ error, setError ] = useState( null );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ recommendations, setRecommendations ] = useState( [] );

	const url = window.location.href;
	const apiQueryArgs = {
		boost,
		limit,
		sort: sortrecs,
		url,
	};

	// TODO: when personalized is true -- include uuid

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
				setError( wpError );
			}
		}

		const data = response?.data || [];
		setIsLoaded( true );
		setRecommendations( data );
	}

	// Fetch recommendations on mount (useEffect w/ an empty dependency array ~ `componentDidMount`).
	useEffect( fetchRecos, [] );

	const debouncedUpdate = useDebounce( async () => {
		await setIsLoaded( false );
		await fetchRecos();
	}, 250 );

	/**
	 * Fetch recommendations when an attribute changes that affects the API call.
	 * This happens in the Editor context when someone changes a setting.
	 */
	useEffect( () => {
		if ( ! isLoaded ) {
			return;
		}
		debouncedUpdate();
	}, [ boost, limit, personalized, pubstart, sortrecs, url ] );

	if ( ! isLoaded ) {
		return <>Loading...</>; // TODO improve
	}

	if ( error ) {
		return <>{ error }</>; // TODO improve
	}

	if ( ! recommendations.length ) {
		return <>No recommendations :(</>; // TODO improve
	}

	const classNames = `parsely-recommendations__linklist ${
		displaydirection === 'horizontal' ? 'horizontal' : 'vertical'
	}`;

	return (
		<>
			{ title && <p className="parsely-recommendations__list-title">{ title }</p> }
			<ul className={ classNames }>
				{ recommendations.map( ( { title: linkTitle, url: linkUrl }, index ) => (
					<li key={ index }>
						<a href={ linkUrl }>{ linkTitle }</a>
					</li>
				) ) }
			</ul>
		</>
	);
}

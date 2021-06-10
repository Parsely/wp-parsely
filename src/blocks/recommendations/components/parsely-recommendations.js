/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { fetchRelated } from '../../../js/lib/parsely-api';

export default function ParselyRecommendations( props ) {
	const [ error, setError ] = useState( null );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ recommendations, setRecommendations ] = useState( [] );

	// TODO: use props to adjust API calls
	// TODO: use props to adjust class names

	async function fetchRecosFromWpApi() {
		return apiFetch( {
			path: addQueryArgs( '/wp-parsely/v1/recommendations', { url: window.location.href } ),
		} );
	}

	async function fetchRecos() {
		let response;
		try {
			//throw 'skip';
			response = await fetchRelated();
		} catch ( parselyError ) {
			try {
				response = await fetchRecosFromWpApi();
			} catch ( wpError ) {
				setError( [ parselyError, wpError ] );
			}
		}

		const data = response?.data || [];
		setIsLoaded( true );
		setRecommendations( data );
	}

	useEffect( fetchRecos, [] );

	if ( ! isLoaded ) {
		return <>Loading...</>; // TODO improve
	}

	if ( error ) {
		return <>{ error }</>; // TODO improve
	}

	if ( ! recommendations.length ) {
		return <>No recommendations :(</>; // TODO improve
	}

	return (
		<>
			{ title && <p className="parsely-recommendations__list-title">{ title }</p> }
			<ul className="parsely-recommendations__linklist">
				{ recommendations.map( ( { title: linkTitle, url: linkUrl }, index ) => (
					<li key={ index }>
						<a href={ linkUrl }>{ linkTitle }</a>
					</li>
				) ) }
			</ul>
		</>
	);
}

/**
 * External dependencies
 */
import { render, useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { fetchRelated } from '../../js/lib/parsely-api';

function ParselyRecommendations() {
	const [ error, setError ] = useState( null );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ recommendations, setRecommendations ] = useState( [] );

	async function fetchRecos() {
		let data = [];
		try {
			const response = await fetchRelated();
			data = response?.data;
		} catch ( e ) {
			setError( e );
		}
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
		<ul className="parsely-recommendations__linklist">
			{ recommendations.map( ( { title, url }, index ) => (
				<li key={ index }>
					<a href={ url }>{ title }</a>
				</li>
			) ) }
		</ul>
	);
}

const el = document.getElementById( 'wp-parsely-related-posts' ).querySelector( '.container' );
if ( el ) {
	render( <ParselyRecommendations />, el );
}

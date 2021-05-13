/**
 * External dependencies
 */
import { render, useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { fetchRelated } from '../../js/lib/parsely-api';

function ParselyRecommendations( { attributes } ) {
	const [ error, setError ] = useState( null );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ recommendations, setRecommendations ] = useState( null );

	useEffect( () => {
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
		fetchRecos();
	}, [] );

	return (
		<div>
			ohai, hullo!
			<br />
			{ JSON.stringify( {
				attributes,
				recommendations,
				isLoaded,
				error,
			} ) }
		</div>
	);
}

render(
	<ParselyRecommendations />,
	document.getElementById( 'wp-parsely-related-posts' ).querySelector( '.related-posts__grid' )
);

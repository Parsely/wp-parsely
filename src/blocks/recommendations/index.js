/**
 * External dependencies
 */
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ParselyRecommendations from './components/parsely-recommendations';

const el = document.getElementById( 'wp-parsely-related-posts-block' )?.querySelector( '.container' );
if ( el ) {
	render( <ParselyRecommendations { ...el.dataset } />, el );
}

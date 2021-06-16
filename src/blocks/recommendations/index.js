/**
 * External dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import ParselyRecommendations from './components/parsely-recommendations';

domReady( () => {
	const el = document.getElementById( 'wp-parsely-related-posts-block' )?.querySelector( '.container' );
	if ( el ) {
		render( <ParselyRecommendations { ...el.dataset } />, el );
	}
} );

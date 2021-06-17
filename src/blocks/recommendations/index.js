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
	const blocks = document.querySelectorAll( '.wp-parsely-related-posts-block .container' );
	blocks.forEach( ( block, i ) =>
		render( <ParselyRecommendations { ...block.dataset } key={ i } />, block )
	);
} );

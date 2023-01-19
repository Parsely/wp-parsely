/**
 * External dependencies
 */
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import TopPostList from './top-posts/component-list';

// Insert Dashboard Widget content when the page loads.
window.addEventListener(
	'load',
	function() {
		render(
			<TopPostList />,
			document.querySelector( '#wp-parsely-dashboard-widget > .inside' )
		);
	},
	false
);

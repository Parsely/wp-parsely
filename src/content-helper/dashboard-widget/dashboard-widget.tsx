/**
 * External dependencies
 */
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import TopPostList from './top-posts/component-list';
import { ElementOrEmptyCredentialsMessage } from '../../blocks/content-helper/content-helper-error';

window.addEventListener(
	'load',
	function() {
		render(
			ElementOrEmptyCredentialsMessage( <TopPostList /> ),
			document.querySelector( '#wp-parsely-dashboard-widget > .inside' )
		);
	},
	false
);

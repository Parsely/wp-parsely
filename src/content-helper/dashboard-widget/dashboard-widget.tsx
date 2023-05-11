/**
 * External dependencies
 */
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import TopPostList from './top-posts/component-list';
import VerifyCredentials from '../verify-credentials';

window.addEventListener(
	'load',
	function() {
		render(
			<VerifyCredentials>
				<TopPostList />
			</VerifyCredentials>,
			document.querySelector( '#wp-parsely-dashboard-widget > .inside' )
		);
	},
	false
);

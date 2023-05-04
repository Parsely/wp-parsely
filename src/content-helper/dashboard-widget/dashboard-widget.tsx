/**
 * External dependencies
 */
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import TopPostList from './top-posts/component-list';
import { ContentHelperError, ContentHelperErrorCode } from '../../blocks/content-helper/content-helper-error';

window.addEventListener(
	'load',
	function() {
		let element = <TopPostList />;

		if ( window.wpParselyCredentialsNotSetMessage ) {
			const error = new ContentHelperError(
				'',
				ContentHelperErrorCode.PluginCredentialsNotSetMessageDetected
			);

			element = error.renderMessage();
		}

		render(
			element,
			document.querySelector( '#wp-parsely-dashboard-widget > .inside' )
		);
	},
	false
);

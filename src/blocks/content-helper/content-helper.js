/**
 * External dependencies
 */
import { TextControl } from '@wordpress/components';
import { PluginSidebar } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import { ReactComponent as LeafIcon } from '../../../images/Parsely-Logo-sRGB-Leaf-Green.svg';

function registerParselySidebar() {
	registerPlugin( 'wp-parsley-block-editor-sidebar', {
		icon: LeafIcon,
		render: () => (
			<PluginSidebar name="wp-parsely-sidebar" title="Parse.ly">
				<h2>Parse.ly Content Helper</h2>
				<TextControl
					label="This is a text control"
					value="Initial Value"
					onChange={ ( content ) => `new content: ${ content }` }
				></TextControl>
			</PluginSidebar>
		),
	} );
}

registerParselySidebar();

/**
 * External dependencies
 */
import { Panel, PanelBody, PanelHeader } from '@wordpress/components';
import { PluginSidebar } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import PostsList from './components/PostsList.jsx';
import { ReactComponent as LeafIcon } from '../../../images/parsely-logo-green.svg';

const BLOCK_PLUGIN_ID = 'wp-parsely-block-editor-sidebar';

const renderSidebar = () => (
	<PluginSidebar name="wp-parsely-sidebar" title="Parse.ly">
		<Panel>
			<PanelHeader>Parse.ly Content Helper</PanelHeader>
			<PanelBody>
				<PostsList />
			</PanelBody>
		</Panel>
	</PluginSidebar>
);

// Registering Plugin to WordPress Block Editor.
registerPlugin( BLOCK_PLUGIN_ID, {
	icon: LeafIcon,
	render: renderSidebar,
} );

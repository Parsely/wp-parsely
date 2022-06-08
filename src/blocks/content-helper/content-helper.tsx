/**
 * External dependencies
 */
import { Panel, PanelBody, PanelHeader } from '@wordpress/components';
import { PluginSidebar } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import PostList from './components/post-list';
// @ts-ignore
import { ReactComponent as LeafIcon } from '../../img/parsely-logo.svg';

const BLOCK_PLUGIN_ID = 'wp-parsely-block-editor-sidebar';

const renderSidebar = () => (
	<PluginSidebar name="wp-parsely-sidebar" title="Parse.ly">
		<Panel>
			<PanelHeader>Parse.ly Content Helper</PanelHeader>
			<PanelBody><PostList /></PanelBody>
		</Panel>
	</PluginSidebar>
);

// Registering Plugin to WordPress Block Editor.
registerPlugin( BLOCK_PLUGIN_ID, {
	icon: LeafIcon,
	render: renderSidebar,
} );

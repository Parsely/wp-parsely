/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Panel, PanelBody } from '@wordpress/components';
import { PluginSidebar } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import PostList from './components/post-list';
import CurrentPostInformation from './components/current-post-information';
import LeafIcon from '../shared/components/leaf-icon';

const BLOCK_PLUGIN_ID = 'wp-parsely-block-editor-sidebar';

const renderSidebar = () => (
	<PluginSidebar icon={ <LeafIcon /> } name="wp-parsely-content-helper" className="wp-parsely-content-helper" title={ __( 'Parse.ly Content Helper', 'wp-parsely' ) }>
		<Panel>
			<PanelBody title={ __( 'Current Post Information', 'wp-parsely' ) } initialOpen={ true }>
				<CurrentPostInformation />
			</PanelBody>
		</Panel>
		<Panel>
			<PanelBody title={ __( 'Top-performing related posts', 'wp-parsely' ) } initialOpen={ false }>
				<PostList />
			</PanelBody>
		</Panel>
	</PluginSidebar>
);

// Registering Plugin to WordPress Block Editor.
registerPlugin( BLOCK_PLUGIN_ID, {
	icon: LeafIcon,
	render: renderSidebar,
} );

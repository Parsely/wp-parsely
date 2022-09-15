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
import CurrentPostDetails from './components/current-post-details';
import RelatedTopPostList from './components/related-top-post-list';
import LeafIcon from '../shared/components/leaf-icon';

const BLOCK_PLUGIN_ID = 'wp-parsely-block-editor-sidebar';

const renderSidebar = () => (
	<PluginSidebar icon={ <LeafIcon /> } name="wp-parsely-content-helper" className="wp-parsely-content-helper" title={ __( 'Parse.ly Content Helper', 'wp-parsely' ) }>
		<Panel>
			<PanelBody title={ __( 'Current post details', 'wp-parsely' ) } initialOpen={ true }>
				<CurrentPostDetails />
			</PanelBody>
		</Panel>
		<Panel>
			<PanelBody title={ __( 'Related top-performing posts', 'wp-parsely' ) } initialOpen={ false }>
				<RelatedTopPostList />
			</PanelBody>
		</Panel>
	</PluginSidebar>
);

// Registering Plugin to WordPress Block Editor.
registerPlugin( BLOCK_PLUGIN_ID, {
	icon: LeafIcon,
	render: renderSidebar,
} );

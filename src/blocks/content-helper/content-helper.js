/**
 * External dependencies
 */
import { Panel, PanelBody, PanelHeader } from '@wordpress/components';
import { PluginSidebar } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import { ReactComponent as LeafIcon } from '../../../images/parsely-logo-green.svg';
import PostCard from './components/PostCard.jsx';
import ContentHelperProvider from './content-helper-provider';

const BLOCK_PLUGIN_ID = 'wp-parsely-block-editor-sidebar';

const renderSidebar = () => {
	const posts = ContentHelperProvider.getTopPosts();

	return (
		<PluginSidebar name="wp-parsely-sidebar" title="Parse.ly">
			<Panel>
				<PanelHeader>Parse.ly Content Helper</PanelHeader>
				<PanelBody>
					<p>Related posts that performed well in the past:</p>
					{ posts.map( ( post ) => <PostCard key={ post.id } post={ post } /> ) }
				</PanelBody>
			</Panel>
		</PluginSidebar> );
};

// Registering Plugin to WordPress Block Editor.
registerPlugin( BLOCK_PLUGIN_ID, {
	icon: LeafIcon,
	render: renderSidebar,
} );

/**
 * External dependencies
 */
import { Panel, PanelBody, PanelHeader } from '@wordpress/components';
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
				<Panel>
					<PanelHeader>Parse.ly Content Helper</PanelHeader>
					<PanelBody>
						<p>Related posts that performed well in the past.</p>
						<ol>
							<li>Post 1</li>
							<li>Post 2</li>
							<li>Post 3</li>
						</ol>
					</PanelBody>
				</Panel>
			</PluginSidebar>
		),
	} );
}

registerParselySidebar();

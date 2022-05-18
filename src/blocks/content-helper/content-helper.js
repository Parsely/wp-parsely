/**
 * External dependencies
 */
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Panel,
	PanelBody,
	PanelHeader,
} from '@wordpress/components';
import { PluginSidebar } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import { ReactComponent as LeafIcon } from '../../../images/Parsely-Logo-sRGB-Leaf-Green.svg';

function registerParselySidebar() {
	const renderPostCard = () => (
		<>
			<Card>
				<CardHeader><b>The post title</b></CardHeader>
				<CardBody>
					<p>Published on December 15, 2022 by Author</p>
					<p><Button variant="primary">Open Post</Button> <Button variant="secondary">Post Stats</Button></p>
				</CardBody>
			</Card>
			<br />
		</>
	);

	registerPlugin( 'wp-parsley-block-editor-sidebar', {
		icon: LeafIcon,
		render: () => (
			<PluginSidebar name="wp-parsely-sidebar" title="Parse.ly">
				<Panel>
					<PanelHeader>Parse.ly Content Helper</PanelHeader>
					<PanelBody>
						<p>Related posts that performed well in the past:</p>
						{ renderPostCard() }
						{ renderPostCard() }
						{ renderPostCard() }
						{ renderPostCard() }
						{ renderPostCard() }
					</PanelBody>
				</Panel>
			</PluginSidebar>
		),
	} );
}

registerParselySidebar();

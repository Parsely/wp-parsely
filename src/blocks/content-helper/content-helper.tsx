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
import PerformanceDetails from './performance-details/component';
import RelatedTopPostList from './related-top-posts/component-list';
import LeafIcon from '../shared/components/leaf-icon';
import { ContentHelperError, ContentHelperErrorCode } from './content-helper-error';

const BLOCK_PLUGIN_ID = 'wp-parsely-block-editor-sidebar';

const renderSidebar = () => (
	<PluginSidebar icon={ <LeafIcon /> } name="wp-parsely-content-helper" className="wp-parsely-content-helper" title={ __( 'Parse.ly Editor Sidebar', 'wp-parsely' ) }>
		<Panel>
			<PanelBody title={ __( 'Performance Details', 'wp-parsely' ) } initialOpen={ true }>
				{ renderPanelContent( <PerformanceDetails /> ) }
			</PanelBody>
		</Panel>
		<Panel>
			<PanelBody title={ __( 'Related Top Posts', 'wp-parsely' ) } initialOpen={ false }>
				{ renderPanelContent( <RelatedTopPostList /> ) }
			</PanelBody>
		</Panel>
	</PluginSidebar>
);

/**
 * Renders the passed element or an error if credentials are not set.
 *
 * @since 3.9.0
 *
 * @param {JSX.Element } element The JSX element to render.
 *
 * @return {JSX.Element} The passed element or an error.
 */
function renderPanelContent( element: JSX.Element ): JSX.Element {
	if ( window.wpParselyCredentialsNotSetMessage ) {
		const error = new ContentHelperError(
			'',
			ContentHelperErrorCode.PluginCredentialsNotSetMessageDetected
		);

		return error.renderMessage();
	}

	return element;
}

// Registering Plugin to WordPress Block Editor.
registerPlugin( BLOCK_PLUGIN_ID, {
	icon: LeafIcon,
	render: renderSidebar,
} );

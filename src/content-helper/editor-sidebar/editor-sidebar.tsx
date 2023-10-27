/**
 * WordPress dependencies
 */
import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { PluginSidebar } from '@wordpress/edit-post';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import { LeafIcon } from '../common/icons/leaf-icon';
import {
	Metric,
	Period,
	getMetricDescription,
	getPeriodDescription,
	isInEnum,
} from '../common/utils/constants';
import { VerifyCredentials } from '../common/verify-credentials';
import { PerformanceDetails } from './performance-details/component';
import { RelatedTopPostList } from './related-top-posts/component-list';
import { WriteTitlesPanel } from './write-titles/component';

const BLOCK_PLUGIN_ID = 'wp-parsely-block-editor-sidebar';

const ContentHelperEditorSidebar = (): JSX.Element => {
	const [ period, setPeriod ] = useState<Period>( Period.Days7 );
	const [ metric, setMetric ] = useState<Metric>( Metric.Views );

	const Settings = (): JSX.Element => {
		return (
			<>
				<SelectControl
					label={ __( 'Period', 'wp-parsely' ) }
					onChange={ ( selection ) => {
						if ( isInEnum( selection, Period ) ) {
							setPeriod( selection as Period );
						}
					} }
					value={ period }
				>
					{
						Object.values( Period ).map( ( value ) =>
							<option key={ value } value={ value }>
								{ getPeriodDescription( value ) }
							</option>
						)
					}
				</SelectControl>
				<SelectControl
					label={ __( 'Metric', 'wp-parsely' ) }
					onChange={ ( selection ) => {
						if ( isInEnum( selection, Metric ) ) {
							setMetric( selection as Metric );
						}
					} }
					value={ metric }
				>
					{
						Object.values( Metric ).map( ( value ) =>
							<option key={ value } value={ value }>
								{ getMetricDescription( value ) }
							</option>
						)
					}
				</SelectControl>
			</>
		);
	};

	return (
		<PluginSidebar icon={ <LeafIcon /> }
			name="wp-parsely-content-helper"
			className="wp-parsely-content-helper"
			title={ __( 'Parse.ly Editor Sidebar', 'wp-parsely' ) }
		>
			<Panel>
				<PanelBody
					title={ __( 'Settings', 'wp-parsely' ) }
					initialOpen={ true }
				>
					<Settings />
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
					title={ __( 'Performance Details', 'wp-parsely' ) }
					initialOpen={ true }
				>
					{
						<VerifyCredentials>
							<PerformanceDetails period={ period } />
						</VerifyCredentials>
					}
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
					title={ __( 'Related Top Posts', 'wp-parsely' ) }
					initialOpen={ false }>
					{
						<VerifyCredentials>
							<RelatedTopPostList
								period={ period }
								metric={ metric }
							/>
						</VerifyCredentials>
					}
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
					title={ __( 'Titles & Headlines', 'wp-parsely' ) }
					initialOpen={ true }>
					{
						<VerifyCredentials>
							<WriteTitlesPanel />
						</VerifyCredentials>
					}
				</PanelBody>
			</Panel>
		</PluginSidebar>
	);
};

// Registering Plugin to WordPress Block Editor.
registerPlugin( BLOCK_PLUGIN_ID, {
	icon: LeafIcon,
	render: ContentHelperEditorSidebar,
} );

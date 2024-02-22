/**
 * WordPress dependencies
 */
import { Panel, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { SidebarSettings, useSettings } from '../../common/settings';
import { VerifyCredentials } from '../../common/verify-credentials';
import { PerformanceDetails } from '../performance-details/component';

/**
 * SidebarPerformanceTab component props.
 *
 * @since 3.14.0
 */
type SidebarPerformanceTabProps = {
	trackToggle: ( panel: string, next: boolean ) => void
}

/**
 * SidebarPerformanceTab component.
 * Renders the Performance tab in the Content Helper sidebar.
 *
 * @since 3.14.0
 *
 * @param { SidebarPerformanceTabProps } props The component's props.
 */
export const SidebarPerformanceTab = ( { trackToggle }: SidebarPerformanceTabProps ) => {
	const { settings, setSettings } = useSettings<SidebarSettings>();

	return (
		<Panel>
			<PanelBody
				title={ __( 'Performance Details', 'wp-parsely' ) }
				initialOpen={ settings.PerformanceDetailsOpen }
				onToggle={ ( next ) => {
					setSettings( {
						PerformanceDetailsOpen: next,
					} );
					trackToggle( 'performance_details', next );
				} }
			>
				{
					<VerifyCredentials>
						<PerformanceDetails
							period={ settings.SettingsPeriod }
						/>
					</VerifyCredentials>
				}
			</PanelBody>
		</Panel>
	);
};

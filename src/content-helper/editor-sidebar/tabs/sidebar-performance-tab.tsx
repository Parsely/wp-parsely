/**
 * Internal dependencies
 */
import {
	Panel,
	__experimentalGrid as Grid,
	__experimentalHeading as Heading,
	__experimentalHStack as HStack,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUnitControl as UnitControl, DropdownMenu, SelectControl, Icon,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { more, arrowUp, arrowRight, arrowLeft, arrowDown, moreVertical } from '@wordpress/icons';
import type { ReactNode } from 'react';
import { getPeriodDescription, isInEnum, Period } from '../../common/utils/constants';
import { VerifyCredentials } from '../../common/verify-credentials';
import { PerformanceDetails } from '../performance-details/component';

/**
 * SidebarPerformanceTab component props.
 *
 * @since 3.14.0
 */
type SidebarPerformanceTabProps = {
	period: Period;
}

type PerformanceStatPanelProps = {
	title: string;
	icon: JSX.Element;
	subtitle?: string;
	children: ReactNode;
	controls?: Parameters<typeof DropdownMenu>[0]['controls'];
}
const PerformanceStatPanel = (
	{ title, icon, subtitle, children, controls }: PerformanceStatPanelProps
) => {
	return (
		<div className="performance-stat-panel">
			<HStack className="panel-header">
				<Heading level={ 2 }>{ title }</Heading>
				<DropdownMenu
					icon={ icon }
					label="Select a direction"
					toggleProps={ {
						isSmall: true,
					} }
					controls={ controls }
				/>
			</HStack>
			<div className="panel-body">
				{ children }
			</div>
		</div>
	);
};

/**
 * SidebarPerformanceTab component.
 * Renders the Performance tab in the Content Helper sidebar.
 *
 * @since 3.14.0
 *
 * @param { SidebarPerformanceTabProps } props The component's props.
 */
export const SidebarPerformanceTab = ( { period }: SidebarPerformanceTabProps ) => {
	const [ height, setHeight ] = useState<string>();
	const [ overviewVisible, setOverviewVisible ] = useState<boolean>( true );
	const [ categoriesVisible, setCategoriesVisible ] = useState<boolean>( true );
	const [ referrersVisible, setReferrersVisible ] = useState<boolean>( true );

	// TEMPORARY STATES
	const [ periodValue, setPeriod ] = useState<Period>( Period.Days7 );

	const resetAll = () => {
		setHeight( 'sda' );
	};

	return (
		<Panel>
			<div className="wp-parsely-performance-panel">
				<PerformanceStatPanel
					title={ __( 'Performance Stats', 'wp-parsely' ) }
					icon={ moreVertical }
					controls={ [
						{
							title: 'Up',
							icon: arrowUp,
							onClick: () => console.log( 'up' ),
						},
						{
							title: 'Right',
							icon: arrowRight,
							onClick: () => console.log( 'right' ),
						},
						{
							title: 'Down',
							icon: arrowDown,
							onClick: () => console.log( 'down' ),
						},
						{
							title: 'Left',
							icon: arrowLeft,
							onClick: () => console.log( 'left' ),
						},
					] }
				>
					<div className="panel-settings">
						<SelectControl
							value={ periodValue }
							prefix={ __( 'Period: ', 'wp-parsely' ) }
							onChange={ ( selection ) => {
								if ( isInEnum( selection, Period ) ) {
									console.log( selection );
									setPeriod( selection as Period );
									//setSettings( {
									//	SettingsPeriod: selection as Period,
									///} );
									//trackSettingsChange( 'period', { period: selection } );
								}
							} }
						>
							{ Object.values( Period ).map( ( value ) => (
								<option key={ value } value={ value }>
									{ getPeriodDescription( value ) }
								</option>
							) ) }
						</SelectControl>
					</div>
				</PerformanceStatPanel>

				<PerformanceStatPanel
					title={ __( 'Overview', 'wp-parsely' ) }
					icon={ moreVertical }
					subtitle={ __( 'Page Views, Visitors, Avg. Time', 'wp-parsely' ) }
					controls={ [
						{
							title: 'Up',
							icon: arrowUp,
							onClick: () => console.log( 'up' ),
						},
						{
							title: 'Right',
							icon: arrowRight,
							onClick: () => console.log( 'right' ),
						},
						{
							title: 'Down',
							icon: arrowDown,
							onClick: () => console.log( 'down' ),
						},
						{
							title: 'Left',
							icon: arrowLeft,
							onClick: () => console.log( 'left' ),
						},
					] }
				>
					Hello World
				</PerformanceStatPanel>
			</div>

			{ /* @ts-ignore */ }
			<ToolsPanel
				label={ __( 'Performance', 'wp-parsely' ) }
				text={ __( 'Performance', 'wp-parsely' ) }
				resetAll={ () => {
					setOverviewVisible( true );
					setCategoriesVisible( true );
					setReferrersVisible( true );
				} }
			>
				<div>Hello World</div>
				<ToolsPanelItem hasValue={ () => overviewVisible } label={ __( 'Overview', 'wp-parsely' ) }>
					Hi!
				</ToolsPanelItem>
				<ToolsPanelItem hasValue={ () => categoriesVisible } label={ __( 'Categories', 'wp-parsely' ) }>
					Hi!
				</ToolsPanelItem>
				<ToolsPanelItem hasValue={ () => referrersVisible } label={ __( 'Referrers', 'wp-parsely' ) }>
					Hi!
				</ToolsPanelItem>
			</ToolsPanel>
			<VerifyCredentials>
				<PerformanceDetails period={ period } />
			</VerifyCredentials>
		</Panel>
	);
};

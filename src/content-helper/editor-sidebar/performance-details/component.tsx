/**
 * WordPress dependencies
 */
import { MenuGroup, MenuItem, SelectControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	check,
	moreVertical,
	reset,
} from '@wordpress/icons';
import { Telemetry } from '../../../js/telemetry/telemetry';

/**
 * Internal dependencies
 */
import { ContentHelperError } from '../../common/content-helper-error';
import { PerformanceCategoriesPanel } from './component-panel-categories';
import { PerformanceData } from './model';
import { PerformanceDetailsProvider } from './provider';
import { PerformanceOverviewPanel } from './component-panel-overview';
import { PerformanceReferrersPanel } from './component-panel-referrers';
import { PerformanceStatPanel } from './component-panel';
import { SidebarSettings, useSettings } from '../../common/settings';
import { getPeriodDescription, isInEnum, Period } from '../../common/utils/constants';

// Number of attempts to fetch the data before displaying an error.
const FETCH_RETRIES = 1;

/**
 * List of available panels to display in the Performance Stats menu.
 * @since 3.14.0
 */
const availablePanels = [
	{
		name: 'overview',
		label: __( 'Overview', 'wp-parsely' ),
		forced: true,
	},
	{
		name: 'categories',
		label: __( 'Referrer Categories', 'wp-parsely' ),
	},
	{
		name: 'referrers',
		label: __( 'Referrers', 'wp-parsely' ),
	},
];

/**
 * Checks if a panel is visible in the sidebar settings.
 *
 * @since 3.14.0
 *
 * @param { SidebarSettings } settings The sidebar settings.
 * @param { string }          panel    The name of the panel.
 */
const isPanelVisible = ( settings: SidebarSettings, panel: string ): boolean => {
	return settings.PerformanceStatsSettings.VisiblePanels.includes( panel );
};

/**
 * PerformanceStatsMenu dropdown menu component.
 *
 * @since 3.14.0
 *
 * @param {Function} onClose Callback to close the dropdown menu.
 */
const PerformanceStatsMenu = ( { onClose }: { onClose: () => void } ) => {
	const { settings, setSettings } = useSettings<SidebarSettings>();

	/**
	 * Toggles a panel's visibility in the sidebar settings.
	 * If the panel is forced, it will not be toggled.
	 *
	 * @since 3.14.0
	 *
	 * @param { string } panel The name of the panel to toggle.
	 */
	const togglePanel = ( panel: string ) => {
		// Do not toggle panels that are forced to be visible
		if ( availablePanels.find( ( p ) => p.name === panel )?.forced ) {
			return;
		}

		// Check if the panel is in the settings.PerformanceStatsSettings.VisiblePanels array
		// If it is, remove it with setSettings, if not, add it.
		if ( isPanelVisible( settings, panel ) ) {
			setSettings( {
				PerformanceStatsSettings: {
					...settings.PerformanceStatsSettings,
					VisiblePanels: settings.PerformanceStatsSettings.VisiblePanels.filter( ( p ) => p !== panel ),
				},
			} );
			Telemetry.trackEvent( 'editor_sidebar_performance_panel_closed', { panel } );
		} else {
			setSettings( {
				PerformanceStatsSettings: {
					...settings.PerformanceStatsSettings,
					VisiblePanels: [ ...settings.PerformanceStatsSettings.VisiblePanels, panel ],
				},
			} );
			Telemetry.trackEvent( 'editor_sidebar_performance_panel_opened', { panel } );
		}
	};

	/**
	 * Handles the click event on a menu item.
	 *
	 * @since 3.14.0
	 *
	 * @param { string } selection The name of the selected panel.
	 */
	const onClick = ( selection: string ) => {
		togglePanel( selection );
		onClose();
	};

	/**
	 * Resets all panels to their default visibility.
	 *
	 * @since 3.14.0
	 */
	const resetAll = () => {
		setSettings( {
			PerformanceStatsSettings: {
				...settings.PerformanceStatsSettings,
				VisiblePanels: availablePanels.map( ( panel ) => panel.name ),
			},
		} );
		Telemetry.trackEvent( 'editor_sidebar_performance_panel_reset' );
		onClose();
	};

	return (
		<>
			<MenuGroup label={ __( 'Performance Stats', 'wp-parsely' ) }>
				{ availablePanels.map( ( item ) => (
					<MenuItem
						key={ item.name }
						disabled={ item.forced }
						icon={ isPanelVisible( settings, item.name ) ? check : reset }
						onClick={ () => onClick( item.name ) }
					>
						{ item.label }
					</MenuItem>
				) ) }
			</MenuGroup>
			<MenuGroup>
				<MenuItem onClick={ resetAll }>Reset all</MenuItem>
			</MenuGroup>
		</>
	);
};

/**
 * PerformanceStats component properties.
 *
 * @since 3.14.0
 */
type PerformanceStatsProps = {
	period: Period;
}

/**
 * PerformanceStats component.
 *
 * @since 3.14.0
 *
 * @param { PerformanceStatsProps } props The component's properties.
 */
export const PerformanceStats = ( { period }: PerformanceStatsProps ) => {
	const [ loading, setLoading ] = useState<boolean>( true );
	const [ error, setError ] = useState<ContentHelperError>();
	const [ postDetails, setPostDetails ] = useState<PerformanceData>();

	const { settings, setSettings } = useSettings<SidebarSettings>();

	useEffect( () => {
		const provider = new PerformanceDetailsProvider();

		const fetchPosts = async ( retries: number ) => {
			provider.getPerformanceDetails( period )
				.then( ( result ) => {
					setPostDetails( result );
					setLoading( false );
				} )
				.catch( async ( err ) => {
					if ( retries > 0 && err.retryFetch ) {
						await new Promise( ( r ) => setTimeout( r, 500 ) );
						await fetchPosts( retries - 1 );
					} else {
						setError( err );
						setLoading( false );
					}
				} );
		};

		setLoading( true );
		fetchPosts( FETCH_RETRIES );

		return (): void => {
			setError( undefined );
		};
	}, [ period ] );

	return (
		<div className="wp-parsely-performance-panel">
			<PerformanceStatPanel
				title={ __( 'Performance Stats', 'wp-parsely' ) }
				icon={ moreVertical }
				dropdownChildren={ ( { onClose } ) => <PerformanceStatsMenu onClose={ onClose } /> }
			>
				<div className="panel-settings">
					<SelectControl
						value={ settings.PerformanceStatsSettings.Period }
						prefix={ __( 'Period: ', 'wp-parsely' ) }
						onChange={ ( selection ) => {
							if ( isInEnum( selection, Period ) ) {
								setSettings( {
									PerformanceStatsSettings: {
										...settings.PerformanceStatsSettings,
										Period: selection as Period,
									},
								} );
								Telemetry.trackEvent( 'editor_sidebar_performance_period_changed', { period: selection } );
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

			{ error ? (
				error.Message()
			) : (
				<>
					{ isPanelVisible( settings, 'overview' ) && (
						<PerformanceOverviewPanel data={ postDetails as PerformanceData } isLoading={ loading } />
					) }
					{ isPanelVisible( settings, 'categories' ) && (
						<PerformanceCategoriesPanel data={ postDetails as PerformanceData } isLoading={ loading } />
					) }
					{ isPanelVisible( settings, 'referrers' ) && (
						<PerformanceReferrersPanel data={ postDetails as PerformanceData } isLoading={ loading } />
					) }
				</>
			) }
		</div>
	);
};

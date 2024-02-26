import { MenuGroup, MenuItem, SelectControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	check,
	moreVertical, reset,
} from '@wordpress/icons';
import { ContentHelperError } from '../../common/content-helper-error';
import { SidebarSettings, useSettings } from '../../common/settings';
import { getPeriodDescription, isInEnum, Period } from '../../common/utils/constants';
import { PerformanceCategoriesPanel } from './component-panel-categories';
import { PerformanceOverviewPanel } from './component-panel-overview';
import { PerformanceStatPanel } from './component-panel';
import { PerformanceReferrersPanel } from './component-panel-referrers';
import { PerformanceData } from './model';
import { PerformanceDetailsProvider } from './provider';

// Number of attempts to fetch the data before displaying an error.
const FETCH_RETRIES = 1;

type PerformanceStatsProps = {
	period: Period;
}

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

const isPanelVisible = ( settings: SidebarSettings, panel: string ): boolean => {
	return settings.PerformanceStatsSettings.VisiblePanels.includes( panel );
};

const PerformanceStatsMenu = ( { onClose }: { onClose: () => void } ) => {
	const { settings, setSettings } = useSettings<SidebarSettings>();

	const togglePanel = ( panel: string ) => {
		// Do not toggle panels that are forced to be visible
		if ( availablePanels.find( ( p ) => p.name === panel )?.forced ) {
			return;
		}

		// Check if the panel is in the settings.PerformanceStatsSettings.VisiblePanels array
		// If it is, remove it with setSettings, if not, add it
		if ( isPanelVisible( settings, panel ) ) {
			setSettings( {
				PerformanceStatsSettings: {
					...settings.PerformanceStatsSettings,
					VisiblePanels: settings.PerformanceStatsSettings.VisiblePanels.filter( ( p ) => p !== panel ),
				},
			} );
		} else {
			setSettings( {
				PerformanceStatsSettings: {
					...settings.PerformanceStatsSettings,
					VisiblePanels: [ ...settings.PerformanceStatsSettings.VisiblePanels, panel ],
				},
			} );
		}
	};

	const onClick = ( selection: string ) => {
		togglePanel( selection );
		onClose();
	};

	return (
		<>
			<MenuGroup label={ __( 'Performance Stats', 'wp-parsely' ) }>
				{ availablePanels.map( ( item ) => (
					<MenuItem
						key={ item.name }
						disabled={ item.forced }
						icon={ isPanelVisible( settings, item.name ) ? reset : check }
						onClick={ () => onClick( item.name ) }
					>
						{ item.label }
					</MenuItem>
				) ) }
			</MenuGroup>
			<MenuGroup>
				<MenuItem>Reset all</MenuItem>
			</MenuGroup>
		</>
	);
};

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
						value={ settings.PerformanceStatsPeriod }
						prefix={ __( 'Period: ', 'wp-parsely' ) }
						onChange={ ( selection ) => {
							if ( isInEnum( selection, Period ) ) {
								setSettings( {
									PerformanceStatsPeriod: selection as Period,
								} );
								//setPeriod( selection as Period );
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

import { MenuGroup, MenuItem, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	reset,
	check,
	Icon,
	moreHorizontal,
	people,
	rotateLeft,
	seen,
} from '@wordpress/icons';
import { ClockIcon } from '../../common/icons/clock-icon';
import { SidebarSettings, useSettings } from '../../common/settings';
import { formatToImpreciseNumber } from '../../common/utils/number';
import { PerformanceStatPanel } from './component-panel';
import { PerformanceData } from './model';

const availableDataPoints = [
	{
		name: 'views',
		label: __( 'Page Views', 'wp-parsely' ),
		icon: seen,
	},
	{
		name: 'visitors',
		label: __( 'Visitors', 'wp-parsely' ),
		icon: people,
	},
	{
		name: 'avgEngaged',
		label: __( 'Avg. Engaged', 'wp-parsely' ),
		icon: <ClockIcon />,
	},
	{
		name: 'recirculation',
		label: __( 'Recirculation', 'wp-parsely' ),
		icon: rotateLeft,
		smallText: true,
	},
];

const isDataPointVisible = ( settings: SidebarSettings, name: string ): boolean => {
	return settings.PerformanceStatsSettings.VisibleDataPoints.includes( name );
};

type DataPointProps = {
	title: string;
	value: string;
	icon: JSX.Element;
	smallText?: boolean;
	isVisible?: boolean;
}
const DataPoint = ( { title, value, icon, smallText, isVisible = true }: DataPointProps ) => {
	if ( ! isVisible ) {
		return null;
	}

	return (
		<div className="data-point">
			<Icon size={ 24 } icon={ icon } />
			<span className="data-point-title">{ title }</span>
			<span className={ 'data-point-value' + ( smallText ? ' is-small' : '' ) }>{ value }</span>
		</div>
	);
};

type PerformanceDataPointsProp = {
	dataPoints: DataPointProps[]
}

const PerformanceDataPoints = ( { dataPoints }: PerformanceDataPointsProp ) => {
	return (
		<div className="performance-data-points">
			{ dataPoints.map( ( { title, value, icon, smallText, isVisible } ) => (
				<DataPoint
					key={ title }
					title={ title }
					value={ value }
					icon={ icon }
					smallText={ smallText }
					isVisible={ isVisible }
				/>
			) ) }
		</div>
	);
};

type PerformanceOverviewPanelProps = {
	data: PerformanceData;
	isLoading?: boolean;
}

type OverviewMenuProps = {
	onClose: () => void;
}
const OverviewMenu = ( { onClose }: OverviewMenuProps ) => {
	const { settings, setSettings } = useSettings<SidebarSettings>();

	const toggleDataPoint = ( dataPoint: string ) => {
		// Check if the dataPoint is in the settings.PerformanceStatsSettings.VisibleDataPoints array
		// If it is, remove it with setSettings, if not, add it
		if ( isDataPointVisible( settings, dataPoint ) ) {
			setSettings( {
				PerformanceStatsSettings: {
					...settings.PerformanceStatsSettings,
					VisibleDataPoints: settings.PerformanceStatsSettings.VisibleDataPoints.filter( ( p ) => p !== dataPoint ),
				},
			} );
		} else {
			setSettings( {
				PerformanceStatsSettings: {
					...settings.PerformanceStatsSettings,
					VisibleDataPoints: [ ...settings.PerformanceStatsSettings.VisibleDataPoints, dataPoint ],
				},
			} );
		}
	};

	const onClick = ( selection: string ) => {
		toggleDataPoint( selection );
		onClose();
	};

	return (
		<>
			<MenuGroup label={ __( 'Performance Stats', 'wp-parsely' ) }>
				{ availableDataPoints.map( ( value ) => (
					<MenuItem
						key={ value.name }
						icon={ isDataPointVisible( settings, value.name ) ? reset : check }
						onClick={ () => onClick( value.name ) }
					>
						<Icon icon={ value.icon } />
						{ value.label }
					</MenuItem>
				) ) }
			</MenuGroup>
			<MenuGroup>
				<MenuItem>Reset all</MenuItem>
			</MenuGroup>
		</>
	);
};

export const PerformanceOverviewPanel = ( {
	data,
	isLoading = false,
}: Readonly<PerformanceOverviewPanelProps> ) => {
	const { settings } = useSettings<SidebarSettings>();

	return (
		<PerformanceStatPanel
			title={ __( 'Overview', 'wp-parsely' ) }
			level={ 3 }
			icon={ moreHorizontal }
			dropdownChildren={ ( { onClose } ) => <OverviewMenu onClose={ onClose } /> }
		>
			{ ( isLoading ? (
				<div className="parsely-spinner-wrapper" data-testid="parsely-spinner-wrapper">
					<Spinner />
				</div>
			) : (
				<PerformanceDataPoints dataPoints={
					[
						{
							title: __( 'Page Views', 'wp-parsely' ),
							value: formatToImpreciseNumber( data.views ),
							isVisible: isDataPointVisible( settings, 'views' ),
							icon: seen,
						},
						{
							title: __( 'Visitors', 'wp-parsely' ),
							value: formatToImpreciseNumber( data.visitors ),
							isVisible: isDataPointVisible( settings, 'visitors' ),
							icon: people,
						},
						{
							title: __( 'Avg. Engaged', 'wp-parsely' ),
							value: data.avgEngaged,
							isVisible: isDataPointVisible( settings, 'avgEngaged' ),
							icon: <ClockIcon />,
						},
						{
							title: __( 'Recirculation', 'wp-parsely' ),
							value: 'Coming soon!',
							smallText: true,
							isVisible: isDataPointVisible( settings, 'recirculation' ),
							icon: rotateLeft,
						},
					]
				} />
			) ) }
		</PerformanceStatPanel>
	);
};

import '../dashboard.scss';
import { Button } from '@wordpress/components';
import { Icon, link } from '@wordpress/icons';
import { PARSELY_DASHBOARD_MAX_PAGE_WIDTH } from '../../../dashboard-page';

const HeaderSummary = () => {
	return (
		<div className="dashboard-header-summary">
			<div className="summary-info">
				<div className="summary-title">Today is an exceptional day.</div>
				<div className="summary-text">75% more traffic than last week</div>
				<div className="summary-text">Yesterday was the 33rd best Tuesday, 214th overall.</div>
			</div>
			<div className="summary-button">
				<Button variant="secondary">View more in Parse.ly</Button>
			</div>
		</div>
	);
};

type HeaderCardProps = {
	title?: string;
	icon?: React.JSX.Element;
	value?: string;
	change?: string;
	down?: boolean;
	className?: string;
};
const StatCard = ( { title, value, change, down = false, icon, className }: HeaderCardProps ) => {
	const changeIcon = down ? '↓' : '↑';

	return (
		<div className={ 'header-stat-card' + ( className ? ' ' + className : '' ) }>
			{ title &&
				<div className="card-title">
					{ icon && <Icon size={ 16 } icon={ icon } /> }
					{ title }
				</div>
			}
			{ value &&
				<div className="card-value">
					{ value }
					{ change && <div className={ `card-change ${ down ? 'down' : '' }` }>{ changeIcon }{ change }</div> }
				</div>
			}
		</div>
	);
};

export const DashboardHeader = () => {
	return (
		<div className="dashboard-header-background">
			<div className="parsely-dashboard-page-content" style={ { maxWidth: PARSELY_DASHBOARD_MAX_PAGE_WIDTH + 'px' } }>
				<div className="dashboard-header">
					<HeaderSummary />
					<div className="dashboard-header-stats">
						<div className="stats-top">
							<StatCard className="stat-intro" title="Parse.ly Working For You" />
							<StatCard title="Traffic Boost" value="14%" icon={ link } />
							<StatCard title="Smart Link Clicks" value="784" icon={ link } />
						</div>

						{ [
							{ title: 'Page Views', value: '4.6K', change: '24%' },
							{ title: 'Visitors', value: '1.5K', change: '25%' },
							{ title: 'Minutes', value: '32', change: '40%' },
							{ title: 'Avg. Time', value: '32', change: '40%', down: true },
							{ title: 'Soc. Interactions', value: '32', change: '40%' },
							{ title: 'New Posts', value: '2', change: '40%' },
						].map( ( metric, index ) => (
							<StatCard key={ index } { ...metric } />
						) ) }

					</div>
				</div>
			</div>
		</div>
	);
};

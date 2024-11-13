import { DashboardHeader } from './components/header-component';
import { PARSELY_DASHBOARD_MAX_PAGE_WIDTH } from '../../dashboard-page';
/**
 * The main dashboard page component.
 *
 * @since 3.18.0
 */
export const DashboardPage = () => {
	return (
		<>
			<DashboardHeader />
			<div className="parsely-dashboard-page-content" style={ { maxWidth: PARSELY_DASHBOARD_MAX_PAGE_WIDTH + 'px' } }>
				<p>This is the dashboard page</p>
			</div>

		</>
	);
};

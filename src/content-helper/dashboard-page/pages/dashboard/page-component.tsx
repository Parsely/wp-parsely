import { PageContainer, PageBody } from '../../components';
import { DashboardHeader } from './components/header-component';

/**
 * The main dashboard page component.
 *
 * @since 3.18.0
 */
export const DashboardPage = () => {
	return (
		<PageContainer name="dashboard">
			<DashboardHeader />
			<PageBody>
				<p>This is the dashboard page</p>
			</PageBody>
		</PageContainer>
	);
};

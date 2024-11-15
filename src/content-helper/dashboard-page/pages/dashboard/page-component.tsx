/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PageContainer, PageBody, PostsTable } from '../../components';
import { DashboardHeading } from '../../components/typography-components';
import { DashboardHeader } from './header-component';

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
				<DashboardHeading>{ __( 'Recent Posts', 'wp-parsely' ) } </DashboardHeading>
				<p>
					{ __(
						'Here’s what you’ve published lately. Let’s see if we can improve its performance!',
						'wp-parsely'
					) }
				</p>
				<PostsTable query={ {
					status: 'publish',
					per_page: 5,
				} } />
			</PageBody>
		</PageContainer>
	);
};

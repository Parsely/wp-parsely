/**
 * Internal dependencies
 */
import {
	Panel,
} from '@wordpress/components';
import { Period } from '../../common/utils/constants';
import { VerifyCredentials } from '../../common/verify-credentials';
import { PerformanceStats } from '../performance-details/component';

/**
 * SidebarPerformanceTab component props.
 *
 * @since 3.14.0
 */
type SidebarPerformanceTabProps = {
	period: Period;
}

/**
 * SidebarPerformanceTab component.
 * Renders the Performance tab in the Content Helper sidebar.
 *
 * @since 3.14.0
 *
 * @param { SidebarPerformanceTabProps } props The component's props.
 */
export const SidebarPerformanceTab = ( { period }: SidebarPerformanceTabProps ) => {
	return (
		<Panel>
			<VerifyCredentials>
				<PerformanceStats period={ period } />
			</VerifyCredentials>
		</Panel>
	);
};

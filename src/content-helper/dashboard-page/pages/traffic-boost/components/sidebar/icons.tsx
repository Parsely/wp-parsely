/**
 * WordPress dependencies
 */
import { Button, Icon } from '@wordpress/components';
import { desktop, edit, trendingUp } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { LeafIcon } from '../../../../../common/icons/leaf-icon';

/**
 * Component that displays stats and action buttons.
 *
 * @since 3.18.0
 */
export const SidebarIcons = (): React.JSX.Element => (
	<div className="traffic-boost-sidebar-icons">
		<div className="traffic-boost-sidebar-stats">
			<div>
				<span>14%</span>
				<Icon icon={ trendingUp } />
			</div>
		</div>
		<div className="traffic-boost-sidebar-icons-actions">
			<Button icon={ desktop } />
			<Button icon={ edit } />
			<Button iconSize={ 20 } icon={ <LeafIcon /> } />
		</div>
	</div>
);

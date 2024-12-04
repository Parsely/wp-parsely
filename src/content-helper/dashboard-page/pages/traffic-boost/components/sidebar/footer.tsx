/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { plus } from '@wordpress/icons';

/**
 * Footer component with action buttons.
 *
 * @since 3.18.0
 */
export const SidebarFooter = (): React.JSX.Element => (
	<div className="traffic-boost-sidebar-footer">
		<Button icon={ plus } variant="secondary">
			Manually Add Link
		</Button>
	</div>
);

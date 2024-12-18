/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { chevronLeft } from '@wordpress/icons';

/**
 * Defines the props structure for SidebarHeader.
 *
 * @since 3.18.0
 */
interface SidebarHeaderProps {
    onBackClick: () => void;
}

/**
 * Header component for the Traffic Boost sidebar.
 *
 * @since 3.18.0
 *
 * @param {SidebarHeaderProps} props Component props.
 */
export const SidebarHeader = ( { onBackClick }: SidebarHeaderProps ): React.JSX.Element => (
	<div className="traffic-boost-sidebar-header">
		<Button icon={ chevronLeft } onClick={ onBackClick }>
			{ __( 'Back', 'wp-parsely' ) }
		</Button>
	</div>
);

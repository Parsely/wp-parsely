/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { chevronLeft } from '@wordpress/icons';
import { PostDetailsSidebar } from './post-details';
import { HydratedPost } from '../../../../../common/base-wordpress-provider';

/**
 * Defines the props structure for SidebarHeader.
 *
 * @since 3.18.0
 */
interface SidebarHeaderProps {
    onBackClick: () => void;
    post: HydratedPost;
}

/**
 * Header component for the Traffic Boost sidebar.
 *
 * @since 3.18.0
 *
 * @param {SidebarHeaderProps} props Component props.
 */
export const SidebarHeader = ( { onBackClick, post }: SidebarHeaderProps ): React.JSX.Element => (
	<div className="traffic-boost-sidebar-header">
		<div className="traffic-boost-sidebar-header-nav">
			<Button icon={ chevronLeft } onClick={ onBackClick }>
				{ __( 'Back', 'wp-parsely' ) }
			</Button>
		</div>

		<div className="traffic-boost-sidebar-inner">
			<PostDetailsSidebar post={ post } />
		</div>
	</div>
);

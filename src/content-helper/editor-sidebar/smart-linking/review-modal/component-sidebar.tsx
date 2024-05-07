import { MenuItem } from '@wordpress/components';
import { SmartLink } from '../provider';

type ReviewModalSidebarProps = {
	activeLink: SmartLink | null,
	links: SmartLink[] | null,
	setSelectedLink: ( link: SmartLink ) => void,
};

export const ReviewModalSidebar = ( {
	activeLink,
	links,
	setSelectedLink,
}: ReviewModalSidebarProps ): JSX.Element => {
	return (
		<div className="smart-linking-review-sidebar">
			<div>
				<div className="review-sidebar-header">
					Outbound Smart Links
					<span>{ links?.length }</span>
				</div>
				{ links?.map( ( link ) => (
					<MenuItem
						key={ link.uid }
						className={ activeLink?.uid === link.uid ? 'is-selected' : '' }
						role="menuitemradio"
						shortcut={ ! link.applied ? 'NEW' : undefined }
						isSelected={ activeLink?.uid === link.uid }
						onClick={ () => {
							setSelectedLink( link );
						} }
					>
						{ link.text }
					</MenuItem>
				) ) }
			</div>
		</div>
	);
};

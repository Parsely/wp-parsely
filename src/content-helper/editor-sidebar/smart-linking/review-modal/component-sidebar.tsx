import { MenuItem } from '@wordpress/components';
import { LinkSuggestion } from '../provider';

type ReviewModalSidebarProps = {
	activeLink: LinkSuggestion | null,
	links: LinkSuggestion[] | null,
	setSelectedLink: ( link: LinkSuggestion ) => void,
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
						shortcut="NEW"
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

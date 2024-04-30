import { MenuItem } from '@wordpress/components';
import { LinkSuggestion } from '../provider';

type ReviewModalSidebarProps = {
	links: LinkSuggestion[] | null,
};

export const ReviewModalSidebar = ( {
	links,
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
						key={ link.href }
						shortcut="NEW"
					>
						{ link.text }
					</MenuItem>
				) ) }
			</div>
		</div>
	);
};

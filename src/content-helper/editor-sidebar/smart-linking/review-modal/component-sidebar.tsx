import { MenuItem } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { AiIcon } from '../../../common/icons/ai-icon';
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
	const sidebarRef = useRef<HTMLDivElement>( null );
	const itemRefs = useRef<( HTMLButtonElement | null )[]>( [] );

	/**
	 * Handles the scroll of the sidebar to the active link.
	 */
	useEffect( () => {
		if ( activeLink ) {
			const activeIndex = links?.findIndex( ( link ) => link.uid === activeLink.uid );
			if ( activeIndex !== undefined && activeIndex !== -1 && sidebarRef.current && itemRefs.current[ activeIndex ] ) {
				const sidebar = sidebarRef.current;
				const activeItem = itemRefs.current[ activeIndex ];

				if ( activeItem ) {
					if ( activeIndex === 0 ) {
						sidebar.scrollTop = 0;
						return;
					}
					const sidebarRect = sidebar.getBoundingClientRect();
					const activeItemRect = activeItem.getBoundingClientRect();

					// Check if the active item is out of view.
					if ( activeItemRect.top < sidebarRect.top || activeItemRect.bottom > sidebarRect.bottom ) {
						// Scroll only if the active item is out of view.
						sidebar.scrollTop = activeItem.offsetTop - sidebar.offsetTop;
					}
				}
			}
		}
	}, [ activeLink, links ] );
	const label = (
		<span className="smart-linking-menu-label">
			{ __( 'NEW', 'wp-parsely' ) }
			<AiIcon />
		</span>
	);

	return (
		<div className="smart-linking-review-sidebar" ref={ sidebarRef }>
			<div>
				<div className="review-sidebar-header">
					{ __( 'Outbound Smart Links', 'wp-parsely' ) }
					<span>{ links?.length }</span>
				</div>
				{ links?.map( ( link, index ) => (
					<MenuItem
						key={ link.uid }
						ref={ ( el ) => itemRefs.current[ index ] = el }
						className={ activeLink?.uid === link.uid ? 'is-selected' : '' }
						role="menuitemradio"
						isSelected={ activeLink?.uid === link.uid }
						onClick={ () => {
							setSelectedLink( link );
						} }
					>
						<span className="smart-linking-menu-item">{ link.text }</span>
						{ ! link.applied && label }
					</MenuItem>
				) ) }
			</div>
		</div>
	);
};

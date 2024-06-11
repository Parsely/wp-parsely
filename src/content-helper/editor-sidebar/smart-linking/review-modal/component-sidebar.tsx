/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { AiIcon } from '../../../common/icons/ai-icon';
import { InboundSmartLink, SmartLink } from '../provider';

type ReviewModalSidebarProps = {
	activeLink: SmartLink | null,
	inboundLinks: InboundSmartLink[] | null,
	outboundLinks: SmartLink[] | null,
	setSelectedLink: ( link: SmartLink ) => void,
};

/**
 * Sidebar component for the review modal.
 *
 * @since 3.16.0
 *
 * @param {ReviewModalSidebarProps} props The component props.
 */
export const ReviewModalSidebar = ( {
	activeLink,
	outboundLinks,
	inboundLinks,
	setSelectedLink,
}: ReviewModalSidebarProps ): React.JSX.Element => {
	const sidebarRef = useRef<HTMLDivElement>( null );
	const itemRefs = useRef<( HTMLButtonElement | null )[]>( [] );
	const [ allLinks, setAllLinks ] = useState<SmartLink[]>( [] );

	useEffect( () => {
		if ( outboundLinks && inboundLinks ) {
			setAllLinks( [ ...outboundLinks, ...inboundLinks ] );
		}
	}, [ inboundLinks, outboundLinks ] );

	/**
	 * Handles the scroll of the sidebar to the active link.
	 *
	 * @since 3.16.0
	 */
	useEffect( () => {
		if ( activeLink ) {
			const activeIndex = allLinks?.findIndex( ( link ) => link.uid === activeLink.uid );
			if ( activeIndex !== undefined && activeIndex !== -1 && sidebarRef.current && itemRefs.current[ activeIndex ] ) {
				const sidebar = sidebarRef.current;
				const activeItem = itemRefs.current[ activeIndex ];

				if ( activeItem ) {
					activeItem.focus();

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
	}, [ activeLink, allLinks ] );

	const label = (
		<span className="smart-linking-menu-label">
			{ __( 'NEW', 'wp-parsely' ) }
			<AiIcon />
		</span>
	);

	return (
		<div className="smart-linking-review-sidebar" ref={ sidebarRef }>
			<div>
				{ outboundLinks && outboundLinks.length > 0 && (
					<>
						<div className="review-sidebar-header">
							{ __( 'Outbound Smart Links', 'wp-parsely' ) }
							<span>{ outboundLinks.length }</span>
						</div>
						{ outboundLinks.map( ( link, index ) => (
							<MenuItem
								key={ link.uid }
								ref={ ( el ) => itemRefs.current[ index ] = el }
								className={ activeLink?.uid === link.uid ? 'is-selected' : '' }
								role="menuitemradio"
								isSelected={ activeLink?.uid === link.uid }
								onClick={ () => setSelectedLink( link ) }
							>
								<span className="smart-linking-menu-item">{ link.text }</span>
								{ ! link.applied && label }
							</MenuItem>
						) ) }
					</>
				) }

				{ inboundLinks && inboundLinks.length > 0 && (
					<>
						<div className="review-sidebar-header">
							{ __( 'Inbound Smart Links', 'wp-parsely' ) }
							<span>{ inboundLinks.length }</span>
						</div>
						{ inboundLinks.map( ( link, index ) => (
							<MenuItem
								key={ link.uid }
								ref={ ( el ) => itemRefs.current[ inboundLinks.length + index ] = el }
								className={ activeLink?.uid === link.uid ? 'is-selected' : '' }
								role="menuitemradio"
								isSelected={ activeLink?.uid === link.uid }
								onClick={ () => setSelectedLink( link ) }
							>
								<span className="smart-linking-menu-item">{ link.post_data?.title }</span>
							</MenuItem>
						) ) }
					</>
				) }
			</div>
		</div>
	);
};

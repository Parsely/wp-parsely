/**
 * External dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { TrafficBoostLink } from '../../../provider';
import { TrafficBoostStore } from '../../../store';
import { LinksList } from '../links-list/links-list';

/**
 * Defines the props structure for InboundLinksTab.
 *
 * @since 3.18.0
 */
interface InboundLinksTabProps {
	onInboundLinkClick?: ( inboundLink: TrafficBoostLink ) => void;
}

/**
 * Component that renders the boost links tab.
 *
 * @since 3.18.0
 *
 * @param {InboundLinksTabProps} props The props for the InboundLinksTab component.
 */
const InboundLinksTab = ( {
	onInboundLinkClick,
}: InboundLinksTabProps ): React.JSX.Element => {
	const {
		selectedLink,
		inboundLinks,
		currentPage,
		itemsPerPage,
	} = useSelect( ( select ) => ( {
		selectedLink: select( TrafficBoostStore ).getSelectedLink(),
		inboundLinks: select( TrafficBoostStore ).getInboundLinks(),
		currentPage: select( TrafficBoostStore ).getInboundLinksPage(),
		itemsPerPage: select( TrafficBoostStore ).getInboundLinksItemsPerPage(),
	} ), [] );

	const {
		setInboundLinksItemsPerPage,
		setInboundLinksPage,
	} = useDispatch( TrafficBoostStore );

	return (
		<LinksList
			links={ inboundLinks }
			onClick={ onInboundLinkClick }
			activeLink={ selectedLink }
			currentPage={ currentPage }
			itemsPerPage={ itemsPerPage }
			onPageChange={ setInboundLinksPage }
			onItemsPerPageChange={ setInboundLinksItemsPerPage }
		/>
	);
};

export default InboundLinksTab;

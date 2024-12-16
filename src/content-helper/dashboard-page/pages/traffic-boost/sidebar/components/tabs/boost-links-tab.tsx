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
 * Defines the props structure for BoostLinksTab.
 *
 * @since 3.18.0
 */
interface BoostLinksTabProps {
	onBoostLinkClick?: ( boostLink: TrafficBoostLink ) => void;
	activeLink: TrafficBoostLink | null;
}

/**
 * Component that renders the boost links tab.
 *
 * @since 3.18.0
 *
 * @param {BoostLinksTabProps} props The props for the BoostLinksTab component.
 */
const BoostLinksTab = ( {
	onBoostLinkClick,
	activeLink,
}: BoostLinksTabProps ): React.JSX.Element => {
	const {
		boostLinks,
		currentPage,
		itemsPerPage,
	} = useSelect( ( select ) => ( {
		boostLinks: select( TrafficBoostStore ).getBoostLinks(),
		currentPage: select( TrafficBoostStore ).getBoostLinksPage(),
		itemsPerPage: select( TrafficBoostStore ).getBoostLinksItemsPerPage(),
	} ), [] );

	const {
		setBoostLinksPage,
		setBoostLinksItemsPerPage,
	} = useDispatch( TrafficBoostStore );

	return (
		<LinksList
			links={ boostLinks }
			onClick={ onBoostLinkClick }
			activeLink={ ! activeLink?.isSuggestion ? activeLink : null }
			currentPage={ currentPage }
			itemsPerPage={ itemsPerPage }
			onPageChange={ setBoostLinksPage }
			onItemsPerPageChange={ setBoostLinksItemsPerPage }
		/>
	);
};

export default BoostLinksTab;

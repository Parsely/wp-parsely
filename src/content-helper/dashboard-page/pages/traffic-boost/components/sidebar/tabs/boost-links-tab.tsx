/**
 * External dependencies
 */
import { useCallback, useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { DashboardProvider } from '../../../../../provider';
import { LinksList } from '../links-list/links-list';
import { InboundSmartLink } from '../../../../../../editor-sidebar/smart-linking/provider';
import { TrafficBoostLink } from '../../../provider';

interface BoostLinksTabProps {
	postId: number;
	inboundLinks: InboundSmartLink[];
	onTotalItemsChange?: ( totalItems: number ) => void;
	onBoostLinkClick?: ( boostLink: TrafficBoostLink ) => void;
}

/**
 * Component that renders the boost links tab.
 *
 * @since 3.18.0
 *
 * @param {BoostLinksTabProps} props The props for the BoostLinksTab component.
 */
const BoostLinksTab = ( {
	postId,
	onTotalItemsChange,
	inboundLinks: initialInboundLinks,
}: BoostLinksTabProps ): React.JSX.Element => {
	const [ inboundLinks, setInboundLinks ] = useState<InboundSmartLink[]>( initialInboundLinks );
	const [ boostLinks, setBoostLinks ] = useState<TrafficBoostLink[]>( [] );

	/**
	 * Fetches the inbound smart links for the post.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const fetchInboundLinks = async () => {
			const fetchedLinks = await DashboardProvider.getInstance().getInboundSmartLinks( postId );
			if ( fetchedLinks.length > 0 ) {
				setInboundLinks( fetchedLinks );
			}
		};

		fetchInboundLinks();
	}, [ postId ] );

	const fetchInboundLinks = useCallback( async ( page: number, perPage: number ) => {
		if ( ! inboundLinks || inboundLinks.length === 0 ) {
			return {
				data: [],
				totalPages: 1,
				totalItems: 0,
			};
		}
		// Get the IDs of the inbound posts.
		const inboundPostIds = inboundLinks.map( ( link ) => link.post_data?.id );

		// Fetch the inbound posts.
		const fetchedLinks = await DashboardProvider.getInstance().getPosts(
			{
				include: inboundPostIds,
				page,
				per_page: perPage,
			}
		);

		// Map the fetched posts to the TrafficBoostLink format.
		const mappedLinks = fetchedLinks.data.map( ( post ) => ( {
			targetPost: post,
		} ) );

		setBoostLinks( mappedLinks );
		onTotalItemsChange?.( fetchedLinks.total_items );

		return {
			data: mappedLinks,
			totalPages: fetchedLinks.total_pages,
			totalItems: fetchedLinks.total_items,
		};
	}, [ inboundLinks, onTotalItemsChange ] );

	return (
		<LinksList
			links={ boostLinks }
			isLoading={ false }
			onSuggestionClick={ () => {} }
			onFetchPage={ fetchInboundLinks }
		/>
	);
};

export default BoostLinksTab;

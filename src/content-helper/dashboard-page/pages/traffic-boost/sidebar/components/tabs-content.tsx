/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { TrafficBoostLink } from '../../provider';
import InboundLinksTab from './tabs/inbound-links-tab';
import SuggestionsTab from './tabs/suggestions-tab';
import { TrafficBoostSidebarTabs, TrafficBoostStore } from '../../store';

/**
 * Defines the props structure for TabsContent.
 *
 * @since 3.18.0
 */
interface TabsContentProps {
	activeTab: { name: string };
	onSuggestionClick?: ( suggestion: TrafficBoostLink ) => void;
	onInboundLinkClick?: ( inboundLink: TrafficBoostLink ) => void;
}

/**
 * Component that renders the content for each tab in the Traffic Boost sidebar.
 *
 * Displays different content based on the active tab:
 * - Suggestions tab shows recommended content to boost
 * - Inbound Links tab shows currently boosted content
 *
 * @since 3.18.0
 *
 * @param {TabsContentProps} props The component's props.
 *
 * @return {JSX.Element} The rendered tab content.
 */
export const TabsContent = ( {
	activeTab,
	onSuggestionClick,
	onInboundLinkClick,
}: TabsContentProps ): JSX.Element => {
	const { selectedLink, selectedTab } = useSelect( ( select ) => ( {
		selectedLink: select( TrafficBoostStore ).getSelectedLink(),
		selectedTab: select( TrafficBoostStore ).getSelectedTab(),
	} ), [] );

	const { setSelectedTab } = useDispatch( TrafficBoostStore );

	/**
	 * Set the selected tab when the active tab changes.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		setSelectedTab( activeTab.name as TrafficBoostSidebarTabs );
	}, [ activeTab, setSelectedTab ] );

	/**
	 * Changes the selected tab depending on the selected link type.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( selectedLink && selectedLink.isSuggestion ) {
			setSelectedTab( TrafficBoostSidebarTabs.SUGGESTIONS );
		} else if ( selectedLink && ! selectedLink.isSuggestion ) {
			setSelectedTab( TrafficBoostSidebarTabs.INBOUND_LINKS );
		}
	}, [ selectedLink, setSelectedTab ] );

	switch ( selectedTab ) {
		case TrafficBoostSidebarTabs.SUGGESTIONS:
			return <SuggestionsTab
				onSuggestionClick={ onSuggestionClick }
			/>;
		case TrafficBoostSidebarTabs.INBOUND_LINKS:
			return <InboundLinksTab
				onInboundLinkClick={ onInboundLinkClick }
			/>;
		default:
			return <div>{ __( 'Select a tab', 'wp-parsely' ) }</div>;
	}
};

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useParams } from 'react-router-dom';
import { TrafficBoostLink } from '../../provider';
import InboundLinksTab from './tabs/inbound-links-tab';
import SettingsTab from './tabs/settings-tab';
import SuggestionsTab from './tabs/suggestions-tab';

/**
 * Defines the props structure for TabsContent.
 *
 * @since 3.18.0
 */
interface TabsContentProps {
	activeTab: { name: string };
	activeLink: TrafficBoostLink | null;
	onSuggestionClick?: ( suggestion: TrafficBoostLink ) => void;
	onInboundLinkClick?: ( inboundLink: TrafficBoostLink ) => void;
}

/**
 * Component that renders the content for each tab in the Traffic Boost sidebar.
 *
 * Displays different content based on the active tab:
 * - Suggestions tab shows recommended content to boost
 * - Boost Links tab shows currently boosted content
 * - Settings tab shows Traffic Boost configuration options
 *
 * @since 3.18.0
 *
 * @param {TabsContentProps} props The component's props.
 *
 * @return {JSX.Element} The rendered tab content.
 */
export const TabsContent = ( {
	activeTab,
	activeLink,
	onSuggestionClick,
	onInboundLinkClick,
}: TabsContentProps ): JSX.Element => {
	const { postId } = useParams();

	if ( ! postId ) {
		return <div>{ __( 'No post ID found', 'wp-parsely' ) }</div>;
	}

	switch ( activeTab.name ) {
		case 'suggestions':
			return <SuggestionsTab
				onSuggestionClick={ onSuggestionClick }
				activeLink={ activeLink }
			/>;
		case 'inbound-links':
			return <InboundLinksTab
				onInboundLinkClick={ onInboundLinkClick }
				activeLink={ activeLink }
			/>;
		case 'settings':
			return <SettingsTab />;
		default:
			return <div>{ __( 'Select a tab', 'wp-parsely' ) }</div>;
	}
};

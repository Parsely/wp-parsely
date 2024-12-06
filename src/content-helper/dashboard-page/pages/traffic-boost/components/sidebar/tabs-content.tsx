/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useParams } from 'react-router-dom';
import { TrafficBoostLink } from '../../provider';
import BoostLinksTab from './tabs/boost-links-tab';
import SettingsTab from './tabs/settings-tab';
import SuggestionsTab from './tabs/suggestions-tab';

/**
 * Defines the props structure for TabsContent.
 *
 * @since 3.18.0
 */
interface TabsContentProps {
	/**
	 * The currently active tab.
	 */
	activeTab: { name: string };

	/**
	 * Callback fired when a suggestion is clicked.
	 */
	onSuggestionClick?: ( suggestion: TrafficBoostLink ) => void;

	/**
	 * Callback fired when a boost link is clicked.
	 */
	onBoostLinkClick?: ( boostLink: TrafficBoostLink ) => void;
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
	onSuggestionClick,
	onBoostLinkClick,
}: TabsContentProps ): JSX.Element => {
	const { postId } = useParams();

	if ( ! postId ) {
		return <div>{ __( 'No post ID found', 'wp-parsely' ) }</div>;
	}

	switch ( activeTab.name ) {
		case 'suggestions':
			return <SuggestionsTab
				onSuggestionClick={ onSuggestionClick }
			/>;
		case 'boost-links':
			return <BoostLinksTab
				onBoostLinkClick={ onBoostLinkClick }
			/>;
		case 'settings':
			return <SettingsTab />;
		default:
			return <div>{ __( 'Select a tab', 'wp-parsely' ) }</div>;
	}
};

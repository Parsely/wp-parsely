/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
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
    activeTab: { name: string };
	totalSuggestions: number;
	totalBoostLinks: number;
	onSuggestionClick?: ( suggestion: TrafficBoostLink ) => void;
	onTotalItemsChange?: ( totalItems: number ) => void;
}

/**
 * Component that renders the content for each tab, depending on the active tab.
 *
 * @param {TabsContentProps} props Component props.
 * @since 3.18.0
 */
export const TabsContent = ( {
	activeTab,
	onSuggestionClick,
	onTotalItemsChange,
}: TabsContentProps ): React.JSX.Element => {
	switch ( activeTab.name ) {
		case 'suggestions':
			return <SuggestionsTab
				onSuggestionClick={ onSuggestionClick }
				onTotalItemsChange={ onTotalItemsChange }
			/>;
		case 'boost-links':
			return <BoostLinksTab />;
		case 'settings':
			return <SettingsTab />;
		default:
			return <div>{ __( 'Select a tab', 'wp-parsely' ) }</div>;
	}
};

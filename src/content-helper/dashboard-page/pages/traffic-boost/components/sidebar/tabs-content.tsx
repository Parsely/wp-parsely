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
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { InboundSmartLink } from '../../../../../editor-sidebar/smart-linking/provider';
import { DashboardProvider } from '../../../../provider';

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
	onTotalItemsChange?: ( totalSuggestions: number, totalBoostLinks: number ) => void;
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
	const { postId } = useParams();
	const [ currentPostId, setCurrentPostId ] = useState<number>( 0 );
	const [ totalSuggestions, setTotalSuggestions ] = useState<number>( 0 );
	const [ totalBoostLinks, setTotalBoostLinks ] = useState<number>( 0 );
	const [ inboundLinks, setInboundLinks ] = useState<InboundSmartLink[]>( [] );

	/**
	 * Calls the onTotalItemsChange callback with the current total suggestions
	 * and boost links.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		onTotalItemsChange?.( totalSuggestions, totalBoostLinks );
	}, [ totalSuggestions, totalBoostLinks, onTotalItemsChange ] );

	useEffect( () => {
		// Update the current post ID if the post ID changes.
		if ( postId ) {
			setCurrentPostId( parseInt( postId ) );
		}

		if ( 0 === currentPostId ) {
			return;
		}

		const fetchInboundLinks = async () => {
			const fetchedLinks = await DashboardProvider.getInstance().getInboundSmartLinks( currentPostId );
			setInboundLinks( fetchedLinks );
		};

		fetchInboundLinks();
	}, [ currentPostId, postId ] );

	useEffect( () => {
		setTotalBoostLinks( inboundLinks.length );
	}, [ inboundLinks ] );

	/**
	 * Handles the total items change for the suggestions tab.
	 *
	 * Avoids unnecessary re-renders by using useCallback.
	 *
	 * @since 3.18.0
	 */
	const handleSuggestionsTotalItemsChange = useCallback( ( totalItems: number ) => {
		setTotalSuggestions( totalItems );
	}, [] );

	/**
	 * Handles the total items change for the boost links tab.
	 *
	 * Avoids unnecessary re-renders by using useCallback.
	 *
	 * @since 3.18.0
	 */
	const handleBoostLinksTotalItemsChange = useCallback( ( totalItems: number ) => {
		setTotalBoostLinks( totalItems );
	}, [] );

	if ( ! postId ) {
		return <div>{ __( 'No post ID found', 'wp-parsely' ) }</div>;
	}

	switch ( activeTab.name ) {
		case 'suggestions':
			return <SuggestionsTab
				onSuggestionClick={ onSuggestionClick }
				onTotalItemsChange={ handleSuggestionsTotalItemsChange }
			/>;
		case 'boost-links':
			return <BoostLinksTab
				inboundLinks={ inboundLinks }
				postId={ currentPostId }
				onTotalItemsChange={ handleBoostLinksTotalItemsChange }
			/>;
		case 'settings':
			return <SettingsTab />;
		default:
			return <div>{ __( 'Select a tab', 'wp-parsely' ) }</div>;
	}
};

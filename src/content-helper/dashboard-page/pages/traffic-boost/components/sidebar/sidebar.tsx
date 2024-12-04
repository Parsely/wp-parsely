/**
 * WordPress dependencies
 */
import { Icon, Spinner, TabPanel } from '@wordpress/components';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { settings } from '@wordpress/icons';
import { useNavigate } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { HydratedPost } from '../../../../../common/base-wordpress-provider';
import { TrafficBoostLink } from '../../provider';
import { SidebarFooter } from './footer';
import { SidebarHeader } from './header';
import { SidebarIcons } from './icons';
import { PostDetailsSidebar } from './post-details';
import './sidebar.scss';
import { TabsContent } from './tabs-content';

/**
 * Defines the props structure for TrafficBoostSidebar.
 *
 * @since 3.18.0
 */
interface TrafficBoostSidebarProps {
    isLoading: boolean;
    post: HydratedPost | null;
    onSuggestionClick?: ( suggestion: TrafficBoostLink ) => void;
}

/**
 * Sidebar component for the Traffic Boost feature.
 * Displays post details, stats, and manages boost links functionality.
 *
 * @since 3.18.0
 *
 * @param {TrafficBoostSidebarProps} props Component props.
 */
export const TrafficBoostSidebar = ( {
	isLoading,
	post,
	onSuggestionClick,
}: TrafficBoostSidebarProps ): React.JSX.Element => {
	const navigate = useNavigate();

	const [ numSuggestions, setNumSuggestions ] = useState( 0 );
	const [ numBoostLinks, setNumBoostLinks ] = useState( 0 );

	/**
	 * Handles tab counters in the UI.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const updateTabCount = (
			tabSelector: string,
			count: number
		) => {
			const tab = document.querySelector( tabSelector );
			if ( ! tab || count <= 0 ) {
				return;
			}

			let counter = tab.querySelector( '.tab-count' ) as HTMLElement;
			if ( ! counter ) {
				counter = document.createElement( 'span' );
				counter.className = 'tab-count';
				tab.appendChild( counter );
			}
			counter.textContent = count.toString();
		};

		updateTabCount( '.components-tab-panel__tabs-item.suggestions-tab', numSuggestions );
		updateTabCount( '.components-tab-panel__tabs-item.boost-links-tab', numBoostLinks );
	}, [ numBoostLinks, numSuggestions ] );

	/**
	 * Handles the total items change for suggestions.
	 *
	 * This needs to be a callback to prevent triggering duplicate calls to the API.
	 *
	 * @since 3.18.0
	 *
	 * @param {number} totalSuggestions The total number of suggestions.
	 * @param {number} totalBoostLinks  The total number of boost links.
	 */
	const handleTotalItemsChange = useCallback( ( totalSuggestions: number, totalBoostLinks: number ) => {
		setNumSuggestions( totalSuggestions );
		setNumBoostLinks( totalBoostLinks );
	}, [] );

	return (
		<div className="traffic-boost-sidebar">
			<SidebarHeader onBackClick={ () => navigate( '/traffic-boost' ) } />

			<div className="traffic-boost-sidebar-content">
				{ isLoading ? (
					<Spinner />
				) : post && (
					<>
						<div className="traffic-boost-sidebar-inner">
							<PostDetailsSidebar post={ post } />
							<SidebarIcons />
						</div>
						<TabPanel
							className="traffic-boost-sidebar-tabs"
							tabs={ [
								{
									name: 'suggestions',
									title: __( 'Suggestions', 'wp-parsely' ),
									className: 'traffic-boost-tab suggestions-tab',
								},
								{
									name: 'boost-links',
									title: __( 'Boost Links', 'wp-parsely' ),
									className: 'traffic-boost-tab boost-links-tab',
								},
								{
									name: 'settings',
									title: '',
									className: 'traffic-boost-tab settings-tab icon-only-tab',
									icon: <Icon icon={ settings } size={ 24 } />,
								},
							] }
						>
							{ ( tab ) => <TabsContent
								activeTab={ tab }
								totalSuggestions={ numSuggestions }
								totalBoostLinks={ numBoostLinks }
								onSuggestionClick={ onSuggestionClick }
								onTotalItemsChange={ handleTotalItemsChange }
							/> }
						</TabPanel>
					</>
				) }
			</div>
			<SidebarFooter />
		</div>
	);
};

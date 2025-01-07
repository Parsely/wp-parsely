/**
 * WordPress dependencies
 */
import { Spinner, TabPanel } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useNavigate } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { TrafficBoostLink } from '../provider';
import { TrafficBoostSidebarTabs, TrafficBoostStore } from '../store';
import { SidebarHeader } from './components/header';
import { TabsContent } from './components/tabs-content';
import './sidebar.scss';

/**
 * Defines the props structure for TrafficBoostSidebar.
 *
 * @since 3.18.0
 */
interface TrafficBoostSidebarProps {
    isLoading: boolean;
    onLinkClick?: ( link: TrafficBoostLink ) => void;
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
	onLinkClick,
}: TrafficBoostSidebarProps ): React.JSX.Element => {
	const navigate = useNavigate();

	// Get state from store
	const {
		post,
		selectedTab,
		suggestions,
		inboundLinks,
	} = useSelect( ( select ) => ( {
		post: select( TrafficBoostStore ).getCurrentPost(),
		selectedTab: select( TrafficBoostStore ).getSelectedTab(),
		suggestions: select( TrafficBoostStore ).getSuggestions(),
		inboundLinks: select( TrafficBoostStore ).getInboundLinks(),
	} ), [] );

	// Get dispatch actions
	const { setSelectedTab } = useDispatch( TrafficBoostStore );

	/**
	 * Handles tab counters updates in the UI.
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

		updateTabCount( '.components-tab-panel__tabs-item.suggestions-tab', suggestions.length );
		updateTabCount( '.components-tab-panel__tabs-item.inbound-links-tab', inboundLinks.length );
	}, [ inboundLinks, inboundLinks.length, suggestions.length ] );

	/**
	 * Whenever the selected tab changes, selects it by simulating a click.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const tab = document.querySelector( `.traffic-boost-sidebar-tabs .${ selectedTab }-tab` ) as HTMLElement;
		if ( tab ) {
			tab.click();
		}
	}, [ selectedTab ] );

	if ( ! post || isLoading ) {
		return <Spinner />;
	}

	return (
		<div className="traffic-boost-sidebar">
			<SidebarHeader onBackClick={ () => navigate( '/traffic-boost' ) } post={ post } />

			<div className="traffic-boost-sidebar-content">
				<TabPanel
					className="traffic-boost-sidebar-tabs"
					tabs={ [
						{
							name: TrafficBoostSidebarTabs.SUGGESTIONS,
							title: __( 'Link Suggestions', 'wp-parsely' ),
							className: 'traffic-boost-tab suggestions-tab',
						},
						{
							name: TrafficBoostSidebarTabs.INBOUND_LINKS,
							title: __( 'Inbound Links', 'wp-parsely' ),
							className: 'traffic-boost-tab inbound-links-tab',
						},
					] }
					onSelect={ ( tab: string ) => setSelectedTab( tab as TrafficBoostSidebarTabs ) }
				>
					{ ( tab ) => <TabsContent
						activeTab={ tab }
						onSuggestionClick={ onLinkClick }
						onInboundLinkClick={ onLinkClick }
					/> }
				</TabPanel>
			</div>
		</div>
	);
};

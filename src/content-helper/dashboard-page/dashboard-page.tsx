/**
 * External dependencies
 */
import {
	Route,
	HashRouter as Router,
	Routes,
	useLocation,
} from 'react-router-dom';

/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { createRoot, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { DashboardPage, SettingsPage, TrafficBoostPage } from './pages';

domReady( () => {
	const root = createRoot(
		document.getElementById( 'parsely-dashboard-page' ) as Element
	);

	root.render(
		<Router>
			<ParselyDashboard />
		</Router>
	);
} );

/**
 * Main component for the Parse.ly dashboard.
 *
 * @since 3.18.0
 *
 * @class
 */
const ParselyDashboard = () => {
	const location = useLocation();

	/**
	 * Replaces the first link to have the hash router link.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const firstLink = document.querySelector(
			'#toplevel_page_parsely-dashboard-page .wp-submenu li a.wp-first-item'
		);
		if ( firstLink ) {
			firstLink.setAttribute(
				'href', window.location.pathname + window.location.search + '#/'
			);
		}
	}, [] );

	/**
	 * Changes the submenus highlight based on the current page.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const submenuItems = document.querySelectorAll(
			'#toplevel_page_parsely-dashboard-page .wp-submenu li'
		);

		submenuItems.forEach( ( item ) => {
			const link = item.querySelector( 'a' );
			const hashPath = link?.getAttribute( 'href' )?.split( '#' )[ 1 ];

			if ( hashPath === location.pathname ) {
				item.classList.add( 'current' );
				link?.blur();
			} else {
				item.classList.remove( 'current' );
			}
		} );
	}, [ location ] );

	return (
		<Routes>
			<Route path="/" element={ <DashboardPage /> } />
			<Route path="/traffic-boost" element={ <TrafficBoostPage /> } />
			<Route path="/settings" element={ <SettingsPage /> } />
		</Routes>
	);
};


/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

domReady( () => {
	const root = createRoot(
		document.getElementById( 'parsely-dashboard-page' ) as Element
	);

	root.render(
		<>
			<h1>Parse.ly</h1>
			<p>Welcome to the Parse.ly Dashboard page!</p>
		</>
	);
} );

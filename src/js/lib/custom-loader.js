import { createHooks } from '@wordpress/hooks';

window.wpParselyHooks = createHooks();

export function wpParselyInitCustom() {
	const customOnLoad = () => window.wpParselyHooks.doAction('wpParselyOnLoad');

	if ( typeof window.PARSELY === 'object' ) {
		if ( typeof window.PARSELY.onload !== 'function' ) {
			window.PARSELY.onload = customOnLoad;
			return;
		}

		const oldOnLoad = window.PARSELY.onload;
		window.PARSELY.onload = function() {
			if ( oldOnLoad ) {
				oldOnLoad();
			}
			customOnLoad();
		};
		return;
	}

	window.PARSELY = {
		onload: customOnLoad,
	};
}

wpParselyInitCustom();

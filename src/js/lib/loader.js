import { createHooks } from '@wordpress/hooks';

window.wpParselyHooks = createHooks();

export function wpParselyInitCustom() {
	/**
	 * The `wpParselyOnLoad` hook gets called with the `onLoad` event of the `window.PARSELY` object.
	 * All functions enqueued on that hook will be executed on that event according to their priorities. Those
	 * functions should not expect any parameters and shouldn't return any.
	 */
	const customOnLoad = () => window.wpParselyHooks.doAction( 'wpParselyOnLoad' );

	// Constructing window.PARSELY object.
	if ( typeof window.PARSELY === 'object' ) {
		if ( typeof window.PARSELY.onload !== 'function' ) {
			window.PARSELY.onload = customOnLoad;
		} else {
			const oldOnLoad = window.PARSELY.onload;
			window.PARSELY.onload = function() {
				if ( oldOnLoad ) {
					oldOnLoad();
				}
				customOnLoad();
			};
		}
	} else {
		window.PARSELY = {
			onload: customOnLoad,
		};
	}

	// Disabling autotrack if it was defined as such from PHP.
	if ( window.wpParselyDisableAutotrack === true ) {
		window.PARSELY.autotrack = false;
	}
}

wpParselyInitCustom();

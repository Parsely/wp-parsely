export function wpParselyInitCustom() {
	const customOnLoad = () => {
		if ( Array.isArray( wpParselyCustomFunctions ) ) {
			wpParselyCustomFunctions.forEach( ( f ) => {
				if ( typeof f === 'function' ) {
					f();
				}
			} );
		}
	};

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

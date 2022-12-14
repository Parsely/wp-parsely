// Only enqueuing the action if the site has a defined Site ID.
if ( typeof window.wpParselySiteId !== 'undefined' ) {
	window.wpParselyHooks.addAction( 'wpParselyOnLoad', 'wpParsely', uuidProfileCall );
}

async function uuidProfileCall() {
	const uuid = global.PARSELY?.config?.parsely_site_uuid;

	if ( ! ( window.wpParselySiteId && uuid ) ) {
		return;
	}

	const url = `https://api.parsely.com/v2/profile?apikey=${ encodeURIComponent(
		window.wpParselySiteId
	) }&uuid=${ encodeURIComponent( uuid ) }&url=${ encodeURIComponent( window.location.href ) }`;

	return fetch( url );
}

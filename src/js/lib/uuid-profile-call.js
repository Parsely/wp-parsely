// Only enqueuing the action if the site has a defined Site ID.
if ( typeof window.wpParselySiteID !== 'undefined' ) {
	window.wpParselyHooks.addAction( 'wpParselyOnLoad', 'wpParsely', uuidProfileCall );
}

async function uuidProfileCall() {
	const uuid = global.PARSELY?.config?.parsely_site_uuid;

	if ( ! ( window.wpParselySiteID && uuid ) ) {
		return;
	}

	const url = `https://api.parsely.com/v2/profile?apikey=${ encodeURIComponent(
		window.wpParselySiteID
	) }&uuid=${ encodeURIComponent( uuid ) }&url=${ encodeURIComponent( window.location.href ) }`;

	return fetch( url );
}

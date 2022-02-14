window.wpParselyHooks.addAction( 'wpParselyOnLoad', 'wpParsely', uuidProfileCall );

async function uuidProfileCall() {
	const apikey = global.wpParsely?.apikey;
	const uuid = global.PARSELY?.config?.parsely_site_uuid;

	if ( ! ( apikey && uuid ) ) {
		return;
	}

	const url = `https://api.parsely.com/v2/profile?apikey=${ encodeURIComponent(
		apikey
	) }&uuid=${ encodeURIComponent( uuid ) }&url=${ encodeURIComponent( window.location.href ) }`;

	return fetch( url );
}

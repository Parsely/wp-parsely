function uuidProfileCall( { apikey, uuid } ) {
	const profileScript = document.createElement( 'script' );
	profileScript.src = `https://api.parsely.com/v2/profile?apikey=${ encodeURIComponent(
		apikey
	) }&uuid=${ uuid || '' }&url=${ window.location.href }&callback=&_=${ +new Date() }`;
	document.querySelector( 'head' ).appendChild( profileScript );
}

export function initApi() {
	if ( typeof global.wpParsely !== 'object' ) {
		return;
	}

	const { apikey } = global.wpParsely;

	if ( ! apikey ) {
		return;
	}

	if ( typeof global.PARSELY === 'object' ) {
		const oldonload = global.PARSELY.onload;
		if ( typeof global.PARSELY.onload !== 'function' ) {
			global.PARSELY.onload = uuidProfileCall;
			return;
		}
		global.PARSELY.onload = function() {
			if ( oldonload ) {
				oldonload();
			}
			uuidProfileCall( { apikey, uuid: global.PARSELY.config.parsely_site_uuid } );
		};
		return;
	}

	global.PARSELY = {
		onload: uuidProfileCall,
	};
}

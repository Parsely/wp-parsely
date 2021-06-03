import apiFetch from '@wordpress/api-fetch';

const SETTINGS_PATH = '/wp-parsely/v1/settings';

export const fetchSettings = ( callback ) => {
	apiFetch( { path: SETTINGS_PATH } )
		.then( ( settings ) => {
			callback( settings );
		} )
		.catch( ( err ) => callback( err ) );
};

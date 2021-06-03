import apiFetch from '@wordpress/api-fetch';

const SETTINGS_PATH = '/wp-parsely/v1/settings';

export const fetchSettings = ( callback ) => {
	apiFetch( { path: SETTINGS_PATH } )
		.then( ( settings ) => {
			callback( settings );
		} )
		.catch( ( err ) => callback( err ) );
};

export const saveSettingsToServer = ( settings, callback ) => {
	apiFetch( {
		path: SETTINGS_PATH,
		method: 'POST',
		data: { settings },
	} )
		.then( ( savedSettings ) => {
			callback( savedSettings );
		} )
		.catch( ( err ) => callback( err ) );
};

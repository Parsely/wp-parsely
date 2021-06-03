import apiFetch from '@wordpress/api-fetch';

const SETTINGS_PATH = '/wp-parsely/v1/settings';

export const fetchSettings = async () => apiFetch( { path: SETTINGS_PATH } );

export const saveSettingsToServer = async ( settings ) =>
	apiFetch( {
		path: SETTINGS_PATH,
		method: 'POST',
		data: { settings },
	} );

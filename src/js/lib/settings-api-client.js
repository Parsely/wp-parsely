/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { PSEUDO_BOOLEAN_SETTINGS } from './admin-page/constants';

const SETTINGS_PATH = '/wp-parsely/v1/settings';

export const fetchSettings = async () => apiFetch( { path: SETTINGS_PATH } );

export const saveSettingsToServer = async ( settings ) => {
	// The validation for these settings requires them to be sent as strings: "true" or "false"
	const formattedSettings = PSEUDO_BOOLEAN_SETTINGS.reduce(
		( accumulator, value ) => ( { ...accumulator, [ value ]: settings[ value ] ? 'true' : 'false' } ),
		{}
	);

	return apiFetch( {
		path: SETTINGS_PATH,
		method: 'POST',
		data: { settings: { ...settings, ...formattedSettings } },
	} );
};

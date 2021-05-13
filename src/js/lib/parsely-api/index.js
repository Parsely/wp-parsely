import { addQueryArgs } from '@wordpress/url';

export const PARSELY_API_BASE = 'https://api.parsely.com/v2/';

export const apiUrl = ( path, queryArgs ) => addQueryArgs( `${ PARSELY_API_BASE }${ path }`, queryArgs );

export const fetchApi = async ( path, queryArgs = {}, fetchInit ) => {
	const apikey = global.wpParsely?.apikey;
	const url = apiUrl( path, { apikey, ...queryArgs } );
	const response = await fetch( url, fetchInit );
	return response.json();
};

export const fetchRelated = async ( queryArgs = {} ) => fetchApi( 'related', queryArgs );

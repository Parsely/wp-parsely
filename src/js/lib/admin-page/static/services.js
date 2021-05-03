export const fetchSettings = ( callback ) => {
	fetch( '/wp-json/wp-parsely/v1/settings' )
		.then( res => res.json() )
		.then( settings => {
			callback( settings );
		} )
		.catch( err => callback( err ) );
};

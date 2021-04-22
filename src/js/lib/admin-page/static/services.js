export const fetchSettings = ( callback ) => {
	fetch( '/wp-json/wp-parsely/v1/settings' )
		.then( res => res.json() )
		.then( settings => {
			let holderArray = [];
			// transform json object into array of k/v pairs for component mapping
			Object.keys(settings).forEach(setting => {
				holderArray.push({[setting]: settings[setting]});
			});
			callback(holderArray);
		} )
		.catch( err => callback( err ) );
};

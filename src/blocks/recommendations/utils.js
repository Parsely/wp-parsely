export const maybeDecodeJSON = ( valueToTry ) => {
	if ( 'string' !== typeof valueToTry || valueToTry?.length < 1 ) {
		return valueToTry;
	}
	try {
		return JSON.parse( valueToTry );
	} catch ( e ) {
		return valueToTry;
	}
};

export default { maybeDecodeJSON };

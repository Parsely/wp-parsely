const Setting = ( setting ) => {
	let inputType;
	if ( typeof ( setting[ Object.keys( setting )[ 0 ] ] ) === 'string' ) {
		inputType = 'text';
	} else if ( typeof ( setting[ Object.keys( setting )[ 0] ] ) === 'boolean' ) {
		inputType = 'radio';
	} else if ( typeof ( setting[ Object.keys( setting )[ 0 ] ] ) === 'object' ) {
		inputType = 'textarea';
	}

	return <li>{ Object.keys( setting )[ 0 ] }: <input type={ inputType } value={ setting[ Object.keys( setting )[ 0 ] ] } /></li>
};
export default Setting;

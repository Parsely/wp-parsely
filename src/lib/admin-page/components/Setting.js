import Input from './Input';
import Select from './Select';

const Setting = ( setting ) => {
	let inputType;
	if ( typeof ( setting[ Object.keys( setting )[ 0 ] ] ) === 'string' ) {
		inputType = <Input type="text" value={setting[ Object.keys( setting )[ 0 ] ]} checked="" />;
	} else if ( typeof ( setting[ Object.keys( setting )[ 0 ] ] ) === 'boolean' ) {
		// figure out true/false logic
		inputType = <Input type="checkbox" checked={setting[ Object.keys( setting )[ 0 ] ]} />;
	} else if ( typeof ( setting[ Object.keys( setting )[ 0 ] ] ) === 'object' ) {
		// figure out select/option stuff
		inputType = <Select values={setting[ Object.keys( setting )[ 0 ] ]} />;
	}

	return <li>{ Object.keys( setting )[ 0 ] }: { inputType }</li>;
};
export default Setting;
// <input type={ inputType } value={ setting[ Object.keys( setting )[ 0 ] ] }

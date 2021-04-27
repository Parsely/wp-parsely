import Input from './Input';
import Select from './Select';

const Setting = ( setting ) => {
	let input;
	if ( typeof ( setting[ Object.keys( setting )[ 0 ] ] ) === 'string' ) {
		input = <Input type="text" value={setting[ Object.keys( setting )[ 0 ] ]} checked="" />;
	} else if ( typeof ( setting[ Object.keys( setting )[ 0 ] ] ) === 'boolean' ) {
		input = <Input type="checkbox" checked={setting[ Object.keys( setting )[ 0 ] ]} />;
	} else if ( typeof ( setting[ Object.keys( setting )[ 0 ] ] ) === 'object' ) {
		input = <Select values={ setting[ Object.keys( setting )[ 0 ] ] } />;
	}

	return <li>{ Object.keys( setting )[ 0 ] }: { input }</li>;
};
export default Setting;

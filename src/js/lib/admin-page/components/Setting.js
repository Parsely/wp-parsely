import Input from './Input';
import Select from './Select';

const Setting = ( { setting, onChange } ) => {
	let input;
	if ( typeof setting[ Object.keys( setting )[ 0 ] ] === 'string' ) {
		input = (
			<Input
				type="text"
				name={ Object.keys( setting )[ 0 ] }
				value={ setting[ Object.keys( setting )[ 0 ] ] }
				onChange={ onChange }
			/>
		);
	} else if ( typeof setting[ Object.keys( setting )[ 0 ] ] === 'boolean' ) {
		input = (
			<Input
				type="checkbox"
				name={ Object.keys( setting )[ 0 ] }
				checked={ setting[ Object.keys( setting )[ 0 ] ] }
				onChange={ onChange }
			/>
		);
	} else if ( typeof setting[ Object.keys( setting )[ 0 ] ] === 'object' ) {
		input = <Select values={ setting[ Object.keys( setting )[ 0 ] ] } />;
	}

	return (
		<div>
			<label>{ Object.keys( setting )[ 0 ] }</label> { input }
		</div>
	);
};
export default Setting;

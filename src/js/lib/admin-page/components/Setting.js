import Input from './Input';
import Select from './Select';

const Setting = ( { note, setting, onChange } ) => {
	let input;
	if ( typeof setting[ Object.keys( setting )[ 0 ] ] === 'string' ) {
		input = (
			<Input
				type="text"
				name={ Object.keys( setting ) }
				value={ setting[ Object.keys( setting )[ 0 ] ] }
				onChange={ onChange }
			/>
		);
	} else if ( typeof setting[ Object.keys( setting )[ 0 ] ] === 'boolean' ) {
		input = (
			<Input
				type="checkbox"
				name={ Object.keys( setting ) }
				checked={ setting[ Object.keys( setting )[ 0 ] ] }
				onChange={ onChange }
			/>
		);
	} else if ( typeof setting[ Object.keys( setting )[ 0 ] ] === 'object' ) {
		input = <Select
			values={ setting[ Object.keys( setting )[ 0 ] ] }
			name={ Object.keys( setting )[ 0 ] }
			onChange={ onChange }
		/>;
	}

	return (
		<div>
			<label>{ Object.keys( setting ) }</label> { input }
			<p>{note}</p>
		</div>
	);
};
export default Setting;

import Input from './Input';
import Select from './Select';

const Setting = ( { setting, onChange } ) => {
	let input;
	if ( typeof setting[ Object.keys( setting )[ 0 ] ] === 'string' ) {
		console.log("new setting", setting)
		input = (
			<Input
				type="text"
				name={ Object.keys( setting ) }
				value={ setting }
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
		</div>
	);
};
export default Setting;

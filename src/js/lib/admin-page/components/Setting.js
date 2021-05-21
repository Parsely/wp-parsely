import Input from './Input';
import Select from './Select';

const Setting = ( { note, setting, onChange, label } ) => {
	let input;
	if ( typeof setting[ Object.keys( setting )[ 0 ] ] === 'string' ) {
		input = (
			<Input
				className="text-input"
				type="text"
				name={ Object.keys( setting ) }
				value={ setting[ Object.keys( setting )[ 0 ] ] }
				onChange={ onChange }
			/>
		);
	} else if ( typeof setting[ Object.keys( setting )[ 0 ] ] === 'boolean' ) {
		input = (
			<Input
				className="checkbox-input"
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
		<div className="setting-item--container">
			<div className="setting-item">
				<div className="setting-item--label">
					<label>{ label }</label>
				</div>
				<div className="setting-item--control">
					{ input }
					<p>{note}</p>
				</div>
			</div>
		</div>
	);
};
export default Setting;

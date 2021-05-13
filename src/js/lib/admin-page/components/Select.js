import Option from './Option';

const Select = ( { values, name, onChange } ) => (
	<select value={values[0]} name={name} onChange={onChange}>
		{ values.map( ( option ) => (
			<Option option={ option } />
		) ) }
	</select>
);

export default Select;

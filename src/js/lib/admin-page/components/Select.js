import Option from './Option';

const Select = ( { values } ) => (
	<select>
		{ values.map( ( option ) => (
			<Option option={ option } />
		) ) }
	</select>
);

export default Select;

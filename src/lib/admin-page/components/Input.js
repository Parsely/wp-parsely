import { useState } from '@wordpress/element';

const Input = ( { type, checked, value } ) => {
	const [boolean, setBoolean] = useState(checked);
	const [inputVal, setInputVal] = useState(null);

	const onInputChange = e => {
		if ( type == "checkbox" ) {
			setBoolean(!boolean)
		} else if ( type == "text" ) {
			setInputVal(e.target.value)
		}
	}

	return ( <input type={type} checked={boolean} value={value} onChange={onInputChange} /> );
}

export default Input;

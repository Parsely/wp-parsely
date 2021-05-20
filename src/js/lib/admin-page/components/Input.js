const Input = ( { type, name, checked, value, onChange, className } ) => (
	<input className={ className } type={ type } name={ name } checked={ checked } value={ value } onChange={ onChange } />
);

export default Input;

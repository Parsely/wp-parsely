const Input = ( { type, name, checked, value, onChange } ) => (
	<input type={type} name={name} checked={checked} value={value} onChange={onChange} />
);

export default Input;

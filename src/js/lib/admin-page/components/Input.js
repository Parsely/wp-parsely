const Input = ( { type, name, checked, value, onChange, className } ) => (
	<label>
		<input className={ className }
			   type={ type } name={ name }
			   checked={ checked }
			   value={ value }
			   onChange={ ( e ) => onChange( e ) }
		/>
	</label>
);

export default Input;

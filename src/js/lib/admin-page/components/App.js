import { useState } from '@wordpress/element';

import { fetchSettings } from '../static/services';
import Setting from './Setting';

const App = () => {
	const [ settings, setSettings ] = useState( null );

	if ( ! settings ) {
		fetchSettings( setSettings );
	}

	const handleInputChange = ( e ) => {
		const oldSetting = settings[ e.target.name ];
		const newValue = e.target.type === 'checkbox' ? ! oldSetting : e.target.value;
		setSettings( { ...settings, [ e.target.name ]: newValue } );
	};

	const handleFormSubmit = ( e ) => {
		e.preventDefault();
		// send form data to php somehow
	};

	return (
		<form onSubmit={ ( e ) => handleFormSubmit( e ) }>
			{ settings ? (
				Object.keys( settings ).map( ( setting ) => (
					<Setting setting={ { [ setting ]: settings[ setting ] } } onChange={ handleInputChange } />
				) )
			) : (
				<h1>Salut Monde!</h1>
			) }
			<input type="submit" className="button-primary" value="do the thing!" />
		</form>
	);
};

export default App;

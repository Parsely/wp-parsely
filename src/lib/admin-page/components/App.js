import { useState } from '@wordpress/element';
import { fetchSettings } from '../static/services';

const App = () => {
	const [ settings, setSettings ] = useState( null );

	if ( !settings ) {
		fetchSettings(setSettings);
	}

	return <h1>Salut Monde!</h1>;
};

export default App;

import { useState } from '@wordpress/element';

import { fetchSettings } from '../static/services';
import Setting from './Setting';

const App = () => {
	const [ settings, setSettings ] = useState( null );

	if ( ! settings ) {
		fetchSettings( setSettings );
	}

	return (
		<ul>
			{
				settings ? settings.map(setting => <Setting { ...setting } /> ) : <h1>Salut Monde!</h1>
			}
		</ul>
	)
};

export default App;

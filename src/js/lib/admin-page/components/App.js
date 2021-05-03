import { useState } from '@wordpress/element';

import { fetchSettings } from '../static/services';
import Setting from './Setting';

const App = () => {
	const [ settings, setSettings ] = useState( null );

	if ( ! settings ) {
		fetchSettings( setSettings );
	}

	const handleInputChange = e => {
		const oldSetting = settings[e.target.name];
		console.log(oldSetting)
		const newValue = e.target.type === "checkbox" ? !oldSetting : e.target.value;
		setSettings({...settings, [e.target.name]: newValue})
	}

	return (
		<form>
			{
				settings ? Object.keys(settings).map(setting =>
					<Setting setting={{[setting]: settings[setting]}} onChange={handleInputChange} /> ) : <h1>Salut Monde!</h1>
			}
		</form>
	)
};

export default App;

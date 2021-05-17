import { useState } from '@wordpress/element';

import { fetchSettings } from '../static/services';
import Setting from './Setting';

const App = () => {
	const [ settings, setSettings ] = useState( null );
	const [currentTab, setCurrentTab] = useState( "general" )

	if ( ! settings ) {
		fetchSettings( setSettings );
	}

	const handleInputChange = ( e ) => {
		const oldSetting = settings[ e.target.name ];
		const newValue = e.target.type === 'checkbox' ? ! oldSetting : e.target.value;
		setSettings( { ...settings, [ e.target.name ]: newValue } );
	};

	const displayDiv = (divClass, currentState) => divClass == currentState ? '':'none';

	const handleFormSubmit = ( e ) => {
		e.preventDefault();
		// send form data to php somehow
	};
	// explicitly list each setting
	// group by tab in different divs
	return (
		<div className="settings-container">
			<nav className="controls">
				<ul>
					<li onClick={() => setCurrentTab("general")}>
						General
					</li>
					<li onClick={() => setCurrentTab("advanced")}>
						Advanced
					</li>
					<li onClick={() => setCurrentTab("debug")}>
						Debug
					</li>
				</ul>
			</nav>
			<form onSubmit={ ( e ) => handleFormSubmit( e ) }>
				{ settings ? (
					<div className="settings-holder">
						<div className="general" style={{display:displayDiv("general", currentTab)}}>
							<Setting setting={{apikey: settings["apikey"]}} onChange={handleInputChange} />
							<Setting setting={{apiSecret: "no secret given"}} onChange={handleInputChange} />
							<Setting setting={{logo: settings["logo"]}} onChange={handleInputChange} />
						</div>
						<div className="advanced" style={{display:displayDiv("advanced", currentTab)}}>
							<Setting setting={{meta_type: settings["meta_type"]}} onChange={handleInputChange} />
							<Setting setting={{custom_taxonomy_section: settings["custom_taxonomy_section"]}} onChange={handleInputChange} />
							<Setting setting={{content_id_prefix: settings["content_id_prefix"]}} onChange={handleInputChange} />
							<Setting setting={{disable_javascript: settings["disable_javascript"]}} onChange={handleInputChange} />
							<Setting setting={{disable_amp: settings["disable_amp"]}} onChange={handleInputChange} />
							<Setting setting={{use_top_level_cats: settings["use_top_level_cats"]}} onChange={handleInputChange} />
							<Setting setting={{cats_as_tags: settings["cats_as_tags"]}} onChange={handleInputChange} />
							<Setting setting={{track_authenticated_users: settings["track_authenticated_users"]}} onChange={handleInputChange} />
							<Setting setting={{lowercase_tags: settings["lowercase_tags"]}} onChange={handleInputChange} />
							<Setting setting={{force_https_canonicals: settings["force_https_canonicals"]}} onChange={handleInputChange} />
						</div>
						<div className="debug" style={{display:displayDiv("debug", currentTab)}}>
							<Setting setting={{metadata_secret: settings["metadata_secret"]}} onChange={handleInputChange} />
							<Setting setting={{parsely_wipe_metadata_cache: settings["parsely_wipe_metadata_cache"]}} onChange={handleInputChange} />
						</div>
					</div>
				) : (
					<h1>Salut Monde!</h1>
				) }
				<input type="submit" className="button-primary" value="do the thing!" />
			</form>
		</div>

	);
};

export default App;

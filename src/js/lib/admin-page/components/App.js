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
						<div className="tab-body general" style={{display:displayDiv("general", currentTab)}}>
							<Setting
								setting={{apikey: settings["apikey"]}}
								onChange={handleInputChange}
								note="Your SiteID is your own site domain"
							/>
							<Setting
								setting={{apiSecret: "no secret given"}}
								onChange={handleInputChange}
								note="Your API Secret is your secret code to access our API"
							/>
							<Setting
								setting={{logo: settings["logo"]}}
								onChange={handleInputChange}
								note="You can pass a URL to set your site's logo"
							/>
						</div>
						<div className="tab-body advanced" style={{display:displayDiv("advanced", currentTab)}}>
							<Setting
								setting={{meta_type: settings["meta_type"]}}
								onChange={handleInputChange}
								note="Choose the metadata format for us to track"
							/>
							<Setting
								setting={{custom_taxonomy_section: settings["custom_taxonomy_section"]}}
								onChange={handleInputChange}
								note="Default: Category. Choose the default taxonomy to map to Parse.ly sections"
							/>
							<Setting
								setting={{content_id_prefix: settings["content_id_prefix"]}}
								onChange={handleInputChange}
								note="Choose a custom prefix for your content"
							/>
							<Setting
								setting={{disable_javascript: settings["disable_javascript"]}}
								onChange={handleInputChange}
								note="Default: On. Disable our javascript tracking if you use a separate system for JS tracking"
							/>
							<Setting
								setting={{disable_amp: settings["disable_amp"]}}
								onChange={handleInputChange}
								note="Default: On. Disable our AMP tracking if you use a separate system to track AMP content"
							/>
							<Setting
								setting={{use_top_level_cats: settings["use_top_level_cats"]}}
								onChange={handleInputChange}
								note="Default: On. Choose if you want the first top-level category to be mapped to Parse.ly"
							/>
							<Setting
								setting={{cats_as_tags: settings["cats_as_tags"]}}
								onChange={handleInputChange}
								note="Default: On. Choose if you want your non-primary categories to appear as tags"
							/>
							<Setting
								setting={{track_authenticated_users: settings["track_authenticated_users"]}}
								onChange={handleInputChange}
								note="Default: On"
							/>
							<Setting
								setting={{lowercase_tags: settings["lowercase_tags"]}}
								onChange={handleInputChange}
								note="Default: On. Choose if you want your tags to be converted to lower case"
							/>
							<Setting
								setting={{force_https_canonicals: settings["force_https_canonicals"]}}
								onChange={handleInputChange}
								note="Default: Off. Choose if you want your canonicals to use the HTTPS scheme"
							/>
						</div>
						<div className="tab-body debug" style={{display:displayDiv("debug", currentTab)}}>
							<Setting
								setting={{metadata_secret: settings["metadata_secret"]}}
								onChange={handleInputChange}
								note="The metadata secret provided to you by Parse.ly"
							/>
							<Setting
								setting={{parsely_wipe_metadata_cache: settings["parsely_wipe_metadata_cache"]}}
								onChange={handleInputChange}
								note="This will wipe all of your site's metadata and resend all metadata to Parse.ly"
							/>
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

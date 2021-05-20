import { useState } from '@wordpress/element';

import { fetchSettings } from '../static/js/services';
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

	const displayDiv = (divClass, currentState) => divClass == currentState ? '':'inactive';

	const handleFormSubmit = ( e ) => {
		e.preventDefault();
		// send form data to php somehow
	};
	// explicitly list each setting
	// group by tab in different divs
	return (
		<div className="settings-container">
			<nav className="controls">
					<span className="nav-control" onClick={() => setCurrentTab("general")}>
						General
					</span>
					<span className="nav-control" onClick={() => setCurrentTab("advanced")}>
						Advanced
					</span>
					<span className="nav-control" onClick={() => setCurrentTab("debug")}>
						Debug
					</span>
			</nav>
			<form onSubmit={ ( e ) => handleFormSubmit( e ) }>
				{ settings ? (
					<div className="settings-holder">
						<div className={`tab - body general ${displayDiv("general", currentTab)}`}>
							<Setting
								setting={{siteID: settings["apikey"]}}
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
							<Setting
								setting={{trackPostTypes: settings["track_post_types"]}}
								onChange={handleInputChange}
								note="You can pass a URL to set your site's logo"
							/>
							<Setting
								setting={{trackPageTypes: settings["track_page_types"]}}
								onChange={handleInputChange}
								note="You can pass a URL to set your site's logo"
							/>
						</div>
						<div className={`tab-body advanced ${displayDiv("advanced", currentTab)}`}>
							<Setting
								setting={{metaType: settings["meta_type"]}}
								onChange={handleInputChange}
								note="Choose the metadata format for us to track"
							/>
							<Setting
								setting={{customTaxonomySection: settings["custom_taxonomy_section"]}}
								onChange={handleInputChange}
								note="Default: Category. Choose the default taxonomy to map to Parse.ly sections"
							/>
							<Setting
								setting={{contentIDPrefix: settings["content_id_prefix"]}}
								onChange={handleInputChange}
								note="Choose a custom prefix for your content"
							/>
							<Setting
								setting={{disableJavaScript: settings["disable_javascript"]}}
								onChange={handleInputChange}
								note="Default: On. Disable our javascript tracking if you use a separate system for JS tracking"
							/>
							<Setting
								setting={{disableAMP: settings["disable_amp"]}}
								onChange={handleInputChange}
								note="Default: On. Disable our AMP tracking if you use a separate system to track AMP content"
							/>
							<Setting
								setting={{useTopLevelCategories: settings["use_top_level_cats"]}}
								onChange={handleInputChange}
								note="Default: On. Choose if you want the first top-level category to be mapped to Parse.ly"
							/>
							<Setting
								setting={{catsAsTags: settings["cats_as_tags"]}}
								onChange={handleInputChange}
								note="Default: On. Choose if you want your non-primary categories to appear as tags"
							/>
							<Setting
								setting={{trackAuthenticatedUsers: settings["track_authenticated_users"]}}
								onChange={handleInputChange}
								note="Default: On."
							/>
							<Setting
								setting={{lowercaseTags: settings["lowercase_tags"]}}
								onChange={handleInputChange}
								note="Default: On. Choose if you want your tags to be converted to lower case"
							/>
							<Setting
								setting={{forceHTTPSCanonicals: settings["force_https_canonicals"]}}
								onChange={handleInputChange}
								note="Default: Off. Choose if you want your canonicals to use the HTTPS scheme"
							/>
						</div>
						<div className={`tab - body debug ${displayDiv("debug", currentTab)}`}>
							<Setting
								setting={{metadataSecret: settings["metadata_secret"]}}
								onChange={handleInputChange}
								note="The metadata secret provided to you by Parse.ly"
							/>
							<Setting
								setting={{parselyWipeMetadataCache: settings["parsely_wipe_metadata_cache"]}}
								onChange={handleInputChange}
								note="This will wipe all of your site's metadata and resend all metadata to Parse.ly"
							/>
						</div>
					</div>
				) : (
					<h1>Loading Settings...</h1>
				) }
				<input type="submit" className="button-primary" value="do the thing!" />
			</form>
		</div>

	);
};

export default App;

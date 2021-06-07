import { useEffect, useState } from '@wordpress/element';

import { fetchSettings, saveSettingsToServer } from '../../settings-api-client';
import Setting from './Setting';
import SiteDetails from './SiteDetails';
import WipeMetadataCache from './WipeMetadataCache';
import WipeMetadataModal from './WipeMetadataModal';

const App = () => {
	const [ settings, setSettings ] = useState( null );
	const [ currentTab, setCurrentTab ] = useState( 'debug' );
	const [ displayModal, setDisplayModal ] = useState( false );

	useEffect( () => {
		fetchSettings().then(
			( settingsFromServer ) => setSettings( settingsFromServer ),
			( readError ) => {
				// TODO: Handle fetch error
				console.error( { readError } );
			}
		);
	}, [] );

	const handleInputChange = ( [ name, value ] ) => setSettings( { ...settings, [ name ]: value } );

	const displayDiv = ( divClass, currentState ) => ( divClass === currentState ? '' : 'inactive' );

	const showModal = ( val ) => {
		setDisplayModal( val );
	};

	const setMetadataFlag = ( val ) => setSettings( { ...settings, parsely_wipe_metadata_cache: val } );

	const handleFormSubmit = async ( e ) => {
		e.preventDefault();

		try {
			await saveSettingsToServer( settings );
		} catch ( writeError ) {
			// TODO: Handle error updating settings
			console.error( { writeError } );
		}
	};

	return (
		<div className="settings-container">
			<nav className="controls">
				<div className="nav-control" onClick={ () => setCurrentTab( 'general' ) }>
					<span className={ `${ currentTab === 'general' ? 'active' : '' }` }>General</span>
				</div>
				<div className="nav-control" onClick={ () => setCurrentTab( 'advanced' ) }>
					<span className={ `${ currentTab === 'advanced' ? 'active' : '' }` }>Advanced</span>
				</div>
				<div className="nav-control" onClick={ () => setCurrentTab( 'debug' ) }>
					<span className={ `${ currentTab === 'debug' ? 'active' : '' }` }>Debug</span>
				</div>
			</nav>
			<form className="settings-form" onSubmit={ ( e ) => handleFormSubmit( e ) }>
				{ settings ? (
					<div className="settings-holder">
						<div className={ `tab-body general ${ displayDiv( 'general', currentTab ) }` }>
							<Setting
								name="apikey"
								value={ settings.apikey }
								label="Site ID"
								onChange={ handleInputChange }
								note="Your SiteID is your own site domain"
							/>
							<Setting
								name="apiSecret"
								value={ 'no secret given' }
								label="API Secret"
								onChange={ handleInputChange }
								note="Your API Secret is your secret code to access our API"
							/>
							<Setting
								name="logo"
								value={ settings.logo }
								label="Logo"
								onChange={ handleInputChange }
								note="You can pass a URL to set your site's logo"
							/>
							<Setting
								name="track_post_types"
								value={ settings.track_post_types }
								label="Track Post Types"
								onChange={ handleInputChange }
								note="...."
							/>
							<Setting
								name="track_page_types"
								value={ settings.track_page_types }
								label="Track Page Types"
								onChange={ handleInputChange }
								note="...."
							/>
						</div>
						<div className={ `tab-body advanced ${ displayDiv( 'advanced', currentTab ) }` }>
							<Setting
								name="meta_type"
								value={ settings.meta_type }
								label="Metadata Type"
								onChange={ handleInputChange }
								note="Choose the metadata format for us to track"
							/>
							<Setting
								name="custom_taxonomy_section"
								value={ settings.custom_taxonomy_section }
								label="Custom Taxonomy Section"
								onChange={ handleInputChange }
								note="Default: Category. Choose the default taxonomy to map to Parse.ly sections"
							/>
							<Setting
								name="content_id_prefix"
								value={ settings.content_id_prefix }
								label="Content ID Prefix"
								onChange={ handleInputChange }
								note="Choose a custom prefix for your content"
							/>
							<Setting
								name="disable_javascript"
								value={ settings.disable_javascript }
								label="Disable Javascript"
								onChange={ handleInputChange }
								note="Default: Off. Disable our javascript tracking if you use a separate system for JS tracking"
							/>
							<Setting
								name="disable_amp"
								value={ settings.disable_amp }
								label="Disable AMP"
								onChange={ handleInputChange }
								note="Default: On. Disable our AMP tracking if you use a separate system to track AMP content"
							/>
							<Setting
								name="use_top_level_cats"
								value={ settings.use_top_level_cats }
								label="Use Top-Level Categories"
								onChange={ handleInputChange }
								note="Default: On. Choose if you want the first top-level category to be mapped to Parse.ly"
							/>
							<Setting
								name="cats_as_tags"
								value={ settings.cats_as_tags }
								label="Categories as Tags"
								onChange={ handleInputChange }
								note="Default: On. Choose if you want your non-primary categories to appear as tags"
							/>
							<Setting
								name="track_authenticated_users"
								value={ settings.track_authenticated_users }
								label="Track Authenticated Users"
								onChange={ handleInputChange }
								note="Default: On."
							/>
							<Setting
								name="lowercase_tags"
								value={ settings.lowercase_tags }
								label="Lowercase Tags"
								onChange={ handleInputChange }
								note="Default: On. Choose if you want your tags to be converted to lower case"
							/>
							<Setting
								name="force_https_canonicals"
								value={ settings.force_https_canonicals }
								label="Force HTTPS Canonical URLs"
								onChange={ handleInputChange }
								note="Default: Off. Choose if you want your canonicals to use the HTTPS scheme"
							/>
						</div>
						<div className={ `tab-body debug ${ displayDiv( 'debug', currentTab ) }` }>
							<Setting
								name="metadata_secret"
								value={ settings.metadata_secret }
								label="Metadata Secret"
								onChange={ handleInputChange }
								note="The metadata secret provided to you by Parse.ly"
							/>
							<WipeMetadataCache
								setting={ { parsely_wipe_metadata_cache: settings.parsely_wipe_metadata_cache } }
								label="Wipe Metadata Cache"
								onClick={ showModal }
								note="This will wipe all of your site's metadata and resend all metadata to Parse.ly"
							/>
							{ displayModal ? (
								<WipeMetadataModal
									onConfirm={ setMetadataFlag }
									apikey={ settings.apikey }
									modalControl={ showModal }
									setting={ { parsely_wipe_metadata_cache: settings.parsely_wipe_metadata_cache } }
								/>
							) : (
								''
							) }
							<SiteDetails
								apikey={ settings.apikey }
								postsToTrack={ settings.track_post_types }
								pagesToTrack={ settings.track_page_types }
								pluginVersion="2.5"
								phpVersion="7.4.1"
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

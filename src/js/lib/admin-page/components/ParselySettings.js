/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { fetchSettings, saveSettingsToServer } from '../../settings-api-client';
import Setting from './Setting';
import SiteDetails from './SiteDetails';
import WipeMetadataCache from './WipeMetadataCache';
import WipeMetadataModal from './WipeMetadataModal';

const ParselySettings = () => {
	const [ settings, setSettings ] = useState( null );
	const [ currentTab, setCurrentTab ] = useState( 'general' );
	const [ loaded, setLoaded ] = useState( false );
	const [ notice, setNotice ] = useState( false );
	const [ updatingSettings, setUpdatingSettings ] = useState( false );
	const [ displayModal, setDisplayModal ] = useState( false );

	useEffect( () => {
		fetchSettings().then(
			( settingsFromServer ) => {
				setSettings( settingsFromServer );
				setLoaded( true );
			},
			( errorFromServer ) => {
				console.error( errorFromServer );
				setNotice( {
					content: __( 'Could not read settings from the site.', 'parsely-wp' ),
					isDismissible: false,
					status: 'error',
				} );
			}
		);
	}, [] );

	const removeNotice = () => setNotice( false );

	const handleInputChange = ( [ name, value ] ) => {
		removeNotice();
		setSettings( { ...settings, [ name ]: value } );
	};

	const displayDiv = ( divClass, currentState ) => ( divClass === currentState ? '' : 'inactive' );

	const showModal = ( val ) => {
		setDisplayModal( val );
	};

	const handleFormSubmit = async ( e ) => {
		e.preventDefault();
		setUpdatingSettings( true );
		removeNotice();
		try {
			const settingsFromServer = await saveSettingsToServer( settings );
			setSettings( settingsFromServer );
			setNotice( { content: __( 'Settings Successfully Updated!', 'wp-parsely' ), status: 'success' } );
			setCurrentTab( 'general' );
		} catch ( writeError ) {
			setNotice( {
				content: __( 'Something went wrong! Please review your settings and try again.', 'wp-parsely' ),
				status: 'error',
			} );
			console.error( writeError );
		}
		setUpdatingSettings( false );
	};

	const setMetadataFlag = ( val ) => setSettings( { ...settings, parsely_wipe_metadata_cache: val } );

	const _setCurrentTab = ( tab ) => {
		removeNotice();
		setCurrentTab( tab );
	};

	const nav = (
		<nav className="controls">
			<div className="nav-control" onClick={ () => _setCurrentTab( 'general' ) }>
				<span className={ `${ currentTab === 'general' ? 'active' : '' }` }>{ __( 'General', 'wp-parsely' ) }</span>
			</div>
			<div className="nav-control" onClick={ () => _setCurrentTab( 'advanced' ) }>
				<span className={ `${ currentTab === 'advanced' ? 'active' : '' }` }>{ __( 'Advanced', 'wp-parsely' ) }</span>
			</div>
			<div className="nav-control" onClick={ () => _setCurrentTab( 'debug' ) }>
				<span className={ `${ currentTab === 'debug' ? 'active' : '' }` }>{ __( 'Debug', 'wp-parsely' ) }</span>
			</div>
		</nav>
	);

	const form = settings && (
		<form className="settings-form" onSubmit={ ( e ) => handleFormSubmit( e ) }>
			<div className="settings-holder">
				<div className={ `tab-body general ${ displayDiv( 'general', currentTab ) }` }>
					<Setting
						disabled={ updatingSettings }
						name="apikey"
						value={ settings.apikey }
						label={ __( 'Site ID', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( 'Your SiteID is your own site domain', 'wp-parsely' ) }
					/>
					<Setting
						name="api_secret"
						value={ 'no secret given' }
						label={ __( 'API Secret', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( 'Your API Secret is your secret code to access our API', 'wp-parsely' ) }
					/>
					<Setting
						name="logo"
						value={ settings.logo }
						label={ __( 'Logo', 'wp-parsely') }
						onChange={ handleInputChange }
						note={ __( 'You can pass a URL to set your site\'s logo', 'wp-parsely' ) }
					/>
					<Setting
						name="track_post_types"
						value={ settings.track_post_types }
						label={ __( 'Track Post Types', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( '....', 'wp-parsely' ) }
					/>
					<Setting
						name="track_page_types"
						value={ settings.track_page_types }
						label={ __( 'Track Page Types', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( '....', 'wp-parsely')}
					/>
				</div>
				<div className={ `tab-body advanced ${ displayDiv( 'advanced', currentTab ) }` }>
					<Setting
						name="meta_type"
						value={ settings.meta_type }
						label={ __( 'Metadata Type', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( 'Choose the metadata format for us to track', 'wp-parsely') }
					/>
					<Setting
						name="custom_taxonomy_section"
						value={ settings.custom_taxonomy_section }
						label={ __( 'Custom Taxonomy Section', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __('Default: Category. Choose the default taxonomy to map to Parse.ly sections', 'wp-parsely' ) }
					/>
					<Setting
						name="content_id_prefix"
						value={ settings.content_id_prefix }
						label={ __( 'Content ID Prefix', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( 'Choose a custom prefix for your content', 'wp-parsely' ) }
					/>
					<Setting
						name="disable_javascript"
						value={ settings.disable_javascript }
						label={ __( 'Disable JavaScript', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( 'Default: Off. Disable the Parse.ly plugin JavaScript tracking if you use a separate system for JavaScript tracking', 'wp-parsely' ) }
					/>
					<Setting
						name="disable_amp"
						value={ settings.disable_amp }
						label={ __( 'Disable AMP', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( 'Default: On. Disable our AMP tracking if you use a separate system to track AMP content', 'wp-parsely' ) }
					/>
					<Setting
						name="use_top_level_cats"
						value={ settings.use_top_level_cats }
						label={ __( 'Use Top-Level Categories', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( 'Default: On. Choose if you want the first top-level category to be mapped to Parse.ly', 'wp-parsely' ) }
					/>
					<Setting
						name="cats_as_tags"
						value={ settings.cats_as_tags }
						label={ __( 'Categories as Tags', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( 'Default: On. Choose if you want your non-primary categories to appear as tags', 'wp-parsely' ) }
					/>
					<Setting
						name="track_authenticated_users"
						value={ settings.track_authenticated_users }
						label={ __( 'Track Authenticated Users', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( 'Default: On.', 'wp-parsely' ) }
					/>
					<Setting
						name="lowercase_tags"
						value={ settings.lowercase_tags }
						label={ __( 'Lowercase Tags', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( 'Default: On. Choose if you want your tags to be converted to lower case', 'wp-parsely' ) }
					/>
					<Setting
						name="force_https_canonicals"
						value={ settings.force_https_canonicals }
						label={ __( 'Force HTTPS Canonical URLs', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( 'Default: Off. Choose if you want your canonicals to use the HTTPS scheme', 'wp-parsely' ) }
					/>
				</div>
				<div className={ `tab-body debug ${ displayDiv( 'debug', currentTab ) }` }>
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
					<Setting
						name="metadata_secret"
						value={ settings.metadata_secret }
						label={ __( 'Metadata Secret', 'wp-parsely' ) }
						onChange={ handleInputChange }
						note={ __( 'The metadata secret provided to you by Parse.ly', 'wp-parsely' ) }
					/>
					<WipeMetadataCache
						setting={ { parsely_wipe_metadata_cache: settings.parsely_wipe_metadata_cache } }
						label={ __( 'Wipe Metadata Cache', 'wp-parsely' ) }
						onClick={ showModal }
						note={ __( 'This will wipe all of your site\'s metadata and resend all metadata to Parse.ly', 'wp-parsely' ) }
					/>
					<SiteDetails
						apikey={ settings.apikey }
						postsToTrack={ settings.track_post_types }
						pagesToTrack={ settings.track_page_types }
						pluginVersion={ __('2.5', 'wp-parsely' ) }
						phpVersion={ __( '7.4.1', 'wp-parsely' ) }
					/>
				</div>
			</div>
			<input
				disabled={ updatingSettings }
				type="submit"
				className="button-primary"
				value={ __( 'Save Settings', 'wp-parsely' ) }
			/>
		</form>
	);

	const isError = notice?.status === 'error';

	return (
		<div className="settings-container">

			{ ! loaded && isError && ! notice.isDismissible && (
				<Notice status="error" isDismissible={ false }>
					{ notice.content }
				</Notice>
			) }
			{ ! loaded && ! isError && <h2>Loading...</h2> }
			{ loaded && notice && ! isError && (
				<Notice onRemove={ removeNotice } status="success">
					{ notice.content }
				</Notice>
			) }
			{ loaded && nav }
			{ loaded && form }
		</div>
	);
};

export default ParselySettings;

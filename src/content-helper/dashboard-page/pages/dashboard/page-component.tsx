/**
 * Internal dependencies
 */
import { SettingsProvider, TrafficBoostSettings } from '../../../common/settings';
import { getContentHelperPermissions } from '../../../common/utils/permissions';
import { VerifyCredentials } from '../../../common/verify-credentials';
import { PageContainer, PageBody } from '../../components';
import { DashboardHeader } from './components/header-component';

/**
 * Gets the settings from the passed JSON.
 *
 * If missing settings or invalid values are detected, they get set to their
 * defaults.
 *
 * @since 3.18.0
 *
 * @param {string} settingsJson The JSON containing the settings.
 *
 * @return {TrafficBoostSettings} The resulting settings object.
 */
const getSettingsFromJson = ( settingsJson: string ): TrafficBoostSettings => {
	// Default settings object.
	const defaultSettings: TrafficBoostSettings = {
		Setting1: 'Hello World!',
	};

	// If the settings are empty, try to get them from the global variable.
	if ( '' === settingsJson ) {
		settingsJson = window.wpParselyContentHelperSettings;
	}

	let parsedSettings: TrafficBoostSettings;

	try {
		parsedSettings = JSON.parse( settingsJson );
	} catch ( e ) {
		// Return defaults when parsing failed or the string is empty.
		return defaultSettings;
	}

	// Merge parsed settings with default settings.
	const mergedSettings = { ...defaultSettings, ...parsedSettings };

	// Fix invalid values if any are found.
	if ( typeof mergedSettings.Setting1 !== 'string' ) {
		mergedSettings.Setting1 = defaultSettings.Setting1;
	}

	return mergedSettings;
};

/**
 * The main dashboard page component.
 *
 * @since 3.18.0
 */
export const DashboardPage = (): React.JSX.Element => {
	return (
		<SettingsProvider
			endpoint="traffic-boost"
			defaultSettings={ getSettingsFromJson( window.wpParselyContentHelperSettings ) }
		>
			<VerifyCredentials>
				<PageContainer name="dashboard">
					<DashboardHeader />
					<PageBody>
						<p>Welcome to the Parse.ly Dashboard page!</p>
						<p>Content Helper Permissions: { JSON.stringify( getContentHelperPermissions() ) }</p>
						<p>Traffic Boost Settings: { JSON.stringify( getSettingsFromJson( window.wpParselyContentHelperSettings ) ) }</p>
					</PageBody>
				</PageContainer>
			</VerifyCredentials>
		</SettingsProvider>
	);
};

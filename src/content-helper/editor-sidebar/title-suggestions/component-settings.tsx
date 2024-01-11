/**
 * WordPress dependencies
 */
import { BaseControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { settings } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { Telemetry } from '../../../js/telemetry/telemetry';
import { PersonaProp, PersonaSelector, getPersonaLabel } from '../../common/components/persona-selector';
import { ToneProp, ToneSelector, getToneLabel } from '../../common/components/tone-selector';
import { LeafIcon } from '../../common/icons/leaf-icon';

/**
 * Props for the Title Suggestions Settings component.
 *
 * @since 3.13.0
 */
type TitleSuggestionsSettingsProps = {
	tone: ToneProp,
	persona: PersonaProp,
	onToneChange: ( tone: ToneProp | string ) => void,
	onPersonaChange: ( persona: PersonaProp | string ) => void,
	isLoading?: boolean,
};

/**
 * Component that renders the settings for the Title Suggestions.
 *
 * @since 3.13.0
 *
 * @param {TitleSuggestionsSettingsProps} props The component props.
 */
export const TitleSuggestionsSettings = ( {
	tone,
	persona,
	onToneChange,
	onPersonaChange,
	isLoading,
}: Readonly<TitleSuggestionsSettingsProps> ): JSX.Element => {
	const [ isSettingActive, setIsSettingActive ] = useState<boolean>( false );
	const [ isToneSelected, setIsToneSelected ] = useState<boolean>( false );
	const [ isPersonaSelected, setIsPersonaSelected ] = useState<boolean>( false );

	const toggleSetting = () => {
		setIsSettingActive( ! isSettingActive );
		Telemetry.trackEvent( 'title_suggestions_ai_settings_toggled', {
			is_active: ! isSettingActive,
		} );
	};

	return (
		<div className="parsely-write-titles-settings">
			<div className="parsely-write-titles-settings-header">
				<LeafIcon size={ 20 } />
				<BaseControl
					id="parsely-write-titles-settings"
					className="parsely-write-titles-settings-header-label"
					label={ __( 'Parse.ly AI Settings', 'wp-parsely' ) }>
					<Button
						label={ __( 'Change Tone & Persona', 'wp-parsely' ) }
						icon={ settings }
						onClick={ toggleSetting }
						isPressed={ isSettingActive }
						size="small"
					/>
				</BaseControl>
			</div>
			{ isSettingActive && (
				<div className="parsely-write-titles-settings-body">
					<ToneSelector
						tone={ tone }
						label={ isToneSelected ? getToneLabel( tone ) : __( 'Select a tone', 'wp-parsely' ) }
						onChange={ ( selectedTone ) => {
							onToneChange( selectedTone );
							setIsToneSelected( true );
						} }
						onDropdownChange={ ( selectedTone ) => {
							Telemetry.trackEvent( 'title_suggestions_ai_tone_changed',
								{ tone: selectedTone }
							);
						} }
						disabled={ isLoading }
						allowCustom
					/>
					<PersonaSelector
						persona={ persona }
						label={ isPersonaSelected ? getPersonaLabel( persona ) : __( 'Select a persona', 'wp-parsely' ) }
						onChange={ ( selectedPersona ) => {
							onPersonaChange( selectedPersona );
							setIsPersonaSelected( true );
						} }
						onDropdownChange={ ( selectedPersona ) => {
							Telemetry.trackEvent( 'title_suggestions_ai_persona_changed',
								{ persona: selectedPersona }
							);
						} }
						disabled={ isLoading }
						allowCustom
					/>
				</div>
			) }
		</div>
	);
};

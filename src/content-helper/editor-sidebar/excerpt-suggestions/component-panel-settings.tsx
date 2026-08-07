/**
 * WordPress dependencies
 */
import {
	RangeControl,
	SelectControl,
	TextControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Telemetry } from '../../../js/telemetry/telemetry';
import {
	PARSELY_PERSONAS,
	PersonaProp,
} from '../../common/components/persona-selector';
import {
	PARSELY_TONES,
	ToneProp,
} from '../../common/components/tone-selector';

/**
 * The default values for the Excerpt Suggestions settings.
 *
 * @since 3.24.0
 */
export const DEFAULT_EXCERPT_LENGTH = 160;
export const DEFAULT_PERSONA = 'journalist';
export const DEFAULT_TONE = 'neutral';

/**
 * The minimum and maximum desired excerpt lengths, in characters.
 *
 * @since 3.24.0
 */
export const MIN_EXCERPT_LENGTH = 50;
export const MAX_EXCERPT_LENGTH = 300;

/**
 * Returns whether the given value is a custom (free-text) entry rather than a
 * predefined key of the given options map.
 *
 * @since 3.24.0
 *
 * @param {string}                  value   The current value.
 * @param {Record<string, unknown>} options The predefined options map.
 */
const isCustomValue = (
	value: string,
	options: Record<string, unknown>
): boolean =>
	'custom' === value ||
	! Object.prototype.hasOwnProperty.call( options, value );

/**
 * Props for the Excerpt Suggestions Settings component.
 *
 * @since 3.17.0
 */
type ExcerptSuggestionsSettingsProps = {
	isLoading?: boolean,
	length: number,
	onLengthChange: ( length: number ) => void,
	onPersonaChange: ( persona: PersonaProp | string ) => void,
	onToneChange: ( tone: ToneProp | string ) => void,
	persona: PersonaProp,
	tone: ToneProp,
};

/**
 * Component that renders the settings for Excerpt Suggestions.
 *
 * The settings are rendered inside the settings popover, using core controls.
 *
 * @since 3.17.0
 * @since 3.24.0 Converted into settings popover content using core controls.
 *
 * @param {ExcerptSuggestionsSettingsProps} props The component's props.
 */
export const ExcerptSuggestionsSettings = ( {
	isLoading,
	length,
	onLengthChange,
	onPersonaChange,
	onToneChange,
	persona,
	tone,
}: Readonly<ExcerptSuggestionsSettingsProps> ): React.JSX.Element => {
	const isCustomTone = isCustomValue( tone, PARSELY_TONES );
	const isCustomPersona = isCustomValue( persona, PARSELY_PERSONAS );

	return (
		<VStack spacing={ 4 }>
			<RangeControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				value={ length }
				onChange={ ( value ) => {
					onLengthChange( value ?? DEFAULT_EXCERPT_LENGTH );
				} }
				label={ __( 'Desired length (characters)', 'wp-parsely' ) }
				min={ MIN_EXCERPT_LENGTH }
				max={ MAX_EXCERPT_LENGTH }
				disabled={ isLoading }
			/>

			<VStack spacing={ 2 }>
				<SelectControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Tone', 'wp-parsely' ) }
					value={ isCustomTone ? 'custom' : tone }
					options={ Object.entries( PARSELY_TONES ).map(
						( [ value, { label } ] ) => ( { label, value } )
					) }
					onChange={ ( selectedTone ) => {
						onToneChange( selectedTone );
						Telemetry.trackEvent( 'excerpt_generator_ai_tone_changed',
							{ selectedTone }
						);
					} }
					disabled={ isLoading }
				/>
				{ isCustomTone && (
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Custom tone', 'wp-parsely' ) }
						value={ 'custom' === tone ? '' : tone }
						onChange={ ( customTone ) => {
							onToneChange( '' === customTone ? 'custom' : customTone );
						} }
						disabled={ isLoading }
					/>
				) }
			</VStack>

			<VStack spacing={ 2 }>
				<SelectControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Persona', 'wp-parsely' ) }
					value={ isCustomPersona ? 'custom' : persona }
					options={ Object.entries( PARSELY_PERSONAS ).map(
						( [ value, { label } ] ) => ( { label, value } )
					) }
					onChange={ ( selectedPersona ) => {
						onPersonaChange( selectedPersona );
						Telemetry.trackEvent( 'excerpt_generator_ai_persona_changed',
							{ persona: selectedPersona }
						);
					} }
					disabled={ isLoading }
				/>
				{ isCustomPersona && (
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Custom persona', 'wp-parsely' ) }
						value={ 'custom' === persona ? '' : persona }
						onChange={ ( customPersona ) => {
							onPersonaChange( '' === customPersona ? 'custom' : customPersona );
						} }
						disabled={ isLoading }
					/>
				) }
			</VStack>
		</VStack>
	);
};

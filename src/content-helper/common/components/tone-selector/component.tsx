/**
 * WordPress dependencies
 */
import {
	Disabled,
	DropdownMenu,
	MenuGroup,
	MenuItem,
	TextControl,
} from '@wordpress/components';
import { useDebounce } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, edit } from '@wordpress/icons';
import { MoreArrow } from '../../icons/more-arrow';
import { PARSELY_PERSONAS } from '../persona-selector';

type ToneMetadata = {
	label: string,
	icon?: JSX.Element,
};

/**
 * List of the available tones.
 * Each tone has a value and an icon.
 *
 * @since 3.13.0
 */
export const PARSELY_TONES: Record<string, ToneMetadata> = {
	neutral: {
		label: __( 'Neutral', 'wp-parsely' ),
	},
	formal: {
		label: __( 'Formal', 'wp-parsely' ),
	},
	humorous: {
		label: __( 'Humorous', 'wp-parsely' ),
	},
	confident: {
		label: __( 'Confident', 'wp-parsely' ),
	},
	provocative: {
		label: __( 'Provocative', 'wp-parsely' ),
	},
	serious: {
		label: __( 'Serious', 'wp-parsely' ),
	},
	inspirational: {
		label: __( 'Inspirational', 'wp-parsely' ),
	},
	skeptical: {
		label: __( 'Skeptical', 'wp-parsely' ),
	},
	conversational: {
		label: __( 'Conversational', 'wp-parsely' ),
	},
	analytical: {
		label: __( 'Analytical', 'wp-parsely' ),
	},
	custom: {
		label: __( 'Custom Tone', 'wp-parsely' ),
		icon: edit,
	},
};

export type ToneProp = keyof typeof PARSELY_TONES | string;
type FixedToneProp = keyof typeof PARSELY_TONES;

const TONE_LIST = Object.keys( PARSELY_TONES ) as ToneProp[];

/**
 * Returns the value for a given tone.
 *
 * @since 3.13.0
 *
 * @param {ToneProp} tone The tone to get the value for.
 *
 * @return {string} The value for the given tone.
 */
export const getLabel = ( tone: ToneProp ): string => {
	if ( tone === 'custom' || tone === '' ) {
		return PARSELY_TONES.custom.label;
	}

	if ( isCustomTone( tone ) ) {
		return tone;
	}

	return PARSELY_TONES[ tone as FixedToneProp ].label;
};

/**
 * Returns whether a given tone is a custom tone.
 *
 * @since 3.13.0
 *
 * @param {ToneProp} tone
 *
 * @return {boolean} Whether the given tone is a custom tone.
 */
export const isCustomTone = ( tone: ToneProp ): boolean => {
	return ! TONE_LIST.includes( tone ) || tone === 'custom';
};

/**
 * Properties for the CustomTone component.
 *
 * @since 3.13.0
 */
type CustomToneProps = {
	value: string,
	onChange: ( tone: string ) => void
}

/**
 * Custom Tone component.
 *
 * Allows the user to enter a custom tone.
 *
 * @since 3.13.0
 *
 * @param {CustomToneProps} props The properties for the CustomTone component.
 */
const CustomTone = (
	{ value, onChange }: Readonly<CustomToneProps>
): JSX.Element => {
	const [ customTone, setCustomTone ] = useState<string>( '' );
	const debouncedOnChange = useDebounce( onChange, 500 );

	return (
		<div className="parsely-tone-selector-custom">
			<TextControl
				value={ customTone || value }
				placeholder={ __( 'Enter a custom tone', 'wp-parsely' ) }
				onChange={ ( newTone ) => {
					// If the tone is empty, set it to an empty string, and avoid debouncing.
					if ( '' === newTone ) {
						onChange( '' );
						setCustomTone( '' );
						return;
					}
					// Truncate the tone to 32 characters.
					if ( newTone.length > 32 ) {
						newTone = newTone.slice( 0, 32 );
					}
					debouncedOnChange( newTone );
					setCustomTone( newTone );
				} }
			/>
		</div>
	);
};

/**
 * Properties for the ToneSelector component.
 *
 * @since 3.13.0
 */
type ToneSelectorProps = {
	tone: ToneProp | string;
	onChange: ( tone: ToneProp | string ) => void;
	onDropdownChange?: ( tone: ToneProp ) => void;
	disabled?: boolean;
	value?: string;
	label?: string;
	allowCustom?: boolean;
};

/**
 * Tone Selector dropdown menu.
 *
 * Allows the user to select a tone for their AI generated content.
 *
 * @since 3.13.0
 *
 * @param {ToneSelectorProps} props The properties for the ToneSelector component.
 */
export const ToneSelector = ( {
	tone,
	value = __( 'Select a tone', 'wp-parsely' ),
	label = __( 'Tone', 'wp-parsely' ),
	onChange,
	onDropdownChange,
	disabled = false,
	allowCustom = false,
}: Readonly<ToneSelectorProps> ): JSX.Element => {
	return (
		<Disabled isDisabled={ disabled }>
			<div className="parsely-dropdown-label">{ label }</div>
			<DropdownMenu
				label={ __( 'Tone', 'wp-parsely' ) }
				className={ 'parsely-tone-selector-dropdown' + ( disabled ? ' is-disabled' : '' ) }
				popoverProps={ {
					className: 'wp-parsely-popover',
				} }
				toggleProps={ {
					children: (
						<>
							<div className="parsely-tone-selector-label">
								{ isCustomTone( tone ) ? PARSELY_PERSONAS.custom.label : value }
							</div>
							<MoreArrow />
						</>
					),
				} }
			>
				{ ( { onClose } ) => (
					<MenuGroup label={ __( 'Select a tone', 'wp-parsely' ) }>
						<>
							{ TONE_LIST.map( ( singleTone ) => {
								if ( ! allowCustom && singleTone === 'custom' ) {
									return null;
								}

								const toneData = PARSELY_TONES[ singleTone as FixedToneProp ];
								const isSelected = singleTone === tone || ( isCustomTone( tone ) && singleTone === 'custom' );
								return (
									<MenuItem
										key={ singleTone }
										isSelected={ isSelected }
										className={ isSelected ? 'is-selected' : '' }
										role="menuitemradio"
										onClick={ () => {
											onDropdownChange?.( singleTone as FixedToneProp );
											onChange( singleTone );
											onClose();
										} }
									>
										{ toneData.icon && <Icon icon={ toneData.icon } /> }
										{ toneData.label }
									</MenuItem>
								);
							} ) }
						</>
					</MenuGroup>
				) }
			</DropdownMenu>
			{
				allowCustom && isCustomTone( tone ) && (
					<CustomTone
						onChange={ ( currentTone ) => {
							if ( '' === currentTone ) {
								onChange( 'custom' );
								return;
							}

							onChange( currentTone );
						}	}
						value={ tone === 'custom' ? '' : tone }
					/>
				)
			}
		</Disabled>
	);
};

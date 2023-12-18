/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Disabled, DropdownMenu, MenuGroup, MenuItem, TextControl } from '@wordpress/components';
import { Icon, chevronRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { PersonIcon } from '../../icons/person-icon';
import { useState } from '@wordpress/element';

/**
 * List of the available personas.
 * Each persona has a label and an emoji.
 */
export const PARSELY_PERSONAS = {
	journalist: {
		label: __( 'Journalist', 'wp-parsely' ),
		emoji: '📰',
	},
	editorialWriter: {
		label: __( 'Editorial Writer', 'wp-parsely' ),
		emoji: '✍️',
	},
	investigativeReporter: {
		label: __( 'Investigative Reporter', 'wp-parsely' ),
		emoji: '🕵️',
	},
	techAnalyst: {
		label: __( 'Tech Analyst', 'wp-parsely' ),
		emoji: '💻',
	},
	businessAnalyst: {
		label: __( 'Business Analyst', 'wp-parsely' ),
		emoji: '📈',
	},
	culturalCommentator: {
		label: __( 'Cultural Commentator', 'wp-parsely' ),
		emoji: '🌍',
	},
	scienceCorrespondent: {
		label: __( 'Science Correspondent', 'wp-parsely' ),
		emoji: '🔬',
	},
	politicalAnalyst: {
		label: __( 'Political Analyst', 'wp-parsely' ),
		emoji: '🏛️',
	},
	healthWellnessAdvocate: {
		label: __( 'Health and Wellness Advocate', 'wp-parsely' ),
		emoji: '🍏',
	},
	environmentalJournalist: {
		label: __( 'Environmental Journalist', 'wp-parsely' ),
		emoji: '🌳',
	},
	custom: {
		label: __( 'Use a custom persona', 'wp-parsely' ),
		emoji: '🔧',
	},
};

export type PersonaProp = keyof typeof PARSELY_PERSONAS | string;
type FixedPersonaProp = keyof typeof PARSELY_PERSONAS;

const PERSONAS_LIST = Object.keys( PARSELY_PERSONAS ) as PersonaProp[];

const DEFAULT_PERSONA = 'journalist';

/**
 * Properties for the PersonaSelector component.
 */
type PersonaSelectorProps = {
	persona?: PersonaProp;
	onChange: ( persona: PersonaProp ) => void;
	disabled?: boolean;
	label?: string;
	allowCustom?: boolean;
};

/**
 * Returns the label for a given persona.
 * @param {PersonaProp} persona
 */
export const getLabel = ( persona: PersonaProp ): string => {
	if ( persona === 'custom' || persona === '' ) {
		return PARSELY_PERSONAS.custom.label;
	}

	if ( isCustomPersona( persona ) ) {
		return persona;
	}

	return PARSELY_PERSONAS[ persona as FixedPersonaProp ].label;
};

/**
 * Returns whether a given persona is a custom persona.
 * @param {PersonaProp} persona
 */
export const isCustomPersona = ( persona: PersonaProp ): boolean => {
	return ! PERSONAS_LIST.includes( persona ) || persona === 'custom';
};

/**
 * Properties for the CustomPersona component.
 */
type CustomPersonaProps = {
	value: string,
	onChange: ( persona: string ) => void
}

/**
 * CustomPersona component.
 *
 * Allows the user to enter a custom persona.
 *
 * @param {CustomPersonaProps} props - The properties for the CustomPersona component.
 */
const CustomPersona = ( { value, onChange }: CustomPersonaProps ): JSX.Element => {
	const [ customPersona, setCustomPersona ] = useState<string>( '' );
	return (
		<div className="parsely-persona-selector-custom">
			<TextControl
				value={ customPersona || value }
				onChange={ ( newPersona ) => {
					onChange( newPersona );
					setCustomPersona( newPersona );
				} }
				help={ __( 'Enter a custom persona', 'wp-parsely' ) }
			/>
		</div>
	);
};

/**
 * Persona Selector dropdown menu.
 *
 * Allows the user to select the persona for their AI generated content.
 *
 * @param {PersonaSelectorProps} props - The properties for the PersonaSelector component.
 */
export const PersonaSelector = ( {
	persona = DEFAULT_PERSONA,
	label = __( 'Select a persona', 'wp-parsely' ),
	onChange,
	disabled = false,
	allowCustom = false,
}: PersonaSelectorProps ): JSX.Element => {
	return (
		<Disabled isDisabled={ disabled }>
			<DropdownMenu
				label={ __( 'Persona', 'wp-parsely' ) }
				icon={ PersonIcon }
				className={ 'parsely-persona-selector-dropdown' + ( disabled ? ' is-disabled' : '' ) }
				popoverProps={ {
					className: 'wp-parsely-popover',
				} }
				toggleProps={ {
					children: (
						<>
							<div className="parsely-persona-selector-label">
								{ label }
							</div>
							<Icon icon={ chevronRight } />
						</>
					),
				} }
			>
				{ ( { onClose } ) => (
					<MenuGroup label={ __( 'Select a persona', 'wp-parsely' ) }>
						<>
							{ PERSONAS_LIST.map( ( singlePersona ) => {
								if ( ! allowCustom && singlePersona === 'custom' ) {
									return null;
								}

								const personaData = PARSELY_PERSONAS[ singlePersona as FixedPersonaProp ];
								return (
									<MenuItem
										key={ singlePersona }
										isSelected={ singlePersona === persona }
										className={ singlePersona === persona ? 'is-selected' : '' }
										role="menuitemradio"
										onClick={ () => {
											onChange( singlePersona );
											onClose();
										} }
									>
										{ personaData.emoji } { personaData.label }
									</MenuItem>
								);
							} ) }
						</>
					</MenuGroup>
				) }
			</DropdownMenu>
			{
				allowCustom && isCustomPersona( persona ) && (
					<CustomPersona
						onChange={ ( currentPersona ) => {
							if ( '' === currentPersona ) {
								onChange( 'custom' );
								return;
							}

							onChange( currentPersona );
						}	}
						value={ persona === 'custom' ? '' : persona }
					/>
				)
			}
		</Disabled>
	);
};

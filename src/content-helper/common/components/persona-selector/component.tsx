/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Disabled, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { Icon, chevronRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { PersonIcon } from '../../icons/person-icon';

/**
 * List of the available tones.
 * Each tone has a label and an emoji.
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
};

export type PersonaProp = keyof typeof PARSELY_PERSONAS;

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
								const personaData = PARSELY_PERSONAS[ singlePersona ];
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
		</Disabled>
	);
};

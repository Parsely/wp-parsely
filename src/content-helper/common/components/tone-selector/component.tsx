/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Disabled, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { Icon, chevronRight, megaphone } from '@wordpress/icons';

/**
 * List of the available tones.
 * Each tone has a label and an emoji.
 */
export const PARSELY_TONES = {
	neutral: {
		label: __( 'Neutral', 'wp-parsely' ),
		emoji: '😐',
	},
	formal: {
		label: __( 'Formal', 'wp-parsely' ),
		emoji: '🎩',
	},
	humorous: {
		label: __( 'Humorous', 'wp-parsely' ),
		emoji: '😂',
	},
	confident: {
		label: __( 'Confident', 'wp-parsely' ),
		emoji: '😎',
	},
	provocative: {
		label: __( 'Provocative', 'wp-parsely' ),
		emoji: '😈',
	},
	serious: {
		label: __( 'Serious', 'wp-parsely' ),
		emoji: '🧐',
	},
	inspirational: {
		label: __( 'Inspirational', 'wp-parsely' ),
		emoji: '✨',
	},
	skeptical: {
		label: __( 'Skeptical', 'wp-parsely' ),
		emoji: '🤨',
	},
	conversational: {
		label: __( 'Conversational', 'wp-parsely' ),
		emoji: '💬',
	},
	analytical: {
		label: __( 'Analytical', 'wp-parsely' ),
		emoji: '🤓',
	},
};

export type ToneProp = keyof typeof PARSELY_TONES;

const TONE_LIST = Object.keys( PARSELY_TONES ) as ToneProp[];

const DEFAULT_TONE = 'neutral';

/**
 * Properties for the ToneSelector component.
 */
type ToneSelectorProps = {
	tone?: ToneProp;
	onChange: ( tone: ToneProp ) => void;
	disabled?: boolean;
	label?: string;
};

/**
 * Tone Selector dropdown menu.
 *
 * Allows the user to select a tone for their AI generated content.
 *
 * @param {ToneSelectorProps} props - The properties for the ToneSelector component.
 */
export const ToneSelector = ( {
	tone = DEFAULT_TONE,
	label = __( 'Select a tone', 'wp-parsely' ),
	onChange,
	disabled = false,
}: ToneSelectorProps ): JSX.Element => {
	return (
		<Disabled isDisabled={ disabled }>
			<DropdownMenu
				label={ __( 'Tone', 'wp-parsely' ) }
				icon={ megaphone }
				className={ 'parsely-tone-selector-dropdown' + ( disabled ? ' is-disabled' : '' ) }
				popoverProps={ {
					className: 'wp-parsely-popover',
				} }
				toggleProps={ {
					children: (
						<>
							<div className="parsely-tone-selector-label">
								{ label }
							</div>
							<Icon icon={ chevronRight } />
						</>
					),
				} }
			>
				{ ( { onClose } ) => (
					<MenuGroup label={ __( 'Select a tone', 'wp-parsely' ) }>
						<>
							{ TONE_LIST.map( ( singleTone ) => {
								const toneData = PARSELY_TONES[ singleTone ];
								return (
									<MenuItem
										key={ singleTone }
										isSelected={ singleTone === tone }
										className={ singleTone === tone ? 'is-selected' : '' }
										role="menuitemradio"
										onClick={ () => {
											onChange( singleTone );
											onClose();
										} }
									>
										{ toneData.emoji } { toneData.label }
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

/**
 * WordPress dependencies
 */
import { BaseControl, Button, RangeControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { settings } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { Telemetry } from '../../../js/telemetry/telemetry';
import { LeafIcon } from '../../common/icons/leaf-icon';
import { OnSettingChangeFunction } from '../editor-sidebar';
import { DEFAULT_MAX_LINK_WORDS, DEFAULT_MAX_LINKS } from './smart-linking';
import { SmartLinkingStore } from './store';

/**
 * Defines the props structure for SmartLinkingSettings.
 *
 * @since 3.14.0
 */
type SmartLinkingSettingsProps = {
	disabled?: boolean;
	onSettingChange: OnSettingChangeFunction
};

/**
 * Settings for the Smart Linking.
 *
 * @since 3.14.0
 *
 * @param {SmartLinkingSettingsProps} props The component's props.
 *
 * @return {JSX.Element} The JSX Element.
 */
export const SmartLinkingSettings = ( {
	disabled = false,
	onSettingChange,
}: Readonly<SmartLinkingSettingsProps> ): JSX.Element => {
	/**
	 * Gets the settings from the Smart Linking store.
	 *
	 * @since 3.14.0
	 */
	const {
		maxLinks,
		maxLinkWords,
		settingsOpen,
	} = useSelect( ( select ) => {
		const { getMaxLinkWords, getMaxLinks, areSettingsOpen } = select( SmartLinkingStore );

		return {
			maxLinks: getMaxLinks(),
			maxLinkWords: getMaxLinkWords(),
			settingsOpen: areSettingsOpen(),
		};
	}, [] );

	const {
		setMaxLinks,
		setMaxLinkWords,
		setSettingsOpen,
	} = useDispatch( SmartLinkingStore );

	/**
	 * Toggles the settings panel.
	 *
	 * @since 3.14.0
	 */
	const toggleSetting = (): void => {
		onSettingChange( 'SmartLinkingSettingsOpen', ! settingsOpen );
		setSettingsOpen( ! settingsOpen );

		Telemetry.trackEvent( 'smart_linking_ai_settings_toggled', {
			is_active: ! settingsOpen,
		} );
	};

	return (
		<div className="parsely-panel-settings">
			<div className="parsely-panel-settings-header">
				<LeafIcon size={ 20 } />
				<BaseControl
					id="parsely-smart-linking-settings"
					className="parsely-panel-settings-header-label"
					label={ __( 'Smart Linking Settings', 'wp-parsely' ) }>
					<Button
						label={ __( 'Tweak the settings of the Smart Linking', 'wp-parsely' ) }
						icon={ settings }
						onClick={ toggleSetting }
						isPressed={ settingsOpen }
						size="small"
					/>
				</BaseControl>
			</div>
			{ settingsOpen && (
				<div className="parsely-panel-settings-body">
					<RangeControl
						disabled={ disabled }
						value={ maxLinks }
						initialPosition={ maxLinks }
						onChange={ ( value ) => {
							setMaxLinks( value ?? 1 );
							onSettingChange( 'SmartLinkingMaxLinks', value ?? DEFAULT_MAX_LINKS );
						} }
						label={ __( 'Links limit', 'wp-parsely' ) }
						help={ __( 'The maximum number of smart links to add in the content.', 'wp-parsely' ) }
						min={ 1 }
						max={ 20 }
					/>
					<RangeControl
						disabled={ disabled }
						value={ maxLinkWords }
						initialPosition={ maxLinkWords }
						onChange={ ( value ) => {
							setMaxLinkWords( value ?? 1 );
							onSettingChange( 'SmartLinkingMaxLinkWords', value ?? DEFAULT_MAX_LINK_WORDS );
						} }
						label={ __( 'Link length', 'wp-parsely' ) }
						help={ __( 'The maximum length (in words) for the smart link.', 'wp-parsely' ) }
						min={ 1 }
						max={ 8 }
					/>
				</div>
			) }
		</div>
	);
};

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
import { LeafIcon } from '../../common/icons/leaf-icon';
import { OnSettingChangeFunction } from '../editor-sidebar';
import { Telemetry } from '../../../js/telemetry/telemetry';
import { CrossLinkerStore } from './store';

/**
 * Defines the props structure for CrossLinkerSettings.
 *
 * @since 3.14.0
 */
type CrossLinkerSettingsProps = {
	disabled?: boolean;
	onSettingChange: OnSettingChangeFunction
};

/**
 * Settings for the Cross Linker.
 *
 * @since 3.14.0
 *
 * @param {CrossLinkerSettingsProps} props The component's props.
 */
export const CrossLinkerSettings = ( {
	disabled = false,
	onSettingChange,
}: Readonly<CrossLinkerSettingsProps> ) => {
	/**
	 * Get the settings from the Cross Linker store.
	 */
	const {
		maxLinks,
		maxLinkLength,
		settingsOpen,
	} = useSelect( ( select ) => {
		const { getMaxLinkLength, getMaxLinks, areSettingsOpen } = select( CrossLinkerStore );

		return {
			maxLinks: getMaxLinks(),
			maxLinkLength: getMaxLinkLength(),
			settingsOpen: areSettingsOpen(),
		};
	}, [] );

	const {
		setMaxLinks,
		setMaxLinkLength,
		setSettingsOpen,
	} = useDispatch( CrossLinkerStore );

	/**
	 * Toggles the settings panel.
	 *
	 * @since 3.14.0
	 */
	const toggleSetting = () => {
		onSettingChange( 'CrossLinksSettingsOpen', ! settingsOpen );
		setSettingsOpen( ! settingsOpen );

		Telemetry.trackEvent( 'cross_linker_ai_settings_toggled', {
			is_active: ! settingsOpen,
		} );
	};

	return (
		<div className="parsely-panel-settings">
			<div className="parsely-panel-settings-header">
				<LeafIcon size={ 20 } />
				<BaseControl
					id="parsely-cross-linker-settings"
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
							onSettingChange( 'CrossLinksMaxLinks', value ?? 1 );
						} }
						label={ __( 'Links limit', 'wp-parsely' ) }
						help={ __( 'The maximum number of smart links to add in the content.', 'wp-parsely' ) }
						min={ 1 }
						max={ 20 }
					/>
					<RangeControl
						disabled={ disabled }
						value={ maxLinkLength }
						initialPosition={ maxLinkLength }
						onChange={ ( value ) => {
							setMaxLinkLength( value ?? 1 );
							onSettingChange( 'CrossLinksMaxLinkLength', value ?? 1 );
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

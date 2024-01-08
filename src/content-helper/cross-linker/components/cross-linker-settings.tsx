/**
 * WordPress dependencies
 */
import { BaseControl, Button, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { settings } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { useDispatch, useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import { LeafIcon } from '../../common/icons/leaf-icon';
import { Telemetry } from '../../../js/telemetry/telemetry';
import { CrossLinkerStore } from "../store";

type CrossLinkerSettingsProps = {
	disabled?: boolean,
}

export const CrossLinkerSettings = ( { disabled = false }: CrossLinkerSettingsProps ) => {

	const {
		settingsOpen,
		maxLinks,
		maxLinkLength
	} = useSelect( ( select ) => {
		const { getMaxLinks, getMaxLinkLength, areSettingsOpen } = select( CrossLinkerStore );

		return {
			settingsOpen: areSettingsOpen(),
			maxLinks: getMaxLinks(),
			maxLinkLength: getMaxLinkLength(),
		};
	}, [] );

	const {
		setMaxLinks,
		setMaxLinkLength,
		setSettingsOpen,
	} = useDispatch( CrossLinkerStore );

	const toggleSetting = () => {
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
					label={ __( 'Cross Linker Settings', 'wp-parsely' ) }>
					<Button
						label={ __( 'Tweak the settings of the Cross Linker', 'wp-parsely' ) }
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
						onChange={ ( value ) => setMaxLinks( value ? value : 1 ) }
						label={ __( 'Links limit', 'wp-parsely' ) }
						help={ __( 'The maximum number of cross links to add in the content.', 'wp-parsely' ) }
						min={ 1 }
						max={ 20 }
					/>
					<RangeControl
						disabled={ disabled }
						value={ maxLinkLength }
						initialPosition={ maxLinkLength }
						onChange={ ( value ) => setMaxLinkLength( value ? value : 1 ) }
						label={ __( 'Link length', 'wp-parsely' ) }
						help={ __( 'The maximum length for the cross link.', 'wp-parsely' ) }
						min={ 1 }
						max={ 8 }
					/>
				</div>
			) }
		</div>
	);
};

import { PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Component that renders the settings tab.
 *
 * @since 3.18.0
 */
const SettingsTab = (): React.JSX.Element => {
	return (
		<>
			<PanelBody title={ __( 'Parse.ly AI', 'wp-parsely' ) }>
				<PanelRow>
					<div>
						<div>
							<p>{ __( 'Adjust parameters used to generate suggestions.', 'wp-parsely' ) }</p>
						</div>
					</div>
				</PanelRow>
			</PanelBody>
			<PanelBody title={ __( 'Content', 'wp-parsely' ) }>
				<PanelRow>
					<div>
						<div>
							{ __( 'Scope suggestions based on content attributes or Parse.ly smart tags.', 'wp-parsely' ) }
						</div>
					</div>
				</PanelRow>
			</PanelBody>
		</>
	);
};

export default SettingsTab;

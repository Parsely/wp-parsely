/**
 * External dependencies
 */
import { SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PSEUDO_BOOLEAN_SETTINGS } from '../constants';

const Setting = ( { name, note, value, onChange, label } ) => {
	const _onChange = ( newValue ) => onChange( [ name, newValue ] );
	let input;

	if ( PSEUDO_BOOLEAN_SETTINGS.includes( name ) ) {
		input = <ToggleControl name={ name } label={ label } onChange={ _onChange } checked={ value } />;
	} else if ( [ 'track_post_types', 'track_page_types' ].includes( name ) ) {
		input = (
			<SelectControl
				multiple
				label={ label }
				options={ [ { value, label: value } ] } // TODO: Load eligible post types from the back end...somehow.
				value={ value }
				name={ name }
				onChange={ _onChange }
			/>
		);
	} else {
		input = (
			<TextControl
				className="text-input"
				label={ label }
				name={ name }
				value={ value }
				onChange={ _onChange }
			/>
		);
	}

	return (
		<div className="setting-item--container">
			<div className="setting-item">
				<div className="setting-item--control">
					{ input }
					<p className="subtext">{ __( note, 'wp-parsely' ) }</p>
				</div>
			</div>
		</div>
	);
};
export default Setting;

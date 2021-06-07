import { SelectControl, TextControl, ToggleControl } from '@wordpress/components';

const Setting = ( { name, note, value, onChange, label } ) => {
	const _onChange = ( newValue ) => onChange( [ name, newValue ] );
	let input;

	if (
		[
			'disable_javascript',
			'disable_amp',
			'use_top_level_cats',
			'cats_as_tags',
			'track_authenticated_users',
			'lowercase_tags',
			'force_https_canonicals',
		].includes( name )
	) {
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
					<p className="subtext">{ note }</p>
				</div>
			</div>
		</div>
	);
};
export default Setting;

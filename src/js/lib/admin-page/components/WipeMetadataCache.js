import { __ } from '@wordpress/i18n';

const WipeMetadataCache = ( { setting, label, note, onClick } ) => {
	return (
		<div className="container">
			<div className="wipe-metadata-container">
				<label className="wipe-metadata-label">{ __( label, 'wp-parsely' ) }</label>
				<div className="wipe-metadata-controls">
					<button type="button" className="wipe-metadata-button" onClick={ () => onClick( true ) }>{ __( 'Wipe your metadata?', 'wp-parsely' ) }</button>
					{ __( note, 'wp-parsely' ) }
					<div className="wipe-metadata-warning">
						{ setting.parsely_wipe_metadata_cache ? <strong>{ __( 'DANGER: METADATA WILL BE WIPED UPON FORM SUBMISSION', 'wp-parsely' ) }</strong> : '' }
					</div>
				</div>
			</div>
		</div>
	);
};

export default WipeMetadataCache;

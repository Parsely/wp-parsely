const WipeMetadataCache = ( { setting, label, note, onClick } ) => {
	return (
		<div className="container">
			<div className="wipe-metadata-container">
				<label className="wipe-metadata-label">{ label }</label>
				<div className="wipe-metadata-controls">
					<button type="button" className="wipe-metadata-button" onClick={ () => onClick( true ) }>Wipe your metadata?</button>
					{ note }
					<div className="wipe-metadata-warning">
						{ setting.parsely_wipe_metadata_cache ? <h1>DANGER: METADATA WILL BE WIPED UPON FORM SUBMISSION</h1> : '' }
					</div>
				</div>
			</div>
		</div>
	);
};

export default WipeMetadataCache;

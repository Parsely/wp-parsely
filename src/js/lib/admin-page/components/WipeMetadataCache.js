const WipeMetadataCache = ( { setting, label, note, onClick } ) => (
	<div className="wipe-metadata-container">
		<label>{ label }</label>
		<div className="wipe-metadata-controls">
			<button className="wipe-metadata-button" onClick={ () => onClick( true ) }>Wipe your metadata?</button>
			{ setting.parsely_wipe_metadata_cache ? <h1>DANGER: METADATA WILL BE WIPED UPON FORM SUBMISSION</h1> : '' }
			{ note }
		</div>
	</div>
);

export default WipeMetadataCache;

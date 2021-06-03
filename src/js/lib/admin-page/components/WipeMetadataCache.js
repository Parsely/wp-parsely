const WipeMetadataCache = ({ setting, label, note, onClick }) => (
	<div>
		<label>{label}</label>
		<div>
			<button onClick={() => onClick(true)}>Wipe your metadata?</button>
			{setting["parsely_wipe_metadata_cache"] ? <h1>DANGER: METADATA WILL BE WIPED UPON FORM SUBMISSION</h1> : ''}
			{note}
		</div>
	</div>
)

export default WipeMetadataCache

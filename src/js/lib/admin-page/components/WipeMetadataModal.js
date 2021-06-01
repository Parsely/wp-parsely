import { useState } from '@wordpress/element';

const WipeMetadataModal = ({ setting, onConfirm, modalControl }) => {
	const [message, setMessage] = useState('');
	const [flagSet, setFlagSet] = useState(setting["parsely_wipe_metadata_cache"]);

	const setFlag = (val) => {
		if (val) {
			if (message !== "Delete all Parse.ly metadata") {
				alert("Your text does not match the prompt. Please try again.")
			} else {
				alert("Deleting all metadata")
				setFlagSet(true);
			}
		} else {
			setMessage('');
			setFlagSet(false);
		}
		modalControl(false)
		onConfirm(val)
	}

	return (
		<div>
			Type "Delete all Parse.ly metadata" below if you really want to delete all stored metadata
			<input type="text" onChange={e => setMessage(e.target.value)} />
			<button onClick={() => setFlag(false)}>Cancel</button>
			<button onClick={() => setFlag(true)}>Confirm</button>
			{ flagSet ? <button onClick={() => setFlag(false)}>Undo</button> : ''}
		</div>
	)
};

export default WipeMetadataModal;

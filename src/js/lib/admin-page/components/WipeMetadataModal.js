import { useState } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

const WipeMetadataModal = ( { setting, apikey, onConfirm, modalControl } ) => {
	const [ message, setMessage ] = useState( '' );
	const [ flagSet, setFlagSet ] = useState( setting.parsely_wipe_metadata_cache );

	const setFlag = ( val ) => {
		if ( val ) {
			if ( message !== apikey ) {
				alert( 'Your text does not match the prompt. Please try again.' );
			} else {
				alert( 'Deleting all metadata' );
				setFlagSet( true );
			}
		} else {
			setMessage( '' );
			setFlagSet( false );
		}
		modalControl( false );
		onConfirm( val );
	};

	return (
		<div className="modal">
			<strong>Type <span className="code">{ apikey }</span> below if you really want to delete all stored metadata. This action cannot be undone</strong>
			<TextControl
				className="text-input"
				label="Wipe Metadata Cache"
				onChange={ setMessage }
			/>
			<button onClick={ () => setFlag( false ) }>Cancel</button>
			<button className="button-primary" onClick={ () => setFlag( true ) }>Confirm</button>
			{ flagSet ? <button onClick={ () => setFlag( false ) }>Undo</button> : '' }
		</div>
	);
};

export default WipeMetadataModal;

import { useState } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

const WipeMetadataModal = ( { setting, apikey, onConfirm, modalControl } ) => {
	const [ message, setMessage ] = useState( '' );
	const [ flagSet, setFlagSet ] = useState( setting.parsely_wipe_metadata_cache );

	const setFlag = ( val ) => {
		if ( ! val ) {
			setMessage( '' );
			setFlagSet( false );
			onConfirm( val );
		}
		if ( val && message === apikey ) {
			onConfirm( val );
		}
		modalControl( false );
	};

	return (
		<div className="modal-container">
			<div onClick={ () => setFlag( false ) } className="modal-background">
			</div>
			<div className="modal">
				<strong>Type <span className="code">{ apikey }</span> below and then click Confirm if you really want to delete all stored metadata. This action cannot be undone</strong>
				<TextControl
					className="text-input"
					label="Wipe Metadata Cache"
					onChange={ setMessage }
				/>
				<button className="button-secondary" type="button" onClick={ () => setFlag( false ) }>Cancel</button>
				<button type="button" className={ `button-primary ${ message !== apikey ? 'disabled' : '' }` } onClick={ () => setFlag( true ) }>Confirm</button>
				{ flagSet ? <button className="button-secondary" onClick={ () => setFlag( false ) }>Undo</button> : '' }
			</div>
		</div>
	);
};

export default WipeMetadataModal;

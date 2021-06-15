import { useState } from '@wordpress/element';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

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
				<strong>{ __( 'Type', 'wp-parsely' ) } <span className="code">{ apikey }</span> { __( 'below and then click Confirm if you really want to delete all stored metadata. This action cannot be undone', 'wp-parsely' ) }</strong>
				<TextControl
					className="text-input"
					label={ __( 'Wipe Metadata Cache', 'wp-parsely' ) }
					onChange={ setMessage }
				/>
				<button className="button-secondary" type="button" onClick={ () => setFlag( false ) }>{ __( 'Cancel', 'wp-parsely' ) }</button>
				<button type="button" className={ `button-primary ${ message !== apikey ? 'disabled' : '' }` } onClick={ () => setFlag( true ) }>{ __( 'Confirm', 'wp-parsely' ) }</button>
				{ flagSet ? <button className="button-secondary" onClick={ () => setFlag( false ) }>{ __( 'Undo', 'wp-parsely' ) }</button> : '' }
			</div>
		</div>
	);
};

export default WipeMetadataModal;

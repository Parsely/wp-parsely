import { BlockInstance } from '@wordpress/blocks';
import { Button, Modal } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { LinkSuggestion } from '../provider';
import { ReviewModalSidebar } from './component-sidebar';
import { ReviewSuggestion } from './component-suggestion';

export type SmartLinkingReviewModalProps = {
	links: LinkSuggestion[] | null,
	onClose: () => void,
	isOpen: boolean,
	selectedBlock?: BlockInstance,
};

export const SmartLinkingReviewModal = ( {
	links,
	onClose,
	isOpen,
	selectedBlock,
}: SmartLinkingReviewModalProps ): JSX.Element => {
	const [ showCloseDialog, setShowCloseDialog ] = useState<boolean>( false );
	const [ isModalOpen, setIsModalOpen ] = useState<boolean>( isOpen );

	const showConfirmCloseDialog = () => setShowCloseDialog( true );
	const hideConfirmCloseDialog = () => setShowCloseDialog( false );

	/**
	 * Update the modal state when the `isOpen` prop changes.
	 */
	useEffect( () => {
		setIsModalOpen( isOpen );
	}, [ isOpen ] );

	const onCloseHandler = () => {
		console.log( 'onCloseHandler' );
		// Hide the modal.
		setIsModalOpen( false );

		if ( links ) {
			showConfirmCloseDialog();
			console.log( showCloseDialog );
			return;
		}

		onClose();
	};

	const onCloseConfirmCloseDialog = ( shouldClose: boolean ) => {
		console.log( 'onCloseConfirmCloseDialog' );
		hideConfirmCloseDialog();
		if ( shouldClose ) {
			setIsModalOpen( false );
			onClose();
		} else {
			setIsModalOpen( true );
		}
	};

	return (
		<>
			{ isModalOpen && (
				<Modal
					title={ __( 'Review Smart Links', 'wp-parsely' ) }
					className="wp-parsely-smart-linking-review-modal"
					onRequestClose={ onCloseHandler }
					shouldCloseOnClickOutside={ false }
					shouldCloseOnEsc={ false }
				>
					<div className="smart-linking-modal-body">
						<ReviewModalSidebar links={ links } />
						<ReviewSuggestion link={ links ? links[ 0 ] : null } block={ selectedBlock } />
					</div>
				</Modal>
			) }

			{ showCloseDialog && (
				<Modal
					title={ __( 'Review Smart Links', 'wp-parsely' ) }
					onRequestClose={ () => onCloseConfirmCloseDialog( false ) }
					className="wp-parsely-smart-linking-close-dialog"
				>
					{ __( 'Are you sure you want to close? All un-accepted smart links will not be added.', 'wp-parsely' ) }
					<Button
						variant="secondary"
						onClick={ () => onCloseConfirmCloseDialog( false ) }
					>
						{ __( 'Go Back', 'wp-parsely' ) }
					</Button>
					<Button
						variant="primary"
						onClick={ () => onCloseConfirmCloseDialog( true ) }
					>
						{ __( 'Close', 'wp-parsely' ) }
					</Button>
				</Modal>
			) }
		</>

	);
};

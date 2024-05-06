import { BlockInstance, getBlockContent } from '@wordpress/blocks';
import { Button, Modal } from '@wordpress/components';
import { dispatch, select, useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { SmartLink } from '../provider';
import { SmartLinkingStore } from '../store';
import { applyNodeToBlock } from '../utils';
import { ReviewModalSidebar } from './component-sidebar';
import { ReviewSuggestion } from './component-suggestion';

export type SmartLinkingReviewModalProps = {
	onClose: () => void,
	isOpen: boolean,
	onAppliedLink: ( link: SmartLink ) => void,
};

export const SmartLinkingReviewModal = ( {
	onClose,
	isOpen,
	onAppliedLink,
}: SmartLinkingReviewModalProps ): JSX.Element => {
	const [ showCloseDialog, setShowCloseDialog ] = useState<boolean>( false );
	const [ isModalOpen, setIsModalOpen ] = useState<boolean>( isOpen );

	/**
	 * Loads the Smart Linking store selectors.
	 *
	 * @since 3.15.0
	 */
	const {
		suggestedLinks,
	} = useSelect( ( selectFn ) => {
		const { getSuggestedLinks } = selectFn( SmartLinkingStore );
		return {
			suggestedLinks: getSuggestedLinks(),
		};
	}, [] );

	const [ selectedLink, setSelectedLink ] = useState<SmartLink>( suggestedLinks[ 0 ] );

	/**
	 * Loads the Smart Linking store actions.
	 *
	 * @since 3.15.0
	 */
	const {
		setSuggestedLinks,
	} = useDispatch( SmartLinkingStore );

	// Set the first link as the selected link when the links are loaded.
	useEffect( () => {
		//console.log( suggestedLinks );
		// Filter out any links without a match
		//const filteredLinks = links.filter( ( link ) => link.match );
		//setSuggestedLinks( filteredLinks );
		setSelectedLink( suggestedLinks[ 0 ] );
	}, [ suggestedLinks ] );

	const showConfirmCloseDialog = () => setShowCloseDialog( true );
	const hideConfirmCloseDialog = () => setShowCloseDialog( false );

	/**
	 * Updates the modal state when the `isOpen` prop changes.
	 */
	useEffect( () => {
		setIsModalOpen( isOpen );
	}, [ isOpen ] );

	/**
	 * Applies the link to the block.
	 *
	 * @param {string}    blockId        The block instance to apply the link to.
	 * @param {SmartLink} linkSuggestion The link suggestion to apply.
	 */
	const applyLinkToBlock = async ( blockId: string, linkSuggestion: SmartLink ) => {
		const anchor = document.createElement( 'a' );
		anchor.href = linkSuggestion.href;
		anchor.title = linkSuggestion.title;
		// Add data-smartlink attribute to the anchor tag.
		anchor.setAttribute( 'data-smartlink', linkSuggestion.uid );

		const block = select( 'core/block-editor' ).getBlock( blockId );
		if ( ! block ) {
			return;
		}

		applyNodeToBlock( block, linkSuggestion, anchor );

		// Update the block.
		dispatch( 'core/block-editor' ).updateBlock( blockId, block );

		linkSuggestion.applied = true;

		// Update the link suggestions.
		await setSuggestedLinks( suggestedLinks );
	};

	/**
	 * Removes a Smart Link from a block.
	 *
	 * @since 3.15.0
	 *
	 * @param {BlockInstance} block          The block instance to remove the link from.
	 * @param {SmartLink}     linkSuggestion The link suggestion to remove.
	 */
	const removeLinkFromBlock = ( block: BlockInstance, linkSuggestion: SmartLink ) => {
		const blockId = block.clientId;
		if ( ! block ) {
			return;
		}

		const blockContent: string = getBlockContent( block );
		const doc = new DOMParser().parseFromString( blockContent, 'text/html' );
		const contentElement = doc.body.firstChild as HTMLElement;

		if ( ! contentElement ) {
			return;
		}

		let anchors = Array.from( contentElement.querySelectorAll( 'a' ) );
		anchors = anchors.filter( ( anchor ) => anchor.href === linkSuggestion.href && anchor.textContent?.includes( linkSuggestion.text ) );

		if ( anchors.length > linkSuggestion.offset ) {
			const anchorToRemove = anchors[ linkSuggestion.offset ];
			if ( anchorToRemove ) {
				const parentNode = anchorToRemove.parentNode;
				if ( parentNode ) {
					// Replace the anchor with its text content
					const textNode = document.createTextNode( anchorToRemove.textContent || '' );
					parentNode.replaceChild( textNode, anchorToRemove );

					// Update the block content
					block.attributes.content = contentElement.innerHTML;
					dispatch( 'core/block-editor' ).updateBlock( blockId, block );
				}
			}
		}
	};

	const onCloseHandler = () => {
		const pendingLinks = suggestedLinks.filter( ( link ) => ! link.applied );

		// Hide the modal.
		setIsModalOpen( false );

		if ( suggestedLinks && pendingLinks.length > 0 ) {
			showConfirmCloseDialog();
			return;
		}

		// Close after 200ms.
		onClose();
	};

	const onCloseConfirmCloseDialog = ( shouldClose: boolean ) => {
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
						<ReviewModalSidebar
							links={ suggestedLinks }
							activeLink={ selectedLink }
							setSelectedLink={ setSelectedLink }
						/>
						<ReviewSuggestion
							link={ selectedLink }
							hasNext={ suggestedLinks.indexOf( selectedLink ) < suggestedLinks.length - 1 }
							hasPrevious={ suggestedLinks.indexOf( selectedLink ) > 0 }
							onNext={ () => {
								const currentIndex = suggestedLinks.indexOf( selectedLink );
								const nextIndex = currentIndex + 1;
								setSelectedLink( suggestedLinks[ nextIndex ] );
							}	}
							onPrevious={ () => {
								const currentIndex = suggestedLinks.indexOf( selectedLink );
								const previousIndex = currentIndex - 1;
								setSelectedLink( suggestedLinks[ previousIndex ] );
							} }
							onAccept={ () => {
								if ( ! selectedLink.match ) {
									return;
								}
								onAppliedLink( selectedLink );
								applyLinkToBlock( selectedLink.match.blockId, selectedLink )
									.then( () => {
										const currentIndex = suggestedLinks.indexOf( selectedLink );
										const nextIndex = currentIndex + 1;

										// If there is a next link, select it, otherwise close the modal.
										if ( suggestedLinks[ nextIndex ] ) {
											setSelectedLink( suggestedLinks[ nextIndex ] );
										} else {
											onCloseHandler();
										}
									} );
							} }
							onReject={ () => {
								// Change to the next link.
								const currentIndex = suggestedLinks.indexOf( selectedLink );
								const nextIndex = currentIndex + 1;

								// Check if it exists. If not, try to go for the first one on the array.
								// If there isn't any, close the modal
								if ( ! suggestedLinks[ nextIndex ] ) {
									if ( suggestedLinks[ 0 ] ) {
										setSelectedLink( suggestedLinks[ 0 ] );
									} else {
										onCloseHandler();
									}
								} else {
									setSelectedLink( suggestedLinks[ nextIndex ] );
								}

								// Delete the rejected link from the list.
								suggestedLinks.splice( currentIndex, 1 );
								setSuggestedLinks( suggestedLinks );
							} }
							onRemove={ () => {
								if ( ! selectedLink.match ) {
									return;
								}

								const block = select( 'core/block-editor' ).getBlock( selectedLink.match.blockId );
								if ( block ) {
									removeLinkFromBlock( block, selectedLink );

									// Remove the link suggestion from the list
									suggestedLinks.splice( suggestedLinks.indexOf( selectedLink ), 1 );
									setSuggestedLinks( suggestedLinks );
								}
							} }
							onSelectInEditor={ () => {
								if ( ! selectedLink.match ) {
									return;
								}

								const block = select( 'core/block-editor' ).getBlock( selectedLink.match.blockId );
								if ( block ) {
									// Select the block in the editor
									dispatch( 'core/block-editor' ).selectBlock( block.clientId );

									// Close the modal
									onCloseHandler();
								}
							} }
						/>
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

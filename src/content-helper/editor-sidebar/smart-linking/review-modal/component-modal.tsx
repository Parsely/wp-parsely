// eslint-disable-next-line import/named
import { BlockInstance, getBlockContent } from '@wordpress/blocks';
import { Button, KeyboardShortcuts, Modal } from '@wordpress/components';
import { dispatch, select, useDispatch, useSelect } from '@wordpress/data';
import { memo, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { GutenbergFunction } from '../../../../@types/gutenberg/types';

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

const SmartLinkingReviewModalComponent = ( {
	onClose,
	isOpen,
	onAppliedLink,
}: SmartLinkingReviewModalProps ): JSX.Element => {
	const [ showCloseDialog, setShowCloseDialog ] = useState<boolean>( false );
	const [ isModalOpen, setIsModalOpen ] = useState<boolean>( isOpen );

	const { postId } = useSelect( ( selectFn ) => {
		const { getCurrentPostId } = selectFn( 'core/editor' ) as GutenbergFunction;
		return {
			postId: getCurrentPostId(),
		};
	}, [] );

	/**
	 * Loads the Smart Linking store selectors.
	 *
	 * @since 3.15.0
	 */
	const {
		smartLinks,
		suggestedLinks,
	} = useSelect( ( selectFn ) => {
		const { getSmartLinks, getSuggestedLinks } = selectFn( SmartLinkingStore );
		return {
			smartLinks: getSmartLinks(),
			suggestedLinks: getSuggestedLinks,
		};
	}, [] );

	const [ selectedLink, setSelectedLink ] = useState<SmartLink>( smartLinks[ 0 ] );

	/**
	 * Loads the Smart Linking store actions.
	 *
	 * @since 3.15.0
	 */
	const {
		purgeSmartLinksSuggestions,
		updateSmartLink,
		removeSmartLink,
	} = useDispatch( SmartLinkingStore );

	/**
	 * Sorts the smartLinks by the applied status.
	 */
	useEffect( () => {
		smartLinks.sort( ( a, b ) => {
			if ( a.applied && ! b.applied ) {
				return 1;
			}
			if ( ! a.applied && b.applied ) {
				return -1;
			}
			return 0;
		} );
	}, [ smartLinks ] );

	/**
	 * Sets the selected link when the suggested links change.
	 *
	 * @since 3.15.0
	 */
	useEffect( () => {
		if ( smartLinks.length === 0 ) {
			onClose();
			return;
		}

		setSelectedLink( smartLinks[ 0 ] );
	}, [ onClose, smartLinks ] );

	const showConfirmCloseDialog = () => setShowCloseDialog( true );
	const hideConfirmCloseDialog = () => setShowCloseDialog( false );

	/**
	 * Updates the modal state when the `isOpen` prop changes.
	 *
	 * @since 3.15.0
	 */
	useEffect( () => {
		setIsModalOpen( isOpen );
	}, [ isOpen ] );

	/**
	 * Applies the link to the block.
	 *
	 * @since 3.15.0
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

		// Update the smart link in the store
		linkSuggestion.applied = true;
		await updateSmartLink( linkSuggestion );

		applyNodeToBlock( block, linkSuggestion, anchor );

		// Update the block.
		dispatch( 'core/block-editor' ).updateBlock( blockId, block );

		// Notify the API that the link was applied.
		//if ( postId ) {
		//	const addedLink = await SmartLinkingProvider.getInstance().addSmartLink( postId, linkSuggestion );
		//	console.log( addedLink );
		//}
	};

	/**
	 * Removes a Smart Link from a block, using the unique identifier.
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

		// Select anchors by 'data-smartlink' attribute matching the UID.
		const anchors = Array.from( contentElement.querySelectorAll( `a[data-smartlink="${ linkSuggestion.uid }"]` ) );

		// Check if we found the anchor with the specified UID.
		if ( anchors.length > 0 ) {
			const anchorToRemove = anchors[ 0 ]; // Assuming UID is unique and there's only one match.
			const parentNode = anchorToRemove.parentNode;
			if ( parentNode ) {
				// Replace the anchor with its text content
				const textNode = document.createTextNode( anchorToRemove.textContent ?? '' );
				parentNode.replaceChild( textNode, anchorToRemove );

				// Update the block content
				block.attributes.content = contentElement.innerHTML;
				dispatch( 'core/block-editor' ).updateBlock( blockId, block );
			}
		}

		// Remove the link from the store.
		removeSmartLink( linkSuggestion.uid );
	};

	/**
	 * Handles the closing of the modal.
	 *
	 * If there are any pending links, a confirmation dialog is shown.
	 * When the modal is closed, any pending suggestions are purged.
	 *
	 * @since 3.15.0
	 */
	const onCloseHandler = () => {
		// Hide the modal.
		setIsModalOpen( false );

		const pendingLinks = smartLinks.filter( ( link ) => ! link.applied );
		if ( pendingLinks.length > 0 ) {
			showConfirmCloseDialog();
			return;
		}

		// Purge any remaining suggestions.
		purgeSmartLinksSuggestions().then( () => onClose() );
	};

	/**
	 * Handles the closing of the closing confirmation dialog.
	 *
	 * If the user confirms the closing, the modal is closed.
	 *
	 * @since 3.15.0
	 *
	 * @param {boolean} shouldClose Whether the modal should be closed.
	 */
	const onCloseConfirmCloseDialog = ( shouldClose: boolean ) => {
		hideConfirmCloseDialog();
		if ( shouldClose ) {
			setIsModalOpen( false );
			purgeSmartLinksSuggestions().then( () => {
				onClose();
			} );
		} else {
			setIsModalOpen( true );
		}
	};

	const handleNext = () => {
		const currentIndex = smartLinks.indexOf( selectedLink );
		const nextIndex = currentIndex + 1;

		if ( ! smartLinks[ nextIndex ] ) {
			return;
		}

		setSelectedLink( smartLinks[ nextIndex ] );
	};

	const handlePrevious = () => {
		const currentIndex = smartLinks.indexOf( selectedLink );
		const previousIndex = currentIndex - 1;

		if ( ! smartLinks[ previousIndex ] ) {
			return;
		}

		setSelectedLink( smartLinks[ previousIndex ] );
	};

	/**
	 * Handles the acceptance of a smart link.
	 *
	 * @since 3.15.0
	 */
	const onAcceptHandler = () => {
		if ( ! selectedLink.match ) {
			return;
		}
		onAppliedLink( selectedLink );
		applyLinkToBlock( selectedLink.match.blockId, selectedLink )
			.then( () => {
				// If there are no more suggested links, close the modal.
				if ( suggestedLinks().length === 0 ) {
					onCloseHandler();
					return;
				}

				const currentIndex = smartLinks.indexOf( selectedLink );
				const nextIndex = currentIndex + 1;

				// If there is a next link, select it, otherwise select the first link
				if ( smartLinks[ nextIndex ] ) {
					setSelectedLink( smartLinks[ nextIndex ] );
				} else {
					setSelectedLink( smartLinks[ 0 ] );
				}
			} );
	};

	/**
	 * Handles the rejection of a smart link.
	 *
	 * @since 3.15.0
	 */
	const onRejectHandler = () => {
		// Change to the next link.
		const currentIndex = smartLinks.indexOf( selectedLink );
		const nextIndex = currentIndex + 1;

		// Check if it exists. If not, try to go for the first one on the array.
		// If there isn't any, close the modal
		if ( ! smartLinks[ nextIndex ] ) {
			if ( smartLinks[ 0 ] ) {
				setSelectedLink( smartLinks[ 0 ] );
			} else {
				onCloseHandler();
			}
		} else {
			setSelectedLink( smartLinks[ nextIndex ] );
		}

		removeSmartLink( selectedLink.uid );
	};

	/**
	 * Handles the removal of a smart link.
	 *
	 * @since 3.15.0
	 */
	const onRemoveHandler = () => {
		if ( ! selectedLink.match ) {
			return;
		}

		console.log( selectedLink );

		const block = select( 'core/block-editor' ).getBlock( selectedLink.match.blockId );
		if ( block ) {
			removeLinkFromBlock( block, selectedLink );
		}
	};

	/**
	 * Selects the link into the block editor.
	 *
	 * @since 3.15.0
	 */
	const onSelectedInEditorHandler = () => {
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
					<KeyboardShortcuts shortcuts={ {
						left: handlePrevious,
						right: handleNext,
						up: handlePrevious,
						down: handleNext,
						a: () => {
							if ( selectedLink && ! selectedLink.applied ) {
								onAcceptHandler();
							}
						},
						r: () => {
							if ( ! selectedLink ) {
								return;
							}
							if ( selectedLink.applied ) {
								onRemoveHandler();
							} else {
								onRejectHandler();
							}
						},
					} } />
					<div className="smart-linking-modal-body">
						<ReviewModalSidebar
							links={ smartLinks }
							activeLink={ selectedLink }
							setSelectedLink={ setSelectedLink }
						/>
						<ReviewSuggestion
							link={ selectedLink }
							hasNext={ smartLinks.indexOf( selectedLink ) < smartLinks.length - 1 }
							hasPrevious={ smartLinks.indexOf( selectedLink ) > 0 }
							onNext={ handleNext	}
							onPrevious={ handlePrevious }
							onAccept={ onAcceptHandler }
							onReject={ onRejectHandler }
							onRemove={ onRemoveHandler }
							onSelectInEditor={ onSelectedInEditorHandler }
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
					<div className="smart-linking-close-dialog-actions">
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
					</div>
				</Modal>
			) }
		</>

	);
};

export const SmartLinkingReviewModal = memo( SmartLinkingReviewModalComponent );


/**
 * WordPress dependencies
 */
// eslint-disable-next-line import/named
import { BlockInstance, getBlockContent } from '@wordpress/blocks';
import { Button, KeyboardShortcuts, Modal } from '@wordpress/components';
import { dispatch, select, useDispatch, useSelect } from '@wordpress/data';
import { memo, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { SmartLink } from '../provider';
import { SmartLinkingStore } from '../store';
import { applyNodeToBlock } from '../utils';
import { ReviewModalSidebar } from './component-sidebar';
import { ReviewSuggestion } from './component-suggestion';

/**
 * The props for the SmartLinkingReviewModal component.
 *
 * @since 3.16.0
 */
export type SmartLinkingReviewModalProps = {
	onClose: () => void,
	isOpen: boolean,
	onAppliedLink: ( link: SmartLink ) => void,
};

/**
 * The SmartLinkingReviewModal component displays a modal to review and apply smart links.
 *
 * @since 3.16.0
 *
 * @param {SmartLinkingReviewModalProps} props The component props.
 */
const SmartLinkingReviewModalComponent = ( {
	onClose,
	isOpen,
	onAppliedLink,
}: SmartLinkingReviewModalProps ): JSX.Element => {
	const [ showCloseDialog, setShowCloseDialog ] = useState<boolean>( false );
	const [ isModalOpen, setIsModalOpen ] = useState<boolean>( isOpen );

	/**
	 * Loads the Smart Linking store selectors.
	 *
	 * @since 3.16.0
	 */
	const {
		smartLinks,
		suggestedLinks,
		getSmartLinks,
	} = useSelect( ( selectFn ) => {
		// eslint-disable-next-line @typescript-eslint/no-shadow
		const { getSmartLinks, getSuggestedLinks } = selectFn( SmartLinkingStore );
		return {
			smartLinks: getSmartLinks(),
			getSmartLinks,
			suggestedLinks: getSuggestedLinks,
		};
	}, [] );

	const [ selectedLink, setSelectedLink ] = useState<SmartLink>( smartLinks[ 0 ] );

	/**
	 * Loads the Smart Linking store actions.
	 *
	 * @since 3.16.0
	 */
	const {
		purgeSmartLinksSuggestions,
		updateSmartLink,
		removeSmartLink,
	} = useDispatch( SmartLinkingStore );

	/**
	 * Sets the selected link when the suggested links change.
	 *
	 * @since 3.16.0
	 */
	useEffect( () => {
		if ( isModalOpen && smartLinks.length === 0 ) {
			onClose();
		}
	}, [ isModalOpen, onClose, smartLinks ] );

	const showConfirmCloseDialog = () => setShowCloseDialog( true );
	const hideConfirmCloseDialog = () => setShowCloseDialog( false );

	/**
	 * Updates the modal state when the `isOpen` prop changes.
	 *
	 * @since 3.16.0
	 */
	useEffect( () => {
		setIsModalOpen( isOpen );
	}, [ isOpen ] );

	/**
	 * Applies the link to the block.
	 *
	 * @since 3.16.0
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

		// Apply and updates the block content.
		applyNodeToBlock( block, linkSuggestion, anchor );

		// Update the smart link in the store.
		linkSuggestion.applied = true;
		await updateSmartLink( linkSuggestion );
	};

	/**
	 * Removes a Smart Link from a block, using the unique identifier.
	 *
	 * @since 3.16.0
	 *
	 * @param {BlockInstance} block          The block instance to remove the link from.
	 * @param {SmartLink}     linkSuggestion The link suggestion to remove.
	 */
	const removeLinkFromBlock = async ( block: BlockInstance, linkSuggestion: SmartLink ) => {
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
		const anchors = Array.from(
			contentElement.querySelectorAll( `a[data-smartlink="${ linkSuggestion.uid }"]` ),
		);

		// Check if we found the anchor with the specified UID.
		if ( anchors.length > 0 ) {
			const anchorToRemove = anchors[ 0 ];
			const parentNode = anchorToRemove.parentNode;
			if ( parentNode ) {
				// Replace the anchor with its text content.
				const textNode = document.createTextNode( anchorToRemove.textContent ?? '' );
				parentNode.replaceChild( textNode, anchorToRemove );

				// Update the block content.
				dispatch( 'core/block-editor' ).updateBlockAttributes( blockId, { content: contentElement.innerHTML } );
			}
		}

		// Remove the link from the store.
		await removeSmartLink( linkSuggestion.uid );
	};

	/**
	 * Handles the closing of the modal.
	 *
	 * If there are any pending links, a confirmation dialog is shown.
	 * When the modal is closed, any pending suggestions are purged.
	 *
	 * @since 3.16.0
	 */
	const onCloseHandler = () => {
		// Hide the modal.
		setIsModalOpen( false );

		const currentSmartLinks = getSmartLinks();

		const pendingLinks = currentSmartLinks.filter( ( link ) => ! link.applied );
		if ( pendingLinks.length > 0 ) {
			showConfirmCloseDialog();
			return;
		}

		onClose();
	};

	/**
	 * Handles the closing of the closing confirmation dialog.
	 *
	 * If the user confirms the closing, the modal is closed.
	 *
	 * @since 3.16.0
	 *
	 * @param {boolean} shouldClose Whether the modal should be closed.
	 */
	const onCloseConfirmCloseDialog = ( shouldClose: boolean ) => {
		hideConfirmCloseDialog();
		if ( shouldClose ) {
			setIsModalOpen( false );
			purgeSmartLinksSuggestions().then( () => {
				onCloseHandler();
			} );
		} else {
			setIsModalOpen( true );
		}
	};

	/**
	 * Handles the selection of the next smart link.
	 *
	 * @since 3.16.0
	 */
	const handleNext = () => {
		const currentIndex = smartLinks.indexOf( selectedLink );
		const nextIndex = currentIndex + 1;

		if ( ! smartLinks[ nextIndex ] ) {
			return;
		}

		setSelectedLink( smartLinks[ nextIndex ] );
	};

	/**
	 * Handles the selection of the previous smart link.
	 *
	 * @since 3.16.0
	 */
	const handlePrevious = () => {
		const currentIndex = getSmartLinks().indexOf( selectedLink );
		const previousIndex = currentIndex - 1;

		if ( ! getSmartLinks()[ previousIndex ] ) {
			return;
		}

		setSelectedLink( getSmartLinks()[ previousIndex ] );
	};

	/**
	 * Handles the acceptance of a smart link.
	 *
	 * @since 3.16.0
	 */
	const onAcceptHandler = async () => {
		if ( ! selectedLink.match ) {
			return;
		}

		onAppliedLink( selectedLink );
		await applyLinkToBlock( selectedLink.match.blockId, selectedLink );

		// If there are no more suggested links, close the modal.
		if ( suggestedLinks().length === 0 ) {
			onCloseHandler();
			return;
		}

		const currentIndex = smartLinks.indexOf( selectedLink );
		const nextIndex = currentIndex + 1;

		// If there is a next link, select it, otherwise select the first link.
		if ( smartLinks[ nextIndex ] ) {
			setSelectedLink( smartLinks[ nextIndex ] );
		} else {
			setSelectedLink( smartLinks[ 0 ] );
		}
	};

	/**
	 * Handles the rejection of a smart link.
	 *
	 * @since 3.16.0
	 */
	const onRejectHandler = async () => {
		// Change to the next link.
		const currentIndex = smartLinks.indexOf( selectedLink );
		const nextIndex = currentIndex + 1;

		// Check if it exists. If not, try to go for the first one on the array.
		// If there isn't any, close the modal.
		if ( ! smartLinks[ nextIndex ] ) {
			if ( smartLinks[ 0 ] ) {
				setSelectedLink( smartLinks[ 0 ] );
			} else {
				onCloseHandler();
			}
		} else {
			setSelectedLink( smartLinks[ nextIndex ] );
		}

		await removeSmartLink( selectedLink.uid );
	};

	/**
	 * Handles the removal of a smart link.
	 *
	 * @since 3.16.0
	 */
	const onRemoveHandler = async () => {
		if ( ! selectedLink.match ) {
			return;
		}

		const block = select( 'core/block-editor' ).getBlock( selectedLink.match.blockId );
		if ( block ) {
			let currentSmartLinks = getSmartLinks();

			// Get the selected link index, and set the selected link as the previous one, or the first one if no previous.
			const currentIndex = currentSmartLinks.indexOf( selectedLink );
			const previousIndex = currentIndex - 1;

			await removeLinkFromBlock( block, selectedLink );

			currentSmartLinks = getSmartLinks();
			if ( currentSmartLinks[ previousIndex ] ) {
				setSelectedLink( currentSmartLinks[ previousIndex ] );
			} else {
				setSelectedLink( currentSmartLinks[ 0 ] );
			}
		}
	};

	/**
	 * Selects the link into the block editor.
	 *
	 * @since 3.16.0
	 */
	const onSelectedInEditorHandler = () => {
		if ( ! selectedLink.match ) {
			return;
		}

		const block = select( 'core/block-editor' ).getBlock( selectedLink.match.blockId );
		if ( block ) {
			// Select the block in the editor.
			dispatch( 'core/block-editor' ).selectBlock( block.clientId );

			// Find the link element within the block.
			const blockContent = document.querySelector( `[data-block="${ block.clientId }"]` );
			if ( blockContent ) {
				const ownerDocument = blockContent.ownerDocument;
				const linkElement = blockContent.querySelector( `a[data-smartlink="${ selectedLink.uid }"]` ) as HTMLElement;
				if ( linkElement ) {
					// Set focus to the link element.
					linkElement.focus();

					// Select the link.
					const range = ownerDocument.createRange();
					if ( linkElement.firstChild ) {
						range.setStart( linkElement.firstChild, 0 ); // Start at the beginning of the link text
						range.setEndAfter( linkElement.firstChild );
						const sel = ownerDocument.getSelection();
						if ( sel ) {
							sel.removeAllRanges();
							sel.addRange( range );
						}
					}
				}
			}

			// Close the modal.
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
							hasNext={ getSmartLinks().indexOf( selectedLink ) < getSmartLinks().length - 1 }
							hasPrevious={ getSmartLinks().indexOf( selectedLink ) > 0 }
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

/**
 * The SmartLinkingReviewModal component, memoized for performance.
 *
 * @since 3.16.0
 */
export const SmartLinkingReviewModal = memo( SmartLinkingReviewModalComponent );

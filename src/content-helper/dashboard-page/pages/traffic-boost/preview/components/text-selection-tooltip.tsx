/**
 * WordPress imports
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useEffect, createRoot } from '@wordpress/element';
import { debounce } from '@wordpress/compose';
import { Button } from '@wordpress/components';
import { link } from '@wordpress/icons';

/**
 * Props structure for TextSelectionPopover.
 *
 * @since 3.18.0
 */
interface TextSelectionPopoverProps {
	onSelect: () => void;
	iframeDocument: Document;
}

/**
 * Custom hook to inject styles into the iframe.
 *
 * @since 3.18.0
 *
 * @param {Document} iframeDocument The iframe's document object.
 */
const useIframeStyles = ( iframeDocument: Document ) => {
	useEffect( () => {
		// Get computed styles from parent window.
		const adminColor = window.getComputedStyle( document.documentElement )
			.getPropertyValue( '--wp-admin-theme-color' ).trim();

		// Inject WordPress components styles.
		const wpComponentsLink = iframeDocument.createElement( 'link' );
		wpComponentsLink.rel = 'stylesheet';
		wpComponentsLink.href = '/wp-includes/css/dist/components/style.css';
		iframeDocument.head.appendChild( wpComponentsLink );

		// Create and inject custom styles into the iframe.
		const style = iframeDocument.createElement( 'style' );
		style.textContent = `
			/* Highlight styles */
			.parsely-traffic-boost-highlight {
				position: absolute;
				pointer-events: none;
				z-index: 1000;
				transition: all 0.15s ease-out;
			}

			/* Popover container styles */
			.parsely-traffic-boost-popover-container {
				position: absolute;
				left: 50%;
				bottom: 100%;
				transform: translateX(-50%);
				margin-bottom: 12px;
				z-index: 1001;
				opacity: 0;
				animation: slideUp 0.2s ease-out forwards;
			}

			.parsely-traffic-boost-popover-container.closing {
				animation: slideDown 0.2s ease-out forwards;
			}

			.parsely-traffic-boost-iframe-popover {
				padding: 0;
				pointer-events: auto;
				white-space: nowrap;
			}

			.parsely-traffic-boost-iframe-popover-button {
				box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.05),
					0px 4px 5px 0px rgba(0, 0, 0, 0.04),
					0px 4px 5px 0px rgba(0, 0, 0, 0.03),
					0px 16px 16px 0px rgba(0, 0, 0, 0.02);
				padding: 6px 12px;
				background: var(--wp-admin-theme-color, ${ adminColor });
				border-radius: 2px;
			}

			/* Animation styles */
			@keyframes slideUp {
				from {
					opacity: 0;
					transform: translate(-50%, 10px);
				}
				to {
					opacity: 1;
					transform: translate(-50%, 0);
				}
			}

			@keyframes slideDown {
				from {
					opacity: 1;
					transform: translate(-50%, 0);
				}
				to {
					opacity: 0;
					transform: translate(-50%, 10px);
				}
			}
		`;
		iframeDocument.head.appendChild( style );

		// Cleanup function to remove styles when component unmounts
		return () => {
			wpComponentsLink.remove();
			style.remove();
		};
	}, [ iframeDocument ] );
};

/**
 * Component that renders the popover content for text selection.
 *
 * @since 3.18.0
 *
 * @param {TextSelectionPopoverProps} props Component props.
 */
const TextSelectionPopover = ( { onSelect, iframeDocument }: TextSelectionPopoverProps ): JSX.Element => {
	useIframeStyles( iframeDocument );

	return (
		<div className="parsely-traffic-boost-iframe-popover">
			<Button
				variant="primary"
				icon={ link }
				className="parsely-traffic-boost-iframe-popover-button"
				onClick={ onSelect }
			>
				{ __( 'Use as Link Text', 'wp-parsely' ) }
			</Button>
		</div>
	);
};

/**
 * Props structure for TextSelectionTooltip.
 *
 * @since 3.18.0
 */
interface TextSelectionTooltipProps {
	iframeRef: React.RefObject<HTMLIFrameElement>;
	onTextSelected: ( text: string, offset: number ) => void;
}

/**
 * A tooltip component that appears over selected text, offering to use that text as link text.
 *
 * @since 3.18.0
 *
 * @param {TextSelectionTooltipProps} props Component props.
 */
export const TextSelectionTooltip = ( {
	iframeRef,
	onTextSelected,
}: TextSelectionTooltipProps ): null => {
	/**
	 * Expands the current selection to word boundaries.
	 *
	 * @since 3.18.0
	 *
	 * @param {Selection} docSelection The document's current selection.
	 * @param {Range}     range        The current selection range.
	 */
	const expandToWordBoundary = ( docSelection: Selection, range: Range ) => {
		const startNode = range.startContainer as Text;
		const endNode = range.endContainer as Text;
		const startText = startNode.textContent ?? '';
		const endText = endNode.textContent ?? '';

		// Get initial selection boundaries before expanding.
		const initialStart = range.startOffset;
		const initialEnd = range.endOffset;

		// Find word boundary at start.
		let startOffset = range.startOffset;
		while ( startOffset > 0 && /[^\s.,!?;:'")\]}]/g.test( startText[ startOffset - 1 ] ) ) {
			startOffset--;
		}

		// Find word boundary at end.
		let endOffset = range.endOffset;
		while ( endOffset < endText.length && /[^\s.,!?;:'"(\[{]/g.test( endText[ endOffset ] ) ) {
			endOffset++;
		}

		// Only update if boundaries have changed.
		if ( startOffset !== initialStart || endOffset !== initialEnd ) {
			range.setStart( startNode, startOffset );
			range.setEnd( endNode, endOffset );
			docSelection.removeAllRanges();
			docSelection.addRange( range );
		}
	};

	/**
	 * Calculates the offset of the selected text by counting previous occurrences.
	 *
	 * @since 3.18.0
	 *
	 * @param {Document}  iframeDocument The iframe's document object.
	 * @param {Selection} docSelection   The document's current selection.
	 * @param {Element}   previewWrapper The preview wrapper element.
	 */
	const calculateOffset = (
		iframeDocument: Document,
		docSelection: Selection,
		previewWrapper: Element
	) => {
		const selectedText = docSelection.toString().trim();
		if ( ! selectedText ) {
			return 0;
		}

		// Get all text content up to the selection.
		const currentRange = docSelection.getRangeAt( 0 );
		const tempRange = iframeDocument.createRange();
		tempRange.setStart( previewWrapper, 0 );
		tempRange.setEnd( currentRange.startContainer, currentRange.startOffset );

		const textBeforeSelection = tempRange.toString();

		// Count occurrences before the selection.
		const regex = new RegExp( selectedText.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' ), 'g' );
		const matches = textBeforeSelection.match( regex );

		return matches ? matches.length : 0;
	};

	/**
	 * Handles the selection of text in the iframe.
	 *
	 * @since 3.18.0
	 */
	const handleSelection = useCallback( () => {
		const iframeDocument = iframeRef.current?.contentDocument;
		if ( ! iframeDocument ) {
			return;
		}

		// Get the selection.
		const docSelection = iframeDocument.getSelection();

		// Clean up ALL existing highlights
		const cleanupHighlights = () => {
			const existingHighlights = iframeDocument.querySelectorAll( '.parsely-traffic-boost-highlight' );
			existingHighlights.forEach( ( highlight ) => {
				const existingPopover = highlight.querySelector( '.parsely-traffic-boost-popover-container' );
				if ( existingPopover ) {
					existingPopover.classList.add( 'closing' );
					setTimeout( () => {
						highlight.remove();
					}, 200 );
				} else {
					highlight.remove();
				}
			} );
		};

		// Always clean up existing highlights first
		cleanupHighlights();

		if ( ! docSelection || docSelection.isCollapsed ) {
			return;
		}

		const range = docSelection.getRangeAt( 0 );
		const previewWrapper = iframeDocument.querySelector( '.wp-parsely-preview-wrapper' );

		// Check if selection is within preview wrapper.
		if ( ! previewWrapper?.contains( range.commonAncestorContainer ) ) {
			return;
		}

		// Check if selection spans multiple paragraphs.
		const startParagraph = range.startContainer.parentElement?.closest( 'p' );
		const endParagraph = range.endContainer.parentElement?.closest( 'p' );

		if ( ! startParagraph || ! endParagraph || startParagraph !== endParagraph ) {
			return;
		}

		expandToWordBoundary( docSelection, range );

		// Create highlight overlay.
		const highlight = iframeDocument.createElement( 'div' );
		highlight.className = 'parsely-traffic-boost-highlight';

		// Create popover container.
		const popoverContainer = iframeDocument.createElement( 'div' );
		popoverContainer.className = 'parsely-traffic-boost-popover-container';
		highlight.appendChild( popoverContainer );

		// Create popover content.
		const root = createRoot( popoverContainer );
		root.render(
			<TextSelectionPopover
				iframeDocument={ iframeDocument }
				onSelect={ () => {
					const offset = calculateOffset( iframeDocument, docSelection, previewWrapper );
					popoverContainer.classList.add( 'closing' );

					onTextSelected( docSelection.toString().trim(), offset );
					docSelection.removeAllRanges();

					// Wait for animation to complete before cleanup.
					setTimeout( () => {
						cleanup();
					}, 200 );
				} }
			/>
		);

		/**
		 * Updates the position of the highlight.
		 *
		 * @since 3.18.0
		 */
		const updatePosition = () => {
			const rect = range.getBoundingClientRect();
			const scrollY = iframeDocument.defaultView?.scrollY ?? 0;

			highlight.style.top = `${ rect.top + scrollY }px`;
			highlight.style.left = `${ rect.left }px`;
			highlight.style.width = `${ rect.width }px`;
			highlight.style.height = `${ rect.height }px`;
		};

		updatePosition();
		previewWrapper.appendChild( highlight );

		// Add scroll event listener.
		const scrollHandler = () => {
			requestAnimationFrame( updatePosition );
		};

		iframeDocument.addEventListener( 'scroll', scrollHandler, { passive: true } );
		window.addEventListener( 'scroll', scrollHandler, { passive: true } );

		const cleanup = () => {
			iframeDocument.removeEventListener( 'scroll', scrollHandler );
			window.removeEventListener( 'scroll', scrollHandler );
			root.unmount();
			highlight.remove();
		};
	}, [ iframeRef, onTextSelected ] );

	/**
	 * Injects styles and adds event listeners when the component mounts.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const iframeDocument = iframeRef.current?.contentDocument;
		if ( ! iframeDocument ) {
			return;
		}

		// Add selection event listener.
		const handleSelectionChange = debounce( () => {
			handleSelection();
		}, 300, {
			leading: true,
			trailing: true,
		} );

		iframeDocument.addEventListener( 'selectionchange', handleSelectionChange );

		return () => {
			iframeDocument.removeEventListener( 'selectionchange', handleSelectionChange );
		};
	}, [ handleSelection, iframeRef ] );

	return null;
};

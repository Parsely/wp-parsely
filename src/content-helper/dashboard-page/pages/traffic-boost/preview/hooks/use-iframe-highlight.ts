/**
 * WordPress imports
 */
import { useCallback } from '@wordpress/element';

/**
 * Internal imports
 */
import { escapeRegExp } from '../../../../../common/utils/functions';
import { LinkType, TrafficBoostLink } from '../../provider';
import { TextSelection } from '../preview';

interface UseIframeHighlightProps {
	iframeRef: React.RefObject<HTMLIFrameElement>;
	contentAreaRef: React.MutableRefObject<Element | null>;
	activeLink?: TrafficBoostLink | null;
	selectedText?: TextSelection | null;
	isInboundLink: boolean;
}

/**
 * Custom hook for handling iframe highlighting functionality.
 *
 * @since 3.18.0
 *
 * @param {UseIframeHighlightProps} props The component props.
 *
 * @return {Object} An object containing the highlight functions.
 */
export const useIframeHighlight = ( {
	iframeRef,
	contentAreaRef,
	activeLink,
	selectedText,
	isInboundLink,
}: UseIframeHighlightProps ) => {
	/**
	 * Injects highlight styles into the iframe.
	 *
	 * @since 3.18.0
	 *
	 * @param {HTMLIFrameElement} iframe The iframe element to inject styles into.
	 */
	const injectHighlightStyles = useCallback( ( iframe: HTMLIFrameElement ) => {
		const iframeDocument = iframe.contentDocument ?? iframe.contentWindow?.document;
		if ( ! iframeDocument ) {
			return;
		}

		const style = iframeDocument.createElement( 'style' );
		style.textContent = `
			/** Smart link highlight styles */
			.smart-link-highlight {
				outline: 2px solid #3858E9;
				border-radius: 2px;
				background-color: #3858E9;
				color: #ffffff;
			}

			.smart-link-highlight * {
				color: #ffffff;
			}

			.smart-link-highlight.previous-suggestion {
				outline: 2px solid rgba(56, 88, 233, 0.2);
				background-color: rgba(56, 88, 233, 0.2);
				text-decoration: line-through;
				color: inherit;
			}

			.smart-link-highlight.previous-suggestion * {
				color: inherit;
			}

			/** Link type highlight styles */
			.link-type-highlight {
				border-radius: 2px;
				background-color: transparent;
				outline: 0 solid transparent;
				animation: highlight-fade-in 0.2s ease-in-out forwards;
				outline-width: 0;
			}

			.link-type-highlight.removing {
				animation: highlight-fade-out 0.2s ease-in-out forwards;
			}

			.link-type-highlight a {
				text-decoration: underline;
				text-decoration-color: currentColor;
				transition: text-decoration-color 0.2s ease-in-out;
				color: inherit !important;
			}

			.link-type-highlight:not(.removing) a {
				text-decoration-color: transparent;
			}

			@keyframes highlight-fade-in {
				0% {
					outline-width: 0;
					outline-color: transparent;
					background-color: transparent;
				}
				1% {
					outline-width: 2px;
					outline-color: transparent;
					background-color: transparent;
				}
				100% {
					outline-width: 2px;
					outline-color: rgba(0, 0, 0, 0.85);
					background-color: rgba(0, 0, 0, 0.85);
					color: white;
				}
			}

			@keyframes highlight-fade-out {
				0% {
					outline-width: 2px;
					outline-color: rgba(0, 0, 0, 0.85);
					background-color: rgba(0, 0, 0, 0.85);
					color: white;
				}
				99% {
					outline-width: 2px;
					outline-color: transparent;
					background-color: transparent;
					color: inherit;
				}
				100% {
					outline-width: 0;
					outline-color: transparent;
					background-color: transparent;
					color: inherit;
				}
			}
		`;
		iframeDocument.head.appendChild( style );
	}, [] );

	/**
	 * Finds all ranges containing the text.
	 *
	 * @since 3.18.0
	 *
	 * @param {string}   searchText The text to search for.
	 * @param {Node}     rootNode   The root node to search within.
	 * @param {Document} doc        The document to create ranges with.
	 *
	 * @return {Range[]} An array of ranges containing the text.
	 */
	const findText = useCallback( ( searchText: string, rootNode: Node, doc: Document ): Range[] => {
		const ranges: Range[] = [];
		const textNodes: Text[] = [];
		const treeWalker = doc.createTreeWalker(
			rootNode,
			NodeFilter.SHOW_TEXT,
			null
		);

		let node;
		let fullText = '';
		const nodePositions: {
			node: Text;
			start: number;
			end: number;
			blockParent: Element | null;
		}[] = [];

		// Build full text and track node positions.
		while ( ( node = treeWalker.nextNode() as Text ) ) {
			const nodeText = node.textContent ?? '';
			textNodes.push( node );

			// Find the closest block-level parent.
			const blockParent = node.parentElement?.closest( 'p' );

			nodePositions.push( {
				node,
				start: fullText.length,
				end: fullText.length + nodeText.length,
				blockParent: blockParent ?? null,
			} );
			fullText += nodeText;
		}

		// Find all matches in the full text.
		let match;
		const regex = new RegExp( escapeRegExp( searchText ), 'g' );
		while ( ( match = regex.exec( fullText ) ) !== null ) {
			const matchStart = match.index;
			const matchEnd = matchStart + searchText.length;

			// Find nodes that contain the match
			const startNode = nodePositions.find(
				( pos ) => matchStart >= pos.start && matchStart < pos.end
			);
			const endNode = nodePositions.find(
				( pos ) => matchEnd > pos.start && matchEnd <= pos.end
			);

			if ( startNode && endNode ) {
				// Check if both nodes are within the same block-level element.
				if ( startNode.blockParent &&
					endNode.blockParent &&
					startNode.blockParent === endNode.blockParent
				) {
					const range = doc.createRange();
					range.setStart(
						startNode.node,
						matchStart - startNode.start
					);
					range.setEnd(
						endNode.node,
						matchEnd - endNode.start
					);
					ranges.push( range );
				}
			}
		}

		return ranges;
	}, [] );

	/**
	 * Highlights a range with a specified class.
	 *
	 * @since 3.18.0
	 *
	 * @param {Range}   range      The range to highlight.
	 * @param {string}  className  The class name to apply to the highlight span.
	 * @param {boolean} isPrevious Whether this is a previous suggestion (optional).
	 */
	const highlightRange = useCallback( ( range: Range, className: string, isPrevious: boolean = false ) => {
		try {
			const iframeDocument = iframeRef.current?.contentDocument ?? iframeRef.current?.contentWindow?.document;
			if ( ! iframeDocument ) {
				return;
			}

			const fragment = range.cloneContents();
			const highlightSpan = iframeDocument.createElement( 'span' );
			highlightSpan.className = isPrevious
				? `${ className } previous-suggestion`
				: className;

			range.deleteContents();
			highlightSpan.appendChild( fragment );
			range.insertNode( highlightSpan );
		} catch ( e ) {
			// Silently fail if highlighting fails.
		}
	}, [ iframeRef ] );

	/**
	 * Removes highlight spans from the iframe content.
	 *
	 * @since 3.18.0
	 *
	 * @param {HTMLIFrameElement} iframe        The iframe element to remove highlights from.
	 * @param {string}            querySelector The query selector to find highlight elements.
	 * @param {boolean}           animate       Whether to animate the removal of highlights.
	 */
	const removeHighlights = useCallback( ( iframe: HTMLIFrameElement, querySelector: string, animate = false ) => {
		try {
			const iframeDocument = iframe.contentDocument ?? iframe.contentWindow?.document;
			if ( ! iframeDocument ) {
				return;
			}

			// Function to recursively unwrap nested highlights
			const unwrapHighlight = ( highlight: Element ) => {
				// First, recursively process any nested highlights
				const nestedHighlights = highlight.querySelectorAll( querySelector );
				nestedHighlights.forEach( ( nested ) => unwrapHighlight( nested ) );

				const parent = highlight.parentNode;
				if ( ! parent ) {
					return;
				}

				if ( animate ) {
					highlight.classList.add( 'removing' );

					setTimeout( () => {
						// Move all child nodes before the highlight span
						while ( highlight.firstChild ) {
							parent.insertBefore( highlight.firstChild, highlight );
						}
						parent.removeChild( highlight );
						parent.normalize();
					}, 200 );
				} else {
					// Move all child nodes before the highlight span
					while ( highlight.firstChild ) {
						parent.insertBefore( highlight.firstChild, highlight );
					}
					parent.removeChild( highlight );
					parent.normalize();
				}
			};

			// Get all top-level highlights
			const highlights = iframeDocument.querySelectorAll( querySelector );
			highlights.forEach( ( highlight ) => {
				// Only process top-level highlights (those that aren't nested inside another highlight)
				if ( ! highlight.parentElement?.closest( querySelector ) ) {
					unwrapHighlight( highlight );
				}
			} );
		} catch ( error ) {
			// Silently fail if there's an error removing highlights
		}
	}, [] );

	/**
	 * Removes the smart link highlights from the iframe content.
	 *
	 * @since 3.18.0
	 *
	 * @param {HTMLIFrameElement} iframe The iframe element to remove highlights from.
	 */
	const removeSmartLinkHighlights = useCallback( ( iframe: HTMLIFrameElement ) => {
		removeHighlights( iframe, '.smart-link-highlight' );
	}, [ removeHighlights ] );

	/**
	 * Highlights the smart link text in the iframe content.
	 *
	 * @since 3.18.0
	 *
	 * @param {HTMLIFrameElement} iframe The iframe element to highlight the smart link in.
	 */
	const highlightSmartLink = useCallback( ( iframe: HTMLIFrameElement ) => {
		try {
			const iframeDocument = iframe.contentDocument ?? iframe.contentWindow?.document;
			if ( ! iframeDocument || ! activeLink?.smart_link.text || ! contentAreaRef.current ) {
				return;
			}

			// If it's not a suggestion (it's an inbound link), we only need to highlight that smart link.
			if ( isInboundLink ) {
				const smartLinkId = activeLink.smart_link.uid;

				// Find the a element with the smart link id.
				const aElement = iframeDocument.querySelector( `a[data-smartlink="${ smartLinkId }"]` );

				if ( aElement ) {
					const selectionRange = iframeDocument.createRange();
					selectionRange.selectNode( aElement );
					highlightRange( selectionRange, 'smart-link-highlight' );
				}

				return;
			}

			let selectionRange = null;
			let originalRange = null;

			// If there's a selected text, get the range for that text.
			if ( selectedText?.text ) {
				const selectionRanges = findText( selectedText.text, contentAreaRef.current, iframeDocument );
				if ( selectionRanges[ selectedText.offset ] ) {
					selectionRange = selectionRanges[ selectedText.offset ];
				}
			}

			// Get the original suggestion text range.
			if ( activeLink.smart_link.text ) {
				const originalRanges = findText( activeLink.smart_link.text, contentAreaRef.current, iframeDocument );
				if ( originalRanges[ activeLink.smart_link.offset ?? 0 ] ) {
					originalRange = originalRanges[ activeLink.smart_link.offset ?? 0 ];
				}
			}

			// If there's no selected text, highlight the original suggestion text.
			if ( ! selectedText && originalRange ) {
				highlightRange( originalRange, 'smart-link-highlight', false );
				return;
			}

			// If there is a selected text and an original suggestion text, highlight both.
			if ( selectionRange && originalRange ) {
				// Check if the selection range overlaps with the original range.
				const doRangesOverlap = ! (
					selectionRange.compareBoundaryPoints( Range.END_TO_START, originalRange ) > 0 ||
					selectionRange.compareBoundaryPoints( Range.START_TO_END, originalRange ) < 0
				);

				// If the ranges overlap, highlight the original suggestion text before
				// and/or after the selected text.
				if ( doRangesOverlap ) {
					if ( originalRange.compareBoundaryPoints( Range.START_TO_START, selectionRange ) < 0 ) {
						const beforeRange = originalRange.cloneRange();
						beforeRange.setEnd( selectionRange.startContainer, selectionRange.startOffset );
						highlightRange( beforeRange, 'smart-link-highlight', true );
					}

					if ( originalRange.compareBoundaryPoints( Range.END_TO_END, selectionRange ) > 0 ) {
						const afterRange = originalRange.cloneRange();
						afterRange.setStart( selectionRange.endContainer, selectionRange.endOffset );
						highlightRange( afterRange, 'smart-link-highlight', true );
					}

					highlightRange( selectionRange, 'smart-link-highlight' );
				} else {
					// Handle non-overlapping ranges.
					highlightRange( originalRange, 'smart-link-highlight', true );
					highlightRange( selectionRange, 'smart-link-highlight' );
				}
			}
		} catch ( error ) {
			// Silently fail if there's an error highlighting smart link text.
		}
	}, [ activeLink, contentAreaRef, findText, highlightRange, isInboundLink, selectedText ] );

	/**
	 * Highlights the links of the selected link type in the iframe.
	 *
	 * @since 3.18.0
	 *
	 * @param {HTMLIFrameElement} iframe           The iframe element to highlight the links in.
	 * @param {string}            selectedLinkType The selected link type to highlight.
	 */
	const highlightLinkType = useCallback( ( iframe: HTMLIFrameElement, selectedLinkType: LinkType | null ) => {
		const iframeDocument = iframe.contentDocument ?? iframe.contentWindow?.document;
		if ( ! iframeDocument ) {
			return;
		}

		// Remove any existing highlights.
		removeHighlights( iframe, '.link-type-highlight', true );

		if ( ! activeLink || ! selectedLinkType ) {
			return;
		}

		// Get all the links of the selected link type.
		const links = activeLink?.postLinks[ selectedLinkType ];
		if ( ! links?.length ) {
			return;
		}

		// Find and highlight matching links in the iframe
		const allIframeLinks = iframeDocument.querySelectorAll( 'a' );
		allIframeLinks.forEach( ( iframeLink ) => {
			// Match links based on href and text content
			const matchingLink = links.find( ( link ) => {
				if ( link.hasAttribute( 'data-smartlink' ) ) {
					return link.getAttribute( 'data-smartlink' ) === iframeLink.getAttribute( 'data-smartlink' );
				}

				const hrefMatches = link.href === iframeLink.href;
				const textMatches = link.textContent === iframeLink.textContent;
				return hrefMatches && textMatches;
			} );

			if ( matchingLink ) {
				const selectionRange = iframeDocument.createRange();
				selectionRange.selectNode( iframeLink );
				highlightRange( selectionRange, 'link-type-highlight' );
			}
		} );
	}, [ activeLink, highlightRange, removeHighlights ] );

	return {
		injectHighlightStyles,
		highlightSmartLink,
		highlightLinkType,
		removeSmartLinkHighlights,
		removeHighlights,
	};
};

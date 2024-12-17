/**
 * WordPress imports
 */
import { Spinner } from '@wordpress/components';
import { useCallback, useEffect, useRef } from '@wordpress/element';

/**
 * Internal imports
 */
import { escapeRegExp } from '../../../../../common/utils/functions';
import { TrafficBoostLink } from '../../provider';
import { TextSelectionTooltip } from './text-selection-tooltip';
import { HydratedPost } from '../../../../../common/base-wordpress-provider';
import { TextSelection } from '../preview';

/**
 * Props structure for PreviewIframe.
 *
 * @since 3.18.0
 */
interface PreviewIframeProps {
	post: HydratedPost;
	activeLink?: TrafficBoostLink | null;
	selectedText?: TextSelection | null;
	previewUrl: string;
	isLoading: boolean;
	onTextSelected: ( text: string, offset: number ) => void;
	isFrontendPreview: boolean;
	onLoadingChange: ( isLoading: boolean ) => void;
}

/**
 * Injects highlight styles into the iframe.
 *
 * @since 3.18.0
 *
 * @param {HTMLIFrameElement} iframe The iframe element to inject styles into.
 */
const injectHighlightStyles = ( iframe: HTMLIFrameElement ) => {
	const iframeDocument = iframe.contentDocument ?? iframe.contentWindow?.document;
	if ( ! iframeDocument ) {
		return;
	}

	const style = iframeDocument.createElement( 'style' );
	style.textContent = `
		.smart-link-highlight {
			padding: 2px 4px;
			border-radius: 2px;
			background-color: rgba(91, 167, 69, 0.5);
		}

		.smart-link-highlight.previous-suggestion {
			background-color: rgba(91, 167, 69, 0.2);
			text-decoration: line-through;
		}
	`;
	iframeDocument.head.appendChild( style );
};

/**
 * Preview iframe component for the Traffic Boost feature.
 * Displays preview iframe for a selected post.
 *
 * @since 3.18.0
 *
 * @param {PreviewIframeProps} props Component props.
 */
export const PreviewIframe = ( {
	previewUrl,
	isLoading,
	onTextSelected,
	isFrontendPreview,
	activeLink,
	selectedText,
	onLoadingChange,
}: PreviewIframeProps ): React.JSX.Element => {
	const contentAreaRef = useRef<Element | null>( null ) as React.MutableRefObject<Element | null>;
	const iframeRef = useRef<HTMLIFrameElement>( null );
	const isInboundLink = ! activeLink?.isSuggestion;

	/**
	 * Hides the admin bar from the iframe if the preview is in frontend mode.
	 *
	 * @since 3.18.0
	 *
	 * @param {HTMLIFrameElement} iframe The iframe element to hide the admin bar in.
	 */
	const hideAdminBar = useCallback( ( iframe: HTMLIFrameElement ) => {
		if ( ! isFrontendPreview ) {
			return;
		}

		const adminBar = iframe.contentWindow?.document.getElementById( 'wpadminbar' );
		if ( adminBar ) {
			adminBar.style.display = 'none';
		}

		const html = iframe.contentWindow?.document.documentElement;
		if ( html ) {
			html.style.setProperty( 'margin-top', '0', 'important' );
		}
	}, [ isFrontendPreview ] );

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

	const highlightRange = useCallback( ( range: Range, isPrevious: boolean = false ) => {
		try {
			const iframeDocument = iframeRef.current?.contentDocument ?? iframeRef.current?.contentWindow?.document;
			if ( ! iframeDocument ) {
				return;
			}

			const fragment = range.cloneContents();
			const highlightSpan = iframeDocument.createElement( 'span' );
			highlightSpan.className = isPrevious
				? 'smart-link-highlight previous-suggestion'
				: 'smart-link-highlight';

			range.deleteContents();
			highlightSpan.appendChild( fragment );
			range.insertNode( highlightSpan );
		} catch ( e ) {
			// Silently fail if highlighting fails.
		}
	}, [] );

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
					highlightRange( selectionRange );
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
				highlightRange( originalRange, false );
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
						highlightRange( beforeRange, true );
					}

					if ( originalRange.compareBoundaryPoints( Range.END_TO_END, selectionRange ) > 0 ) {
						const afterRange = originalRange.cloneRange();
						afterRange.setStart( selectionRange.endContainer, selectionRange.endOffset );
						highlightRange( afterRange, true );
					}

					highlightRange( selectionRange );
				} else {
					// Handle non-overlapping ranges.
					highlightRange( originalRange, true );
					highlightRange( selectionRange );
				}
			}
		} catch ( error ) {
			// Silently fail if there's an error highlighting smart link text.
		}
	}, [ activeLink, selectedText, findText, isInboundLink, highlightRange ] );

	/**
	 * Removes the smart link highlights from the iframe content.
	 *
	 * @since 3.18.0
	 *
	 * @param {HTMLIFrameElement} iframe The iframe element to remove highlights from.
	 */
	const removeSmartLinkHighlights = useCallback( ( iframe: HTMLIFrameElement ) => {
		try {
			const iframeDocument = iframe.contentDocument ?? iframe.contentWindow?.document;
			if ( ! iframeDocument ) {
				return;
			}

			// Find all highlight spans.
			const highlights = iframeDocument.querySelectorAll( '.smart-link-highlight' );

			// Process highlights in reverse order to avoid issues with nested highlights.
			Array.from( highlights ).reverse().forEach( ( highlight ) => {
				const parent = highlight.parentNode;
				if ( ! parent ) {
					return;
				}

				// Move all child nodes before the highlight span
				while ( highlight.firstChild ) {
					parent.insertBefore( highlight.firstChild, highlight );
				}

				// Remove the empty highlight span
				parent.removeChild( highlight );

				// Normalize any adjacent text nodes
				parent.normalize();
			} );
		} catch ( error ) {
			// Silently fail if there's an error removing highlights
		}
	}, [] );

	/**
	 * Disables all navigation within the iframe.
	 *
	 * @since 3.18.0
	 *
	 * @param {HTMLIFrameElement} iframe The iframe element to disable navigation in.
	 */
	const disableNavigation = useCallback( ( iframe: HTMLIFrameElement ) => {
		const iframeDocument = iframe.contentDocument ?? iframe.contentWindow?.document;
		const iframeWindow = iframe.contentWindow;

		if ( ! iframeDocument || ! iframeWindow ) {
			return;
		}

		// Prevent clicks on all links.
		iframeDocument.addEventListener( 'click', ( event ) => {
			const target = event.target as HTMLElement;
			if ( target.tagName === 'A' || target.closest( 'a' ) ) {
				event.preventDefault();
				event.stopPropagation();
			}
		}, true );

		// Disable form submissions.
		iframeDocument.addEventListener( 'submit', ( event ) => {
			event.preventDefault();
			event.stopPropagation();
		}, true );

		// Override window.open.
		Object.defineProperty( iframeWindow, 'open', {
			value: () => null,
			writable: false,
		} );

		try {
			// Attempt to make history methods no-op.
			iframeWindow.history.pushState = () => undefined;
			iframeWindow.history.replaceState = () => undefined;
		} catch ( error ) {
			// Silently fail if we can't override history methods.
		}

		// Prevent navigation via history.
		iframeWindow.addEventListener( 'popstate', ( event ) => {
			event.preventDefault();
			event.stopPropagation();
		}, true );
	}, [] );

	/**
	 * Jumps to the smart link text in the iframe.
	 *
	 * @since 3.18.0
	 *
	 * @param {HTMLIFrameElement} iframe The iframe element to jump to the smart link in.
	 */
	const jumpToSmartLink = useCallback( ( iframe: HTMLIFrameElement ) => {
		const iframeDocument = iframe.contentDocument ?? iframe.contentWindow?.document;
		if ( ! iframeDocument ) {
			return;
		}

		const scrollToHighlightedElement = async () => {
			const highlightedElement = iframeDocument.querySelector( '.smart-link-highlight' );
			if ( highlightedElement ) {
				// Wait 100ms to ensure the highlighted element is visible.
				await new Promise( ( resolve ) => setTimeout( resolve, 100 ) );

				highlightedElement.scrollIntoView( {
					behavior: 'smooth',
					block: 'center',
				} );
			}
		};

		// It might be possible that the highlighted element is not visible immediately after the iframe loads,
		// because the iframe content is not fully loaded yet, such as a custom block still being loaded.
		// So we use a MutationObserver to watch for DOM changes and scroll to the highlighted element once
		// it's visible.
		const watchForHighlightedElement = ( mutations: MutationRecord[], obs: MutationObserver ) => {
			const highlightedElement = iframeDocument.querySelector( '.smart-link-highlight' );
			if ( highlightedElement ) {
				scrollToHighlightedElement();
				obs.disconnect();
			}
		};

		const observer = new MutationObserver( watchForHighlightedElement );
		observer.observe( iframeDocument.querySelector( '.wp-parsely-preview-wrapper' ) as Element, {
			childList: true,
			subtree: true,
		} );

		// Try to scroll to the highlighted element immediately.
		scrollToHighlightedElement();

		// Disconnect the observer after 5 seconds to prevent infinite observation.
		setTimeout( () => observer.disconnect(), 5000 );
	}, [] );

	/**
	 * Handles the iframe load event.
	 */
	const handleIframeLoad = useCallback( async ( iframe: HTMLIFrameElement ) => {
		if ( ! iframe || ! iframe.contentDocument ) {
			return;
		}

		injectHighlightStyles( iframe );

		// Updates the content area ref to the iframe's content area.
		const contentArea = iframe.contentWindow?.document.querySelector( '.wp-parsely-preview-wrapper' );
		if ( contentArea ) {
			contentAreaRef.current = contentArea;
		}

		hideAdminBar( iframe );
		highlightSmartLink( iframe );
		disableNavigation( iframe );

		setTimeout( () => {
			onLoadingChange( false );
			jumpToSmartLink( iframe );
		}, 500 );
	}, [ disableNavigation, hideAdminBar, highlightSmartLink, jumpToSmartLink, onLoadingChange ] );

	/**
	 * Handles iframe initialization and cleanup.
	 */
	useEffect( () => {
		const iframe = iframeRef.current;
		if ( ! iframe ) {
			return;
		}

		const handleLoadCallback = () => {
			handleIframeLoad( iframe );
		};

		// Only set loading state if the URL has changed
		if ( iframe.src !== previewUrl ) {
			onLoadingChange( true );
		}

		iframe.addEventListener( 'load', handleLoadCallback );

		return () => {
			iframe.removeEventListener( 'load', handleLoadCallback );
		};
	}, [ handleIframeLoad, iframeRef, previewUrl, onLoadingChange ] );

	/**
	 * Re-highlights smart link when selection changes
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const iframe = iframeRef.current;
		if ( ! iframe ) {
			return;
		}

		if ( ! selectedText ) {
			removeSmartLinkHighlights( iframe );
		}

		highlightSmartLink( iframe );
	}, [ highlightSmartLink, iframeRef, removeSmartLinkHighlights, selectedText ] );

	return (
		<div className="wp-parsely-preview">
			<div className="preview-iframe-wrapper">
				<div className={ `wp-parsely-preview-loading ${ isLoading ? 'is-loading' : '' }` }>
					<Spinner />
				</div>
				{ ! isInboundLink && (
					<TextSelectionTooltip
						iframeRef={ iframeRef }
						onTextSelected={ ( text, offset ) => {
							if ( iframeRef.current ) {
								removeSmartLinkHighlights( iframeRef.current );
							}
							onTextSelected( text, offset );
						} }
					/>
				) }
				<iframe
					ref={ iframeRef }
					src={ previewUrl }
					title="Post Preview"
					className={ `wp-parsely-preview-iframe ${ isLoading ? 'is-loading' : '' }` }
					sandbox="allow-same-origin allow-scripts"
				/>
			</div>
		</div>
	);
};

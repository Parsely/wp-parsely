/**
 * WordPress imports
 */
import { Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useCallback, useEffect, useRef } from '@wordpress/element';

/**
 * Internal imports
 */
import { HydratedPost } from '../../../../../common/base-wordpress-provider';
import { TrafficBoostLink } from '../../provider';
import { TrafficBoostStore } from '../../store';
import { useIframeHighlight } from '../hooks/use-iframe-highlight';
import { TextSelection } from '../preview';
import { TextSelectionTooltip } from './text-selection-tooltip';

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
	onRestoreOriginal: () => void;
}

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
	onRestoreOriginal,
}: PreviewIframeProps ): React.JSX.Element => {
	const contentAreaRef = useRef<Element | null>( null ) as React.MutableRefObject<Element | null>;
	const iframeRef = useRef<HTMLIFrameElement>( null );
	const isInboundLink = ! activeLink?.isSuggestion;

	const { selectedLinkType } = useSelect( ( select ) => ( {
		selectedLinkType: select( TrafficBoostStore ).getPreviewLinkType(),
	} ), [] );

	const {
		injectHighlightStyles,
		highlightSmartLink,
		highlightLinkType,
		removeSmartLinkHighlights,
	} = useIframeHighlight( {
		iframeRef,
		contentAreaRef,
		activeLink,
		selectedText,
		isInboundLink,
		onRestoreOriginal,
	} );

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

		// Prevent clicks on all links and handle link selection.
		iframeDocument.addEventListener( 'click', ( event ) => {
			const target = event.target as HTMLElement;

			// If the link is outside the content area, don't handle it.
			if ( ! contentAreaRef.current?.contains( target ) ) {
				event.preventDefault();
				event.stopPropagation();
				return;
			}

			const link = target.tagName === 'A' ? target : target.closest( 'a' );
			if ( link ) {
				event.preventDefault();
				event.stopPropagation();

				// If the parent is not a paragraph, skip.
				if ( target.parentElement?.tagName !== 'P' ) {
					return;
				}

				// Remove focus from the link.
				link.blur();

				// Select the link text so it can be highlighted.
				link.ownerDocument.defaultView?.getSelection()?.selectAllChildren( link );
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

		// Disable right click.
		iframeDocument.addEventListener( 'contextmenu', ( event ) => {
			event.preventDefault();
			event.stopPropagation();
		}, true );

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
				// Wait 200ms to ensure the highlighted element is visible.
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
		const watchForHighlightedElement = () => {
			const highlightedElement = iframeDocument.querySelector( '.smart-link-highlight' );
			if ( highlightedElement ) {
				scrollToHighlightedElement();
			}
		};

		const observer = new MutationObserver( watchForHighlightedElement );
		observer.observe( iframeDocument.querySelector( '.wp-parsely-preview-wrapper' ) as Element, {
			childList: true,
			subtree: true,
		} );

		// Try to scroll to the highlighted element immediately.
		scrollToHighlightedElement();

		// Disconnect the observer after a short delay to prevent infinite observation.
		setTimeout( () => observer.disconnect(), 1000 );
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
		highlightLinkType( iframe, selectedLinkType );
		disableNavigation( iframe );

		setTimeout( () => {
			onLoadingChange( false );
			jumpToSmartLink( iframe );
		}, 500 );
	}, [
		disableNavigation,
		hideAdminBar,
		highlightLinkType,
		highlightSmartLink,
		injectHighlightStyles,
		jumpToSmartLink,
		onLoadingChange,
		selectedLinkType,
	] );

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

		removeSmartLinkHighlights( iframe );
		highlightSmartLink( iframe );
	}, [ highlightSmartLink, removeSmartLinkHighlights, selectedText ] );

	useEffect( () => {
		const iframe = iframeRef.current;
		if ( ! iframe ) {
			return;
		}

		highlightLinkType( iframe, selectedLinkType );
	}, [ highlightLinkType, iframeRef, selectedLinkType ] );

	return (
		<div className="wp-parsely-preview">
			<div className="preview-iframe-wrapper">
				<div className={ `wp-parsely-preview-loading ${ isLoading ? 'is-loading' : '' }` }>
					<Spinner />
				</div>
				<TextSelectionTooltip
					iframeRef={ iframeRef }
					onTextSelected={ ( text, offset ) => {
						onTextSelected( text, offset );
					} }
				/>
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

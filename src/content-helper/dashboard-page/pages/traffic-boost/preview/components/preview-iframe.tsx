/**
 * WordPress imports
 */
import { Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useCallback, useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

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
	const [ isGeneratingPlacement, setIsGeneratingPlacement ] = useState<boolean>( false );
	const [ didGeneratePlacement, setDidGeneratePlacement ] = useState<boolean>( false );
	const [ messageIndex, setMessageIndex ] = useState<number>( -1 );

	const contentAreaRef = useRef<Element | null>( null ) as React.MutableRefObject<Element | null>;
	const iframeRef = useRef<HTMLIFrameElement>( null );
	const isInboundLink = ! activeLink?.isSuggestion;

	const { selectedLinkType } = useSelect( ( select ) => ( {
		selectedLinkType: select( TrafficBoostStore ).getPreviewLinkType(),
	} ), [] );

	const messages = useMemo( () => [
		__( "We're finding the perfect spot to plant your links…", 'wp-parsely' ),
		__( 'Analyzing your content to place links naturally…', 'wp-parsely' ),
		__( 'Optimizing link placement for maximum impact…', 'wp-parsely' ),
		__( 'Carefully selecting ideal spots to plant links…', 'wp-parsely' ),
		__( 'Evaluating content flow for seamless link integration…', 'wp-parsely' ),
		__( 'Almost there! Finalizing link suggestions…', 'wp-parsely' ),
	], [] );

	/**
	 * Sets the message index to a random index based on the messages array length.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		setMessageIndex( Math.floor( Math.random() * messages.length ) );
	}, [ activeLink, messages ] );

	/**
	 * Highlights the smart link in the iframe.
	 *
	 * @since 3.18.0
	 */
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
	 *
	 * @since 3.18.0
	 *
	 * @param {HTMLIFrameElement} iframe The iframe element to handle the load event for.
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

		const delayValue = didGeneratePlacement ? 2000 : 500;
		setTimeout( () => {
			onLoadingChange( false );
			jumpToSmartLink( iframe );
		}, delayValue );
	}, [
		disableNavigation,
		hideAdminBar,
		highlightLinkType,
		highlightSmartLink,
		injectHighlightStyles,
		jumpToSmartLink,
		onLoadingChange,
		selectedLinkType,
		didGeneratePlacement,
	] );

	/**
	 * Handles iframe initialization and cleanup.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		// If we're generating placement, don't try to set up the iframe yet.
		if ( isGeneratingPlacement ) {
			return;
		}

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
	}, [ isGeneratingPlacement, previewUrl, handleIframeLoad, onLoadingChange, iframeRef ] );

	/**
	 * Flags the iframe as having generated placement when the generation is complete.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( ! isGeneratingPlacement ) {
			return;
		}

		setDidGeneratePlacement( true );
	}, [ isGeneratingPlacement ] );

	/**
	 * Sets the isGeneratingPlacement state to true if the active link is a suggestion and is generating placement.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const isLinkGeneratingPlacement = activeLink?.isSuggestion && activeLink.isGeneratingPlacement;
		setIsGeneratingPlacement( isLinkGeneratingPlacement ?? false );
	}, [ activeLink?.isGeneratingPlacement, activeLink?.isSuggestion, isLoading ] );

	/**
	 * Sets the isGeneratingPlacement state to true if the active link is generating placement.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( activeLink?.isGeneratingPlacement ) {
			setIsGeneratingPlacement( true );
			return;
		}

		setIsGeneratingPlacement( false );
		setDidGeneratePlacement( false );
	}, [ activeLink ] );

	/**
	 * Force a reload of the iframe when isGeneratingPlacement changes from true to false.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( isGeneratingPlacement ) {
			return;
		}

		// Set loading state to true as we're about to reload.
		onLoadingChange( true );

		// Use a small timeout to ensure the iframe is in the DOM.
		const timeoutId = setTimeout( () => {
			const iframe = iframeRef.current;
			if ( iframe ) {
				iframe.src = previewUrl;
			}
		}, 0 );

		return () => clearTimeout( timeoutId );
	}, [ isGeneratingPlacement, previewUrl, onLoadingChange ] );

	/**
	 * Re-highlights smart link when selection changes.
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

	/**
	 * Highlights the link type in the iframe.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const iframe = iframeRef.current;
		if ( ! iframe ) {
			return;
		}

		highlightLinkType( iframe, selectedLinkType );
	}, [ highlightLinkType, iframeRef, selectedLinkType ] );

	/**
	 * Picks a random message with interval based on message length when isGeneratingPlacement is true.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( ! isGeneratingPlacement ) {
			return;
		}

		const intervalId = setInterval( () => {
			const randomIndex = Math.floor( Math.random() * messages.length );
			setMessageIndex( randomIndex );
		}, messages[ messageIndex ].length * 100 );

		return () => clearInterval( intervalId );
	}, [ isGeneratingPlacement, messageIndex, messages ] );

	return (
		<div className="wp-parsely-preview">
			<div className="preview-iframe-wrapper">
				<div className={ `wp-parsely-preview-loading ${ isLoading ? 'is-loading' : '' }` }>
					<Spinner />
					{ isGeneratingPlacement && (
						<>
							{ messages[ messageIndex ] }
						</>
					) }
					{ ! isGeneratingPlacement && didGeneratePlacement && (
						<>
							{ __( 'Done, loading your post…', 'wp-parsely' ) }
						</>
					) }
				</div>
				<TextSelectionTooltip
					iframeRef={ iframeRef }
					onTextSelected={ ( text, offset ) => {
						onTextSelected( text, offset );
					} }
				/>
				<iframe
					key={ `${ previewUrl }-${ isGeneratingPlacement }` }
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

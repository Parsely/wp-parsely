import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Icon,
	PanelBody,
	PanelRow,
	Popover,
	Spinner,
	ToggleControl,
	TextControl,
	CheckboxControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { cog, desktop, edit, link, page } from '@wordpress/icons';
import { addQueryArgs } from '@wordpress/url';
import { Thumbnail } from '../../../../../common/components/thumbnail';
import { LeafIcon } from '../../../../../common/icons/leaf-icon';
import { TrafficBoostLink } from '../../provider';
import { TrafficBoostStore } from '../../store';
import './preview.scss';

interface TrafficBoostPreviewProps {
	activeLink: TrafficBoostLink | null;
	iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const TrafficBoostPreview = ( {
	activeLink,
	iframeRef,
}: TrafficBoostPreviewProps ): React.JSX.Element => {
	const [ isSettingsOpen, setIsSettingsOpen ] = useState<boolean>( false );
	const [ isFrontendPreview, setIsFrontendPreview ] = useState<boolean>( false );
	const [ previewUrl, setPreviewUrl ] = useState<string>( '' );
	const [ isLoading, setIsLoading ] = useState<boolean>( true );
	const activePost = activeLink?.targetPost;
	const settingsButtonRef = useRef<HTMLButtonElement>( null );
	const contentAreaRef = useRef<Element | null>( null ) as React.MutableRefObject<Element | null>;

	const { post } = useSelect( ( select ) => {
		return {
			post: select( TrafficBoostStore ).getCurrentPost(),
		};
	}, [] );

	/**
	 * Sets the preview URL based on the active post and frontend preview setting.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( ! activePost ) {
			return;
		}

		if ( ! isFrontendPreview ) {
			setPreviewUrl( addQueryArgs( `${ window.location.origin }/wp-admin/admin-ajax.php`, {
				action: 'parsely_post_preview',
				post_id: activePost.id,
				_wpnonce: window._parsely_traffic_boost_preview_nonce ?? '',
			} ) );
		} else {
			setPreviewUrl( addQueryArgs( activePost.guid.raw, {
				parsely_preview: 'true',
				_wpnonce: window._parsely_traffic_boost_preview_nonce ?? '',
			} ) );
		}
	}, [ activePost, isFrontendPreview ] );

	/**
	 * Handles all iframe-related functionality:
	 * - Hiding admin bar in frontend preview mode
	 * - Highlighting WordPress mentions
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const iframe = iframeRef.current;
		if ( ! iframe ) {
			return;
		}

		/**
		 * Hides the admin bar from the iframe if the preview is in frontend mode.
		 *
		 * @since 3.18.0
		 */
		const hideAdminBar = () => {
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
		};

		/**
		 * Highlights the smart link text in the iframe content.
		 *
		 * @since 3.18.0
		 */
		const highlightSmartLink = () => {
			try {
				const iframeDocument = iframe.contentDocument ?? iframe.contentWindow?.document;
				if ( ! iframeDocument || ! activeLink?.smart_link?.text ) {
					return;
				}

				if ( ! contentAreaRef.current ) {
					return;
				}

				// Find all text nodes in the content area
				const walker = document.createTreeWalker(
					contentAreaRef.current,
					NodeFilter.SHOW_TEXT,
					null
				);

				const textNodes: Node[] = [];
				let node;
				while ( ( node = walker.nextNode() ) ) {
					textNodes.push( node );
				}

				// Replace smart link text with highlighted version
				textNodes.forEach( ( textNode ) => {
					const text = textNode.textContent ?? '';
					if ( text.includes( activeLink.smart_link.text ) ) {
						const span = iframeDocument.createElement( 'span' );
						span.innerHTML = text.replace(
							new RegExp( `(${ activeLink.smart_link.text })`, 'g' ),
							'<span class="smart-link-highlight">$1</span>'
						);
						textNode.parentNode?.replaceChild( span, textNode );
					}
				} );

				// Add highlight styles to iframe
				const style = iframeDocument.createElement( 'style' );
				style.textContent = `
					.smart-link-highlight {
						background-color: #FFF1B8;
						padding: 2px 4px;
						border-radius: 2px;
					}
				`;
				iframeDocument.head.appendChild( style );
			} catch ( error ) {
				// Silently fail if there's an error highlighting smart link text
			}
		};

		/**
		 * Disables all navigation within the iframe.
		 *
		 * @since 3.18.0
		 */
		const disableNavigation = () => {
			const iframeDocument = iframeRef.current?.contentDocument ?? iframeRef.current?.contentWindow?.document;
			const iframeWindow = iframeRef.current?.contentWindow;

			if ( ! iframeDocument || ! iframeWindow ) {
				return;
			}

			// Prevent clicks on all links
			iframeDocument.addEventListener( 'click', ( event ) => {
				const target = event.target as HTMLElement;
				if ( target.tagName === 'A' || target.closest( 'a' ) ) {
					event.preventDefault();
					event.stopPropagation();
				}
			}, true );

			// Disable form submissions
			iframeDocument.addEventListener( 'submit', ( event ) => {
				event.preventDefault();
				event.stopPropagation();
			}, true );

			// Override window.open
			Object.defineProperty( iframeWindow, 'open', {
				value: () => null,
				writable: false,
			} );

			try {
				// Attempt to make history methods no-op
				iframeWindow.history.pushState = () => undefined;
				iframeWindow.history.replaceState = () => undefined;
			} catch ( error ) {
				// Silently fail if we can't override history methods
			}

			// Prevent navigation via history
			iframeWindow.addEventListener( 'popstate', ( event ) => {
				event.preventDefault();
				event.stopPropagation();
			}, true );
		};

		/**
		 * Jumps to the smart link text in the iframe.
		 *
		 * This function smoothly scrolls to the highlighted smart link text.
		 *
		 * @since 3.18.0
		 */
		const jumpToSmartLink = () => {
			const iframeDocument = iframeRef.current?.contentDocument ?? iframeRef.current?.contentWindow?.document;
			if ( ! iframeDocument ) {
				return;
			}

			const highlightedElement = iframeDocument.querySelector( '.smart-link-highlight' );
			if ( ! highlightedElement ) {
				return;
			}

			highlightedElement.scrollIntoView( {
				behavior: 'smooth',
				block: 'center',
			} );
		};

		/**
		 * Handles the iframe load event.
		 *
		 * @since 3.18.0
		 */
		const handleIframeLoad = async () => {
			// Updates the content area ref to the iframe's content area.
			const contentArea = iframe.contentWindow?.document.querySelector( '.wp-parsely-preview-wrapper' );
			if ( contentArea ) {
				contentAreaRef.current = contentArea;
			}

			console.log( activeLink?.smart_link.text );

			hideAdminBar();
			highlightSmartLink();
			disableNavigation();

			// Flag the iframe as loaded after a small delay to ensure smooth transition.
			await new Promise( ( resolve ) => setTimeout( resolve, 200 ) );
			setIsLoading( false );

			// Wait for a few milliseconds to ensure the iframe is fully loaded before jumping to the smart link.
			await new Promise( ( resolve ) => setTimeout( resolve, 500 ) );
			jumpToSmartLink();
		};

		iframe.addEventListener( 'load', handleIframeLoad );

		// Set loading state when URL changes
		setIsLoading( true );

		return () => {
			iframe.removeEventListener( 'load', handleIframeLoad );
		};
	}, [ iframeRef, isFrontendPreview, activePost, activeLink ] );

	/**
	 * Opens the post in a new tab.
	 *
	 * @since 3.18.0
	 */
	const openPostInNewTab = () => {
		if ( ! activePost?.guid?.raw ) {
			return;
		}
		window.open( activePost.guid.raw, '_blank' );
	};

	/**
	 * Opens the post editor in a new tab.
	 *
	 * @since 3.18.0
	 */
	const openPostEditor = () => {
		if ( ! activePost?.id ) {
			return;
		}
		window.open( `${ window.location.origin }/wp-admin/post.php?post=${ activePost.id }&action=edit`, '_blank' );
	};

	/**
	 * Opens the Parse.ly dashboard for this post in a new tab.
	 *
	 * @since 3.18.0
	 */
	const openParselyDashboard = () => {
		if ( ! activePost?.guid?.raw ) {
			return;
		}
		const parselyDashboardUrl = `https://dash.parsely.com/${ window.wpParselySiteId }/find?url=${ encodeURIComponent( activePost.guid.raw ) }`;
		window.open( parselyDashboardUrl, '_blank' );
	};

	if ( ! activePost ) {
		return <></>;
	}

	const toggleSettings = () => {
		setIsSettingsOpen( ( state ) => ! state );
	};

	return (
		<div className="traffic-boost-preview">
			<div className="traffic-boost-preview-header">
				<div className="traffic-boost-preview-stats">
					<div>
						<span>{ __( 'Post Stats:', 'wp-parsely' ) }</span>
						<span>12 Links</span>
						<Icon icon={ link } />
					</div>
				</div>
				<div className="traffic-boost-preview-actions">
					<Button
						icon={ desktop }
						onClick={ openPostInNewTab }
						label={ __( 'View post on site', 'wp-parsely' ) }
					/>
					<Button
						icon={ edit }
						onClick={ openPostEditor }
						label={ __( 'Edit post', 'wp-parsely' ) }
					/>
					<Button
						iconSize={ 20 }
						icon={ <LeafIcon /> }
						onClick={ openParselyDashboard }
						label={ __( 'View in Parse.ly', 'wp-parsely' ) }
					/>
					<Button
						ref={ settingsButtonRef }
						icon={ cog }
						onClick={ toggleSettings }
						label={ __( 'Preview Settings', 'wp-parsely' ) }
						className="traffic-boost-preview-settings-button"
					/>
					{ isSettingsOpen && (
						<Popover
							className="traffic-boost-preview-settings-popover"
							anchor={ settingsButtonRef.current }
							position="bottom left"
							onFocusOutside={ ( event: React.SyntheticEvent<Element, Event> ) => {
								// Don't close if clicking the settings button.
								const target = ( event.nativeEvent as FocusEvent ).relatedTarget as Element | null;
								if ( target === settingsButtonRef.current ) {
									return;
								}
								setIsSettingsOpen( false );
							} }
							noArrow={ false }
						>
							<div
								className="traffic-boost-preview-settings-popover-content"
							>
								<ToggleControl
									__nextHasNoMarginBottom
									label="Frontend Preview"
									checked={ isFrontendPreview }
									onChange={ setIsFrontendPreview }
									help="Preview post as it appears on your site's frontend"
								/>
							</div>
						</Popover>
					) }
				</div>
			</div>
			<div className="wp-parsely-preview-editor">
				<div className={ `wp-parsely-preview-loading ${ isLoading ? 'is-loading' : '' }` }>
					<Spinner />
				</div>
				<div className="preview-iframe-wrapper">
					<iframe
						ref={ iframeRef }
						src={ previewUrl }
						title="Post Preview"
						className={ `wp-parsely-preview-iframe ${ isLoading ? 'is-loading' : '' }` }
						sandbox="allow-same-origin allow-scripts"
					/>
				</div>
			</div>
			<div className="traffic-boost-preview-footer">
				{ post && (
					<Card>
						<CardHeader className="traffic-boost-preview-footer-header">
							<div className="traffic-boost-preview-footer-details">
								<Thumbnail
									post={ post }
									size={ 64 }
									icon={ page }
								/>
								<div className="details-wrapper">
									<div className="details-title">{ post?.title.rendered }</div>
									<div className="details-url">{ post?.guid?.rendered }</div>
								</div>
							</div>
							<div className="traffic-boost-preview-footer-actions">
								<Button
									variant="primary"
								>{ __( 'Approve', 'wp-parsely' ) }</Button>
								<Button
									variant="secondary"
								>{ __( 'Discard', 'wp-parsely' ) }</Button>
							</div>
						</CardHeader>
						<CardBody className="traffic-boost-preview-footer-body">
							<PanelBody
								className="traffic-boost-preview-footer-panel"
								title={ __( 'Link Options', 'wp-parsely' ) }
								initialOpen={ false }
							>
								<PanelRow>
									<TextControl
										label={ __( 'Text', 'wp-parsely' ) }
										value={ 'Lorem Ipsum' }
										__nextHasNoMarginBottom
										onChange={ ( value ) => {
											console.log( value );
										} }
									/>
								</PanelRow>
								<PanelRow>
									<TextControl
										label={ __( 'Link', 'wp-parsely' ) }
										__nextHasNoMarginBottom
										value={ post?.guid?.raw }
										disabled={ true }
										onChange={ ( value ) => {
											console.log( value );
										} }
									/>
								</PanelRow>
								<PanelRow className="panel-advanced-controls">
									<div className="panel-advanced-controls-header">
										{ __( 'Advanced', 'wp-parsely' ) }
									</div>
									<CheckboxControl
										__nextHasNoMarginBottom
										label={ __( 'Open in new tab', 'wp-parsely' ) }
										checked={ false }
										onChange={ ( value ) => {
											console.log( value );
										} }
									/>
									<CheckboxControl
										__nextHasNoMarginBottom
										label={ __( 'Mark as nofollow', 'wp-parsely' ) }
										checked={ false }
										onChange={ ( value ) => {
											console.log( value );
										} }
									/>
								</PanelRow>
							</PanelBody>
						</CardBody>
					</Card>
				) }
			</div>
		</div>
	);
};

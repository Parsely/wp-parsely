/**
 * WordPress imports
 */
import { Button, CheckboxControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useState, useRef, useCallback, useEffect } from '@wordpress/element';
import { check, close, undo } from '@wordpress/icons';

/**
 * Internal imports
 */
import { VerticalDivider } from '../../../../../common/components/vertical-divider';
import { TrafficBoostLink } from '../../provider';
import { TrafficBoostStore } from '../../store';
import { TextSelection } from '../preview';

/**
 * Props structure for PreviewActions.
 *
 * @since 3.19.0
 */
interface PreviewActionsProps {
	activeLink?: TrafficBoostLink | null;
	onAccept: ( link: TrafficBoostLink ) => void;
	onRemove: ( link: TrafficBoostLink, restoreOriginal: boolean ) => void;
	onUpdateLink: ( link: TrafficBoostLink, restoreOriginal: boolean ) => void;
	onDiscard: ( link: TrafficBoostLink ) => void;
	onRestoreOriginal: () => void;
	selectedText: TextSelection | null;
	iframeRef: React.RefObject<HTMLIFrameElement>;
}

/**
 * Preview footer component for the Traffic Boost feature.
 * Displays link options for a selected post.
 *
 * @since 3.19.0
 *
 * @param {PreviewActionsProps} props The component's props.
 */
export const PreviewActions = ( {
	activeLink,
	onAccept,
	onUpdateLink,
	onDiscard,
	onRemove,
	onRestoreOriginal,
	selectedText,
	iframeRef,
}: PreviewActionsProps ): React.JSX.Element => {
	const isInboundLink = ! activeLink?.isSuggestion;
	const [ restoreOriginal, setRestoreOriginal ] = useState<boolean>( true );

	const {
		isAccepting,
		isRemoving,
		isGenerating,
	} = useSelect( ( select ) => ( {
		isAccepting: activeLink ? select( TrafficBoostStore ).isAccepting( activeLink ) : false,
		isRemoving: activeLink ? select( TrafficBoostStore ).isRemoving( activeLink ) : false,
		isGenerating: activeLink ? select( TrafficBoostStore ).isGenerating( activeLink ) : false,
	} ), [ activeLink ] );

	const DRAG_MARGIN_PX = 8;

	const handleDrag = useCallback(
		( { currentPosition, movementDelta, itemBounds, iframeBounds }: OnDragProps ) => {
			if ( ( itemBounds.x + movementDelta.x ) < DRAG_MARGIN_PX ) {
				// If movementDelta.x would move past the left margin,
				// move it to exactly the margin distance from the left edge.
				movementDelta.x = DRAG_MARGIN_PX - itemBounds.x;
			} else if ( ( itemBounds.x + movementDelta.x + itemBounds.width ) > ( iframeBounds.width - DRAG_MARGIN_PX ) ) {
				// If movementDelta.x would move past the right margin,
				// move it to exactly the margin distance from the right edge.
				movementDelta.x = iframeBounds.width - itemBounds.width - itemBounds.x - DRAG_MARGIN_PX;
			}

			if ( ( itemBounds.y + movementDelta.y ) < DRAG_MARGIN_PX ) {
				// If movementDelta.y would move past the top margin,
				// move it to exactly the margin distance from the top edge.
				movementDelta.y = DRAG_MARGIN_PX - itemBounds.y;
			} else if ( ( itemBounds.y + movementDelta.y + itemBounds.height ) > ( iframeBounds.height - DRAG_MARGIN_PX ) ) {
				// If movementDelta.y would move past the bottom margin,
				// move it to exactly the margin distance from the bottom edge.
				movementDelta.y = iframeBounds.height - itemBounds.height - itemBounds.y - DRAG_MARGIN_PX;
			}

			return {
				x: currentPosition.x + movementDelta.x,
				y: currentPosition.y + movementDelta.y,
			};
		}, []
	);

	const [ actionsBarRef ] = useDraggable( {
		onDrag: handleDrag,
		iframeRef,
	} );

	if ( ! activeLink ) {
		return <></>;
	}

	return (
		<div className="traffic-boost-preview-actions" ref={ actionsBarRef }>
			{ ! isGenerating && (
				<>
					<div className="traffic-boost-preview-actions-drag-handle">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 7H10V5H8V7ZM8 13H10V11H8V13ZM8 19H10V17H8V19ZM14 5V7H16V5H14ZM14 13H16V11H14V13ZM14 19H16V17H14V19Z" fill="#1E1E1E" />
						</svg>
					</div>
					<div className="traffic-boost-preview-actions-buttons">
						{ ! isInboundLink && (
							<>
								<Button
									variant="primary"
									onClick={ () => onAccept( activeLink ) }
									isBusy={ isAccepting }
									disabled={ isAccepting }
									icon={ isAccepting ? null : check }
								>{ isAccepting ? __( 'Accepting…', 'wp-parsely' ) : __( 'Accept', 'wp-parsely' ) }</Button>
								<Button
									variant="tertiary"
									onClick={ () => onDiscard( activeLink ) }
									icon={ close }
								>{ __( 'Reject', 'wp-parsely' ) }</Button>
								{ selectedText && (
									<>
										<VerticalDivider size={ 48 } color="#1e1e1e" />
										<Button
											variant="tertiary"
											onClick={ onRestoreOriginal }
											icon={ undo }
										>
											{ __( 'Clear changes', 'wp-parsely' ) }
										</Button>
									</>
								) }
							</>
						) }

						{ isInboundLink && (
							<>
								{ selectedText ? (
									<>
										<Button
											variant="primary"
											onClick={ () => onUpdateLink( activeLink, restoreOriginal ) }
											isBusy={ isAccepting }
											disabled={ isAccepting }
											icon={ isAccepting ? null : check }
										>{ isAccepting ? __( 'Updating…', 'wp-parsely' ) : __( 'Update Link', 'wp-parsely' ) }</Button>
										{ activeLink.smartLink?.is_link_replacement && (
											<CheckboxControl
												__nextHasNoMarginBottom
												label={ __( 'Restore original link?', 'wp-parsely' ) }
												checked={ restoreOriginal }
												onChange={ ( value ) => {
													setRestoreOriginal( value );
												} }
											/>
										) }
										<VerticalDivider size={ 48 } color="#1e1e1e" />
										<Button
											variant="tertiary"
											onClick={ onRestoreOriginal }
											icon={ undo }
										>
											{ __( 'Clear changes', 'wp-parsely' ) }
										</Button>
									</>
								) : (
									<>
										<Button
											variant={ isRemoving ? 'primary' : 'tertiary' }
											icon={ isRemoving ? null : close }
											onClick={ () => onRemove( activeLink, restoreOriginal ) }
											isBusy={ isRemoving }
											disabled={ isRemoving }
											isDestructive
										>{ isRemoving ? __( 'Removing…', 'wp-parsely' ) : __( 'Remove Link', 'wp-parsely' ) }</Button>
										{ activeLink.smartLink?.is_link_replacement && (
											<CheckboxControl
												__nextHasNoMarginBottom
												label={ __( 'Restore original link?', 'wp-parsely' ) }
												checked={ restoreOriginal }
												onChange={ ( value ) => {
													setRestoreOriginal( value );
												} }
											/>
										) }
									</>
								) }
							</>
						) }
					</div>
				</>
			) }
		</div>
	);
};

interface OnDragProps {
	currentPosition: { x: number; y: number };
	movementDelta: { x: number; y: number };
	itemBounds: DOMRect;
	iframeBounds: DOMRect;
}

interface UseDraggableProps {
	onDrag: ( props: OnDragProps ) => { x: number; y: number };
	iframeRef: React.RefObject<HTMLIFrameElement>;
}

const throttle = <Args extends readonly unknown[], Return>(
	f: ( ...args: Args ) => Return
) => {
	let token: number|null = null;
	let lastArgs: Args|null = null;

	const invoke = () => {
		if ( lastArgs !== null ) {
			f( ...lastArgs );
		}

		token = null;
	};
	const result = ( ...args: Args ) => {
		lastArgs = args;
		if ( ! token ) {
			token = requestAnimationFrame( invoke );
		}
	};
	result.cancel = () => token && cancelAnimationFrame( token );
	return result;
};

const useDraggable = ( { onDrag, iframeRef }: UseDraggableProps ) => {
	const [ pressed, setPressed ] = useState( false );

	// Avoid storing position in useState, as it will cause the component to re-render on every state change
	const translateOffset = useRef( { x: 0, y: 0 } );
	const iframeBounds = useRef<DOMRect | null>( null );
	const ref = useRef<HTMLElement | null>( null );

	const unsubscribe = useRef<( () => void ) | null>( null );
	const legacyRef = useCallback( ( elem: HTMLDivElement | null ) => {
		ref.current = elem;
		if ( unsubscribe.current ) {
			unsubscribe.current();
		}
		if ( ! elem ) {
			return;
		}
		const handleMouseDown = ( e: MouseEvent ) => {
			e.preventDefault();

			setPressed( true );

			const iframeDocument = iframeRef.current?.contentDocument ?? iframeRef.current?.contentWindow?.document;
			if ( iframeDocument ) {
				iframeBounds.current = iframeDocument.documentElement.getBoundingClientRect();
			}
		};

		elem.addEventListener( 'mousedown', handleMouseDown );

		unsubscribe.current = () => {
			elem.removeEventListener( 'mousedown', handleMouseDown );
		};
	}, [ iframeRef ] );

	useEffect( () => {
		if ( ! pressed ) {
			return;
		}

		const iframeDocument = iframeRef.current?.contentDocument ?? iframeRef.current?.contentWindow?.document;
		if ( ! iframeDocument ) {
			return;
		}

		const handleMouseMove = throttle( ( event: MouseEvent ) => {
			if ( ! ref.current || ! translateOffset.current || ! iframeBounds.current ) {
				return;
			}

			const pos = translateOffset.current;
			const elem = ref.current;

			translateOffset.current = onDrag( {
				currentPosition: pos,
				movementDelta: { x: event.movementX, y: event.movementY },
				itemBounds: elem.getBoundingClientRect(),
				iframeBounds: iframeBounds.current,
			} );

			elem.style.transform = `translate(${ translateOffset.current.x }px, ${ translateOffset.current.y }px)`;
		} );

		const handleMouseUp = () => {
			setPressed( false );
		};

		iframeDocument.addEventListener( 'mousemove', handleMouseMove );
		iframeDocument.addEventListener( 'mouseup', handleMouseUp );

		return () => {
			handleMouseMove.cancel();
			iframeDocument.removeEventListener( 'mousemove', handleMouseMove );
			iframeDocument.removeEventListener( 'mouseup', handleMouseUp );
		};
	}, [ pressed, onDrag, iframeRef ] );

	return [ legacyRef, pressed ] as const;
};

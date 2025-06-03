/**
 * WordPress imports
 */
import { useState, useRef, useCallback, useEffect } from '@wordpress/element';

export const DRAG_MARGIN_PX = 8;

export interface OnDragProps {
	totalDelta: { x: number; y: number };
	originalItemRect: DOMRect;
	iframeRect: DOMRect;
}

export interface UseDraggableProps {
	onDrag: ( props: OnDragProps ) => { x: number; y: number };
	iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const useDraggable = ( { onDrag, iframeRef }: UseDraggableProps ) => {
	const [ pressed, setPressed ] = useState( false );

	// Avoid storing positions in useState, as it will cause the component to re-render on every state change
	const translateOffset = useRef( { x: 0, y: 0 } );
	const totalDelta = useRef( { x: 0, y: 0 } );
	const iframeRect = useRef<DOMRect | null>( null );
	const originalItemRect = useRef<DOMRect | null>( null );
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
				iframeRect.current = iframeDocument.documentElement.getBoundingClientRect();
			}

			originalItemRect.current = ref.current?.getBoundingClientRect() ?? null;
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

		const handleMouseMove = throttleToAnimationFrames( ( event: MouseEvent ) => {
			if ( ! ref.current || ! translateOffset.current || ! iframeRect.current || ! originalItemRect.current ) {
				return;
			}

			totalDelta.current = {
				x: totalDelta.current.x + event.movementX,
				y: totalDelta.current.y + event.movementY,
			};

			const elem = ref.current;

			translateOffset.current = onDrag( {
				totalDelta: { x: totalDelta.current.x, y: totalDelta.current.y },
				originalItemRect: originalItemRect.current,
				iframeRect: iframeRect.current,
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

const throttleToAnimationFrames = <Args extends readonly unknown[], Return>(
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

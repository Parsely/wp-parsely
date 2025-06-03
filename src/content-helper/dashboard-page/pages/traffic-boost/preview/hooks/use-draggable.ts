/**
 * WordPress imports
 */
import { useState, useRef, useCallback, useEffect } from '@wordpress/element';

export const DRAG_MARGIN_PX = 8;

// Use ItemRect (a subset of DOMRect) to have consistency when calculating the position of the item
// when accounting for existing transformations.
interface ItemRect {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface OnDragProps {
	totalDelta: { x: number; y: number };
	originalItemRect: ItemRect;
	iframeRect: DOMRect;
}

export interface UseDraggableProps {
	onDrag: ( props: OnDragProps ) => { x: number; y: number };
	iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const useDraggable = ( { onDrag, iframeRef }: UseDraggableProps ): [ React.LegacyRef<HTMLDivElement>, boolean ] => {
	const [ pressed, setPressed ] = useState( false );

	// Avoid storing positions in useState, as it will cause the component to re-render on every state change
	const totalDelta = useRef( { x: 0, y: 0 } );
	const positionDelta = useRef( { x: 0, y: 0 } );
	const iframeRect = useRef<DOMRect | null>( null );
	const originalItemRect = useRef<ItemRect | null>( null );
	const ref = useRef<HTMLDivElement | null>( null );

	const unsubscribe = useRef<( () => void ) | null>( null );
	const externalRef = useCallback( ( elem: HTMLDivElement | null ) => {
		ref.current = elem;
		if ( unsubscribe.current ) {
			unsubscribe.current();
		}
		if ( ! elem ) {
			return;
		}
		const handleMouseDown = ( e: MouseEvent ) => {
			e.preventDefault();

			const iframeDocument = iframeRef.current?.contentDocument ?? iframeRef.current?.contentWindow?.document;
			if ( iframeDocument ) {
				iframeRect.current = iframeDocument.documentElement.getBoundingClientRect();
			}

			originalItemRect.current = ref.current?.getBoundingClientRect() ?? null;

			// If the item already has a transform from being dragged, we need to adjust
			// the originalItemRect to the item's position without any transformations to
			// avoid an offset on drag. Undo the transformations that already exist on the
			// item and store the result in originalItemRect.
			const transform = ref.current?.style.transform;
			if ( transform && originalItemRect.current ) {
				const matrix = new DOMMatrix( transform );
				originalItemRect.current = {
					x: originalItemRect.current.x - matrix.e,
					y: originalItemRect.current.y - matrix.f,
					width: originalItemRect.current.width,
					height: originalItemRect.current.height,
				};
			}

			setPressed( true );
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
			if ( ! ref.current || ! iframeRect.current || ! originalItemRect.current ) {
				return;
			}

			totalDelta.current = {
				x: totalDelta.current.x + event.movementX,
				y: totalDelta.current.y + event.movementY,
			};

			positionDelta.current = onDrag( {
				totalDelta: { x: totalDelta.current.x, y: totalDelta.current.y },
				originalItemRect: originalItemRect.current,
				iframeRect: iframeRect.current,
			} );

			ref.current.style.transform = `translate(${ positionDelta.current.x }px, ${ positionDelta.current.y }px)`;
		} );

		const handleMouseUp = () => {
			// After the drag ends, reset total delta to match the current position.
			totalDelta.current = positionDelta.current;
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

	return [ externalRef, pressed ];
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

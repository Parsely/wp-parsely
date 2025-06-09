/**
 * WordPress imports
 */
import { useEffect } from '@wordpress/element';

/** @typedef {import('@wordpress/element').RefObject} RefObject */

/**
 * Monitor resize events on an element.
 *
 * @since 3.20.0
 *
 * @param {RefObject} ref      The element ref to observe.
 * @param {Function}  callback The callback to call when the element is resized.
 */
const useResize = <T extends Element>( ref: React.RefObject<T>, callback: ( newSize: DOMRectReadOnly ) => void ) => {
	useEffect( () => {
		const element = ref.current;
		if ( ! element ) {
			return;
		}

		const resizeObserver = new ResizeObserver( ( entries ) => {
			callback( entries[ 0 ].contentRect );
		} );

		resizeObserver.observe( element );

		return () => {
			resizeObserver.disconnect();
		};
	}, [ ref, callback ] );
};

export default useResize;

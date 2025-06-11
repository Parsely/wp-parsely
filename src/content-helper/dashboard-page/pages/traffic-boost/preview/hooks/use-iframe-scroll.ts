/**
 * WordPress dependencies
 */
import { throttle } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

/**
 * Props for the useIframeScroll hook.
 *
 * @since 3.20.0
 */
interface UseIframeScrollProps {
	iframeRef: React.RefObject<HTMLIFrameElement>;
	onScroll: ( iframe: HTMLIFrameElement ) => void;
	throttleDelay?: number;
}

/**
 * Manages scroll event listener for an iframe.
 *
 * @since 3.20.0
 *
 * @param {UseIframeScrollProps} props The hook configuration.
 */
const useIframeScroll = ( {
	iframeRef,
	onScroll,
	throttleDelay = 100,
}: UseIframeScrollProps ): void => {
	useEffect( () => {
		const iframe = iframeRef.current;
		if ( ! iframe?.contentWindow ) {
			return;
		}

		const iframeWindow = iframe.contentWindow;
		const scrollEventHandler = throttle( () => {
			onScroll( iframe );
		}, throttleDelay );

		iframeWindow.addEventListener( 'scroll', scrollEventHandler );

		return () => {
			iframeWindow.removeEventListener( 'scroll', scrollEventHandler );
		};
	}, [ iframeRef, onScroll, throttleDelay ] );
};

export default useIframeScroll;

/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import domReady from '@wordpress/dom-ready';

const EVENT_NAME_PREFIX = 'wpparsely';
const MAX_EVENTS_PER_FLUSH = 16;
const FLUSH_DELAY = 1000;

const queue = [];
let flushTimeout;

const flushQueue = async () => {
	queue.slice;
	return apiFetch( {
		method: 'POST',
		path: '/wp-parsely/v1/telemetry',
		data: {
			// TODO slice & splice
			events: queue,
		},
	} );
};

export const trackEvent = ( eventName, props = {} ) => {
	if ( ! eventName.startsWith( `${ EVENT_NAME_PREFIX }_` ) ) {
		eventName = `${ EVENT_NAME_PREFIX }_${ eventName }`;
	}

	queue.push( {
		_en: eventName,
		...props,
	} );
	setTimeout( flushQueue, FLUSH_DELAY );
};

domReady( async () => {
	const r = await trackEvent( 'testing' );
	console.log( { r } );
} );

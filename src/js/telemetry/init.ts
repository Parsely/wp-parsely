import Telemetry from './telemetry';
import { createElement, Fragment } from '@wordpress/element';
import BlockChangeMonitor from './block-change';
import { registerPlugin } from '@wordpress/plugins';

// Initialize the telemetry module.
Telemetry.getInstance();

// Set up the events.
/**
 * The events to be tracked.
 *
 * @since 3.12.0
 */
const events = [
	BlockChangeMonitor,
];

const EventsComponent = createElement(
	Fragment,
	null,
	...events.map( ( EventComponent ) => createElement( EventComponent ) )
);

registerPlugin( 'wp-parsely-tracks-js-events', {
	render: () => EventsComponent,
} );

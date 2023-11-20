/**
 * WordPress dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import BlockChangeMonitor from './block-change';

declare global {
	interface Window {
		/**
		 * Singleton instance of the Telemetry class.
		 * This is attached to the global `window` object to ensure that the same instance
		 * is used across different ES modules in the application.
		 * @type {Telemetry}
		 * @since 3.12.0
		 */
		wpParselyTelemetryInstance: Telemetry;
		_tkq: EventProps[];
		wpParselyTracksTelemetry: {
			version: string,
			user: {
				type: string,
				id: string,
			}
		}
	}
}

/**
 * Event properties.
 * @since 3.12.0
 */
export type EventProps = {
	[ key: string ]: string|number|boolean;
}

/**
 * Telemetry class.
 * @class
 * @since 3.12.0
 */
export default class Telemetry {
	/**
	 * The prefix used for all events.
	 * @since 3.12.0
	 * @private
	 */
	private static readonly TRACKS_PREFIX = 'wpparsely_';

	/**
	 * The regex used to validate event names.
	 * @since 3.12.0
	 * @private
	 */
	private static readonly EVENT_NAME_REGEX = /^(([a-z0-9]+)_){2}([a-z0-9_]+)$/;

	/**
	 * The regex used to validate event properties.
	 * @since 3.12.0
	 * @private
	 */
	private static readonly PROPERTY_REGEX = /^[a-z_][a-z0-9_]*$/;

	/**
	 * The queue of events to be tracked.
	 * @since 3.12.0
	 * @private
	 */
	private _tkq: ( string | object )[] = [];

	/**
	 * Whether the tracking library has been loaded.
	 * @since 3.12.0
	 * @protected
	 */
	protected isLoaded: boolean = false;

	/**
	 * Private constructor to prevent direct object creation.
	 * This is necessary because this class is a singleton.
	 * @since 3.12.0
	 */
	private constructor() {
		this.loadTrackingLibrary();
	}

	/**
	 * Returns the singleton instance of the Telemetry class.
	 * If the instance does not exist, it is created.
	 * @return {Telemetry} The singleton instance of the Telemetry class.
	 * @since 3.12.0
	 */
	public static getInstance(): Telemetry {
		if ( ! window.wpParselyTelemetryInstance ) {
			Object.defineProperty( window, 'wpParselyTelemetryInstance', {
				value: new Telemetry(),
				writable: false,
				configurable: false,
				enumerable: false, // This makes it not show up in console enumerations
			} );
		}
		return window.wpParselyTelemetryInstance;
	}

	/**
	 * Loads the tracking library.
	 * @return {void}
	 * @since 3.12.0
	 */
	private loadTrackingLibrary(): void {
		const script = document.createElement( 'script' );
		script.async = true;
		script.src = '//stats.wp.com/w.js';
		script.onload = () => {
			this.isLoaded = true;
			this._tkq = window._tkq || [];
		};
		document.head.appendChild( script );
	}

	private setupEvents(): void {
		const EventsComponent = createElement(
			Fragment,
			null,
			createElement( BlockChangeMonitor ), // Block Changes monitor
		);

		registerPlugin( 'wp-parsely-tracks-js-events', {
			render: () => EventsComponent,
		} );
	}

	/**
	 * Tracks an event.
	 * This method is static, so it can be called directly from the class.
	 * It first ensures that the telemetry library is loaded by calling `waitUntilLoaded`.
	 * Then, it calls the `trackEvent` method on the singleton instance of the Telemetry class.
	 *
	 * @param {string}     eventName  The name of the event to track.
	 * @param {EventProps} properties The properties of the event to track.
	 * @return {Promise<void>}        A Promise that resolves when the event has been tracked.
	 * @since 3.12.0
	 */
	public static async trackEvent( eventName: string, properties: EventProps = {} ): Promise<void> {
		const telemetry: Telemetry = Telemetry.getInstance();
		await Telemetry.waitUntilLoaded();
		telemetry.trackEvent( eventName, properties );
	}

	/**
	 * Waits until the telemetry library is loaded.
	 * This method is static, so it can be called directly from the class.
	 * It checks every 100ms if the telemetry library is loaded, and resolves when it is.
	 * If the library is not loaded after 10 seconds, it rejects.
	 *
	 * @return {Promise<void>} A Promise that resolves when the telemetry library is loaded.
	 * @since 3.12.0
	 */
	public static waitUntilLoaded(): Promise<void> {
		return new Promise( ( resolve, reject ) => {
			const telemetry: Telemetry = Telemetry.getInstance();

			if ( telemetry.isLoaded ) {
				resolve();
				return;
			}

			let timeout = 0;

			const interval = setInterval( () => {
				if ( telemetry.isLoaded ) {
					clearInterval( interval );
					resolve();
				}

				timeout += 100;

				if ( timeout >= 10000 ) {
					clearInterval( interval );
					reject( 'Telemetry library not loaded' );
				}
			}, 100 );
		} );
	}

	/**
	 * Tracks an event.
	 * This method is called by the static `trackEvent` method.
	 * It first checks if the telemetry library is loaded.
	 * Then, it validates the event name and the event properties.
	 * Finally, it pushes the event to the `_tkq` array.
	 *
	 * @param {string}     eventName  The name of the event to track.
	 * @param {EventProps} properties The properties of the event to track.
	 * @since 3.12.0
	 */
	private trackEvent( eventName: string, properties: EventProps ): void {
		if ( ! this.isLoaded ) {
			// eslint-disable-next-line no-console
			console.error( 'Error tracking event: Telemetry not loaded' );
			return;
		}

		// Validate if the event name has the correct prefix, if not, append it
		if ( eventName.indexOf( Telemetry.TRACKS_PREFIX ) !== 0 ) {
			eventName = Telemetry.TRACKS_PREFIX + eventName;
		}

		// Validate the event name.
		if ( ! this.isEventNameValid( eventName ) ) {
			// eslint-disable-next-line no-console
			console.error( 'Error tracking event: Invalid event name' );
			return;
		}

		properties = this.prepareProperties( properties );

		// Push the event to the queue
		this._tkq?.push( [ 'recordEvent', eventName, properties ] );
	}

	/**
	 * Checks if a property is valid.
	 * A property is valid if it matches the PROPERTY_REGEX.
	 *
	 * @param {string} property The property to check.
	 * @return {boolean} `true` if the property is valid, `false` otherwise.
	 * @since 3.12.0
	 */
	private isProprietyValid( property: string ): boolean {
		return Telemetry.PROPERTY_REGEX.test( property );
	}

	/**
	 * Checks if an event name is valid.
	 * An event name is valid if it matches the EVENT_NAME_REGEX.
	 *
	 * @param {string} eventName The event name to check.
	 * @return {boolean} `true` if the event name is valid, `false` otherwise.
	 * @since 3.12.0
	 */
	private isEventNameValid( eventName: string ): boolean {
		return Telemetry.EVENT_NAME_REGEX.test( eventName );
	}

	/**
	 * Prepares the properties of an event.
	 * This method sanitizes the properties, sets the `parsely_version` property,
	 * and sets user-specific properties if they exist.
	 *
	 * @param {EventProps} properties The properties to prepare.
	 * @return {EventProps} The prepared properties.
	 * @since 3.12.0
	 */
	private prepareProperties( properties: EventProps ): EventProps {
		properties = this.sanitizeProperties( properties );

		properties.parsely_version = window.wpParselyTracksTelemetry.version;

		// Set user-specific properties
		if ( window.wpParselyTracksTelemetry.user ) {
			properties._ut = window.wpParselyTracksTelemetry.user.type;
			properties._ui = window.wpParselyTracksTelemetry.user.id;
		}

		return this.sanitizeProperties( properties );
	}

	/**
	 * Sanitizes the properties of an event.
	 * This method creates a new object and copies over all valid properties from the original properties.
	 *
	 * @param {EventProps} properties The properties to sanitize.
	 * @return {EventProps} The sanitized properties.
	 * @since 3.12.0
	 */
	private sanitizeProperties( properties: EventProps ): EventProps {
		const sanitizedProperties: EventProps = {};

		Object.keys( properties ).forEach( ( property: string ) => {
			if ( this.isProprietyValid( property ) ) {
				sanitizedProperties[ property ] = properties[ property ];
			}
		} );

		return sanitizedProperties;
	}
}

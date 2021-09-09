<?php
/**
 * Parsely_A8c_Tracks class
 *
 * @package Parsely
 * @since 2.6.0
 */

/**
 * This class comprises the mechanics of sending events to the Automattic Tracks system.
 */
class Parsely_A8c_Tracks {
	/**
	 * List of events to send to the tracks event on flush.
	 *
	 * @var array
	 */
	private $queue = array();

	const EVENT_NAME_PREFIX = 'vip_wpparsely_';
	const TRACKS_RECORD_URL = 'https://public-api.wordpress.com/rest/v1.1/tracks/record';

	/**
	 * Sets up a "shutdown function" to call `flush_queue`.
	 * This is to send events as one of the last thing the backend does to serve a request.
	 *
	 * @return void
	 */
	public function setup() {
		register_shutdown_function( array( $this, 'flush_queue' ) );
	}

	/**
	 * Send the contents of the queue (if any) to the API.
	 * This is hooked into a shutdown function via `setup`, but can be called any time if desired.
	 *
	 * @return void
	 */
	public function flush_queue() {
		if ( count( $this->queue ) === 0 ) {
			return;
		}
		self::send_events_to_api( $this->queue );
	}

	/**
	 * Record an event to the Automattic Tracks API.
	 *
	 * NOTE: If the event name and / or property names don't pass validation, they'll be silenty discarded.
	 *
	 * @param string  $event_name The event name. Must be snake_case.
	 * @param array   $event_props Any additional properties to include with the event. Key names must be valid (start with a lower-case letter and "snake case").
	 * @param boolean $blocking Should the event be sent to the backend immediately? Default: false.
	 * @return void
	 */
	public function record_event( $event_name, $event_props = array(), $blocking = false ) {
		$event = self::normalize_event( $event_name, $event_props );
		if ( $event->error ) {
			return;
		}

		if ( $blocking ) {
			self::send_events_to_api( array( $event ) );
			return;
		}
		$this->queue[] = $event;
	}

	/**
	 * Convert input about the event to a conventional format.
	 *
	 * @param string $event_name The (potentially-unprefixed) event name.
	 * @param array  $event_props Any additional properties to include with the event.
	 * @return Parsely_A8c_Tracks_Event The normalized event materialized as a Parsely_A8c_Tracks_Event object
	 */
	public static function normalize_event( $event_name, $event_props = array() ) {
		$_event_props = array();
		foreach ( $event_props as $key => $value ) {
			if ( is_string( $value ) ) {
				$_event_props[ $key ] = $value;
				continue;
			}
			$_event_props[ $key ] = json_encode( $value );
		}

		$event = array_merge(
			$_event_props,
			array(
				'_en' => self::normalize_event_name( $event_name ),
			)
		);

		return new Parsely_A8c_Tracks_Event( $event );
	}

	/**
	 * Convert input about the event name to a conventional format.
	 * This is mainly to ensure all events have our prefix
	 *
	 * @param string $event_name The provided event name that may (or may not be) in the desired format.
	 * @return string The event name in the conventional format.
	 */
	public static function normalize_event_name( $event_name ) {
		return preg_replace( '/^(?:' . self::EVENT_NAME_PREFIX . ')?(.*)/', self::EVENT_NAME_PREFIX . '\1', $event_name );
	}

	/**
	 * Send passed events to the WordPress.com API for recording.
	 *
	 * @param array   $events A list of Parsely_A8c_Tracks_Event objects.
	 * @param array   $common_props Any properties that should be included in all events in this batch.
	 * @param boolean $blocking Passed to `wp_remote_post`. Default: true.
	 *
	 * @see https://developer.wordpress.org/reference/classes/WP_Http/request/#parameters
	 * @return (array|WP_Error) The response or WP_Error on failure.
	 */
	public static function send_events_to_api( $events, $common_props = array(), $blocking = true ) {
		return wp_remote_post(
			self::TRACKS_RECORD_URL,
			array(
				'blocking' => $blocking,
				'body'     => array(
					'events'      => $events,
					'commonProps' => $common_props,
				),
			)
		);
	}
}

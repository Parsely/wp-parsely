<?php

class Parsely_A8c_Tracks {
	private $queue;

	const EVENT_NAME_PREFIX = 'vip_wpparsely_';
	const TRACKS_RECORD_URL = 'https://public-api.wordpress.com/rest/v1.1/tracks/record';

	public function __construct() {
		$this->queue = array();
	}

	public function setup() {
		register_shutdown_function( array( $this, 'flush_queue' ) );
	}

	public function flush_queue() {
		if ( count( $this->queue ) === 0 ) {
			return;
		}
		self::send_events_to_api( $this->queue );
	}

	/**
	 * Record an event to the Automattic Tracks API.
	 *
	 * If the event name and / or property names don't pass validation, they'll be silenty discarded.
	 *
	 * @param string $event_name The event name. Must be snake_case.
	 * @param array $event_props Any additional properties to include with the event. Key names must be valid (start with a lower-case letter and "snake case")
	 * @param boolean $blocking
	 * @return void
	 */
	public function record_event( string $event_name, array $event_props = array(), bool $blocking = false ) {
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
	 * @param string $event_name The (potentially-unprefixed) event name.
	 * @param array $event_props Any additional properties to include with the event.
	 * @return Parsely_Tracks_Event The normalized event materialized as a Parsely_Tracks_Event object
	 */
	public static function normalize_event( string $event_name, array $event_props = array() ) {
		$event = array_merge( $event_props, array(
			'_en' => self::normalize_event_name( $event_name ),
		) );

		return new Parsely_Tracks_Event( $event );
	}

	public static function normalize_event_name( string $event_name ) {
		// Ensure all events have our prefix
		return preg_replace( '/^(?:' . self::EVENT_NAME_PREFIX . ')?(.*)/', self::EVENT_NAME_PREFIX . '\1', $event_name );
	}

	public static function send_events_to_api( array $events, array $common_props = array(), bool $blocking = true ) {
		return wp_remote_post( self::TRACKS_RECORD_URL, array(
			'blocking' => $blocking,
			'body'     => array(
				'events' => $events,
				'commonProps' => $common_props,
			),
		) );
	}
}

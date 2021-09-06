<?php

class Parsely_A8c_Tracks {
	private $queue;

	const EVENT_NAME_PREFIX = 'vip_wpparsely_';
	const TRACKS_RECORD_URL = 'https://public-api.wordpress.com/rest/v1.1/tracks/record';

	public function __construct() {
		$this->queue = array();
		register_shutdown_function( array( $this, 'flush_queue' ) );
	}

	public function flush_queue() {
		if ( count( $this->queue ) === 0 ) {
			return;
		}
		self::send_events_to_api( $this->queue );
	}

	public function record_event( string $event_name, array $event_props = array(), bool $blocking = false ) {
		$event = self::normalize_event( $event_name, $event_props );
		if ( $blocking ) {
			self::send_events_to_api( array( $event ) );
			return;
		}
		$this->queue[] = $event;
	}

	public static function normalize_event( string $event_name, array $event_props = array() ) {
		return array_merge( $event_props, array(
			'_en' => self::normalize_event_name( $event_name ),
		) );
	}

	public static function normalize_event_name( string $event_name ) {
		// validate
		return self::EVENT_NAME_PREFIX . ltrim( $event_name, self::EVENT_NAME_PREFIX );
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

<?php

class Parsely_Telemetry {
	private $tracks;

	public function __construct() {
		$this->tracks = new Parsely_A8c_Tracks();
		$this->tracks->setup();
	}

	public function record_event( string $event_name, array $event_props = array(), bool $blocking = false) {
		$this->tracks->record_event( $event_name, $event_props, $blocking );
	}
}

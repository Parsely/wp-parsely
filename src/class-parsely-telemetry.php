<?php

class Parsely_Telemetry {
	private $tracks;

	public function __construct() {
		$this->tracks = new Parsely_A8c_Tracks();

		if ( ! $this->should_enable_tracking() ) {
			return;
		}

		$this->tracks->setup();

		$this->add_event_tracking();
	}

	protected function should_enable_tracking() {
		// TODO: Implement
		return true;
	}

	protected function add_event_tracking() {
		// TODO: Move this to a dedicated file or some other organization scheme.
		add_action( 'load-settings_page_parsely', function () {
			if ( ! isset( $_SERVER['REQUEST_METHOD'] ) || 'GET' !== $_SERVER['REQUEST_METHOD'] ) {
				return;
			}
			$this->tracks->record_event( 'vip_wpparsely_settings_page_loaded' );
		} );
	}
}

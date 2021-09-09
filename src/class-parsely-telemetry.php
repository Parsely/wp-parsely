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

		add_action( 'update_option_parsely', function ( $old_value, $value ) {
			$all_keys = array_unique( array_merge( array_keys( $old_value ), array_keys( $value ) ) );
			$updated_keys = array_reduce( $all_keys, function( $carry, $key ) use ( $old_value, $value ) {
				if (
					isset( $old_value[$key] ) === isset( $value[$key] ) &&
					json_encode( $old_value[$key] ) === json_encode( $value[$key] )
				) {
					return $carry;
				}

				if ( 'parsely_wipe_metadata_cache' === $key && ! ( isset( $value[$key] ) && $value[$key] ) ) {
					return $carry;
				}

				if ( 'plugin_version' === $key ) {
					return $carry;
				}

				$carry[] = $key;
				return $carry;
			}, array() );

			if ( ! count( $updated_keys ) ) {
				return;
			}
			$this->tracks->record_event( 'vip_wpparsely_updated_parsely_option', compact( 'updated_keys' ) );
		}, 10, 2 );
	}
}

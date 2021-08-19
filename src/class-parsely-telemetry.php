<?php

class Parsely_Telemetry {
	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'rest_api_init' ) );
		add_action( 'admin_footer', array( __CLASS__, 'admin_footer_enqueue_script' ) );
	}

	public static function rest_api_init() {
		register_rest_route(
			'wp-parsely/v1',
			'/telemetry',
			array(
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => array( __CLASS__, 'receive' ),
					'permission_callback' => array( __CLASS__, 'can_send' ),
					'args'                => array(),
				),
			)
		);
	}

	public static function can_send() {
		return true;
	}

	public static function receive() {
		return '👍';
	}

	public static function admin_footer_enqueue_script() {
		$telemetry_script_asset = require PARSELY_PLUGIN_DIR . 'build/telemetry.asset.php';
		wp_enqueue_script(
			'wp-parsely-telemetry',
			PARSELY_PLUGIN_URL . 'build/telemetry.js',
			$telemetry_script_asset['dependencies'],
			Parsely::get_asset_cache_buster(),
			true
		);
	}
}

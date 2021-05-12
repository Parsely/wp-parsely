<?php

function wp_parsely_settings_api_init() {
	register_rest_route( 'wp-parsely/v1', 'settings', array(
		'methods' => 'GET',
		'callback' => 'wp_parsely_settings_http_get',
	) );
}
add_action( 'rest_api_init', 'wp_parsely_settings_api_init' );

function wp_parsely_settings_http_get() {
	global $parsely;
	$settings = $parsely->get_options();
	unset( $settings['api_secret'] );
	return $settings;
}

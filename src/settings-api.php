<?php

/**
 * Check if a given request has access to get items
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return bool
 */
function wp_parsely_settings_api_permissions_check( $request ) {
	return current_user_can( Parsely::CAPABILITY );
}

function wp_parsely_settings_api_get_settings() {
	global $parsely;
	return new WP_REST_Response( $parsely->get_options(), 200 );
}

function wp_parsely_settings_api_init() {
	register_rest_route(
		'wp-parsely/v1',
		'/settings',
		array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => 'wp_parsely_settings_api_get_settings',
				'permission_callback' => 'wp_parsely_settings_api_permissions_check',
				'args'                => array(),
			),
		)
	);
}
add_action( 'rest_api_init', 'wp_parsely_settings_api_init' );

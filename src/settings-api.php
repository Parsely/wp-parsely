<?php

/**
 * Check if a given request has access to get items
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return bool
 */
function wp_parsely_settings_api_permissions_check( WP_REST_Request $request ) {
	return current_user_can( Parsely::CAPABILITY );
}

/**
 * Getter
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return WP_REST_Response
 */
function wp_parsely_settings_api_read_settings( WP_REST_Request $request ) {
	global $parsely;
	return new WP_REST_Response( $parsely->get_options(), 200 );
}

/**
 * Setter
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return WP_REST_Response
 */
function wp_parsely_settings_api_write_settings( WP_REST_Request $request ) {
	global $parsely, $wp_settings_errors;

	// `$parsely->validate_options` uses `add_settings_error`
	// TODO: Decouple!
	require_once ABSPATH . 'wp-admin/includes/template.php';

	$new_settings = $request->get_param( 'settings' );

	$validated_settings = $parsely->validate_options( $new_settings );

	if ( ! empty( $wp_settings_errors ) ) {
		return new WP_REST_Response( array( 'errors' => $wp_settings_errors ), 400 );
	}

	update_option( Parsely::OPTIONS_KEY, $validated_settings );

	return new WP_REST_Response( $validated_settings, 200 );
}

function wp_parsely_settings_api_init() {
	register_rest_route(
		'wp-parsely/v1',
		'/settings',
		array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => 'wp_parsely_settings_api_read_settings',
				'permission_callback' => 'wp_parsely_settings_api_permissions_check',
				'args'                => array(),
			),
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => 'wp_parsely_settings_api_write_settings',
				'permission_callback' => 'wp_parsely_settings_api_permissions_check',
				'args'                => array( 'settings' ),
			),
		)
	);
}
add_action( 'rest_api_init', 'wp_parsely_settings_api_init' );

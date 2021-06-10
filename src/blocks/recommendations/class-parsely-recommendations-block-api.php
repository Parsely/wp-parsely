<?php

class Parsely_Recommendations_Block_API {
	public static function rest_api_init() {
		register_rest_route(
			'wp-parsely/v1',
			'/recommendations',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => 'Parsely_Recommendations_Block_API::get_items',
					'permission_callback' => 'Parsely_Recommendations_Block_API::permission_callback',
					'args'                => array(),
				),
			)
		);
	}

	public static function permission_callback( $request ) {
		return current_user_can( 'read' );
	}

	public static function get_items( $request ) {
		global $parsely;
		$options = $parsely->get_nonsecet_options();
		$apikey = $options['apikey'];

		$params = $request->get_params();

		$cache_key = 'block_recos-' . md5( json_encode( compact( 'apikey', 'params' ) ) );
		$cached = wp_cache_get( $cache_key, 'wp-parsely' );
		if ( is_array( $cached ) ) {
			return array(
				'data' => $cached,
				'cached' => 1,
			);
		}

		$links = self::fetch_related_links(
			$apikey,
			$params['url'],
			$params['pub_date_start'],
			$params['sort'],
			$params['limit'],
			$params['boost']
		);

		if ( is_wp_error( $links ) ) {
			// Should the error be cached?
			return $links;
		}

		$data = array_map(
			function( $link ) {
				return (object) array(
					'image_url' => $link->image_url,
					'title' => $link->title,
					'url' => $link->url,
				);
			},
			$links
		);

		wp_cache_set( $cache_key, $data, 'wp-parsely', 5 * MINUTE_IN_SECONDS );

		return (object) array(
			'data' => $data,
		);
	}

	public static function fetch_related_links( $apikey, $url, $pub_start = 0, $sort_recs = 'score', $limit = 5, $boost = 'views' ) {
		$full_api_url = add_query_arg(
			array(
				'url' => rawurlencode( $url ),
			),
			Parsely_Recommended_Content::get_api_url(
				$apikey,
				$pub_start,
				$sort_recs,
				$boost,
				$limit
			)
		);

		$response = wp_safe_remote_get( $full_api_url, array() );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$body = wp_remote_retrieve_body( $response );
		$decoded = json_decode( $body );

		if ( is_null( $decoded ) ) {
			return new WP_Error( 400, 'Unable to decode upstream API response' );
		}

		return $decoded->data;
	}
}

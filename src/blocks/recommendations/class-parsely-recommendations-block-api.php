<?php
/**
 * Parsely Recommendations Block API
 *
 * @package Parsely_Recommendations
 */

/**
 * A "namespace" class with functions that power REST API endpoints for use by the Recommendations Block
 */
class Parsely_Recommendations_Block_API {
	/**
	 * Registers the REST API Routes and backing functionality
	 *
	 * @return void
	 */
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

	/**
	 * Determine if the endpoint can be called. Applies `read` permissions.
	 *
	 * @return boolean
	 */
	public static function permission_callback() {
		return current_user_can( 'read' );
	}

	/**
	 * Cached "proxy" to the Parsely `/related` endpoint
	 *
	 * @uses Parsely_Recommendations_Block_API::fetch_related_links
	 * @param WP_Rest_Request $request The request object.
	 * @return StdClass
	 */
	public static function get_items( $request ) {
		global $parsely;
		$apikey = $parsely->get_apikey();
		$params = $request->get_params();

		$cache_key = 'block_recos-' . md5( json_encode( compact( 'apikey', 'params' ) ) );
		$cached    = wp_cache_get( $cache_key, 'wp-parsely' );
		if ( is_array( $cached ) ) {
			return array(
				'data'   => $cached,
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
					'title'     => $link->title,
					'url'       => $link->url,
				);
			},
			$links
		);

		wp_cache_set( $cache_key, $data, 'wp-parsely', 5 * MINUTE_IN_SECONDS );

		return (object) array(
			'data' => $data,
		);
	}

	/**
	 * Call the Parsely `/related` endpoint to get recommendations
	 *
	 * @param string  $apikey The Parsely API key.
	 * @param string  $url The current URL to get related content.
	 * @param integer $pub_start Publication filter start date (`pub_date_start`).
	 * @param string  $sort_recs What to sort the results by (`sort`).
	 * @param integer $limit Number of records to retrieve.
	 * @param string  $boost Sub-sort value to re-rank relevant posts.
	 *
	 * @see https://www.parse.ly/help/api/recommendations#get-related
	 * @return array
	 */
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

		$body    = wp_remote_retrieve_body( $response );
		$decoded = json_decode( $body );

		if ( is_null( $decoded ) ) {
			return new WP_Error( 400, 'Unable to decode upstream API response' );
		}

		return $decoded->data;
	}
}

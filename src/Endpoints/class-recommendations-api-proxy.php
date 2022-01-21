<?php
/**
 * Parsely Recommendations REST API Endpoint
 *
 * @package Parsely
 */

namespace Parsely\Endpoints;

use Parsely\Recommended_Content;
use stdClass;
use WP_Error;
use WP_REST_Server;
use WP_REST_Request;

/**
 * A "namespace" class with functions that power REST API endpoints for use by the Recommendations Block and other consumers.
 */
final class Recommendations_API_Proxy {
	/**
	 * Entrypoint to register the endpoint and otherwise initialize this class.
	 *
	 * @return void
	 */
	public function run() {
		self::register_rest_route();
	}

	/**
	 * Registers the REST API Routes and backing functionality
	 *
	 * @return void
	 */
	public static function register_rest_route() {
		register_rest_route(
			'wp-parsely/v1',
			'/recommendations',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => __CLASS__ . '::get_items',
					'permission_callback' => __CLASS__ . '::permission_callback',
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
		// Unauthenticated.
		return true;
	}

	/**
	 * Cached "proxy" to the Parsely `/related` endpoint
	 *
	 * @param WP_Rest_Request $request The request object.
	 * @return array
	 */
	public static function get_items( WP_Rest_Request $request ) {
		global $parsely;
		$options = $parsely->get_options();
		$apikey  = $options['apikey'];
		$params  = $request->get_params();

		if ( empty( $apikey ) ) {
			return (object) array(
				'data'  => array(),
				'error' => new WP_Error( 400, __( 'A Parsely API Key must be set in site options to use this Endpoint', 'wp-parsely' ) ),
			);
		}

		$cache_key = 'api_recos-' . md5( wp_json_encode( compact( 'apikey', 'params' ) ) );
		$cached    = wp_cache_get( $cache_key, 'wp-parsely' );
		if ( is_object( $cached ) ) {
			return $cached;
		}

		$links = self::fetch_related_links(
			$apikey,
			$params['url'] ?? '',
			$params['pub_date_start'] ?? 0,
			$params['sort'] ?? 'score',
			$params['limit'] ?? 5,
			$params['boost'] ?? 'views'
		);

		if ( is_wp_error( $links ) ) {
			$response = (object) array(
				'data'  => array(),
				'error' => $links,
			);
			wp_cache_set( $cache_key, $response, 'wp-parsely', 5 * MINUTE_IN_SECONDS );
			return $response;
		}

		$data = array_map(
			function( stdClass $link ) {
				return (object) array(
					'image_url' => $link->image_url,
					'title'     => $link->title,
					'url'       => $link->url,
				);
			},
			$links
		);

		$response = (object) array( 'data' => $data );
		wp_cache_set( $cache_key, $data, 'wp-parsely', 5 * MINUTE_IN_SECONDS );

		return $response;
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
	 * @return array|WP_Error
	 */
	public static function fetch_related_links(
		string $apikey,
		string $url,
		int $pub_start,
		string $sort_recs,
		int $limit,
		string $boost
	) {
		$full_api_url = add_query_arg(
			array( 'url' => $url ),
			Recommended_Content::get_api_url(
				$apikey,
				$pub_start,
				$sort_recs,
				$boost,
				$limit
			)
		);

		$result = wp_safe_remote_get( $full_api_url, array() );

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		$body    = wp_remote_retrieve_body( $result );
		$decoded = json_decode( $body );

		if ( ! is_object( $decoded ) ) {
			return new WP_Error( 400, __( 'Unable to decode upstream API response', 'wp-parsely' ) );
		}

		if ( ! property_exists( $decoded, 'data' ) ) {
			return new WP_Error( $decoded->code ?? 400, $decoded->message ?? __( 'Unable to read data from upstream API', 'wp-parsely' ) );
		}

		if ( ! is_array( $decoded->data ) ) {
			return new WP_Error( 400, __( 'Unable to parse data from upstream API', 'wp-parsely' ) );
		}

		return $decoded->data;
	}
}

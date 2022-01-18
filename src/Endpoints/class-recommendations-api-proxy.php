<?php
/**
 * Parsely Recommendations REST API Endpoint
 *
 * @package Parsely
 */

namespace Parsely\Endpoints;

use Parsely\Recommended_Content;
use WP_REST_Server;
use WP_REST_Request;

const VISITOR_COOKIE_KEY_NAME = '_parsely_visitor';

/**
 * A "namespace" class with functions that power REST API endpoints for use by the Recommendations Block and other consumers.
 */
final class Recommendations_API_Proxy {
	public function run() {
		$this->register_rest_route();
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
		return current_user_can( 'read' );
	}

	/**
	 * Cached "proxy" to the Parsely `/related` endpoint
	 *
	 * @param WP_Rest_Request $request The request object.
	 * @return StdClass
	 */
	public static function get_items( WP_Rest_Request $request ) {
		global $parsely;
		$options = $parsely->get_options();
		$apikey  = $options['apikey'];
		$params  = $request->get_params();

		$url = $params['url'] ?? '';

		if ( $url && ! wp_http_validate_url( $url ) ) {
			wp_send_json_error( 'The `url` is invalid.', 400 );
		}

		$uuid = '';
		$visitor_cookie = $_COOKIE[ VISITOR_COOKIE_KEY_NAME ] ?? '';
		if ( strlen( $visitor_cookie ) ) {
			$visitor_cookie = wp_unslash( $visitor_cookie );
			$visitor_cookie = json_decode( $visitor_cookie );
			$uuid_cookie = $visitor_cookie->id ?? '';
			list( $_, $uuid ) = explode( 'pid=', $uuid_cookie );
		}

		$cache_key = 'api_recos-' . md5( wp_json_encode( compact( 'apikey', 'params', 'uuid' ) ) );
		$cached    = wp_cache_get( $cache_key, 'wp-parsely' );
		if ( is_array( $cached ) ) {
			return array(
				'data'   => $cached,
				'cached' => 1,
			);
		}

		$links = self::fetch_related_links(
			$apikey,
			$url,
			$uuid,
			$params['pub_date_start'] ?? 0,
			$params['sort'] ?? 'score',
			$params['limit'] ?? 5,
			$params['boost'] ?? 'views'
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
	 * @param string  $uuid The identifier for use in personalizing results to the visitor.
	 * @param integer $pub_start Publication filter start date (`pub_date_start`).
	 * @param string  $sort_recs What to sort the results by (`sort`).
	 * @param integer $limit Number of records to retrieve.
	 * @param string  $boost Sub-sort value to re-rank relevant posts.
	 *
	 * @see https://www.parse.ly/help/api/recommendations#get-related
	 * @return array
	 */
	public static function fetch_related_links(
		string $apikey,
		string $url,
		string $uuid,
		int $pub_start,
		string $sort_recs,
		int $limit,
		string $boost
	) {
		$query_args = array();
		if ( strlen( $uuid ) ) {
			$query_args['uuid'] = $uuid;
		} else {
			$query_args['url'] = $url;
		}

		$full_api_url = add_query_arg(
			$query_args,
			Recommended_Content::get_api_url(
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

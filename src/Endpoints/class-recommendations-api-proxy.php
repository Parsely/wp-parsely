<?php
/**
 * Parsely Recommendations REST API Endpoint
 *
 * @package Parsely
 */

declare(strict_types=1);

namespace Parsely\Endpoints;

use Parsely\Parsely;
use Parsely\RemoteAPI\Recommended_Content;
use stdClass;
use WP_Error;
use WP_REST_Server;
use WP_REST_Request;

/**
 * A "namespace" class with functions that power REST API endpoints for use by the Recommendations Block and other consumers.
 */
final class Recommendations_API_Proxy {
	const OBJECT_CACHE_TTL = 5 * MINUTE_IN_SECONDS;

	/**
	 * Used to inject dependencies.
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Entrypoint to register the endpoint and otherwise initialize this class.
	 *
	 * @return void
	 */
	public function run() {
		if ( ! apply_filters( 'wp_parsely_enable_recommendations_endpoint', false ) ) {
			return;
		}
		register_rest_route(
			'wp-parsely/v1',
			'/recommendations',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'permission_callback' ),
					'args'                => array(
						'query' => array(
							'default'           => array(),
							'sanitize_callback' => function ( $query ) {
								// question: how should we sanitize these?
								return (array) $query;
							},
						),
					),
				),
			)
		);
	}

	/**
	 * Determine if the endpoint can be called. Applies `read` permissions.
	 *
	 * @return boolean
	 */
	public function permission_callback() {
		// Unauthenticated.
		return true;
	}

	/**
	 * Cached "proxy" to the Parsely `/related` endpoint
	 *
	 * @param WP_Rest_Request $request The request object.
	 * @return array
	 */
	public function get_items( WP_Rest_Request $request ) {
		$options = $this->parsely->get_options();
		$apikey  = $options['apikey'];
		$params  = $request->get_params();

		if ( empty( $apikey ) ) {
			return (object) array(
				'data'  => array(),
				'error' => new WP_Error( 400, __( 'A Parse.ly API Key must be set in site options to use this endpoint', 'wp-parsely' ) ),
			);
		}

		$cache_key = 'api_recos-' . wp_hash( wp_json_encode( compact( 'apikey', 'params' ) ) );
		$cached    = wp_cache_get( $cache_key, 'wp-parsely' );
		if ( is_object( $cached ) ) {
			return $cached;
		}

		$links = $this->fetch_related_links( $params['query'] );

		if ( is_wp_error( $links ) ) {
			$response = (object) array(
				'data'  => array(),
				'error' => $links,
			);
			// phpcs:ignore WordPressVIPMinimum.Performance.LowExpiryCacheTime.CacheTimeUndetermined
			wp_cache_set( $cache_key, $response, 'wp-parsely', self::OBJECT_CACHE_TTL );
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
		// phpcs:ignore WordPressVIPMinimum.Performance.LowExpiryCacheTime.CacheTimeUndetermined
		wp_cache_set( $cache_key, $data, 'wp-parsely', self::OBJECT_CACHE_TTL );

		return $response;
	}

	/**
	 * Call the Parsely `/related` endpoint to get recommendations
	 *
	 * @param array $query The query arguments that will be passed to the backend API.
	 *
	 * @see https://www.parse.ly/help/api/recommendations#get-related
	 * @return array|WP_Error
	 */
	public function fetch_related_links( array $query ) {
		$recommended_content = new Recommended_Content( $this->parsely );
		$full_api_url        = $recommended_content->get_api_url( $query );

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

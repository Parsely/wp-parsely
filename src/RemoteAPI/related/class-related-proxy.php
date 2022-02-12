<?php
/**
 * Parsely Related REST API Proxy
 *
 * @package Parsely
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

use Parsely\Parsely;
use WP_Error;

/**
 * Proxy for the /related endpoint.
 *
 * @since 3.2.0
 */
class Related_Proxy implements Proxy {
	const RELATED_API_ENDPOINT = 'https://api.parsely.com/v2/related';

	/**
	 * Parsely Instance.
	 *
	 * @var Parsely
	 */
	private $parsely;

	/**
	 * The query arguments to send to the remote API.
	 *
	 * @var array<string, mixed>
	 */
	private $query;

	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely Parsely instance.
	 * @since 3.2.0
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Get URL for Recommendation API (GET /related).
	 *
	 * @since 3.2.0
	 *
	 * @param array<string, mixed> $query The query arguments to send to the remote API.
	 * @return string
	 */
	public function get_api_url( array $query ): string {
		$query['apikey'] = $this->parsely->get_api_key();
		$query           = array_filter( $query );

		// Sort by key so the query args are in alphabetical order.
		ksort( $query );

		$query = apply_filters( 'wp_parsely_related_endpoint_args', $query );
		return add_query_arg( $query, self::RELATED_API_ENDPOINT );
	}

	/**
	 * Implements the fetcher for the proxy interface.
	 *
	 * @since 3.2.0
	 *
	 * @param array<string, mixed> $query The query arguments to send to the remote API.
	 * @return WP_Error|array<string, mixed>
	 */
	public function get_items( array $query ) {
		$full_api_url = $this->get_api_url( $query );

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

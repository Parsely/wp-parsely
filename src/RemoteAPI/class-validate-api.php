<?php
/**
 * Class for Validate API (`/validate`).
 *
 * @package Parsely
 * @since   3.2.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

use Parsely\Parsely;
use WP_Error;
use function Parsely\Utils\convert_to_associative_array;

/**
 * Class for credentials validation API (`/validate`).
 *
 * @since 3.2.0
 *
 * @phpstan-import-type WP_HTTP_Request_Args from Parsely
 */
class Validate_API extends Remote_API_Base {
	protected const ENDPOINT     = '/validate/secret';
	protected const QUERY_FILTER = 'wp_parsely_related_endpoint_args';

	/**
	 * Indicates whether the endpoint is public or protected behind permissions.
	 *
	 * @since 3.7.0
	 *
	 * @var bool
	 */
	protected $is_public_endpoint = false;

	/**
	 * Gets the URL for the Parse.ly API credentials validation endpoint.
	 *
	 * @since 3.11.0
	 *
	 * @param array<string, mixed> $query The query arguments to send to the remote API.
	 * @return string
	 */
	public function get_api_url( array $query ): string {
		$query = array(
			'apikey' => $query['apikey'],
			'secret' => $query['secret'],
		);
		return add_query_arg( $query, Parsely::PUBLIC_API_BASE_URL . static::ENDPOINT );
	}

	/**
	 * Returns the response from the Parse.ly API credentials validation endpoint.
	 *
	 * @param array<string, mixed> $query The query arguments to send to the remote API.
	 * @param bool                 $associative (optional) When TRUE, returned objects will be converted into associative arrays.
	 *
	 * @return WP_Error|array<string, mixed>
	 */
	public function get_items( $query, $associative = false ) {
		$full_api_url = $this->get_api_url( $query );
		/**
		 * GET request options.
		 *
		 * @var WP_HTTP_Request_Args $options
		 */
		$options  = $this->get_request_options();
		$response = wp_safe_remote_get( $full_api_url, $options );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$body    = wp_remote_retrieve_body( $response );
		$decoded = json_decode( $body );

		if ( ! is_object( $decoded ) ) {
			return new WP_Error( 400, __( 'Unable to decode upstream API response', 'wp-parsely' ) );
		}

		if ( ! property_exists( $decoded, 'success' ) || false === $decoded->success ) {
			return new WP_Error( $decoded->code ?? 400, $decoded->message ?? __( 'Unable to read data from upstream API', 'wp-parsely' ) );
		}

		return $associative ? convert_to_associative_array( $decoded ) : $decoded;
	}
}
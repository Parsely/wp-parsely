<?php
/**
 * Remote API: Base class for all Parse.ly API endpoints
 *
 * @package Parsely
 * @since   3.2.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

use Parsely\Parsely;
use UnexpectedValueException;
use WP_Error;

use function Parsely\Utils\convert_to_associate_array;

/**
 * Base API for all Parse.ly API endpoints.
 *
 * Child classes must add a protected `ENDPOINT` constant, and a protected
 * QUERY_FILTER constant.
 *
 * @since 3.2.0
 */
abstract class Remote_API_Base implements Remote_API_Interface {
	protected const ENDPOINT     = '';
	protected const QUERY_FILTER = '';

	/**
	 * Parsely Instance.
	 *
	 * @var Parsely
	 */
	private $parsely;

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
	 * Gets the URL for a particular Parse.ly API endpoint.
	 *
	 * @since 3.2.0
	 *
	 * @throws UnexpectedValueException If the endpoint constant is not defined.
	 * @throws UnexpectedValueException If the query filter constant is not defined.
	 *
	 * @param array<string, mixed> $query The query arguments to send to the remote API.
	 * @return string
	 */
	public function get_api_url( array $query ): string {
		if ( static::ENDPOINT === '' ) {
			throw new UnexpectedValueException( 'ENDPOINT constant must be defined in child class.' );
		}
		if ( static::QUERY_FILTER === '' ) {
			throw new UnexpectedValueException( 'QUERY_FILTER constant must be defined in child class.' );
		}

		$query['apikey'] = $this->parsely->get_site_id();
		if ( $this->parsely->api_secret_is_set() ) {
			$query['secret'] = $this->parsely->get_api_secret();
		}
		$query = array_filter( $query );

		// Sort by key so the query args are in alphabetical order.
		ksort( $query );

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.DynamicHooknameFound -- Hook names are defined in child classes.
		$query = apply_filters( static::QUERY_FILTER, $query );
		return add_query_arg( $query, static::ENDPOINT );
	}

	/**
	 * Gets items from the specified endpoint.
	 *
	 * @since 3.2.0
	 * @since 3.7.0 Added $associative param.
	 *
	 * @param array<string, mixed> $query The query arguments to send to the remote API.
	 * @param bool                 $associative When TRUE, returned objects will be converted into associative arrays.
	 *
	 * @return WP_Error|array<string, mixed>
	 */
	public function get_items( $query, $associative = false ) {
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

		$response = $decoded->data;

		return $associative ? convert_to_associate_array( $response ) : $response;
	}
}

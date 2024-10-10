<?php
declare(strict_types=1);

namespace Parsely\Services;

use WP_Error;

class Cached_Service_Endpoint extends Base_Service_Endpoint {

	private const CACHE_GROUP = 'wp-parsely';

	/**
	 * The service endpoint object.
	 *
	 * @var Base_Service_Endpoint
	 */
	private $service_endpoint;

	/**
	 * The cache time-to-live, in milliseconds.
	 *
	 * @var int
	 */
	private $cache_ttl;

	/**
	 * Constructor.
	 *
	 * @param Base_Service_Endpoint $service_endpoint The service endpoint object.
	 * @param int $cache_ttl The cache time-to-live.
	 */
	public function __construct( Base_Service_Endpoint $service_endpoint, int $cache_ttl ) {
		$this->service_endpoint = $service_endpoint;
		$this->cache_ttl = $cache_ttl;

		parent::__construct( $service_endpoint->api_service );
	}

	/**
	 * Returns the cache key for the API request.
	 *
	 * @param array<mixed> $args The arguments to pass to the API request.
	 *
	 * @return string The cache key for the API request.
	 */
	private function get_cache_key( array $args ): string {
		$api_service = $this->service_endpoint->api_service;

		$cache_key = 'parsely_api_' .
		             wp_hash( $api_service->get_base_url() ) . '_' .
			         wp_hash( $this->get_endpoint() ) . '_' .
			         wp_hash( (string) wp_json_encode( $args ) );

		return $cache_key;
	}

	/**
	 * Executes the API request, caching the response.
	 *
	 * If the response is already cached, it will be returned from the cache,
	 * otherwise the API request will be made and the response will be cached.
	 *
	 * @since 3.17.0
	 *
	 * @param array<mixed> $args The arguments to pass to the API request.
	 * @return WP_Error|array<mixed> The response from the API.
	 */
	public function call( array $args = array() ) {
		$cache_key = $this->get_cache_key( $args );
		$cache = wp_cache_get( $cache_key, self::CACHE_GROUP );

		if ( false !== $cache ) {
			// @phpstan-ignore-next-line
			return $cache;
		}

		$response = $this->service_endpoint->call( $args );

		if ( ! is_wp_error( $response ) ) {
			wp_cache_set( $cache_key, $response, self::CACHE_GROUP, $this->cache_ttl ); // phpcs:ignore
		}

		return $response;
	}

	/**
	 * Returns the endpoint for the API request.
	 *
	 * @since 3.17.0
	 *
	 * @return string The endpoint for the API request.
	 */
	public function get_endpoint(): string {
		return $this->service_endpoint->get_endpoint();
	}
}

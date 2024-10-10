<?php
declare(strict_types=1);

namespace Parsely\Services;

use Parsely\Parsely;

abstract class Base_API_Service {

	/**
	 * The registered endpoints for this service.
	 *
	 * @var array<string, Base_Service_Endpoint>
	 */
	protected $endpoints;

	/**
	 * The Parsely instance.
	 *
	 * @var Parsely
	 */
	private $parsely;

	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
		$this->register_endpoints();
	}

	/**
	 * Registers an endpoint with the service.
	 *
	 * @since 3.17.0
	 *
	 * @param Base_Service_Endpoint $endpoint The endpoint to register.
	 */
	protected function register_endpoint( Base_Service_Endpoint $endpoint ): void {
		$this->endpoints[ $endpoint->get_endpoint() ] = $endpoint;
	}

	/**
	 * Registers a cached endpoint with the service.
	 *
	 * @since 3.17.0
	 *
	 * @param Base_Service_Endpoint $endpoint The endpoint to register.
	 * @param int $ttl The time-to-live for the cache, in seconds.
	 */
	protected function register_cached_endpoint( Base_Service_Endpoint $endpoint, int $ttl ): void {
		$this->endpoints[ $endpoint->get_endpoint() ] = new Cached_Service_Endpoint( $endpoint, $ttl );
	}

	protected function get_endpoint( string $endpoint ): Base_Service_Endpoint {
		return $this->endpoints[ $endpoint ];
	}

	public abstract function get_base_url(): string;
	protected abstract function register_endpoints(): void;

	public function get_api_url(): string {
		return $this->get_base_url();
	}

	public function get_parsely(): Parsely {
		return $this->parsely;
	}
}

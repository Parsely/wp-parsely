<?php
/**
 * Base API Controller
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\REST_API;

use Parsely\Parsely;

/**
 * Base API Controller.
 *
 * Used to define the namespace, version, and endpoints for an API controller. API controllers
 * should extend this class and implement the `init` method to register endpoints.
 *
 * @since 3.17.0
 */
abstract class Base_API_Controller {
	/**
	 * The endpoints.
	 *
	 * @since 3.17.0
	 *
	 * @var Base_Endpoint[]
	 */
	private $endpoints;

	/**
	 * The Parsely instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Parsely
	 */
	private $parsely;

	/**
	 * Constructor.
	 *
	 * @since 3.17.0
	 *
	 * @param Parsely $parsely The Parsely instance.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely   = $parsely;
		$this->endpoints = array();
	}

	/**
	 * Initializes the API controller.
	 *
	 * This method should be overridden by child classes and used to register
	 * endpoints.
	 *
	 * @since 3.17.0
	 *
	 * @return void
	 */
	abstract protected function init(): void;

	/**
	 * Gets the namespace for the API.
	 *
	 * This method should be overridden by child classes to define the namespace.
	 *
	 * @since 3.17.0
	 *
	 * @return string The namespace.
	 */
	abstract protected function get_namespace(): string;

	/**
	 * Gets the version for the API.
	 *
	 * This method can be overridden by child classes to define the version.
	 *
	 * @since 3.17.0
	 *
	 * @return string The version.
	 */
	protected function get_version(): string {
		return '';
	}

	/**
	 * Gets the route prefix, which acts as a namespace for the endpoints.
	 *
	 * This method can be overridden by child classes to define the route prefix.
	 *
	 * @since 3.17.0
	 *
	 * @return string The route prefix.
	 */
	public static function get_route_prefix(): string {
		return '';
	}

	/**
	 * Returns the full namespace for the API, including the version if defined.
	 *
	 * @since 3.17.0
	 *
	 * @return string
	 */
	public function get_full_namespace(): string {
		$namespace = $this->get_namespace();

		if ( '' !== $this->get_version() ) {
			$namespace .= '/' . $this->get_version();
		}

		return $namespace;
	}

	/**
	 * Gets the Parsely instance.
	 *
	 * @since 3.17.0
	 *
	 * @return Parsely The Parsely instance.
	 */
	public function get_parsely(): Parsely {
		return $this->parsely;
	}

	/**
	 * Gets the registered endpoints.
	 *
	 * @since 3.17.0
	 *
	 * @return Base_Endpoint[] The registered endpoints.
	 */
	public function get_endpoints(): array {
		return $this->endpoints;
	}

	/**
	 * Registers a single endpoint.
	 *
	 * @since 3.17.0
	 *
	 * @param Base_Endpoint $endpoint The endpoint to register.
	 */
	protected function register_endpoint( Base_Endpoint $endpoint ): void {
		$this->endpoints[] = $endpoint;
		$endpoint->init();
	}

	/**
	 * Registers multiple endpoints.
	 *
	 * @since 3.17.0
	 *
	 * @param Base_Endpoint[] $endpoints The endpoints to register.
	 */
	protected function register_endpoints( array $endpoints ): void {
		foreach ( $endpoints as $endpoint ) {
			$this->register_endpoint( $endpoint );
		}
	}

	/**
	 * Prefixes a route with the route prefix.
	 *
	 * @since 3.17.0
	 *
	 * @param string $route The route to prefix.
	 * @return string The prefixed route.
	 */
	public function prefix_route( string $route ): string {
		if ( '' === static::get_route_prefix() ) {
			return $route;
		}

		return static::get_route_prefix() . '/' . $route;
	}
}

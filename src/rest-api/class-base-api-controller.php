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
	 * The API namespace.
	 *
	 * @var string|false
	 */
	public const NAMESPACE = false;

	/**
	 * The API version.
	 *
	 * @var string
	 */
	public const VERSION = '';

	/**
	 * The route prefix, which acts as a namespace for the endpoints.
	 *
	 * @since 3.17.0
	 *
	 * @var string
	 */
	public const ROUTE_PREFIX = '';

	/**
	 * The endpoints.
	 *
	 * @var Base_Endpoint[]
	 */
	public $endpoints;

	/**
	 * The Parsely instance.
	 *
	 * @var Parsely
	 */
	public $parsely;

	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely The Parsely instance.
	 * @throws \UnexpectedValueException If the namespace is not defined.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely   = $parsely;
		$this->endpoints = array();

		if ( static::NAMESPACE === false ) {
			throw new \UnexpectedValueException( 'The API controller must define a namespace.' );
		}
	}

	/**
	 * Initialize the API controller.
	 *
	 * This method should be overridden by child classes and used to register
	 * endpoints.
	 *
	 * @return void
	 */
	abstract protected function init(): void;

	/**
	 * Register a single endpoint.
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
	 * Register multiple endpoints.
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
	 * Returns the namespace for the API.
	 *
	 * If a version is defined, it will be appended to the namespace.
	 *
	 * @since 3.17.0
	 * @return string
	 */
	public function get_namespace(): string {
		$namespace = static::NAMESPACE;

		if ( false === $namespace ) {
			return '';
		}

		if ( '' !== static::VERSION ) {
			$namespace .= '/' . static::VERSION;
		}

		return $namespace;
	}

	/**
	 * Prefix a route with the route prefix.
	 *
	 * @since 3.17.0
	 *
	 * @param string $route The route to prefix.
	 * @return string The prefixed route.
	 */
	public function prefix_route( string $route ): string {
		if ( '' === static::ROUTE_PREFIX ) {
			return $route;
		}

		return static::ROUTE_PREFIX . '/' . $route;
	}
}

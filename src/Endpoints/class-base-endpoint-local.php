<?php
/**
 * Endpoints: Base class for local API endpoints
 *
 * @package Parsely
 * @since   3.11.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints;

use WP_REST_Request;
use stdClass;
use WP_Error;


/**
 * Base API for local API endpoints.
 *
 * @since 3.11.0
 */
abstract class Base_Endpoint_Local extends Base_Endpoint {
	/**
	 * Registers the endpoint's WP REST route.
	 *
	 * @since 3.11.0
	 */
	abstract public function run(): void;

	/**
	 * Returns the data of the API endpoint.
	 *
	 * @since 3.11.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return stdClass|WP_Error stdClass containing the data or a WP_Error object on failure.
	 */
	abstract public function get_data( WP_REST_Request $request );
}

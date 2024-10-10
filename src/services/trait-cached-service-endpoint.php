<?php
declare(strict_types=1);

namespace Parsely\Services;

trait Cached_Service_Endpoint {

	/**
	 * Sends a request to the remote API.
	 *
	 * @since 3.17.0
	 *
	 * @param string $method The HTTP method to use for the request.
	 * @param array<mixed> $query_args The query arguments to send to the remote API.
	 * @param array<mixed> $data The data to send in the request body.
	 * @return WP_Error|array<mixed> The response from the remote API.
	 */
	protected function request( string $method, array $query_args = array(), array $data = array() ) {
		// Get the URL to send the request to.
		die();
	}
}

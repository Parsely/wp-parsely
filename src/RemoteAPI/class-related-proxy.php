<?php
/**
 * Remote API: `/related` REST API Proxy class
 *
 * @package Parsely
 * @since   3.2.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

use Parsely\Parsely;

/**
 * Proxy for the `/related` endpoint.
 *
 * @since 3.2.0
 */
class Related_Proxy extends Base_Proxy {
	protected const ENDPOINT     = Parsely::PUBLIC_API_BASE_URL . '/related';
	protected const QUERY_FILTER = 'wp_parsely_related_endpoint_args';
}

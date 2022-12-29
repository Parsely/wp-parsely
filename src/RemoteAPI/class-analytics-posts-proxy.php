<?php
/**
 * Remote API: `/analytics/posts` REST API Proxy class
 *
 * @package Parsely
 * @since   3.4.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

use Parsely\Parsely;

/**
 * Proxy for the `/analytics/posts` endpoint.
 *
 * @since 3.4.0
 */
class Analytics_Posts_Proxy extends Base_Proxy {
	protected const ENDPOINT     = Parsely::PUBLIC_API_BASE_URL . '/analytics/posts';
	protected const QUERY_FILTER = 'wp_parsely_analytics_posts_endpoint_args';
}

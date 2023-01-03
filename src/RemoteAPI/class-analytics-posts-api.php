<?php
/**
 * Class for Analytics Posts API (`/analytics/post`).
 *
 * @package Parsely
 * @since   3.4.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

use Parsely\Parsely;

/**
 * Class for Analytics Posts API (`/analytics/post`).
 *
 * @since 3.4.0
 */
class Analytics_Posts_API extends Remote_API_Base {
	protected const ENDPOINT     = Parsely::PUBLIC_API_BASE_URL . '/analytics/posts';
	protected const QUERY_FILTER = 'wp_parsely_analytics_posts_endpoint_args';
}

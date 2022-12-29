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
 *
 * @phpstan-type Analytics_Post_API_Params array{
 *   apikey?: string,
 *   secret?: string,
 *   pub_date_start?: string,
 *   pub_date_end?: string,
 *   sort?: string,
 *   limit?: int,
 * }
 */
class Analytics_Posts_API extends Remote_API_Base {
	protected const ENDPOINT     = Parsely::PUBLIC_API_BASE_URL . '/analytics/posts';
	protected const QUERY_FILTER = 'wp_parsely_analytics_posts_endpoint_args';
}

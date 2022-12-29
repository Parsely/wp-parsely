<?php
/**
 * Remote API: `/analytics/post/detail` REST API Proxy class
 *
 * @package Parsely
 * @since   3.6.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

use Parsely\Parsely;

/**
 * Proxy for the `/analytics/post/detail` endpoint.
 *
 * @since 3.6.0
 */
class Analytics_Post_Detail_Proxy extends Base_Proxy {
	protected const ENDPOINT     = Parsely::PUBLIC_API_BASE_URL . '/analytics/post/detail';
	protected const QUERY_FILTER = 'wp_parsely_analytics_post_detail_endpoint_args';
}

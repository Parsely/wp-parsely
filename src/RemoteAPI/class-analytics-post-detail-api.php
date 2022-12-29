<?php
/**
 * Class for Analytics Post Detail API (`/analytics/post/detail`).
 *
 * @package Parsely
 * @since   3.6.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

use Parsely\Parsely;

/**
 * Class for Analytics Post Detail API (`/analytics/post/detail`).
 *
 * @since 3.6.0
 */
class Analytics_Post_Detail_API extends Remote_API_Base {
	protected const ENDPOINT     = Parsely::PUBLIC_API_BASE_URL . '/analytics/post/detail';
	protected const QUERY_FILTER = 'wp_parsely_analytics_post_detail_endpoint_args';
}

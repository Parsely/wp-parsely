<?php
/**
 * Remote API: `/analytics` REST API Proxy class
 *
 * @package Parsely
 * @since   3.4.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

/**
 * Proxy for the `/analytics` endpoint.
 *
 * @since 3.4.0
 */
class Analytics_Proxy extends Base_Proxy {
	protected const ENDPOINT     = 'https://api.parsely.com/v2/analytics';
	protected const QUERY_FILTER = 'wp_parsely_analytics_endpoint_args';
}

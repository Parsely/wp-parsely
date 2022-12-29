<?php
/**
 * Class for Related API (`/related`).
 *
 * @package Parsely
 * @since   3.2.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

use Parsely\Parsely;

/**
 * Class for Related API (`/related`).
 *
 * @since 3.2.0
 */
class Related_API extends Remote_API_Base {
	protected const ENDPOINT     = Parsely::PUBLIC_API_BASE_URL . '/related';
	protected const QUERY_FILTER = 'wp_parsely_related_endpoint_args';
}

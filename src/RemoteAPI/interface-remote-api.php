<?php
/**
 * Remote API: Interface
 *
 * @package Parsely
 * @since   3.2.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

use WP_Error;

/**
 * Remote API Interface.
 */
interface Remote_API_Interface {
	/**
	 * Returns the items provided by this interface.
	 *
	 * @param array<string, mixed> $query The query arguments to send to the remote API.
	 *
	 * @return WP_Error|array<string, mixed>|false
	 */
	public function get_items( array $query );
}

<?php
/**
 * Parsely Remote API Proxy Interface
 *
 * @package Parsely
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

/**
 * Remote API Proxy Interface
 */
interface Proxy {
	/**
	 * Return the items provided by this interface.
	 */
	public function get_items();
}

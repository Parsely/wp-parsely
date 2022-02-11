<?php
/**
 * Parsely Related REST API Caching Decorator
 *
 * @package Parsely
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

use WP_Object_Cache;

/**
 * Caching Decorator for the remote /related endpoint.
 */
class Related_Caching_Decorator implements Proxy {
	const CACHE_GROUP      = 'wp-parsely';
	const OBJECT_CACHE_TTL = 5 * MINUTE_IN_SECONDS;

	/**
	 * The Proxy instance this will cache.
	 *
	 * @var Proxy
	 */
	private $decorated_proxy;

	/**
	 * Usually $GLOBALS['wp_object_cache'], but automated tests can inject a mock.
	 *
	 * @var WP_Object_Cache
	 */
	private $cache;

	/**
	 * The computed cache key.
	 *
	 * @var string
	 */
	private $cache_key;

	/**
	 * Constructor.
	 *
	 * @param Proxy           $proxy The Proxy object to cache.
	 * @param WP_Object_Cache $cache The WordPress object cache instance.
	 */
	public function __construct( Proxy $proxy, WP_Object_Cache $cache ) {
		$this->decorated_proxy = $proxy;
		$this->cache           = $cache;
		$this->cache_key       = 'api_related-' . wp_hash( wp_json_encode( $this->decorated_proxy->get_query() ) );
	}

	/**
	 * Implements caching for the proxy interface.
	 */
	public function get_items() {
		$items = $this->cache->get( $this->cache_key, self::CACHE_GROUP );
		if ( ! is_object( $items ) ) {
			$items = $this->decorated_proxy->get_items();
			$this->cache->set( $this->cache_key, $items, self::CACHE_GROUP, self::OBJECT_CACHE_TTL );
		}
		return $items;
	}
}

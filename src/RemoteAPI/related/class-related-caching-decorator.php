<?php
/**
 * Parsely Related REST API Caching Decorator
 *
 * @package Parsely
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

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
	 * A wrapped object that's compatible with the Cache Interface.
	 *
	 * @var Cache_Adapter
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
	 * @param Proxy         $proxy The Proxy object to cache.
	 * @param Cache_Adapter $cache An object cache instance.
	 */
	public function __construct( Proxy $proxy, Cache_Adapter $cache ) {
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

<?php
/**
 * Integration Tests: Parsely `/analytics/posts` Remote API
 *
 * @package Parsely\Tests
 * @since   3.5.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\RemoteAPI\Analytics_Posts_API;

/**
 * Integration Tests for the Parsely `/analytics/posts` Remote API.
 */
final class AnalyticsPostsRemoteAPITest extends RemoteAPITest {

	/**
	 * Initializes all required values for the test.
	 */
	public static function initialize(): void {
		self::$remote_api = new Analytics_Posts_API( new Parsely() );
	}

	/**
	 * Provides data for test_api_url().
	 *
	 * @return iterable
	 */
	public function data_api_url(): iterable {
		yield 'Basic (Expected data)' => array(
			array(
				'apikey' => 'my-key',
				'limit'  => 5,
			),
			Parsely::PUBLIC_API_BASE_URL . '/analytics/posts?apikey=my-key&limit=5',
		);
	}
}

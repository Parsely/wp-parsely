<?php
/**
 * Integration Tests: Parsely `/analytics/posts` Remote API
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\RemoteAPI\Analytics_Posts_Proxy;

/**
 * Integration Tests for the Parsely `/analytics/posts` Remote API.
 */
final class AnalyticsPostsRemoteAPITest extends RemoteAPITest {

	/**
	 * Runs once before all tests.
	 */
	public static function set_up_before_class(): void {
		parent::set_proxy( new Analytics_Posts_Proxy( new Parsely() ) );
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
			'https://api.parsely.com/v2/analytics/posts?apikey=my-key&limit=5',
		);
	}
}

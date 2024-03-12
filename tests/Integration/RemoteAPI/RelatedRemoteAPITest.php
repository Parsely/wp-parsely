<?php
/**
 * Integration Tests: Parsely `/related` Remote API
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\RemoteAPI\Related_API;

/**
 * Integration Tests for the Parsely `/related` Remote API.
 */
final class RelatedRemoteAPITest extends RemoteAPITest {

	/**
	 * Initializes all required values for the test.
	 */
	public static function initialize(): void {
		self::$remote_api = new Related_API( new Parsely() );
	}

	/**
	 * Provides data for test_api_url().
	 *
	 * @return \ArrayIterator<string, mixed>
	 */
	public function data_api_url(): iterable {
		yield 'Basic (Expected data)' => array(
			array(
				'apikey'         => 'my-key',
				'pub_date_start' => '7d',
				'sort'           => 'score',
				'limit'          => 5,
			),
			Parsely::PUBLIC_API_BASE_URL . '/related?apikey=my-key&limit=5&pub_date_start=7d&sort=score',
		);

		yield 'published_within value of 0' => array(
			array(
				'apikey' => 'my-key',
				'sort'   => 'score',
				'limit'  => 5,
			),
			Parsely::PUBLIC_API_BASE_URL . '/related?apikey=my-key&limit=5&sort=score',
		);

		yield 'Sort on publish date' => array(
			array(
				'apikey' => 'my-key',
				'sort'   => 'pub_date',
				'limit'  => 5,
			),
			Parsely::PUBLIC_API_BASE_URL . '/related?apikey=my-key&limit=5&sort=pub_date',
		);

		yield 'Rank by relevance only' => array(
			array(
				'apikey' => 'my-key',
				'sort'   => 'score',
				'limit'  => 5,
			),
			Parsely::PUBLIC_API_BASE_URL . '/related?apikey=my-key&limit=5&sort=score',
		);
	}

	/**
	 * Verifies that the endpoint does not have filters that check user capability.
	 *
	 * @covers \Parsely\RemoteAPI\Related_API::is_available_to_current_user
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 */
	public function test_related_endpoint_does_not_have_user_capability_filters(): void {
		$api = new Related_API( new Parsely() );

		self::assertTrue( $api->is_available_to_current_user() );
		$this->assert_wp_hooks_availability(
			array(
				'wp_parsely_user_capability_for_all_private_apis',
				'wp_parsely_user_capability_for_related_api',
			),
			false
		);
	}
}

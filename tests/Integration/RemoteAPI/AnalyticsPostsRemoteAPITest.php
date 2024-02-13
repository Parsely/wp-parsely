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
	 * @return \ArrayIterator<string, mixed>
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

	/**
	 * Verifies default user capability filter.
	 *
	 * @covers \Parsely\RemoteAPI\Analytics_Posts_API::is_available_to_current_user
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Utils\convert_endpoint_to_filter_key
	 */
	public function test_user_is_allowed_to_make_api_call_if_default_user_capability_is_changed(): void {
		$this->login_as_contributor();
		add_filter(
			'wp_parsely_user_capability_for_all_private_apis',
			function () {
				return 'edit_posts';
			}
		);

		$api = new Analytics_Posts_API( new Parsely() );

		self::assertTrue( $api->is_available_to_current_user() );
	}

	/**
	 * Verifies endpoint specific user capability filter.
	 *
	 * @covers \Parsely\RemoteAPI\Analytics_Posts_API::is_available_to_current_user
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Utils\convert_endpoint_to_filter_key
	 */
	public function test_user_is_allowed_to_make_api_call_if_endpoint_specific_user_capability_is_changed(): void {
		$this->login_as_contributor();
		add_filter(
			'wp_parsely_user_capability_for_analytics_posts_api',
			function () {
				return 'edit_posts';
			}
		);

		$api = new Analytics_Posts_API( new Parsely() );

		self::assertTrue( $api->is_available_to_current_user() );
	}

	/**
	 * Verifies that the endpoint specific user capability filter has more priority than the default capability filter.
	 *
	 * @covers \Parsely\RemoteAPI\Analytics_Posts_API::is_available_to_current_user
	 * @uses \Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses \Parsely\Endpoints\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Utils\convert_endpoint_to_filter_key
	 */
	public function test_endpoint_specific_user_capability_filter_have_more_priority_than_default(): void {
		$this->login_as_contributor();

		add_filter(
			'wp_parsely_user_capability_for_all_private_apis',
			function () {
				return 'publish_posts';
			}
		);

		add_filter(
			'wp_parsely_user_capability_for_analytics_posts_api',
			function () {
				return 'edit_posts';
			}
		);

		$api = new Analytics_Posts_API( new Parsely() );

		self::assertTrue( $api->is_available_to_current_user() );
	}
}

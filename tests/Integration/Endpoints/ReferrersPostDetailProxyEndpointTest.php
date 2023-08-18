<?php
/**
 * Integration Tests: Referrers Post Detail API Proxy Endpoint
 *
 * @package Parsely\Tests
 * @since   3.7.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Endpoints\Base_API_Proxy;
use Parsely\Endpoints\Referrers_Post_Detail_API_Proxy;
use Parsely\Parsely;
use Parsely\RemoteAPI\Referrers_Post_Detail_API;
use WP_REST_Request;

/**
 * Integration Tests for the Referrers Post Detail API Proxy Endpoint.
 */
final class ReferrersPostDetailProxyEndpointTest extends ProxyEndpointTest {

	/**
	 * Initializes all required values for the test.
	 */
	public static function initialize(): void {
		self::$route      = '/wp-parsely/v1/referrers/post/detail';
		self::$filter_key = 'referrers_post_detail';
	}

	/**
	 * Returns the endpoint to be used in tests.
	 *
	 * @return Base_API_Proxy
	 */
	public function get_endpoint(): Base_API_Proxy {
		return new Referrers_Post_Detail_API_Proxy(
			new Parsely(),
			new Referrers_Post_Detail_API( new Parsely() )
		);
	}

	/**
	 * Verifies that the route is registered.
	 *
	 * @covers \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::run
	 * @uses \Parsely\Endpoints\Base_API_Proxy::register_endpoint
	 * @uses \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::__construct
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 */
	public function test_register_routes_by_default(): void {
		parent::run_test_register_routes_by_default();
	}

	/**
	 * Verifies that the route is not registered when the
	 * wp_parsely_enable_referrers_post_details_api_proxy filter is set to false.
	 *
	 * @covers \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::run
	 * @uses \Parsely\Endpoints\Base_API_Proxy::register_endpoint
	 * @uses \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::__construct
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 */
	public function test_verify_that_route_is_not_registered_when_proxy_is_disabled(): void {
		parent::run_test_do_not_register_route_when_proxy_is_disabled();
	}

	/**
	 * Verifies that calling `GET /wp-parsely/v1/referrers/post/detail` returns
	 * an error and does not perform a remote call when the Site ID is not
	 * populated in site options.
	 *
	 * @covers \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::get_items
	 * @uses \Parsely\Endpoints\Base_API_Proxy::get_data
	 * @uses \Parsely\Endpoints\Base_API_Proxy::register_endpoint
	 * @uses \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::__construct
	 * @uses \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::permission_callback
	 * @uses \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::run
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 */
	public function test_get_items_fails_when_site_id_is_not_set(): void {
		$this->set_admin_user();
		parent::run_test_get_items_fails_without_site_id_set();
	}

	/**
	 * Verifies that calling `GET /wp-parsely/v1/referrers/post/detail` returns
	 * an error and does not perform a remote call when the Site ID is not
	 * populated in site options.
	 *
	 * @covers \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::get_items
	 * @uses \Parsely\Endpoints\Base_API_Proxy::get_data
	 * @uses \Parsely\Endpoints\Base_API_Proxy::register_endpoint
	 * @uses \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::__construct
	 * @uses \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::permission_callback
	 * @uses \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::run
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 */
	public function test_get_items_fails_when_api_secret_is_not_set(): void {
		$this->set_admin_user();
		parent::run_test_get_items_fails_without_api_secret_set();
	}

	/**
	 * Verifies default user capability filter.
	 *
	 * @covers \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::permission_callback
	 *
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 */
	public function test_user_is_allowed_to_make_proxy_api_call_if_default_user_capability_is_changed(): void {
		$this->login_as_contributor();
		add_filter(
			'wp_parsely_user_capability_for_all_private_apis',
			function () {
				return 'edit_posts';
			}
		);

		$proxy_api = new Referrers_Post_Detail_API_Proxy(
			new Parsely(),
			new Referrers_Post_Detail_API( new Parsely() )
		);

		self::assertTrue( $proxy_api->permission_callback() );
	}

	/**
	 * Verifies endpoint specific user capability filter.
	 *
	 * @covers \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::permission_callback
	 *
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 */
	public function test_user_is_allowed_to_make_proxy_api_call_if_endpoint_specific_user_capability_is_changed(): void {
		$this->login_as_contributor();
		add_filter(
			'wp_parsely_user_capability_for_referrers_post_detail_api',
			function () {
				return 'edit_posts';
			}
		);

		$proxy_api = new Referrers_Post_Detail_API_Proxy(
			new Parsely(),
			new Referrers_Post_Detail_API( new Parsely() )
		);

		self::assertTrue( $proxy_api->permission_callback() );
	}

	/**
	 * Verifies that calls to `GET /wp-parsely/v1/referrers/post/detail` return
	 * results in the expected format.
	 *
	 * @covers \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::get_items
	 * @uses \Parsely\Endpoints\Base_API_Proxy::get_data
	 * @uses \Parsely\Endpoints\Base_API_Proxy::register_endpoint
	 * @uses \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::__construct
	 * @uses \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::generate_data
	 * @uses \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::permission_callback
	 * @uses \Parsely\Endpoints\Referrers_Post_Detail_API_Proxy::run
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::get_api_url
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::get_items
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::get_request_options
	 */
	public function test_get_items(): void {
		$this->set_admin_user();
		TestCase::set_options(
			array(
				'apikey'     => 'example.com',
				'api_secret' => 'test',
			)
		);

		$dispatched = 0;

		add_filter(
			'pre_http_request',
			function () use ( &$dispatched ) {
				$dispatched++;
				return array(
					'body' => '{"data":[
						{
							"metrics": {"referrers_views": 1500},
							"name": "google",
							"type": "search"
						},
						{
							"metrics": {"referrers_views": 100},
							"name": "blog.parse.ly",
							"type": "internal"
						},
						{
							"metrics": {"referrers_views": 50},
							"name": "bing",
							"type": "search"
						},
						{
							"metrics": {"referrers_views": 30},
							"name": "facebook.com",
							"type": "social"
						},
						{
							"metrics": {"referrers_views": 10},
							"name": "okt.to",
							"type": "other"
						},
						{
							"metrics": {"referrers_views": 10},
							"name": "yandex",
							"type": "search"
						},
						{
							"metrics": {"referrers_views": 10},
							"name": "parse.ly",
							"type": "internal"
						},
						{
							"metrics": {"referrers_views": 10},
							"name": "yahoo!",
							"type": "search"
						},
						{
							"metrics": {"referrers_views": 5},
							"name": "site1.com",
							"type": "other"
						},
						{
							"metrics": {"referrers_views": 5},
							"name": "link.site2.com",
							"type": "other"
						}
					]}',
				);
			}
		);

		$expected_top = (object) array(
			'direct'        => (object) array(
				'views'                  => '770',
				'viewsPercentage'        => '30.80',
				'datasetViewsPercentage' => '31.43',
			),
			'google'        => (object) array(
				'views'                  => '1,500',
				'viewsPercentage'        => '60.00',
				'datasetViewsPercentage' => '61.22',
			),
			'blog.parse.ly' => (object) array(
				'views'                  => '100',
				'viewsPercentage'        => '4.00',
				'datasetViewsPercentage' => '4.08',
			),
			'bing'          => (object) array(
				'views'                  => '50',
				'viewsPercentage'        => '2.00',
				'datasetViewsPercentage' => '2.04',
			),
			'facebook.com'  => (object) array(
				'views'                  => '30',
				'viewsPercentage'        => '1.20',
				'datasetViewsPercentage' => '1.22',
			),
			'totals'        => (object) array(
				'views'                  => '2,450',
				'viewsPercentage'        => '98.00',
				'datasetViewsPercentage' => '100.00',
			),
		);

		$expected_types = (object) array(
			'social'   => (object) array(
				'views'           => '30',
				'viewsPercentage' => '1.20',
			),
			'search'   => (object) array(
				'views'           => '1,570',
				'viewsPercentage' => '62.80',
			),
			'other'    => (object) array(
				'views'           => '20',
				'viewsPercentage' => '0.80',
			),
			'internal' => (object) array(
				'views'           => '110',
				'viewsPercentage' => '4.40',
			),
			'direct'   => (object) array(
				'views'           => '770',
				'viewsPercentage' => '30.80',
			),
			'totals'   => (object) array(
				'views'           => '2,500',
				'viewsPercentage' => '100.00',
			),
		);

		$request = new WP_REST_Request( 'GET', self::$route );
		$request->set_param( 'total_views', '2,500' );

		$response = rest_get_server()->dispatch( $request );

		self::assertSame( 1, $dispatched );
		self::assertSame( 200, $response->get_status() );
		self::assertEquals(
			(object) array(
				'data' => array(
					'top'   => $expected_top,
					'types' => $expected_types,
				),
			),
			$response->get_data()
		);
	}
}

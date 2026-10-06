<?php
/**
 * Integration test for the related endpoint, Endpoint_Related class.
 *
 * @package Parsely\Tests
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\Stats;

use Parsely\REST_API\Stats\Endpoint_Related;
use Parsely\REST_API\Stats\Stats_Controller;
use Parsely\Tests\Integration\RestAPI\BaseEndpointTest;
use Parsely\Tests\Integration\TestCase;
use WP_REST_Request;

/**
 * Integration test for the related endpoint, Endpoint_Related class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\REST_API\Stats\Endpoint_Related
 */
class EndpointRelatedTest extends BaseEndpointTest {
	/**
	 * The endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Endpoint_Related
	 */
	private $endpoint;

	/**
	 * Setup method called before each test.
	 *
	 * @since 3.17.0
	 */
	public function set_up(): void {
		// Initialize the specific endpoint for this test class.
		$this->api_controller = new Stats_Controller( $this->parsely );
		$this->endpoint       = new Endpoint_Related( $this->api_controller );

		parent::set_up();
	}

	/**
	 * Gets the test endpoint instance.
	 *
	 * @since 3.17.0
	 *
	 * @return Endpoint_Related
	 */
	public function get_endpoint(): \Parsely\REST_API\Base_Endpoint {
		return $this->endpoint;
	}

	/**
	 * Verifies that the route is registered.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Related::register_routes
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::__construct
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::get_endpoint_name
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::is_available_to_current_user
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::get_itm_source_param_args
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_route_is_registered(): void {
		$routes = rest_get_server()->get_routes();

		// Check that the route is registered.
		$expected_route = $this->get_endpoint()->get_full_endpoint( '/' );
		self::assertArrayHasKey( $expected_route, $routes );

		// Check that the route is associated with the GET method.
		$route_data = $routes[ $expected_route ];
		self::assertArrayHasKey( 'GET', $route_data[0]['methods'] );
	}

	/**
	 * Verifies that the endpoint is available to everyone, even if they are not
	 * logged in.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Related::is_available_to_current_user
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_api_secret
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::get_url_with_itm_source
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::__construct
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::get_endpoint_name
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::get_related_posts
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::register_routes
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::get_itm_source_param_args
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::set_itm_source_from_request
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_of_url
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_access_of_related_posts_is_available_to_everyone(): void {
		TestCase::set_options(
			array(
				'apikey'     => 'test-api-key',
				'api_secret' => 'test-secret',
			)
		);
		wp_set_current_user( 0 );

		$dispatched = 0;
		$this->mock_api_response( $dispatched );

		$route   = $this->get_endpoint()->get_full_endpoint( '/' );
		$request = new WP_REST_Request( 'GET', $route );
		$request->set_param( 'url', 'https://example.com/a-post' );
		$response = rest_get_server()->dispatch( $request );

		self::assertEquals( 1, $dispatched );
		self::assertSame( 200, $response->get_status() );
	}

	/**
	 * Mocks the API response of the Parse.ly API.
	 *
	 * @since 3.17.0
	 *
	 * @param int &$dispatched The number of times the API was dispatched.
	 */
	private function mock_api_response( int &$dispatched ): void {
		add_filter(
			'pre_http_request',
			function () use ( &$dispatched ): array {
				$dispatched++;
				return array(
					'body' => '{"data":[
						{
							"image_url":"https:\/\/example.com\/img.png",
							"thumb_url_medium":"https:\/\/example.com\/thumb.png",
							"title":"something",
							"url":"https:\/\/example.com"
						},
						{
							"image_url":"https:\/\/example.com\/img2.png",
							"thumb_url_medium":"https:\/\/example.com\/thumb2.png",
							"title":"something2",
							"url":"https:\/\/example.com\/2"
						}
					]}',
				);
			}
		);
	}

	/**
	 * Verifies that calls to the `stats/related` return the expected data, in the
	 * expected format, despite the user being unauthenticated.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Related::get_related_posts
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_api_secret
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::get_url_with_itm_source
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::get_full_endpoint
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::register_rest_route
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::__construct
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::get_endpoint_name
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::is_available_to_current_user
	 * @uses \Parsely\REST_API\Stats\Endpoint_Related::register_routes
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::get_itm_source_param_args
	 * @uses \Parsely\REST_API\Stats\Post_Data_Trait::set_itm_source_from_request
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_of_url
	 * @uses \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_route_prefix
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_get_related_posts(): void {
		$route = $this->get_endpoint()->get_full_endpoint( '/' );

		TestCase::set_options(
			array(
				'apikey'     => 'example.com',
				'api_secret' => 'test-secret',
			)
		);

		$dispatched = 0;

		add_filter(
			'pre_http_request',
			function () use ( &$dispatched ): array {
				$dispatched++;
				return array(
					'body' => '{"data":[
						{
							"image_url":"https:\/\/example.com\/img.png",
							"thumb_url_medium":"https:\/\/example.com\/thumb.png",
							"title":"something",
							"url":"https:\/\/example.com"
						},
						{
							"image_url":"https:\/\/example.com\/img2.png",
							"thumb_url_medium":"https:\/\/example.com\/thumb2.png",
							"title":"something2",
							"url":"https:\/\/example.com\/2"
						}
					]}',
				);
			}
		);

		$request = new WP_REST_Request( 'GET', $route );
		$request->set_param( 'url', 'https://example.com/a-post' );
		$response = rest_get_server()->dispatch( $request );

		/**
		 * The response data.
		 *
		 * @var array<string, mixed> $response_data
		 */
		$response_data = $response->get_data();

		self::assertSame( 1, $dispatched );
		self::assertSame( 200, $response->get_status() );
		self::assertEquals(
			array(
				array(
					'image_url'        => 'https://example.com/img.png',
					'thumb_url_medium' => 'https://example.com/thumb.png',
					'title'            => 'something',
					'url'              => 'https://example.com',
				),
				array(
					'image_url'        => 'https://example.com/img2.png',
					'thumb_url_medium' => 'https://example.com/thumb2.png',
					'title'            => 'something2',
					'url'              => 'https://example.com/2',
				),
			),
			$response_data['data']
		);
	}

	/**
	 * Verifies that the upstream request omits the API Secret and uses a
	 * 5-second timeout.
	 *
	 * @since 3.24.2
	 */
	public function test_upstream_request_omits_api_secret_and_uses_short_timeout(): void {
		TestCase::set_options(
			array(
				'apikey'     => 'test-api-key',
				'api_secret' => 'test-secret',
			)
		);
		wp_set_current_user( 0 );

		$upstream_url  = '';
		$upstream_args = array();

		add_filter(
			'pre_http_request',
			function ( bool $preempt, array $args, string $url ) use ( &$upstream_url, &$upstream_args ): array {
				$upstream_url  = $url;
				$upstream_args = $args;

				return array( 'body' => '{"data":[]}' );
			},
			10,
			3
		);

		$request = new WP_REST_Request( 'GET', $this->get_endpoint()->get_full_endpoint( '/' ) );
		$request->set_param( 'url', 'https://example.com/a-post' );
		$response = rest_get_server()->dispatch( $request );

		self::assertSame( 200, $response->get_status() );
		self::assertStringContainsString( 'apikey=test-api-key', $upstream_url );
		self::assertStringNotContainsString( 'secret', $upstream_url );
		self::assertSame( 5, $upstream_args['timeout'] ?? null );
	}

	/**
	 * Verifies that the endpoint is not available if the API Secret is not set.
	 *
	 * This test is disabled since the endpoint does not require an API Secret.
	 *
	 * @since 3.17.0
	 *
	 * @coversNothing
	 */
	public function test_is_available_to_current_user_returns_error_api_secret_not_set(): void {
		self::assertTrue( true );
	}

	/**
	 * Verifies that the related posts arguments are registered as arguments of
	 * the route, so that they get validated.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Related::register_routes
	 * @covers \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 */
	public function test_related_posts_arguments_are_registered(): void {
		$routes = rest_get_server()->get_routes();
		$args   = $routes[ $this->get_endpoint()->get_full_endpoint( '/' ) ][0]['args'];

		self::assertSame(
			array( 'url', 'sort', 'limit', 'pub_date_start', 'pub_date_end', 'page', 'section', 'tag', 'author', 'itm_source' ),
			array_keys( $args )
		);
	}

	/**
	 * Verifies that invalid parameters are rejected before any upstream request.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Related::register_routes
	 * @covers \Parsely\REST_API\Stats\Endpoint_Related::validate_url
	 * @covers \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @dataProvider provide_invalid_parameters
	 *
	 * @param array<string, mixed> $params The request parameters.
	 */
	public function test_invalid_parameters_are_rejected( array $params ): void {
		$upstream_urls = array();
		$this->mock_upstream( $this->get_upstream_items(), $upstream_urls );

		$response = $this->dispatch_logged_out( $params );

		/** @var array<string, mixed> $data */
		$data = $response->get_data();
		self::assertSame( 400, $response->get_status() );
		self::assertSame( 'rest_invalid_param', $data['code'] );
		self::assertSame( array(), $upstream_urls );
	}

	/**
	 * Provides parameters that the endpoint must reject.
	 *
	 * @since 3.24.2
	 *
	 * @return iterable<string, array{0: array<string, mixed>}>
	 */
	public static function provide_invalid_parameters(): iterable {
		$url = 'https://example.com/a-post';

		yield 'URL without a scheme' => array( array( 'url' => 'not a url' ) );
		yield 'URL without a host' => array( array( 'url' => 'https://?q=1' ) );
		yield 'URL with an empty host' => array( array( 'url' => 'https:///a-post' ) );
		yield 'array URL' => array( array( 'url' => array( $url ) ) );
		yield 'mailto: URL' => array( array( 'url' => 'mailto:someone@example.com' ) );
		yield 'FTP URL' => array( array( 'url' => 'ftp://example.com/a-post' ) );
		yield 'array itm_source' => array(
			array(
				'url'        => $url,
				'itm_source' => array( 'a' ),
			),
		);
		yield 'zero limit' => array(
			array(
				'url'   => $url,
				'limit' => 0,
			),
		);
		yield 'limit over the maximum' => array(
			array(
				'url'   => $url,
				'limit' => 101,
			),
		);
		yield 'non-numeric limit' => array(
			array(
				'url'   => $url,
				'limit' => 'abc',
			),
		);
		yield 'zero page' => array(
			array(
				'url'  => $url,
				'page' => 0,
			),
		);
		yield 'unknown sort' => array(
			array(
				'url'  => $url,
				'sort' => 'bogus',
			),
		);
	}

	/**
	 * Verifies that the requests the Recommendations Block and other clients
	 * send are accepted.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Related::get_related_posts
	 * @covers \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_param_args
	 * @dataProvider provide_valid_sorts
	 *
	 * @param string $sort The sort parameter.
	 */
	public function test_client_requests_are_accepted( string $sort ): void {
		$upstream_urls = array();
		$this->mock_upstream( $this->get_upstream_items(), $upstream_urls );

		$response = $this->dispatch_logged_out(
			array(
				'url'        => 'https://example.com/a-post?utm_source=x',
				'limit'      => 3,
				'sort'       => $sort,
				'itm_source' => 'wp-parsely-recommendations-block',
			)
		);

		self::assertSame( 200, $response->get_status() );
		self::assertCount( 1, $upstream_urls );
		self::assertStringContainsString( 'limit=3', $upstream_urls[0] );
		self::assertStringContainsString( 'sort=' . $sort, $upstream_urls[0] );
	}

	/**
	 * Provides the sort values that clients send.
	 *
	 * @since 3.24.2
	 *
	 * @return iterable<string, array{0: string}>
	 */
	public static function provide_valid_sorts(): iterable {
		yield 'score, sent by the Block and the Widget' => array( 'score' );
		yield '_score, the previous default' => array( '_score' );
		yield 'pub_date' => array( 'pub_date' );
	}

	/**
	 * Verifies that URLs with a host are accepted.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Related::validate_url
	 * @dataProvider provide_urls_with_a_host
	 *
	 * @param string $url The URL.
	 */
	public function test_urls_with_a_host_are_accepted( string $url ): void {
		$upstream_urls = array();
		$this->mock_upstream( $this->get_upstream_items(), $upstream_urls );

		$response = $this->dispatch_logged_out( array( 'url' => $url ) );

		self::assertSame( 200, $response->get_status() );
		self::assertCount( 1, $upstream_urls );
	}

	/**
	 * Provides URLs with a host.
	 *
	 * @since 3.24.2
	 *
	 * @return iterable<string, array{0: string}>
	 */
	public static function provide_urls_with_a_host(): iterable {
		yield 'Port' => array( 'http://localhost:8889/?p=1' );
		yield 'IPv6 host' => array( 'https://[2001:db8::1]/a-post' );
		yield 'Non-ASCII host' => array( 'https://bücher.example/a-post' );
	}

	/**
	 * Verifies that partial upstream items neither raise warnings nor break
	 * the response.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Stats\Related_Posts_Trait::get_related_posts_of_url
	 */
	public function test_partial_upstream_items_are_handled(): void {
		$upstream_urls = array();
		$this->mock_upstream(
			array(
				array(
					'title' => 'No images',
					'url'   => 'https://example.com/no-images',
				),
				array( 'title' => 'No URL' ),
				array(
					'title' => 'Empty URL',
					'url'   => '',
				),
				'not an item',
			),
			$upstream_urls
		);

		$response = $this->dispatch_logged_out( array( 'url' => 'https://example.com/a-post' ) );

		/** @var array<string, mixed> $data */
		$data = $response->get_data();
		self::assertSame( 200, $response->get_status() );
		self::assertSame(
			array(
				array(
					'image_url'        => '',
					'thumb_url_medium' => '',
					'title'            => 'No images',
					'url'              => 'https://example.com/no-images',
				),
			),
			$data['data']
		);
	}

	/**
	 * Dispatches a request to the endpoint while logged out.
	 *
	 * @since 3.24.2
	 *
	 * @param array<string, mixed> $params The request parameters.
	 * @return \WP_REST_Response The response.
	 */
	private function dispatch_logged_out( array $params ): \WP_REST_Response {
		TestCase::set_options(
			array(
				'apikey'     => 'example.com',
				'api_secret' => 'test-secret',
			)
		);
		wp_set_current_user( 0 );

		$request = new WP_REST_Request( 'GET', $this->get_endpoint()->get_full_endpoint( '/' ) );
		foreach ( $params as $key => $value ) {
			$request->set_param( $key, $value );
		}

		return rest_get_server()->dispatch( $request );
	}

	/**
	 * Mocks the upstream API, returning the passed items.
	 *
	 * @since 3.24.2
	 *
	 * @param array<mixed>      $items The items to return.
	 * @param array<int,string> $urls  Receives the URLs of the upstream requests.
	 */
	private function mock_upstream( array $items, array &$urls ): void {
		add_filter(
			'pre_http_request',
			static function ( $preempt, array $args, string $url ) use ( &$urls, $items ): array {
				$urls[] = $url;

				return array(
					'body'     => (string) wp_json_encode( array( 'data' => $items ) ),
					'response' => array( 'code' => 200 ),
				);
			},
			10,
			3
		);
	}

	/**
	 * Returns a complete upstream item.
	 *
	 * @since 3.24.2
	 *
	 * @return array<int, array<string, string>> The items.
	 */
	private function get_upstream_items(): array {
		return array(
			array(
				'image_url'        => 'https://example.com/img.png',
				'thumb_url_medium' => 'https://example.com/thumb.png',
				'title'            => 'something',
				'url'              => 'https://example.com',
			),
		);
	}
}

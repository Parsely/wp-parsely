<?php
/**
 * Integration tests for how REST parameters of unexpected types or sizes are
 * validated and sanitized.
 *
 * WordPress doesn't check a parameter's type before passing it to the
 * argument's callbacks, so the callbacks must accept any type.
 *
 * @package Parsely
 * @since   3.24.2
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI;

use Parsely\Parsely;
use Parsely\REST_API\REST_API_Controller;
use Parsely\Tests\Integration\TestCase;
use WP_REST_Request;

/**
 * Integration tests for how REST parameters of unexpected types or sizes are
 * validated and sanitized.
 *
 * @since 3.24.2
 *
 * @covers \Parsely\REST_API\Stats\Endpoint_Posts::validate_urls
 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::validate_smart_link_params
 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::validate_multiple_smart_links
 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::register_routes
 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::validate_smart_link_id
 * @covers \Parsely\REST_API\Stats\Endpoint_Posts::validate_max_length_is_5
 * @covers \Parsely\REST_API\Stats\Endpoint_Posts::sanitize_string_to_array
 * @covers \Parsely\REST_API\Stats\Endpoint_Posts::sanitize_urls
 * @covers \Parsely\REST_API\Stats\Endpoint_Post::register_routes
 */
class InputValidationTest extends TestCase {
	/**
	 * A post to use in post ID routes.
	 *
	 * @var int
	 */
	private $post_id;

	/**
	 * The URLs of the HTTP requests made during the test.
	 *
	 * @var array<int, string>
	 */
	private $requested_urls = array();

	/**
	 * Sets up the test environment.
	 *
	 * @since 3.24.2
	 */
	public function set_up(): void {
		parent::set_up();

		$this->requested_urls = array();
		add_filter(
			'pre_http_request',
			function ( $preempt, array $args, string $url ): array {
				$this->requested_urls[] = $url;

				return array( 'body' => '{"data":[]}' );
			},
			10,
			3
		);

		TestCase::set_options(
			array(
				'apikey'         => 'test-apikey',
				'api_secret'     => 'test-secret',
				'content_helper' => array(
					'ai_features_enabled' => true,
					'smart_linking'       => array(
						'enabled'            => true,
						'allowed_user_roles' => array( 'administrator' ),
					),
				),
			)
		);

		( new REST_API_Controller( new Parsely() ) )->init();
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'rest_api_init' );

		/** @var int $post_id */
		$post_id       = self::factory()->post->create();
		$this->post_id = $post_id;
	}

	/**
	 * Tears down the test environment.
	 *
	 * @since 3.24.2
	 */
	public function tear_down(): void {
		// Otherwise these routes carry over into later tests.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['wp_rest_server'] = null;

		parent::tear_down();
	}

	/**
	 * Verifies that malformed or oversized input gets a 400 response, rather
	 * than a fatal error or processing.
	 *
	 * @since 3.24.2
	 *
	 * @dataProvider provide_rejected_requests
	 *
	 * @param string               $method   The HTTP method.
	 * @param string               $route    The route, with `{id}` for the post ID.
	 * @param array<string, mixed> $params   The request parameters.
	 * @param bool                 $as_admin Whether to send the request as an Administrator.
	 * @param bool                 $as_json  Whether to send the parameters as a JSON body.
	 */
	public function test_rejected_requests( string $method, string $route, array $params, bool $as_admin, bool $as_json = false ): void {
		if ( $as_admin ) {
			$this->set_current_user_to_admin();
		} else {
			wp_set_current_user( 0 );
		}

		$route = str_replace( '{id}', (string) $this->post_id, $route );

		if ( $as_json ) {
			$request = $this->get_json_request( $method, $route, $params );
		} else {
			$request = new WP_REST_Request( $method, '/wp-parsely/v2/' . $route );
			foreach ( $params as $key => $value ) {
				$request->set_param( $key, $value );
			}
		}

		$response = rest_get_server()->dispatch( $request );

		/** @var array<string, mixed> $data */
		$data = $response->get_data();
		self::assertSame( 400, $response->get_status() );
		self::assertSame( 'rest_invalid_param', $data['code'] );
	}

	/**
	 * Provides requests that must be rejected.
	 *
	 * @since 3.24.2
	 *
	 * @return iterable<string, array{0: string, 1: string, 2: array<string, mixed>, 3: bool, 4?: bool}>
	 */
	public static function provide_rejected_requests(): iterable {
		$too_many_urls = array_fill( 0, 501, 'https://example.com/a-post/' );

		yield 'stats/posts, urls not an array' => array( 'GET', 'stats/posts', array( 'urls' => 'abc' ), false );
		yield 'stats/posts, too many urls' => array( 'GET', 'stats/posts', array( 'urls' => $too_many_urls ), false );
		yield 'Smart Linking add, link not an array' => array( 'POST', 'content-helper/smart-linking/{id}/add', array( 'link' => 'abc' ), false );
		yield 'Smart Linking add-multiple, links not an array' => array( 'POST', 'content-helper/smart-linking/{id}/add-multiple', array( 'links' => 'abc' ), false );
		yield 'Smart Linking add-multiple, link not an array' => array( 'POST', 'content-helper/smart-linking/{id}/add-multiple', array( 'links' => array( 'abc' ) ), false );
		yield 'Smart Linking set, links not an array' => array( 'POST', 'content-helper/smart-linking/{id}/set', array( 'links' => 'abc' ), false );
		yield 'get-post-meta-for-urls, url not a string' => array( 'POST', 'content-helper/smart-linking/get-post-meta-for-urls', array( 'urls' => array( array( 'a' ) ) ), true );
		yield 'get-post-meta-for-urls, too many urls' => array( 'POST', 'content-helper/smart-linking/get-post-meta-for-urls', array( 'urls' => $too_many_urls ), true );
		yield 'post ID route, post_id an array' => array( 'GET', 'utils/post/{id}/rest-route', array( 'post_id' => array( '1' ) ), false );
		yield 'post ID route, post_id an object' => array( 'POST', 'content-helper/traffic-boost/{id}/generate', array( 'post_id' => array( 'a' => 1 ) ), false, true );
		yield 'Traffic Boost accept-suggestion, smart_link_id not numeric' => array( 'POST', 'content-helper/traffic-boost/{id}/accept-suggestion/1', array( 'smart_link_id' => 'abc' ), false );
		yield 'Traffic Boost accept-suggestion, smart_link_id an array' => array( 'POST', 'content-helper/traffic-boost/{id}/accept-suggestion/1', array( 'smart_link_id' => array( 1 ) ), false, true );
		yield 'Smart Linking add, title not a string' => array( 'POST', 'content-helper/smart-linking/{id}/add', array( 'link' => self::get_link( array( 'title' => 5 ) ) ), false, true );
		yield 'Smart Linking add, text not a string' => array( 'POST', 'content-helper/smart-linking/{id}/add', array( 'link' => self::get_link( array( 'text' => array( 'a' ) ) ) ), false, true );
		yield 'Smart Linking add, offset not an integer' => array( 'POST', 'content-helper/smart-linking/{id}/add', array( 'link' => self::get_link( array( 'offset' => 'abc' ) ) ), false, true );
		yield 'Smart Linking add, href without a raw URL' => array( 'POST', 'content-helper/smart-linking/{id}/add', array( 'link' => self::get_link( array( 'href' => array() ) ) ), false, true );
		yield 'Smart Linking add-multiple, title not a string' => array( 'POST', 'content-helper/smart-linking/{id}/add-multiple', array( 'links' => array( self::get_link( array( 'title' => 5 ) ) ) ), false, true );
		yield 'Smart Linking set, offset not an integer' => array( 'POST', 'content-helper/smart-linking/{id}/set', array( 'links' => array( self::get_link( array( 'offset' => 1.5 ) ) ) ), false, true );
		yield 'stats/posts, tag a number' => array( 'GET', 'stats/posts', array( 'tag' => 5 ), false, true );
		yield 'stats/posts, tag a boolean' => array( 'GET', 'stats/posts', array( 'tag' => true ), false, true );
		yield 'stats/posts, tag item not a string' => array( 'GET', 'stats/posts', array( 'tag' => array( array( 'a' ) ) ), true );
		yield 'stats/post referrers, itm_source not a string' => array( 'GET', 'stats/post/{id}/referrers', array( 'itm_source' => array( 'a' ) ), true );
	}

	/**
	 * Verifies that the maximum number of URLs is accepted.
	 *
	 * @since 3.24.2
	 */
	public function test_maximum_number_of_urls_is_accepted(): void {
		$this->set_current_user_to_admin();

		$request = new WP_REST_Request( 'POST', '/wp-parsely/v2/content-helper/smart-linking/get-post-meta-for-urls' );
		$request->set_param( 'urls', array_fill( 0, 500, 'https://example.com/a-post/' ) );

		self::assertSame( 200, rest_get_server()->dispatch( $request )->get_status() );
	}

	/**
	 * Verifies that a null `tag` or `urls` is handled like an omitted one.
	 *
	 * WordPress skips validation for null values, but still sanitizes them.
	 *
	 * @since 3.26.0
	 *
	 * @dataProvider provide_list_params
	 *
	 * @param string $param The parameter name.
	 */
	public function test_null_list_param_is_handled_as_omitted( string $param ): void {
		wp_set_current_user( 0 );
		$response = rest_get_server()->dispatch( $this->get_json_request( 'GET', 'stats/posts', array( $param => null ) ) );
		self::assertSame( 401, $response->get_status() );

		$this->set_current_user_to_admin();
		self::assertSame(
			$this->get_requested_api_url( $this->get_json_request( 'GET', 'stats/posts', array() ) ),
			$this->get_requested_api_url( $this->get_json_request( 'GET', 'stats/posts', array( $param => null ) ) )
		);
	}

	/**
	 * Provides the list parameters of the stats/posts route.
	 *
	 * @since 3.26.0
	 *
	 * @return iterable<string, array{0: string}>
	 */
	public static function provide_list_params(): iterable {
		yield 'tag' => array( 'tag' );
		yield 'urls' => array( 'urls' );
	}

	/**
	 * Verifies that `urls` values in the query string don't change the Parse.ly
	 * API request when a JSON body overrides them.
	 *
	 * WordPress sanitizes every source of a parameter, but validates only the
	 * one it uses.
	 *
	 * @since 3.26.0
	 *
	 * @dataProvider provide_overridden_urls
	 *
	 * @param string|array<mixed> $urls The overridden value.
	 */
	public function test_overridden_urls_do_not_change_the_request( $urls ): void {
		$this->set_current_user_to_admin();

		$json    = array( 'urls' => array( 'https://example.com/a-post/' ) );
		$request = $this->get_json_request( 'GET', 'stats/posts', $json );
		$request->set_query_params( array( 'urls' => $urls ) );

		self::assertSame(
			$this->get_requested_api_url( $this->get_json_request( 'GET', 'stats/posts', $json ) ),
			$this->get_requested_api_url( $request )
		);
	}

	/**
	 * Provides overridden query string values for `urls`.
	 *
	 * @since 3.26.0
	 *
	 * @return iterable<string, array{0: string|array<mixed>}>
	 */
	public static function provide_overridden_urls(): iterable {
		yield 'a string' => array( 'abc' );
		yield 'an array of arrays' => array( array( array( 'a' ) ) );
	}

	/**
	 * Verifies that a form-encoded Smart Link, whose values are all strings, is
	 * added with an integer offset.
	 *
	 * @since 3.26.0
	 */
	public function test_form_encoded_smart_link_is_added(): void {
		$this->set_current_user_to_admin();

		$request = new WP_REST_Request( 'POST', '/wp-parsely/v2/content-helper/smart-linking/' . $this->post_id . '/add' );
		$request->set_header( 'Content-Type', 'application/x-www-form-urlencoded' );
		$request->set_body_params( array( 'link' => self::get_link( array( 'offset' => '3' ) ) ) );

		$response = rest_get_server()->dispatch( $request );

		/** @var array{data: \stdClass} $data */
		$data = $response->get_data();
		self::assertSame( 200, $response->get_status() );
		self::assertSame( 3, $data['data']->offset );
	}

	/**
	 * Dispatches a request, and returns the URL of the Parse.ly API request that
	 * it made.
	 *
	 * @since 3.26.0
	 *
	 * @param WP_REST_Request $request The request.
	 * @return string The Parse.ly API request's URL.
	 */
	private function get_requested_api_url( WP_REST_Request $request ): string {
		$request_count = count( $this->requested_urls );

		wp_cache_flush(); // API responses are cached.
		$response = rest_get_server()->dispatch( $request );

		self::assertSame( 200, $response->get_status() );
		self::assertCount( $request_count + 1, $this->requested_urls );

		return $this->requested_urls[ $request_count ];
	}

	/**
	 * Returns a request with the given parameters as a JSON body.
	 *
	 * @since 3.26.0
	 *
	 * @param string               $method The HTTP method.
	 * @param string               $route  The route, relative to the plugin's namespace.
	 * @param array<string, mixed> $params The request parameters.
	 * @return WP_REST_Request The request.
	 */
	private function get_json_request( string $method, string $route, array $params ): WP_REST_Request {
		$request = new WP_REST_Request( $method, '/wp-parsely/v2/' . $route );
		$request->set_header( 'Content-Type', 'application/json' );
		$request->set_body( (string) wp_json_encode( $params ) );

		return $request;
	}

	/**
	 * Returns valid Smart Link data, with the given fields replaced.
	 *
	 * @since 3.26.0
	 *
	 * @param array<string, mixed> $fields The fields to replace.
	 * @return array<string, mixed> The Smart Link data.
	 */
	private static function get_link( array $fields = array() ): array {
		return array_merge(
			array(
				'uid'    => 'a-uid',
				'href'   => array( 'raw' => 'https://example.com/a-post/' ),
				'title'  => 'A title',
				'text'   => 'a text',
				'offset' => 0,
			),
			$fields
		);
	}
}

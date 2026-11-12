<?php
/**
 * Integration tests asserting that REST argument validation rejects malformed
 * and oversized input.
 *
 * WordPress passes the raw parameter value to an argument's `validate_callback`
 * before any type check, so the callbacks must accept any type.
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
 * Integration tests asserting that REST argument validation rejects malformed
 * and oversized input.
 *
 * @since 3.24.2
 *
 * @covers \Parsely\REST_API\Stats\Endpoint_Posts::validate_urls
 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::validate_smart_link_params
 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::validate_multiple_smart_links
 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::register_routes
 */
class InputValidationTest extends TestCase {
	/**
	 * A post to use in post ID routes.
	 *
	 * @var int
	 */
	private $post_id;

	/**
	 * Sets up the test environment.
	 *
	 * @since 3.24.2
	 */
	public function set_up(): void {
		parent::set_up();

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
	 */
	public function test_rejected_requests( string $method, string $route, array $params, bool $as_admin ): void {
		if ( $as_admin ) {
			$this->set_current_user_to_admin();
		} else {
			wp_set_current_user( 0 );
		}

		$request = new WP_REST_Request(
			$method,
			'/wp-parsely/v2/' . str_replace( '{id}', (string) $this->post_id, $route )
		);
		foreach ( $params as $key => $value ) {
			$request->set_param( $key, $value );
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
	 * @return iterable<string, array{0: string, 1: string, 2: array<string, mixed>, 3: bool}>
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
}

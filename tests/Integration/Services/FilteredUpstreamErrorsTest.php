<?php
/**
 * Integration Tests: Upstream errors shaped by other code
 *
 * @package Parsely
 * @since   3.24.2
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Services;

use Parsely\Parsely;
use Parsely\REST_API\REST_API_Controller;
use Parsely\Services\Content_API\Content_API_Service;
use Parsely\Services\Suggestions_API\Suggestions_API_Service;
use Parsely\Tests\Integration\TestCase;
use WP_Error;
use WP_REST_Request;

/**
 * Integration tests for relayed errors that other code, such as a
 * `pre_http_request` filter, encoded or attached data to.
 *
 * The relayed error omits the API Secret in these cases too.
 *
 * @since 3.24.2
 *
 * @covers \Parsely\Services\Base_Service_Endpoint::request
 * @covers \Parsely\Services\Base_Service_Endpoint::get_relayable_transport_error
 * @covers \Parsely\Services\Base_Service_Endpoint::strip_credentials
 * @covers \Parsely\Services\Base_Service_Endpoint::has_encoded_credentials
 * @covers \Parsely\Services\Base_Service_Endpoint::process_response
 * @covers \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Check_Auth::request
 */
class FilteredUpstreamErrorsTest extends TestCase {
	/**
	 * The API Secret, with characters that URLs and JSON encode.
	 */
	private const API_SECRET = 'TEST+APISECRET/fixture==';

	/**
	 * Sets up the test environment.
	 *
	 * @since 3.24.2
	 */
	public function set_up(): void {
		parent::set_up();

		TestCase::set_options(
			array(
				'apikey'     => 'test-siteid.example.com',
				'api_secret' => self::API_SECRET,
			)
		);
	}

	/**
	 * Tears down the test environment.
	 *
	 * @since 3.24.2
	 */
	public function tear_down(): void {
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['wp_rest_server'] = null;

		parent::tear_down();
	}

	/**
	 * Verifies that the credentials check doesn't relay the data that a filter
	 * attached to a transport error, such as the request headers.
	 *
	 * @since 3.24.2
	 */
	public function test_check_auth_drops_transport_error_data(): void {
		$this->fail_requests_with(
			static function ( array $args ): WP_Error {
				return new WP_Error( 'blocked_by_policy', 'Blocked by policy', array( 'args' => $args ) );
			}
		);

		( new REST_API_Controller( new Parsely() ) )->init();
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'rest_api_init' );
		$this->set_current_user_to_admin();

		$request = new WP_REST_Request( 'POST', '/wp-parsely/v2/content-helper/check-auth' );
		$request->set_param( 'auth_scope', 'suggestions_api' );

		/** @var array{code: string, data: mixed} $data */
		$data = rest_get_server()->dispatch( $request )->get_data();

		// Proves the upstream request was attempted.
		self::assertSame( 'blocked_by_policy', $data['code'] );
		self::assertSame( array( 'status' => 500 ), $data['data'] );
		$this->assert_secret_absent( $data );
	}

	/**
	 * Verifies that a message holding the request URL in encoded form omits
	 * the API Secret.
	 *
	 * A JSON-escaped URL keeps its query syntax, so it gets stripped in place.
	 * A URL-encoded one doesn't, so the message gets withheld.
	 *
	 * @since 3.24.2
	 *
	 * @dataProvider provide_encoders
	 *
	 * @param string $encoding The encoding of the URL in the message.
	 * @param bool   $withheld Whether the message is expected to be withheld.
	 */
	public function test_encoded_url_in_message_omits_secret( string $encoding, bool $withheld ): void {
		$this->fail_requests_with(
			static function ( array $args, string $url ) use ( $encoding ): WP_Error {
				switch ( $encoding ) {
					case 'url':
						$encoded = rawurlencode( $url );
						break;
					case 'url-twice':
						$encoded = rawurlencode( rawurlencode( $url ) );
						break;
					default:
						$encoded = (string) wp_json_encode( $url );
				}

				return new WP_Error( 'blocked_by_policy', 'Blocked: ' . $encoded );
			}
		);

		$result = ( new Content_API_Service( new Parsely() ) )->get_post_details( 'https://example.com/a-post/' );

		self::assertInstanceOf( WP_Error::class, $result );
		self::assertSame( $withheld, 'The upstream API request failed.' === $result->get_error_message() );
		$this->assert_secret_absent( $result->get_error_messages() );
	}

	/**
	 * Provides the encodings a filter could apply to the request URL.
	 *
	 * @since 3.24.2
	 *
	 * @return iterable<string, array{0: string, 1: bool}>
	 */
	public static function provide_encoders(): iterable {
		yield 'URL-encoded' => array( 'url', true );
		yield 'URL-encoded twice' => array( 'url-twice', true );
		yield 'JSON-escaped' => array( 'json', false );
	}

	/**
	 * Verifies that a message holding the request headers as JSON omits the API
	 * Secret.
	 *
	 * @since 3.24.2
	 */
	public function test_json_headers_in_message_are_withheld(): void {
		$this->fail_requests_with(
			static function ( array $args ): WP_Error {
				return new WP_Error( 'blocked_by_policy', 'Blocked: ' . wp_json_encode( $args['headers'] ) );
			}
		);

		$result = ( new Suggestions_API_Service( new Parsely() ) )
			->get_check_auth( array( 'auth_scope' => 'suggestions_api' ) );

		self::assertInstanceOf( WP_Error::class, $result );
		$this->assert_secret_absent( $result->get_error_messages() );
	}

	/**
	 * Verifies that an unsuccessful response keeps the upstream message.
	 *
	 * @since 3.24.2
	 */
	public function test_unsuccessful_response_keeps_the_upstream_message(): void {
		add_filter(
			'pre_http_request',
			static function (): array {
				return array(
					'body'     => '{"success":false,"code":403,"message":"Forbidden: secret does not match"}',
					'response' => array( 'code' => 403 ),
				);
			}
		);

		$result = ( new Content_API_Service( new Parsely() ) )->validate_credentials( 'test-siteid.example.com', 'wrong' );

		self::assertInstanceOf( WP_Error::class, $result );
		self::assertSame( 'Forbidden: secret does not match', $result->get_error_message() );
	}

	/**
	 * Makes outbound requests fail with the error that the passed callback
	 * builds.
	 *
	 * @since 3.24.2
	 *
	 * @param callable $build_error Gets the request arguments and URL, and returns the error.
	 */
	private function fail_requests_with( callable $build_error ): void {
		add_filter(
			'pre_http_request',
			static function ( $preempt, array $args, string $url ) use ( $build_error ) {
				return $build_error( $args, $url );
			},
			10,
			3
		);
	}

	/**
	 * Asserts that a value contains neither the API Secret, nor a `secret`
	 * argument, in any encoding up to three layers deep.
	 *
	 * @since 3.24.2
	 *
	 * @param mixed $value The value to inspect.
	 */
	private function assert_secret_absent( $value ): void {
		$serialized = (string) wp_json_encode( $value );

		for ( $i = 0; $i <= 3; $i++ ) {
			self::assertStringNotContainsString( self::API_SECRET, $serialized );
			self::assertDoesNotMatchRegularExpression( '/[?&]secret=/i', $serialized );
			$serialized = str_replace( '\\/', '/', rawurldecode( $serialized ) );
		}
	}
}

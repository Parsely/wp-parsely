<?php
/**
 * Integration Tests: Upstream error messages
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
use Parsely\Services\Content_API\Endpoints\Endpoint_Analytics_Post_Details;
use Parsely\Tests\Integration\TestCase;
use Parsely\Tests\Traits\TestsReflection;
use WP_Error;
use WP_REST_Request;

/**
 * Integration tests for the error messages relayed from the Parse.ly APIs.
 *
 * WordPress includes the full request URL in the error of a blocked request,
 * so relayed messages omit the API Secret.
 *
 * @since 3.24.2
 *
 * @covers \Parsely\Services\Base_Service_Endpoint::request
 * @covers \Parsely\Services\Base_Service_Endpoint::strip_credentials
 */
class UpstreamErrorMessagesTest extends TestCase {
	use TestsReflection;

	/**
	 * The API Secret used by the fixtures. Must be greppable.
	 */
	private const API_SECRET = 'TEST-APISECRET-fixture';

	/**
	 * The Site ID used by the fixtures.
	 */
	private const SITE_ID = 'test-siteid.example.com';

	/**
	 * Sets up the test environment.
	 *
	 * @since 3.24.2
	 */
	public function set_up(): void {
		parent::set_up();

		TestCase::set_options(
			array(
				'apikey'     => self::SITE_ID,
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
	 * Replaces outbound requests with the error WordPress returns when external
	 * HTTP is blocked.
	 *
	 * @since 3.24.2
	 */
	private function block_outbound_requests(): void {
		add_filter(
			'pre_http_request',
			static function ( $preempt, array $args, string $url ) {
				if ( false === strpos( $url, 'parsely.com' ) ) {
					return $preempt;
				}

				return new WP_Error(
					'http_request_not_executed',
					sprintf(
						'User has blocked requests through HTTP to the URL: %s.',
						$url
					)
				);
			},
			10,
			3
		);
	}

	/**
	 * Replaces outbound requests with an upstream error that echoes the API
	 * Secret back.
	 *
	 * The Content API only relays messages from successful responses, hence its
	 * 200 status.
	 *
	 * @since 3.24.2
	 *
	 * @param string $shape Either 'content' or 'suggestions'.
	 */
	private function echo_secret_from_upstream( string $shape ): void {
		add_filter(
			'pre_http_request',
			static function ( $preempt, array $args, string $url ) use ( $shape ) {
				if ( false === strpos( $url, 'parsely.com' ) ) {
					return $preempt;
				}

				$detail = 'Invalid secret ' . self::API_SECRET . ' for this site.';

				if ( 'content' === $shape ) {
					return array(
						'headers'  => array(),
						'cookies'  => array(),
						'filename' => null,
						'body'     => (string) wp_json_encode(
							array(
								'code'    => 403,
								'message' => $detail,
							)
						),
						'response' => array(
							'code'    => 200,
							'message' => 'OK',
						),
					);
				}

				return array(
					'headers'  => array(),
					'cookies'  => array(),
					'filename' => null,
					'body'     => (string) wp_json_encode(
						array(
							'error'  => 'forbidden',
							'detail' => $detail,
						)
					),
					'response' => array(
						'code'    => 403,
						'message' => 'Forbidden',
					),
				);
			},
			10,
			3
		);
	}

	/**
	 * Asserts that a value, however it is shaped, does not contain the secret.
	 *
	 * @since 3.24.2
	 *
	 * @param mixed  $value   The value to inspect.
	 * @param string $context A description used in the failure message.
	 */
	private function assert_secret_absent( $value, string $context ): void {
		$serialized = $value instanceof WP_Error
			? (string) wp_json_encode(
				array(
					'codes'    => $value->get_error_codes(),
					'messages' => $value->get_error_messages(),
					'data'     => $value->get_error_data(),
				)
			)
			: (string) wp_json_encode( $value );

		self::assertStringNotContainsString(
			self::API_SECRET,
			$serialized,
			"The API Secret was included in $context."
		);
	}

	/**
	 * Verifies that the error of a blocked request omits the API Secret, for
	 * the Content API service.
	 *
	 * @since 3.24.2
	 *
	 * @uses \Parsely\Services\Base_API_Service::get_endpoint
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_post_details
	 */
	public function test_blocked_request_error_omits_secret_for_content_api(): void {
		$this->block_outbound_requests();

		$result = ( new Content_API_Service( new Parsely() ) )
			->get_post_details( 'https://example.com/a-post' );

		self::assertInstanceOf( WP_Error::class, $result, 'A blocked request should error.' );
		$this->assert_secret_absent( $result, 'Content_API_Service::get_post_details()' );
		self::assertSame( 'http_request_not_executed', $result->get_error_code() );
		self::assertStringContainsString(
			'User has blocked requests through HTTP',
			$result->get_error_message(),
			'The reason for the failure should be preserved.'
		);
		self::assertStringContainsString(
			self::SITE_ID,
			$result->get_error_message(),
			'The Site ID is public and should be preserved.'
		);
		self::assertStringNotContainsString(
			'secret=',
			$result->get_error_message(),
			'The secret query argument should have been dropped entirely.'
		);
	}

	/**
	 * Verifies that the error of a blocked request omits the API Secret, for
	 * the Suggestions API service.
	 *
	 * This service sends the secret in a header, so this pins it staying out of
	 * the URL.
	 *
	 * @since 3.24.2
	 *
	 * @uses \Parsely\Services\Base_API_Service::get_endpoint
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_title_suggestions
	 */
	public function test_blocked_request_error_omits_secret_for_suggestions_api(): void {
		$this->block_outbound_requests();

		$result = ( new Suggestions_API_Service( new Parsely() ) )
			->get_title_suggestions( 'Some post content', array() );

		self::assertInstanceOf( WP_Error::class, $result, 'A blocked request should error.' );
		$this->assert_secret_absent( $result, 'Suggestions_API_Service::get_title_suggestions()' );
	}

	/**
	 * Verifies that a secret echoed back by the Content API is stripped.
	 *
	 * @since 3.24.2
	 *
	 * @uses \Parsely\Services\Base_API_Service::get_endpoint
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_post_details
	 */
	public function test_upstream_echo_is_stripped_for_content_api(): void {
		$this->echo_secret_from_upstream( 'content' );

		$result = ( new Content_API_Service( new Parsely() ) )
			->get_post_details( 'https://example.com/a-post' );

		self::assertInstanceOf( WP_Error::class, $result );
		$this->assert_secret_absent( $result, 'a relayed Content API error message' );
		self::assertStringContainsString(
			'Invalid secret',
			$result->get_error_message(),
			'The upstream wording should be preserved.'
		);
	}

	/**
	 * Verifies that a secret echoed back by the Suggestions API is stripped.
	 *
	 * @since 3.24.2
	 *
	 * @uses \Parsely\Services\Base_API_Service::get_endpoint
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_title_suggestions
	 */
	public function test_upstream_echo_is_stripped_for_suggestions_api(): void {
		$this->echo_secret_from_upstream( 'suggestions' );

		$result = ( new Suggestions_API_Service( new Parsely() ) )
			->get_title_suggestions( 'Some post content', array() );

		self::assertInstanceOf( WP_Error::class, $result );
		$this->assert_secret_absent( $result, 'a relayed Suggestions API error message' );
		self::assertStringContainsString(
			'Invalid secret',
			$result->get_error_message(),
			'The upstream wording should be preserved.'
		);
	}

	/**
	 * Verifies that the credentials check, which overrides request(), strips
	 * its errors too.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Check_Auth::request
	 * @uses \Parsely\Services\Base_API_Service::get_endpoint
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_check_auth
	 */
	public function test_check_auth_strips_an_echoed_secret(): void {
		add_filter(
			'pre_http_request',
			static function ( $preempt, array $args, string $url ) {
				if ( false === strpos( $url, 'parsely.com' ) ) {
					return $preempt;
				}

				return new WP_Error( 'http_request_failed', 'Rejected secret ' . self::API_SECRET . '.' );
			},
			10,
			3
		);

		$result = ( new Suggestions_API_Service( new Parsely() ) )
			->get_check_auth( array( 'auth_scope' => 'suggestions_api' ) );

		self::assertInstanceOf( WP_Error::class, $result );
		$this->assert_secret_absent( $result, 'the credentials check' );
	}

	/**
	 * Provides the Stats endpoint's route suffixes.
	 *
	 * @since 3.24.2
	 *
	 * @return array<string, array{string}> The route suffix.
	 */
	public function data_routes(): array {
		return array(
			'details'   => array( 'details' ),
			'referrers' => array( 'referrers' ),
			'related'   => array( 'related' ),
		);
	}

	/**
	 * Verifies that a REST response for a blocked request omits the API
	 * Secret, for a caller with access to the post.
	 *
	 * The caller owns the post, so the route's permission checks pass.
	 *
	 * @since 3.24.2
	 *
	 * @dataProvider data_routes
	 *
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 *
	 * @param string $suffix The route suffix.
	 */
	public function test_rest_response_omits_secret( string $suffix ): void {
		( new REST_API_Controller( new Parsely() ) )->init();
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'rest_api_init' );

		$this->block_outbound_requests();

		$author_id = TestCase::create_test_user( 'stats_author', 'author' );

		/** @var int $own_post_id */
		$own_post_id = self::factory()->post->create(
			array(
				'post_author' => $author_id,
				'post_status' => 'publish',
			)
		);

		wp_set_current_user( $author_id );

		$response = rest_get_server()->dispatch(
			new WP_REST_Request( 'GET', "/wp-parsely/v2/stats/post/$own_post_id/$suffix" )
		);

		$this->assert_secret_absent( $response->get_data(), "the $suffix route's response" );
	}

	/**
	 * Provides the Stats routes that take no post ID, with the caller's role.
	 *
	 * @since 3.24.2
	 *
	 * @return array<string, array{string, array<string, string>, string|null}> The route, query and role.
	 */
	public function data_routes_without_post_id(): array {
		return array(
			'related, logged out' => array( '/wp-parsely/v2/stats/related', array( 'url' => 'https://example.com/a-post' ), null ),
			'posts, author'       => array( '/wp-parsely/v2/stats/posts', array(), 'author' ),
		);
	}

	/**
	 * Verifies that the Stats routes that take no post ID omit the API Secret
	 * from the error of a blocked request.
	 *
	 * @since 3.24.2
	 *
	 * @dataProvider data_routes_without_post_id
	 *
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 *
	 * @param string                $route The route.
	 * @param array<string, string> $query The query parameters.
	 * @param string|null           $role  The caller's role, or null when logged out.
	 */
	public function test_route_without_post_id_omits_secret(
		string $route,
		array $query,
		?string $role
	): void {
		( new REST_API_Controller( new Parsely() ) )->init();
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'rest_api_init' );

		$this->block_outbound_requests();

		wp_set_current_user( null === $role ? 0 : TestCase::create_test_user( "stats_$role", $role ) );

		$request = new WP_REST_Request( 'GET', $route );
		$request->set_query_params( $query );

		/** @var array{code: string} $data */
		$data = rest_get_server()->dispatch( $request )->get_data();

		// Proves the upstream request was attempted.
		self::assertSame( 'http_request_not_executed', $data['code'] );
		$this->assert_secret_absent( $data, "the $route route's response" );
	}

	/**
	 * Provides messages containing the secret in awkward positions, with the
	 * expected result.
	 *
	 * As add_query_arg() drops a trailing "=" from a value, the last case
	 * can't be found by searching for the secret's literal text. A trailing value
	 * takes adjacent punctuation with it, erring on the side of removing more.
	 *
	 * @since 3.24.2
	 *
	 * @return array<string, array{string, string}> The message and expectation.
	 */
	public function data_messages(): array {
		$base = 'https://api.parsely.com/v2/analytics/post/detail';

		return array(
			'secret is the only argument'  => array(
				"Blocked: $base?secret=s3cr3t.",
				"Blocked: $base",
			),
			'secret is the last argument'  => array(
				"Blocked: $base?url=x&apikey=site.example.com&secret=s3cr3t.",
				"Blocked: $base?url=x&apikey=site.example.com",
			),
			'secret is the first argument' => array(
				"Blocked: $base?secret=s3cr3t&url=x.",
				"Blocked: $base?url=x.",
			),
			'secret is in the middle'      => array(
				"Blocked: $base?url=x&secret=s3cr3t&apikey=site.example.com.",
				"Blocked: $base?url=x&apikey=site.example.com.",
			),
			'no secret present'            => array(
				"Blocked: $base?url=x.",
				"Blocked: $base?url=x.",
			),
			'value with a dropped equals'  => array(
				"Blocked: $base?url=x&secret=Zm9vYmFy+/.",
				"Blocked: $base?url=x",
			),
		);
	}

	/**
	 * Verifies that the secret query argument is dropped wherever it sits, and
	 * that the rest of the message is left alone.
	 *
	 * @since 3.24.2
	 *
	 * @dataProvider data_messages
	 *
	 * @covers \Parsely\Services\Base_Service_Endpoint::strip_credentials
	 *
	 * @param string $message  The message to strip.
	 * @param string $expected The expected result.
	 */
	public function test_strip_credentials_drops_the_secret_argument(
		string $message,
		string $expected
	): void {
		$endpoint = new Endpoint_Analytics_Post_Details(
			( new Parsely() )->get_content_api()
		);

		$method = self::get_method( 'strip_credentials', Endpoint_Analytics_Post_Details::class );

		self::assertSame( $expected, $method->invoke( $endpoint, $message ) );
	}

	/**
	 * Verifies that a secret appearing outside a query string is still removed.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\Services\Base_Service_Endpoint::strip_credentials
	 */
	public function test_strip_credentials_removes_a_bare_secret(): void {
		$endpoint = new Endpoint_Analytics_Post_Details(
			( new Parsely() )->get_content_api()
		);

		$method = self::get_method( 'strip_credentials', Endpoint_Analytics_Post_Details::class );
		$result = $method->invoke( $endpoint, 'Auth failed for ' . self::API_SECRET . ' today.' );

		self::assertIsString( $result );
		self::assertStringNotContainsString( self::API_SECRET, $result );
	}

	/**
	 * Verifies that the credentials validation endpoint omits the secret from
	 * its errors.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\Services\Content_API\Endpoints\Endpoint_Validate::process_response
	 * @uses \Parsely\Services\Base_API_Service::get_endpoint
	 * @uses \Parsely\Services\Content_API\Content_API_Service::validate_credentials
	 */
	public function test_validate_endpoint_error_omits_secret(): void {
		$this->block_outbound_requests();

		$result = ( new Content_API_Service( new Parsely() ) )
			->validate_credentials( self::SITE_ID, self::API_SECRET );

		self::assertInstanceOf( WP_Error::class, $result );
		$this->assert_secret_absent( $result, 'Content_API_Service::validate_credentials()' );
	}

	/**
	 * Verifies that the validation endpoint's own error message, built from a
	 * successful upstream body, is stripped too.
	 *
	 * @since 3.24.2
	 *
	 * @uses \Parsely\Services\Base_API_Service::get_endpoint
	 * @uses \Parsely\Services\Content_API\Content_API_Service::validate_credentials
	 */
	public function test_validate_endpoint_strips_an_echoed_secret(): void {
		add_filter(
			'pre_http_request',
			static function ( $preempt, array $args, string $url ) {
				if ( false === strpos( $url, 'parsely.com' ) ) {
					return $preempt;
				}

				return array(
					'headers'  => array(),
					'cookies'  => array(),
					'filename' => null,
					'body'     => (string) wp_json_encode(
						array(
							'success' => false,
							'code'    => 403,
							'message' => 'Bad secret ' . self::API_SECRET . ' supplied.',
						)
					),
					'response' => array(
						'code'    => 200,
						'message' => 'OK',
					),
				);
			},
			10,
			3
		);

		$result = ( new Content_API_Service( new Parsely() ) )
			->validate_credentials( self::SITE_ID, self::API_SECRET );

		self::assertInstanceOf( WP_Error::class, $result );
		$this->assert_secret_absent( $result, "the validation endpoint's relayed message" );
	}

	/**
	 * Verifies that an error holding several codes and messages has all of them
	 * stripped, not just the first.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\Services\Base_Service_Endpoint::strip_credentials_from_error
	 */
	public function test_every_message_of_an_error_is_stripped(): void {
		$endpoint = new Endpoint_Analytics_Post_Details(
			( new Parsely() )->get_content_api()
		);

		$error = new WP_Error( 'first', 'Failed for ' . self::API_SECRET, array( 'status' => 500 ) );
		$error->add( 'second', 'Also failed for ' . self::API_SECRET );
		$error->add( 'first', 'And again for ' . self::API_SECRET );

		$method = self::get_method(
			'strip_credentials_from_error',
			Endpoint_Analytics_Post_Details::class
		);

		/** @var WP_Error $stripped */
		$stripped = $method->invoke( $endpoint, $error );

		self::assertSame( array( 'first', 'second' ), $stripped->get_error_codes() );
		self::assertCount( 2, $stripped->get_error_messages( 'first' ) );
		$this->assert_secret_absent( $stripped, 'a multi-message error' );
		self::assertSame(
			array( 'status' => 500 ),
			$stripped->get_error_data( 'first' ),
			'The error data should be preserved.'
		);
	}
}

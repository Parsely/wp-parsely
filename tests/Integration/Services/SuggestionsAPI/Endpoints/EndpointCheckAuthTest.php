<?php
/**
 * Integration Tests: Suggestions API check-auth endpoint
 *
 * @package Parsely
 * @since   3.24.3
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Services\SuggestionsAPI\Endpoints;

use Parsely\Parsely;
use Parsely\Services\Suggestions_API\Suggestions_API_Service;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration tests for the Suggestions API check-auth endpoint.
 *
 * @since 3.24.3
 *
 * @covers \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Check_Auth::get_request_options
 * @uses \Parsely\Services\Base_API_Service::get_endpoint
 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_check_auth
 */
final class EndpointCheckAuthTest extends TestCase {
	/**
	 * Verifies that the request is sent with an empty body.
	 *
	 * @since 3.24.3
	 */
	public function test_request_has_an_empty_body(): void {
		TestCase::set_options(
			array(
				'apikey'     => 'test-siteid.example.com',
				'api_secret' => 'test-apisecret',
			)
		);

		$request_args = null;
		add_filter(
			'pre_http_request',
			static function ( $preempt, array $args, string $url ) use ( &$request_args ) {
				if ( false === strpos( $url, '/check-auth' ) ) {
					return $preempt;
				}

				$request_args = $args;

				return array(
					'headers'  => array(),
					'body'     => '{}',
					'response' => array(
						'code'    => 200,
						'message' => 'OK',
					),
					'cookies'  => array(),
					'filename' => null,
				);
			},
			10,
			3
		);

		( new Suggestions_API_Service( new Parsely() ) )
			->get_check_auth( array( 'auth_scope' => 'suggestions_api' ) );

		self::assertIsArray( $request_args, 'The request should have been sent.' );
		self::assertSame( 'GET', $request_args['method'] );
		self::assertSame( array(), $request_args['body'] );
	}
}

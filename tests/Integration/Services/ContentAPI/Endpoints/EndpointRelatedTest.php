<?php
/**
 * Parse.ly Content API Endpoint Test: Related
 *
 * @package Parsely
 * @since   3.17.0
 */

declare( strict_types=1 );

namespace Parsely\Tests\Integration\Services\ContentAPI\Endpoints;

use Parsely\Services\Base_Service_Endpoint;
use Parsely\Services\Content_API\Content_API_Service;

/**
 * Tests the /related endpoint.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\Services\Content_API\Endpoints\Endpoint_Related
 */
class EndpointRelatedTest extends ContentAPIBaseEndpointTestCase {
	/**
	 * Returns the endpoint for the API request.
	 *
	 * @since 3.17.0
	 *
	 * @return Base_Service_Endpoint
	 */
	public function get_service_endpoint(): Base_Service_Endpoint {
		return $this->get_content_api()->get_endpoint( '/related' );
	}

	/**
	 * Provides data for test_api_url().
	 *
	 * @return \ArrayIterator<string, mixed>
	 */
	public function data_api_url(): iterable {
		yield 'Basic (Expected data)' => array(
			array(
				'limit' => 5,
			),
			Content_API_Service::get_base_url() . '/related?limit=5&apikey=my-key',
		);
		yield 'published_within value of 0' => array(
			array(
				'apikey' => 'my-key',
				'sort'   => 'score',
				'limit'  => 5,
			),
			Content_API_Service::get_base_url() . '/related?apikey=my-key&sort=score&limit=5',
		);
	}

	/**
	 * Verifies that the query arguments include the API key but not the API
	 * Secret.
	 *
	 * @since 3.24.2
	 */
	public function test_api_authentication(): void {
		self::set_options(
			array(
				'apikey'     => 'my-key',
				'api_secret' => 'my-secret',
			)
		);

		$endpoint   = $this->get_service_endpoint();
		$query_args = self::get_method( 'get_query_args', $endpoint )->invoke( $endpoint );

		self::assertIsArray( $query_args );
		self::assertSame( 'my-key', $query_args['apikey'] ?? null );
		self::assertArrayNotHasKey( 'secret', $query_args );
	}

	/**
	 * Verifies that the upstream request sends the API key without the API
	 * Secret, and uses a 5-second timeout.
	 *
	 * @since 3.24.2
	 */
	public function test_request_omits_api_secret_and_uses_short_timeout(): void {
		self::set_options(
			array(
				'apikey'     => 'my-key',
				'api_secret' => 'my-secret',
			)
		);

		$request = $this->capture_request(
			function (): void {
				$this->get_content_api()->get_related_posts_with_url( 'https://example.com/a-post' );
			}
		);

		self::assertSame( 'my-key', $request['query']['apikey'] ?? null );
		self::assertArrayNotHasKey( 'secret', $request['query'] );
		self::assertSame( 5, $request['args']['timeout'] ?? null );
	}

	/**
	 * Verifies that other Content API endpoints still send the API Secret and
	 * use the default timeout.
	 *
	 * @since 3.24.2
	 */
	public function test_other_endpoints_still_send_api_secret_with_default_timeout(): void {
		self::set_options(
			array(
				'apikey'     => 'my-key',
				'api_secret' => 'my-secret',
			)
		);

		$request = $this->capture_request(
			function (): void {
				$this->get_content_api()->get_post_details( 'https://example.com/a-post' );
			}
		);

		self::assertSame( 'my-key', $request['query']['apikey'] ?? null );
		self::assertSame( 'my-secret', $request['query']['secret'] ?? null );
		self::assertSame( 60, $request['args']['timeout'] ?? null );
	}

	/**
	 * Runs the callback and returns the query parameters and arguments of the
	 * upstream request that it sends.
	 *
	 * @since 3.24.2
	 *
	 * @param callable $callback The callback that sends the request.
	 * @return array{query: array<mixed>, args: array<mixed>} The request's query parameters and arguments.
	 */
	private function capture_request( callable $callback ): array {
		$request = array(
			'query' => array(),
			'args'  => array(),
		);

		add_filter(
			'pre_http_request',
			function ( bool $preempt, array $args, string $url ) use ( &$request ): array {
				parse_str( (string) wp_parse_url( $url, PHP_URL_QUERY ), $query );
				$request = array(
					'query' => $query,
					'args'  => $args,
				);

				return array( 'body' => '{"data":[]}' );
			},
			10,
			3
		);

		$callback();

		return $request;
	}
}

<?php
/**
 * Integration Tests: Query argument encoding
 *
 * @package Parsely
 * @since   3.24.2
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Services;

use Parsely\Parsely;
use Parsely\Services\Content_API\Content_API_Service;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration tests for the encoding of query argument values in upstream
 * requests.
 *
 * @since 3.24.2
 *
 * @covers \Parsely\Services\Base_Service_Endpoint::get_endpoint_url
 */
class QueryArgumentEncodingTest extends TestCase {
	/**
	 * The URLs of the upstream requests.
	 *
	 * @var array<int, string>
	 */
	private $upstream_urls = array();

	/**
	 * Sets up the test environment.
	 *
	 * @since 3.24.2
	 */
	public function set_up(): void {
		parent::set_up();

		TestCase::set_options(
			array(
				'apikey'     => 'example.com',
				'api_secret' => 'the-secret',
			)
		);

		$this->upstream_urls = array();
		add_filter(
			'pre_http_request',
			function ( $preempt, array $args, string $url ): array {
				$this->upstream_urls[] = $url;

				return array(
					'body'     => '{"data":[],"success":true}',
					'response' => array( 'code' => 200 ),
				);
			},
			10,
			3
		);
	}

	/**
	 * Verifies that values containing query syntax are sent verbatim, rather
	 * than adding or truncating arguments.
	 *
	 * @since 3.24.2
	 */
	public function test_related_values_with_query_syntax_are_sent_verbatim(): void {
		$api = new Content_API_Service( new Parsely() );
		$url = 'https://example.com/a-post/?x=1&y=2#comments';

		$api->get_related_posts_with_url(
			$url,
			array(
				'author' => 'Smith & Jones',
				'tag'    => 'x+y',
			)
		);

		$query = $this->get_upstream_query();

		self::assertSame( $url, $query['url'] );
		self::assertSame( 'Smith & Jones', $query['author'] );
		self::assertSame( 'x+y', $query['tag'] );
		self::assertSame( 'example.com', $query['apikey'] );
	}

	/**
	 * Verifies that credentials being validated are sent verbatim.
	 *
	 * @since 3.24.2
	 */
	public function test_validated_credentials_are_sent_verbatim(): void {
		$api = new Content_API_Service( new Parsely() );

		$api->validate_credentials( 'example.com', 'a+b/c=d&e#f' );

		$query = $this->get_upstream_query();

		self::assertSame( 'example.com', $query['apikey'] );
		self::assertSame( 'a+b/c=d&e#f', $query['secret'] );
	}

	/**
	 * Verifies that an already-encoded value, such as a non-Latin permalink,
	 * reaches the API decoded, as it did before the values were encoded.
	 *
	 * @since 3.24.2
	 */
	public function test_encoded_values_reach_the_api_decoded(): void {
		$api = new Content_API_Service( new Parsely() );

		$api->get_related_posts_with_url( 'https://example.com/%d0%bf%d1%80%d0%b8%d0%b2%d0%b5%d1%82/' );

		self::assertSame( 'https://example.com/привет/', $this->get_upstream_query()['url'] );
	}

	/**
	 * Returns the decoded query arguments of the only upstream request.
	 *
	 * @since 3.24.2
	 *
	 * @return array<string, mixed> The query arguments.
	 */
	private function get_upstream_query(): array {
		self::assertCount( 1, $this->upstream_urls );

		parse_str( (string) wp_parse_url( $this->upstream_urls[0], PHP_URL_QUERY ), $query );

		/** @var array<string, mixed> $query */
		return $query;
	}
}

<?php
/**
 * Integration Tests: Parse.ly hosts allowed for remote requests
 *
 * @package Parsely
 * @since   3.24.2
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;

/**
 * Integration tests for the Parse.ly hosts that remote requests can reach.
 *
 * @since 3.24.2
 *
 * @covers \Parsely\Parsely::allow_parsely_remote_requests
 * @uses \Parsely\Parsely::__construct
 * @uses \Parsely\Parsely::are_credentials_managed
 * @uses \Parsely\Parsely::set_managed_options
 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
 */
final class RemoteRequestHostsTest extends TestCase {
	/**
	 * Provides request URLs, and whether their host should be allowed.
	 *
	 * @since 3.24.2
	 *
	 * @return iterable<string, array{string, bool}>
	 */
	public static function provide_urls(): iterable {
		yield 'Content API' => array( 'https://api.parsely.com/v2/related', true );
		yield 'Suggestions API' => array( 'https://suggestions-api.parsely.com/suggest-headline', true );
		yield 'Dashboard' => array( 'https://dash.parsely.com/api/v1/metadata', true );
		yield 'Uppercase host' => array( 'https://API.PARSELY.COM/v2/related', true );
		yield 'Longer host' => array( 'https://dash.parsely.com.example.org/', false );
		yield 'HTTP' => array( 'http://api.parsely.com/v2/related', false );
		yield 'Other host' => array( 'https://other.example/', false );
	}

	/**
	 * Verifies that only the Parse.ly hosts, over HTTPS, are allowed.
	 *
	 * @since 3.24.2
	 *
	 * @dataProvider provide_urls
	 *
	 * @param string $url     The request URL.
	 * @param bool   $allowed Whether the host should be allowed.
	 */
	public function test_only_parsely_hosts_are_allowed( string $url, bool $allowed ): void {
		new Parsely();

		$host = (string) wp_parse_url( $url, PHP_URL_HOST );

		self::assertSame(
			$allowed,
			apply_filters( 'http_request_host_is_external', false, $host, $url ) // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		);
	}
}

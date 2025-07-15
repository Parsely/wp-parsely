<?php
/**
 * Integration Tests: Canonical URLs.
 *
 * @package Parsely\Tests
 * @since   3.20.5
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Endpoints;

use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration Tests for canonical URLs.
 *
 * @since 3.20.5
 */
final class CanonicalURLsTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var string $original_permalink_structure Holds the original permalink structure value.
	 */
	private static $original_permalink_structure;

	/**
	 * Runs once before all tests.
	 *
	 * @since 3.20.5
	 */
	public static function set_up_before_class(): void {
		parent::set_up_before_class();
		/** @phpstan-ignore-next-line */
		self::$original_permalink_structure = get_option( 'permalink_structure' );
	}

	/**
	 * Setup method called before each test.
	 *
	 * @since 3.20.5
	 */
	public function set_up(): void {
		parent::set_up();
		self::set_permalink_structure( '/%postname%/' );
		self::set_options( array( 'apikey' => 'site.id' ) );
	}

	/**
	 * Teardown method called after each test.
	 *
	 * @since 3.20.5
	 */
	public function tear_down(): void {
		parent::tear_down();
		self::set_permalink_structure( self::$original_permalink_structure );
	}

	/**
	 * Verifies that get_canonical_url() uses the Site ID as the domain when the
	 * wp_parsely_canonical_url_domain filter is not set.
	 *
	 * @since 3.20.5
	 *
	 * @covers \Parsely\Parsely::get_canonical_url
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_get_canonical_url_returns_site_id(): void {
		$post_id = self::factory()->post->create( array( 'post_title' => 'Test Post' ) );

		$canonical_url = Parsely::get_canonical_url( (string) $this->get_permalink( $post_id ) );
		self::assertSame( 'http://site.id/test-post/', $canonical_url );
	}

	/**
	 * Verifies that get_canonical_url() uses the wp_parsely_canonical_url_domain
	 * filter value as the domain when it has been set.
	 *
	 * @since 3.20.5
	 *
	 * @covers \Parsely\Parsely::get_canonical_url
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 *
	 * @dataProvider data_canonical_urls
	 *
	 * @param string $canonical_url The canonical URL to be used in the test.
	 * @param string $expected_canonical_url The expected URL resulting from get_canonical_url().
	 */
	public function test_get_canonical_url_returns_canonical_domain(
		string $canonical_url,
		string $expected_canonical_url
	): void {
		$post_id = self::factory()->post->create( array( 'post_title' => 'Test Post' ) );

		add_filter(
			'wp_parsely_canonical_url_domain',
			$callback_function = function () use ( $canonical_url ) {
				return $canonical_url;
			}
		);

		$actual_url = Parsely::get_canonical_url( (string) $this->get_permalink( $post_id ) );
		self::assertSame( "$expected_canonical_url/test-post/", $actual_url );

		remove_filter( 'wp_parsely_canonical_url_domain', $callback_function );
	}

	/**
	 * Verifies that get_canonical_url_from_post() returns the correct canonical
	 * URL under different conditions.
	 *
	 * @since 3.20.5
	 *
	 * @covers \Parsely\Parsely::get_canonical_url_from_post
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_canonical_url
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 *
	 * @dataProvider data_canonical_urls
	 *
	 * @param string $canonical_url The canonical URL to be used in the test.
	 * @param string $expected_canonical_url The expected URL resulting from get_canonical_url().
	 */
	public function test_get_canonical_url_from_post_returns_canonical_domain(
		string $canonical_url,
		string $expected_canonical_url
	): void {
		/** @var int $post_id */
		$post_id = self::factory()->post->create( array( 'post_title' => 'Test Post' ) );

		add_filter(
			'wp_parsely_canonical_url_domain',
			$callback_function = function () use ( $canonical_url ) {
				return $canonical_url;
			}
		);

		// Post doesn't have a stored canonical URL.
		$actual_url = Parsely::get_canonical_url_from_post( $post_id );
		self::assertSame( "$expected_canonical_url/test-post/", $actual_url );

		// Post has a stored canonical URL that's incorrect. A correct URL
		// should be returned instead.
		add_post_meta( $post_id, '_parsely_canonical_url', 'http://incorrect-url.com/test-post/' );
		$actual_url = Parsely::get_canonical_url_from_post( $post_id );
		self::assertSame( "$expected_canonical_url/test-post/", $actual_url );

		remove_filter( 'wp_parsely_canonical_url_domain', $callback_function );
	}

	/**
	 * Verifies that set_canonical_url() stores canonical URLs as expected.
	 *
	 * @covers \Parsely\Parsely::set_canonical_url
	 * @uses \Parsely\Parsely::get_canonical_url
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 *
	 * @dataProvider data_canonical_urls
	 *
	 * @param string $canonical_url The canonical URL to be used in the test.
	 * @param string $expected_canonical_url The expected URL resulting from get_canonical_url().
	 */
	public function test_set_canonical_url(
		string $canonical_url,
		string $expected_canonical_url
	): void {
		/** @var int $post_id */
		$post_id = self::factory()->post->create( array( 'post_title' => 'Test Post' ) );

		add_filter(
			'wp_parsely_canonical_url_domain',
			$callback_function = function () use ( $canonical_url ) {
				return $canonical_url;
			}
		);

		// Set a canonical URL which should get overridden by the expected
		// canonical URL.
		Parsely::set_canonical_url( $post_id, 'http://incorrect-url.com/test-post/' );

		// Verify that the URL which got stored is the expected canonical.
		$stored_canonical_url = get_post_meta( $post_id, '_parsely_canonical_url', true );
		self::assertSame( "$expected_canonical_url/test-post/", $stored_canonical_url );

		remove_filter( 'wp_parsely_canonical_url_domain', $callback_function );
		delete_post_meta( $post_id, '_parsely_canonical_url' );
	}

	/**
	 * Provides data for canonical URLs tests.
	 *
	 * @return iterable<string, array<string>>
	 */
	public function data_canonical_urls(): iterable {
		yield 'domain.com' => array(
			'domain.com',
			'http://domain.com',
		);
		yield 'http://domain.com' => array(
			'http://domain.com',
			'http://domain.com',
		);
		yield 'https://domain.com' => array(
			'https://domain.com',
			'http://domain.com',
		);
		yield ' http://domain.com/' => array(
			' http://domain.com/',
			'http://domain.com',
		);
		yield 'http://domain.com/ ' => array(
			'http://domain.com/ ',
			'http://domain.com',
		);
		yield 'domain.com/test-dir' => array(
			'domain.com/test-dir',
			'http://domain.com/test-dir',
		);
		yield 'http://domain.com/test-dir' => array(
			'http://domain.com/test-dir',
			'http://domain.com/test-dir',
		);
		yield 'http://domain.com/test-dir/' => array(
			'http://domain.com/test-dir/',
			'http://domain.com/test-dir',
		);
		yield 'http://domain.com/test-dir//' => array(
			'http://domain.com/test-dir//',
			'http://domain.com/test-dir',
		);
		yield 'subdomain.domain.com' => array(
			'subdomain.domain.com',
			'http://subdomain.domain.com',
		);
		yield 'http://subdomain.domain.com' => array(
			'http://subdomain.domain.com',
			'http://subdomain.domain.com',
		);
		yield 'http://subdomain.domain.com/test-dir/' => array(
			'http://subdomain.domain.com/test-dir/',
			'http://subdomain.domain.com/test-dir',
		);
	}
}

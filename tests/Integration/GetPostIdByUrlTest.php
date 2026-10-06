<?php
/**
 * Integration Tests: URL to post ID resolution
 *
 * @package Parsely
 * @since   3.24.2
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Utils\Utils;

/**
 * Integration tests for Utils::get_post_id_by_url().
 *
 * Resolved IDs are used to store canonical URLs and to return post data (Smart
 * Links, stats), so a URL resolves only to posts its caller can see, and by
 * slug only on this site's URLs.
 *
 * @since 3.24.2
 *
 * @covers \Parsely\Utils\Utils::get_post_id_by_url
 * @covers \Parsely\Utils\Utils::get_top_level_post_ids_by_slug
 * @covers \Parsely\Utils\Utils::get_visible_post_id
 * @covers \Parsely\Utils\Utils::is_site_url
 * @covers \Parsely\Utils\Utils::strip_www
 */
class GetPostIdByUrlTest extends TestCase {
	/**
	 * An Administrator's published post.
	 *
	 * @var int
	 */
	private $published;

	/**
	 * An Administrator's private post.
	 *
	 * @var int
	 */
	private $private;

	/**
	 * An Author.
	 *
	 * @var int
	 */
	private $author;

	/**
	 * An Editor.
	 *
	 * @var int
	 */
	private $editor;

	/**
	 * Sets up the test environment.
	 *
	 * @since 3.24.2
	 */
	public function set_up(): void {
		parent::set_up();
		wp_cache_flush();

		// Slug URLs then reach the slug matching, rather than url_to_postid().
		$this->set_permalink_structure( '' );

		TestCase::set_options( array( 'apikey' => 'siteid.example' ) );

		/** @var int $admin */
		$admin = self::factory()->user->create( array( 'role' => 'administrator' ) );
		/** @var int $author */
		$author = self::factory()->user->create( array( 'role' => 'author' ) );
		/** @var int $editor */
		$editor = self::factory()->user->create( array( 'role' => 'editor' ) );

		$this->author    = $author;
		$this->editor    = $editor;
		$this->published = $this->create_post( 'zz-published', 'publish', $admin );
		$this->private   = $this->create_post( 'zz-private', 'private', $admin );
	}

	/**
	 * Verifies that IDs from `?p=` URLs resolve for posts the user can see.
	 *
	 * @since 3.24.2
	 */
	public function test_id_url_of_a_visible_post_resolves(): void {
		wp_set_current_user( $this->author );

		self::assertSame( $this->published, Utils::get_post_id_by_url( home_url( '/?p=' . $this->published ) ) );
	}

	/**
	 * Verifies that IDs from `?p=` URLs don't resolve for posts the user can't
	 * read, nor for posts that don't exist.
	 *
	 * @since 3.24.2
	 */
	public function test_id_url_of_a_hidden_or_missing_post_does_not_resolve(): void {
		$draft = $this->create_post( 'zz-draft', 'draft', $this->editor );

		wp_set_current_user( $this->author );

		self::assertSame( 0, Utils::get_post_id_by_url( home_url( '/?p=' . $this->private ) ) );
		self::assertSame( 0, Utils::get_post_id_by_url( home_url( '/?p=' . $draft ) ) );
		self::assertSame( 0, Utils::get_post_id_by_url( home_url( '/?p=999999' ) ) );
	}

	/**
	 * Verifies that users who can read a non-public post still resolve it,
	 * and that a cached resolution is re-checked for every user.
	 *
	 * @since 3.24.2
	 */
	public function test_cached_resolution_is_checked_per_user(): void {
		$url = home_url( '/?p=' . $this->private );

		wp_set_current_user( $this->editor );
		self::assertSame( $this->private, Utils::get_post_id_by_url( $url ) );

		wp_set_current_user( $this->author );
		self::assertSame( 0, Utils::get_post_id_by_url( $url ) );
	}

	/**
	 * Verifies that the slug of another site's URL doesn't resolve.
	 *
	 * @since 3.24.2
	 */
	public function test_slug_of_a_foreign_url_does_not_resolve(): void {
		wp_set_current_user( $this->author );

		self::assertSame( 0, Utils::get_post_id_by_url( 'https://other.example/zz-published/' ) );
		self::assertSame( 0, Utils::get_post_id_by_url( '//other.example/zz-published/' ) );
	}

	/**
	 * Verifies that slugs resolve on the URLs of this site, including the ones
	 * of the Site ID and the canonical URL domains.
	 *
	 * @since 3.24.2
	 */
	public function test_slug_of_a_site_url_resolves(): void {
		wp_set_current_user( $this->author );

		self::assertSame( $this->published, Utils::get_post_id_by_url( home_url( '/zz-published/' ) ) );
		self::assertSame( $this->published, Utils::get_post_id_by_url( '/zz-published/' ) );
		self::assertSame( $this->published, Utils::get_post_id_by_url( 'https://www.siteid.example/zz-published/?utm_source=x' ) );

		add_filter(
			'wp_parsely_canonical_url_domain',
			static function (): string {
				return 'https://canonical.example/';
			}
		);
		self::assertSame( $this->published, Utils::get_post_id_by_url( 'https://canonical.example/zz-published/' ) );
	}

	/**
	 * Verifies that a slug matching only a non-public post resolves for the
	 * users who can read that post, and for them only.
	 *
	 * @since 3.24.2
	 */
	public function test_slug_of_a_non_public_post_resolves_only_for_its_readers(): void {
		$url = home_url( '/zz-private/' );

		wp_set_current_user( $this->editor );
		self::assertSame( $this->private, Utils::get_post_id_by_url( $url ) );

		wp_set_current_user( $this->author );
		self::assertSame( 0, Utils::get_post_id_by_url( $url ) );
	}

	/**
	 * Verifies that a published post takes precedence over a draft with the
	 * same slug.
	 *
	 * @since 3.24.2
	 */
	public function test_slug_shared_with_a_draft_resolves_to_the_published_post(): void {
		$this->create_post( 'zz-published', 'draft', $this->author );

		wp_set_current_user( $this->author );

		self::assertSame( $this->published, Utils::get_post_id_by_url( home_url( '/zz-published/' ) ) );
	}

	/**
	 * Verifies that a slug shared by several public posts resolves to none.
	 *
	 * @since 3.24.2
	 */
	public function test_ambiguous_slug_does_not_resolve(): void {
		$this->create_post( 'zz-published', 'publish', $this->editor, 'page' );

		wp_set_current_user( $this->author );

		self::assertSame( 0, Utils::get_post_id_by_url( home_url( '/zz-published/' ) ) );
	}

	/**
	 * Creates a post.
	 *
	 * @since 3.24.2
	 *
	 * @param string $slug   The post slug.
	 * @param string $status The post status.
	 * @param int    $author The post author.
	 * @param string $type   The post type.
	 * @return int The post ID.
	 */
	private function create_post( string $slug, string $status, int $author, string $type = 'post' ): int {
		/** @var int $post_id */
		$post_id = self::factory()->post->create(
			array(
				'post_name'   => $slug,
				'post_status' => $status,
				'post_author' => $author,
				'post_type'   => $type,
			)
		);

		return $post_id;
	}
}

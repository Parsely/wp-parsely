<?php
/**
 * Integration Tests: Smart Link model
 *
 * @package Parsely
 * @since   3.26.1
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Models;

use Parsely\Content_Helper\Editor_Sidebar;
use Parsely\Content_Helper\Editor_Sidebar\Smart_Linking;
use Parsely\Models\Smart_Link;
use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration tests for the Smart_Link model.
 *
 * @since 3.26.1
 *
 * @covers \Parsely\Models\Smart_Link
 */
final class SmartLinkTest extends TestCase {
	/**
	 * Sets up the test environment.
	 *
	 * @since 3.26.1
	 */
	public function set_up(): void {
		parent::set_up();

		// Register the parsely_smart_link post type and its taxonomies, which
		// the Smart Link models persist to.
		( new Smart_Linking( new Editor_Sidebar( new Parsely() ) ) )->run();
	}

	/**
	 * Verifies that looking up a UID doesn't find another post's Smart Link,
	 * even when that post's lookup of the UID is cached.
	 *
	 * @since 3.26.1
	 */
	public function test_get_smart_link_does_not_find_other_posts_smart_links(): void {
		$post_id       = $this->create_test_post();
		$other_post_id = $this->create_test_post();
		$uid           = $this->save_smart_link( $post_id );

		self::assertTrue(
			Smart_Link::get_smart_link( $uid, $post_id )->exists(),
			'Fixture is wrong: the Smart Link should be found.'
		);

		$smart_link = Smart_Link::get_smart_link( $uid, $other_post_id );

		self::assertFalse( $smart_link->exists() );
		self::assertSame( $other_post_id, $smart_link->source_post_id );
	}

	/**
	 * Verifies that posts whose Smart Links share a UID each find their own,
	 * even when one post's lookup of the UID is cached.
	 *
	 * @since 3.26.1
	 */
	public function test_get_smart_link_finds_the_posts_own_smart_link(): void {
		$post_id       = $this->create_test_post();
		$other_post_id = $this->create_test_post();
		$uid           = $this->save_smart_link( $post_id );

		self::assertSame(
			$uid,
			$this->save_smart_link( $other_post_id, $uid ),
			'Fixture is wrong: the UIDs should match.'
		);

		$smart_link = Smart_Link::get_smart_link( $uid, $post_id );

		self::assertTrue( $smart_link->exists(), 'Fixture is wrong: the Smart Link should be found.' );
		self::assertSame( $post_id, $smart_link->source_post_id );

		$other_smart_link = Smart_Link::get_smart_link( $uid, $other_post_id );

		self::assertTrue( $other_smart_link->exists() );
		self::assertSame( $other_post_id, $other_smart_link->source_post_id );
	}

	/**
	 * Verifies that a deleted Smart Link isn't found, even when its lookup was
	 * cached.
	 *
	 * @since 3.26.1
	 */
	public function test_get_smart_link_does_not_find_deleted_smart_links(): void {
		$post_id    = $this->create_test_post();
		$uid        = $this->save_smart_link( $post_id );
		$smart_link = Smart_Link::get_smart_link( $uid, $post_id );

		self::assertTrue( $smart_link->exists(), 'Fixture is wrong: the Smart Link should be found.' );
		self::assertTrue( $smart_link->delete(), 'Fixture is wrong: the Smart Link should be deleted.' );

		self::assertFalse( Smart_Link::get_smart_link( $uid, $post_id )->exists() );
	}

	/**
	 * Saves a Smart Link to an external URL in a post.
	 *
	 * @since 3.26.1
	 *
	 * @param int    $post_id The ID of the post containing the link.
	 * @param string $uid     Optional. The UID to give the Smart Link. Default
	 *                        empty, which keeps the generated UID.
	 * @return string The Smart Link's UID.
	 */
	private function save_smart_link( int $post_id, string $uid = '' ): string {
		$smart_link = new Smart_Link( 'http://example.com/', 'Example', 'Example', 0, $post_id );

		if ( '' !== $uid ) {
			$smart_link->set_uid( $uid );
		}

		self::assertTrue( $smart_link->save(), 'Fixture is wrong: the Smart Link should be saved.' );

		return $smart_link->get_uid();
	}
}

<?php
/**
 * Tests of the Dashboard Links class
 *
 * @package Parsely\Tests\Unit
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

// Explicit require as the `Rest` class could not be found in some environments.
require_once __DIR__ . '/../../src/class-dashboard-links.php';

use Parsely\Parsely;
use Parsely\Dashboard_Links;

/**
 * Test the functions on the utilities class.
 */
final class DashboardLinksTest extends TestCase {
	/**
	 * Internal Parsely variable
	 *
	 * @var Parsely $parsely Holds the Parsely object
	 */
	private static $parsely;

	/**
	 * The setUp run before each test
	 */
	public function set_up(): void {
		parent::set_up();

		self::$parsely = new Parsely();
	}

	/**
	 * Test if Parse.ly Dash URL can be generated for a post.
	 *
	 * @covers \Parsely\Dashboard_Links::generate_url
	 */
	public function test_generate_parsely_post_url(): void {
		$post_id = self::factory()->post->create();
		$post    = get_post( $post_id );
		$apikey  = 'demo-api-key';

		$expected = 'https://dash.parsely.com/demo-api-key/find?url=http%3A%2F%2Fexample.org%2F%3Fp%3D' . $post_id . '&utm_campaign=wp-admin-posts-list&utm_source=wp-admin&utm_medium=wp-parsely';
		$actual   = Dashboard_Links::generate_url( $post, $apikey, 'wp-admin-posts-list', 'wp-admin' );

		self::assertSame( $expected, $actual );
	}

	/**
	 * Test if logic for showing Parse.ly row action accounts for actions not being an array.
	 *
	 * @since 2.6.0
	 * @since 3.2.0 Moved to `DashboardLinksTest.php`
	 *
	 * @covers \Parsely\UI\Row_Actions::cannot_show_parsely_link
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::api_key_is_missing
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @group ui
	 */
	public function test_can_correctly_determine_if_Parsely_link_can_be_shown_when_actions_are_an_array_or_not(): void {
		$published_post = self::factory()->post->create_and_get();
		self::set_options( array( 'apikey' => 'somekey' ) );

		self::assertTrue( Dashboard_Links::can_show_link( $published_post, self::$parsely ) );
	}

	/**
	 * Test if logic for showing Parse.ly row action accounts for post having trackable status.
	 *
	 * @since 2.6.0
	 * @since 3.2.0 Moved to `DashboardLinksTest.php`
	 *
	 * @covers \Parsely\UI\Row_Actions::cannot_show_parsely_link
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::api_key_is_missing
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @group ui
	 */
	public function test_can_correctly_determine_if_Parsely_link_can_be_shown_when_post_has_trackable_status_or_not(): void {
		$draft_post     = self::factory()->post->create_and_get( array( 'post_status' => 'draft' ) );
		$published_post = self::factory()->post->create_and_get();

		self::set_options( array( 'apikey' => 'somekey' ) );

		// Test if post does not have trackable status - only published posts are tracked by default.
		self::assertFalse( Dashboard_Links::can_show_link( $draft_post, self::$parsely ) );
		self::assertTrue( Dashboard_Links::can_show_link( $published_post, self::$parsely ) );
	}

	/**
	 * Test if logic for showing Parse.ly row action accounts for post not having a viewable type.
	 *
	 * @since 2.6.0
	 * @since 3.2.0 Moved to `DashboardLinksTest.php`
	 *
	 * @covers \Parsely\UI\Row_Actions::cannot_show_parsely_link
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::api_key_is_missing
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @group ui
	 */
	public function test_can_correctly_determine_if_Parsely_link_can_be_shown_when_post_is_viewable_or_not(): void {
		$non_publicly_queryable_post = self::factory()->post->create_and_get( array( 'post_type' => 'parsely_tests_pt' ) );
		$published_post              = self::factory()->post->create_and_get();

		self::set_options( array( 'apikey' => 'somekey' ) );

		// Test if post is not viewable status.
		self::assertFalse( Dashboard_Links::can_show_link( $non_publicly_queryable_post, self::$parsely ) );
		self::assertTrue( Dashboard_Links::can_show_link( $published_post, self::$parsely ) );
	}

	/**
	 * Test if logic for showing Parse.ly row action accounts for API key option being saved or not.
	 *
	 * @since 2.6.0
	 * @since 3.2.0 Moved to `DashboardLinksTest.php`
	 *
	 * @covers \Parsely\UI\Row_Actions::cannot_show_parsely_link
	 * @uses \Parsely\Parsely::api_key_is_set
	 * @uses \Parsely\Parsely::api_key_is_missing
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @group ui
	 */
	public function test_can_correctly_determine_if_Parsely_link_can_be_shown_when_api_key_is_set_or_missing(): void {
		$published_post = self::factory()->post->create_and_get();

		// Test if API key is not set.
		self::set_options( array( 'apikey' => '' ) );
		self::assertFalse( Dashboard_Links::can_show_link( $published_post, self::$parsely ) );

		// Test with API key set.
		self::set_options( array( 'apikey' => 'somekey' ) );
		self::assertTrue( Dashboard_Links::can_show_link( $published_post, self::$parsely ) );
	}
}

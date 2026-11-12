<?php
/**
 * Integration Tests: wp-admin Post and Page list actions
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Parsely\Parsely;
use Parsely\Permissions;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Row_Actions;

/**
 * Integration Tests for the plugin's actions shown in wp-admin's Post and Page
 * lists.
 *
 * @since 2.6.0
 */
final class RowActionsTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Row_Actions $row_actions Holds the Row_Actions object.
	 */
	private static $row_actions;

	/**
	 * Setup method called before each test.
	 */
	public function set_up(): void {
		parent::set_up();

		self::$row_actions = new Row_Actions( new Parsely() );
	}

	/**
	 * Verifies that run() will not add *_row_actions hooks by default.
	 *
	 * @since 2.6.0
	 *
	 * @covers \Parsely\UI\Row_Actions::__construct
	 * @covers \Parsely\UI\Row_Actions::run
	 *
	 * @group ui
	 */
	public function test_row_actions_class_will_not_add_row_actions_filter_when_enabling_filter_returns_false(): void {
		add_filter( 'wp_parsely_enable_row_action_links', '__return_false' );
		self::$row_actions->run();

		self::assertFalse( has_filter( 'post_row_actions', array( self::$row_actions, 'row_actions_add_parsely_link' ) ) );
		self::assertFalse( has_filter( 'page_row_actions', array( self::$row_actions, 'row_actions_add_parsely_link' ) ) );
	}

	/**
	 * Verifies that run() will add *_row_actions hooks when the
	 * wp_parsely_enable_row_action_links filter is set to true.
	 *
	 * @since 2.6.0
	 *
	 * @covers \Parsely\UI\Row_Actions::__construct
	 * @covers \Parsely\UI\Row_Actions::run
	 *
	 * @group ui
	 */
	public function test_row_actions_class_will_add_row_actions_filter_when_enabling_filter_returns_true(): void {
		add_filter( 'wp_parsely_enable_row_action_links', '__return_true' );
		self::$row_actions->run();

		self::assertNotFalse( has_filter( 'post_row_actions', array( self::$row_actions, 'row_actions_add_parsely_link' ) ) );
		self::assertNotFalse( has_filter( 'page_row_actions', array( self::$row_actions, 'row_actions_add_parsely_link' ) ) );
	}

	/**
	 * Verifies that row actions are not added when conditions fail.
	 *
	 * @since 2.6.0
	 *
	 * @covers \Parsely\UI\Row_Actions::__construct
	 * @covers \Parsely\UI\Row_Actions::row_actions_add_parsely_link
	 * @covers \Parsely\UI\Row_Actions::generate_aria_label_for_post
	 * @covers \Parsely\UI\Row_Actions::generate_link_to_parsely
	 * @covers \Parsely\Dashboard_Link::generate_url
	 * @uses \Parsely\Dashboard_Link::can_show_link
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 *
	 * @group ui
	 */
	public function test_link_to_Parsely_is_not_added_to_row_actions_when_conditions_fail(): void {
		// Insert a single post and set as global post.
		// This post is a viewable type, with a trackable status (published).
		$post_id = self::factory()->post->create( array( 'post_title' => 'Foo1' ) );
		$post    = $this->get_post( $post_id );

		// Existing actions is an array.
		$existing_actions = array();

		// Unset Site ID.
		self::set_options( array( 'apikey' => '' ) );

		// Guard clause catches, and original $actions is returned.
		$actions = self::$row_actions->row_actions_add_parsely_link( $existing_actions, $post );
		self::assertSame( $existing_actions, $actions );
	}

	/**
	 * Verifies that row actions get added correctly.
	 *
	 * @since 2.6.0
	 *
	 * @covers \Parsely\UI\Row_Actions::__construct
	 * @covers \Parsely\UI\Row_Actions::row_actions_add_parsely_link
	 * @covers \Parsely\UI\Row_Actions::generate_aria_label_for_post
	 * @covers \Parsely\UI\Row_Actions::generate_link_to_parsely
	 * @covers \Parsely\Dashboard_Link::generate_url
	 * @uses \Parsely\Dashboard_Link::can_show_link
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 *
	 * @group ui
	 */
	public function test_link_to_Parsely_is_added_to_row_actions(): void {
		// Insert a single post and set as global post.
		// This post is a viewable type, with a trackable status (published).
		/** @var int $post_id */
		$post_id = self::factory()->post->create( array( 'post_title' => 'Foo2' ) );
		$post    = $this->get_post( $post_id );

		// Existing actions is an array.
		$existing_actions = array();

		// Set the Site ID.
		self::set_options( array( 'apikey' => 'somekey' ) );

		// All conditions for the guard clause have been met.
		$actions = self::$row_actions->row_actions_add_parsely_link( $existing_actions, $post );
		self::assertCount( 1, $actions );
		self::assertArrayHasKey( 'find_in_parsely', $actions );

		$url        = PARSELY::DASHBOARD_BASE_URL . '/somekey/find?url=http%3A%2F%2Fexample.org%2F%3Fp%3D' . $post_id . '&#038;utm_campaign=wp-admin-posts-list&#038;utm_source=wp-admin&#038;utm_medium=wp-parsely';
		$aria_label = 'Go to Parse.ly stats for &quot;Foo2&quot;';
		self::assertSame(
			'<a href="' . $url . '" aria-label="' . $aria_label . '">Parse.ly&nbsp;Stats</a>',
			$actions['find_in_parsely']
		);
	}

	/**
	 * Verifies that the Engagement Boost action is not offered for a post the
	 * user cannot edit.
	 *
	 * The action links to a dashboard view whose REST calls are authorized per
	 * post, so offering it here would only lead to a denied request.
	 *
	 * @since 3.23.7
	 *
	 * @covers \Parsely\UI\Row_Actions::row_actions_add_engagement_boost_link
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\UI\Row_Actions::generate_aria_label_for_post
	 * @uses \Parsely\UI\Row_Actions::generate_link_to_engagement_boost
	 *
	 * @group ui
	 */
	public function test_engagement_boost_action_is_gated_per_post(): void {
		$this->set_engagement_boost_options();

		$other_user_id = self::create_test_user( 'ra_other_user', 'administrator' );
		$author_id     = self::create_test_user( 'ra_author', 'author' );

		/** @var int $other_users_post_id */
		$other_users_post_id = self::factory()->post->create(
			array(
				'post_author' => $other_user_id,
				'post_status' => 'publish',
			)
		);

		/** @var int $own_post_id */
		$own_post_id = self::factory()->post->create(
			array(
				'post_author' => $author_id,
				'post_status' => 'publish',
			)
		);

		wp_set_current_user( $author_id );

		self::assertArrayNotHasKey(
			'engagement_boost',
			self::$row_actions->row_actions_add_engagement_boost_link(
				array(),
				$this->get_post( $other_users_post_id )
			),
			'An Author should not be offered Engagement Boost for another user\'s post.'
		);

		self::assertArrayHasKey(
			'engagement_boost',
			self::$row_actions->row_actions_add_engagement_boost_link(
				array(),
				$this->get_post( $own_post_id )
			),
			'An Author should be offered Engagement Boost for their own post.'
		);
	}

	/**
	 * Verifies that an Editor is still offered the Engagement Boost action for
	 * another user's post, which the edit_others_posts capability allows.
	 *
	 * @since 3.23.7
	 *
	 * @covers \Parsely\UI\Row_Actions::row_actions_add_engagement_boost_link
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\UI\Row_Actions::generate_aria_label_for_post
	 * @uses \Parsely\UI\Row_Actions::generate_link_to_engagement_boost
	 *
	 * @group ui
	 */
	public function test_engagement_boost_action_is_offered_to_editor(): void {
		$this->set_engagement_boost_options();

		$other_user_id = self::create_test_user( 'ra_eb_other_user', 'administrator' );

		/** @var int $other_users_post_id */
		$other_users_post_id = self::factory()->post->create(
			array(
				'post_author' => $other_user_id,
				'post_status' => 'publish',
			)
		);

		self::set_current_user_to( 'ra_editor', 'editor' );

		self::assertArrayHasKey(
			'engagement_boost',
			self::$row_actions->row_actions_add_engagement_boost_link(
				array(),
				$this->get_post( $other_users_post_id )
			),
			'An Editor should be offered Engagement Boost for another user\'s post.'
		);
	}

	/**
	 * Enables Engagement Boost for every role having the edit_posts capability.
	 *
	 * @since 3.23.7
	 */
	private function set_engagement_boost_options(): void {
		self::set_options(
			array(
				'apikey'         => 'somekey',
				'content_helper' => array(
					'ai_features_enabled' => true,
					'traffic_boost'       => array(
						'enabled'            => true,
						'allowed_user_roles' => array_keys(
							Permissions::get_user_roles_with_edit_posts_cap()
						),
					),
				),
			)
		);
	}
}

<?php
/**
 * Integration Tests: PCH Excerpt Suggestions
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\ContentHelper;

use Parsely\Content_Helper\Excerpt_Generator;
use Parsely\Parsely;

/**
 * Integration Tests for the PCH Excerpt Suggestions.
 */
final class ContentHelperExcerptSuggestionsTest extends ContentHelperFeatureTest {
	/**
	 * Asserts the enqueueing status of the feature's assets according to the
	 * passed filter values.
	 *
	 * @since 3.17.0
	 *
	 * @param mixed                $global_filter_value The value of the global filter.
	 * @param mixed                $feature_filter_value The value of the feature filter.
	 * @param bool                 $expected Whether the assets should be enqueued.
	 * @param string               $user_login The current user's login.
	 * @param string               $user_role The current user's role.
	 * @param array<string, mixed> $additional_args Any required additional arguments.
	 */
	protected function assert_enqueued_status(
		$global_filter_value,
		$feature_filter_value,
		bool $expected,
		string $user_login,
		string $user_role,
		array $additional_args = array()
	): void {
		parent::assert_enqueued_status_default(
			new Excerpt_Generator( new Parsely() ),
			$global_filter_value,
			$feature_filter_value,
			$expected,
			$user_login,
			$user_role
		);
	}

	/**
	 * Verifies that by default, the run() method does not enqueue the assets
	 * when the current user isn't an administrator.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Permissions::current_user_can_use_pch_feature
	 * @covers \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 * @uses \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @uses \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @uses \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @uses \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @uses \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 */
	public function test_assets_do_not_get_enqueued_by_default_for_non_admin_users(): void {
		$this->assert_enqueued_status(
			null,
			null,
			false,
			'test_editor',
			'editor'
		);
	}
}

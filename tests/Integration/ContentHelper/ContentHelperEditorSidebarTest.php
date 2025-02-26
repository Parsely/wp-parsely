<?php
/**
 * Integration Tests: PCH Editor Sidebar
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\ContentHelper;

use Parsely\Content_Helper\Editor_Sidebar;
use Parsely\Parsely;

/**
 * Integration Tests for the PCH Editor Sidebar.
 */
final class ContentHelperEditorSidebarTest extends ContentHelperFeatureTest {
	/**
	 * Asserts the enqueueing status of the feature's assets according to the
	 * passed filter values.
	 *
	 * @since 3.9.0
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
			new Editor_Sidebar( new Parsely() ),
			$global_filter_value,
			$feature_filter_value,
			$expected,
			$user_login,
			$user_role
		);
	}
}

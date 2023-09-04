<?php
/**
 * Integration Tests: PCH Editor Sidebar
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\ContentHelper;

use Parsely\Content_Helper\Editor_Sidebar;
use Parsely\Parsely;

/**
 * Integration Tests for the PCH Editor Sidebar.
 */
final class ContentHelperEditorSidebarTest extends ContentHelperFeatureTest {
	/**
	 * Setup method called before each test.
	 *
	 * @since 3.9.0
	 */
	public function set_up(): void {
		$GLOBALS['parsely'] = new Parsely();
	}

	/**
	 * Asserts the enqueueing status of the feature's assets according to the
	 * passed filter values.
	 *
	 * @since 3.9.0
	 *
	 * @param mixed $global_filter_value The value of the global filter.
	 * @param mixed $feature_filter_value The value of the feature filter.
	 * @param bool  $expected Whether the assets should be enqueued.
	 * @param mixed ...$additional_args Any required additional arguments.
	 */
	protected function assert_enqueued_status(
		$global_filter_value,
		$feature_filter_value,
		bool $expected,
		...$additional_args
	): void {
		$script_id = Editor_Sidebar::get_script_id();
		$style_id  = Editor_Sidebar::get_style_id();

		parent::set_filters(
			Editor_Sidebar::get_feature_filter_name(),
			$global_filter_value,
			$feature_filter_value
		);

		// Dequeue and deregister assets.
		wp_dequeue_script( $script_id );
		wp_deregister_script( $script_id );
		wp_dequeue_style( $style_id );
		wp_deregister_style( $style_id );

		( new Editor_Sidebar( $GLOBALS['parsely'] ) )->run();

		self::assertSame( $expected, wp_script_is( $script_id ) );
		self::assertSame( $expected, wp_style_is( $style_id ) );
	}
}

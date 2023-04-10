<?php
/**
 * Integration Tests: PCH Editor Sidebar
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\ContentHelper;

use Parsely\Content_Helper;

/**
 * Integration Tests for the PCH Editor Sidebar.
 */
final class ContentHelperEditorSidebarTest extends ContentHelperFeatureTest {
	/**
	 * Asserts the enqueueing status of the feature's assets according to the
	 * passed filter values.
	 *
	 * @param mixed $global_filter_value The value of the global Content Helper filter.
	 * @param mixed $feature_filter_value The value of the feature filter.
	 * @param bool  $expected Whether the assets should be enqueued.
	 */
	protected function assert_enqueued_status(
		$global_filter_value, $feature_filter_value, bool $expected
	): void {
		$script_id = Content_Helper::get_script_id();
		$style_id  = Content_Helper::get_style_id();

		parent::set_filters(
			Content_Helper::get_feature_filter_name(),
			$global_filter_value,
			$feature_filter_value
		);

		// Dequeue and deregister assets.
		wp_dequeue_script( $script_id );
		wp_deregister_script( $script_id );
		wp_dequeue_style( $style_id );
		wp_deregister_style( $style_id );

		( new Content_Helper() )->run();

		self::assertEquals( $expected, wp_script_is( $script_id ) );
		self::assertEquals( $expected, wp_style_is( $style_id ) );
	}

	/**
	 * Verifies that the run() method enqueues the assets by default.
	 *
	 * @since 3.5.0
	 * @since 3.9.0 Moved from ContentHelperTest class and renamed/modified
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_get_enqueued_by_default(): void {
		self::assert_enqueued_status( null, null, true );
	}

	/**
	 * Verifies that the run() method enqueues the assets when the global filter
	 * is set to true.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_get_enqueued_when_global_filter_is_true(): void {
		self::assert_enqueued_status( true, null, true );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * global filter is set to false.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_do_not_get_enqueued_when_global_filter_is_false(): void {
		self::assert_enqueued_status( false, null, false );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * global filter is set to an invalid value.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_do_not_get_enqueued_when_global_filter_is_invalid(): void {
		// We expect the filter to be boolean true.
		self::assert_enqueued_status( 1, null, false );
	}

	/**
	 * Verifies that the run() method enqueues the assets when the feature
	 * filter is set to true.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_get_enqueued_when_feature_filter_is_true(): void {
		self::assert_enqueued_status( null, true, true );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when
	 * the feature filter is set to false.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_do_not_get_enqueued_when_feature_filter_is_false(): void {
		self::assert_enqueued_status( null, false, false );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * feature filter is set to an invalid value.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_do_not_get_enqueued_when_feature_filter_is_invalid(): void {
		self::assert_enqueued_status( null, array(), false );
	}

	/**
	 * Verifies that the run() method enqueues the assets when both filters are
	 * set to true.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_get_enqueued_when_both_filters_are_true(): void {
		self::assert_enqueued_status( true, true, true );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when both
	 * filters are set to false.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_do_not_get_enqueued_when_both_filters_are_false(): void {
		self::assert_enqueued_status( false, false, false );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when both
	 * filters are set to an invalid value.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_do_not_get_enqueued_when_both_filters_are_invalid(): void {
		self::assert_enqueued_status( 'string', 'string', false );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * global filter is set to true and the feature filter is set to false.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_do_not_get_enqueued_when_global_filter_is_true_and_feature_filter_is_false(): void {
		self::assert_enqueued_status( true, false, false );
	}

	/**
	 * Verifies that the run() method enqueues the assets when the global filter
	 * is set to false and the feature filter is set to true.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_get_enqueued_when_global_filter_is_false_and_feature_filter_is_true(): void {
		self::assert_enqueued_status( false, true, true );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * global filter is set to true and the feature filter is set to an invalid
	 * value.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_do_not_get_enqueued_when_global_filter_is_true_and_feature_filter_is_invalid(): void {
		self::assert_enqueued_status( true, array(), false );
	}

	/**
	 * Verifies that the run() method enqueues the assets when the global filter
	 * is set to an invalid value and the feature filter is set to an invalid
	 * value.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper::get_feature_filter_name
	 * @covers \Parsely\Content_Helper::run
	 * @covers \Parsely\Content_Helper::should_be_enabled
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::is_enabled_by_filters
	 * @covers \Parsely\Content_Helper::get_script_id
	 * @covers \Parsely\Content_Helper::get_style_id
	 *
	 * @group content-helper
	 * @group content-helper-editor-sidebar
	 */
	public function test_assets_get_enqueued_when_global_filter_is_invalid_and_feature_filter_is_true(): void {
		self::assert_enqueued_status( 'string', true, true );
	}
}

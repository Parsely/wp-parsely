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
	 * @param mixed $global_filter_value The value of the global filter.
	 * @param mixed $feature_filter_value The value of the feature filter.
	 * @param bool  $expected Whether the assets should be enqueued.
	 * @param mixed ...$additional_args Any required additional arguments.
	 *
	 * @since 3.9.0
	 */
	protected function assert_enqueued_status(
		$global_filter_value,
		$feature_filter_value,
		bool $expected,
		...$additional_args
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
}

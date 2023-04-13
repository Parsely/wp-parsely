<?php
/**
 * Integration Tests: PCH Dashboard Widget
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\ContentHelper;

use Parsely\Content_Helper\Dashboard_Widget;
use Parsely\Parsely;

/**
 * Integration Tests for the PCH Dashboard Widget.
 */
final class ContentHelperDashboardWidgetTest extends ContentHelperFeatureTest {
	/**
	 * Setup method called before each test.
	 */
	public function set_up(): void {
		$GLOBALS['parsely'] = new Parsely();
		self::set_admin_user();
	}

	/**
	 * Asserts the enqueueing status of the feature's assets according to the
	 * passed filter values.
	 *
	 * @since 3.9.0
	 *
	 * @param mixed  $global_filter_value The value of the global Content Helper filter.
	 * @param mixed  $feature_filter_value The value of the feature filter.
	 * @param bool   $expected Whether the assets should be enqueued.
	 * @param string $screen The WordPress screen on which the operation will run.
	 */
	protected function assert_enqueued_status(
		$global_filter_value, $feature_filter_value, bool $expected,
		string $screen = 'dashboard'
	): void {
		$script_id = Dashboard_Widget::get_script_id();
		$style_id  = Dashboard_Widget::get_style_id();

		parent::set_filters(
			Dashboard_Widget::get_feature_filter_name(),
			$global_filter_value,
			$feature_filter_value
		);

		// Dequeue and deregister assets.
		wp_dequeue_script( $script_id );
		wp_deregister_script( $script_id );
		wp_dequeue_style( $style_id );
		wp_deregister_style( $style_id );

		// Force the feature's enqueueing code to run.
		set_current_screen( $screen );
		( new Dashboard_Widget() )->run();
		do_action( 'admin_enqueue_scripts' ); // phpcs:ignore

		self::assertEquals( $expected, wp_script_is( $script_id ) );
		self::assertEquals( $expected, wp_style_is( $style_id ) );
	}

	/**
	 * Verifies that the run() method enqueues the assets by default.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
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
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
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
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
	 */
	public function test_assets_do_not_get_enqueued_when_global_filter_is_false(): void {
		$this->assert_enqueued_status( false, null, false );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * global filter is set to an invalid value.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
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
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
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
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
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
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
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
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
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
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
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
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
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
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
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
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
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
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
	 */
	public function test_assets_do_not_get_enqueued_when_global_filter_is_true_and_feature_filter_is_invalid(): void {
		self::assert_enqueued_status( true, array(), false );
	}

	/**
	 * Verifies that the run() method enqueues the assets when the global filter
	 * is set to an invalid value and the feature filter is set to true.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
	 */
	public function test_assets_get_enqueued_when_global_filter_is_invalid_and_feature_filter_is_true(): void {
		self::assert_enqueued_status( 'string', true, true );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * current user does not have enough capabilities.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
	 */
	public function test_assets_do_not_get_enqueued_when_user_has_not_enough_capabilities(): void {
		$this->login_as_contributor();
		self::assert_enqueued_status( null, null, false );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * active page is not the WordPress Dashboard.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 *
	 * @group content-helper
	 * @group content-helper-dashboard-widget
	 */
	public function test_assets_do_not_get_enqueued_when_page_is_not_dashboard(): void {
		$this->assert_enqueued_status( null, null, false, 'edit-page' );
	}
}

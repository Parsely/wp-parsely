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
		/**
		 * The WordPress screen on which the test will run.
		 *
		 * @var string
		 */
		$screen = $additional_args[0] ?? 'dashboard';

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
		( new Dashboard_Widget( $GLOBALS['parsely'] ) )->run();
		do_action( 'admin_enqueue_scripts' ); // phpcs:ignore

		self::assertSame( $expected, wp_script_is( $script_id ) );
		self::assertSame( $expected, wp_style_is( $style_id ) );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * current user does not have enough capabilities.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 * @uses \Parsely\Utils\convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\get_asset_info
	 *
	 * @group content-helper
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
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_feature
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::enqueue_assets
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::get_style_id
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::run
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 * @uses \Parsely\Utils\convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_do_not_get_enqueued_when_page_is_not_dashboard(): void {
		$this->assert_enqueued_status( null, null, false, 'edit-page' );
	}
}

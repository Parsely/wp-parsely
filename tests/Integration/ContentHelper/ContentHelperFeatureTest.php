<?php
/**
 * Integration Tests: Base class for all Content Helper feature tests
 *
 * @package Parsely\Tests
 * @since   3.9.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\ContentHelper;

use Parsely\Content_Helper\Content_Helper_Feature;
use Parsely\Tests\Integration\TestCase;

/**
 * Base class for all Content Helper feature integration tests.
 *
 * @since 3.9.0
 */
abstract class ContentHelperFeatureTest extends TestCase {
	/**
	 * Asserts the enqueueing status of a feature's assets.
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
	abstract protected function assert_enqueued_status(
		$global_filter_value,
		$feature_filter_value,
		bool $expected,
		string $user_login,
		string $user_role,
		array $additional_args = array()
	): void;

	/**
	 * Provides a default implementation for asserting the enqueueing status
	 * of a feature's assets.
	 *
	 * @since 3.17.0
	 *
	 * @param Content_Helper_Feature $feature The feature to be tested.
	 * @param mixed                  $global_filter_value The value of the global filter.
	 * @param mixed                  $feature_filter_value The value of the feature filter.
	 * @param bool                   $expected Whether the assets should be enqueued.
	 * @param string                 $user_login The current user's login.
	 * @param string                 $user_role The current user's role.
	 */
	protected function assert_enqueued_status_default(
		Content_Helper_Feature $feature,
		$global_filter_value,
		$feature_filter_value,
		bool $expected,
		string $user_login,
		string $user_role
	): void {
		self::set_current_user_to( $user_login, $user_role );

		self::set_filters(
			$feature::get_feature_filter_name(),
			$global_filter_value,
			$feature_filter_value
		);

		self::deregister_feature_assets_and_run( $feature );

		self::assertSame( $expected, wp_script_is( $feature::get_script_id() ) );
		self::assertSame( $expected, wp_style_is( $feature::get_style_id() ) );
	}

	/**
	 * Sets the global and feature filters according to the passed values.
	 *
	 * Note: Passing null for a filter will not set it.
	 *
	 * @since 3.9.0
	 *
	 * @param string $feature_filter The feature filter to be set.
	 * @param mixed  $global_filter_value The global filter value.
	 * @param mixed  $feature_filter_value The feature filter value.
	 */
	protected static function set_filters(
		string $feature_filter,
		$global_filter_value,
		$feature_filter_value
	): void {
		remove_all_filters( Content_Helper_Feature::get_global_filter_name() );
		remove_all_filters( $feature_filter );

		// Global filter.
		if ( null !== $global_filter_value ) {
			add_filter(
				Content_Helper_Feature::get_global_filter_name(),
				function () use ( $global_filter_value ) {
					return $global_filter_value;
				}
			);
		}

		// Feature filter.
		if ( null !== $feature_filter_value ) {
			add_filter(
				$feature_filter,
				function () use ( $feature_filter_value ) {
					return $feature_filter_value;
				}
			);
		}
	}

	/**
	 * Deregisters a feature's assets and calls the feature's run method.
	 *
	 * @since 3.17.0
	 *
	 * @param Content_Helper_Feature $feature The instance of the feature.
	 */
	protected static function deregister_feature_assets_and_run(
		Content_Helper_Feature $feature
	): void {
		$script_id = $feature::get_script_id();
		$style_id  = $feature::get_style_id();

		wp_dequeue_script( $script_id );
		wp_deregister_script( $script_id );
		wp_dequeue_style( $style_id );
		wp_deregister_style( $style_id );

		$feature->run();
	}

	/**
	 * Verifies that the run() method enqueues the assets by default.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_script_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_style_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_parsely_stats_column_hidden
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::get_credentials_not_set_message
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::inject_inline_scripts
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_get_enqueued_by_default(): void {
		$this->assert_enqueued_status( null, null, true, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method enqueues the assets when the global filter
	 * is set to true.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_script_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_style_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_parsely_stats_column_hidden
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::get_credentials_not_set_message
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::inject_inline_scripts
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_get_enqueued_when_global_filter_is_true(): void {
		$this->assert_enqueued_status( true, null, true, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * global filter is set to false.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_do_not_get_enqueued_when_global_filter_is_false(): void {
		$this->assert_enqueued_status( false, null, false, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * global filter is set to an invalid value.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_do_not_get_enqueued_when_global_filter_is_invalid(): void {
		// We expect the filter to be boolean true.
		$this->assert_enqueued_status( 1, null, false, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method enqueues the assets when the feature
	 * filter is set to true.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_script_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_style_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_parsely_stats_column_hidden
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::get_credentials_not_set_message
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::inject_inline_scripts
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_get_enqueued_when_feature_filter_is_true(): void {
		$this->assert_enqueued_status( null, true, true, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when
	 * the feature filter is set to false.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_do_not_get_enqueued_when_feature_filter_is_false(): void {
		$this->assert_enqueued_status( null, false, false, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * feature filter is set to an invalid value.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_do_not_get_enqueued_when_feature_filter_is_invalid(): void {
		$this->assert_enqueued_status( null, array(), false, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method enqueues the assets when both filters are
	 * set to true.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_script_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_style_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_parsely_stats_column_hidden
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::get_credentials_not_set_message
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::inject_inline_scripts
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_get_enqueued_when_both_filters_are_true(): void {
		$this->assert_enqueued_status( true, true, true, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when both
	 * filters are set to false.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_script_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_style_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_parsely_stats_column_hidden
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_do_not_get_enqueued_when_both_filters_are_false(): void {
		$this->assert_enqueued_status( false, false, false, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when both
	 * filters are set to an invalid value.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_do_not_get_enqueued_when_both_filters_are_invalid(): void {
		$this->assert_enqueued_status( 'string', 'string', false, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * global filter is set to true and the feature filter is set to false.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_do_not_get_enqueued_when_global_filter_is_true_and_feature_filter_is_false(): void {
		$this->assert_enqueued_status( true, false, false, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method enqueues the assets when the global filter
	 * is set to false and the feature filter is set to true.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_script_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_style_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_parsely_stats_column_hidden
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::get_credentials_not_set_message
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::inject_inline_scripts
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_get_enqueued_when_global_filter_is_false_and_feature_filter_is_true(): void {
		$this->assert_enqueued_status( false, true, true, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * global filter is set to true and the feature filter is set to an invalid
	 * value.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_do_not_get_enqueued_when_global_filter_is_true_and_feature_filter_is_invalid(): void {
		$this->assert_enqueued_status( true, array(), false, 'admin', 'administrator' );
	}

	/**
	 * Verifies that the run() method enqueues the assets when the global filter
	 * is set to an invalid value and the feature filter is set to true.
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
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::__construct
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::can_enable_feature
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_script_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::get_style_id
	 * @covers \Parsely\Content_Helper\Excerpt_Generator::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_script_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_style_id
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_parsely_stats_column_hidden
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::get_credentials_not_set_message
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::inject_inline_scripts
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-helper
	 */
	public function test_assets_get_enqueued_when_global_filter_is_invalid_and_feature_filter_is_true(): void {
		$this->assert_enqueued_status( 'string', true, true, 'admin', 'administrator' );
	}
}

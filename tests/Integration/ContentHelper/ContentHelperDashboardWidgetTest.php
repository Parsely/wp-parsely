<?php
/**
 * Integration Tests: PCH Dashboard Widget
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\ContentHelper;

use Parsely\Content_Helper\Dashboard_Widget;
use Parsely\Parsely;
use Parsely\Permissions;
use Parsely\REST_API\Settings\Endpoint_Dashboard_Widget_Settings;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration Tests for the PCH Dashboard Widget.
 */
final class ContentHelperDashboardWidgetTest extends ContentHelperFeatureTest {
	/**
	 * Internal variable.
	 *
	 * @since 3.17.0
	 *
	 * @var Parsely $parsely Holds the Parsely object.
	 */
	private static $parsely;

	/**
	 * Setup method called before each test.
	 *
	 * @since 3.17.0
	 */
	public function set_up(): void {
		parent::set_up();

		self::$parsely = new Parsely();
		self::$parsely->get_rest_api_controller()->init();

		TestCase::set_options(
			array(
				'apikey'     => 'test_apikey',
				'api_secret' => 'test_secret',
			)
		);
	}

	/**
	 * Teardown method called after each test.
	 *
	 * @since 3.17.0
	 */
	public function tear_down(): void {
		parent::tear_down();
		TestCase::set_options();
	}

	/**
	 * Asserts the enqueueing status of the feature's assets according to the
	 * passed filter values.
	 *
	 * @param mixed                $global_filter_value The value of the global filter.
	 * @param mixed                $feature_filter_value The value of the feature filter.
	 * @param bool                 $expected Whether the assets should be enqueued.
	 * @param string               $user_login The current user's login.
	 * @param string               $user_role The current user's role.
	 * @param array<string, mixed> $additional_args Any required additional arguments.
	 *
	 * @since 3.9.0
	 */
	protected function assert_enqueued_status(
		$global_filter_value,
		$feature_filter_value,
		bool $expected,
		string $user_login,
		string $user_role,
		array $additional_args = array()
	): void {
		$feature = new Dashboard_Widget( self::$parsely );
		self::set_current_user_to( $user_login, $user_role );

		parent::set_filters(
			$feature::get_feature_filter_name(),
			$global_filter_value,
			$feature_filter_value
		);

		set_current_screen(
			self::get_string_value_from_array(
				$additional_args,
				'screen',
				'dashboard'
			)
		);

		self::deregister_feature_assets_and_run( $feature );

		// Force the feature's enqueueing code to run.
		do_action( 'admin_enqueue_scripts' ); // phpcs:ignore

		self::assertSame( $expected, wp_script_is( $feature::get_script_id() ) );
		self::assertSame( $expected, wp_style_is( $feature::get_script_id() ) );
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
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 *
	 * @group content-intelligence
	 */
	public function test_assets_do_not_get_enqueued_when_user_has_not_enough_capabilities(): void {
		self::assert_enqueued_status( null, null, false, 'test_contributor', 'contributor' );
	}

	/**
	 * Verifies that the widget's title is escaped, so that markup in its
	 * translation is output as text.
	 *
	 * @since 3.26.0
	 *
	 * @covers \Parsely\Content_Helper\Dashboard_Widget::add_dashboard_widget
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::can_enable_feature
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 * @uses \Parsely\Content_Helper\Dashboard_Widget::__construct
	 * @uses \Parsely\Content_Helper\Dashboard_Widget::can_enable_widget
	 * @uses \Parsely\Content_Helper\Dashboard_Widget::get_feature_filter_name
	 * @uses \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 *
	 * @group content-intelligence
	 */
	public function test_widget_title_is_escaped(): void {
		require_once ABSPATH . 'wp-admin/includes/dashboard.php';

		self::set_current_user_to( 'admin', 'administrator' );
		set_current_screen( 'dashboard' );
		$this->wrap_translations_in_strong_tags();

		$widget = new Dashboard_Widget( self::$parsely );
		$widget->add_dashboard_widget();

		/**
		 * The registered meta boxes.
		 *
		 * @var array<string, array<string, array<string, array<string, array{title: string}>>>> $wp_meta_boxes
		 */
		global $wp_meta_boxes;

		self::assertSame(
			'&lt;strong&gt;Parse.ly Top Posts&lt;/strong&gt;',
			$wp_meta_boxes['dashboard']['normal']['core'][ $widget::get_script_id() ]['title'] ?? null
		);
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
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 * @uses \Parsely\Utils\Utils::get_asset_info
	 *
	 * @group content-intelligence
	 */
	public function test_assets_do_not_get_enqueued_when_page_is_not_dashboard(): void {
		$this->assert_enqueued_status(
			null,
			null,
			false,
			'admin',
			'administrator',
			array( 'screen' => 'edit-page' )
		);
	}

	/**
	 * Verifies that the inline scripts assign their data as string literals
	 * that keep its exact contents, including quotes.
	 *
	 * @since 3.26.0
	 *
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::inject_inline_scripts
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::__construct
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::get_credentials_not_set_message
	 * @uses \Parsely\Content_Helper\Dashboard_Widget::get_script_id
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_settings_url
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::get_pch_permissions_json
	 *
	 * @group content-intelligence
	 */
	public function test_inline_script_data_keeps_quotes(): void {
		TestCase::set_options( array( 'apikey' => '' ) );
		add_filter(
			'gettext_wp-parsely',
			function ( string $translation, string $text ): string {
				return 'Contact us' === $text ? 'Let\'s "talk"' : $translation;
			},
			10,
			2
		);

		$parsely = new Parsely();
		$widget  = new Dashboard_Widget( $parsely );
		$handle  = $widget::get_script_id();

		wp_register_script( $handle, 'https://example.org/dashboard-widget.js', array(), '1', true );
		$this->get_private_method( Dashboard_Widget::class, 'inject_inline_scripts' )
			->invoke( $widget, Endpoint_Dashboard_Widget_Settings::get_endpoint_name() );

		$values = $this->get_inline_script_values( $handle );
		wp_deregister_script( $handle );

		/** @var string $message */
		$message = $this->get_private_method( Dashboard_Widget::class, 'get_credentials_not_set_message' )
			->invoke( $widget );

		self::assertStringContainsString( 'Let\'s "talk"', $message );
		self::assertSame( $message, $values['wpParselyEmptyCredentialsMessage'] ?? null );
		self::assertSame(
			Permissions::get_pch_permissions_json( $parsely->get_options()['content_helper'] ),
			$values['wpParselyContentHelperPermissions'] ?? null
		);
		self::assertSame( '[]', $values['wpParselyContentHelperSettings'] ?? null );
	}
}

<?php
/**
 * Integration Tests: Parse.ly Dashboard Widget
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Parsely\ContentHelper\Dashboard_Widget;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration Tests for the Parse.ly Dashboard Widget.
 *
 * @since 3.7.0
 */
final class AdminDashboardWidgetTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Dashboard_Widget $dashboard_widget Holds the Dashboard_Widget object.
	 */
	private static $dashboard_widget;

	/**
	 * Setup method called before each test.
	 */
	public function set_up(): void {
		parent::set_up();

		self::$dashboard_widget = new Dashboard_Widget();

		TestCase::set_options();
	}

	/**
	 * Verifies that run() adds the register and enqueue actions.
	 *
	 * @covers \Parsely\ContentHelper\Dashboard_Widget::__construct
	 * @covers \Parsely\ContentHelper\Dashboard_Widget::run
	 * @covers \Parsely\ContentHelper\Dashboard_Widget::enqueue_assets
	 */
	public function test_dashboard_widget_run_adds_actions(): void {
		self::assertFalse( has_action( 'wp_dashboard_setup', array( self::$dashboard_widget, 'add_dashboard_widget' ) ) );
		self::assertFalse( has_action( 'admin_enqueue_scripts', array( self::$dashboard_widget, 'enqueue_assets' ) ) );

		self::$dashboard_widget->run();

		self::assertSame( 10, has_action( 'wp_dashboard_setup', array( self::$dashboard_widget, 'add_dashboard_widget' ) ) );
		self::assertSame( 10, has_action( 'admin_enqueue_scripts', array( self::$dashboard_widget, 'enqueue_assets' ) ) );
	}

	/**
	 * Verifies that the Dashboard Widget's assets get enqueued in the wp-admin
	 * dashboard.
	 *
	 * @covers \Parsely\ContentHelper\Dashboard_Widget::__construct
	 * @covers \Parsely\ContentHelper\Dashboard_Widget::run
	 * @covers \Parsely\ContentHelper\Dashboard_Widget::enqueue_assets
	 */
	public function test_dashboard_widget_assets_are_added_to_the_dashboard_page(): void {
		self::$dashboard_widget->enqueue_assets( 'index.php' );

		$this->assert_is_script_registered( 'wp-parsely-dashboard-widget' );
		$this->assert_is_script_enqueued( 'wp-parsely-dashboard-widget' );

		$this->assert_is_style_registered( 'wp-parsely-dashboard-widget' );
		$this->assert_is_style_enqueued( 'wp-parsely-dashboard-widget' );

		// Deregister and dequeue for next test.
		wp_deregister_script( 'wp-parsely-dashboard-widget' );
		wp_deregister_style( 'wp-parsely-dashboard-widget' );
		wp_dequeue_script( 'wp-parsely-dashboard-widget' );
		wp_dequeue_style( 'wp-parsely-dashboard-widget' );
	}

	/**
	 * Verifies that the Dashboard Widget's assets do not get enqueued if the
	 * page is not the wp-admin dashboard.
	 *
	 * @covers \Parsely\ContentHelper\Dashboard_Widget::__construct
	 * @covers \Parsely\ContentHelper\Dashboard_Widget::run
	 * @covers \Parsely\ContentHelper\Dashboard_Widget::enqueue_assets
	 */
	public function test_dashboard_widget_assets_are_not_added_to_non_dashboard_pages(): void {
		self::$dashboard_widget->enqueue_assets( 'edit.php' );

		$this->assert_is_script_not_registered( 'wp-parsely-dashboard-widget' );
		$this->assert_is_script_not_enqueued( 'wp-parsely-dashboard-widget' );

		$this->assert_is_style_not_registered( 'wp-parsely-dashboard-widget' );
		$this->assert_is_style_not_enqueued( 'wp-parsely-dashboard-widget' );
	}
}

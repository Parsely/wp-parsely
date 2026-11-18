<?php
/**
 * Integration Tests: wp-admin top bar
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Admin_Bar;
use WP_Admin_Bar;

/**
 * Integration Tests for the top bar in wp-admin.
 *
 * @since 3.1.0
 */
final class AdminBarTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Admin_Bar $admin_bar Holds the Admin_Bar object.
	 */
	private static $admin_bar;

	/**
	 * Setup method called before each test.
	 */
	public function set_up(): void {
		parent::set_up();

		self::$admin_bar = new Admin_Bar( new Parsely() );
	}

	/**
	 * Verifies that the function to render the stats button is enqueued on the
	 * admin menu.
	 *
	 * @covers \Parsely\UI\Admin_Bar::__construct
	 * @covers \Parsely\UI\Admin_Bar::run
	 */
	public function test_admin_bar_enqueued(): void {
		self::$admin_bar->run();

		self::assertSame( 201, has_filter( 'admin_bar_menu', array( self::$admin_bar, 'admin_bar_parsely_stats_button' ) ) );
	}

	/**
	 * Verifies that the function to render the stats button is not enqueued on
	 * the admin menu when the filter wp_parsely_enable_admin_bar is set to
	 * false.
	 *
	 * @covers \Parsely\UI\Admin_Bar::__construct
	 * @covers \Parsely\UI\Admin_Bar::run
	 */
	public function test_admin_bar_not_enqueued_with_filter(): void {
		add_filter( 'wp_parsely_enable_admin_bar', '__return_false' );

		self::$admin_bar->run();

		self::assertFalse( has_filter( 'admin_bar_menu', array( self::$admin_bar, 'admin_bar_parsely_stats_button' ) ) );
	}

	/**
	 * Verifies that the stats button's title is escaped, so that markup in its
	 * translation is output as text.
	 *
	 * @since 3.26.0
	 *
	 * @covers \Parsely\UI\Admin_Bar::admin_bar_parsely_stats_button
	 * @uses \Parsely\Dashboard_Link::can_show_link
	 * @uses \Parsely\Dashboard_Link::generate_url
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\UI\Admin_Bar::__construct
	 */
	public function test_stats_button_title_is_escaped(): void {
		require_once ABSPATH . 'wp-includes/class-wp-admin-bar.php';

		self::set_options();
		$this->wrap_translations_in_strong_tags();
		$this->go_to_new_post();

		$admin_bar = new WP_Admin_Bar();
		self::$admin_bar->admin_bar_parsely_stats_button( $admin_bar );

		/** @var object{title: string}|null $node */
		$node = $admin_bar->get_node( 'parsely-stats' );

		self::assertSame( '&lt;strong&gt;Parse.ly Stats&lt;/strong&gt;', null === $node ? null : $node->title );
	}
}

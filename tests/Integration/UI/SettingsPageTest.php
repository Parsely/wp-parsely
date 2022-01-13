<?php
/**
 * Settings page tests.
 *
 * @package Parsely
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Settings_Page;

/**
 * Settings page tests.
 *
 * @since 3.1.0
 */
final class SettingsPageTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Settings_Page $settings_page Holds the Settings_Page object.
	 */
	private static $settings_page;
	/**
	 * Internal variable.
	 *
	 * @var Parsely $parsely Holds the Parsely object.
	 */
	private static $parsely;

	/**
	 * The setup run before each test.
	 */
	public function set_up(): void {
		parent::set_up();
		self::$parsely       = new Parsely();
		self::$settings_page = new Settings_Page( self::$parsely );
	}

	/**
	 * Check that default tracking values get saved.
	 *
	 * @since 3.1.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_options
	 * @group ui
	 */
	public function test_validate_unique_tracking_values_succeeds(): void {
		// Initializations.
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		// Default tracking values.
		$options['track_post_types'] = array( 'post' );
		$options['track_page_types'] = array( 'page' );

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Check that validate_options() method will not allow duplicate tracking
	 * in post types array.
	 *
	 * @since 3.1.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_options
	 * @group ui
	 */
	public function test_validate_duplicate_tracking_in_post_types(): void {
		// Initializations.
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		// Duplicate selection in Post Types.
		$options['track_post_types'] = array( 'post', 'page' );
		$options['track_page_types'] = array( 'page' );

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Check that validate_options() method will not allow duplicate tracking
	 * in page types array.
	 *
	 * @since 3.1.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_options
	 * @group ui
	 */
	public function test_validate_duplicate_tracking_in_page_types(): void {
		// Initializations.
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		// Duplicate selection in Page Types.
		$options['track_post_types'] = array( 'post' );
		$options['track_page_types'] = array( 'post', 'page' );

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Check that validate_options() method will not allow duplicate tracking
	 * when the array order is different than the default.
	 *
	 * @since 3.1.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_options
	 * @group ui
	 */
	public function test_validate_duplicate_tracking_with_unexpected_array_order(): void {
		// Initializations.
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		// Duplicate selection in Page Types (different order of array items).
		$options['track_post_types'] = array( 'post' );
		$options['track_page_types'] = array( 'page', 'post' );

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Make sure that the settings URL is correctly returned for single sites and multisites with and without a blog_id param.
	 *
	 * @covers \Parsely\Parsely::get_settings_url
	 * @return void
	 */
	public function test_get_settings_url_with_and_without_blog_id(): void {
		self::assertSame(
			'http://example.org/wp-admin/options-general.php?page=parsely',
			self::$parsely->get_settings_url(),
			'The URL did not match the expected value without a $blog_id param.'
		);

		self::assertSame(
			'http://example.org/wp-admin/options-general.php?page=parsely',
			self::$parsely->get_settings_url( get_current_blog_id() ),
			'The URL did not match the expected value with a $blog_id param.'
		);

		if ( ! is_multisite() ) {
			return;
		}

		$subsite_blog_id = $this->factory->blog->create(
			array(
				'domain' => 'parselyrocks.example.org',
				'path'   => '/vipvipvip',
			)
		);

		self::assertSame(
			'http://parselyrocks.example.org/vipvipvip/wp-admin/options-general.php?page=parsely',
			self::$parsely->get_settings_url( $subsite_blog_id ),
			'The URL did not match when passing $subsite_blog_id.'
		);

		// phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.switch_to_blog_switch_to_blog
		switch_to_blog( $subsite_blog_id );
		self::assertSame(
			'http://parselyrocks.example.org/vipvipvip/wp-admin/options-general.php?page=parsely',
			self::$parsely->get_settings_url(),
			'The URL did not match the subsite without passing a $blog_id param.'
		);
		restore_current_blog();

		self::assertSame(
			'http://example.org/wp-admin/options-general.php?page=parsely',
			self::$parsely->get_settings_url(),
			'The URL did not match the expected value for the main site with no $blog_id param after switching back.'
		);
	}
}

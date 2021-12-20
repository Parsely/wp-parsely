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
 * Row actions tests.
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
		$options = self::get_plugin_options();

		$options['track_post_types'] = array( 'post' );
		$options['track_page_types'] = array( 'page' );

		self::assertEmpty( self::get_setting_errors_array( $options ) );
	}

	/**
	 * Check that validate_options() method will not allow duplicate tracking.
	 *
	 * @since 3.1.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_options
	 * @group ui
	 */
	public function test_validate_duplicate_tracking_values_returns_errors(): void {
		$options = self::get_plugin_options();

		// Duplicate selection in Post Types.
		$options['track_post_types'] = array( 'post', 'page' );
		$options['track_page_types'] = array( 'page' );
		self::assertNotEmpty( self::get_setting_errors_array( $options ) );

		// Duplicate selection in Page Types.
		$options['track_post_types'] = array( 'post' );
		$options['track_page_types'] = array( 'post', 'page' );
		self::assertNotEmpty( self::get_setting_errors_array( $options ) );

		// Duplicate selection in Page Types (different order of array items).
		$options['track_post_types'] = array( 'post' );
		$options['track_page_types'] = array( 'page', 'post' );
		self::assertNotEmpty( self::get_setting_errors_array( $options ) );
	}


	/**
	 * Return the plugin's options in a way that tests can be executed.
	 *
	 * @return array The plugin's options.
	 */
	public static function get_plugin_options(): array {
		$options = self::$parsely->get_options();

		// Set any required options.
		$options['apikey'] = 'php-integration-test.com';

		// Convert any boolean settings to string equivalents.
		foreach ( $options as $key => $value ) {
			if ( is_bool( $value ) ) {
				$options[ $key ] = $value ? 'true' : 'false';
			}
		}

		return $options;
	}

	/**
	 * Validate the passed options and return any errors.
	 *
	 * @param array $options Plugin options to be tested.
	 * @return array Any errors found during the validation process.
	 */
	public static function get_setting_errors_array( $options ): array {
		// Remove any pre-existing errors.
		global $wp_settings_errors;
		$wp_settings_errors = array();

		self::$settings_page->validate_options( $options );

		return get_settings_errors();
	}

}

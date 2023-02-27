<?php
/**
 * Unit Tests: Settings page validation functionality
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\SettingsPage\Validations;

use Parsely\Parsely;
use Yoast\WPTestUtils\BrainMonkey\TestCase;
use Parsely\UI\Settings_Page;


/**
 * Unit Tests for the Settings' page validation functionality.
 */
final class SettingsValidationsTest extends TestCase {

	use \Parsely\Tests\Tests_Reflection;

	/**
	 * Internal variable.
	 *
	 * @var Parsely $parsely Holds the Parsely object.
	 */
	private static $parsely;

	/**
	 * Internal Settings_Page variable.
	 *
	 * @var Settings_Page $settings_page Holds the Settings_Page object.
	 */
	private static $settings_page;

	/**
	 * Runs the setup process before each test.
	 */
	public function set_up(): void {
		parent::set_up();

		self::$parsely       = new Parsely();
		self::$settings_page = new Settings_Page( self::$parsely );
	}

	/**
	 * Verifies that Site ID validation works as expected.
	 *
	 * @since 3.3.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_site_id
	 */
	public function test_validate_site_ids(): void {
		$validate_site_id = self::get_method( 'validate_site_id', Settings_Page::class );

		// Test valid Site IDs.
		$valid_values = array(
			'test.com',
			'www.test.com',
			'subdomain.test.com',
			'www.subdomain.test.com',
			'subdomain.subdomain.test.com',
		);
		foreach ( $valid_values as $value ) {
			self::assertTrue( $validate_site_id->invoke( self::$settings_page, $value ) );
		}

		// Test invalid Site IDs.
		$invalid_values = array(
			'test',
			'test.',
			'test.com/',
			't%st.com',
			't@st.com',
			'http://test.com',
			'https://test.com',
			'www.subdomain.subdomain.test.com', // Value cannot have more than 3 periods.
		);
		foreach ( $invalid_values as $value ) {
			self::assertFalse( $validate_site_id->invoke( self::$settings_page, $value ) );
		}
	}
}

<?php
/**
 * Site Health tools tests.
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Site_Health;

/**
 * Site Health extensions tests.
 *
 * @since 3.4.0
 */
final class SiteHealthTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Site_Health $site_health Holds the Admin_Bar object
	 */
	private static $site_health;

	/**
	 * The setUp run before each test
	 */
	public function set_up(): void {
		parent::set_up();

		self::$site_health = new Site_Health( new Parsely() );
	}

	/**
	 * Check that the functions that extend the Site Health page are enqueued.
	 *
	 * @covers \Parsely\UI\Site_Health::__construct
	 * @covers \Parsely\UI\Site_Health::run
	 */
	public function test_admin_bar_enqueued(): void {
		self::$site_health->run();

		self::assertEquals( 10, has_filter( 'site_status_tests', array( self::$site_health, 'check_api_key' ) ) );
		self::assertEquals( 10, has_filter( 'debug_information', array( self::$site_health, 'options_debug_info' ) ) );
	}

	/**
	 * Test if options_debug_info can populate the args array to be consumed by WordPress.
	 *
	 * @covers \Parsely\UI\Site_Health::__construct
	 * @covers \Parsely\UI\Site_Health::options_debug_info
	 */
	public function test_options_debug_info(): void {
		$args = self::$site_health->options_debug_info( array() );

		self::assertArrayHasKey( 'parsely', $args );
		self::assertEquals( 'Parse.ly Options', $args['parsely']['label'] );
		self::assertEquals( 'Shows the options stored in the database used by the wp-parsely plugin.', $args['parsely']['description'] );
		self::assertTrue( $args['parsely']['show_count'] );
		self::assertArrayHasKey( 'fields', $args['parsely'] );
	}
}

<?php
/**
 * Integration Tests: wp-admin Site Health
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Site_Health;

/**
 * Integration Tests for the plugin's entries in the wp-admin Site Health
 * page.
 *
 * @since 3.4.0
 *
 * @phpstan-import-type Parsely_Health_Info from Site_Health
 */
final class SiteHealthTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Site_Health $site_health Holds the Admin_Bar object
	 */
	private static $site_health;

	/**
	 * Setup method called before each test.
	 */
	public function set_up(): void {
		parent::set_up();

		self::$site_health = new Site_Health( new Parsely() );
	}

	/**
	 * Verifies that the functions that extend the Site Health page are
	 * enqueued.
	 *
	 * @covers \Parsely\UI\Site_Health::__construct
	 * @covers \Parsely\UI\Site_Health::run
	 */
	public function test_admin_bar_enqueued(): void {
		self::$site_health->run();

		self::assertEquals( 10, has_filter( 'site_status_tests', array( self::$site_health, 'check_site_id' ) ) );
		self::assertEquals( 10, has_filter( 'debug_information', array( self::$site_health, 'options_debug_info' ) ) );
	}

	/**
	 * Verifies that options_debug_info() can populate the args array to be
	 * consumed by WordPress.
	 *
	 * @covers \Parsely\UI\Site_Health::__construct
	 * @covers \Parsely\UI\Site_Health::options_debug_info
	 * @uses \Parsely\Parsely::get_options
	 */
	public function test_options_debug_info(): void {
		$args = self::$site_health->options_debug_info( array() );
		/**
		 * Variable.
		 *
		 * @var Parsely_Health_Info
		 */
		$parsely_health_info = $args['parsely'] ?? array();

		self::assertArrayHasKey( 'parsely', $args );
		self::assertEquals( 'Parse.ly Options', $parsely_health_info['label'] );
		self::assertEquals( 'Shows the options stored in the database used by the wp-parsely plugin.', $parsely_health_info['description'] );
		self::assertTrue( $parsely_health_info['show_count'] );
		self::assertArrayHasKey( 'fields', $parsely_health_info );
	}
}

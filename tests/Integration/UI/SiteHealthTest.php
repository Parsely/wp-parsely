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

		self::assertSame( 10, has_filter( 'site_status_tests', array( self::$site_health, 'check_site_id' ) ) );
		self::assertSame( 10, has_filter( 'debug_information', array( self::$site_health, 'options_debug_info' ) ) );
	}

	/**
	 * Verifies that the actions link in check_site_id() uses the correct admin
	 * URL when WordPress is installed in a subdirectory, where admin_url() differs
	 * from home_url() (i.e. siteurl ≠ home option).
	 *
	 * @since 3.22.1
	 *
	 * @covers \Parsely\UI\Site_Health::check_site_id
	 * @uses \Parsely\Parsely::get_settings_url
	 * @uses \Parsely\Parsely::site_id_is_missing
	 */
	public function test_check_site_id_uses_admin_url_for_subdirectory_install(): void {
		update_option( 'siteurl', 'http://example.org/wordpress' );

		// Re-instantiate so that get_settings_url() picks up the updated siteurl.
		self::$site_health = new Site_Health( new Parsely() );

		// Remove the Site ID to trigger the "critical" branch that renders the link.
		self::set_options( array( 'apikey' => '' ) );

		$tests = self::$site_health->check_site_id( array( 'direct' => array() ) );

		// Assert the expected structure before drilling into it. This also
		// narrows the types for static analysis.
		self::assertIsArray( $tests['direct'] );
		self::assertIsArray( $tests['direct']['parsely'] );
		self::assertIsCallable( $tests['direct']['parsely']['test'] );

		/** @var array{actions?: string} $result */
		$result = ( $tests['direct']['parsely']['test'] )();

		self::assertStringContainsString(
			'http://example.org/wordpress/wp-admin/admin.php?page=parsely-settings',
			$result['actions'] ?? '',
			'The actions link must reflect the subdirectory admin URL.'
		);
		self::assertStringNotContainsString(
			'href="/wp-admin/',
			$result['actions'] ?? '',
			'The actions link must not contain a hardcoded root /wp-admin/ path.'
		);
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
		self::assertSame( 'Parse.ly Options', $parsely_health_info['label'] );
		self::assertSame( 'Shows the options stored in the database used by the wp-parsely plugin.', $parsely_health_info['description'] );
		self::assertTrue( $parsely_health_info['show_count'] );
		self::assertArrayHasKey( 'fields', $parsely_health_info );
	}
}

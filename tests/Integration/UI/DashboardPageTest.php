<?php
/**
 * Integration Tests: wp-admin Dashboard page
 *
 * @package Parsely\Tests\UI
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Parsely\Parsely;
use Parsely\Permissions;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Dashboard_Page;

/**
 * Integration Tests for the plugin's wp-admin Dashboard page.
 *
 * @since 3.26.0
 */
final class DashboardPageTest extends TestCase {
	/**
	 * Verifies that the inline scripts assign their data as string literals
	 * that keep its exact contents.
	 *
	 * @since 3.26.0
	 *
	 * @covers \Parsely\UI\Dashboard_Page::inject_content_helper_permissions
	 * @covers \Parsely\UI\Dashboard_Page::inject_traffic_boost_settings
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Permissions::get_pch_permissions_json
	 * @uses \Parsely\UI\Dashboard_Page::__construct
	 *
	 * @group ui
	 */
	public function test_inline_script_data_is_assigned_as_string_literals(): void {
		$parsely = new Parsely();
		$page    = new Dashboard_Page( $parsely );
		$handle  = 'parsely-dashboard-page';

		wp_register_script( $handle, 'https://example.org/dashboard-page.js', array(), '1', true );
		$this->get_private_method( Dashboard_Page::class, 'inject_content_helper_permissions' )->invoke( $page );
		$this->get_private_method( Dashboard_Page::class, 'inject_traffic_boost_settings' )->invoke( $page );

		$values = $this->get_inline_script_values( $handle );
		wp_deregister_script( $handle );

		self::assertSame(
			Permissions::get_pch_permissions_json( $parsely->get_options()['content_helper'] ),
			$values['wpParselyContentHelperPermissions'] ?? null
		);
		self::assertSame( '[]', $values['wpParselyContentHelperSettings'] ?? null );
	}
}

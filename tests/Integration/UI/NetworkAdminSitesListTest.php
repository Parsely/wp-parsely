<?php
/**
 * Integration Tests: Network Admin site list
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Network_Admin_Sites_List;
use WP_MS_Sites_List_Table;
use WP_Site;

/**
 * Integration Tests for the Network Admin site list.
 */
final class NetworkAdminSitesListTest extends TestCase {
	/**
	 * Holds an instance of Network_Admin_Sites_List.
	 *
	 * @var Network_Admin_Sites_List
	 */
	private static $sites_list;

	/**
	 * Holds an instance of WP_MS_Sites_List_Table.
	 *
	 * @var WP_MS_Sites_List_Table
	 */
	public $table;

	/**
	 * Skips all tests for non-multisite runs.
	 * Sets up an instance variable to hold a `WP_MS_Sites_List_Table` object.
	 */
	public function set_up(): void {
		parent::set_up();

		if ( ! is_multisite() ) {
			self::markTestSkipped();
		}

		$list_table = _get_list_table( 'WP_MS_Sites_List_Table', array( 'screen' => 'ms-sites' ) );
		if ( false !== $list_table ) {
			$this->table = $list_table;
		}

		self::$sites_list = new Network_Admin_Sites_List( new Parsely() );
	}

	/**
	 * Verifies that the custom column is included.
	 *
	 * @covers \Parsely\UI\Network_Admin_Sites_List::add_site_id_column
	 * @covers \Parsely\UI\Network_Admin_Sites_List::run
	 * @uses \Parsely\UI\Network_Admin_Sites_List::__construct
	 */
	public function test_site_id_column_is_present(): void {
		$columns = $this->table->get_columns();
		self::assertArrayNotHasKey( 'parsely-site-id', $columns );

		self::$sites_list->run();
		$columns = $this->table->get_columns();

		self::assertArrayHasKey( 'parsely-site-id', $columns );
		self::assertSame( 'Parse.ly Site ID', $columns['parsely-site-id'] );
	}

	/**
	 * Verifies that the custom column is populated with default data for no
	 * option and the Site ID when set.
	 *
	 * @covers \Parsely\UI\Network_Admin_Sites_List::populate_site_id_column
	 * @covers \Parsely\UI\Network_Admin_Sites_List::run
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\UI\Network_Admin_Sites_List::__construct
	 */
	public function test_site_id_column_is_correctly_printed(): void {
		$blog_id_with_site_id = self::factory()->blog->create();

		// Create a blog without a Site ID.
		self::factory()->blog->create();

		self::$sites_list->run();

		update_blog_option( $blog_id_with_site_id, Parsely::OPTIONS_KEY, array( 'apikey' => 'parselyrocks.example.com' ) );

		$this->table->prepare_items();

		self::assertCount( 3, $this->table->items, 'There should be the main site, the subsite with the Site ID set, and a subsite without.' );

		foreach ( $this->table->items as $site ) {
			self::assertInstanceOf( WP_Site::class, $site );

			ob_start();
			$this->table->column_default( $site->to_array(), 'parsely-site-id' );
			$site_id_col_value = ob_get_clean();

			if ( $blog_id_with_site_id === (int) $site->blog_id ) {
				self::assertSame(
					'parselyrocks.example.com',
					$site_id_col_value,
					'The Site ID was not printed and should have been.'
				);
			} else {
				self::assertSame(
					'<em>Parse.ly Site ID is missing</em>',
					$site_id_col_value,
					'The default value was not printed and should have been.'
				);
			}
		}
	}
}

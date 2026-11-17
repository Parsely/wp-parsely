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

		/** @var \WP_MS_Sites_List_Table|false $list_table */
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
		/** @var int $blog_id_with_site_id */
		$blog_id_with_site_id = self::factory()->blog->create();

		// Create a blog without a Site ID.
		self::factory()->blog->create();

		self::$sites_list->run();

		update_blog_option( $blog_id_with_site_id, Parsely::OPTIONS_KEY, array( 'apikey' => self::VALID_SITE_ID ) );

		$this->table->prepare_items();

		self::assertCount( 3, $this->table->items, 'There should be the main site, the subsite with the Site ID set, and a subsite without.' );

		foreach ( $this->table->items as $site ) {
			self::assertInstanceOf( WP_Site::class, $site );

			ob_start();
			$this->table->column_default( $site->to_array(), 'parsely-site-id' );
			$site_id_col_value = ob_get_clean();

			if ( $blog_id_with_site_id === (int) $site->blog_id ) {
				self::assertSame(
					self::VALID_SITE_ID,
					$site_id_col_value,
					'The Site ID was not printed and should have been.'
				);
			} else {
				self::assertSame(
					'—',
					$site_id_col_value,
					'The default value was not printed and should have been.'
				);
			}
		}
	}

	/**
	 * Verifies that the column header and the action link's text are escaped,
	 * so that markup in their translations is output as text.
	 *
	 * @since 3.26.0
	 *
	 * @covers \Parsely\UI\Network_Admin_Sites_List::add_action_link
	 * @covers \Parsely\UI\Network_Admin_Sites_List::add_site_id_column
	 * @uses \Parsely\Parsely::get_settings_url
	 * @uses \Parsely\UI\Network_Admin_Sites_List::generate_aria_label_for_blog_id
	 */
	public function test_column_header_and_action_link_text_are_escaped(): void {
		$this->set_current_user_to_admin();
		add_filter(
			'gettext_wp-parsely',
			function ( string $translation ): string {
				return "<strong>{$translation}</strong>";
			}
		);

		$columns = Network_Admin_Sites_List::add_site_id_column( array() );

		/** @var array<string, string> $actions */
		$actions = Network_Admin_Sites_List::add_action_link( array(), get_current_blog_id() );

		self::assertSame( '&lt;strong&gt;Parse.ly Site ID&lt;/strong&gt;', $columns['parsely-site-id'] ?? null );
		self::assertStringEndsWith( '>&lt;strong&gt;Parse.ly Settings&lt;/strong&gt;</a>', $actions['parsely-settings'] ?? '' );
	}
}

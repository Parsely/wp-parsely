<?php
/**
 * Parsely network settings page class
 *
 * @package Parsely
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely\UI;

use Parsely\Parsely;
use const Parsely\PARSELY_FILE;

/**
 * Render the network (multisite) wp-admin Parse.ly plugin settings page
 *
 * @since 3.2.0
 */
final class Settings_Page_Network {
	/**
	 * Instance of Parsely class.
	 *
	 * @var Parsely
	 */
	private $parsely;

	public $parsely_sites_table;

	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Register network settings page.
	 *
	 * @since 3.2.0
	 *
	 * @return void
	 */
	public function run(): void {
		add_action( 'network_admin_menu', array( $this, 'network_settings_sub_menu' ) );
	}

	/**
	 * Parse.ly settings page in WordPress network settings menu.
	 *
	 * @return void
	 */
	public function network_settings_sub_menu(): void {
		if ( ! current_user_can( Parsely::CAPABILITY ) ) {
			wp_die( esc_html__( 'You do not have sufficient permissions to access this page.', 'wp-parsely' ) );
		}

		$page_hook = add_submenu_page(
			'settings.php',
			__('Parse.ly Network Settings', 'wp-parsely'),
			__( 'Parse.ly (Network)', 'wp-parsely'),
			Parsely::CAPABILITY,
			Parsely::MENU_SLUG_NETWORK,
			array( $this, 'load_sites_table')
		);

		/*
		 * The $page_hook_suffix can be combined with the load-($page_hook) action hook
		 * https://codex.wordpress.org/Plugin_API/Action_Reference/load-(page)
		 *
		 * The callback below will be called when the respective page is loaded
		 */
		add_action( 'load-'.$page_hook, array( $this, 'load_sites_list_table_screen_options' ) );
	}

	public function load_sites_list_table_screen_options(): void {
		$arguments = array(
			'label'		=>	__( 'Users Per Page', 'wp-parsely' ),
			'default'	=>	5,
			'option'	=>	'users_per_page'
		);
		add_screen_option( 'per_page', $arguments );
		/*
		 * Instantiate the User List Table. Creating an instance here will allow the core WP_List_Table class to automatically
		 * load the table columns in the screen options panel
		 */
		$this->parsely_sites_table = new Parsely_Sites_Table( $this->parsely );
	}

	public function load_sites_table(): void {
		// query, filter, and sort the data
		$this->parsely_sites_table->prepare_items();

		// render the List Table
		include plugin_dir_path( PARSELY_FILE ) . 'views/parsely-settings-network.php';
	}
}

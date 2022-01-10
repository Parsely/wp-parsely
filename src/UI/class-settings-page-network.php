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
		// Priority 11 to run after `network_admin_menu` in `wp-parsely.php`.
		add_action( 'network_admin_menu', array( $this, 'network_settings_sub_menu' ), 11 );
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
			__( 'Parse.ly Network Settings', 'wp-parsely' ),
			__( 'Parse.ly (Network)', 'wp-parsely' ),
			Parsely::CAPABILITY,
			Parsely::MENU_SLUG_NETWORK,
			array( $this, 'load_sites_table' )
		);

		add_action( 'load-' . $page_hook, array( $this, 'load_sites_list_table_screen_options' ) );
	}

	public function load_sites_list_table_screen_options(): void {
		$arguments = array(
			'label'   => __( 'Sites Per Page', 'wp-parsely' ),
			'default' => 25,
			'option'  => 'sites_per_page',
		);
		add_screen_option( 'per_page', $arguments );

		$this->parsely_sites_table = new Parsely_Sites_Table( $this->parsely );
	}

	public function load_sites_table(): void {
		$this->parsely_sites_table->prepare_items();
		include plugin_dir_path( PARSELY_FILE ) . 'views/parsely-settings-network.php';
	}
}

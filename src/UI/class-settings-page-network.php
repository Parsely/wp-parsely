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
		add_submenu_page(
			'settings.php',
			__('Parse.ly Network Settings', 'wp-parsely'),
			__( 'Parse.ly (Network)', 'wp-parsely'),
			Parsely::CAPABILITY,
			Parsely::MENU_SLUG_NETWORK,
			array( $this, 'display_settings')
		);
	}

	/**
	 * Parse.ly network settings screen.
	 *
	 * @return void
	 */
	public function display_settings(): void {
		if ( ! current_user_can( Parsely::CAPABILITY ) ) {
			wp_die( esc_html__( 'You do not have sufficient permissions to access this page.', 'wp-parsely' ) );
		}

		$parsely_network_sites = array();
		foreach (get_sites() as $site) {
			switch_to_blog($site->blog_id);
			$parsely_network_sites[] = array(
				'blog_id' => $site->blog_id,
				'site_id' => $site->site_id,
				'path' => $site->path,
				'api_key_set' => $this->parsely->api_key_is_set(),
			);
			restore_current_blog();
		}

		include plugin_dir_path( PARSELY_FILE ) . 'views/parsely-settings-network.php';
	}
}

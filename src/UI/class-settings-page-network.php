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
		if ( is_multisite() ) {
			add_action( 'admin_menu', 'network_settings_sub_menu' );
		}
	}

	/**
	 * Parse.ly settings page in WordPress network settings menu.
	 *
	 * @return void
	 */
	public function network_settings_sub_menu(): void {
		add_options_page(
			__('Parse.ly Network Settings', 'wp-parsely'),
			__( 'Parse.ly (Network)', 'wp-parsely'),
			Parsely::CAPABILITY,
			Parsely::MENU_SLUG_NETWORK,
			array( $this, 'display_settings')
		);
	}
}

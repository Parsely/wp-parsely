<?php
/**
 * UI: Dashboard page class
 *
 * @package Parsely
 * @since   3.18.0
 */

declare(strict_types=1);

namespace Parsely\UI;

use Parsely\Parsely;
use Parsely\Utils\Utils;

use const Parsely\PARSELY_FILE;

/**
 * Renders the plugin's dashboard page.
 *
 * @since 3.18.0
 */
final class Dashboard_Page {
	/**
	 * Instance of Parsely class.
	 *
	 * @var Parsely
	 */
	private $parsely;

	/**
	 * Constructor.
	 *
	 * @since 3.18.0
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Registers the dashboard page.
	 *
	 * @since 3.18.0
	 */
	public function run(): void {
		add_action( 'admin_menu', array( $this, 'add_dashboard_page_to_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_dashboard_page_scripts' ) );
	}

	/**
	 * Adds the dashboard page to the admin menu.
	 *
	 * @since 3.18.0
	 */
	public function add_dashboard_page_to_menu(): void {
		add_menu_page(
			'Parse.ly Dashboard Page', // Page title.
			'Parse.ly',                // Menu title.
			'manage_options',          // Capability.
			'parsely-dashboard-page',  // Menu slug.
			array( $this, 'add_dashboard_page_placeholder' ), // Callback function.
			'dashicons-admin-generic', // Icon URL.
			30                         // Position.
		);
	}

	/**
	 * Adds a placeholder for the dashboard page to render into.
	 *
	 * @since 3.18.0
	 */
	public function add_dashboard_page_placeholder(): void {
		echo '<div id="parsely-dashboard-page"></div>';
	}

	/**
	 * Enqueues all needed scripts and styles for the dashboard page.
	 *
	 * @since 3.18.0
	 *
	 * @param ?string $hook_suffix The current page being loaded.
	 */
	public function enqueue_dashboard_page_scripts( ?string $hook_suffix ): void {
		// Only load the scripts on the dashboard page.
		if ( 'toplevel_page_parsely-dashboard-page' !== $hook_suffix ) {
			return;
		}

		$asset_info       = Utils::get_asset_info( 'build/content-helper/dashboard-page.asset.php' );
		$built_assets_url = plugin_dir_url( PARSELY_FILE ) . '/build/content-helper/';

		wp_enqueue_script(
			'parsely-dashboard-page',
			$built_assets_url . 'dashboard-page.js',
			$asset_info['dependencies'],
			$asset_info['version'],
			true
		);

		wp_enqueue_style(
			'parsely-dashboard-page',
			$built_assets_url . 'dashboard-page.css',
			$asset_info['dependencies'],
			$asset_info['version']
		);
	}
}

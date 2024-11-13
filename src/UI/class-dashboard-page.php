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
use Parsely\Permissions;
use Parsely\Utils\Utils;
use WP_REST_Request;

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
	 * @since 3.18.0
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
		add_filter( 'parent_file', array( $this, 'fix_submenu_highlighting' ) );
	}

	/**
	 * Adds the dashboard page to the admin menu.
	 *
	 * @since 3.18.0
	 */
	public function add_dashboard_page_to_menu(): void {
		// Base64-encoded version of leaf-icon.tsx with size of 20 and fill of #1d2327.
		// <svg width="20" height="20" viewBox="0 0 60 65" xmlns="http://www.w3.org/2000/svg"><path fill="#1d2327" d="M23.72,51.53c0-.18,0-.34-.06-.52a13.11,13.11,0,0,0-2.1-5.53A14.74,14.74,0,0,0,19.12,43c-.27-.21-.5-.11-.51.22l-.24,3.42c0,.33-.38.35-.49,0l-1.5-4.8a1.4,1.4,0,0,0-.77-.78,23.91,23.91,0,0,0-3.1-.84c-1.38-.24-3.39-.39-3.39-.39-.34,0-.45.21-.25.49l2.06,3.76c.2.27,0,.54-.29.33l-4.51-3.6a3.68,3.68,0,0,0-2.86-.48c-1,.16-2.44.46-2.44.46a.68.68,0,0,0-.39.25.73.73,0,0,0-.14.45S.41,43,.54,44a3.63,3.63,0,0,0,1.25,2.62L6.48,50c.28.2.09.49-.23.37l-4.18-.94c-.32-.12-.5,0-.4.37,0,0,.69,1.89,1.31,3.16a24,24,0,0,0,1.66,2.74,1.34,1.34,0,0,0,1,.52l5,.13c.33,0,.41.38.1.48L7.51,58c-.31.1-.34.35-.07.55a14.29,14.29,0,0,0,3.05,1.66,13.09,13.09,0,0,0,5.9.5,25.13,25.13,0,0,0,4.34-1,9.55,9.55,0,0,1-.08-1.2,9.32,9.32,0,0,1,3.07-6.91"></path><path fill="#1d2327" d="M59.7,41.53a.73.73,0,0,0-.14-.45.68.68,0,0,0-.39-.25s-1.43-.3-2.44-.46a3.64,3.64,0,0,0-2.86.48l-4.51,3.6c-.26.21-.49-.06-.29-.33l2.06-3.76c.2-.28.09-.49-.25-.49,0,0-2,.15-3.39.39a23.91,23.91,0,0,0-3.1.84,1.4,1.4,0,0,0-.77.78l-1.5,4.8c-.11.32-.48.3-.49,0l-.24-3.42c0-.33-.24-.43-.51-.22a14.74,14.74,0,0,0-2.44,2.47A13.11,13.11,0,0,0,36.34,51c0,.18,0,.34-.06.52a9.26,9.26,0,0,1,3,8.1,24.1,24.1,0,0,0,4.34,1,13.09,13.09,0,0,0,5.9-.5,14.29,14.29,0,0,0,3.05-1.66c.27-.2.24-.45-.07-.55l-3.22-1.17c-.31-.1-.23-.47.1-.48l5-.13a1.38,1.38,0,0,0,1-.52A24.6,24.6,0,0,0,57,52.92c.61-1.27,1.31-3.16,1.31-3.16.1-.33-.08-.49-.4-.37l-4.18.94c-.32.12-.51-.17-.23-.37l4.69-3.34A3.63,3.63,0,0,0,59.46,44c.13-1,.24-2.47.24-2.47"></path><path fill="#1d2327" d="M46.5,25.61c0-.53-.35-.72-.8-.43l-4.86,2.66c-.45.28-.56-.27-.23-.69l4.66-6.23a2,2,0,0,0,.28-1.68,36.51,36.51,0,0,0-2.19-4.89,34,34,0,0,0-2.81-3.94c-.33-.41-.74-.35-.91.16l-2.28,5.68c-.16.5-.6.48-.59-.05l.28-8.93a2.54,2.54,0,0,0-.66-1.64S35,4.27,33.88,3.27,30.78.69,30.78.69a1.29,1.29,0,0,0-1.54,0s-1.88,1.49-3.12,2.59-2.48,2.35-2.48,2.35A2.5,2.5,0,0,0,23,7.27l.27,8.93c0,.53-.41.55-.58.05l-2.29-5.69c-.17-.5-.57-.56-.91-.14a35.77,35.77,0,0,0-3,4.2,35.55,35.55,0,0,0-2,4.62,2,2,0,0,0,.27,1.67l4.67,6.24c.33.42.23,1-.22.69l-4.87-2.66c-.45-.29-.82-.1-.82.43a18.6,18.6,0,0,0,.83,5.07,20.16,20.16,0,0,0,5.37,7.77c3.19,3,5.93,7.8,7.45,11.08A9.6,9.6,0,0,1,30,49.09a9.31,9.31,0,0,1,2.86.45c1.52-3.28,4.26-8.11,7.44-11.09a20.46,20.46,0,0,0,5.09-7,19,19,0,0,0,1.11-5.82"></path><path fill="#1d2327" d="M36.12,58.44A6.12,6.12,0,1,1,30,52.32a6.11,6.11,0,0,1,6.12,6.12"></path></svg>.
		$icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA2MCA2NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjMWQyMzI3IiBkPSJNMjMuNzIsNTEuNTNjMC0uMTgsMC0uMzQtLjA2LS41MmExMy4xMSwxMy4xMSwwLDAsMC0yLjEtNS41M0ExNC43NCwxNC43NCwwLDAsMCwxOS4xMiw0M2MtLjI3LS4yMS0uNS0uMTEtLjUxLjIybC0uMjQsMy40MmMwLC4zMy0uMzguMzUtLjQ5LDBsLTEuNS00LjhhMS40LDEuNCwwLDAsMC0uNzctLjc4LDIzLjkxLDIzLjkxLDAsMCwwLTMuMS0uODRjLTEuMzgtLjI0LTMuMzktLjM5LTMuMzktLjM5LS4zNCwwLS40NS4yMS0uMjUuNDlsMi4wNiwzLjc2Yy4yLjI3LDAsLjU0LS4yOS4zM2wtNC41MS0zLjZhMy42OCwzLjY4LDAsMCwwLTIuODYtLjQ4Yy0xLC4xNi0yLjQ0LjQ2LTIuNDQuNDZhLjY4LjY4LDAsMCwwLS4zOS4yNS43My43MywwLDAsMC0uMTQuNDVTLjQxLDQzLC41NCw0NGEzLjYzLDMuNjMsMCwwLDAsMS4yNSwyLjYyTDYuNDgsNTBjLjI4LjIuMDkuNDktLjIzLjM3bC00LjE4LS45NGMtLjMyLS4xMi0uNSwwLS40LjM3LDAsMCwuNjksMS44OSwxLjMxLDMuMTZhMjQsMjQsMCwwLDAsMS42NiwyLjc0LDEuMzQsMS4zNCwwLDAsMCwxLC41Mmw1LC4xM2MuMzMsMCwuNDEuMzguMS40OEw3LjUxLDU4Yy0uMzEuMS0uMzQuMzUtLjA3LjU1YTE0LjI5LDE0LjI5LDAsMCwwLDMuMDUsMS42NiwxMy4wOSwxMy4wOSwwLDAsMCw1LjkuNSwyNS4xMywyNS4xMywwLDAsMCw0LjM0LTEsOS41NSw5LjU1LDAsMCwxLS4wOC0xLjIsOS4zMiw5LjMyLDAsMCwxLDMuMDctNi45MSI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxZDIzMjciIGQ9Ik01OS43LDQxLjUzYS43My43MywwLDAsMC0uMTQtLjQ1LjY4LjY4LDAsMCwwLS4zOS0uMjVzLTEuNDMtLjMtMi40NC0uNDZhMy42NCwzLjY0LDAsMCwwLTIuODYuNDhsLTQuNTEsMy42Yy0uMjYuMjEtLjQ5LS4wNi0uMjktLjMzbDIuMDYtMy43NmMuMi0uMjguMDktLjQ5LS4yNS0uNDksMCwwLTIsLjE1LTMuMzkuMzlhMjMuOTEsMjMuOTEsMCwwLDAtMy4xLjg0LDEuNCwxLjQsMCwwLDAtLjc3Ljc4bC0xLjUsNC44Yy0uMTEuMzItLjQ4LjMtLjQ5LDBsLS4yNC0zLjQyYzAtLjMzLS4yNC0uNDMtLjUxLS4yMmExNC43NCwxNC43NCwwLDAsMC0yLjQ0LDIuNDdBMTMuMTEsMTMuMTEsMCwwLDAsMzYuMzQsNTFjMCwuMTgsMCwuMzQtLjA2LjUyYTkuMjYsOS4yNiwwLDAsMSwzLDguMSwyNC4xLDI0LjEsMCwwLDAsNC4zNCwxLDEzLjA5LDEzLjA5LDAsMCwwLDUuOS0uNSwxNC4yOSwxNC4yOSwwLDAsMCwzLjA1LTEuNjZjLjI3LS4yLjI0LS40NS0uMDctLjU1bC0zLjIyLTEuMTdjLS4zMS0uMS0uMjMtLjQ3LjEtLjQ4bDUtLjEzYTEuMzgsMS4zOCwwLDAsMCwxLS41MkEyNC42LDI0LjYsMCwwLDAsNTcsNTIuOTJjLjYxLTEuMjcsMS4zMS0zLjE2LDEuMzEtMy4xNi4xLS4zMy0uMDgtLjQ5LS40LS4zN2wtNC4xOC45NGMtLjMyLjEyLS41MS0uMTctLjIzLS4zN2w0LjY5LTMuMzRBMy42MywzLjYzLDAsMCwwLDU5LjQ2LDQ0Yy4xMy0xLC4yNC0yLjQ3LjI0LTIuNDciPjwvcGF0aD48cGF0aCBmaWxsPSIjMWQyMzI3IiBkPSJNNDYuNSwyNS42MWMwLS41My0uMzUtLjcyLS44LS40M2wtNC44NiwyLjY2Yy0uNDUuMjgtLjU2LS4yNy0uMjMtLjY5bDQuNjYtNi4yM2EyLDIsMCwwLDAsLjI4LTEuNjgsMzYuNTEsMzYuNTEsMCwwLDAtMi4xOS00Ljg5LDM0LDM0LDAsMCwwLTIuODEtMy45NGMtLjMzLS40MS0uNzQtLjM1LS45MS4xNmwtMi4yOCw1LjY4Yy0uMTYuNS0uNi40OC0uNTktLjA1bC4yOC04LjkzYTIuNTQsMi41NCwwLDAsMC0uNjYtMS42NFMzNSw0LjI3LDMzLjg4LDMuMjcsMzAuNzguNjksMzAuNzguNjlhMS4yOSwxLjI5LDAsMCwwLTEuNTQsMHMtMS44OCwxLjQ5LTMuMTIsMi41OS0yLjQ4LDIuMzUtMi40OCwyLjM1QTIuNSwyLjUsMCwwLDAsMjMsNy4yN2wuMjcsOC45M2MwLC41My0uNDEuNTUtLjU4LjA1bC0yLjI5LTUuNjljLS4xNy0uNS0uNTctLjU2LS45MS0uMTRhMzUuNzcsMzUuNzcsMCwwLDAtMyw0LjIsMzUuNTUsMzUuNTUsMCwwLDAtMiw0LjYyLDIsMiwwLDAsMCwuMjcsMS42N2w0LjY3LDYuMjRjLjMzLjQyLjIzLDEtLjIyLjY5bC00Ljg3LTIuNjZjLS40NS0uMjktLjgyLS4xLS44Mi40M2ExOC42LDE4LjYsMCwwLDAsLjgzLDUuMDcsMjAuMTYsMjAuMTYsMCwwLDAsNS4zNyw3Ljc3YzMuMTksMyw1LjkzLDcuOCw3LjQ1LDExLjA4QTkuNiw5LjYsMCwwLDEsMzAsNDkuMDlhOS4zMSw5LjMxLDAsMCwxLDIuODYuNDVjMS41Mi0zLjI4LDQuMjYtOC4xMSw3LjQ0LTExLjA5YTIwLjQ2LDIwLjQ2LDAsMCwwLDUuMDktNywxOSwxOSwwLDAsMCwxLjExLTUuODIiPjwvcGF0aD48cGF0aCBmaWxsPSIjMWQyMzI3IiBkPSJNMzYuMTIsNTguNDRBNi4xMiw2LjEyLDAsMSwxLDMwLDUyLjMyYTYuMTEsNi4xMSwwLDAsMSw2LjEyLDYuMTIiPjwvcGF0aD48L3N2Zz4=';

		add_menu_page(
			'Parse.ly Dashboard Page',
			'Parse.ly',
			Parsely::CAPABILITY, // phpcs:ignore WordPress.WP.Capabilities.Undetermined
			'parsely-dashboard-page',
			array( $this, 'add_dashboard_page_placeholder' ),
			$icon,
			30
		);

		// Register the subpages.
		add_submenu_page(
			'parsely-dashboard-page',
			'Parse.ly Dashboard Page',
			'Dashboard',
			Parsely::CAPABILITY, // phpcs:ignore WordPress.WP.Capabilities.Undetermined
			'parsely-dashboard-page',
			'__return_null'
		);

		add_submenu_page(
			'parsely-dashboard-page',
			'Parse.ly Traffic Boost',
			'Traffic Boost',
			Parsely::CAPABILITY, // phpcs:ignore WordPress.WP.Capabilities.Undetermined
			'parsely-dashboard-page#/traffic-boost',
			'__return_null'
		);

		add_submenu_page(
			'parsely-dashboard-page',
			'Parse.ly Settings',
			'Settings',
			Parsely::CAPABILITY, // phpcs:ignore WordPress.WP.Capabilities.Undetermined
			'parsely-dashboard-page#/settings',
			'__return_null'
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
	 * Fixes the highlighting of the submenu items.
	 *
	 * This removes the highlighting from the submenu items when the dashboard page is active, so it can
	 * later be added by the React app.
	 *
	 * @since 3.18.0
	 *
	 * @param string $parent_file The parent file.
	 * @return string The parent file.
	 */
	public function fix_submenu_highlighting( string $parent_file ): string {
		global $submenu_file, $current_screen;

		if ( 'toplevel_page_parsely-dashboard-page' === $current_screen->base ) {
			// phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
			$submenu_file = 'non-existent-slug';
		}

		return $parent_file;
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

		// Inline scripts must be injected after enqueueing the main script.
		$this->inject_content_helper_permissions();
		$this->inject_traffic_boost_settings();

		wp_enqueue_style(
			'parsely-dashboard-page',
			$built_assets_url . 'dashboard-page.css',
			array(),
			$asset_info['version']
		);
	}

	/**
	 * Injects Content Helper permissions into the dashboard page.
	 *
	 * @since 3.18.0
	 */
	protected function inject_content_helper_permissions(): void {
		$permissions_json = Permissions::get_pch_permissions_json(
			$this->parsely->get_options()['content_helper']
		);

		wp_add_inline_script(
			'parsely-dashboard-page',
			"window.wpParselyContentHelperPermissions = '$permissions_json';",
			'before'
		);
	}

	/**
	 * Injects Traffic Boost settings into the dashboard page.
	 *
	 * @since 3.18.0
	 */
	protected function inject_traffic_boost_settings(): void {
		$settings = '';

		if ( ! defined( 'INTEGRATION_TESTS_RUNNING' ) ) {
			$settings = rest_do_request(
				new WP_REST_Request(
					'GET',
					'/wp-parsely/v2/settings/traffic-boost'
				)
			)->get_data();
		}

		if ( ! is_array( $settings ) ) {
			$settings = array();
		}

		$settings = wp_json_encode( $settings );

		wp_add_inline_script(
			'parsely-dashboard-page',
			"window.wpParselyContentHelperSettings = '$settings';",
			'before'
		);
	}
}

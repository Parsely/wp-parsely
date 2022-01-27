<?php
/**
 * Parse.ly
 *
 * @package      Parsely\wp-parsely
 * @author       Parse.ly
 * @copyright    2012 Parse.ly
 * @license      GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Parse.ly
 * Plugin URI:        https://www.parse.ly/help/integration/wordpress
 * Description:       This plugin makes it a snap to add Parse.ly tracking code to your WordPress blog.
 * Version:           3.1.0
 * Author:            Parse.ly
 * Author URI:        https://www.parse.ly
 * Text Domain:       wp-parsely
 * License:           GPL-2.0-or-later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * GitHub Plugin URI: https://github.com/Parsely/wp-parsely
 * Requires PHP:      7.1
 * Requires WP:       5.0.0
 */

declare(strict_types=1);

namespace Parsely;

use Parsely\Integrations\Amp;
use Parsely\Integrations\Facebook_Instant_Articles;
use Parsely\Integrations\Google_Web_Stories;
use Parsely\Integrations\Integrations;
use Parsely\UI\Admin_Bar;
use Parsely\UI\Admin_Warning;
use Parsely\UI\Plugins_Actions;
use Parsely\UI\Network_Admin_Sites_List;
use Parsely\UI\Recommended_Widget;
use Parsely\UI\Row_Actions;
use Parsely\UI\Settings_Page;

if ( class_exists( Parsely::class ) ) {
	return;
}

const PARSELY_VERSION = '3.1.0';
const PARSELY_FILE    = __FILE__;

require __DIR__ . '/src/class-parsely.php';
require __DIR__ . '/src/class-rest.php';
require __DIR__ . '/src/class-scripts.php';
require __DIR__ . '/src/class-dashboard-link.php';
require __DIR__ . '/src/UI/class-admin-bar.php';

add_action( 'plugins_loaded', __NAMESPACE__ . '\\parsely_initialize_plugin' );
/**
 * Register the basic classes to initialize the plugin.
 *
 * @return void
 */
function parsely_initialize_plugin(): void {
	$GLOBALS['parsely'] = new Parsely();
	$GLOBALS['parsely']->run();

	$rest = new Rest( $GLOBALS['parsely'] );
	$rest->run();

	$scripts = new Scripts( $GLOBALS['parsely'] );
	$scripts->run();

	$admin_bar = new Admin_Bar( $GLOBALS['parsely'] );
	$admin_bar->run();
}

require __DIR__ . '/src/UI/class-admin-warning.php';
require __DIR__ . '/src/UI/class-plugins-actions.php';
require __DIR__ . '/src/UI/class-row-actions.php';

add_action( 'admin_init', __NAMESPACE__ . '\\parsely_admin_init_register' );
/**
 * Register the Parse.ly wp-admin warnings, plugin actions and row actions.
 *
 * @return void
 */
function parsely_admin_init_register(): void {
	$admin_warning = new Admin_Warning( $GLOBALS['parsely'] );
	$admin_warning->run();

	$plugins_actions = new Plugins_Actions();
	$plugins_actions->run();

	$row_actions = new Row_Actions( $GLOBALS['parsely'] );
	$row_actions->run();
}

require __DIR__ . '/src/UI/class-settings-page.php';

add_action( '_admin_menu', __NAMESPACE__ . '\\parsely_admin_menu_register' );
/**
 * Register the Parse.ly wp-admin settings page.
 *
 * @return void
 */
function parsely_admin_menu_register(): void {
	$settings_page = new Settings_Page( $GLOBALS['parsely'] );
	$settings_page->run();
}

require __DIR__ . '/src/UI/class-network-admin-sites-list.php';

add_action( 'admin_init', __NAMESPACE__ . '\\admin_init_network_sites_list' );
/**
 * Register the additions the Multisite Network Admin Sites List table.
 *
 * @return void
 */
function admin_init_network_sites_list(): void {
	$network_admin_sites_list = new Network_Admin_Sites_List( $GLOBALS['parsely'] );
	$network_admin_sites_list->run();
}

require __DIR__ . '/src/UI/class-recommended-widget.php';

add_action( 'widgets_init', __NAMESPACE__ . '\\parsely_recommended_widget_register' );
/**
 * Register the Parse.ly Recommended widget.
 *
 * @return void
 */
function parsely_recommended_widget_register(): void {
	register_widget( Recommended_Widget::class );
}

require __DIR__ . '/src/Integrations/class-integration.php';
require __DIR__ . '/src/Integrations/class-integrations.php';
require __DIR__ . '/src/Integrations/class-amp.php';
require __DIR__ . '/src/Integrations/class-facebook-instant-articles.php';
require __DIR__ . '/src/Integrations/class-google-web-stories.php';

add_action( 'init', __NAMESPACE__ . '\\parsely_integrations' );
/**
 * Instantiate Integrations collection and register built-in integrations.
 *
 * @since 2.6.0
 *
 * @return Integrations
 */
function parsely_integrations(): Integrations {
	$parsely_integrations = new Integrations();
	$parsely_integrations->register( 'amp', Amp::class );
	$parsely_integrations->register( 'fbia', Facebook_Instant_Articles::class );
	$parsely_integrations->register( 'webstories', new Google_Web_Stories( $GLOBALS['parsely'] ) );
	$parsely_integrations = apply_filters( 'wp_parsely_add_integration', $parsely_integrations );
	$parsely_integrations->integrate();

	return $parsely_integrations;
}

/**
 * Helper function to determine if this plugin is activated "network-wide" for a Multisite instance.
 *
 * @return boolean
 */
function is_network_active(): bool {
	return is_multisite() && is_plugin_active_for_network( _plugin_basename() );
}

/**
 * Get the relative path to the plugin entry file for use in e.g. specifying the plugin on the plugins list admin page.
 * This is a wrapper on plugin_basename which caches the calculated result to avoid repeating the underlying work.
 *
 * @return string The cached result of the plugin basename.
 */
function _plugin_basename(): string {
	static $basename;

	if ( isset( $basename ) ) {
		return $basename;
	}

	$basename = plugin_basename( PARSELY_FILE );
	return $basename;
}

/**
 * When this plugin was activated, redirect to the most appropriate settings page.
 * If the plugin was activated network-wide for a multisite, the destination is the sites list.
 * Otherwise, this will redirect to the wp-parsely settings URL for the current site.
 *
 * @param string $plugin The "basename" of the activated plugin.
 * @param bool   $network_wide Was the plugin was network activated.
 * @return void
 */
function redirect_to_settings_or_sites_list_on_activate( $plugin, $network_wide ) {
	if (
		_plugin_basename() !== $plugin ||
		( defined( 'WP_CLI' ) && WP_CLI ) ||
		( defined( 'REST_REQUEST' ) && REST_REQUEST ) ||
		( defined( 'XMLRPC_REQUEST' ) && XMLRPC_REQUEST )
	) {
		return;
	}

	$destination = $network_wide ? network_admin_url( 'sites.php' ) : Parsely::get_settings_url();
	wp_safe_redirect( $destination );
	exit;
}
add_action( 'activated_plugin', __NAMESPACE__ . '\\redirect_to_sites_list_on_network_activate', 10, 2 );

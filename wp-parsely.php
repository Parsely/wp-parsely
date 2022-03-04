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
 * Version:           3.1.2
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

use Parsely\Endpoints\Related_API_Proxy;
use Parsely\Integrations\Amp;
use Parsely\Integrations\Facebook_Instant_Articles;
use Parsely\Integrations\Google_Web_Stories;
use Parsely\Integrations\Integrations;
use Parsely\RemoteAPI\Cached_Proxy;
use Parsely\RemoteAPI\Related_Proxy;
use Parsely\RemoteAPI\WordPress_Cache;
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

const PARSELY_VERSION = '3.1.2';
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
require __DIR__ . '/src/UI/class-network-admin-sites-list.php';

add_action( 'init', __NAMESPACE__ . '\\parsely_wp_admin_early_register' );
/**
 * Register the additions the Parse.ly wp-admin settings page and Multisite Network Admin Sites List table.
 *
 * @return void
 */
function parsely_wp_admin_early_register(): void {
	$settings_page = new Settings_Page( $GLOBALS['parsely'] );
	$settings_page->run();

	$network_admin_sites_list = new Network_Admin_Sites_List( $GLOBALS['parsely'] );
	$network_admin_sites_list->run();
}

require __DIR__ . '/src/RemoteAPI/interface-cache.php';
require __DIR__ . '/src/RemoteAPI/interface-proxy.php';
require __DIR__ . '/src/RemoteAPI/class-base-proxy.php';
require __DIR__ . '/src/RemoteAPI/class-cached-proxy.php';
require __DIR__ . '/src/RemoteAPI/class-related-proxy.php';
require __DIR__ . '/src/RemoteAPI/class-wordpress-cache.php';
require __DIR__ . '/src/Endpoints/class-related-api-proxy.php';

add_action( 'rest_api_init', __NAMESPACE__ . '\\rest_api_init_proxies' );
/**
 * Register REST Endpoints that act as a proxy to the Parse.ly API.
 * This is needed to get around a CORS issues with Firefox.
 *
 * @since 3.2.0
 *
 * @return void
 */
function rest_api_init_proxies(): void {
	$proxy        = new Related_Proxy( $GLOBALS['parsely'] );
	$cached_proxy = new Cached_Proxy( $proxy, new WordPress_Cache( $GLOBALS['wp_object_cache'] ) );
	$endpoint     = new Related_API_Proxy( $GLOBALS['parsely'], $cached_proxy );
	$endpoint->run();
}

require __DIR__ . '/src/blocks/recommendations/class-recommendations-block.php';
/**
 * Register the Recommendations Block.
 *
 * @return void
 */
function init_recommendations_block() {
	$recommendations_block = new Recommendations_Block();
	$recommendations_block->run();
}
add_action( 'init', __NAMESPACE__ . '\\init_recommendations_block' );

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
	$parsely_integrations->register( 'webstories', Google_Web_Stories::class );
	$parsely_integrations = apply_filters( 'wp_parsely_add_integration', $parsely_integrations );
	$parsely_integrations->integrate();

	return $parsely_integrations;
}

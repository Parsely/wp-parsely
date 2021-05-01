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
 * Version:           2.4.1
 * Author:            Parse.ly
 * Author URI:        https://www.parse.ly
 * Text Domain:       wp-parsely
 * License:           GPL-2.0-or-later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * GitHub Plugin URI: https://github.com/Parsely/wp-parsely
 * Requires PHP:      5.6
 * Requires WP:       4.0.0
 */

require 'src/class-parsely.php';

if ( class_exists( 'Parsely' ) ) {
	define( 'PARSELY_VERSION', Parsely::VERSION );
	$parsely = new Parsely();
}

require 'src/class-parsely-recommended-widget.php';

add_action( 'widgets_init', 'parsely_recommended_widget_register' );
/**
 * Register the Parse.ly Recommended widget.
 */
function parsely_recommended_widget_register() {
	register_widget( 'Parsely_Recommended_Widget' );
}

add_action( 'init', 'parsely_load_textdomain' );
/**
 * Load plugin textdomain.
 *
 * Only look for WP_LANG_DIR . '/plugins/wp-parsely-' . $locale . '.mo'.
 * WP_LANG_DIR is usually WP_CONTENT_DIR . '/languages/'.
 * No other fallback location is supported.
 *
 * This can be removed once minimum supported WordPress is 4.6 or later.
 *
 * @since 2.5.0
 */
function parsely_load_textdomain() {
	load_plugin_textdomain( 'wp-parsely' );
}

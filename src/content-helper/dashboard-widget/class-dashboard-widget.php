<?php
/**
 * PCH Dashboard Widget class
 *
 * @package Parsely
 * @since   3.7.0
 */

declare(strict_types=1);

namespace Parsely\Content_Helper;

use Parsely\RemoteAPI\Analytics_Posts_API;
use UnexpectedValueException;

use function Parsely\Utils\get_asset_info;

use const Parsely\PARSELY_FILE;

/**
 * Class that generates and manages the PCH Dashboard Widget.
 *
 * @since 3.7.0
 */
class Dashboard_Widget extends Content_Helper_Feature {
	/**
	 * Returns the feature's filter name.
	 *
	 * @since 3.9.0
	 *
	 * @return string The filter name.
	 */
	public static function get_feature_filter_name(): string {
		return self::get_global_filter_name() . '_dashboard_widget';
	}

	/**
	 * Returns the feature's script ID.
	 *
	 * @since 3.9.0
	 *
	 * @return string The script ID.
	 */
	public static function get_script_id(): string {
		return 'wp-parsely-dashboard-widget';
	}

	/**
	 * Returns the feature's style ID.
	 *
	 * @since 3.9.0
	 *
	 * @return string The style ID.
	 */
	public static function get_style_id(): string {
		return static::get_script_id();
	}

	/**
	 * Sets all the hooks that are needed in order to add the Dashboard Widget
	 * to the WordPress Dashboard.
	 *
	 * @since 3.7.0
	 */
	public function run(): void {
		// The should_be_enabled() function is not being used here, as
		// get_current_screen() is still null when this function is called.
		add_action( 'wp_dashboard_setup', array( $this, 'add_dashboard_widget' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	/**
	 * Returns whether the Dashboard Widget should be enabled.
	 *
	 * @since 3.9.0
	 *
	 * @return bool Whether the Widget should be enabled.
	 * @throws UnexpectedValueException If the current screen is null.
	 */
	public function should_be_enabled(): bool {
		// Widget should only appear on the WordPress Dashboard screen.
		$screen = get_current_screen();
		if ( null === $screen ) {
			throw new UnexpectedValueException( 'Error: Screen is null.', 1 );
		}
		if ( 'dashboard' !== $screen->id ) {
			return false;
		}

		// User should have enough capabilities for the widget to show.
		$posts_api = new Analytics_Posts_API( $GLOBALS['parsely'] );
		if ( ! $posts_api->is_user_allowed_to_make_api_call() ) {
			return false;
		}

		// Filters should resolve to true for the widget to show.
		if ( ! $this->is_enabled_by_filters() ) {
			return false;
		}

		return true;
	}

	/**
	 * Adds the Widget and its contents to the WordPress Dashboard.
	 *
	 * @since 3.7.0
	 */
	public function add_dashboard_widget(): void {
		if ( ! $this->should_be_enabled() ) {
			return;
		}

		wp_add_dashboard_widget(
			static::get_script_id(),
			__( 'Parse.ly Top Posts (Last 7 Days)', 'wp-parsely' ),
			'__return_empty_string' // Content will be populated by JavaScript.
		);
	}

	/**
	 * Enqueues the Dashboard Widget's assets.
	 *
	 * @since 3.7.0
	 */
	public function enqueue_assets(): void {
		if ( ! $this->should_be_enabled() ) {
			return;
		}

		$asset_php        = get_asset_info( 'build/content-helper/dashboard-widget.asset.php' );
		$built_assets_url = plugin_dir_url( PARSELY_FILE ) . 'build/content-helper/';

		wp_enqueue_script(
			static::get_script_id(),
			$built_assets_url . 'dashboard-widget.js',
			$asset_php['dependencies'],
			$asset_php['version'],
			true
		);

		wp_enqueue_style(
			static::get_style_id(),
			$built_assets_url . 'dashboard-widget.css',
			array(),
			$asset_php['version']
		);
	}
}

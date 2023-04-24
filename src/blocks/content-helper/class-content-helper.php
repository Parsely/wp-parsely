<?php
/**
 * PCH Editor Sidebar class
 *
 * @package Parsely
 * @since 3.5.0
 */

declare(strict_types=1);

namespace Parsely;

use Parsely\Content_Helper\Content_Helper_Feature;

use function Parsely\Utils\get_asset_info;

/**
 * Class that generates and manages the PCH Editor Sidebar.
 *
 * @since 3.5.0
 */
class Content_Helper extends Content_Helper_Feature {

	/**
	 * Returns the feature's filter name.
	 *
	 * @since 3.9.0
	 *
	 * @return string The filter name.
	 */
	public static function get_feature_filter_name(): string {
		return self::get_global_filter_name() . '_editor_sidebar';
	}

	/**
	 * Returns the feature's script ID.
	 *
	 * @since 3.9.0
	 *
	 * @return string The script ID.
	 */
	public static function get_script_id(): string {
		return 'wp-parsely-block-content-helper';
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
	 * Inserts the PCH Editor Sidebar assets.
	 *
	 * @since 3.5.0
	 */
	public function run(): void {
		if ( ! $this->can_enable_feature() ) {
			return;
		}

		$content_helper_asset = get_asset_info( 'build/content-helper.asset.php' );

		wp_enqueue_script(
			static::get_script_id(),
			plugin_dir_url( PARSELY_FILE ) . 'build/content-helper.js',
			$content_helper_asset['dependencies'],
			$content_helper_asset['version'],
			true
		);

		wp_enqueue_style(
			static::get_style_id(),
			plugin_dir_url( PARSELY_FILE ) . 'build/content-helper.css',
			array(),
			$content_helper_asset['version']
		);
	}
}

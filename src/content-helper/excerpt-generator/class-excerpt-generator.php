<?php
/**
 * Content Helper: Excerpt Generator feature class
 *
 * @package Parsely
 * @since   3.13.0
 */

declare(strict_types=1);

namespace Parsely\Content_Helper;

use Parsely\Parsely;
use Parsely\Permissions;

use Parsely\Utils\Utils;
use const Parsely\PARSELY_FILE;

/**
 * Content Helper: Excerpt Generator feature class
 *
 * @since 3.13.0
 */
class Excerpt_Generator extends Content_Helper_Feature {

	/**
	 * Constructor.
	 *
	 * @since 3.13.0
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Returns the feature's filter name.
	 *
	 * @since 3.13.0
	 *
	 * @return string The filter name.
	 */
	public static function get_feature_filter_name(): string {
		return self::get_global_filter_name() . '_excerpt_generator';
	}

	/**
	 * Returns the feature's script ID.
	 *
	 * @since 3.13.0
	 *
	 * @return string The script ID.
	 */
	public static function get_script_id(): string {
		return 'wp-parsely-content-helper-excerpt-generator';
	}

	/**
	 * Returns the feature's style ID.
	 *
	 * @since 3.13.0
	 *
	 * @return string The style ID.
	 */
	public static function get_style_id(): string {
		return static::get_script_id();
	}

	/**
	 * Inserts Content Helper Excerpt Generator inline scripts.
	 *
	 * @since 3.13.0
	 */
	public function run(): void {
		if ( ! $this->can_enable_feature() ) {
			return;
		}

		$asset_php        = Utils::get_asset_info( 'build/content-helper/excerpt-generator.asset.php' );
		$built_assets_url = plugin_dir_url( PARSELY_FILE ) . 'build/content-helper/';

		wp_enqueue_script(
			static::get_script_id(),
			$built_assets_url . 'excerpt-generator.js',
			$asset_php['dependencies'],
			$asset_php['version'],
			true
		);

		$this->inject_inline_scripts();

		wp_enqueue_style(
			static::get_style_id(),
			$built_assets_url . 'excerpt-generator.css',
			array(),
			$asset_php['version']
		);
	}

	/**
	 * Returns whether the feature can be enabled for the current user.
	 *
	 * @since 3.16.0
	 *
	 * @param bool ...$conditions Conditions that need to be met besides filters
	 *                            for the function to return true.
	 * @return bool Whether the feature can be enabled.
	 */
	protected function can_enable_feature( bool ...$conditions ): bool {
		if ( ! parent::can_enable_feature( ...$conditions ) ) {
			return false;
		}

		return Permissions::current_user_can_use_pch_feature(
			'excerpt_suggestions',
			$this->parsely->get_options()['content_helper'],
			get_the_ID()
		);
	}
}

<?php
/**
 * Recommendations_Block class file
 *
 * @package Parsely
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely;

/**
 * Recommendations_Block
 */
class Recommendations_Block {
	const MINIMUM_WORDPRESS_VERSION = '5.6';

	public function run() {
		global $wp_version;

		if ( ! apply_filters( 'wp_parsely_recommendations_block_enabled', false ) ) {
			// This block is behind a "feature flag" and it's not enabled. Bail.
			return;
		}

		self::register_block_and_assets();
	}

	/**
	 * Registers all block assets so that they can be enqueued through Gutenberg in
	 * the corresponding context.
	 */
	public static function register_block_and_assets() {
		$plugin_path = plugin_dir_path( PARSELY_FILE );
		$plugin_url = plugin_dir_url( PARSELY_FILE );

		$editor_asset_file = require $plugin_path . 'build/recommendations-edit.asset.php';

		wp_register_script(
			'wp-parsely-recommendations-block-editor',
			$plugin_url . 'build/recommendations-edit.js',
			$editor_asset_file['dependencies'],
			$editor_asset_file['version'],
			true
		);

		$script_asset_file = require $plugin_path . 'build/recommendations.asset.php';
		wp_register_script(
			'wp-parsely-recommendations-block',
			$plugin_url . 'build/recommendations.js',
			array_merge( $script_asset_file['dependencies'], array( 'wp-parsely-api' ) ),
			$script_asset_file['version'],
			true
		);

		wp_register_style(
			'wp-parsely-recommendations-block',
			$plugin_url . 'build/style-recommendations-edit.css',
			array(),
			Parsely::get_asset_cache_buster()
		);

		register_block_type(
			'wp-parsely/recommendations',
			array(
				'editor_script'   => 'wp-parsely-recommendations-block-editor',
				'render_callback' => __CLASS__ . '::render_callback',
				'script'          => 'wp-parsely-recommendations-block',
				'style'           => 'wp-parsely-recommendations-block',
				'supports'        => array(
					'html' => false,
				),
				'attributes'      => array(
					'boost'        => array(
						'type'    => 'string',
						'default' => 'views',
					),
					'imagestyle'   => array(
						'type'    => 'string',
						'default' => 'original',
					),
					'layoutstyle'  => array(
						'type'    => 'string',
						'default' => 'grid',
					),
					'limit'        => array(
						'type'    => 'number',
						'default' => 3,
					),
					'personalized' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'showimages'   => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'sort'         => array(
						'type'    => 'string',
						'default' => 'score',
					),
					'tag'          => array(
						'type' => 'string',
					),
					'title'        => array(
						'type'    => 'string',
						'default' => __( 'Related Content', 'wp-parsely' ),
					),
				),
			)
		);
	}

	/**
	 * The Server-side render_callback for the wp-parsely/recommendations block.
	 *
	 * @uses wp_validate_redirect If the stored results aren't considered "safe" by this function, they're skipped.
	 * @param array $attributes The user-controlled settings for this block.
	 * @return string
	 */
	public static function render_callback( $attributes ) {
		ob_start();
		?>
<section
		<?php
		echo wp_kses_post( get_block_wrapper_attributes() );
		?>

	data-boost="<?php echo esc_attr( $attributes['boost'] ); ?>"
	data-layoutstyle="<?php echo esc_attr( $attributes['layoutstyle'] ); ?>"
	data-imagestyle="<?php echo esc_attr( $attributes['imagestyle'] ); ?>"
	data-limit="<?php echo esc_attr( $attributes['limit'] ); ?>"
	data-personalized="<?php echo esc_attr( $attributes['personalized'] ); ?>"
	data-showimages="<?php echo esc_attr( $attributes['showimages'] ); ?>"
	data-sort="<?php echo esc_attr( $attributes['sort'] ); ?>"
	data-title="<?php echo esc_attr( $attributes['title'] ); ?>"
></section>
		<?php
		return ob_get_clean();
	}
}

<?php
/**
 * Parse.ly Recommendations Block class file.
 *
 * @package Parsely
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely;

/**
 * Parse.ly Recommendations Gutenberg Block.
 *
 * Gutenberg Block that lists Parse.ly recommendations using the /related
 * Parse.ly API, which is made possible by the Related_API_Proxy endpoint.
 */
class Recommendations_Block {
	const MINIMUM_WORDPRESS_VERSION = '5.6';

	/**
	 * Determine whether the block and its assets should be registered.
	 *
	 * @return void
	 */
	public function run(): void {
		global $wp_version;

		if ( ! apply_filters( 'wp_parsely_recommendations_block_enabled', false ) ) {
			// This block is behind a "feature flag" and it's not enabled. Bail.
			return;
		}

		if ( ! isset( $wp_version ) || version_compare( $wp_version, self::MINIMUM_WORDPRESS_VERSION ) < 0 ) {
			// WordPress is not recent enough to run this block.
			return;
		}

		self::register_block_and_assets();
	}

	/**
	 * Registers all block assets so that they can be enqueued through Gutenberg in
	 * the corresponding context.
	 *
	 * @return void
	 */
	public static function register_block_and_assets(): void {
		$plugin_url = plugin_dir_url( PARSELY_FILE );

		$editor_asset_file = require plugin_dir_path( PARSELY_FILE ) . 'build/recommendations-edit.asset.php';
		wp_register_script(
			'wp-parsely-recommendations-block-editor',
			$plugin_url . 'build/recommendations-edit.js',
			$editor_asset_file['dependencies'],
			$editor_asset_file['version'],
			true
		);

		$script_asset_file = require plugin_dir_path( PARSELY_FILE ) . 'build/recommendations.asset.php';
		wp_register_script(
			'wp-parsely-recommendations-block',
			$plugin_url . 'build/recommendations.js',
			$script_asset_file['dependencies'],
			$script_asset_file['version'],
			true
		);

		wp_register_style(
			'wp-parsely-recommendations-block',
			$plugin_url . 'build/style-recommendations-edit.css',
			array(),
			$script_asset_file['version']
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
					'boost'      => array(
						'type'    => 'string',
						'default' => 'views',
					),
					'imagestyle' => array(
						'type'    => 'string',
						'default' => 'original',
					),
					'limit'      => array(
						'type'    => 'number',
						'default' => 3,
					),
					'showimages' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'sort'       => array(
						'type'    => 'string',
						'default' => 'score',
					),
					'tag'        => array(
						'type' => 'string',
					),
					'title'      => array(
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
	data-imagestyle="<?php echo esc_attr( $attributes['imagestyle'] ); ?>"
	data-limit="<?php echo esc_attr( $attributes['limit'] ); ?>"
	data-showimages="<?php echo esc_attr( $attributes['showimages'] ); ?>"
	data-sort="<?php echo esc_attr( $attributes['sort'] ); ?>"
	data-title="<?php echo esc_attr( $attributes['title'] ); ?>"
></section>
		<?php
		return ob_get_clean();
	}
}

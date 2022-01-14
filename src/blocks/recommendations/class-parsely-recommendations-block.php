<?php
/**
 * Parsely_Recommendations_Block class file
 *
 * @package Parsely
 */

/**
 * Parsely_Recommendations_Block
 */
class Parsely_Recommendations_Block {
	const MINIMUM_WORDPRESS_VERSION = '5.6';

	/**
	 * Hooked into `init` in the main block entry file.
	 * That gives ample opportunity for themes and other plugins to hook and unhook functionality.
	 */
	public static function init() {
		global $wp_version;

		if ( ! apply_filters( 'wp_parsely_recommendations_block_enabled', false ) ) {
			// This block is behind a "feature flag" and it's not enabled. Bail.
			return;
		}

		if ( version_compare( $wp_version, self::MINIMUM_WORDPRESS_VERSION ) < 0 ) {
			// WordPress is not recent enough to run this block.
			return;
		}

		self::register_block_and_assets();

		require __DIR__ . '/class-parsely-recommendations-block-api.php';
		add_action( 'rest_api_init', array( 'Parsely_Recommendations_Block_API', 'rest_api_init' ) );
	}

	/**
	 * Registers all block assets so that they can be enqueued through Gutenberg in
	 * the corresponding context.
	 */
	public static function register_block_and_assets() {
		$editor_asset_file = require PARSELY_PLUGIN_DIR . 'build/recommendations-edit.asset.php';

		wp_register_script(
			'wp-parsely-recommendations-block-editor',
			PARSELY_PLUGIN_URL . 'build/recommendations-edit.js',
			$editor_asset_file['dependencies'],
			$editor_asset_file['version'],
			true
		);

		$script_asset_file = require PARSELY_PLUGIN_DIR . 'build/recommendations.asset.php';
		wp_register_script(
			'wp-parsely-recommendations-block',
			PARSELY_PLUGIN_URL . 'build/recommendations.js',
			array_merge( $script_asset_file['dependencies'], array( 'wp-parsely-api' ) ),
			$script_asset_file['version'],
			true
		);

		wp_register_style(
			'wp-parsely-recommendations-block',
			PARSELY_PLUGIN_URL . 'build/style-recommendations-edit.css',
			array(),
			Parsely::get_asset_cache_buster()
		);

		register_block_type(
			'wp-parsely/recommendations',
			array(
				'editor_script'   => 'wp-parsely-recommendations-block-editor',
				'render_callback' => 'Parsely_Recommendations_Block::render_callback',
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
					'saveresults'  => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'savedresults' => array(
						'type'    => 'array',
						'default' => array(),
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
	 * Passes saved urls through `wp_validate_redirect`. If they pass, only include supported keys.
	 * To modify what's allowed, add a filter on `allowed_redirect_hosts`.
	 *
	 * @see https://developer.wordpress.org/reference/hooks/allowed_redirect_hosts/
	 * @see https://developer.wordpress.org/reference/functions/wp_validate_redirect/
	 * @param array $saved_results The list of link information stored in the `savedresults` block attribute.
	 * @return array The validated list of link information.
	 */
	public static function validate_saved_results( $saved_results ) {
		if ( ! is_array( $saved_results ) || empty( $saved_results ) ) {
			return array();
		}

		return array_filter(
			array_map(
				function ( $result ) {
					if ( ! wp_validate_redirect( $result['url'] ) ) {
						return false;
					}
					return array(
						'title'            => $result['title'],
						'url'              => $result['url'],
						'image_url'        => $result['image_url'],
						'thumb_url_medium' => $result['thumb_url_medium'],
					);
				},
				$saved_results
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
		$validated_saved_results = self::validate_saved_results( $attributes['savedresults'] );
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
	data-saveresults="<?php echo esc_attr( $attributes['saveresults'] ); ?>"
	data-savedresults="<?php echo esc_attr( htmlspecialchars( wp_json_encode( $validated_saved_results ), ENT_QUOTES, 'UTF-8' ) ); ?>"
	data-showimages="<?php echo esc_attr( $attributes['showimages'] ); ?>"
	data-sort="<?php echo esc_attr( $attributes['sort'] ); ?>"
	data-title="<?php echo esc_attr( $attributes['title'] ); ?>"
></section>
		<?php
		return ob_get_clean();
	}
}

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
					'saveresults' => array(
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
	 * The Server-side render_callback for the wp-parsely/recommendations block.
	 *
	 * @uses wp_validate_redirect If the stored results aren't considered "safe" by this function, they're skipped.
	 * @param array $attributes The user-controlled settings for this block.
	 * @return string
	 */
	public static function render_callback( $attributes ) {
		$validated_saved_results = array_filter(
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
				$attributes['saveresults'] ? $attributes['savedresults'] : array()
			)
		);
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
	data-savedresults="
		<?php
		// TODO: only allow links that pass wp_validate_redirect...?
		echo esc_attr( htmlspecialchars( json_encode( $validated_saved_results ), ENT_QUOTES, 'UTF-8' ) );
		?>
	"
	data-showimages="<?php echo esc_attr( $attributes['showimages'] ); ?>"
	data-sort="<?php echo esc_attr( $attributes['sort'] ); ?>"
	data-title="<?php echo esc_attr( $attributes['title'] ); ?>"
></section>
		<?php
		return ob_get_clean();
	}
}

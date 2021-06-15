<?php

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
			PARSELY_PLUGIN_URL . 'build/style-recommendations-edit.css', // TODO: adjust this file name (not sure why I had to do the import in the edit file)
			array(),
			Parsely::get_asset_cache_buster()
		);

		register_block_type(
			'wp-parsely/recommendations',
			array(
				'editor_script'   => 'wp-parsely-recommendations-block-editor',
				'script'          => 'wp-parsely-recommendations-block',
				'style'           => 'wp-parsely-recommendations-block',
				'render_callback' => 'Parsely_Recommendations_Block::server_side_render',
				'attributes'      => array(
					'boost'    => array(
						'type'    => 'string',
						'default' => 'views',
					),
					'imagestyle' => array(
						'type'    => 'string',
						'default' => 'original',
					),
					'layoutstyle' => array(
						'type'    => 'string',
						'default' => 'grid',
					),
					'limit'    => array(
						'type'    => 'number',
						'default' => 10,
					),
					'personalized'    => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'showimages'    => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'sortrecs' => array(
						'type'    => 'string',
						'default' => 'score',
					),
					'tag'      => array(
						'type' => 'string',
					),
					'title'    => array(
						'type'    => 'string',
						'default' => __( 'Related Content' ),
					),
				),
			)
		);
	}

	/**
	* Server-side render of Parse.ly Recommendation block
	*
	* @param array $attr Block attributes.
	*/
	public static function server_side_render( $attr ) {
		$class_names = isset( $attr['className'] ) ? $attr['className'] : '';
		ob_start();
		?>
		<section id="wp-parsely-related-posts-block" class="<?php echo esc_attr( $class_names ) ?>">
			<div class="container"
				data-boost="<?php echo esc_attr( $attr['boost'] ) ?>"
				data-layoutstyle="<?php echo esc_attr( $attr['layoutstyle'] ) ?>"
				data-imagestyle="<?php echo esc_attr( $attr['imagestyle'] ) ?>"
				data-limit="<?php echo esc_attr( $attr['limit'] ) ?>"
				data-personalized="<?php echo esc_attr( $attr['personalized'] ) ?>"
				data-showimages="<?php echo esc_attr( $attr['showimages'] ) ?>"
				data-sortrecs="<?php echo esc_attr( $attr['sortrecs'] ) ?>"
				data-title="<?php echo esc_attr( $attr['title'] ) ?>"
			></div>
		</section>
		<?php
		return ob_get_clean();
	}
}

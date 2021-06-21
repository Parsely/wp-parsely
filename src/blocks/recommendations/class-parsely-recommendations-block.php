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
				'render_callback' => 'Parsely_Recommendations_Block::server_side_render',
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
						'default' => __( 'Related Content' ),
					),
				),
			)
		);
	}

	public static function server_side_render( $attributes, $content ) {
		$escaped_saved_results = array();
		$escaped_saved_results = array_map(
			function ( $result ) {
				return array(
					'title'            => esc_html( $result['title'] ),
					'url'              => esc_url( $result['url'] ),
					'image_url'        => esc_url( $result['image_url'] ),
					'thumb_url_medium' => esc_url( $result['thumb_url_medium'] ),
				);
			},
			$attributes['savedresults']
		);
		ob_start();
		?>
<section <?php echo get_block_wrapper_attributes(); ?>

	data-boost="<?php echo esc_attr( $attributes['boost'] ); ?>"
	data-layoutstyle="<?php echo esc_attr( $attributes['layoutstyle'] ); ?>"
	data-imagestyle="<?php echo esc_attr( $attributes['imagestyle'] ); ?>"
	data-limit="<?php echo esc_attr( $attributes['limit'] ); ?>"
	data-personalized="<?php echo esc_attr( $attributes['personalized'] ); ?>"
	data-savedresults="
		<?php
		// TODO: does any other sanitization need to be done here?
		echo htmlspecialchars( json_encode( $escaped_saved_results ), ENT_QUOTES, 'UTF-8' );
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

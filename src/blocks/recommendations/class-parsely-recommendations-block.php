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

		register_block_type(
			'wp-parsely/recommendations',
			array(
				'editor_script'   => 'wp-parsely-recommendations-block-editor',
				'script'          => 'wp-parsely-recommendations-block',
				'render_callback' => 'Parsely_Recommendations_Block::server_side_render',
				'attributes'      => array(
					'personalized'    => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'displayDirection' => array(
						'type'    => 'string',
						'default' => 'horizontal',
					),
					'title'    => array(
						'type'    => 'string',
						'default' => 'Related Content',
					),
					'tag'      => array(
						'type' => 'string',
					),
					'sortRecs' => array(
						'type'    => 'string',
						'default' => 'score',
					),
					'pubStart' => array(
						'type'    => 'number',
						'default' => 7,
					),
					'boost'    => array(
						'type'    => 'string',
						'default' => 'views',
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
		ob_start();
		?>
		<section id="wp-parsely-related-posts-block" class=<?php echo esc_attr( $attr['className'] ) ?>>
			<div class="container"
				data-personalized="<?php echo esc_attr( $attr['personalized'] ) ?>"
				data-displayDirection="<?php echo esc_attr( $attr['displayDirection'] ) ?>"
				data-title="<?php echo esc_attr( $attr['title'] ) ?>"
				data-sortRecs="<?php echo esc_attr( $attr['sortRecs'] ) ?>"
				data-pubStart="<?php echo esc_attr( $attr['pubStart'] ) ?>"
				data-boost="<?php echo esc_attr( $attr['boost'] ) ?>"
			></div>
		</section>
		<?php
		return ob_get_clean();
	}
}

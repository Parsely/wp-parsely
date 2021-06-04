<?php

class Parsely_Reccomendations_Block {
	public static function init() {
		add_action( 'init', 'Parsely_Reccomendations_Block::register_block_and_assets' );
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

		register_block_type(
			'wp-parsely/recommendations',
			array(
				'script'          => 'wp-parsely-recommendations-block',
				'editor_script'   => 'wp-parsely-recommendations-block-editor',
				'render_callback' => 'Parsely_Reccomendations_Block::server_side_render',
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
						'default' => '7',
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
		<section id="wp-parsely-related-posts" class="related-posts mt-36 mb-96">
			<div class="container">
				<div class="related-posts__heading heading-02">
					<p><?php echo( esc_attr( $attr['title'] ) ); ?></p>
				</div>
				<div class="related-posts__grid grid grid-cols-3 gap-12 mt-12">
				<?php for ( $i = 0; $i < 3; $i++ ) : ?>
					<div class="card">
						<div class="card__img h-full">
							<?php /*<img
								src="<?php echo esc_url( strtok( $data[ $i ]['image_url'], '?' ) ); ?>"
								alt="<?php echo( esc_attr( $data[ $i ]['title'] ) ); ?>"
								class="w-full" /> */ ?>
						</div>
						<div class="card__text">
							<div class="card__post-type">
								<p class="helper-01-caps"><?php esc_html_e( 'Example', 'wp-parsely' ) ?></p>
							</div>
							<div class="card__title">
								<a class="text-gray-90" href="#" disabled="disabled">
									<p class="heading-02"><?php esc_html_e( 'Title', 'wp-parsely' ); ?></p>
								</a>
							</div>
						</div>
					</div>
				<?php endfor; ?>
				</div>
			</div>
		</section>
		<?php
		$output = ob_get_contents();
		ob_end_clean();
		return $output;
	}
}

Parsely_Reccomendations_Block::init();

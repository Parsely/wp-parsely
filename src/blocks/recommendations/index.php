<?php

if ( ! defined( 'ABSPATH' )  ) {
	exit;
}

if ( ! function_exists( 'wp_parsely_recommendations_block_render' ) ) {
	/**
	 * Server-side render of Parse.ly Recommendation block
	 *
	 * @param array $attr Block attributes.
	 */
	function wp_parsely_recommendations_block_render( $attr ) {
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

if ( ! function_exists( 'wp_parsely_recommendations_block' ) ) {
	/**
	 * Registers all block assets so that they can be enqueued through Gutenberg in
	 * the corresponding context.
	 */
	function wp_parsely_recommendations_block() {
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
			[
				'script'          => 'wp-parsely-recommendations-block',
				'editor_script'   => 'wp-parsely-recommendations-block-editor',
				'render_callback' => 'wp_parsely_recommendations_block_render',
				'attributes'      => [
					'title'    => [
						'type'    => 'string',
						'default' => 'Related Content',
					],
					'tag'      => [
						'type' => 'string',
					],
					'sortRecs' => [
						'type'    => 'string',
						'default' => 'score',
					],
					'pubStart' => [
						'type'    => 'number',
						'default' => '7',
					],
					'boost'    => [
						'type'    => 'string',
						'default' => 'views',
					],
				],
			]
		);
	}

	add_action( 'init', 'wp_parsely_recommendations_block' );
}

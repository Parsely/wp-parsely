<?php

class Parsely_Recommendations_Block {
	public static function init() {
		global $wp_version;

		if ( version_compare( $wp_version, '5.6' ) < 0 ) {
			// WordPress is not recent enough to run this block
			return;
		}

		add_action( 'init', 'Parsely_Recommendations_Block::register_block_and_assets' );
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
		<section id="wp-parsely-related-posts-block">
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

Parsely_Recommendations_Block::init();

class Parsely_Recommendations_Block_API {
	public static function rest_api_init() {
		register_rest_route(
			'wp-parsely/v1',
			'/recommendations',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => 'Parsely_Recommendations_Block_API::get_items',
					'permission_callback' => 'Parsely_Recommendations_Block_API::permission_callback',
					'args'                => array(),
				),
			)
		);
	}

	public static function permission_callback( $request ) {
		return current_user_can( 'read' );
	}

	public static function get_items( $request ) {
		global $parsely;
		$options = $parsely->get_nonsecet_options();
		$apikey = $options['apikey'];

		$params = $request->get_params();

		$cache_key = 'block_recos-' . md5( json_encode( compact( 'apikey', 'params' ) ) );
		$cached = wp_cache_get( $cache_key, 'wp-parsely' );
		if ( is_array( $cached ) ) {
			return array(
				'data' => $cached,
				'cached' => 1,
			);
		}

		$links = self::fetch_related_links(
			$apikey,
			$params['url']
		);

		if ( is_wp_error( $links ) ) {
			// Should the error be cached?
			return $links;
		}

		$data = array_map(
			function( $link ) {
				return (object) array(
					'image_url' => $link->image_url,
					'title' => $link->title,
					'url' => $link->url,
				);
			},
			$links
		);

		wp_cache_set( $cache_key, $data, 'wp-parsely', 5 * MINUTE_IN_SECONDS );

		return (object) array(
			'data' => $data,
		);
	}

	public static function fetch_related_links( $apikey, $url, $pub_start = 0, $sort_recs = 'score', $limit = 5, $boost = 'views' ) {
		$full_api_url = add_query_arg(
			array(
				'url' => rawurlencode( $url ),
			),
			Parsely_Recommended_Content::get_api_url(
				$apikey,
				$pub_start,
				$sort_recs,
				$boost,
				$limit
			)
		);

		$response = wp_safe_remote_get( $full_api_url, array() );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$body = wp_remote_retrieve_body( $response );
		$decoded = json_decode( $body );

		if ( is_null( $decoded ) ) {
			return new WP_Error( 400, 'Unable to decode upstream API response' );
		}

		return $decoded->data;
	}
}
add_action( 'rest_api_init', array( 'Parsely_Recommendations_Block_API', 'rest_api_init' ) );

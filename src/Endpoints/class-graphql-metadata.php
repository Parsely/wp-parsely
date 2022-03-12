<?php
/**
 * GraphQL support class.
 * Note: this class will only work if the WPGraphQL plugin is installed.
 *
 * @package Parsely
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints;

use WP_Post;

/**
 * Injects Parse.ly Metadata to the GraphQL outputs
 *
 * @since 3.2.0
 */
class GraphQL_Metadata extends Metadata_Endpoint {
	private const GRAPHQL_VERSION        = '1.0.0';
	private const GRAPHQL_CONTAINER_TYPE = 'ParselyMetaContainer';

	/**
	 * Register fields in WPGraphQL plugin
	 *
	 * @since 3.2.0
	 *
	 * @return void
	 */
	public function run(): void {
		/**
		 * Filter whether GraphQL support is enabled or not.
		 *
		 * @since 3.2.0
		 *
		 * @param bool $enabled True if enabled, false if not.
		 */
		if ( apply_filters( 'wp_parsely_enable_graphql_support', true ) && $this->parsely->api_key_is_set() ) {
			add_action( 'graphql_register_types', array( $this, 'register_meta' ) );
		}
	}

	/**
	 * Registers the meta field on the appropriate resource types in the REST API.
	 *
	 * @since 3.2.0
	 *
	 * @return void
	 */
	public function register_meta(): void {
		$this->register_object_types();
		$this->register_fields();
	}

	/**
	 * Registers the new custom types for Parse.ly Metadata into the GraphQL instance.
	 *
	 * @since 3.2.0
	 *
	 * @return void
	 */
	private function register_object_types(): void {
		$container_type = array(
			'description' => __( 'Parse.ly Metadata root type.', 'wp-parsely' ),
			'fields'      => array(
				'version'   => array(
					'type'        => 'String',
					'description' => __( 'Revision of the metadata format.', 'wp-parsely' ),
				),
				'scriptUrl' => array(
					'type'        => 'String',
					'description' => __( 'URL of the Parse.ly tracking script, specific to the site.', 'wp-parsely' ),
				),
				'metaTags'  => array(
					'type'        => 'String',
					'description' => __(
						'HTML string containing the metadata in JSON-LD. Intended to be rendered in the front-end as is.',
						'wp-parsely'
					),
				),
				'jsonLd'    => array(
					'type'        => 'String',
					'description' => __(
						'HTML string containing the metadata in JSON-LD. Intended to be rendered in the front-end as is.',
						'wp-parsely'
					),
				),
				'isTracked' => array(
					'type'        => 'Boolean',
					'description' => __(
						'Boolean indicating whether the current object\'s page type should be tracked according to user\'s settings.',
						'wp-parsely'
					),
				),
			),
		);
		register_graphql_object_type( self::GRAPHQL_CONTAINER_TYPE, $container_type );
	}

	/**
	 * Register the custom metadata fields so they can be queried in GraphQL.
	 *
	 * @since 3.2.0
	 *
	 * @return void
	 */
	private function register_fields(): void {
		$resolve = function ( \WPGraphQL\Model\Post $graphql_post ) {
			$post_id = $graphql_post->ID;
			$post    = WP_Post::get_instance( $post_id );

			if ( false === $post ) {
				return array();
			}

			$options             = $this->parsely->get_options();
			$object_types        = array_unique( array_merge( $options['track_post_types'], $options['track_page_types'] ) );
			$current_object_type = get_post_type( $post );

			return array(
				'version'   => self::GRAPHQL_VERSION,
				'scriptUrl' => $this->parsely->get_tracker_url(),
				'metaTags'  => self::get_rendered_meta( 'meta_tags' ),
				'jsonLd'    => self::get_rendered_meta( 'json_ld' ),
				'isTracked' => is_string( $current_object_type ) && array_key_exists( $current_object_type, $object_types ),
			);
		};

		$config = array(
			'type'        => self::GRAPHQL_CONTAINER_TYPE,
			'description' => __(
				'Parse.ly metadata fields, to be rendered in the front-end so they can be parsed by the crawler. See https://www.parse.ly/help/integration/crawler.',
				'wp-parsely'
			),
			'resolve'     => $resolve,
		);
		register_graphql_field( 'ContentNode', self::FIELD_NAME, $config );
	}
}

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
	private const GRAPHQL_VERSION          = '1.0.0';
	private const GRAPHQL_CONTAINER_TYPE   = 'ParselyMetaContainer';
	private const GRAPHQL_AUTHOR_TYPE      = 'ParselyAuthor';
	private const GRAPHQL_MAIN_ENTITY_TYPE = 'ParselyMainEntityOfPage';
	private const GRAPHQL_IMAGE_TYPE       = 'ParselyImage';
	private const GRAPHQL_PUBLISHER_TYPE   = 'ParselyPublisher';
	private const GRAPHQL_META_TYPE        = 'ParselyMeta';

	/**
	 * Register fields in WPGraphQL plugin
	 *
	 * @since 3.2.0
	 *
	 * @return void
	 */
	public function run(): void {
		if ( class_exists( 'WPGraphQL' ) ) {
			/**
			 * Filter whether GraphQL support is enabled or not.
			 *
			 * @since 3.2.0
			 *
			 * @param bool $enabled True if enabled, false if not.
			 */
			if ( apply_filters( 'wp_parsely_enable_graphql_support', true ) ) {
				add_action( 'graphql_register_types', array( $this, 'register_meta' ) );
			}
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
		register_graphql_object_type(
			self::GRAPHQL_AUTHOR_TYPE,
			array(
				'description' => __( '..', 'wp-parsely' ),
				'fields'      => array(
					'type' => array(
						'type'        => 'String',
						'description' => __( 'asdf', 'wp-parsely' ),
					),
					'name' => array(
						'type'        => 'String',
						'description' => __( 'asdf', 'wp-parsely' ),
					),
				),
			)
		);

		register_graphql_object_type(
			self::GRAPHQL_MAIN_ENTITY_TYPE,
			array(
				'description' => __( '..', 'wp-parsely' ),
				'fields'      => array(
					'type' => array(
						'type'        => 'String',
						'description' => __( 'asdf', 'wp-parsely' ),
					),
					'id'   => array(
						'type'        => 'String',
						'description' => __( 'asdf', 'wp-parsely' ),
					),
				),
			)
		);

		register_graphql_object_type(
			self::GRAPHQL_IMAGE_TYPE,
			array(
				'description' => __( '..', 'wp-parsely' ),
				'fields'      => array(
					'type' => array(
						'type'        => 'String',
						'description' => __( 'asdf', 'wp-parsely' ),
					),
					'url'  => array(
						'type'        => 'String',
						'description' => __( 'asdf', 'wp-parsely' ),
					),
				),
			)
		);

		register_graphql_object_type(
			self::GRAPHQL_PUBLISHER_TYPE,
			array(
				'description' => __( '..', 'wp-parsely' ),
				'fields'      => array(
					'type' => array(
						'type'        => 'String',
						'description' => __( 'asdf', 'wp-parsely' ),
					),
					'name' => array(
						'type'        => 'String',
						'description' => __( 'asdf', 'wp-parsely' ),
					),
					'logo' => array(
						'type'        => 'String',
						'description' => __( 'asdf', 'wp-parsely' ),
					),
				),
			)
		);

		register_graphql_object_type(
			self::GRAPHQL_META_TYPE,
			array(
				'description' => __( 'Some desription for the type', 'wp-parsely' ),
				'fields'      => array(
					'context'          => array(
						'type'        => 'String',
						'description' => __( 'desc', 'wp-parsely' ),
					),
					'type'             => array(
						'type'        => 'String',
						'description' => __( 'desc', 'wp-parsely' ),
					),
					'mainEntityOfPage' => array(
						'type'        => self::GRAPHQL_MAIN_ENTITY_TYPE,
						'description' => __( 'desc', 'wp-parsely' ),
					),
					'headline'         => array(
						'type'        => 'String',
						'description' => __( 'desc', 'wp-parsely' ),
					),
					'url'              => array(
						'type'        => 'String',
						'description' => __( 'desc', 'wp-parsely' ),
					),
					'thumbnailUrl'     => array(
						'type'        => 'String',
						'description' => __( 'desc', 'wp-parsely' ),
					),
					'image'            => array(
						'type'        => self::GRAPHQL_IMAGE_TYPE,
						'description' => __( 'desc', 'wp-parsely' ),
					),
					'articleSection'   => array(
						'type'        => 'String',
						'description' => __( 'desc', 'wp-parsely' ),
					),
					'author'           => array(
						'type'        => array( 'list_of' => self::GRAPHQL_AUTHOR_TYPE ),
						'description' => __( 'desc', 'wp-parsely' ),
					),
					'creator'          => array(
						'type'        => 'String',
						'description' => __( 'desc', 'wp-parsely' ),
					),
					'publisher'        => array(
						'type'        => self::GRAPHQL_PUBLISHER_TYPE,
						'description' => __( 'desc', 'wp-parsely' ),
					),
					'keywords'         => array(
						'type'        => 'String',
						'description' => __( 'desc', 'wp-parsely' ),
					),
				),
			)
		);

		register_graphql_object_type(
			self::GRAPHQL_CONTAINER_TYPE,
			array(
				'description' => __( 'Describe what a CustomType is', 'wp-parsely' ),
				'fields'      => array(
					'version'  => array(
						'type'        => 'String',
						'description' => __( 'Describe what testField should be used for', 'wp-parsely' ),
					),
					'meta'     => array(
						'type'        => 'ParselyMeta',
						'description' => __( 'Describe what the count field should be used for', 'wp-parsely' ),
					),
					'rendered' => array(
						'type'        => 'String',
						'description' => __( 'Rendered field', 'wp-parsely' ),
					),
				),
			)
		);
	}

	/**
	 * Register the custom metadata fields so they can be queried in GraphQL.
	 *
	 * @since 3.2.0
	 *
	 * @return void
	 */
	private function register_fields(): void {
		// TODO: Only register allowed post types by the user.
		$post_types = \WPGraphQL::get_allowed_post_types();

		foreach ( $post_types as $post_type ) {
			$post_type_object = get_post_type_object( $post_type );

			register_graphql_field(
				$post_type_object->graphql_single_name,
				self::FIELD_NAME,
				array(
					'type'        => self::GRAPHQL_CONTAINER_TYPE,
					'description' => 'Parse.ly metadata support',
					'resolve'     => function ( $graphql_post ) {
						$post_id = $graphql_post->__get( 'ID' );
						$post    = WP_Post::get_instance( $post_id );

						$meta            = $this->parsely->construct_parsely_metadata( $this->parsely->get_options(), $post );
						$meta['context'] = $meta['@context'];
						$meta['type']    = $meta['@type'];

						return array(
							'version'  => self::GRAPHQL_VERSION,
							'meta'     => $meta,
							'rendered' => self::get_rendered_meta(),
						);
					},
				)
			);
		}
	}
}

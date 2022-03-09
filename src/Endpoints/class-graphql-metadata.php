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
			if ( apply_filters( 'wp_parsely_enable_graphql_support', true ) && $this->parsely->api_key_is_set() ) {
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
		$author_type = array(
			'description' => __( 'Parse.ly container type for author meta object.', 'wp-parsely' ),
			'fields'      => array(
				'type' => array( 'type' => 'String' ),
				'name' => array( 'type' => 'String' ),
			),
		);
		register_graphql_object_type( self::GRAPHQL_AUTHOR_TYPE, $author_type );

		$main_entity_type = array(
			'description' => __( 'Parse.ly container type for main entity meta object.', 'wp-parsely' ),
			'fields'      => array(
				'type' => array( 'type' => 'String' ),
				'id'   => array( 'type' => 'String' ),
			),
		);
		register_graphql_object_type( self::GRAPHQL_MAIN_ENTITY_TYPE, $main_entity_type );

		$image_type = array(
			'description' => __( 'Parse.ly container type for image meta object.', 'wp-parsely' ),
			'fields'      => array(
				'type' => array( 'type' => 'String' ),
				'url'  => array( 'type' => 'String' ),
			),
		);
		register_graphql_object_type( self::GRAPHQL_IMAGE_TYPE, $image_type );

		$publisher_type = array(
			'description' => __( 'Parse.ly container type for publisher meta object.', 'wp-parsely' ),
			'fields'      => array(
				'type' => array( 'type' => 'String' ),
				'name' => array( 'type' => 'String' ),
				'logo' => array( 'type' => 'String' ),
			),
		);
		register_graphql_object_type( self::GRAPHQL_PUBLISHER_TYPE, $publisher_type );

		$meta_type = array(
			'description' => __( 'Metadata fields to be rendered in the front-end. They follow Parse.ly\'s metadata structure. See https://www.parse.ly/help/integration/category/metadata', 'wp-parsely' ),
			'fields'      => array(
				'context'          => array( 'type' => 'String' ),
				'type'             => array( 'type' => 'String' ),
				'mainEntityOfPage' => array( 'type' => self::GRAPHQL_MAIN_ENTITY_TYPE ),
				'headline'         => array( 'type' => 'String' ),
				'url'              => array( 'type' => 'String' ),
				'thumbnailUrl'     => array( 'type' => 'String' ),
				'image'            => array( 'type' => self::GRAPHQL_IMAGE_TYPE ),
				'articleSection'   => array( 'type' => 'String' ),
				'author'           => array( 'type' => array( 'list_of' => self::GRAPHQL_AUTHOR_TYPE ) ),
				'creator'          => array( 'type' => 'String' ),
				'publisher'        => array( 'type' => self::GRAPHQL_PUBLISHER_TYPE ),
				'keywords'         => array( 'type' => 'String' ),
			),
		);
		/**
		 * Filters the array for the custom type to represent metadata on GraphQL.
		 *
		 * @see https://wpgraphqldocs.gatsbyjs.io/functions/register_graphql_object_type/
		 * @since 3.2.0
		 *
		 * @param array $meta_type Array with the fields of the new type.
		 */
		$meta_type = apply_filters( 'wp_parsely_graphql_meta_type', $meta_type );
		register_graphql_object_type( self::GRAPHQL_META_TYPE, $meta_type );

		$container_type = array(
			'description' => __( 'Parse.ly Metadata root type.', 'wp-parsely' ),
			'fields'      => array(
				'version'  => array(
					'type'        => 'String',
					'description' => __( 'Revision of the metadata format.', 'wp-parsely' ),
				),
				'meta'     => array(
					'type'        => 'ParselyMeta',
					'description' => __( 'Structured and filterable metadata.', 'wp-parsely' ),
				),
				'rendered' => array(
					'type'        => 'String',
					'description' => __( 'HTML string containing the metadata. Intended to be rendered in the front-end as is.', 'wp-parsely' ),
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
		$options      = $this->parsely->get_options();
		$object_types = array_unique( array_merge( $options['track_post_types'], $options['track_page_types'] ) );

		/**
		 * Filters the list of post object types that the Parse.ly GraphQL API is hooked into.
		 *
		 * @since 3.2.0
		 *
		 * @param string[] $object_types Array of strings containing the object types, i.e. `page`, `post`, `term`.
		 */
		$object_types = apply_filters( 'wp_parsely_graphql_object_types', $object_types );

		foreach ( $object_types as $object_type ) {
			$post_type_object = get_post_type_object( $object_type );

			register_graphql_field(
				$post_type_object->graphql_single_name,
				self::FIELD_NAME,
				array(
					'type'        => self::GRAPHQL_CONTAINER_TYPE,
					'description' => 'Parse.ly metadata fields, to be rendered in the front-end so they can be parsed by the crawler. See https://www.parse.ly/help/integration/crawler.',
					'resolve'     => function ( $graphql_post ) {
						$post_id = $graphql_post->__get( 'ID' );
						$post    = WP_Post::get_instance( $post_id );

						if ( false === $post ) {
							return array();
						}

						$meta = $this->parsely->construct_parsely_metadata( $this->parsely->get_options(), $post );
						$meta = $this->process_meta_for_graphql( $meta );

						/**
						 * Filters the array with the actual metadata that is exposed through GraphQL.
						 *
						 * @see https://wpgraphqldocs.gatsbyjs.io/functions/register_graphql_field/
						 * @since 3.2.0
						 *
						 * @param array $meta Array with the fields of the new type.
						 */
						$meta = apply_filters( 'wp_parsely_graphql_meta_object', $meta );

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

	/**
	 * Adapts an array of metadata to GraphQL. Namely, all keys with a leading `@` symbol are duplicated by the same
	 * key without the symbol.
	 *
	 * @since 3.2.0
	 *
	 * @param array<string, mixed> $meta Page metadata array.
	 *
	 * @return array<string, mixed>
	 */
	private function process_meta_for_graphql( array $meta ): array {
		$meta = $this->add_type_key( $meta );

		$meta['context'] = $meta['@context'];

		if ( array_key_exists( 'author', $meta ) ) {
			$meta['author'] = array_map( array( $this, 'add_type_key' ), $meta['author'] );
		}

		if ( array_key_exists( 'mainEntityofPage', $meta ) ) {
			$meta['mainEntityOfPage'] = array(
				'type' => $meta['mainEntityOfPage']['@type'],
				'id'   => $meta['mainEntityOfPage']['@id'],
			);
		}

		if ( array_key_exists( 'publisher', $meta ) ) {
			$meta['publisher'] = $this->add_type_key( $meta['publisher'] );
		}

		return $meta;
	}

	/**
	 * Adds the `type` key in an array, sourcing its value from `@type` if that key exists.
	 *
	 * @since 3.2.0
	 *
	 * @param array<string, mixed> $data Some array that may or may not contain the `@type` key.
	 *
	 * @return array<string, mixed>
	 */
	private function add_type_key( array $data ): array {
		if ( array_key_exists( '@type', $data ) ) {
			$data['type'] = $data['@type'];
		}
		return $data;
	}
}

<?php
/**
 * GraphQL support class.
 * Note: this class will only work if the WPGraphQL plugin is installed.
 *
 * @package Parsely
 * @since 3.3.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints;


/**
 * Injects Parse.ly Metadata to the GraphQL outputs
 *
 * @since 3.2.0
 */
class GraphQL_Metadata extends Metadata_Endpoint {
	private const GRAPHQL_VERSION = '1.0.0';
	private const GRAPHQL_CONTAINER_TYPE = 'ParselyMetaContainer';
	private const GRAPHQL_META_TYPE = 'ParselyMeta';

	/**
	 * Register fields in WPGraphQL plugin
	 *
	 * @since 3.3.0
	 *
	 * @return void
	 */
	public function run(): void {
		if ( class_exists( 'WPGraphQL' ) ) {
			/**
			 * Filter whether GraphQL support is enabled or not.
			 *
			 * @since 3.3.0
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
	 * @since 3.1.0
	 *
	 * @return void
	 */
	public function register_meta(): void {
		register_graphql_object_type( 'ParselyAuthor', [
			'description' => __('..', 'wp-parsely'),
			'fields' => [
				'type' => [
					'type' => 'String',
					'description' => __('asdf', 'wp-parsely')
				],
				'name' => [
					'type' => 'String',
					'description' => __('asdf', 'wp-parsely')
				]
			],
		]);

		register_graphql_object_type( 'ParselyMainEntityOfPage', [
			'description' => __('..', 'wp-parsely'),
			'fields' => [
				'type' => [
					'type' => 'String',
					'description' => __('asdf', 'wp-parsely')
				],
				'id' => [
					'type' => 'String',
					'description' => __('asdf', 'wp-parsely')
				]
			],
		]);

		register_graphql_object_type( 'ParselyImage', [
			'description' => __('..', 'wp-parsely'),
			'fields' => [
				'type' => [
					'type' => 'String',
					'description' => __('asdf', 'wp-parsely')
				],
				'url' => [
					'type' => 'String',
					'description' => __('asdf', 'wp-parsely')
				]
			],
		]);

		register_graphql_object_type( 'ParselyPublisher', [
			'description' => __('..', 'wp-parsely'),
			'fields' => [
				'type' => [
					'type' => 'String',
					'description' => __('asdf', 'wp-parsely')
				],
				'name' => [
					'type' => 'String',
					'description' => __('asdf', 'wp-parsely')
				],
				'logo' => [
					'type' => 'String',
					'description' => __('asdf', 'wp-parsely')
				]
			],
		]);

		register_graphql_object_type( self::GRAPHQL_META_TYPE, [
			'description' => __('Some desription for the type', 'wp-parsely'),
			'fields' => [
				'context' => [
					'type' => 'String',
					'description' => __('desc', 'wp-parsely'),
				],
				'type' => [
					'type' => 'String',
					'description' => __('desc', 'wp-parsely'),
				],
				'mainEntityOfPage' => [
					'type' => 'ParselyMainEntityOfPage',
					'description' => __('desc', 'wp-parsely'),
				],
				'headline' => [
					'type' => 'String',
					'description' => __('desc', 'wp-parsely'),
				],
				'url' => [
					'type' => 'String',
					'description' => __('desc', 'wp-parsely'),
				],
				'thumbnailUrl' => [
					'type' => 'String',
					'description' => __('desc', 'wp-parsely'),
				],
				'image' => [
					'type' => 'ParselyImage',
					'description' => __('desc', 'wp-parsely'),
				],
				'articleSection' => [
					'type' => 'String',
					'description' => __('desc', 'wp-parsely'),
				],
				'author' => [
					'type' => ['list_of' => 'ParselyAuthor'],
					'description' => __('desc', 'wp-parsely'),
				],
				'creator' => [
					'type' => 'String',
					'description' => __('desc', 'wp-parsely'),
				],
				'publisher' => [
					'type' => 'ParselyPublisher',
					'description' => __('desc', 'wp-parsely'),
				],
				'keywords' => [
					'type' => 'String',
					'description' => __('desc', 'wp-parsely'),
				]
			]
		]);

		register_graphql_object_type( self::GRAPHQL_CONTAINER_TYPE, [
			'description' => __( 'Describe what a CustomType is', 'wp-parsely' ),
			'fields' => [
				'version' => [
					'type' => 'String',
					'description' => __( 'Describe what testField should be used for', 'your-textdomain' ),
				],
				'meta' => [
					'type' => 'ParselyMeta',
					'description' => __( 'Describe what the count field should be used for', 'your-textdomain' ),
				],
				'rendered' => [
					'type' => 'String',
					'description' => __('Rendered field', 'wp-parsely'),
				]
			],
		] );

		// TODO: Only register allowed post types by the user
		$post_types = \WPGraphQL::get_allowed_post_types();

		foreach ( $post_types as $post_type ) {
			$post_type_object = get_post_type_object( $post_type );

			register_graphql_field( $post_type_object->graphql_single_name, self::FIELD_NAME, [
				'type' => self::GRAPHQL_CONTAINER_TYPE,
				'description' => 'Parse.ly metadata support',
				'resolve' => function ( $graphql_post ) {
					$post_id = $graphql_post->__get('ID');
					$post = \WP_Post::get_instance( $post_id );

					$meta = $this->parsely->construct_parsely_metadata( $this->parsely->get_options(), $post );
					$meta['context'] = $meta['@context'];
					$meta['type'] = $meta['@type'];

					return [
						'version' => self::GRAPHQL_VERSION,
						'meta' => $meta,
						'rendered' => self::get_rendered_meta(),
					];
				}
			]);
		}
	}
}

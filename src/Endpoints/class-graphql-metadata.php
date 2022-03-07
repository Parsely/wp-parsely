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
		register_graphql_object_type( 'ParselyMeta', [
			'description' => __( 'Describe what a CustomType is', 'wp-parsely' ),
			'fields' => [
				'version' => [
					'type' => 'String',
					'description' => __( 'Describe what testField should be used for', 'your-textdomain' ),
				],
//				'meta' => [
//					'type' => 'Int',
//					'description' => __( 'Describe what the count field should be used for', 'your-textdomain' ),
//				],
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
				'type' => 'ParselyMeta',
				'description' => 'Parse.ly metadata support',
				'resolve' => function ( $post ) {
					return [
						'version' => '1.0',
						'rendered' => self::get_rendered_meta(),
					];
				}
			]);
		}
	}
}

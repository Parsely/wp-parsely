<?php
/**
 * Endpoints: Local endpoint for returning WordPress Post data
 *
 * @package Parsely
 * @since   3.11.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints;

use Parsely\Metadata\Post_Builder;
use stdClass;
use WP_Error;
use WP_Post;
use WP_REST_Request;

/**
 * Local endpoint for returning WordPress Post data.
 *
 * @since 3.11.0
 */
final class Post_Data_Endpoint extends Base_Endpoint_Local {
	protected const ENDPOINT = '/post-data';

	/**
	 * Registers the endpoint's WP REST route.
	 *
	 * @since 3.11.0
	 */
	public function run(): void {
		$this->register_endpoint( self::ENDPOINT, 'get_data' );
	}

	/**
	 * Returns the data of the API endpoint.
	 *
	 * @since 3.11.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return stdClass|WP_Error stdClass containing the data or a WP_Error object on failure.
	 */
	public function get_data( WP_REST_Request $request ) {
		$post_id = $request->get_param( 'postId' );
		if ( ! is_numeric( $post_id ) ) {
			return new WP_Error( 'invalid_post_id', 'Invalid post ID' );
		}

		$post = get_post( intval( $post_id ) );
		if ( ! $post instanceof WP_Post ) {
			return new WP_Error( 'invalid_post_object', 'Invalid post object' );
		}

		$post_builder = new Post_Builder( $this->parsely, $post );

		$authors = $post_builder->get_author_names( $post );

		return (object) array(
			'authors' => $authors,
		);
	}
}

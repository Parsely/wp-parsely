<?php
/**
 * Smart Linking endpoint: Provides endpoints for managing smart links
 *
 * @package Parsely
 * @since   3.16.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints\Content_Helper;

use InvalidArgumentException;
use Parsely\Endpoints\Base_Endpoint;
use Parsely\Models\Smart_Link;
use Parsely\Parsely;
use WP_Post;
use WP_REST_Request;
use WP_REST_Response;

/**
 * Smart Linking endpoint class.
 *
 * Provides endpoints for managing smart links.
 *
 * @since 3.16.0
 */
class Smart_Linking_Endpoint extends Base_Endpoint {

	/**
	 * The endpoint base path.
	 *
	 * @since 3.16.0
	 *
	 * @var string
	 */
	protected const ENDPOINT = '/smart-linking';

	/**
	 * The post meta key for storing smart links.
	 *
	 * @since 3.16.0
	 *
	 * @var string
	 */
	protected const POST_META_KEY = '_parsely_smart_links';

	/**
	 * The current post.
	 *
	 * @since 3.16.0
	 *
	 * @var WP_Post|null
	 */
	protected $current_post;

	/**
	 * Returns whether the endpoint is available for access by the current
	 * user.
	 *
	 * @since 3.16.0
	 *
	 * @param WP_REST_Request|null $request The request object.
	 * @return bool
	 */
	public function is_available_to_current_user( $request = null ): bool {
		if ( null === $request ) {
			return false;
		}

		$post_id = $request->get_param( 'post_id' );

		if ( null !== $post_id ) {
			// Check if the current user has edit capabilities for the post.
			$can_edit = current_user_can( 'edit_post', $post_id );
		} else {
			$can_edit = current_user_can( 'edit_posts' );
		}

		// Check if the current user has the smart linking capability.
		$has_capability = current_user_can(
			// phpcs:ignore WordPress.WP.Capabilities.Undetermined
			$this->apply_capability_filters(
				Base_Endpoint::DEFAULT_ACCESS_CAPABILITY
			)
		);

		return $can_edit && $has_capability;
	}

	/**
	 * Registers the endpoints.
	 *
	 * @since 3.16.0
	 */
	public function run(): void {
		$this->register_endpoint(
			static::ENDPOINT . '/url-to-post-type',
			'url_to_post_type',
			array( 'POST' )
		);

		$this->register_endpoint_with_args(
			static::ENDPOINT . '/(?P<post_id>\d+)/add',
			'add_smart_link',
			array( 'POST' )
		);
	}

	/**
	 * Converts a URL to a post type.
	 *
	 * @since 3.16.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response The response object.
	 */
	public function url_to_post_type( WP_REST_Request $request ): WP_REST_Response {
		$url = $request->get_param( 'url' );

		if ( ! is_string( $url ) ) {
			return new WP_REST_Response(
				array(
					'error' => array(
						'name'    => 'invalid_request',
						'message' => 'Invalid request body.',
					),
				),
				400
			);
		}

		$post_id = 0;
		$cache   = wp_cache_get( $url, 'wp_parsely_smart_link_url_to_postid' );

		if ( is_integer( $cache ) ) {
			$post_id = $cache;
		} elseif ( function_exists( 'wpcom_vip_url_to_postid' ) ) {
			$post_id = wpcom_vip_url_to_postid( $url );
		} else {
			// phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.url_to_postid_url_to_postid
			$post_id = url_to_postid( $url );
			wp_cache_set( $url, $post_id, 'wp_parsely_smart_link_url_to_postid' );
		}

		$response = array(
			'data' => array(
				'post_id'   => false,
				'post_type' => false,
			),
		);

		if ( 0 !== $post_id ) {
			$response['data']['post_id']   = $post_id;
			$response['data']['post_type'] = get_post_type( $post_id );
		}

		return new WP_REST_Response( $response, 200 );
	}

	/**
	 * Validates the request parameters.
	 *
	 * @since 3.16.0
	 *
	 * @throws InvalidArgumentException If the request is invalid.
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return bool True if the request is valid, false otherwise.
	 */
	private function validate_request( WP_REST_Request $request ): bool {
		$post_id = $request->get_param( 'post_id' );

		if ( ! is_numeric( $post_id ) ) {
			throw new InvalidArgumentException( 'Invalid post ID' );
		}

		// Check if post exists.
		$post = get_post( intval( $post_id ) );
		if ( null === $post ) {
			throw new InvalidArgumentException( 'Invalid post ID' );
		}

		return true;
	}

	/**
	 * Adds a smart link to a post.
	 *
	 * @since 3.16.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response The response object.
	 */
	public function add_smart_link( WP_REST_Request $request ): WP_REST_Response {
		try {
			$this->validate_request( $request );

			$post_id = $request->get_param( 'post_id' );
			if ( is_numeric( $post_id ) ) {
				$post_id = intval( $post_id );
			} else {
				// Validate makes sure it's numeric, so this should never happen.
				$post_id = 0;
			}

			$json_body = $request->get_body();
			$body_data = json_decode( $json_body, true );

			if ( ! is_array( $body_data ) || ! isset( $body_data['link'] ) ) {
				return new WP_REST_Response(
					array(
						'error' => array(
							'name'    => 'invalid_request',
							'message' => 'Invalid request body.',
						),
					),
					400
				);
			}

			$encoded_data = wp_json_encode( $body_data['link'] );
			if ( false === $encoded_data ) {
				return new WP_REST_Response(
					array(
						'error' => array(
							'name'    => 'invalid_request',
							'message' => 'Invalid request body.',
						),
					),
					400
				);
			}

			/**
			 * Smart link object.
			 *
			 * @var Smart_Link $smart_link The smart link object.
			 */
			$smart_link = Smart_Link::deserialize( $encoded_data );
			$smart_link->set_post_id( $post_id );

			// Save the smart link to the post meta.
			if ( ! $smart_link->save() ) {
				return new WP_REST_Response(
					array(
						'error' => array(
							'name'    => 'add_smart_link_failed',
							'message' => 'Failed to add smart link.',
						),
					),
					500
				);
			}

			return new WP_REST_Response(
				array(
					'data' => json_decode( $smart_link->serialize() ),
				),
				200
			);
		} catch ( \InvalidArgumentException $e ) {
			return new WP_REST_Response(
				array(
					'error' => array(
						'name'    => 'invalid_request',
						'message' => $e->getMessage(),
					),
				),
				400
			);
		}
	}
}

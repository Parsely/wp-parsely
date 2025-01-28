<?php
/**
 * Endpoint: Traffic Boost
 * Parse.ly Content Helper `/traffic-boost` API endpoint class
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\REST_API\Content_Helper;

use Parsely\Models\Inbound_Smart_Link;
use Parsely\REST_API\Base_Endpoint;
use Parsely\REST_API\Use_Post_ID_Parameter_Trait;
use Parsely\Services\Suggestions_API\Suggestions_API_Service;
use WP_Error;
use WP_Post;
use WP_REST_Request;
use WP_REST_Response;

/**
 * The Traffic Boost API.
 *
 * Provides an endpoint for getting traffic boost suggestions for a given post.
 *
 * @since 3.17.0
 */
class Endpoint_Traffic_Boost extends Base_Endpoint {
	use Content_Helper_Feature;
	use Use_Post_ID_Parameter_Trait;

	/**
	 * The Suggestions API service.
	 *
	 * @since 3.17.0
	 *
	 * @var Suggestions_API_Service $suggestions_api
	 */
	protected $suggestions_api;

	/**
	 * Initializes the class.
	 *
	 * @since 3.17.0
	 *
	 * @param Content_Helper_Controller $controller The content helper controller.
	 */
	public function __construct( Content_Helper_Controller $controller ) {
		parent::__construct( $controller );
		$this->suggestions_api = $controller->get_parsely()->get_suggestions_api();
	}

	/**
	 * Returns the name of the endpoint.
	 *
	 * @since 3.17.0
	 *
	 * @return string The endpoint name.
	 */
	public static function get_endpoint_name(): string {
		return 'traffic-boost';
	}

	/**
	 * Returns the name of the feature associated with the current endpoint.
	 *
	 * @since 3.17.0
	 *
	 * @return string The feature name.
	 */
	public function get_pch_feature_name(): string {
		return 'traffic_boost';
	}

	/**
	 * Registers the routes for the endpoint.
	 *
	 * @since 3.17.0
	 */
	public function register_routes(): void {
		/**
		 * POST /traffic-boost/{post_id}/generate
		 * Gets traffic boost suggestions for a post.
		 */
		$this->register_rest_route_with_post_id(
			'/generate',
			array( 'POST' ),
			array( $this, 'generate_link_suggestions' ),
			array(
				'max_items'        => array(
					'type'        => 'integer',
					'description' => __( 'The maximum number of suggestions to return.', 'wp-parsely' ),
					'default'     => 10,
				),
				'save'             => array(
					'type'        => 'boolean',
					'description' => __( 'Whether to save the suggestions.', 'wp-parsely' ),
					'default'     => false,
				),
				'discard_previous' => array(
					'type'        => 'boolean',
					'description' => __( 'Whether to discard the previous suggestions.', 'wp-parsely' ),
					'default'     => true,
				),
			)
		);

		/**
		 * GET /traffic-boost/{post_id}/get-suggestions.
		 * Gets the existing inbound smart links for a post.
		 */
		$this->register_rest_route_with_post_id(
			'/get-suggestions',
			array( 'GET' ),
			array( $this, 'get_existing_suggestions' )
		);

		/**
		 * GET /traffic-boost/{post_id}/get-inbound.
		 * Gets the inbound smart links for a post.
		 */
		$this->register_rest_route_with_post_id(
			'/get-inbound',
			array( 'GET' ),
			array( $this, 'get_inbound_smart_links' )
		);

		/**
		 * POST /traffic-boost/{post_id}/accept-suggestion/{smart_link_id}  
		 * Accepts a specific suggestion for a post.
		 */
		$this->register_rest_route_with_post_id(
			'/accept-suggestion/(?P<smart_link_id>[0-9]+)',
			array( 'POST' ),
			array( $this, 'accept_suggestion' ),
			array(
				'smart_link_id' => array(
					'type'              => 'integer',
					'description'       => __( 'The ID of the smart link to accept.', 'wp-parsely' ),
					'required'          => true,
					'validate_callback' => array( $this, 'validate_smart_link_id' ),
				),
			)
		);

		/**
		 * DELETE /traffic-boost/{post_id}/discard-suggestions.
		 * Discards all existing suggestions for a post.
		 */
		$this->register_rest_route_with_post_id(
			'/discard-suggestions',
			array( 'DELETE' ),
			array( $this, 'discard_suggestions' )
		);

		/**
		 * DELETE /traffic-boost/{post_id}/discard-suggestion/{smart_link_id}.
		 * Discards a specific suggestion for a post.
		 */
		$this->register_rest_route_with_post_id(
			'/discard-suggestion/(?P<smart_link_id>[0-9]+)',
			array( 'DELETE' ),
			array( $this, 'discard_suggestion' ),
			array(
				'smart_link_id' => array(
					'type'              => 'integer',
					'description'       => __( 'The ID of the smart link to discard.', 'wp-parsely' ),
					'required'          => true,
					'validate_callback' => array( $this, 'validate_smart_link_id' ),
				),
			)
		);

		/**
		 * DELETE /traffic-boost/{post_id}/delete-inbound/{smart_link_id}.
		 * Deletes an inbound smart link for a post.
		 */
		$this->register_rest_route_with_post_id(
			'/delete-inbound/(?P<smart_link_id>[0-9]+)',
			array( 'DELETE' ),
			array( $this, 'delete_inbound' ),
			array(
				'smart_link_id' => array(
					'type'              => 'integer',
					'description'       => __( 'The ID of the smart link to delete.', 'wp-parsely' ),
					'required'          => true,
					'validate_callback' => array( $this, 'validate_smart_link_id' ),
				),
			)
		);
	}

	/**
	 * API Endpoint: POST /traffic-boost/{post_id}/generate.
	 *
	 * Gets traffic boost suggestions for a post.
	 *
	 * @since 3.17.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response|WP_Error The response object.
	 */
	public function generate_link_suggestions( WP_REST_Request $request ) {
		/**
		 * The post object.
		 *
		 * @var WP_Post $post
		 */
		$post = $request->get_param( 'post' );

		/**
		 * The maximum number of suggestions to return.
		 *
		 * @var int $max_items
		 */
		$max_items = $request->get_param( 'max_items' );

		/**
		 * Whether to save the suggestions.
		 *
		 * @var bool $save
		 */
		$save = $request->get_param( 'save' );

		/**
		 * Whether to discard the previous suggestions.
		 *
		 * @var bool $discard_previous
		 */
		$discard_previous = $request->get_param( 'discard_previous' );
		

		$inbound_suggestions = $this->suggestions_api->get_inbound_links(
			$post,
			array(
				'max_items'      => $max_items,
				'max_link_words' => 4,
			)
		);

		if ( is_wp_error( $inbound_suggestions ) ) {
			return $inbound_suggestions;
		}

		$discard_result = null;

		// If the discard_previous flag is set, discard the previous suggestions.
		if ( $discard_previous ) {
			$discard_result = Inbound_Smart_Link::delete_pending_suggestions( $post->ID );
		}

		$suggestions = array_map(
			function ( Inbound_Smart_Link $link ) use ( $save ) {
				// If the save flag is set, save the smart link.
				if ( $save ) {
					$link->applied = false;
					$link->save();
				}

				return $link->to_array();
			},
			$inbound_suggestions
		);

		$response = array(
			'data' => $suggestions,
		);

		if ( null !== $discard_result ) {
			$response['discarded'] = $discard_result;
		}

		return new WP_REST_Response( $response, 200 );
	}

	/**
	 * API Endpoint: GET /traffic-boost/{post_id}/get-suggestions.
	 *
	 * Gets the existing inbound smart links for a post.
	 *
	 * @since 3.18.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response The response object.
	 */
	public function get_existing_suggestions( WP_REST_Request $request ) {
		$post_id = $request->get_param( 'post_id' );

		$suggestions = Inbound_Smart_Link::get_existing_suggestions( $post_id );

		// Convert the inbound smart links to an array.
		$suggestions = array_map(
			function ( Inbound_Smart_Link $link ) {
				return $link->to_array();
			},
			$suggestions
		);

		return new WP_REST_Response( array( 'data' => $suggestions ), 200 );
	}

	/**
	 * API Endpoint: GET /traffic-boost/{post_id}/get-inbound.
	 *
	 * Gets the inbound smart links for a post.
	 *
	 * @since 3.18.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response The response object.
	 */
	public function get_inbound_smart_links( WP_REST_Request $request ) {
		$post_id = $request->get_param( 'post_id' );

		// Get the inbound smart links for the post.
		$inbound_links = Inbound_Smart_Link::get_inbound_smart_links( $post_id, true );

		// Convert the inbound smart links to an array.
		$inbound_links = array_map(
			function ( Inbound_Smart_Link $link ) {
				return $link->to_array();
			},
			$inbound_links
		);

		return new WP_REST_Response( array( 'data' => $inbound_links ), 200 );
	}

	/**
	 * API Endpoint: DELETE /traffic-boost/{post_id}/discard-suggestions.
	 *
	 * Discards all existing suggestions for a post.
	 *
	 * @since 3.18.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response The response object.
	 */
	public function discard_suggestions( WP_REST_Request $request ) {
		$post_id = $request->get_param( 'post_id' );

		$result = Inbound_Smart_Link::delete_pending_suggestions( $post_id );

		return new WP_REST_Response( array( 'data' => $result ), 200 );
	}

	/**
	 * API Endpoint: DELETE /traffic-boost/{post_id}/discard-suggestion/{smart_link_id}.
	 *
	 * Discards a specific suggestion for a post.
	 *
	 * @since 3.18.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response The response object.
	 */
	public function discard_suggestion( WP_REST_Request $request ) {
		/**
		 * The inbound smart link.
		 *
		 * @var Inbound_Smart_Link $inbound_link
		 */
		$inbound_link = $request->get_param( 'inbound_link' );

		$deleted = $inbound_link->delete();

		return new WP_REST_Response( array( 'data' => array( 'success' => $deleted ) ), 200 );
	}

	/** 
	 * API Endpoint: DELETE /traffic-boost/{post_id}/delete-inbound/{smart_link_id}.
	 *
	 * Deletes an inbound smart link for a post.
	 *
	 * @since 3.18.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response The response object.
	 */
	public function delete_inbound( WP_REST_Request $request ) {
		/**
		 * The inbound smart link.
		 *
		 * @var Inbound_Smart_Link $inbound_link
		 */
		$inbound_link = $request->get_param( 'inbound_link' );

		$deleted = $inbound_link->delete();

		// TODO: Remove the actual inbound link from the post.

		return new WP_REST_Response( array( 'data' => array( 'success' => $deleted ) ), 200 );
	}

	/**
	 * API Endpoint: POST /traffic-boost/{post_id}/accept-suggestion/{smart_link_id}.
	 *
	 * Accepts a specific suggestion for a post.
	 *
	 * @since 3.18.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response The response object.
	 */
	public function accept_suggestion( WP_REST_Request $request ) {
		/**
		 * The inbound smart link.
		 *
		 * @var Inbound_Smart_Link $inbound_link
		 */
		$inbound_link = $request->get_param( 'inbound_link' );

		$inbound_link->applied = true;
		$inbound_link->save();

		// TODO: Add the inbound link to the post at the correct position.

		return new WP_REST_Response( array( 'data' => array( 'success' => true ) ), 200 );
	}

	/**
	 * Validates a smart link ID.
	 *
	 * @since 3.18.0
	 *
	 * @param int             $smart_link_id The smart link ID.
	 * @param WP_REST_Request $request The request object.
	 * @return bool|WP_Error True if the smart link ID is valid, WP_Error on failure.
	 */
	public function validate_smart_link_id( int $smart_link_id, WP_REST_Request $request ) {
		/** @var Inbound_Smart_Link|false $inbound_link */
		$inbound_link = Inbound_Smart_Link::get_smart_link_by_id( $smart_link_id );

		if ( false === $inbound_link ) {
			return new WP_Error(
				'parsely_smart_link_not_found',
				__( 'Smart link not found', 'wp-parsely' )
			);
		}

		// Set the inbound link in the request.
		$request->set_param( 'inbound_link', $inbound_link );

		// Validate if the smart link is associated with the post.
		$post_id = intval( $request->get_param( 'post_id' ) );

		if ( $inbound_link->destination_post_id !== $post_id ) {
			return new WP_Error(
				'parsely_invalid_smart_link',
				__( 'Smart link is not associated with this post', 'wp-parsely' )
			);
		}

		return true;
	}
}

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
				'max_items' => array(
					'type'        => 'integer',
					'description' => __( 'The maximum number of suggestions to return.', 'wp-parsely' ),
					'default'     => 10,
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

		$response = $this->suggestions_api->get_inbound_links(
			$post,
			array(
				'max_items'      => $max_items,
				'max_link_words' => 4,
			)
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$suggestions = array_map(
			function ( Inbound_Smart_Link $link ) {
				return $link->to_array();
			},
			$response
		);

		return new WP_REST_Response( array( 'data' => $suggestions ), 200 );
	}
} 

<?php
/**
 * Endpoint: Excerpt Generator
 * Parse.ly Content Helper `/excerpt-generator` API endpoint class
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\REST_API\Content_Helper;

use Parsely\RemoteAPI\ContentSuggestions\Suggest_Brief_API;
use Parsely\REST_API\Base_Endpoint;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

/**
 * The Excerpt Generator API.
 *
 * Provides an endpoint for generating excerpts for the given content.
 *
 * @since 3.17.0
 */
class Endpoint_Excerpt_Generator extends Base_Endpoint {
	use Content_Helper_Feature;

	/**
	 * The Suggest Brief API instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Suggest_Brief_API $suggest_brief_api
	 */
	protected $suggest_brief_api;

	/**
	 * Initializes the class.
	 *
	 * @since 3.17.0
	 *
	 * @param Content_Helper_Controller $controller The content helper controller.
	 */
	public function __construct( Content_Helper_Controller $controller ) {
		parent::__construct( $controller );
		$this->suggest_brief_api = new Suggest_Brief_API( $this->parsely );
	}

	/**
	 * Returns the name of the endpoint.
	 *
	 * @since 3.17.0
	 *
	 * @return string The endpoint name.
	 */
	public function get_endpoint_name(): string {
		return 'excerpt-generator';
	}

	/**
	 * Returns the name of the feature associated with the current endpoint.
	 *
	 * @since 3.17.0
	 *
	 * @return string The feature name.
	 */
	public function get_pch_feature_name(): string {
		return 'excerpt_suggestions';
	}

	/**
	 * Registers the routes for the endpoint.
	 *
	 * @since 3.17.0
	 */
	public function register_routes(): void {
		/**
		 * POST /excerpt-generator/generate
		 * Generates an excerpt for the given content.
		 */
		$this->register_rest_route(
			'generate',
			array( 'POST' ),
			array( $this, 'generate_excerpt' ),
			array(
				'text'    => array(
					'description' => __( 'The text to generate the excerpt from.', 'wp-parsely' ),
					'type'        => 'string',
					'required'    => true,
				),
				'title'   => array(
					'description' => __( 'The title of the content.', 'wp-parsely' ),
					'type'        => 'string',
					'required'    => true,
				),
				'persona' => array(
					'description' => __( 'The persona of the content.', 'wp-parsely' ),
					'type'        => 'string',
					'required'    => false,
					'default'     => 'journalist',
				),
				'style'   => array(
					'description' => __( 'The style of the content.', 'wp-parsely' ),
					'type'        => 'string',
					'required'    => false,
					'default'     => 'neutral',
				),
			)
		);
	}

	/**
	 * API Endpoint: POST /excerpt-generator/generate
	 *
	 * Generates an excerpt for the passed content.
	 *
	 * @since 3.17.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response|WP_Error The response object.
	 */
	public function generate_excerpt( WP_REST_Request $request ) {
		/**
		 * The post content to be sent to the API.
		 *
		 * @var string $post_content
		 */
		$post_content = $request->get_param( 'text' );

		/**
		 * The post title to be sent to the API.
		 *
		 * @var string $post_title
		 */
		$post_title = $request->get_param( 'title' );

		/**
		 * The persona to be sent to the API.
		 *
		 * @var string $persona
		 */
		$persona = $request->get_param( 'persona' );

		/**
		 * The style to be sent to the API.
		 *
		 * @var string $style
		 */
		$style = $request->get_param( 'style' );

		$response = $this->suggest_brief_api->get_suggestion( $post_title, $post_content, $persona, $style );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return new WP_REST_Response( array( 'data' => $response ), 200 );
	}
}

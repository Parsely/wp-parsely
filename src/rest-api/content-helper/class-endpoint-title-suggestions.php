<?php
/**
 * API Endpoint: Title Suggestions
 * Parse.ly Content Helper `/title-suggestions` API endpoint class
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\REST_API\Content_Helper;

use Parsely\RemoteAPI\ContentSuggestions\Suggest_Headline_API;
use Parsely\REST_API\Base_Endpoint;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

/**
 * The Title Suggestions API.
 *
 * Provides an endpoint for generating titles for the given content.
 *
 * @since 3.17.0
 */
class Endpoint_Title_Suggestions extends Base_Endpoint {
	use Content_Helper_Feature;

	protected const ENDPOINT = 'title-suggestions';

	/**
	 * The Suggest Headline API.
	 *
	 * @since 3.17.0
	 *
	 * @var Suggest_Headline_API $suggest_headline_api
	 */
	private $suggest_headline_api;

	/**
	 * Initializes the class.
	 *
	 * @since 3.17.0
	 *
	 * @param Content_Helper_Controller $controller The content helper controller.
	 */
	public function __construct( Content_Helper_Controller $controller ) {
		parent::__construct( $controller );
		$this->suggest_headline_api = new Suggest_Headline_API( $this->parsely );
	}

	/**
	 * Returns the name of the endpoint.
	 *
	 * @since 3.17.0
	 *
	 * @return string The endpoint name.
	 */
	public function get_endpoint_name(): string {
		return 'title-suggestions';
	}

	/**
	 * Returns the name of the feature associated with the current endpoint.
	 *
	 * @since 3.17.0
	 *
	 * @return string
	 */
	public function get_pch_feature_name(): string {
		return 'title_suggestions';
	}

	/**
	 * Registers the routes for the endpoint.
	 *
	 * This method should be overridden by child classes and used to register
	 * the routes for the endpoint.
	 *
	 * @since 3.17.0
	 */
	public function register_routes(): void {
		/**
		 * POST /title-suggestions/generate
		 * Generates titles for the given content.
		 */
		$this->register_rest_route(
			'generate',
			array( 'POST' ),
			array( $this, 'generate_titles' ),
			array(
				'content' => array(
					'description' => __( 'The content for which to generate titles.', 'wp-parsely' ),
					'required'    => true,
					'type'        => 'string',
				),
				'limit'   => array(
					'description' => __( 'The maximum number of titles to generate.', 'wp-parsely' ),
					'required'    => false,
					'type'        => 'integer',
					'default'     => 3,
				),
				'style'   => array(
					'description' => __( 'The style  of the titles to generate.', 'wp-parsely' ),
					'required'    => false,
					'type'        => 'string',
					'default'     => 'neutral',
				),
				'persona' => array(
					'description' => __( 'The persona of the titles to generate.', 'wp-parsely' ),
					'required'    => false,
					'type'        => 'string',
					'default'     => 'journalist',
				),
			)
		);
	}

	/**
	 * API Endpoint: POST /title-suggestions/generate
	 *
	 * Generates titles for the given content.
	 *
	 * @since 3.17.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response|\WP_Error The response object or a WP_Error object on failure.
	 */
	public function generate_titles( WP_REST_Request $request ) {
		/**
		 * The post content to be sent to the API.
		 *
		 * @var string $post_content
		 */
		$post_content = $request->get_param( 'content' );

		/**
		 * The maximum number of titles to generate.
		 *
		 * @var int $limit
		 */
		$limit = $request->get_param( 'limit' );

		/**
		 * The style of the titles to generate.
		 *
		 * @var string $style
		 */
		$style = $request->get_param( 'style' );

		/**
		 * The tone of the titles to generate.
		 *
		 * @var string $persona
		 */
		$persona = $request->get_param( 'persona' );

		if ( 0 === $limit ) {
			$limit = 3;
		}

		$response = $this->suggest_headline_api->get_titles( $post_content, $limit, $persona, $style );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return new WP_REST_Response( array( 'data' => $response ), 200 );
	}
}

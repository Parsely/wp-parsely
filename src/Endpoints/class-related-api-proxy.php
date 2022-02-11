<?php
/**
 * Parsely Related REST API Endpoint
 *
 * @package Parsely
 */

declare(strict_types=1);

namespace Parsely\Endpoints;

use Parsely\Parsely;
use Parsely\RemoteAPI\Related_Caching_Decorator;
use Parsely\RemoteAPI\Related_Proxy;
use stdClass;
use WP_Error;
use WP_Object_Cache;
use WP_REST_Server;
use WP_REST_Request;

/**
 * Configure a REST API endpoint for use e.g. by the Related Block.
 */
final class Related_API_Proxy {
	/**
	 * Used to inject dependencies.
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Entrypoint to register the endpoint and otherwise initialize this class.
	 *
	 * @return void
	 */
	public function run() {
		if ( ! apply_filters( 'wp_parsely_enable_related_endpoint', false ) ) {
			return;
		}

		register_rest_route(
			'wp-parsely/v1',
			'/related',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'permission_callback' ),
					'args'                => array(
						'query' => array(
							'default'           => array(),
							'sanitize_callback' => function ( $query ) {
								// question: how should we sanitize these?
								return (array) $query;
							},
						),
					),
				),
			)
		);
	}

	/**
	 * Determine if the endpoint can be called.
	 *
	 * @return boolean
	 */
	public function permission_callback() {
		// Unauthenticated.
		return true;
	}

	/**
	 * Cached "proxy" to the Parsely `/related` endpoint
	 *
	 * @param WP_Rest_Request $request The request object.
	 * @return array
	 */
	public function get_items( WP_Rest_Request $request ) {
		$options = $this->parsely->get_options();
		$apikey  = $options['apikey'];
		$params  = $request->get_params();

		if ( empty( $apikey ) ) {
			return (object) array(
				'data'  => array(),
				'error' => new WP_Error( 400, __( 'A Parse.ly API Key must be set in site options to use this endpoint', 'wp-parsely' ) ),
			);
		}

		$proxy        = new Related_Proxy( $this->parsely, $params['query'] );
		$cached_proxy = new Related_Caching_Decorator( $proxy, $GLOBALS['wp_object_cache'] );
		$links        = $cached_proxy->get_items();

		if ( is_wp_error( $links ) ) {
			$response = (object) array(
				'data'  => array(),
				'error' => $links,
			);
			return $response;
		}

		$data = array_map(
			function( stdClass $link ) {
				return (object) array(
					'image_url' => $link->image_url,
					'title'     => $link->title,
					'url'       => $link->url,
				);
			},
			$links
		);

		return (object) array( 'data' => $data );
	}
}

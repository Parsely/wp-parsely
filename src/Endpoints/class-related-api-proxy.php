<?php
/**
 * Parsely Related REST API Endpoint
 *
 * @package Parsely
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints;

use Parsely\Parsely;
use Parsely\RemoteAPI\Cached_Proxy;
use Parsely\RemoteAPI\Related_Proxy;
use Parsely\RemoteAPI\WordPress_Cache;
use stdClass;
use WP_Error;
use WP_REST_Server;
use WP_REST_Request;

/**
 * Configure a REST API endpoint for use e.g. by the Related Block.
 */
final class Related_API_Proxy {
	/**
	 * @var Parsely
	 */
	private $parsely;

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

		$get_items_args = array(
			'query' => array(
				'default'           => array(),
				'sanitize_callback' => function ( $query ) {
					// question: how should we sanitize these?
					return (array) $query;
				},
			),
		);

		register_rest_route(
			'wp-parsely/v1',
			'/related',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'permission_callback' ),
					'args'                => $get_items_args,
				),
			)
		);
	}

	/**
	 * Determine if the endpoint can be called.
	 *
	 * @return bool
	 */
	public function permission_callback(): bool {
		// Unauthenticated.
		return true;
	}

	/**
	 * Cached "proxy" to the Parsely `/related` endpoint
	 *
	 * @param WP_Rest_Request $request The request object.
	 * @return stdClass|WP_Error
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

		// Find a way to instantiate these objects outside this class.
		// Probably inject a Proxy object into the constructor, and then pass the query into `get_items()`.
		$proxy        = new Related_Proxy( $this->parsely );
		$cached_proxy = new Cached_Proxy( $proxy, new WordPress_Cache( $GLOBALS['wp_object_cache'] ) );
		$links        = $cached_proxy->get_items( $params['query'] );

		if ( is_wp_error( $links ) ) {
			return (object) array(
				'data'  => array(),
				'error' => $links,
			);
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

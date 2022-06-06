<?php
/**
 * Endpoints: Parse.ly `/analytics` API proxy endpoint class
 *
 * @package Parsely
 * @since   3.4.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints;

use Parsely\Parsely;
use Parsely\RemoteAPI\Proxy;
use stdClass;
use WP_Error;
use WP_REST_Server;
use WP_REST_Request;

/**
 * Configures a REST API endpoint for use.
 */
final class Analytics_API_Proxy {
	/**
	 * Parsely object instance.
	 *
	 * @var Parsely
	 */
	private $parsely;

	/**
	 * Proxy object which does the actual calls to the Parse.ly API.
	 *
	 * @var Proxy
	 */
	private $proxy;

	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 * @param Proxy   $proxy   Proxy object which does the actual calls to the
	 *                         Parse.ly API.
	 */
	public function __construct( Parsely $parsely, Proxy $proxy ) {
		$this->parsely = $parsely;
		$this->proxy   = $proxy;
	}

	/**
	 * Registers the endpoint and initializes this class.
	 */
	public function run(): void {
		if ( ! apply_filters( 'wp_parsely_enable_analytics_api_proxy', true ) ) {
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

		$rest_route_args = array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_items' ),
				'permission_callback' => array( $this, 'permission_callback' ),
				'args'                => $get_items_args,
			),
		);

		register_rest_route( 'wp-parsely/v1/analytics', '/posts', $rest_route_args );
	}

	/**
	 * Determines if the endpoint can be called.
	 *
	 * @return bool
	 */
	public function permission_callback(): bool {
		// Unauthenticated.
		return true;
	}

	/**
	 * Cached "proxy" to the Parsely `/analytics` endpoint
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return stdClass
	 */
	public function get_items( WP_REST_Request $request ) {
		$params = $request->get_params();

		if ( false === $this->parsely->api_key_is_set() ) {
			return (object) array(
				'data'  => array(),
				'error' => new WP_Error( 400, __( 'A Parse.ly API Key must be set in site options to use this endpoint', 'wp-parsely' ) ),
			);
		}

		if ( false === $this->parsely->api_secret_is_set() ) {
			return (object) array(
				'data'  => array(),
				'error' => new WP_Error( 400, __( 'A Parse.ly API Secret must be set in site options to use this endpoint', 'wp-parsely' ) ),
			);
		}

		// A proxy with caching behaviour is used here.
		$response = $this->proxy->get_items( $params );

		if ( is_wp_error( $response ) ) {
			return (object) array(
				'data'  => array(),
				'error' => $response,
			);
		}

		$data = array_map(
			static function( stdClass $item ) {
				return (object) array(
					'author' => $item->author,
					'date'   => $item->pub_date,
					'title'  => $item->title,
					'url'    => $item->url,
				);
			},
			$response
		);

		return (object) array( 'data' => $data );
	}
}

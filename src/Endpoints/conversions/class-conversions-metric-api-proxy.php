<?php
/**
 * Endpoints: Parse.ly Content Suggestions `/suggest-linked-reference` API proxy endpoint
 * class
 *
 * @package Parsely
 * @since   3.14.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints\Conversions;

use Parsely\Endpoints\Base_API_Proxy;
use Parsely\Parsely;
use Parsely\RemoteAPI\Conversions\Conversions_Metric_API;
use stdClass;
use WP_REST_Request;
use WP_Error;

/**
 * Configures the `/content-suggestions/suggest-linked-reference` REST API endpoint.
 *
 * @since 3.14.0
 */
final class Conversions_Metric_API_Proxy extends Base_API_Proxy {
	/**
	 * The Suggest Linked Reference API instance.
	 *
	 * @var Suggest_Linked_Reference_API $suggest_linked_reference_api
	 */
	private $conversions_metric_api;

	/**
	 * Initializes the class.
	 *
	 * @since 3.14.0
	 *
	 * @param Parsely $parsely The Parsely plugin instance.
	 */
	public function __construct( Parsely $parsely ) {
		$this->conversions_metric_api = new Conversions_Metric_API( $parsely );
		parent::__construct( $parsely, $this->conversions_metric_api );
	}

	/**
	 * Registers the endpoint's WP REST route.
	 *
	 * @since 3.14.0
	 */
	public function run(): void {
		$this->register_endpoint( '/conversions/conversions-metric', array( 'GET' ) );
	}

	/**
	 * Generates the final data from the passed response.
	 *
	 * @since 3.14.0
	 *
	 * @param array<stdClass> $response The response received by the proxy.
	 * @return array<stdClass> The generated data.
	 */
	protected function generate_data( $response ): array {
		// Unused function.
		return $response;
	}

	/**
	 * Cached "proxy" to the Parse.ly API endpoint.
	 *
	 * @since 3.14.0
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return stdClass|WP_Error stdClass containing the data or a WP_Error
	 *                           object on failure.
	 */
	public function get_items( WP_REST_Request $request ) {
		$validation = $this->validate_apikey_and_secret();
		if ( is_wp_error( $validation ) ) {
			return $validation;
		}

		$response = $this->conversions_metric_api->get_metrics();

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return (object) array(
			'data' => $response,
		);
	}
}

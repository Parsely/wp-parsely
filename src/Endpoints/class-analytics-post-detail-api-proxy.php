<?php
/**
 * Endpoints: Parse.ly `/analytics/post/detail` API proxy endpoint class
 *
 * @package Parsely
 * @since   3.6.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints;

use stdClass;
use WP_REST_Request;

/**
 * Configures the `/analytics/post/detail` REST API endpoint.
 */
final class Analytics_Post_Detail_API_Proxy extends Base_API_Proxy {

	/**
	 * Registers the endpoint's WP REST route.
	 */
	public function run(): void {
		$this->register_endpoint( '/analytics/post/detail' );
	}

	/**
	 * Cached "proxy" to the Parse.ly `/analytics/post/detail` API endpoint.
	 *
	 * @param WP_REST_Request $request The request object.
	 */
	public function get_items( WP_REST_Request $request ): stdClass {
		return $this->get_data( $request );
	}

	/**
	 * Generates the final data from the passed response.
	 *
	 * @param array<string, mixed> $response The response received by the proxy.
	 * @return array<stdClass> The generated data.
	 */
	protected function generate_data( array $response ): array {
		$stats_base_url = trailingslashit( 'https://dash.parsely.com/' . $this->parsely->get_api_key() ) . 'find';

		$result = array_map(
			static function( stdClass $item ) use ( $stats_base_url ) {
				return (object) array(
					'avgEngaged' => number_format_i18n( $item->avg_engaged, 3 ),
					'statsUrl'   => $stats_base_url . '?url=' . rawurlencode( $item->url ),
					'url'        => $item->url,
					'views'      => number_format_i18n( $item->metrics->views ),
					'visitors'   => number_format_i18n( $item->metrics->visitors ),
				);
			},
			$response
		);

		return $result;
	}

	/**
	 * Determines if there are enough permissions to call the endpoint.
	 *
	 * @return bool
	 */
	public function permission_callback(): bool {
		// Unauthenticated.
		return true;
	}
}

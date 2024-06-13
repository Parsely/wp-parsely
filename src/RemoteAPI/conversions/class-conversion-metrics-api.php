<?php
/**
 * Remote API: Content Suggestions Suggest Linked Reference (Smart Links) API
 *
 * @package Parsely
 * @since   3.14.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI\Conversions;

use Parsely\Parsely;
use WP_Error;

require_once __DIR__ . '/class-conversion-metric.php';

/**
 * Class for Content Suggestions Suggest Linked Reference (Smart Links) API.
 *
 * @since 3.14.0
 *
 * @phpstan-import-type WP_HTTP_Request_Args from Parsely
 */
class Conversions_Metric_API extends Conversions_Base_API {
	protected const ENDPOINT     = '/conversions/url';
	protected const QUERY_FILTER = 'wp_parsely_conversions_metric_endpoint_args';

	public function get_metrics() {
		$decoded = $this->get_request();

		if ( is_wp_error( $decoded ) ) {
			return $decoded;
		}

		if ( ! property_exists( $decoded, 'data' ) ||
			! is_array( $decoded->data ) ) {
			return new WP_Error(
				400,
				__( 'Unable to parse conversions data from upstream API', 'wp-parsely' )
			);
		}

		$metrics = array();
		foreach ( $decoded->data as $data ) {
			if ( ! property_exists( $data, 'conversion_metrics' ) ||
				! is_array( $data->conversion_metrics ) ) {
				return new WP_Error(
					400,
					__( 'Unable to parse conversion metrics from upstream API', 'wp-parsely' )
				);
			}

			foreach( $data->conversion_metrics as $metric ) {
				$metric_obj = new Conversion_Metric();
				$metric_obj->attribution_type = esc_attr($metric->attribution_type);
				$metric_obj->conversion_label = esc_attr($metric->conversion_label);
				$metric_obj->conversion_type = esc_attr($metric->conversion_type);
				$metric_obj->conversions = esc_attr($metric->conversions);
				$metric_obj->converting_visitors = esc_attr($metric->converting_visitors);
				$metrics[]          = $metric_obj;
			}
		}

		return $metrics;
	}
}

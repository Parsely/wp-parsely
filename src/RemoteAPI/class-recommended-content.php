<?php
/**
 * Recommended_Content class file.
 *
 * @package Parsely
 * @see https://www.parse.ly/help/api/recommendations#get-related
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI;

use Parsely\Parsely;

const RELATED_API_ENDPOINT = 'https://api.parsely.com/v2/related';

/**
 * Recommended_Content
 */
class Recommended_Content {
	/**
	 * Instance of Parsely class.
	 *
	 * @var Parsely
	 */
	private $parsely;

	/**
	 * Recommended_Content class constructor.
	 *
	 * @param Parsely $parsely Parsely object.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Get URL for Recommendation API (GET /related).
	 *
	 * @since 3.2.0
	 *
	 * @param array $query The query arguments that will be passed to the backend API.
	 * @return string API URL.
	 */
	public function get_api_url( array $query = array() ): string {
		$query['apikey'] = $this->parsely->get_api_key();
		$query           = array_filter( $query );
		$query           = apply_filters( 'wp_parsely_related_endpoint_args', $query );
		return add_query_arg( $query, RELATED_API_ENDPOINT );
	}
}

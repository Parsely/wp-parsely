<?php
/**
 * Remote API: Content Suggestions Write Title API
 *
 * @package Parsely
 * @since 3.12.0
 */

namespace Parsely\RemoteAPI\ContentSuggestions;

use Parsely\Parsely;
use WP_Error;

/**
 * Class for Content Suggestions Write Title API.
 *
 * @since 3.12.0
 *
 * @phpstan-import-type WP_HTTP_Request_Args from Parsely
 */
class Write_Title_API extends Content_Suggestions_Base_API {
	protected const ENDPOINT     = '/write-title';
	protected const QUERY_FILTER = 'wp_parsely_write_title_endpoint_args';

	/**
	 * Indicates whether the endpoint is public or protected behind permissions.
	 *
	 * @since 3.12.0
	 * @var bool
	 */
	protected $is_public_endpoint = true;

	/**
	 * Generates titles for a given content using the Parse.ly
	 * Content Suggestion API.
	 *
	 * @since 3.12.0
	 *
	 * @param  string $content The query arguments to send to the remote API.
	 * @param  int    $limit The query arguments to send to the remote API.
	 * @return array<string>|WP_Error The response from the remote API, or a WP_Error
	 *                                object if the response is an error.
	 */
	public function get_titles( string $content, int $limit ) {
		$query = array(
			'persona' => 'journalist',
			'style'   => 'neutral',
			'limit'   => $limit,
		);

		$decoded = $this->post_request( $query, array( 'text' => $content ) );

		if ( is_wp_error( $decoded ) ) {
			return $decoded;
		}

		if ( ! property_exists( $decoded, 'titles' ) || ! is_array( $decoded->titles ) ) {
			return new WP_Error( 400, __( 'Unable to parse titles from upstream API', 'wp-parsely' ) );
		}

		return $decoded->titles;
	}
}

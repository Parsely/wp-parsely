<?php
/**
 * Remote API: Content Suggestions Suggest Links API
 *
 * @package Parsely
 * @since   3.14.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI\ContentSuggestions;

use Parsely\Parsely;
use WP_Error;

require_once __DIR__ . '/class-link-suggestion.php';

/**
 * Class for Content Suggestions Suggest Links API.
 *
 * @since 3.14.0
 *
 * @phpstan-import-type WP_HTTP_Request_Args from Parsely
 */
class Suggest_Links_API extends Content_Suggestions_Base_API {
	protected const ENDPOINT     = '/suggest-links';
	protected const QUERY_FILTER = 'wp_parsely_suggest_links_endpoint_args';

	/**
	 * Indicates whether the endpoint is public or protected behind permissions.
	 *
	 * @since 3.14.0
	 * @var bool
	 */
	protected $is_public_endpoint = false;

	/**
	 * Gets suggested cross-links for the given content.
	 *
	 * @param string $content        The content to generate links for.
	 * @param int    $max_link_words The maximum number of words in links.
	 * @param int    $max_links      The maximum number of links to return.
	 *
	 * @return Link_Suggestion[]|WP_Error The response from the remote API, or a WP_Error
	 *                                    object if the response is an error.
	 * @since 3.14.0
	 */
	public function get_links(
		string $content,
		int $max_link_words = 4,
		int $max_links = 10
	) {
		$query = array(
			'max_link_length' => $max_link_words,
			'max_links'       => $max_links,
		);

		$decoded = $this->post_request( $query, array( 'text' => $content ) );

		if ( is_wp_error( $decoded ) ) {
			return $decoded;
		}

		if ( ! property_exists( $decoded, 'links' ) ||
			! is_array( $decoded->links ) ) {
			return new WP_Error(
				400,
				__( 'Unable to parse meta description from upstream API', 'wp-parsely' )
			);
		}

		// Convert the links to Link_Suggestion objects.
		$links = array();
		foreach ( $decoded->links as $link ) {
			$link_obj         = new Link_Suggestion();
			$link_obj->href   = $link->href;
			$link_obj->title  = $link->title;
			$link_obj->text   = $link->text;
			$link_obj->offset = $link->offset;
			$links[]          = $link_obj;
		}

		return $links;
	}
}

<?php
/**
 * Parse.ly utilities class
 *
 * @package Parsely
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely;

use WP_Post;

/**
 * Utility methods to be reused across the codebase.
 *
 * @since 3.2.0
 */
class Utils {
	/**
	 * Generate the Parse.ly dashboard URL for the post.
	 *
	 * @since 2.6.0
	 * @since 3.2.0 Moved to class-utils.php. Renamed from `generate_url` and added source parameter.
	 *
	 * @param WP_Post $post   Which post object or ID to check.
	 * @param string  $apikey API key or empty string.
	 * @param string  $campaign Campaign name for the `utm_campaign` URL parameter.
	 * @param string  $source Source name for the `utm_source` URL parameter.
	 * @return string
	 */
	public static function generate_parsely_post_url( WP_Post $post, string $apikey, string $campaign, string $source ): string {
		$query_args = array(
			'url'          => rawurlencode( get_permalink( $post ) ),
			'utm_campaign' => $campaign,
			'utm_source'   => $source,
			'utm_medium'   => 'wp-parsely',
		);

		$base_url = trailingslashit( 'https://dash.parsely.com/' . $apikey ) . 'find';

		return add_query_arg( $query_args, $base_url );
	}
}

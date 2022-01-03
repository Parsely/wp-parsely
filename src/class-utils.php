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
	 * Generate the URL for the link.
	 *
	 * @since 2.6.0
	 * @since 3.2.0 Moved to class-utils.php. Renamed from `generate_url`.
	 *
	 * @param WP_Post $post   Which post object or ID to check.
	 * @param string  $apikey API key or empty string.
	 * @return string
	 */
	public static function generate_parsely_post_url( WP_Post $post, string $apikey ): string {
		$query_args = array(
			'url'          => rawurlencode( get_permalink( $post ) ),
			'utm_campaign' => 'wp-admin-posts-list',
			'utm_medium'   => 'wp-parsely',
			'utm_source'   => 'wp-admin',
		);

		$base_url = trailingslashit( 'https://dash.parsely.com/' . $apikey ) . 'find';

		return add_query_arg( $query_args, $base_url );
	}
}

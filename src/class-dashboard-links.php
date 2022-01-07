<?php
/**
 * Parse.ly Dashboard Links utility class.
 *
 * @package Parsely
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely;

use WP_Post;

/**
 * Utility methods to build and generate dashboard links.
 *
 * @since 3.2.0
 */
class Dashboard_Links {
	/**
	 * Generate the Parse.ly dashboard URL for the post.
	 *
	 * @since 2.6.0
	 * @since 3.2.0 Moved to class-dashboard-links.php. Added source parameter.
	 *
	 * @param WP_Post $post   Which post object or ID to check.
	 * @param string  $apikey API key or empty string.
	 * @param string  $campaign Campaign name for the `utm_campaign` URL parameter.
	 * @param string  $source Source name for the `utm_source` URL parameter.
	 * @return string
	 */
	public static function generate_url( WP_Post $post, string $apikey, string $campaign, string $source ): string {
		$query_args = array(
			'url'          => rawurlencode( get_permalink( $post ) ),
			'utm_campaign' => $campaign,
			'utm_source'   => $source,
			'utm_medium'   => 'wp-parsely',
		);

		$base_url = trailingslashit( 'https://dash.parsely.com/' . $apikey ) . 'find';

		return add_query_arg( $query_args, $base_url );
	}

	/**
	 * Determine whether Parse.ly row action link should be shown or not.
	 *
	 * @since 2.6.0
	 * @since 3.2.0 Moved to class-utils.php. Renamed from `cannot_show_parsely_link`.
	 *
	 * @param WP_Post $post    Which post object or ID to check.
	 * @param Parsely $parsely Parsely object.
	 * @return bool True if the link cannot be shown, false if the link can be shown.
	 */
	public static function cannot_show_link( WP_Post $post, Parsely $parsely ): bool {
		return ! Parsely::post_has_trackable_status( $post ) || ! is_post_type_viewable( $post->post_type ) || $parsely->api_key_is_missing();
	}
}

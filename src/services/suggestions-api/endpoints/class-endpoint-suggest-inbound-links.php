<?php
/**
 * Parse.ly Suggestions API Endpoint: Suggest Inbound Links
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Services\Suggestions_API\Endpoints;

use WP_Error;

/**
 * The endpoint for the Suggest Inbound Links API request.
 *
 * @since 3.17.0
 *
 * @link https://content-suggestions-api.parsely.net/prod/docs#/default/suggest_inbound_links_suggest_inbound_links_post
 *
 * @phpstan-type Traffic_Source = array{
 *     source: string,
 *     weight: float
 * }
 *
 * @phpstan-type Endpoint_Suggest_Inbound_Links_Options = array{
 *     max_items?: int,
 *     max_link_words?: int,
 *     title?: string,
 *     text?: string
 * }
 */
class Endpoint_Suggest_Inbound_Links extends Suggestions_API_Base_Endpoint {
	/**
	 * Returns the endpoint for the API request.
	 *
	 * @since 3.17.0
	 *
	 * @return string The endpoint for the API request.
	 */
	public function get_endpoint(): string {
		return '/suggest-inbound-links';
	}

	/**
	 * Gets suggested inbound links for the given URL using the Parse.ly
	 * Content Suggestion API.
	 *
	 * @since 3.17.0
	 *
	 * @param \WP_Post                               $post    The post to get inbound link suggestions for.
	 * @param Endpoint_Suggest_Inbound_Links_Options $options The options to pass to the API request.
	 * @return array<Inbound_Smart_Link>|WP_Error The response from the remote API, or a WP_Error
	 *                                            object if the response is an error.
	 */
	public function get_inbound_links(
		\WP_Post $post,
		$options = array()
	) {
		$post_url = get_permalink( $post );
		if ( false === $post_url ) {
			return new \WP_Error(
				'parsely_invalid_post_url',
				__( 'Could not get post URL.', 'wp-parsely' ),
				array( 'status' => 400 )
			);
		}

		$request_body = array(
			'canonical_url' => $post_url,
			'output_config' => array(
				'max_items'      => $options['max_items'] ?? 10,
				'max_link_words' => $options['max_link_words'] ?? 4,
			),
			'title'         => $post->post_title,
			'text'          => wp_strip_all_tags( $post->post_content ),
		);

		$response = $this->request( 'POST', array(), $request_body );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		// Convert the links to Inbound_Smart_Link objects.
		$links = array();
		foreach ( $response as $link ) {
			$link     = apply_filters( 'wp_parsely_suggest_inbound_links_link', $link );
			$link_obj = new \Parsely\Models\Inbound_Smart_Link(
				esc_url( $link['canonical_url'] ),
				esc_attr( $link['title'] ),
				wp_kses_post( $link['text'] ),
				$link['offset']
			);

			// Set the destination to be the current post.
			$link_obj->set_destination_post( $post );

			// Find post by URL.
			if ( function_exists( 'wpcom_vip_url_to_postid' ) ) {
				$source_post_id = wpcom_vip_url_to_postid( $link['source_url'] );
			} else {
				// phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.url_to_postid_url_to_postid
				$source_post_id = url_to_postid( $link['source_url'] );
			}

			// If we couldn't find a post by URL, try to find a post with the same slug.
			if ( ! $source_post_id ) {
				// Get the slug from the URL.
				$post_slug      = basename( $link['source_url'] );
				$source_post_id = get_page_by_path( $post_slug, OBJECT, array( 'post', 'page' ) );
			}

			$source_post = get_post( $source_post_id );

			if ( ! $source_post ) {
				continue;
			}

			$link_obj->set_source_post( $source_post );
			$links[] = $link_obj;
		}

		return $links;
	}

	/**
	 * Executes the API request.
	 *
	 * @since 3.17.0
	 *
	 * @param array<mixed> $args The arguments to pass to the API request.
	 * @return WP_Error|array<mixed> The response from the API.
	 */
	public function call( array $args = array() ) {
		/** @var \WP_Post $post */
		$post = $args['post'] ?? null;
		/** @var Endpoint_Suggest_Inbound_Links_Options $options */
		$options = $args['options'] ?? array();

		if ( ! $post instanceof \WP_Post ) {
			return new \WP_Error(
				'parsely_invalid_post',
				__( 'Invalid post.', 'wp-parsely' ),
				array( 'status' => 400 )
			);
		}

		return $this->get_inbound_links( $post, $options );
	}
}

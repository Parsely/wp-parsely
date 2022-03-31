<?php
/**
 * Parse.ly header metadata class
 *
 * @package Parsely
 * @since 3.3.0
 */

declare(strict_types=1);

namespace Parsely\UI;

use Parsely\Metadata;
use Parsely\Parsely;
use WP_Post;

use const Parsely\PARSELY_FILE;

/**
 * Render metadata in the WordPress front-end header.
 *
 * @since 3.3.0
 */
final class Metadata_Header {
	/**
	 * Instance of Parsely class.
	 *
	 * @var Parsely
	 */
	private $parsely;

	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Register metadata actions.
	 *
	 * @since 3.3.0
	 *
	 * @return void
	 */
	public function run(): void {
		/**
		 * Filter whether the Parse.ly meta tags should be inserted in the page.
		 *
		 * By default, the tags are inserted.
		 *
		 * @since 3.0.0
		 *
		 * @param bool $insert_metadata True to insert the metadata, false otherwise.
		 */
		if ( apply_filters( 'wp_parsely_should_insert_metadata', true ) ) {
			add_action( 'wp_head', array( $this, 'insert_page_header_metadata' ) );
		}
	}

	/**
	 * Insert the code for the <meta name='parsely-page'> parameter within the <head></head> tag.
	 *
	 * @since 3.2.0
	 * @since 3.3.0 Moved from `Parsely` class to `Metadata_Header`
	 *
	 * @param string $meta_type `json_ld` or `repeated_metas`.
	 * @return void
	 */
	public function render_metadata( string $meta_type ): void {
		$parsely_options = $this->parsely->get_options();

		if (
			$this->parsely->api_key_is_missing() ||

			// Chosen not to track logged-in users.
			( ! $parsely_options['track_authenticated_users'] && $this->parsely->parsely_is_user_logged_in() ) ||

			// 404 pages are not tracked.
			is_404() ||

			// Search pages are not tracked.
			is_search()
		) {
			return;
		}

		global $post;

		// We can't construct the metadata without a valid post object.
		$parsed_post = get_post( $post );
		if ( ! $parsed_post instanceof WP_Post ) {
			return;
		}

		// Assign default values for LD+JSON
		// TODO: Mapping of an install's post types to Parse.ly post types (namely page/post).
		$metadata     = new Metadata( $this->parsely );
		$parsely_page = $metadata->construct_metadata( $parsely_options, $parsed_post );

		// Something went wrong - abort.
		if ( 0 === count( $parsely_page ) || ! isset( $parsely_page['headline'] ) ) {
			return;
		}

		// Insert JSON-LD or repeated metas.
		if ( 'json_ld' === $meta_type ) {
			include plugin_dir_path( PARSELY_FILE ) . 'views/json-ld.php';
		} else {
			// Assume `meta_type` is `repeated_metas`.
			$parsely_post_type = $this->parsely->convert_jsonld_to_parsely_type( $parsely_page['@type'] );
			if ( isset( $parsely_page['keywords'] ) && is_array( $parsely_page['keywords'] ) ) {
				$parsely_page['keywords'] = implode( ',', $parsely_page['keywords'] );
			}

			$parsely_metas = array(
				'title'     => $parsely_page['headline'] ?? null,
				'link'      => $parsely_page['url'] ?? null,
				'type'      => $parsely_post_type,
				'image-url' => $parsely_page['thumbnailUrl'] ?? null,
				'pub-date'  => $parsely_page['datePublished'] ?? null,
				'section'   => $parsely_page['articleSection'] ?? null,
				'tags'      => $parsely_page['keywords'] ?? null,
				'author'    => isset( $parsely_page['author'] ),
			);
			$parsely_metas = array_filter( $parsely_metas, array( $this, 'filter_empty_and_not_string_from_array' ) );

			if ( isset( $parsely_page['author'] ) ) {
				$parsely_page_authors = wp_list_pluck( $parsely_page['author'], 'name' );
				$parsely_page_authors = array_filter( $parsely_page_authors, array( $this, 'filter_empty_and_not_string_from_array' ) );
			}

			include plugin_dir_path( PARSELY_FILE ) . 'views/repeated-metas.php';
		}

		// Add any custom metadata.
		if ( isset( $parsely_page['custom_metadata'] ) ) {
			include plugin_dir_path( PARSELY_FILE ) . 'views/custom-metadata.php';
		}
	}
}

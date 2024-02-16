<?php
/**
 * Post Page Metadata Builder class
 *
 * @package Parsely
 * @since 3.4.0
 */

declare(strict_types=1);

namespace Parsely\Metadata;

use Parsely\Parsely;
use WP_Post;

/**
 * Implements abstract Metadata Builder class to generate the metadata array
 * for a post page.
 *
 * @since 3.4.0
 */
class Post_Builder extends Metadata_Builder {
	/**
	 * Post object to generate the metadata for.
	 *
	 * @var WP_Post
	 */
	private $post;

	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 * @param WP_Post $post Post object to generate the metadata for.
	 */
	public function __construct( Parsely $parsely, WP_Post $post ) {
		parent::__construct( $parsely );
		$this->post = $post;
	}

	/**
	 * Generates the metadata object by calling the build_* methods and
	 * returns the value.
	 *
	 * @since 3.4.0
	 *
	 * @return array<string, mixed>
	 */
	public function get_metadata(): array {
		$this->build_basic();
		$this->build_headline();
		$this->build_url();

		$this->build_type();
		$this->build_main_entity();
		$this->build_thumbnail_url( $this->post );
		$this->build_image( $this->post );
		$this->build_article_section( $this->post );
		$this->build_author( $this->post );
		$this->build_publisher();
		$this->build_keywords( $this->post );
		$this->build_metadata_post_times( $this->post );

		return $this->metadata;
	}

	/**
	 * Populates the headline field in the metadata object.
	 *
	 * @since 3.4.0
	 */
	private function build_headline(): void {
		$this->metadata['headline'] = $this->clean_value( get_the_title( $this->post ) );
	}

	/**
	 * Populates the url field in the metadata object by getting the current page's URL.
	 *
	 * @since 3.4.0
	 */
	protected function build_url(): void {
		$this->metadata['url'] = $this->get_current_url( 'post', $this->post->ID );
	}

	/**
	 * Populates the @type field in the metadata object.
	 *
	 * @since 3.4.0
	 */
	private function build_type(): void {
		/**
		 * Filters the JSON-LD @type.
		 *
		 * @since 2.5.0
		 *
		 * @param string $jsonld_type JSON-LD @type value, default is NewsArticle.
		 * @param int $id Post ID.
		 * @param string $post_type The Post type in WordPress.
		 */
		$type            = apply_filters( 'wp_parsely_post_type', 'NewsArticle', $this->post->ID, $this->post->post_type );
		$supported_types = $this->parsely->get_all_supported_types();

		// Validate type before passing it further as an invalid type will not be recognized by Parse.ly.
		if ( ! in_array( $type, $supported_types, true ) ) {
			$error = sprintf(
			/* translators: 1: JSON @type like NewsArticle, 2: URL */
				__( '@type %1$s is not supported by Parse.ly. Please use a type mentioned in %2$s', 'wp-parsely' ),
				$type,
				'https://docs.parse.ly/metadata-jsonld/#distinguishing-between-posts-and-non-posts-pages'
			);
			// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
			trigger_error( esc_html( $error ), E_USER_WARNING );
			$type = 'NewsArticle';
		}

		$this->metadata['@type'] = $type;
	}

	/**
	 * Populates the mainEntityOfPage field in the metadata object.
	 *
	 * @since 3.4.0
	 */
	private function build_main_entity(): void {
		$this->metadata['mainEntityOfPage'] = array(
			'@type' => 'WebPage',
			'@id'   => $this->get_current_url( 'post' ),
		);
	}

	/**
	 * Populates the publisher field in the metadata object.
	 *
	 * @since 3.4.0
	 */
	private function build_publisher(): void {
		$this->metadata['publisher'] = array(
			'@type' => 'Organization',
			'name'  => get_bloginfo( 'name' ),
			'logo'  => $this->parsely->get_options()['logo'],
		);
	}
}

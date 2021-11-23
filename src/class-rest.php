<?php
/**
 * REST API class
 *
 * @package Parsely
 * @since 3.1.0
 */

declare(strict_types=1);

namespace Parsely;

use WP_Post;

/**
 * Injects Parse.ly Metadata to WordPress REST API
 *
 * @since 3.1.0
 */
class Rest {
	private const PARSELY_META_REST_FIELD_NAME = 'parsely-meta';
	private const PARSELY_META_STRING_REST_FIELD_NAME = 'parsely-meta-string';

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
	 * Register fields in WordPress REST API
	 *
	 * @since 3.1.0
	 *
	 * @return void
	 */
	public function run(): void {
		/**
		 * Filter whether REST API support is enabled or not.
		 *
		 * @since 3.1.0
		 *
		 * @param bool $enabled True if enabled, false if not.
		 */
		if ( apply_filters( 'wp_parsely_enable_rest_api_support', true ) ) {
			add_action( 'rest_api_init', array( $this, 'register_parsely_meta' ) );
		}

		/**
		 * Filter whether REST API support in string format is enabled or not.
		 *
		 * @since 3.1.0
		 *
		 * @param bool $enabled True if enabled, false if not.
		 */
		if ( apply_filters( 'wp_parsely_enable_rest_api_string_support', true ) ) {
			add_action( 'rest_api_init', array( $this, 'register_parsely_meta_string' ) );
		}
	}

	/**
	 * Registers the `parsely-meta` field in the REST API.
	 *
	 * @since 3.1.0
	 *
	 * @return void
	 */
	public function register_parsely_meta(): void {
		$callback = function( array $object ): array {
			$post_id = $object['id'];
			$options = $this->parsely->get_options();
			$post    = WP_Post::get_instance( $post_id );
			return $this->parsely->construct_parsely_metadata( $options, $post );
		};

		$args = array( 'get_callback' => $callback );
		register_rest_field( 'post', self::PARSELY_META_REST_FIELD_NAME, $args );
		register_rest_field( 'page', self::PARSELY_META_REST_FIELD_NAME, $args );
	}

	/**
	 * Registers the `parsely-meta-string` field in the REST API.
	 *
	 * @since 3.1.0
	 *
	 * @return void
	 */
	public function register_parsely_meta_string(): void {
		$callback = function(): string {
			ob_start();
			$this->parsely->insert_page_header_metadata();
			return ob_get_clean();
		};

		$args = array( 'get_callback' => $callback );
		register_rest_field( 'post', self::PARSELY_META_STRING_REST_FIELD_NAME, $args );
		register_rest_field( 'page', self::PARSELY_META_STRING_REST_FIELD_NAME, $args );
	}
}

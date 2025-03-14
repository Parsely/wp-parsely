<?php
/**
 * Smart Link model: Represents a smart link suggestion returned by the Smart
 * Linking API
 *
 * @package Parsely
 * @since   3.16.0
 */

declare(strict_types=1);

namespace Parsely\Models;

use InvalidArgumentException;
use Parsely\Parsely;
use Parsely\Utils\Utils;

/**
 * Smart Link class.
 *
 * Represents a smart link suggestion returned by the Smart Linking API.
 *
 * @since 3.16.0
 */
class Smart_Link extends Base_Model {
	/**
	 * The internal ID of the smart link custom post type object.
	 *
	 * @since 3.16.0
	 * @var int The ID of the smart link.
	 */
	protected $smart_link_id = 0;

	/**
	 * The post ID of the suggested link (link source).
	 *
	 * @since 3.16.0
	 * @var int The post ID of the suggested link, 0 if not set.
	 */
	public $source_post_id = 0;

	/**
	 * The source post object.
	 *
	 * @since 3.18.0
	 *
	 * @var \WP_Post|null The source post.
	 */
	protected $source_post;

	/**
	 * The post ID of the link destination.
	 *
	 * @since 3.16.0
	 * @var int The post ID of the link destination, 0 if not set.
	 */
	public $destination_post_id = 0;

	/**
	 * The post type of the destination post.
	 *
	 * @since 3.16.0
	 * @var string The post type of the destination post.
	 */
	public $destination_post_type = 'external';

	/**
	 * The post type of the source post.
	 *
	 * @since 3.18.0
	 * @var string The post type of the source post.
	 */
	public $source_post_type = 'unknown';

	/**
	 * The URL of the suggested link.
	 *
	 * @since 3.16.0
	 * @var string The URL of the suggested link.
	 */
	protected $href;

	/**
	 * The title of the suggested link.
	 *
	 * @since 3.16.0
	 * @var string The title of the suggested link.
	 */
	public $title;

	/**
	 * The text of the suggested link.
	 *
	 * @since 3.16.0
	 * @var string The text of the suggested link.
	 */
	public $text;

	/**
	 * The offset/position for the suggested link.
	 *
	 * @since 3.16.0
	 * @var int The offset/position for the suggested link.
	 */
	public $offset;

	/**
	 * The unique ID of the suggested link.
	 *
	 * @since 3.16.0
	 * @var string The unique ID of the suggested link.
	 */
	public $uid;

	/**
	 * Whether the link has been applied.
	 *
	 * @since 3.16.0
	 * @var bool Whether the link has been applied.
	 */
	public $applied = false;

	/**
	 * Whether the smart link exists on the database.
	 *
	 * @since 3.16.0
	 * @var bool Whether the link exists.
	 */
	private $exists = false;

	/**
	 * The post meta of the smart link object.
	 *
	 * @since 3.18.0
	 * @var array<string,array<int,mixed>> The post meta of the smart link.
	 */
	private $smart_link_post_meta = array();

	/**
	 * Smart Link constructor.
	 *
	 * @since 3.16.0
	 *
	 * @param string $href The URL of the suggested link.
	 * @param string $title The title of the suggested link.
	 * @param string $text The text of the suggested link.
	 * @param int    $offset The offset/position for the suggested link.
	 * @param int    $post_id The post ID of the suggested link.
	 */
	public function __construct(
		string $href,
		string $title,
		string $text,
		int $offset,
		int $post_id = 0
	) {
		if ( '' !== $href ) {
			$this->set_href( $href );
		}

		// Set the title to be the destination post title if the destination post ID is set.
		if ( 0 !== $this->destination_post_id ) {
			$this->title = get_the_title( $this->destination_post_id );
		} else {
			$this->title = $title;
		}

		$this->text   = $text;
		$this->offset = $offset;
		$this->set_source_post_id( $post_id );

		parent::__construct();
	}

	/**
	 * Gets the smart link post object by UID.
	 *
	 * @since 3.16.0
	 *
	 * @param string $uid The UID of the smart link.
	 * @return int The ID of the smart link post object.
	 */
	private function get_smart_link_object_by_uid( string $uid ): int {
		$cache_key = 'smart-link-uid-map-' . $uid . '-' . $this->source_post_id;
		$cached    = wp_cache_get( $cache_key, $this->get_cache_group() );
		if ( is_int( $cached ) && 0 !== $cached ) {
			return $cached;
		}

		$smart_links = new \WP_Query(
			array(
				'post_type'      => 'parsely_smart_link',
				'fields'         => 'ids', // Only get the post IDs to improve performance.
				'posts_per_page' => 1,
				'title'          => $uid,
				// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
				'tax_query'      => array(
					array(
						'taxonomy'         => 'smart_link_source',
						'include_children' => false, // Performance optimization.
						'field'            => 'name',
						'terms'            => (string) $this->source_post_id,
					),
				),
			)
		);

		if ( $smart_links->have_posts() && is_int( $smart_links->posts[0] ) ) {
			wp_cache_set(
				$cache_key,
				$smart_links->posts[0],
				$this->get_cache_group()
			);
			return $smart_links->posts[0];
		}

		return 0;
	}

	/**
	 * Loads the smart link post object.
	 *
	 * @since 3.16.0
	 *
	 * @return bool True if the smart link was loaded successfully, false otherwise.
	 */
	private function load(): bool {
		if ( 0 === $this->smart_link_id ) {
			// Try to get the smart link id from the UID.
			$this->smart_link_id = $this->get_smart_link_object_by_uid( $this->uid );
			if ( 0 === $this->smart_link_id ) {
				$this->exists = false;
				return false;
			}
		}

		$smart_link = get_post( $this->smart_link_id );

		if ( null === $smart_link || 'parsely_smart_link' !== $smart_link->post_type ) {
			$this->exists = false;
			return false;
		}

		$this->exists = true;

		$this->uid = $smart_link->post_title;

		// Load the Smart Link properties from the post meta.
		$this->load_post_meta();

		$this->title   = $this->get_string_meta( '_smart_link_title' );
		$this->href    = $this->get_string_meta( '_smart_link_href' );
		$this->text    = $this->get_string_meta( '_smart_link_text' );
		$this->offset  = $this->get_int_meta( '_smart_link_offset' );
		$this->applied = $this->get_bool_meta( '_smart_link_applied', true );

		// Load the source post ID.
		$source_terms = wp_get_post_terms( $this->smart_link_id, 'smart_link_source' );
		if ( ! is_wp_error( $source_terms ) && count( $source_terms ) > 0 ) {
			$source_term          = $source_terms[0];
			$this->source_post_id = (int) $source_term->name;
		}

		// Load the destination post ID.
		$destination_terms = wp_get_post_terms( $this->smart_link_id, 'smart_link_destination' );
		if ( ! is_wp_error( $destination_terms ) && count( $destination_terms ) > 0 ) {
			$destination_term = $destination_terms[0];
			if ( 'external' !== $destination_term->slug ) {
				$this->destination_post_id = (int) $destination_term->name;
			}
		}

		// If the destination post ID is not set, try to get it from the URL.
		if ( 0 === $this->destination_post_id ) {
			$this->destination_post_id = Utils::get_post_id_by_url( $this->href );
		}

		// Get the post type of the destination post.
		$post_type = get_post_type( $this->destination_post_id );
		if ( false !== $post_type ) {
			$post_type_object = get_post_type_object( $post_type );
			if ( null !== $post_type_object ) {
				$this->destination_post_type = $post_type_object->labels->singular_name;
			}
		} else {
			$this->destination_post_type = 'external';
		}

		return true;
	}

	/**
	 * Saves the smart link to the post meta.
	 *
	 * @since 3.16.0
	 *
	 * @return bool True if the smart link was saved successfully, false otherwise.
	 */
	public function save(): bool {
		if ( 0 === $this->source_post_id ) {
			return false;
		}

		$did_update = false;
		if ( $this->exists() ) {
			// If it exists, try to update the existing post.
			$updated = wp_update_post(
				array(
					'ID'         => $this->smart_link_id,
					'post_title' => $this->uid,
				),
				true // Return WP_Error if the post is not updated.
			);

			if ( is_wp_error( $updated ) ) {
				// If the post is not updated, there is an invalid post ID cached.
				// Flush the cache to avoid future errors.
				$this->flush_cache();
			} else {
				$did_update = true;
			}
		}

		// If the smart link does not exist, or if the post was not updated, create a new post.
		if ( ! $did_update || ! $this->exists ) {
			// Create the post object.
			$post_id = wp_insert_post(
				array(
					'post_type'   => 'parsely_smart_link',
					'post_title'  => $this->uid,
					'post_status' => 'publish',
				)
			);

			if ( 0 === $post_id ) {
				return false;
			}

			$this->smart_link_id = $post_id;
			$this->exists        = true;
			wp_cache_set(
				'smart-link-' . $this->uid . '-' . $this->source_post_id,
				$post_id,
				$this->get_cache_group()
			);
		}

		// Update the smart link meta.
		$meta = array(
			'_smart_link_title'   => $this->title,
			'_smart_link_href'    => $this->href,
			'_smart_link_text'    => $this->text,
			'_smart_link_offset'  => $this->offset,
			'_smart_link_applied' => $this->applied ? 'true' : 'false',
		);

		foreach ( $meta as $key => $value ) {
			update_post_meta( $this->smart_link_id, $key, $value );
		}

		// Add the source term.
		wp_set_post_terms( $this->smart_link_id, (string) $this->source_post_id, 'smart_link_source' );

		// Add the destination term.
		if ( 0 !== $this->destination_post_id ) {
			wp_set_post_terms( $this->smart_link_id, (string) $this->destination_post_id, 'smart_link_destination' );
		} else {
			wp_set_post_terms( $this->smart_link_id, 'external', 'smart_link_destination' );
		}

		// Flush all the associated cache on the source and destination posts.
		$this->flush_all_cache();

		return true;
	}

	/**
	 * Updates the UID of the smart link.
	 *
	 * @since 3.18.0
	 */
	public function update_uid(): void {
		$this->uid = $this->generate_uid();
	}

	/**
	 * Removes the smart link from the database.
	 *
	 * @since 3.18.0
	 *
	 * @return bool True if the smart link was removed successfully, false otherwise.
	 */
	public function delete(): bool {
		if ( 0 === $this->smart_link_id ) {
			return false;
		}

		// Delete the post object.
		$deleted = wp_delete_post( $this->smart_link_id, true );

		if ( false !== $deleted && null !== $deleted && is_a( $deleted, 'WP_Post' ) ) {
			$this->smart_link_id = 0;
			$this->exists        = false;
			$this->flush_all_cache();
			return true;
		}

		return false;
	}

	/**
	 * Checks if the smart link is saved in the database.
	 *
	 * @since 3.16.0
	 *
	 * @return bool True if the smart link exists, false otherwise.
	 */
	public function exists(): bool {
		if ( $this->exists ) {
			return true;
		}

		// Try to find a smart link with the same UID.
		$smart_link_id = $this->get_smart_link_object_by_uid( $this->uid );

		if ( 0 !== $smart_link_id ) {
			$this->exists        = true;
			$this->smart_link_id = $smart_link_id;
			return true;
		}

		$this->exists        = false;
		$this->smart_link_id = 0;
		return false;
	}

	/**
	 * Loads the post meta of the smart link object.
	 *
	 * @since 3.18.0
	 */
	private function load_post_meta(): void {
		$post_meta = get_post_meta( $this->smart_link_id );
		/** @var array<string,array<int,mixed>> $post_meta */
		$this->smart_link_post_meta = $post_meta;
	}

	/**
	 * Gets a string meta value from the smart link post.
	 *
	 * @since 3.16.0
	 *
	 * @param string $meta_key The meta key to get the value for.
	 * @param string $default_value The default value to return if the meta value is not a string.
	 * @return string The meta value.
	 */
	private function get_string_meta( string $meta_key, string $default_value = '' ): string {
		if ( ! isset( $this->smart_link_post_meta[ $meta_key ] ) ) {
			return $default_value;
		}

		$meta_value = $this->smart_link_post_meta[ $meta_key ][0];
		return is_string( $meta_value ) ? $meta_value : $default_value;
	}

	/**
	 * Gets an integer meta value from the smart link post.
	 *
	 * @since 3.16.0
	 *
	 * @param string $meta_key The meta key to get the value for.
	 * @param int    $default_value The default value to return if the meta value is not an integer.
	 * @return int The meta value.
	 */
	private function get_int_meta( string $meta_key, int $default_value = 0 ): int {
		if ( ! isset( $this->smart_link_post_meta[ $meta_key ] ) ) {
			return $default_value;
		}

		$value = $this->smart_link_post_meta[ $meta_key ][0];
		if ( ! is_numeric( $value ) ) {
			return $default_value;
		}

		return (int) $value;
	}

	/**
	 * Gets a boolean meta value from the smart link post.
	 *
	 * @since 3.18.0
	 *
	 * @param string $meta_key The meta key to get the value for.
	 * @param bool   $default_value The default value to return if the meta value is not a boolean.
	 * @return bool The meta value.
	 */
	private function get_bool_meta( string $meta_key, bool $default_value = false ): bool {
		if ( ! isset( $this->smart_link_post_meta[ $meta_key ] ) ) {
			return $default_value;
		}

		$meta_value = $this->smart_link_post_meta[ $meta_key ][0];
		if ( 'true' === $meta_value || '1' === $meta_value ) {
			return true;
		}

		if ( 'false' === $meta_value || '0' === $meta_value ) {
			return false;
		}

		return $default_value;
	}

	/**
	 * Sets the source post from a post object.
	 *
	 * This method is an alias for Smart_Link::set_source_post_id().
	 *
	 * @since 3.18.0
	 *
	 * @see Smart_Link::set_source_post_id()
	 * @param \WP_Post    $post The source post.
	 * @param string|null $canonical_url The canonical URL for the source post, to be set if it is not already set.
	 */
	public function set_source_post( \WP_Post $post, $canonical_url = null ): void {
		$this->source_post = $post;
		$this->set_source_post_id( $post->ID, $canonical_url );
	}

	/**
	 * Sets the source post ID.
	 *
	 * @since 3.16.0
	 *
	 * @param int         $source_post_id The source post ID.
	 * @param string|null $canonical_url The canonical URL for the source post, to be set if it is not already set.
	 */
	public function set_source_post_id( int $source_post_id, $canonical_url = null ): void {
		if ( 0 === $source_post_id ) {
			return;
		}

		$this->source_post_id = $source_post_id;
		if ( null === $this->source_post ) {
			$this->source_post = get_post( $source_post_id );
		}

		// Get the post type of the source post.
		$post_type = get_post_type( $this->source_post_id );
		if ( false !== $post_type ) {
			$post_type_object = get_post_type_object( $post_type );
			if ( null !== $post_type_object ) {
				$this->source_post_type = $post_type_object->labels->singular_name;
			}
		} else {
			$this->source_post_type = 'unknown';
		}

		// Update the canonical URL for the source post.
		if ( null !== $canonical_url ) {
			Parsely::set_canonical_url( $this->source_post_id, $canonical_url );
		}
	}

	/**
	 * Sets the destination post.
	 *
	 * @since 3.18.0
	 *
	 * @param \WP_Post    $post The destination post.
	 * @param string|null $canonical_url The canonical URL for the destination post, to be set if it is not already set.
	 */
	public function set_destination_post( \WP_Post $post, $canonical_url = null ): void {
		$this->destination_post_id = $post->ID;
		$this->href                = get_permalink( $post );

		// Get the post type of the destination post.
		$post_type = get_post_type( $this->destination_post_id );
		if ( false !== $post_type ) {
			$post_type_object = get_post_type_object( $post_type );
			if ( null !== $post_type_object ) {
				$this->destination_post_type = $post_type_object->labels->singular_name;
			}
		} else {
			$this->destination_post_type = 'external';
		}

		// Update the canonical URL for the destination post.
		if ( null !== $canonical_url ) {
			Parsely::set_canonical_url( $this->destination_post_id, $canonical_url );
		}
	}

	/**
	 * Sets the destination post ID.
	 *
	 * @since 3.18.0
	 *
	 * @see Smart_Link::set_destination_post()
	 * @param int         $destination_post_id The destination post ID.
	 * @param string|null $canonical_url The canonical URL for the destination post, to be set if it is not already set.
	 */
	public function set_destination_post_id( int $destination_post_id, $canonical_url = null ): void {
		$post = get_post( $destination_post_id );
		if ( null === $post ) {
			return;
		}

		$this->set_destination_post( $post, $canonical_url );
	}

	/**
	 * Sets the UID of the smart link.
	 *
	 * @since 3.18.0
	 *
	 * @param string $uid The UID of the smart link.
	 */
	public function set_uid( string $uid ): void {
		$this->uid = $uid;
	}

	/**
	 * Sets the href of the smart link.
	 *
	 * @since 3.16.0
	 *
	 * @param string $href The href of the smart link.
	 */
	public function set_href( string $href ): void {
		$this->href          = $href;
		$destination_post_id = Utils::get_post_id_by_url( $href );

		if ( 0 !== $destination_post_id ) {
			// Set the destination post ID, and update the canonical URL.
			$this->set_destination_post_id( $destination_post_id, $href );
		}
	}

	/**
	 * Generates a unique ID for the suggested link.
	 *
	 * It takes the href, title, text, and offset properties and concatenates
	 * them to create a unique ID. This ID is hashed to ensure it is unique.
	 *
	 * @since 3.16.0
	 *
	 * @return string The unique ID.
	 */
	protected function generate_uid(): string {
		return md5( $this->source_post_id . $this->destination_post_id . $this->href . $this->title . $this->text . $this->offset );
	}

	/**
	 * Serializes the model to a JSON string.
	 *
	 * @since 3.16.0
	 *
	 * @return array<mixed> The serialized model.
	 */
	public function to_array(): array {
		return array(
			'smart_link_id' => $this->smart_link_id,
			'uid'           => $this->uid,
			'href'          => $this->href,
			'title'         => $this->title,
			'text'          => $this->text,
			'offset'        => $this->offset,
			'applied'       => $this->applied,
			'source'        => array(
				'post_type'     => $this->source_post_type,
				'post_id'       => $this->source_post_id,
				'canonical_url' => Parsely::get_canonical_url_from_post( $this->source_post_id ),
			),
			'destination'   => array(
				'post_type'     => $this->destination_post_type,
				'post_id'       => $this->destination_post_id,
				'canonical_url' => Parsely::get_canonical_url_from_post( $this->destination_post_id ),
			),
		);
	}

	/**
	 * Deserializes a JSON string to a model.
	 *
	 * @since 3.16.0
	 *
	 * @throws InvalidArgumentException If the JSON data is invalid.
	 *
	 * @param string $json The JSON string to deserialize.
	 * @return Base_Model The deserialized model.
	 */
	public static function deserialize( string $json ): Base_Model {
		$data = json_decode( $json, true );

		// Validate the JSON data.
		if ( ! is_array( $data ) ) {
			throw new InvalidArgumentException( 'Invalid JSON data' );
		}

		// If the UID has been provided, set it on the model.
		$smart_link = new Smart_Link( $data['href'], $data['title'], $data['text'], $data['offset'] );

		if ( isset( $data['uid'] ) ) {
			$smart_link->set_uid( $data['uid'] );

			if ( $smart_link->exists() ) {
				$smart_link->load();
				// Update the fields.
				$smart_link->set_href( $data['href'] );
				$smart_link->title  = $data['title'];
				$smart_link->text   = $data['text'];
				$smart_link->offset = $data['offset'];
			}
		}

		return $smart_link;
	}

	/**
	 * Gets a smart link by UID.
	 *
	 * @since 3.16.0
	 *
	 * @param string $uid The UID of the smart link.
	 * @param int    $post_id The post ID of the smart link.
	 * @return Smart_Link The smart link object.
	 */
	public static function get_smart_link( string $uid, int $post_id ): Smart_Link {
		$smart_link                 = new Smart_Link( '', '', '', 0 );
		$smart_link->uid            = $uid;
		$smart_link->source_post_id = $post_id;
		$smart_link->load();
		return $smart_link;
	}

	/**
	 * Gets a smart link by post object ID.
	 *
	 * @since 3.16.0
	 *
	 * @param int $smart_link_id The ID of the smart link.
	 * @return Smart_Link|false The smart link object, or false if it does not exist.
	 */
	protected static function get_smart_link_by_id( int $smart_link_id ) {
		$smart_link                = new Smart_Link( '', '', '', 0 );
		$smart_link->smart_link_id = $smart_link_id;
		if ( $smart_link->load() ) {
			return $smart_link;
		}

		return false;
	}

	/**
	 * Gets the outbound smart links in a post.
	 *
	 * Outbound smart links are smart links that link to other posts.
	 *
	 * @since 3.16.0
	 * @since 3.18.0 Added status parameter.
	 *
	 * @param int    $post_id The post ID to get the smart links for.
	 * @param string $status The status of the smart links to get.
	 * @return array<Smart_Link> The smart links in the post.
	 */
	public static function get_outbound_smart_links( int $post_id, string $status = Smart_Link_Status::ALL ): array {
		$cache_key   = 'outbound-' . $post_id . '-' . $status;
		$smart_links = wp_cache_get( $cache_key, self::get_cache_group_for_post( $post_id ) );

		// If the smart links are cached, return them.
		if ( false !== $smart_links ) {
			/** @var array<Smart_Link> $smart_links */
			return $smart_links;
		}

		$query_args = array(
			'post_type'      => 'parsely_smart_link',
			'posts_per_page' => -1,
			'fields'         => 'ids', // Only get the post IDs to improve performance.
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			'tax_query'      => array(
				array(
					'taxonomy'         => 'smart_link_source',
					'include_children' => false, // Performance optimization.
					'field'            => 'name',
					'terms'            => (string) $post_id,
				),
			),
			'orderby'        => 'date',
			'order'          => 'DESC',
		);

		if ( Smart_Link_Status::APPLIED === $status ) {
			// For retrocompatibility, we consider that not having the meta field is the same as applied.
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			$query_args['meta_query'] = array(
				'relation' => 'OR',
				array(
					'key'     => '_smart_link_applied',
					'value'   => 'false',
					'compare' => '!=',
				),
				array(
					'key'     => '_smart_link_applied',
					'compare' => 'NOT EXISTS',
				),
			);
		} elseif ( Smart_Link_Status::PENDING === $status ) {
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			$query_args['meta_query'] = array(
				array(
					'key'     => '_smart_link_applied',
					'value'   => 'false',
					'compare' => '=',
				),
			);
		}

		$smart_links = new \WP_Query( $query_args );

		$links = array();
		foreach ( $smart_links->posts as $smart_link_id ) {
			if ( ! is_int( $smart_link_id ) ) {
				continue;
			}
			$smart_link = self::get_smart_link_by_id( $smart_link_id );

			if ( false === $smart_link ) {
				continue;
			}

			$links[] = $smart_link;
		}

		// Cache the smart links.
		wp_cache_set( $cache_key, $links, self::get_cache_group_for_post( $post_id ) );

		return $links;
	}

	/**
	 * Gets the inbound smart links in a post.
	 *
	 * Inbound smart links are links on other posts that link to the post.
	 *
	 * @since 3.16.0
	 * @since 3.18.0 Added status parameter.
	 *
	 * @param int    $post_id The post ID to get the smart links for.
	 * @param string $status The status of the smart links to get.
	 * @return array<Inbound_Smart_Link> The smart links in the post.
	 */
	public static function get_inbound_smart_links( int $post_id, string $status = Smart_Link_Status::ALL ): array {
		if ( ! Smart_Link_Status::is_valid_status( $status ) ) {
			$status = 'all';
			_doing_it_wrong( __METHOD__, 'Invalid status, defaulting to all.', '3.18.0' );
		}

		$cache_key   = 'inbound-' . $post_id . '-' . $status;
		$smart_links = wp_cache_get( $cache_key, self::get_cache_group_for_post( $post_id ) );

		// If the smart links are cached, return them.
		if ( false !== $smart_links ) {
			/** @var array<Inbound_Smart_Link> $smart_links */
			return $smart_links;
		}

		$query_args = array(
			'post_type'      => 'parsely_smart_link',
			'posts_per_page' => -1,
			'fields'         => 'ids', // Only get the post IDs to improve performance.
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			'tax_query'      => array(
				array(
					'taxonomy'         => 'smart_link_destination',
					'include_children' => false, // Performance optimization.
					'field'            => 'name',
					'terms'            => (string) $post_id,
				),
			),
			'orderby'        => 'date modified',
			'order'          => 'ASC',
		);

		if ( Smart_Link_Status::APPLIED === $status ) {
			// For retrocompatibility, we consider that not having the meta field is the same as applied.
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			$query_args['meta_query'] = array(
				'relation' => 'OR',
				array(
					'key'     => '_smart_link_applied',
					'value'   => 'false',
					'compare' => '!=',
				),
				array(
					'key'     => '_smart_link_applied',
					'compare' => 'NOT EXISTS',
				),
			);
		} elseif ( Smart_Link_Status::PENDING === $status ) {
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			$query_args['meta_query'] = array(
				array(
					'key'     => '_smart_link_applied',
					'value'   => 'false',
					'compare' => '=',
				),
			);
		}

		$smart_links = new \WP_Query( $query_args );

		$links = array();
		foreach ( $smart_links->posts as $smart_link_id ) {
			/** @var int $smart_link_id */
			$smart_link = self::get_smart_link_by_id( $smart_link_id );

			if ( false === $smart_link ) {
				continue;
			}

			$smart_link = Inbound_Smart_Link::from_smart_link( $smart_link );

			// Check if this inbound smart link is still linked to a post.
			// If not, do not add it to the array, and instead remove it.
			if ( $smart_link->applied && ! $smart_link->is_linked() ) {
				$smart_link->delete();
				continue;
			}

			$links[] = $smart_link;
		}

		// Cache the smart links.
		wp_cache_set( $cache_key, $links, self::get_cache_group_for_post( $post_id ) );

		return $links;
	}

	/**
	 * Gets the cache group for a single smart link.
	 *
	 * @since 3.18.0
	 *
	 * @return string The cache group.
	 */
	protected function get_cache_group(): string {
		return 'wp_parsely_smart_link_' . $this->smart_link_id;
	}

	/**
	 * Flushes the cache for a single smart link.
	 *
	 * @since 3.18.0
	 */
	protected function flush_cache(): void {
		// Delete the cache for the smart link UID to post ID association.
		wp_cache_delete( 'smart-link-uid-map-' . $this->uid . '-' . $this->source_post_id, self::get_cache_group() );
	}

	/**
	 * Flushes the cache for all smart links in a post.
	 *
	 * @since 3.18.0
	 */
	protected function flush_all_cache(): void {
		$this->flush_cache();
		if ( $this->source_post_id > 0 ) {
			self::flush_cache_by_post_id( $this->source_post_id );
		}
		if ( $this->destination_post_id > 0 ) {
			self::flush_cache_by_post_id( $this->destination_post_id );
		}
	}

	/**
	 * Gets the cache group for all smart links in a post.
	 *
	 * @since 3.18.0
	 *
	 * @param int $post_id The post ID to get the cache group for.
	 * @return string The cache group.
	 */
	protected static function get_cache_group_for_post( int $post_id ): string {
		return 'wp_parsely_smart_links_' . $post_id;
	}

	/**
	 * Flushes the cache for all smart links associated with a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param int $post_id The post ID to flush the cache for.
	 */
	protected static function flush_cache_by_post_id( int $post_id ): void {
		if ( function_exists( 'wp_cache_flush_group' ) && wp_cache_supports( 'flush_group' ) ) {
			wp_cache_flush_group( self::get_cache_group_for_post( $post_id ) );
		} else {
			$statuses = Smart_Link_Status::get_all_statuses();

			$cache_keys = array();
			foreach ( $statuses as $status ) {
				$cache_keys[] = 'outbound-' . $post_id . '-' . $status;
				$cache_keys[] = 'inbound-' . $post_id . '-' . $status;
			}

			foreach ( $cache_keys as $cache_key ) {
				wp_cache_delete( $cache_key, self::get_cache_group_for_post( $post_id ) );
			}
		}
	}
}

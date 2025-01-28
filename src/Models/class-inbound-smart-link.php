<?php
/**
 * Model for Inbound Smart Link.
 *
 * @package Parsely
 * @since   3.16.0
 */

declare( strict_types = 1 );

namespace Parsely\Models;

use DOMDocument;
use ReflectionClass;
use WP_Post;
use Masterminds\HTML5;

/**
 * Model for Inbound Smart Link.
 *
 * @since 3.16.0
 */
class Inbound_Smart_Link extends Smart_Link {

	/**
	 * The source post object.
	 *
	 * @since 3.16.0
	 *
	 * @var WP_Post|null The source post.
	 */
	private $source_post;

	/**
	 * The paragraph data.
	 *
	 * @since 3.16.0
	 *
	 * @var array<string,mixed>|null The paragraph data.
	 * @phpstan-var array{paragraph: string, is_first_paragraph: bool, is_last_paragraph: bool}|null
	 */
	private $paragraph_data;

	/**
	 * The post data.
	 *
	 * @since 3.16.0
	 *
	 * @var array<string,mixed>|null The post data.
	 */
	private $post_data;

	/**
	 * Serializes the model to a JSON string, and adds extra data.
	 *
	 * @since 3.16.0
	 *
	 * @return array<mixed> The serialized model.
	 */
	public function to_array(): array {
		$data = parent::to_array();

		$data['post_data'] = $this->get_post_data();

		return $data;
	}

	/**
	 * Checks if the Smart Link is linked to a post.
	 *
	 * @since 3.16.0
	 *
	 * @return bool True if the Smart Link is linked to a post, false otherwise.
	 */
	public function is_linked(): bool {
		$object_exists  = parent::exists();
		$paragraph_data = $this->get_post_data();

		// If the paragraph is empty, we assume that the Smart Link is not linked to a post.
		// return $object_exists && '' !== $paragraph_data['paragraph'];
		// TODO: For now, return if exists.
		return $object_exists;
	}

	/**
	 * Checks if the Smart Link has a valid placement. Does a few checks to make sure the link is valid.
	 *
	 * 1. Checks if the Smart Link is inside a paragraph tag.
	 * 2. Checks if the Smart Link is not inside an anchor tag.
	 * 3. Checks if the Smart Link is not inside a heading tag.
	 * 4. Checks if the Smart Link is not inside or not a child of a disallowed tag.
	 *
	 * @since 3.18.0
	 *
	 * @return bool True if the Smart Link has a valid placement, false otherwise.
	 */
	public function has_valid_placement(): bool {
		$allowed_tags    = array( 'p' );
		$disallowed_tags = array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'div', 'a' );

		if ( null === $this->source_post ) {
			$this->source_post = get_post( $this->source_post_id );
		}

		$post = $this->source_post;

		if ( ! $post instanceof WP_Post ) {
			return false;
		}

		$paragraph = $this->get_paragraph( $post->post_content );

		// TODO: Do the actual validations.

		return true;
	}
	/**
	 * Gets the post data for the smart link.
	 *
	 * @since 3.16.0
	 *
	 * @return array<mixed> The post data.
	 */
	private function get_post_data(): array {
		if ( null !== $this->post_data ) {
			return $this->post_data;
		}

		if ( null === $this->source_post ) {
			$this->source_post = get_post( $this->source_post_id );
		}

		$post = $this->source_post;
		if ( ! $post instanceof WP_Post ) {
			return array(
				'paragraph'          => '',
				'is_first_paragraph' => false,
				'is_last_paragraph'  => false,
			);
		}

		// Get the post content.
		$content = $post->post_content;
		// Get the paragraph that has the smart link UID.
		$paragraph = $this->get_paragraph( $content );

		$author_name = get_the_author();
		if ( '' === $author_name ) {
			// If the author name is empty, use the author login name.
			$author_name = get_the_author_meta( 'user_login', intval( $post->post_author ) );
		}

		$post_type = get_post_type_object( $post->post_type );
		if ( null === $post_type ) {
			return array();
		}

		$post_type_label = $post_type->labels->singular_name;

		$this->post_data = array(
			'id'                 => $post->ID,
			'title'              => $post->post_title,
			'type'               => $post_type_label,
			'paragraph'          => $paragraph['paragraph'],
			'permalink'          => get_permalink( $post ),
			'edit_link'          => get_edit_post_link( $post, 'html' ),
			'is_first_paragraph' => $paragraph['is_first_paragraph'],
			'is_last_paragraph'  => $paragraph['is_last_paragraph'],
			'author'             => $author_name,
			'date'               => get_the_date( '', $post ),
			'image'              => get_the_post_thumbnail_url( $post, 'medium' ),
		);

		return $this->post_data;
	}

	/**
	 * Get the HTML paragraph that has the smart link UID.
	 *
	 * @since 3.16.0
	 *
	 * @param string $content The post content.
	 * @return array The paragraph that has the smart link uid, and if it is the first or last paragraph.
	 * @phpstan-return array{paragraph: string, is_first_paragraph: bool, is_last_paragraph: bool}
	 */
	private function get_paragraph( string $content ): array {
		if ( null !== $this->paragraph_data ) {
			return $this->paragraph_data;
		}

		$paragraph = '';
		if ( ! class_exists( 'DOMDocument' ) ) {
			return array(
				'paragraph'          =>
					'<p>' . __( 'Unable to fetch paragraph. DOMDocument is not available.', 'wp-parsely' ) . '</p>',
				'is_first_paragraph' => true,
				'is_last_paragraph'  => true,
			);
		}

		libxml_use_internal_errors( true );

		$html_parser = new HTML5();
		$dom         = $html_parser->loadHTML( mb_convert_encoding( $content, 'HTML-ENTITIES', 'UTF-8' ) );

		$errors = libxml_get_errors();
		if ( count( $errors ) > 0 ) {
			libxml_clear_errors();
			return array(
				'paragraph'          =>
					'<p>' . __( 'Unable to fetch paragraph. Error loading HTML.', 'wp-parsely' ) . '</p>',
				'is_first_paragraph' => true,
				'is_last_paragraph'  => true,
			);
		}

		// Fetch all paragraph tags.
		$paragraphs = $dom->getElementsByTagName( 'p' );

		$is_first_paragraph = true;
		$is_last_paragraph  = false;
		$paragraph          = null;

		$offset_count = 0;

		/** @var \DOMElement $p The paragraph element. */
		foreach ( $paragraphs as $p ) {
			// If the smart link is applied, we need to find the paragraph that contains the smart link.
			if ( $this->applied ) {
				// Check each anchor tag within the paragraph.
				$anchors = $p->getElementsByTagName( 'a' );
				/** @var \DOMElement $anchor The anchor element. */
				foreach ( $anchors as $anchor ) {
					// Check if the data-smartlink attribute contains the UID.
					if ( $anchor->hasAttribute( 'data-smartlink' ) && stripos( $anchor->getAttribute( 'data-smartlink' ), $this->uid ) !== false ) {
						// Save the outer HTML of the paragraph.
						$is_first_paragraph = $p === $paragraphs->item( 0 );
						$is_last_paragraph  = $p === $paragraphs->item( $paragraphs->length - 1 );
						$paragraph          = $html_parser->saveHTML( $p );
						break 2;
					}
				}
			} elseif ( strpos( $p->textContent, $this->text ) !== false ) { // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
				// If the smart link is not applied, we need to find the paragraph that contains the
				// smart link text, and with the correct offset.
				if ( $offset_count === $this->offset ) {
					$is_first_paragraph = $p === $paragraphs->item( 0 );
					$is_last_paragraph  = $p === $paragraphs->item( $paragraphs->length - 1 );
					$paragraph          = $html_parser->saveHTML( $p );
					break;
				}
				++$offset_count;
			}
		}

		if ( null === $paragraph ) {
			$paragraph = '<p>' . __( 'Unable to fetch paragraph.', 'wp-parsely' ) . '</p>';
		}

		$this->paragraph_data = array(
			'paragraph'          => $paragraph,
			'is_first_paragraph' => $is_first_paragraph,
			'is_last_paragraph'  => $is_last_paragraph,
		);

		return $this->paragraph_data;
	}

	/**
	 * Sets the source post from a URL.
	 *
	 * @since 3.18.0
	 *
	 * @param string $url The URL.
	 */
	public function set_source_from_url( string $url ): bool {
		// First try to find a post by URL.
		if ( function_exists( 'wpcom_vip_url_to_postid' ) ) {
			$source_post_id = wpcom_vip_url_to_postid( $url );
		} else {
			// phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.url_to_postid_url_to_postid
			$source_post_id = url_to_postid( $url );
		}

		// Found a post by URL, set the source post.
		if ( 0 !== $source_post_id ) {
			$this->set_source_post_id( $source_post_id );
			return true;
		}

		// Since we couldn't find a post by URL, try to find a post with the same slug.
		$post_slug   = basename( $url );
		$source_post = get_page_by_path( $post_slug, OBJECT, array( 'post', 'page' ) );

		if ( null !== $source_post ) {
			$this->set_source_post( $source_post );
			return true;
		}

		return false;
	}

	/**
	 * Creates a new instance of an Inbound Smart Link from a Smart Link object.
	 *
	 * This is used to convert a Smart Link object to an Inbound Smart Link object.
	 *
	 * @since 3.16.0
	 *
	 * @param Smart_Link $smart_link The Smart Link object.
	 * @return Inbound_Smart_Link The Inbound Smart Link object.
	 */
	public static function from_smart_link( Smart_Link $smart_link ): Inbound_Smart_Link {
		$inbound_smart_link = new self( '', '', '', 0 );
		$reflection_class   = new ReflectionClass( $smart_link );

		foreach ( $reflection_class->getProperties() as $property ) {
			// Make the property accessible.
			$property->setAccessible( true );
			$value = $property->getValue( $smart_link );
			// Copy the property value.
			$property->setValue( $inbound_smart_link, $value );
		}

		return $inbound_smart_link;
	}

	/**
	 * Gets the existing inbound smart links for a post.
	 *
	 * @since 3.18.0
	 *
	 * @param int $post_id The post ID.
	 * @return array<Inbound_Smart_Link> The existing inbound smart links.
	 */
	public static function get_existing_suggestions( int $post_id ): array {
		// Get all inbound smart links for the post.
		$smart_links = self::get_inbound_smart_links( $post_id, false );
		
		// Filter out the ones that are already applied.
		$smart_links = array_values(
			array_filter(
				$smart_links,
				function ( Inbound_Smart_Link $smart_link ) {
					return ! $smart_link->applied;
				}
			) 
		);

		return $smart_links;
	}

	/**
	 * Deletes all pending (not applied) inbound smart links suggestions for a given post.
	 *
	 * @since 3.18.0
	 *
	 * @param int $post_id The post ID.
	 * @return array<string,int> The results of the deletion.
	 */
	public static function delete_pending_suggestions( int $post_id ): array {
		// Get all posts of type parsely_smart_link that have the destination taxonomy set to the post_id
		// and the _smart_link_applied meta set to false.
		$args = array(
			'post_type'      => 'parsely_smart_link',
			'posts_per_page' => -1,
			'fields'         => 'ids',
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			'tax_query'      => array(
				array(
					'taxonomy'         => 'smart_link_destination',
					'field'            => 'name',
					'include_children' => false,
					'terms'            => (string) $post_id,
				),
			),
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			'meta_query'     => array(
				array(
					'key'     => '_smart_link_applied',
					'value'   => 'false',
					'compare' => '=',
				),
			),
		);

		$query = new \WP_Query( $args );

		$results = array(
			'success' => 0,
			'failed'  => 0,
		);

		foreach ( $query->posts as $post ) {
			if ( ! is_int( $post ) ) {
				++$results['failed'];
				continue;
			}

			$smart_link = self::get_smart_link_by_id( $post );

			if ( false === $smart_link ) {
				++$results['failed'];
				continue;
			}

			if ( $smart_link->delete() ) {
				++$results['success'];
			} else {
				++$results['failed'];
			}   
		}

		return $results;
	}

	/**
	 * Gets the inbound smart links for a post.
	 *
	 * @since 3.18.0
	 *
	 * @param int  $post_id         The ID of the post.
	 * @param bool $include_applied Whether to include applied smart links.
	 * @return array<self> The inbound smart links.
	 */
	public static function get_inbound_smart_links( int $post_id, bool $include_applied = false ): array {
		$inbound_smart_links = parent::get_inbound_smart_links( $post_id, $include_applied );

		return array_map(
			function ( Smart_Link $smart_link ) {
				return self::from_smart_link( $smart_link );
			},
			$inbound_smart_links
		);
	}

	/**
	 * Gets an inbound smart link by its ID.
	 *
	 * @since 3.18.0
	 *
	 * @param int $smart_link_id The ID of the smart link.
	 * @return self|false The inbound smart link, or false if not found.
	 */
	public static function get_smart_link_by_id( int $smart_link_id ) {
		$smart_link = parent::get_smart_link_by_id( $smart_link_id );
		if ( false === $smart_link ) {
			return false;
		}

		return self::from_smart_link( $smart_link );
	}
}

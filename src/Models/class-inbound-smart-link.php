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
use Parsely\Models\Smart_Link;
use ReflectionClass;
use WP_Post;

/**
 * Model for Inbound Smart Link.
 *
 * @since 3.16.0
 */
class Inbound_Smart_Link extends Smart_Link {

	/**
	 * The source post object.
	 *
	 * @var WP_Post|null The source post.
	 */
	private $source_post;

	/**
	 * Serializes the model to a JSON string, and adds extra data.
	 *
	 * @since 3.16.0
	 *
	 * @return array<mixed> The serialized model.
	 */
	public function to_array(): array {
		$data = parent::to_array();

		$data['inbound'] = true;
		$data['post_data'] = $this->get_post_data();

		return $data;
	}

	/**
	 * Gets the post data for the smart link.
	 *
	 * @return array<mixed> The post data.
	 * @since 3.16.0
	 *
	 */
	private function get_post_data(): array {
		if ( null === $this->source_post ) {
			$this->source_post = get_post( $this->source_post_id );
		}

		$post = $this->source_post;

		if ( ! $post instanceof WP_Post ) {
			return array();
		}

		// Get the post content
		$content = $post->post_content;
		// Get the paragraph that has the smart link uid
		$paragraph = $this->get_paragraph( $content );

		return array(
			'id'        => $post->ID,
			'title'     => $post->post_title,
			'paragraph' => $paragraph,
			'permalink' => get_permalink( $post ),
			'edit_link' => get_edit_post_link( $post ),
		);
	}

	/**
	 * Get the HTML paragraph that has the smart link uid.
	 *
	 * @param string $content The post content
	 * @return string The paragraph that has the smart link uid
	 */
	private function get_paragraph(string $content): string {
		$paragraph = '';

		$dom = new DOMDocument();

		@$dom->loadHTML(mb_convert_encoding($content, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

		// Fetch all paragraph tags.
		$paragraphs = $dom->getElementsByTagName('p');

		foreach ($paragraphs as $p) {
			// Check each anchor tag within the paragraph.
			$anchors = $p->getElementsByTagName('a');
			foreach ($anchors as $anchor) {
				// Check if the data-smartlink attribute contains the UID.
				if ($anchor->hasAttribute('data-smartlink') && stripos($anchor->getAttribute('data-smartlink'), $this->uid) !== false) {
					// Save the outer HTML of the paragraph.
					$paragraph = $dom->saveHTML($p);
					break 2;
				}
			}
		}

		return $paragraph;
	}

	public static function from_smart_link( Smart_Link $smart_link ): Inbound_Smart_Link {
		$inbound_smart_link = new self('', '', '', 0);  // Create an instance with null values
		$reflectionClass = new ReflectionClass($smart_link);

		foreach ($reflectionClass->getProperties() as $property) {
			$property->setAccessible(true); // Make the property accessible
			$value = $property->getValue($smart_link);
			$property->setValue($inbound_smart_link, $value); // Copy the property value
		}

		return $inbound_smart_link;
	}

}

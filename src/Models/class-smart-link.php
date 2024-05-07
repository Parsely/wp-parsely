<?php
/**
 * Smart Link model: Represents a smart link suggestion returned by the Smart Linking API.
 *
 * @package Parsely
 * @since   3.15.0
 */

declare(strict_types=1);

namespace Parsely\Models;

/**
 * Smart Link class
 *
 * Represents a smart link suggestion returned by the Smart Linking API.
 *
 * @since 3.15.0
 */
class Smart_Link extends Base_Model {
	/**
	 * The post ID of the suggested link.
	 *
	 * @var int|false The post ID of the suggested link, false if not set.
	 */
	public $post_id = false;

	/**
	 * The URL of the suggested link.
	 *
	 * @var string The URL of the suggested link.
	 */
	public $href;

	/**
	 * The title of the suggested link.
	 *
	 * @var string The title of the suggested link.
	 */
	public $title;

	/**
	 * The text of the suggested link.
	 *
	 * @var string The text of the suggested link.
	 */
	public $text;

	/**
	 * The offset/position for the suggested link.
	 *
	 * @var int The offset/position for the suggested link.
	 */
	public $offset;

	/**
	 * The unique ID of the suggested link.
	 *
	 * @var string The unique ID of the suggested link.
	 */
	public $uid;

	/**
	 * Whether the link has been applied.
	 *
	 * @var bool Whether the link has been applied.
	 */
	public $applied;

	/**
	 * Smart Link constructor.
	 *
	 * @since 3.15.0
	 *
	 * @param string $href The URL of the suggested link.
	 * @param string $title The title of the suggested link.
	 * @param string $text The text of the suggested link.
	 * @param int $offset The offset/position for the suggested link.
	 */
	public function __construct( string $href, string $title, string $text, int $offset ) {
		$this->href = $href;
		$this->title = $title;
		$this->text = $text;
		$this->offset = $offset;
		$this->applied = false;

		parent::__construct();
	}

	/**
	 * Generates a unique ID for the suggested link.
	 *
	 * It takes the href, title, text, and offset properties and concatenates them
	 * to create a unique ID. This ID is hashed to ensure it is unique.
	 *
	 * @since 3.15.0
	 *
	 * @return string The unique ID.
	 */
	protected function generate_uid(): string {
		$unique_string = md5($this->href . $this->title . $this->text . $this->offset);
		return $unique_string;
	}

	/**
	 * Serializes the model to a JSON string.
	 *
	 * @since 3.15.0
	 *
	 * @return string The serialized model.
	 */
	public function to_array(): array {
		$json = array (
			'uid' => $this->uid,
			'href' => $this->href,
			'title' => $this->title,
			'text' => $this->text,
			'offset' => $this->offset,
			'applied' => $this->applied
		);

		if ( false === $json ) {
			$json = '{}';
		}

		return $json;
	}

	/**
	 * Sets the post ID of the suggested link.
	 *
	 * @since 3.15.0
	 *
	 * @param int $post_id The post ID of the suggested link.
	 */
	public function set_post_id( int $post_id ): void {
		$this->post_id = $post_id;
	}

	/**
	 * Deserializes a JSON string to a model.
	 *
	 * @since 3.15.0
	 *
	 * @param string $json The JSON string to deserialize.
	 * @return Base_Model The deserialized model.
	 */
	static public function deserialize( string $json ): Base_Model {
		$data = json_decode( $json, true );

		// Validate the JSON data.
		if ( ! is_array( $data ) ) {
			throw new \InvalidArgumentException( 'Invalid JSON data' );
		}

		return new Smart_Link( $data['href'], $data['title'], $data['text'], $data['offset'] );
	}

	/**
	 * Saves the smart link to the post meta.
	 *
	 * @return bool True if the smart link was saved successfully, false otherwise.
	 */
	public function save(): bool {
		if ( false === $this->post_id) {
			return false;
		}

		$post_meta_key = '_wp_parsely_smart_link_' . $this->uid;
		$existing_meta = get_post_meta( $this->post_id, $post_meta_key, true );

		if ( false !== $existing_meta ) {
			update_post_meta( $this->post_id, $post_meta_key, $this->serialize() );
			return true;
		}

		return add_post_meta( $this->post_id, $post_meta_key, $this->serialize(), true ) !== false;
	}

}

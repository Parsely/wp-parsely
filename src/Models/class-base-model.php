<?php
/**
 * Base model class for all Parsely models
 *
 * @package Parsely
 * @since   3.15.0
 */

declare(strict_types=1);

namespace Parsely\Models;

/**
 * Base model class for all Parsely models
 *
 * @since 3.15.0
 */
abstract class Base_Model {
	/**
	 * The unique ID of the model.
	 *
	 * @var string The unique ID of the model.
	 */
	public $uid;

	/**
	 * Base model constructor.
	 *
	 * @since 3.15.0
	 */
	public function __construct() {
		$this->uid = $this->generate_uid();
	}

	/**
	 * Returns the unique ID of the model.
	 *
	 * @since 3.15.0
	 *
	 * @return string The unique ID of the model.
	 */
	public function get_uid(): string {
		return $this->uid;
	}

	/**
	 * Generates a unique ID for the model.
	 *
	 * @since 3.15.0
	 *
	 * @return string The generated unique ID.
	 */
	abstract protected function generate_uid(): string;

	/**
	 * Serializes the model to a JSON string.
	 *
	 * @since 3.15.0
	 *
	 * @return string The serialized model.
	 */
	abstract public function serialize(): string;

	/**
	 * Deserializes a JSON string to a model.
	 *
	 * @since 3.15.0
	 *
	 * @param string $json The JSON string to deserialize.
	 * @return Base_Model The deserialized model.
	 */
	abstract static public function deserialize( string $json ): Base_Model;

	/**
	 * Saves the model to the database.
	 *
	 * @since 3.15.0
	 *
	 * @return bool True if the model was saved successfully, false otherwise.
	 */
	abstract public function save(): bool;
}

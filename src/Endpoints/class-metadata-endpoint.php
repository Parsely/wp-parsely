<?php
/**
 * Metadata endpoint abstract class
 *
 * @package Parsely\Endpoints
 * @since 3.3.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints;

use Parsely\Parsely;

/**
 * Metadata endpoint classes are expected to implement the remaining functions of the class.
 *
 * @since 3.3.0
 */
abstract class Metadata_Endpoint {
	protected const VERSION    = '1.0.0';
	protected const FIELD_NAME = 'parsely';

	/**
	 * Instance of Parsely class.
	 *
	 * @var Parsely
	 */
	protected $parsely;

	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Register metadata fields in the endpoints
	 *
	 * @since 3.3.0
	 *
	 * @return void
	 */
	abstract public function run(): void;

	/**
	 * Get the metadata in string format.
	 *
	 * @since 3.3.0
	 *
	 * @return string String containing the metadata as HTML code that can be directly inserted in into the page.
	 */
	public function get_rendered_meta(): string {
		ob_start();
		$this->parsely->insert_page_header_metadata();
		return ob_get_clean();
	}
}

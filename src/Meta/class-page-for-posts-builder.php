<?php
/**
 * Page For Posts Metadata Builder class
 *
 * @package Parsely
 * @since 3.4.0
 */

declare(strict_types=1);

namespace Parsely\Meta;

/**
 * Implements abstract Metadata Builder class to generate the metadata array
 * for a paginated front page.
 *
 * @since 3.4.0
 */
class Page_For_Posts_Builder extends Metadata_Builder {
	public function get_metadata(): array {
		$this->build_basic();

		return $this->metadata;
	}
}

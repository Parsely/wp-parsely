<?php
/**
 * Paginated Front Page Metadata Builder class
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
class Paginated_Front_Page_Builder extends Front_Page_Builder {
	protected function build_url(): void {
		$this->metadata['url'] = $this->get_current_url();
	}
}

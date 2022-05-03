<?php
/**
 * Front Page Metadata Builder class
 *
 * @package Parsely
 * @since 3.4.0
 */

declare(strict_types=1);

namespace Parsely\Meta;

/**
 * Implements abstract Metadata Builder class to generate the metadata array
 * for a front page.
 *
 * @since 3.4.0
 */
class Front_Page_Builder extends Metadata_Builder {
	public function get_metadata(): array {
		$this->build_basic();
		$this->build_headline();
		$this->build_url();

		return $this->metadata;
	}

	private function build_headline(): void {
		$this->metadata['headline'] = $this->clean_value( get_bloginfo( 'name', 'raw' ) );
	}

	protected function build_url(): void {
		$this->metadata['url'] = home_url();
	}
}

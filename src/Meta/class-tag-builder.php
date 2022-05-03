<?php

/**
 * Author Archive Page Metadata Builder class
 *
 * @package Parsely
 * @since 3.4.0
 */

declare( strict_types=1 );

namespace Parsely\Meta;

/**
 * Implements abstract Metadata Builder class to generate the metadata array
 * for a author archive page.
 *
 * @since 3.4.0
 */
class Tag_Builder extends Metadata_Builder {
	public function get_metadata(): array {
		$this->build_basic();
		$this->build_headline();
		$this->build_url();

		return $this->metadata;
	}

	private function build_headline(): void {
		$tag = single_tag_title( '', false );
		if ( empty( $tag ) ) {
			$tag = single_term_title( '', false );
		}
		/* translators: %s: Tag name */
		$this->metadata['headline'] = $this->clean_value( sprintf( __( 'Tagged - %s', 'wp-parsely' ), $tag ) );
	}
}

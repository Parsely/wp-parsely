<?php
/**
 * Structured Data Tests for single Pages.
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\StructuredData;

use Parsely\Metadata;
use Parsely\Parsely;

/**
 * Structured Data Tests for single Pages.
 *
 * @see https://www.parse.ly/help/integration/jsonld
 * @covers \Parsely\Metadata::construct_metadata
 */
final class SinglePageTest extends NonPostTestCase {

	/**
	 * Create a single page, and test the structured data.
	 *
	 * @covers \Parsely\Metadata::__construct
	 * @covers \Parsely\Metadata::construct_metadata
	 * @covers \Parsely\Metadata::get_author_name
	 * @covers \Parsely\Metadata::get_author_names
	 * @covers \Parsely\Metadata::get_bottom_level_term
	 * @covers \Parsely\Metadata::get_category_name
	 * @covers \Parsely\Metadata::get_clean_parsely_page_value
	 * @covers \Parsely\Metadata::get_coauthor_names
	 * @covers \Parsely\Metadata::get_current_url
	 * @covers \Parsely\Metadata::get_tags
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @group metadata
	 */
	public function test_single_page(): void {
		// Setup Parsely object.
		$parsely = new Parsely();

		// Insert a single page.
		$page_id = self::factory()->post->create(
			array(
				'post_type'  => 'page',
				'post_title' => 'Single Page',
				'post_name'  => 'foo',
			)
		);
		$page    = get_post( $page_id );

		// Set permalinks, as Parsely currently strips ?page_id=... from the URL property.
		// See https://github.com/Parsely/wp-parsely/issues/151.
		global $wp_rewrite;
		$wp_rewrite->set_permalink_structure( '/%postname%/' );

		// Make a request to that page to set the global $wp_query object.
		$this->go_to( get_permalink( $page_id ) );

		// Create the structured data for that post.
		$metadata        = new Metadata( $parsely );
		$structured_data = $metadata->construct_metadata( $page );

		// Check the required properties exist.
		$this->assert_data_has_required_properties( $structured_data );

		// The headline should be the post_title of the Page.
		self::assertEquals( 'Single Page', $structured_data['headline'] );
		self::assertEquals( get_permalink( $page_id ), $structured_data['url'] );
		self::assertQueryTrue( 'is_page', 'is_singular' );

		// Reset permalinks to Plain.
		$wp_rewrite->set_permalink_structure( '' );
	}
}

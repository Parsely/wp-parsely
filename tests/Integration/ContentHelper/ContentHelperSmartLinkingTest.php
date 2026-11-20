<?php
/**
 * Integration Tests: Smart Linking feature
 *
 * @package Parsely
 * @since   3.26.1
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\ContentHelper;

use Parsely\Content_Helper\Editor_Sidebar;
use Parsely\Models\Smart_Link;
use Parsely\Models\Smart_Link_Status;
use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;
use WP_Post;
use WP_Term;

/**
 * Integration tests for the Smart_Linking class.
 *
 * @since 3.26.1
 *
 * @covers \Parsely\Content_Helper\Editor_Sidebar\Smart_Linking::purge_smart_links
 */
final class ContentHelperSmartLinkingTest extends TestCase {
	/**
	 * Sets up the Smart Linking feature, as the plugin does on admin_init.
	 *
	 * @since 3.26.1
	 */
	public function set_up(): void {
		parent::set_up();

		( new Editor_Sidebar( new Parsely() ) )->init_features();

		// Keep the posts' IDs above the IDs of the terms the tests create, so
		// that a post can be given the ID of any of those terms.
		/** @var int $term_id */
		$term_id = self::factory()->term->create();
		self::factory()->post->create( array( 'import_id' => $term_id + 100 ) );
	}

	/**
	 * Verifies that deleting a post deletes its Smart Links, and only those.
	 *
	 * @since 3.26.1
	 */
	public function test_deleting_a_post_deletes_its_smart_links(): void {
		/** @var int $destination_post_id */
		$destination_post_id = self::factory()->post->create();
		$deleted_link        = $this->create_post_linking_to( $destination_post_id );
		$kept_link           = $this->create_post_linking_to( $destination_post_id );

		wp_delete_post( $deleted_link['post_id'], true );
		wp_cache_flush();

		self::assertNull( get_post( $deleted_link['smart_link_id'] ) );
		self::assertInstanceOf( WP_Post::class, get_post( $kept_link['smart_link_id'] ) );
		self::assertCount( 1, Smart_Link::get_outbound_smart_links( $kept_link['post_id'], Smart_Link_Status::APPLIED ) );
	}

	/**
	 * Verifies that deleting a post whose ID equals the ID of a Smart Link term
	 * keeps the term, and the links that use it.
	 *
	 * @since 3.26.1
	 *
	 * @dataProvider data_smart_link_terms_and_post_types
	 *
	 * @param string $taxonomy  The taxonomy of the term.
	 * @param string $post_type The type of the deleted post.
	 */
	public function test_deleting_a_post_keeps_the_smart_link_term_with_its_id( string $taxonomy, string $post_type ): void {
		/** @var int $destination_post_id */
		$destination_post_id = self::factory()->post->create();
		$link                = $this->create_post_linking_to( $destination_post_id );

		$slugs = array(
			'smart_link_source'      => (string) $link['post_id'],
			'smart_link_destination' => (string) $destination_post_id,
			'smart_link_status'      => Smart_Link_Status::APPLIED,
		);
		$term  = get_term_by( 'slug', $slugs[ $taxonomy ], $taxonomy );
		self::assertInstanceOf( WP_Term::class, $term );

		self::assertNull( get_post( $term->term_id ), 'A post already has the term ID.' );
		$post_id = wp_insert_post(
			array(
				'import_id'   => $term->term_id,
				'post_type'   => $post_type,
				'post_status' => 'publish',
				'post_title'  => 'Unrelated post',
			)
		);
		self::assertSame( $term->term_id, $post_id );

		wp_delete_post( $post_id, true );
		wp_cache_flush();

		self::assertNotNull( term_exists( $term->term_id, $taxonomy ), 'The term was deleted.' );
		self::assertCount( 1, Smart_Link::get_outbound_smart_links( $link['post_id'], Smart_Link_Status::APPLIED ) );
		self::assertCount( 1, Smart_Link::get_inbound_smart_links( $destination_post_id, Smart_Link_Status::APPLIED ) );
	}

	/**
	 * Data provider for test_deleting_a_post_keeps_the_smart_link_term_with_its_id().
	 *
	 * @since 3.26.1
	 *
	 * @return array<string, array{string, string}>
	 */
	public function data_smart_link_terms_and_post_types(): array {
		return array(
			'source term, post'                   => array( 'smart_link_source', 'post' ),
			'source term, Smart Link record'      => array( 'smart_link_source', 'parsely_smart_link' ),
			'destination term, post'              => array( 'smart_link_destination', 'post' ),
			'destination term, Smart Link record' => array( 'smart_link_destination', 'parsely_smart_link' ),
			'applied term, post'                  => array( 'smart_link_status', 'post' ),
			'applied term, Smart Link record'     => array( 'smart_link_status', 'parsely_smart_link' ),
		);
	}

	/**
	 * Verifies that Smart Links to a deleted post keep it as their destination.
	 *
	 * @since 3.26.1
	 */
	public function test_smart_links_to_a_deleted_post_keep_their_destination(): void {
		/** @var int $destination_post_id */
		$destination_post_id = self::factory()->post->create();
		$link                = $this->create_post_linking_to( $destination_post_id );

		wp_delete_post( $destination_post_id, true );
		wp_cache_flush();

		self::assertSame(
			array( (string) $destination_post_id ),
			wp_get_object_terms( $link['smart_link_id'], 'smart_link_destination', array( 'fields' => 'slugs' ) )
		);

		$smart_links = Smart_Link::get_outbound_smart_links( $link['post_id'], Smart_Link_Status::APPLIED );
		self::assertCount( 1, $smart_links );
		self::assertSame( $destination_post_id, $smart_links[0]->destination_post_id );
	}

	/**
	 * Creates a post with a Smart Link to the destination post in its content,
	 * and saves the Smart Link as applied.
	 *
	 * @since 3.26.1
	 *
	 * @param int $destination_post_id The destination post ID.
	 * @return array{post_id: int, smart_link_id: int} The post and Smart Link IDs.
	 */
	private function create_post_linking_to( int $destination_post_id ): array {
		$href = (string) get_permalink( $destination_post_id );

		/** @var int $post_id */
		$post_id = self::factory()->post->create();

		$smart_link = new Smart_Link( $href, 'Title', 'link', 0, $post_id );
		$smart_link->set_status( Smart_Link_Status::APPLIED );
		self::assertTrue( $smart_link->save() );

		wp_update_post(
			array(
				'ID'           => $post_id,
				'post_content' => '<p><a href="' . esc_url( $href ) . '" data-smartlink="' . $smart_link->get_uid() . '">link</a></p>',
			)
		);

		/** @var array{smart_link_id: int} $data */
		$data = $smart_link->to_array();

		return array(
			'post_id'       => $post_id,
			'smart_link_id' => $data['smart_link_id'],
		);
	}
}

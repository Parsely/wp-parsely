<?php
/**
 * Integration Tests: Single Page pages metadata
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\StructuredData;

use Parsely\Metadata;
use Parsely\Parsely;

/**
 * Integration Tests for Single Page pages metadata.
 *
 * @see https://docs.parse.ly/metadata-jsonld/
 *
 * @covers \Parsely\Metadata::construct_metadata
 */
final class SinglePageTest extends NonPostTestCase {
	/**
	 * Verifies that the metadata generated for Single Page pages is as
	 * expected. No author, category, or tag is set.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Metadata\Metadata_Builder::build_article_section
	 * @covers \Parsely\Metadata\Metadata_Builder::build_author
	 * @covers \Parsely\Metadata\Metadata_Builder::build_image
	 * @covers \Parsely\Metadata\Metadata_Builder::build_keywords
	 * @covers \Parsely\Metadata\Metadata_Builder::build_metadata_post_times
	 * @covers \Parsely\Metadata\Metadata_Builder::build_thumbnail_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_author_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_category_name
	 * @covers \Parsely\Metadata\Metadata_Builder::get_coauthor_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_current_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_tags
	 * @uses \Parsely\Metadata::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::build_basic
	 * @uses \Parsely\Metadata\Metadata_Builder::clean_value
	 * @uses \Parsely\Metadata\Page_Builder::__construct
	 * @uses \Parsely\Metadata\Page_Builder::build_headline
	 * @uses \Parsely\Metadata\Page_Builder::build_url
	 * @uses \Parsely\Metadata\Page_Builder::get_metadata
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Utils\get_default_category
	 * @group metadata
	 */
	public function test_single_page(): void {
		$this->run_single_page_test( false, false, false );
	}

	/**
	 * Verifies that the metadata generated for Single Page pages is as
	 * expected. An author is set.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Metadata\Metadata_Builder::build_article_section
	 * @covers \Parsely\Metadata\Metadata_Builder::build_author
	 * @covers \Parsely\Metadata\Metadata_Builder::build_image
	 * @covers \Parsely\Metadata\Metadata_Builder::build_keywords
	 * @covers \Parsely\Metadata\Metadata_Builder::build_metadata_post_times
	 * @covers \Parsely\Metadata\Metadata_Builder::build_thumbnail_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_author_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_category_name
	 * @covers \Parsely\Metadata\Metadata_Builder::get_coauthor_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_current_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_tags
	 * @uses \Parsely\Metadata::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::build_basic
	 * @uses \Parsely\Metadata\Metadata_Builder::clean_value
	 * @uses \Parsely\Metadata\Page_Builder::__construct
	 * @uses \Parsely\Metadata\Page_Builder::build_headline
	 * @uses \Parsely\Metadata\Page_Builder::build_url
	 * @uses \Parsely\Metadata\Page_Builder::get_metadata
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Utils\get_default_category
	 * @group metadata
	 */
	public function test_single_page_with_author(): void {
		$this->run_single_page_test( true, false, false );
	}

	/**
	 * Verifies that the metadata generated for Single Page pages is as
	 * expected. A category is set.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Metadata\Metadata_Builder::build_article_section
	 * @covers \Parsely\Metadata\Metadata_Builder::build_author
	 * @covers \Parsely\Metadata\Metadata_Builder::build_image
	 * @covers \Parsely\Metadata\Metadata_Builder::build_keywords
	 * @covers \Parsely\Metadata\Metadata_Builder::build_metadata_post_times
	 * @covers \Parsely\Metadata\Metadata_Builder::build_thumbnail_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_author_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_category_name
	 * @covers \Parsely\Metadata\Metadata_Builder::get_coauthor_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_current_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_tags
	 * @uses \Parsely\Metadata::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::build_basic
	 * @uses \Parsely\Metadata\Metadata_Builder::clean_value
	 * @uses \Parsely\Metadata\Page_Builder::__construct
	 * @uses \Parsely\Metadata\Page_Builder::build_headline
	 * @uses \Parsely\Metadata\Page_Builder::build_url
	 * @uses \Parsely\Metadata\Page_Builder::get_metadata
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Utils\get_default_category
	 * @group metadata
	 */
	public function test_single_page_with_category(): void {
		$this->run_single_page_test( false, true, false );
	}

	/**
	 * Verifies that the metadata generated for Single Page pages is as
	 * expected. A tag is set.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Metadata\Metadata_Builder::build_article_section
	 * @covers \Parsely\Metadata\Metadata_Builder::build_author
	 * @covers \Parsely\Metadata\Metadata_Builder::build_image
	 * @covers \Parsely\Metadata\Metadata_Builder::build_keywords
	 * @covers \Parsely\Metadata\Metadata_Builder::build_metadata_post_times
	 * @covers \Parsely\Metadata\Metadata_Builder::build_thumbnail_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_author_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_category_name
	 * @covers \Parsely\Metadata\Metadata_Builder::get_coauthor_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_current_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_tags
	 * @uses \Parsely\Metadata::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::build_basic
	 * @uses \Parsely\Metadata\Metadata_Builder::clean_value
	 * @uses \Parsely\Metadata\Page_Builder::__construct
	 * @uses \Parsely\Metadata\Page_Builder::build_headline
	 * @uses \Parsely\Metadata\Page_Builder::build_url
	 * @uses \Parsely\Metadata\Page_Builder::get_metadata
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Utils\get_default_category
	 * @group metadata
	 */
	public function test_single_page_with_tag(): void {
		$this->run_single_page_test( false, false, true );
	}

	/**
	 * Verifies that the metadata generated for Single Page pages is as
	 * expected. A tag is set and the lowercase_tags option is off.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Metadata\Metadata_Builder::build_article_section
	 * @covers \Parsely\Metadata\Metadata_Builder::build_author
	 * @covers \Parsely\Metadata\Metadata_Builder::build_image
	 * @covers \Parsely\Metadata\Metadata_Builder::build_keywords
	 * @covers \Parsely\Metadata\Metadata_Builder::build_metadata_post_times
	 * @covers \Parsely\Metadata\Metadata_Builder::build_thumbnail_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_author_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_category_name
	 * @covers \Parsely\Metadata\Metadata_Builder::get_coauthor_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_current_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_tags
	 * @uses \Parsely\Metadata::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::build_basic
	 * @uses \Parsely\Metadata\Metadata_Builder::clean_value
	 * @uses \Parsely\Metadata\Page_Builder::__construct
	 * @uses \Parsely\Metadata\Page_Builder::build_headline
	 * @uses \Parsely\Metadata\Page_Builder::build_url
	 * @uses \Parsely\Metadata\Page_Builder::get_metadata
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Utils\get_default_category
	 * @group metadata
	 */
	public function test_single_page_with_tag_lowercase_off(): void {
		$this->run_single_page_test( false, false, true, false );
	}

	/**
	 * Verifies that the metadata generated for Single Page pages is as
	 * expected. An author and a category are set.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Metadata\Metadata_Builder::build_article_section
	 * @covers \Parsely\Metadata\Metadata_Builder::build_author
	 * @covers \Parsely\Metadata\Metadata_Builder::build_image
	 * @covers \Parsely\Metadata\Metadata_Builder::build_keywords
	 * @covers \Parsely\Metadata\Metadata_Builder::build_metadata_post_times
	 * @covers \Parsely\Metadata\Metadata_Builder::build_thumbnail_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_author_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_category_name
	 * @covers \Parsely\Metadata\Metadata_Builder::get_coauthor_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_current_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_tags
	 * @uses \Parsely\Metadata::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::build_basic
	 * @uses \Parsely\Metadata\Metadata_Builder::clean_value
	 * @uses \Parsely\Metadata\Page_Builder::__construct
	 * @uses \Parsely\Metadata\Page_Builder::build_headline
	 * @uses \Parsely\Metadata\Page_Builder::build_url
	 * @uses \Parsely\Metadata\Page_Builder::get_metadata
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Utils\get_default_category
	 * @group metadata
	 */
	public function test_single_page_with_author_and_category(): void {
		$this->run_single_page_test( true, true, false );
	}

	/**
	 * Verifies that the metadata generated for Single Page pages is as
	 * expected. An author and a tag are set.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Metadata\Metadata_Builder::build_article_section
	 * @covers \Parsely\Metadata\Metadata_Builder::build_author
	 * @covers \Parsely\Metadata\Metadata_Builder::build_image
	 * @covers \Parsely\Metadata\Metadata_Builder::build_keywords
	 * @covers \Parsely\Metadata\Metadata_Builder::build_metadata_post_times
	 * @covers \Parsely\Metadata\Metadata_Builder::build_thumbnail_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_author_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_category_name
	 * @covers \Parsely\Metadata\Metadata_Builder::get_coauthor_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_current_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_tags
	 * @uses \Parsely\Metadata::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::build_basic
	 * @uses \Parsely\Metadata\Metadata_Builder::clean_value
	 * @uses \Parsely\Metadata\Page_Builder::__construct
	 * @uses \Parsely\Metadata\Page_Builder::build_headline
	 * @uses \Parsely\Metadata\Page_Builder::build_url
	 * @uses \Parsely\Metadata\Page_Builder::get_metadata
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Utils\get_default_category
	 * @group metadata
	 */
	public function test_single_page_with_author_and_tag(): void {
		$this->run_single_page_test( true, false, true );
	}

	/**
	 * Verifies that the metadata generated for Single Page pages is as
	 * expected. A category and a tag are set.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Metadata\Metadata_Builder::build_article_section
	 * @covers \Parsely\Metadata\Metadata_Builder::build_author
	 * @covers \Parsely\Metadata\Metadata_Builder::build_image
	 * @covers \Parsely\Metadata\Metadata_Builder::build_keywords
	 * @covers \Parsely\Metadata\Metadata_Builder::build_metadata_post_times
	 * @covers \Parsely\Metadata\Metadata_Builder::build_thumbnail_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_author_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_category_name
	 * @covers \Parsely\Metadata\Metadata_Builder::get_coauthor_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_current_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_tags
	 * @uses \Parsely\Metadata::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::build_basic
	 * @uses \Parsely\Metadata\Metadata_Builder::clean_value
	 * @uses \Parsely\Metadata\Page_Builder::__construct
	 * @uses \Parsely\Metadata\Page_Builder::build_headline
	 * @uses \Parsely\Metadata\Page_Builder::build_url
	 * @uses \Parsely\Metadata\Page_Builder::get_metadata
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Utils\get_default_category
	 * @group metadata
	 */
	public function test_single_page_with_category_and_tag(): void {
		$this->run_single_page_test( false, true, true );
	}

	/**
	 * Verifies that the metadata generated for Single Page pages is as
	 * expected. An author, a category, and a tag are set.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Metadata\Metadata_Builder::build_article_section
	 * @covers \Parsely\Metadata\Metadata_Builder::build_author
	 * @covers \Parsely\Metadata\Metadata_Builder::build_image
	 * @covers \Parsely\Metadata\Metadata_Builder::build_keywords
	 * @covers \Parsely\Metadata\Metadata_Builder::build_metadata_post_times
	 * @covers \Parsely\Metadata\Metadata_Builder::build_thumbnail_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_author_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_category_name
	 * @covers \Parsely\Metadata\Metadata_Builder::get_coauthor_names
	 * @covers \Parsely\Metadata\Metadata_Builder::get_current_url
	 * @covers \Parsely\Metadata\Metadata_Builder::get_tags
	 * @uses \Parsely\Metadata::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::__construct
	 * @uses \Parsely\Metadata\Metadata_Builder::build_basic
	 * @uses \Parsely\Metadata\Metadata_Builder::clean_value
	 * @uses \Parsely\Metadata\Page_Builder::__construct
	 * @uses \Parsely\Metadata\Page_Builder::build_headline
	 * @uses \Parsely\Metadata\Page_Builder::build_url
	 * @uses \Parsely\Metadata\Page_Builder::get_metadata
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::update_metadata_endpoint
	 * @uses \Parsely\Utils\get_default_category
	 * @group metadata
	 */
	public function test_single_page_with_author_and_category_and_tag(): void {
		$this->run_single_page_test( true, true, true );
	}

	/**
	 * Runs the single page test with the desired parameters.
	 *
	 * @since 3.14.0 Renamed from test_single_page.
	 *
	 * @param bool $with_author Whether to test with an author.
	 * @param bool $with_category Whether to test with a category.
	 * @param bool $with_tag Whether to test with a tag.
	 * @param bool $lowercase_tags The value of the `lowercase_tags` option.
	 */
	private function run_single_page_test(
		bool $with_author,
		bool $with_category,
		bool $with_tag,
		bool $lowercase_tags = true
	): void {
		// Setup Parsely object.
		$parsely = new Parsely();

		$page_data = array(
			'post_type'  => 'page',
			'post_title' => 'Single Page',
			'post_name'  => 'foo',
			'post_date'  => '2024-01-01 12:00:00',
		);

		if ( $with_author ) {
			$page_data['post_author'] = 1;
		}

		// Insert a single page.
		/** @var int $page_id */
		$page_id = self::factory()->post->create( $page_data );

		if ( $with_category ) {
			// Create a category and assign it to the page.
			/** @var int $category_id */
			$category_id = self::factory()->category->create(
				array(
					'name' => 'Category 1',
					'slug' => 'category-1',
				)
			);
			wp_set_post_categories( $page_id, array( $category_id ) );
		}

		if ( $with_tag ) {
			// Set the `lowercase_tags` option as needed.
			$parsely_options                   = $parsely->get_options();
			$parsely_options['lowercase_tags'] = $lowercase_tags;
			update_option( 'parsely', $parsely_options );

			// Create a tag and assign it to the page.
			$tag_id = self::factory()->tag->create(
				array(
					'name' => 'Tag 1',
					'slug' => 'tag-1',
				)
			);
			wp_set_post_tags( $page_id, array( $tag_id ) );
		}

		$page = $this->get_post( $page_id );

		// Set permalinks, as Parsely currently strips ?page_id=... from the URL
		// property. See https://github.com/Parsely/wp-parsely/issues/151.
		global $wp_rewrite;
		$wp_rewrite->set_permalink_structure( '/%postname%/' );

		// Make a request to that page to set the global $wp_query object.
		$this->go_to( (string) $this->get_permalink( $page_id ) );

		// Create the structured data for that post.
		$metadata = new Metadata( $parsely );
		/** @var array<string,mixed> $structured_data */
		$structured_data = $metadata->construct_metadata( $page );

		// Check the required properties exist.
		$this->assert_data_has_required_properties( $structured_data );

		// The headline should be the post_title of the page.
		self::assertSame( 'Single Page', $structured_data['headline'] ?? null );
		self::assertSame( get_permalink( $page_id ), $structured_data['url'] ?? null );
		self::assertSame( '2024-01-01T12:00:00Z', $structured_data['dateCreated'] );
		self::assertSame( '2024-01-01T12:00:00Z', $structured_data['datePublished'] );
		self::assertSame( '2024-01-01T12:00:00Z', $structured_data['dateModified'] );
		self::assertSame( '', $structured_data['thumbnailUrl'] );
		self::assertSame(
			array(
				'@type' => 'ImageObject',
				'url'   => '',
			),
			$structured_data['image']
		);
		self::assertQueryTrue( 'is_page', 'is_singular' );

		// Test author/creator values.
		if ( $with_author ) {
			/** @var array<int, array<string, string>> $author */
			$author = $structured_data['author'];
			/** @var array<int, string> $creator */
			$creator = $structured_data['creator'];

			self::assertSame( 'Person', $author[0]['@type'] );
			self::assertSame( 'admin', $author[0]['name'] );
			self::assertSame( 'admin', $creator[0] );
		} else {
			self::assertSame( array(), $structured_data['author'] );
			self::assertSame( array(), $structured_data['creator'] );
		}

		// Test category value.
		if ( $with_category ) {
			self::assertSame( 'Category 1', $structured_data['articleSection'] );
		} else {
			self::assertSame( 'Uncategorized', $structured_data['articleSection'] );
		}

		// Test tag value.
		if ( $with_tag ) {
			/** @var array<int, string> $keywords */
			$keywords = $structured_data['keywords'];

			if ( true === $lowercase_tags ) {
				self::assertSame( 'tag 1', $keywords[0] );
			} else {
				self::assertSame( 'Tag 1', $keywords[0] );
			}
		} else {
			self::assertSame( array(), $structured_data['keywords'] );
		}

		// Reset permalinks to plain.
		$wp_rewrite->set_permalink_structure( '' );
	}

	/**
	 * Returns the required properties for non-posts.
	 *
	 * @since 3.14.0
	 *
	 * @return array<string>
	 */
	protected function get_required_properties(): array {
		return array(
			'@context',
			'@type',
			'articleSection',
			'author',
			'creator',
			'headline',
			'keywords',
			'url',
		);
	}
}

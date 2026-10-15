<?php
/**
 * Integration tests for object-level authorization in the Endpoint_Smart_Linking
 * class.
 *
 * The Smart Linking routes all operate on the post named by the route's
 * `post_id`, so access to them is checked against that post.
 *
 * @package Parsely
 * @since   3.23.6
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\ContentHelper;

use Parsely\Content_Helper\Editor_Sidebar;
use Parsely\Content_Helper\Editor_Sidebar\Smart_Linking;
use Parsely\Models\Inbound_Smart_Link;
use Parsely\Models\Smart_Link_Status;
use Parsely\Parsely;
use Parsely\Permissions;
use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking;
use Parsely\Tests\Integration\TestCase;
use WP_Error;
use WP_Post;
use WP_REST_Request;
use WP_REST_Response;

/**
 * Integration tests for object-level authorization in the Endpoint_Smart_Linking
 * class.
 *
 * @since 3.23.6
 *
 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
 */
class EndpointSmartLinkingAuthorizationTest extends TestCase {
	/**
	 * Anchor text of the seeded Smart Links, used to detect the source post's
	 * content in responses.
	 */
	private const LINK_TEXT = 'INBOUND-SOURCE-CONTENT-MARKER';

	/**
	 * The endpoint instance.
	 *
	 * @var Endpoint_Smart_Linking
	 */
	private Endpoint_Smart_Linking $endpoint;

	/**
	 * A published post owned by the current user.
	 *
	 * @var int
	 */
	private int $own_post_id;

	/**
	 * A published post owned by another user.
	 *
	 * @var int
	 */
	private int $other_users_post_id;

	/**
	 * A private post owned by another user.
	 *
	 * @var int
	 */
	private int $other_users_private_post_id;

	/**
	 * A scheduled post owned by another user.
	 *
	 * @var int
	 */
	private int $other_users_scheduled_post_id;

	/**
	 * A password-protected published post owned by another user.
	 *
	 * @var int
	 */
	private int $other_users_protected_post_id;

	/**
	 * A published post of a non-public post type, owned by another user.
	 *
	 * @var int
	 */
	private int $other_users_hidden_cpt_post_id;

	/**
	 * A private post owned by the current user.
	 *
	 * @var int
	 */
	private int $own_private_post_id;

	/**
	 * Sets up the test environment.
	 *
	 * @since 3.23.6
	 */
	public function set_up(): void {
		parent::set_up();

		$parsely        = new Parsely();
		$this->endpoint = new Endpoint_Smart_Linking( new Content_Helper_Controller( $parsely ) );

		// Register the parsely_smart_link post type and its taxonomies, which
		// the Smart Link models persist to.
		( new Smart_Linking( new Editor_Sidebar( $parsely ) ) )->run();

		// Enable Smart Linking for every role having edit_posts.
		TestCase::set_options(
			array(
				'apikey'         => 'test-apikey',
				'api_secret'     => 'test-secret',
				'content_helper' => array(
					'ai_features_enabled' => true,
					'smart_linking'       => array(
						'enabled'            => true,
						'allowed_user_roles' => array_keys(
							Permissions::get_user_roles_with_edit_posts_cap()
						),
					),
				),
			)
		);

		$other_user_id  = TestCase::create_test_user( 'sl_other_user', 'administrator' );
		$author_user_id = TestCase::create_test_user( 'sl_author', 'author' );

		/** @var int $own_post_id */
		$own_post_id       = self::factory()->post->create(
			array(
				'post_author' => $author_user_id,
				'post_status' => 'publish',
			)
		);
		$this->own_post_id = $own_post_id;

		/** @var int $other_users_post_id */
		$other_users_post_id       = self::factory()->post->create(
			array(
				'post_author' => $other_user_id,
				'post_status' => 'publish',
			)
		);
		$this->other_users_post_id = $other_users_post_id;

		// Non-public posts get a slug generated from their title, which makes
		// them addressable by URL. Drafts and pending posts do not.
		$this->other_users_private_post_id = $this->create_post(
			array(
				'post_author' => $other_user_id,
				'post_status' => 'private',
				'post_title'  => 'Private by other',
			)
		);

		$this->other_users_scheduled_post_id = $this->create_post(
			array(
				'post_author' => $other_user_id,
				'post_status' => 'future',
				'post_date'   => '2099-01-01 00:00:00',
				'post_title'  => 'Scheduled by other',
			)
		);

		$this->other_users_protected_post_id = $this->create_post(
			array(
				'post_author'   => $other_user_id,
				'post_status'   => 'publish',
				'post_password' => 'secret-pw',
				'post_title'    => 'Protected by other',
			)
		);

		register_post_type(
			'sl_hidden_cpt',
			array(
				'public'       => false,
				'show_in_rest' => false,
				'label'        => 'Hidden',
			)
		);

		$this->other_users_hidden_cpt_post_id = $this->create_post(
			array(
				'post_author' => $other_user_id,
				'post_status' => 'publish',
				'post_type'   => 'sl_hidden_cpt',
				'post_title'  => 'Hidden CPT by other',
			)
		);

		$this->own_private_post_id = $this->create_post(
			array(
				'post_author' => $author_user_id,
				'post_status' => 'private',
				'post_title'  => 'Private by author',
			)
		);

		wp_set_current_user( $author_user_id );
	}

	/**
	 * Creates a post and returns its ID.
	 *
	 * @since 3.23.7
	 *
	 * @param array<string, mixed> $args The post's fields.
	 * @return int The new post's ID.
	 */
	private function create_post( array $args ): int {
		/** @var int */
		return self::factory()->post->create( $args );
	}

	/**
	 * Returns the post IDs that get_post_meta_for_urls() describes for the
	 * given posts' URLs.
	 *
	 * @since 3.23.7
	 *
	 * @param int ...$post_ids The posts to request meta for.
	 * @return array<int> The post IDs present in the response.
	 */
	private function get_post_meta_ids( int ...$post_ids ): array {
		$urls = array();

		foreach ( $post_ids as $post_id ) {
			$post = get_post( $post_id );
			self::assertInstanceOf( WP_Post::class, $post );
			self::assertNotSame( '', $post->post_name, 'Fixture is wrong: the post has no slug.' );

			$urls[] = home_url( '/' . $post->post_name . '/' );
		}

		$request = new WP_REST_Request( 'POST' );
		$request->set_param( 'urls', $urls );

		/** @var array{data: array<array{id: int}>} $data */
		$data = $this->endpoint->get_post_meta_for_urls( $request )->get_data();

		return array_column( $data['data'], 'id' );
	}

	/**
	 * Builds a request for the given post ID.
	 *
	 * @since 3.23.6
	 *
	 * @param int $post_id The post ID.
	 * @return WP_REST_Request The request object.
	 */
	private function get_request( int $post_id ): WP_REST_Request {
		$request = new WP_REST_Request( 'POST' );
		$request->set_param( 'post_id', $post_id );

		return $request;
	}

	/**
	 * Verifies that an Author retains access to the Smart Linking routes for a
	 * post they own.
	 *
	 * @since 3.23.6
	 *
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 */
	public function test_author_retains_access_to_own_post(): void {
		self::assertTrue(
			current_user_can( 'edit_post', $this->own_post_id ),
			'Fixture is wrong: the user cannot edit their own post.'
		);

		self::assertTrue(
			$this->endpoint->is_available_to_current_user( $this->get_request( $this->own_post_id ) ),
			'An Author should retain Smart Linking access to their own post.'
		);
	}

	/**
	 * Verifies that an Author is denied access to the Smart Linking routes for
	 * a post owned by another user.
	 *
	 * @since 3.23.6
	 *
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 */
	public function test_author_denied_access_to_another_users_post(): void {
		self::assertFalse(
			current_user_can( 'edit_post', $this->other_users_post_id ),
			'Fixture is wrong: the user can edit the other user\'s post.'
		);

		self::assertInstanceOf(
			WP_Error::class,
			$this->endpoint->is_available_to_current_user(
				$this->get_request( $this->other_users_post_id )
			),
			'An Author should be denied Smart Linking access to another user\'s post.'
		);
	}

	/**
	 * Verifies that an Editor retains access to another user's post, which the
	 * edit_others_posts capability allows.
	 *
	 * @since 3.23.6
	 *
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 */
	public function test_editor_retains_access_to_another_users_post(): void {
		TestCase::set_current_user_to( 'sl_editor', 'editor' );

		self::assertTrue(
			$this->endpoint->is_available_to_current_user(
				$this->get_request( $this->other_users_post_id )
			),
			'An Editor should retain Smart Linking access to another user\'s post.'
		);
	}

	/**
	 * Verifies that get_post_meta_for_urls() does not describe another user's
	 * non-public posts.
	 *
	 * The route takes URLs rather than post IDs, so the permission callback's
	 * per-post check cannot cover it. URLs resolve by slug irrespective of post
	 * status, which makes private and scheduled posts addressable.
	 *
	 * @since 3.23.7
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::get_post_meta_for_urls
	 * @uses \Parsely\Utils\Utils::get_post_id_by_url
	 */
	public function test_post_meta_omits_another_users_non_public_posts(): void {
		self::assertFalse(
			current_user_can( 'read_post', $this->other_users_private_post_id ),
			'Fixture is wrong: the user can read the other user\'s private post.'
		);

		self::assertSame(
			array(),
			$this->get_post_meta_ids(
				$this->other_users_private_post_id,
				$this->other_users_scheduled_post_id
			),
			'Meta for another user\'s non-public posts was disclosed.'
		);
	}

	/**
	 * Verifies that get_post_meta_for_urls() still describes the posts the user
	 * can read.
	 *
	 * Guards against the read_post check being too restrictive: linking to
	 * other users' published posts is the feature's purpose.
	 *
	 * @since 3.23.7
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::get_post_meta_for_urls
	 * @uses \Parsely\Utils\Utils::get_post_id_by_url
	 */
	public function test_post_meta_includes_readable_posts(): void {
		self::assertSame(
			array( $this->other_users_post_id, $this->own_private_post_id ),
			$this->get_post_meta_ids( $this->other_users_post_id, $this->own_private_post_id ),
			'Meta for readable posts should be returned.'
		);
	}

	/**
	 * Verifies that an Editor still gets meta for another user's non-public
	 * posts, which the read_private_posts capability allows.
	 *
	 * @since 3.23.7
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::get_post_meta_for_urls
	 * @uses \Parsely\Utils\Utils::get_post_id_by_url
	 */
	public function test_post_meta_includes_another_users_private_post_for_editor(): void {
		TestCase::set_current_user_to( 'sl_meta_editor', 'editor' );

		self::assertSame(
			array( $this->other_users_private_post_id ),
			$this->get_post_meta_ids( $this->other_users_private_post_id ),
			'An Editor should still get meta for another user\'s private post.'
		);
	}

	/**
	 * Stores an applied inbound Smart Link, pointing from the source post to
	 * the current user's own post.
	 *
	 * Saved as the source post's author, mirroring how the link would really be
	 * created.
	 *
	 * @since 3.24.2
	 *
	 * @param int $source_post_id The post holding the link.
	 */
	private function seed_inbound_link( int $source_post_id ): void {
		$source_post = get_post( $source_post_id );
		self::assertInstanceOf( WP_Post::class, $source_post );

		// The anchor text has to be present for the link to be applied.
		wp_update_post(
			array(
				'ID'           => $source_post_id,
				'post_content' => '<!-- wp:paragraph --><p>A ' . self::LINK_TEXT .
					' in the source post.</p><!-- /wp:paragraph -->',
			)
		);

		$current_user_id = get_current_user_id();
		wp_set_current_user( (int) $source_post->post_author );

		$link = new Inbound_Smart_Link(
			(string) get_permalink( $this->own_post_id ),
			'Own post',
			self::LINK_TEXT,
			0,
			$source_post_id
		);
		$link->set_destination_post_id( $this->own_post_id );
		$link->set_status( Smart_Link_Status::PENDING );
		$link->set_context( 'smart_linking' );
		$link->save();
		$link->apply();

		wp_set_current_user( $current_user_id );
	}

	/**
	 * Returns the source post IDs of the inbound links that
	 * get_smart_links() reports for the current user's own post.
	 *
	 * @since 3.24.2
	 *
	 * @return array{ids: array<int>, json: string, inbound: array<mixed>} The source IDs, raw response and entries.
	 */
	private function get_inbound_sources(): array {
		$response = $this->endpoint->get_smart_links( $this->get_request( $this->own_post_id ) );
		self::assertInstanceOf( WP_REST_Response::class, $response );

		/** @var array{data: array{inbound: array<array{source: array{post_id: int}}>}} $data */
		$data = $response->get_data();

		return array(
			'ids'     => array_column(
				array_column( $data['data']['inbound'], 'source' ),
				'post_id'
			),
			'json'    => (string) wp_json_encode( $data ),
			'inbound' => $data['data']['inbound'],
		);
	}

	/**
	 * Verifies that inbound links sourced from a post the user cannot see are
	 * omitted, along with that post's title and content.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::get_smart_links
	 * @uses \Parsely\Models\Inbound_Smart_Link
	 * @uses \Parsely\Models\Smart_Link
	 */
	public function test_inbound_links_omit_inaccessible_source_posts(): void {
		$this->seed_inbound_link( $this->other_users_private_post_id );

		self::assertFalse(
			current_user_can( 'edit_post', $this->other_users_private_post_id ),
			'Fixture is wrong: the user can edit the source post.'
		);

		$inbound = $this->get_inbound_sources();

		self::assertNotContains(
			$this->other_users_private_post_id,
			$inbound['ids'],
			'An inbound link from an inaccessible source post should be omitted.'
		);
		self::assertStringNotContainsString(
			'Private by other',
			$inbound['json'],
			'The inaccessible source post\'s title was included.'
		);
		self::assertStringNotContainsString(
			self::LINK_TEXT,
			$inbound['json'],
			'The inaccessible source post\'s content was included.'
		);
	}

	/**
	 * Verifies that inbound links sourced from a post the user can edit are
	 * still reported.
	 *
	 * Guards against the check being too restrictive, which would empty the
	 * editor sidebar's inbound list.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::get_smart_links
	 * @uses \Parsely\Models\Inbound_Smart_Link
	 * @uses \Parsely\Models\Smart_Link
	 */
	public function test_inbound_links_include_accessible_source_posts(): void {
		$this->seed_inbound_link( $this->own_private_post_id );

		self::assertSame(
			array( $this->own_private_post_id ),
			$this->get_inbound_sources()['ids'],
			'An inbound link from the user\'s own post should be reported.'
		);
	}

	/**
	 * Verifies that an Editor still sees inbound links from another user's
	 * non-public post.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::get_smart_links
	 * @uses \Parsely\Models\Inbound_Smart_Link
	 * @uses \Parsely\Models\Smart_Link
	 */
	public function test_inbound_links_include_another_users_post_for_editor(): void {
		$this->seed_inbound_link( $this->other_users_private_post_id );

		TestCase::set_current_user_to( 'sl_inbound_editor', 'editor' );

		self::assertSame(
			array( $this->other_users_private_post_id ),
			$this->get_inbound_sources()['ids'],
			'An Editor should still see the inbound link.'
		);
	}

	/**
	 * Verifies that an inbound link from another user's published post is still
	 * reported, with its paragraph.
	 *
	 * Guards against the check being too restrictive.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::get_smart_links
	 * @uses \Parsely\Models\Inbound_Smart_Link
	 * @uses \Parsely\Models\Smart_Link
	 */
	public function test_inbound_links_include_another_users_published_post(): void {
		$this->seed_inbound_link( $this->other_users_post_id );

		self::assertFalse(
			current_user_can( 'edit_post', $this->other_users_post_id ),
			'Fixture is wrong: the user can edit the source post.'
		);

		$inbound = $this->get_inbound_sources();

		self::assertSame(
			array( $this->other_users_post_id ),
			$inbound['ids'],
			'An inbound link from a published post should be reported.'
		);
		self::assertStringContainsString(
			self::LINK_TEXT,
			$inbound['json'],
			'The paragraph of a published source post should be included.'
		);
	}

	/**
	 * Verifies that a password-protected source post is reported without its
	 * paragraph.
	 *
	 * WordPress withholds a protected post's content from users who cannot edit
	 * it, while its title stays public.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::get_smart_links
	 * @uses \Parsely\Models\Inbound_Smart_Link
	 * @uses \Parsely\Models\Smart_Link
	 */
	public function test_inbound_links_omit_the_paragraph_of_a_protected_source_post(): void {
		$this->seed_inbound_link( $this->other_users_protected_post_id );

		self::assertTrue(
			post_password_required( $this->other_users_protected_post_id ),
			'Fixture is wrong: the source post is not protected.'
		);

		$inbound = $this->get_inbound_sources();

		self::assertSame(
			array( $this->other_users_protected_post_id ),
			$inbound['ids'],
			'The inbound link itself should still be reported.'
		);
		self::assertStringNotContainsString(
			self::LINK_TEXT,
			$inbound['json'],
			'The protected source post\'s content was included.'
		);
	}

	/**
	 * Verifies that a source post of a non-public post type is omitted.
	 *
	 * Such a post is readable per `read_post`, but the core REST API does not
	 * serve it, so its content is not public information.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::get_smart_links
	 * @uses \Parsely\Models\Inbound_Smart_Link
	 * @uses \Parsely\Models\Smart_Link
	 */
	public function test_inbound_links_omit_a_non_public_post_type_source(): void {
		$this->seed_inbound_link( $this->other_users_hidden_cpt_post_id );

		self::assertTrue(
			current_user_can( 'read_post', $this->other_users_hidden_cpt_post_id ),
			'Fixture is wrong: read_post should allow this post, which is why ' .
			'public viewability is checked instead.'
		);

		$inbound = $this->get_inbound_sources();

		self::assertNotContains(
			$this->other_users_hidden_cpt_post_id,
			$inbound['ids'],
			'A non-public post type source should be omitted.'
		);
		self::assertStringNotContainsString(
			self::LINK_TEXT,
			$inbound['json'],
			'The non-public source post\'s content was included.'
		);
	}
}

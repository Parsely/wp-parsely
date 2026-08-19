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

use Parsely\Parsely;
use Parsely\Permissions;
use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking;
use Parsely\Tests\Integration\TestCase;
use WP_Error;
use WP_Post;
use WP_REST_Request;

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

		$this->endpoint = new Endpoint_Smart_Linking(
			new Content_Helper_Controller( new Parsely() )
		);

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
}

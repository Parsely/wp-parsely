<?php
/**
 * Integration tests for object-level authorization in the Endpoint_Traffic_Boost
 * class.
 *
 * These tests cover the authorization of the caller-supplied
 * `source_post_id`, which names the post that the Traffic Boost placement flow
 * reads from and writes to.
 *
 * @package Parsely
 * @since   3.23.6
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\ContentHelper;

use Parsely\Content_Helper\Editor_Sidebar;
use Parsely\Content_Helper\Editor_Sidebar\Smart_Linking;
use Parsely\Models\Inbound_Smart_Link;
use Parsely\Parsely;
use Parsely\Permissions;
use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost;
use Parsely\Services\Suggestions_API\Suggestions_API_Service;
use Parsely\Tests\Integration\TestCase;
use Parsely\Tests\Traits\TestsReflection;
use WP_Post;
use WP_REST_Request;
use WP_REST_Response;

/**
 * Integration tests for object-level authorization in the Endpoint_Traffic_Boost
 * class.
 *
 * @since 3.23.6
 *
 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost
 */
class EndpointTrafficBoostAuthorizationTest extends TestCase {
	use TestsReflection;

	/**
	 * Marker embedded in the restricted post, used to detect disclosure.
	 */
	private const RESTRICTED_MARKER = 'RESTRICTED-CONTENT-MARKER';

	/**
	 * Text the smart link is anchored to. Must exist in the source post.
	 */
	private const LINK_TEXT = 'roadmap';

	/**
	 * The endpoint instance.
	 *
	 * @var Endpoint_Traffic_Boost
	 */
	private Endpoint_Traffic_Boost $endpoint;

	/**
	 * A private post owned by another user.
	 *
	 * @var int
	 */
	private int $private_post_id;

	/**
	 * A published post owned by the current user, used as the link destination.
	 *
	 * @var int
	 */
	private int $destination_post_id;

	/**
	 * A published post owned by the current user, used as an editable link source.
	 *
	 * @var int
	 */
	private int $own_post_id;

	/**
	 * The other user's ID (Administrator role).
	 *
	 * @var int
	 */
	private int $other_user_id;

	/**
	 * Sets up the test environment.
	 *
	 * @since 3.23.6
	 */
	public function set_up(): void {
		parent::set_up();

		$parsely        = new Parsely();
		$this->endpoint = new Endpoint_Traffic_Boost( new Content_Helper_Controller( $parsely ) );

		// Register the parsely_smart_link post type and its taxonomies, which
		// the Smart Link models persist to.
		( new Smart_Linking( new Editor_Sidebar( $parsely ) ) )->run();

		// Enable Traffic Boost for every role having edit_posts. This mirrors
		// set_default_content_helper_settings_values(), which is applied to
		// installations upgraded from a version predating the content_helper
		// option.
		TestCase::set_options(
			array(
				'apikey'         => 'test-apikey',
				'api_secret'     => 'test-secret',
				'content_helper' => array(
					'ai_features_enabled' => true,
					'traffic_boost'       => array(
						'enabled'            => true,
						'allowed_user_roles' => array_keys(
							Permissions::get_user_roles_with_edit_posts_cap()
						),
					),
				),
			)
		);

		$this->other_user_id = TestCase::create_test_user( 'tb_other_user', 'administrator' );
		$author_user_id      = TestCase::create_test_user( 'tb_author', 'author' );

		$this->private_post_id = $this->create_post(
			array(
				'post_author'  => $this->other_user_id,
				'post_status'  => 'private',
				'post_title'   => 'Private post by another user',
				'post_content' => '<!-- wp:paragraph --><p>Confidential internal ' .
					self::LINK_TEXT . ': ' . self::RESTRICTED_MARKER .
					'</p><!-- /wp:paragraph -->',
			)
		);

		$this->destination_post_id = $this->create_post(
			array(
				'post_author'  => $author_user_id,
				'post_status'  => 'publish',
				'post_title'   => 'Destination post',
				'post_content' => '<!-- wp:paragraph --><p>Public destination.</p><!-- /wp:paragraph -->',
			)
		);

		$this->own_post_id = $this->create_post(
			array(
				'post_author'  => $author_user_id,
				'post_status'  => 'publish',
				'post_title'   => 'Own source post',
				'post_content' => '<!-- wp:paragraph --><p>My own ' . self::LINK_TEXT .
					' notes.</p><!-- /wp:paragraph -->',
			)
		);

		wp_set_current_user( $author_user_id );

		// Fixture sanity: the current user must genuinely lack edit access.
		self::assertFalse(
			current_user_can( 'edit_others_posts' ),
			'The user should not hold edit_others_posts.'
		);
		self::assertFalse(
			current_user_can( 'edit_post', $this->private_post_id ),
			'The user should not be able to edit the other user\'s post.'
		);
	}

	/**
	 * Builds a placement request for the given source post.
	 *
	 * @since 3.23.6
	 *
	 * @param int|null $source_post_id The source post. Defaults to the restricted post.
	 * @return WP_REST_Request The request object.
	 */
	private function get_placement_request( ?int $source_post_id = null ): WP_REST_Request {
		$request = new WP_REST_Request( 'POST' );

		// Mirrors the route's validate_callback, which sets the `post` param.
		$this->endpoint->validate_post_id( (string) $this->destination_post_id, $request );

		$request->set_param( 'post_id', $this->destination_post_id );
		$request->set_param( 'source_post_id', $source_post_id ?? $this->private_post_id );
		$request->set_param( 'keyword_exclusion_list', array() );
		$request->set_param( 'allow_duplicate_links', false );
		$request->set_param( 'save', true );

		return $request;
	}

	/**
	 * Injects a Suggestions API mock returning a placement in the source post.
	 *
	 * The external Parse.ly call is the only thing replaced. Every local
	 * authorization decision still runs for real.
	 *
	 * @since 3.23.6
	 *
	 * @param int|null $source_post_id The source post. Defaults to the restricted post.
	 */
	private function mock_suggestions_api( ?int $source_post_id = null ): void {
		$suggestion = new Inbound_Smart_Link(
			(string) get_permalink( $this->destination_post_id ),
			'Destination post',
			self::LINK_TEXT,
			0,
			$source_post_id ?? $this->private_post_id
		);

		$mock = $this->createMock( Suggestions_API_Service::class );
		$mock->method( 'get_inbound_link_positions' )->willReturn( array( $suggestion ) );

		self::set_protected_property( $this->endpoint, 'suggestions_api', $mock );
	}

	/**
	 * Creates a post and returns its ID.
	 *
	 * @since 3.23.6
	 *
	 * @param array<string, mixed> $args The post's fields.
	 * @return int The new post's ID.
	 */
	private function create_post( array $args ): int {
		/** @var int */
		return self::factory()->post->create( $args );
	}

	/**
	 * Returns a post's content as currently stored in the database.
	 *
	 * @since 3.23.6
	 *
	 * @param int $post_id The post ID.
	 * @return string The stored post content.
	 */
	private function get_stored_content( int $post_id ): string {
		$post = get_post( $post_id );

		return $post instanceof WP_Post ? $post->post_content : '';
	}

	/**
	 * Verifies that the permission callback denies a request whose
	 * `source_post_id` names a post the current user cannot edit.
	 *
	 * Permissions::current_user_can_use_pch_feature() already accepts a post ID
	 * and performs the edit_post check, and the editor sidebar passes one. The
	 * REST chain is expected to do the same.
	 *
	 * @since 3.23.6
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_pch_feature_enabled_for_user
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 */
	public function test_permission_callback_denies_inaccessible_source_post(): void {
		self::assertNotTrue(
			$this->endpoint->is_available_to_current_user( $this->get_placement_request() ),
			'Permission callback authorized a source post the user cannot edit.'
		);
	}

	/**
	 * Verifies that generate_placement_suggestions does not disclose the content
	 * of a source post the current user cannot edit.
	 *
	 * @since 3.23.6
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::generate_placement_suggestions
	 * @uses \Parsely\Models\Inbound_Smart_Link
	 * @uses \Parsely\Models\Smart_Link
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 */
	public function test_generate_placement_denies_inaccessible_source_post(): void {
		$this->mock_suggestions_api();

		$response = $this->endpoint->generate_placement_suggestions( $this->get_placement_request() );

		if ( ! $response instanceof WP_REST_Response ) {
			self::assertWPError( $response, 'Placement generation should be denied.' );
			return;
		}

		self::assertStringNotContainsString(
			self::RESTRICTED_MARKER,
			(string) wp_json_encode( $response->get_data() ),
			'Restricted post content was disclosed by generate_placement_suggestions().'
		);
	}

	/**
	 * Verifies that accept_suggestion neither writes to, nor discloses, a source
	 * post the current user cannot edit.
	 *
	 * @since 3.23.6
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::accept_suggestion
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::validate_smart_link_id
	 * @uses \Parsely\Models\Inbound_Smart_Link
	 * @uses \Parsely\Models\Smart_Link
	 * @uses \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::generate_placement_suggestions
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 */
	public function test_accept_suggestion_does_not_modify_inaccessible_source_post(): void {
		$this->mock_suggestions_api();

		$generated = $this->endpoint->generate_placement_suggestions( $this->get_placement_request() );
		if ( ! $generated instanceof WP_REST_Response ) {
			self::assertWPError( $generated, 'Placement generation should be denied.' );
			return;
		}

		/** @var array{data: array{smart_link_id: int}} $generated_data */
		$generated_data = $generated->get_data();

		$accept_request = new WP_REST_Request( 'POST' );
		$accept_request->set_param( 'post_id', $this->destination_post_id );
		$this->endpoint->validate_smart_link_id( $generated_data['data']['smart_link_id'], $accept_request );

		$response = $this->endpoint->accept_suggestion( $accept_request );

		// Integrity: nothing may be persisted into the restricted post.
		self::assertStringNotContainsString(
			'data-smartlink',
			$this->get_stored_content( $this->private_post_id ),
			'A smart link was persisted into a post the user cannot edit.'
		);

		// Confidentiality: the response must not echo the private content back.
		if ( $response instanceof WP_REST_Response ) {
			self::assertStringNotContainsString(
				self::RESTRICTED_MARKER,
				(string) wp_json_encode( $response->get_data() ),
				'Restricted post content was disclosed by accept_suggestion().'
			);
		}
	}

	/**
	 * Verifies that the feature still works on a source post the user owns.
	 *
	 * Guards against the authorization checks being too restrictive.
	 *
	 * @since 3.23.6
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::accept_suggestion
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::generate_placement_suggestions
	 * @uses \Parsely\Models\Inbound_Smart_Link
	 * @uses \Parsely\Models\Smart_Link
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::validate_smart_link_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 */
	public function test_placement_succeeds_on_own_source_post(): void {
		$this->assert_placement_succeeds( $this->own_post_id );
	}

	/**
	 * Verifies that an Editor can still place links in another user's private
	 * post, which the edit_others_posts capability allows.
	 *
	 * @since 3.23.6
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::accept_suggestion
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::generate_placement_suggestions
	 * @uses \Parsely\Models\Inbound_Smart_Link
	 * @uses \Parsely\Models\Smart_Link
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::validate_smart_link_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 */
	public function test_editor_can_place_in_another_users_private_post(): void {
		TestCase::set_current_user_to( 'tb_editor', 'editor' );

		self::assertTrue(
			current_user_can( 'edit_post', $this->private_post_id ),
			'An Editor should be able to edit another user\'s private post.'
		);

		$this->assert_placement_succeeds( $this->private_post_id );
	}

	/**
	 * Verifies that an Administrator can still place links in another user's
	 * private post.
	 *
	 * @since 3.23.6
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::accept_suggestion
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::generate_placement_suggestions
	 * @uses \Parsely\Models\Inbound_Smart_Link
	 * @uses \Parsely\Models\Smart_Link
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::validate_smart_link_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 */
	public function test_administrator_can_place_in_another_users_private_post(): void {
		$this->set_current_user_to_admin();

		$this->assert_placement_succeeds( $this->private_post_id );
	}

	/**
	 * Provides post statuses and types owned by another user.
	 *
	 * @since 3.23.6
	 *
	 * @return array<string, array{string, string}> The status and post type.
	 */
	public function data_inaccessible_source_posts(): array {
		return array(
			'published post' => array( 'publish', 'post' ),
			'draft post'     => array( 'draft', 'post' ),
			'pending post'   => array( 'pending', 'post' ),
			'private post'   => array( 'private', 'post' ),
			'published page' => array( 'publish', 'page' ),
		);
	}

	/**
	 * Verifies that the authorization applies to any post the user cannot edit,
	 * not just private ones.
	 *
	 * @since 3.23.6
	 *
	 * @dataProvider data_inaccessible_source_posts
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::accept_suggestion
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::generate_placement_suggestions
	 * @uses \Parsely\Models\Inbound_Smart_Link
	 * @uses \Parsely\Models\Smart_Link
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::validate_smart_link_id
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 *
	 * @param string $post_status The source post's status.
	 * @param string $post_type   The source post's type.
	 */
	public function test_denies_any_inaccessible_source_post( string $post_status, string $post_type ): void {
		$source_post_id = $this->create_post(
			array(
				'post_author'  => $this->other_user_id,
				'post_status'  => $post_status,
				'post_type'    => $post_type,
				'post_title'   => 'Post by another user',
				'post_content' => '<!-- wp:paragraph --><p>Other user ' . self::LINK_TEXT .
					' content.</p><!-- /wp:paragraph -->',
			)
		);

		self::assertFalse(
			current_user_can( 'edit_post', $source_post_id ),
			'Fixture is wrong: the user can edit this post.'
		);

		$this->mock_suggestions_api( $source_post_id );

		$request = $this->get_placement_request( $source_post_id );

		self::assertNotTrue(
			$this->endpoint->is_available_to_current_user( $request ),
			'Permission callback authorized an inaccessible source post.'
		);

		self::assertWPError(
			$this->endpoint->generate_placement_suggestions( $request ),
			'Placement generation should be denied.'
		);

		self::assertStringNotContainsString(
			'data-smartlink',
			$this->get_stored_content( $source_post_id ),
			'A smart link was persisted into a post the user cannot edit.'
		);
	}

	/**
	 * Asserts that the full generate/accept flow succeeds for the given source
	 * post, and that the smart link is persisted to it.
	 *
	 * @since 3.23.6
	 *
	 * @param int $source_post_id The source post to place the link in.
	 */
	private function assert_placement_succeeds( int $source_post_id ): void {
		$this->mock_suggestions_api( $source_post_id );

		$request = $this->get_placement_request( $source_post_id );

		self::assertTrue(
			$this->endpoint->is_available_to_current_user( $request ),
			'The endpoint should be available for an editable source post.'
		);

		$generated = $this->endpoint->generate_placement_suggestions( $request );
		self::assertInstanceOf(
			WP_REST_Response::class,
			$generated,
			'Placement generation should succeed on an editable source post.'
		);

		/** @var array{data: array{smart_link_id: int}} $generated_data */
		$generated_data = $generated->get_data();

		$accept_request = new WP_REST_Request( 'POST' );
		$accept_request->set_param( 'post_id', $this->destination_post_id );
		$this->endpoint->validate_smart_link_id( $generated_data['data']['smart_link_id'], $accept_request );

		self::assertInstanceOf(
			WP_REST_Response::class,
			$this->endpoint->accept_suggestion( $accept_request ),
			'Accepting a suggestion should succeed on an editable source post.'
		);

		self::assertStringContainsString(
			'data-smartlink',
			$this->get_stored_content( $source_post_id ),
			'The smart link should have been applied to the source post.'
		);
	}
}

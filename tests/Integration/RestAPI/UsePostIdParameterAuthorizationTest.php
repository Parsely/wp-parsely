<?php
/**
 * Integration tests for object-level authorization on routes registered with a
 * post ID parameter.
 *
 * Routes registered through Use_Post_ID_Parameter_Trait accept a post ID. The
 * endpoint-level capability alone does not say anything about the named post,
 * so the trait gates every such route on access to that post.
 *
 * @package Parsely
 * @since   3.24.2
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI;

use Parsely\Parsely;
use Parsely\REST_API\REST_API_Controller;
use Parsely\REST_API\Stats\Endpoint_Post;
use Parsely\REST_API\Stats\Stats_Controller;
use Parsely\Tests\Integration\TestCase;
use WP_Error;
use WP_Post;
use WP_REST_Request;

/**
 * Integration tests for object-level authorization on routes registered with a
 * post ID parameter.
 *
 * @since 3.24.2
 *
 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait
 */
class UsePostIdParameterAuthorizationTest extends TestCase {
	/**
	 * Marker embedded in the restricted post, used to detect its fields.
	 */
	private const RESTRICTED_MARKER = 'RESTRICTED-CONTENT-MARKER';

	/**
	 * An endpoint using the trait, used to exercise its methods directly.
	 *
	 * @var Endpoint_Post
	 */
	private Endpoint_Post $endpoint;

	/**
	 * A draft owned by another user, which the current user cannot edit.
	 *
	 * @var int
	 */
	private int $restricted_post_id;

	/**
	 * A published post owned by the current user.
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
	 * @since 3.24.2
	 */
	public function set_up(): void {
		parent::set_up();

		TestCase::set_options(
			array(
				'apikey'     => 'test-apikey',
				'api_secret' => 'test-secret',
			)
		);

		$parsely        = new Parsely();
		$this->endpoint = new Endpoint_Post( new Stats_Controller( $parsely ) );

		// Register every plugin route so the permission wiring can be inspected.
		( new REST_API_Controller( $parsely ) )->init();
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'rest_api_init' );

		$this->other_user_id = TestCase::create_test_user( 'pid_other_user', 'administrator' );
		$author_user_id      = TestCase::create_test_user( 'pid_author', 'author' );

		$this->restricted_post_id = $this->create_restricted_post();

		$this->own_post_id = $this->create_post(
			array(
				'post_author' => $author_user_id,
				'post_status' => 'publish',
				'post_title'  => 'Own post',
			)
		);

		wp_set_current_user( $author_user_id );

		// Fixture sanity: the current user must clear the endpoint-level gate
		// while genuinely lacking access to the restricted post.
		self::assertTrue(
			current_user_can( 'publish_posts' ),
			'The user should hold the endpoint-level capability.'
		);
		self::assertFalse(
			current_user_can( 'edit_post', $this->restricted_post_id ),
			'The user should not be able to edit the other user\'s post.'
		);
	}

	/**
	 * Tears down the test environment.
	 *
	 * @since 3.24.2
	 */
	public function tear_down(): void {
		// Otherwise these routes carry over into later tests, whose own registration
		// becomes a no-op.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['wp_rest_server'] = null;

		parent::tear_down();
	}

	/**
	 * Creates a post owned by another user, with the marker in every field of
	 * its WP_Post object.
	 *
	 * @since 3.24.2
	 *
	 * @param string $post_status The post's status.
	 * @param string $post_type   The post's type.
	 * @return int The new post's ID.
	 */
	private function create_restricted_post(
		string $post_status = 'draft',
		string $post_type = 'post'
	): int {
		return $this->create_post(
			array(
				'post_author'   => $this->other_user_id,
				'post_status'   => $post_status,
				'post_type'     => $post_type,
				'post_title'    => 'Title ' . self::RESTRICTED_MARKER,
				'post_content'  => 'Content ' . self::RESTRICTED_MARKER,
				'post_excerpt'  => 'Excerpt ' . self::RESTRICTED_MARKER,
				'post_password' => 'Password ' . self::RESTRICTED_MARKER,
			)
		);
	}

	/**
	 * Creates a post and returns its ID.
	 *
	 * @since 3.24.2
	 *
	 * @param array<string, mixed> $args The post's fields.
	 * @return int The new post's ID.
	 */
	private function create_post( array $args ): int {
		/** @var int */
		return self::factory()->post->create( $args );
	}

	/**
	 * Builds a request carrying the given post ID.
	 *
	 * @since 3.24.2
	 *
	 * @param int $post_id The post ID to reference.
	 * @return WP_REST_Request The request object.
	 */
	private function get_request( int $post_id ): WP_REST_Request {
		$request = new WP_REST_Request( 'GET' );
		$request->set_param( 'post_id', $post_id );

		return $request;
	}

	/**
	 * Returns the plugin's registered routes that take a post ID parameter.
	 *
	 * @since 3.24.2
	 *
	 * @return array<string, array<mixed>> The routes, keyed by route pattern.
	 */
	private function get_post_id_routes(): array {
		$routes = array();

		foreach ( rest_get_server()->get_routes() as $route => $handlers ) {
			if ( 0 !== strpos( $route, '/wp-parsely/' ) ) {
				continue;
			}

			if ( false === strpos( $route, '(?P<post_id>' ) ) {
				continue;
			}

			$routes[ $route ] = $handlers;
		}

		return $routes;
	}

	/**
	 * Verifies that every route taking a post ID is gated on access to that
	 * post.
	 *
	 * This is the guard that covers routes added in the future: a new route
	 * registered through the trait is picked up here automatically.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 */
	public function test_every_post_id_route_is_gated_on_post_access(): void {
		$routes = $this->get_post_id_routes();

		self::assertNotCount(
			0,
			$routes,
			'No routes with a post ID parameter were found. The fixture is wrong.'
		);

		foreach ( $routes as $route => $handlers ) {
			foreach ( $handlers as $handler ) {
				/** @var array{permission_callback?: mixed} $handler */
				$callback = $handler['permission_callback'] ?? null;

				self::assertIsArray(
					$callback,
					"The permission callback of $route should be a method callable."
				);
				self::assertSame(
					'can_access_request_post',
					$callback[1],
					"The route $route is not gated on access to its post."
				);
			}
		}
	}

	/**
	 * Verifies that the Stats and Utils post routes are among those covered by
	 * the check above.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::register_rest_route_with_post_id
	 */
	public function test_stats_and_utils_post_routes_take_a_post_id_parameter(): void {
		$routes = array_keys( $this->get_post_id_routes() );

		foreach (
			array(
				'/wp-parsely/v2/stats/post/(?P<post_id>\d+)/details',
				'/wp-parsely/v2/stats/post/(?P<post_id>\d+)/referrers',
				'/wp-parsely/v2/stats/post/(?P<post_id>\d+)/related',
				'/wp-parsely/v2/utils/post/(?P<post_id>\d+)/rest-route',
			) as $route
		) {
			self::assertContains( $route, $routes, "The route $route should be registered." );
		}
	}

	/**
	 * Verifies that validating the post ID does not store the post object in
	 * the request.
	 *
	 * Validation only checks the ID; handlers fetch the post through
	 * get_request_post().
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 */
	public function test_validate_post_id_does_not_store_the_post_object(): void {
		$request = $this->get_request( $this->restricted_post_id );

		self::assertTrue(
			$this->endpoint->validate_post_id( (string) $this->restricted_post_id, $request ),
			'An existing post ID should validate.'
		);

		foreach ( $request->get_params() as $name => $value ) {
			self::assertNotInstanceOf(
				WP_Post::class,
				$value,
				"The request parameter '$name' holds a WP_Post object."
			);
		}

		self::assertStringNotContainsString(
			self::RESTRICTED_MARKER,
			(string) wp_json_encode( $request->get_params() ),
			'Restricted post fields were stored in the request parameters.'
		);
	}

	/**
	 * Verifies that an invalid post ID is still rejected.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 */
	public function test_validate_post_id_rejects_invalid_ids(): void {
		$request = $this->get_request( 0 );

		self::assertFalse(
			$this->endpoint->validate_post_id( 'not-a-number', $request ),
			'A non-numeric post ID should not validate.'
		);
		self::assertFalse(
			$this->endpoint->validate_post_id( '999999', $request ),
			'A non-existent post ID should not validate.'
		);
	}

	/**
	 * Verifies that the permission callback denies a post the current user
	 * cannot edit.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 */
	public function test_can_access_request_post_denies_inaccessible_post(): void {
		$result = $this->endpoint->can_access_request_post(
			$this->get_request( $this->restricted_post_id )
		);

		self::assertInstanceOf(
			WP_Error::class,
			$result,
			'An inaccessible post should be denied.'
		);
		self::assertSame( 'parsely_post_access_denied', $result->get_error_code() );

		/** @var array{status?: int} $error_data */
		$error_data = $result->get_error_data();
		self::assertSame(
			rest_authorization_required_code(),
			$error_data['status'] ?? 0,
			'The denial should use an authorization status code.'
		);
	}

	/**
	 * Verifies that the permission callback allows a post the current user can
	 * edit.
	 *
	 * Guards against the authorization check being too restrictive.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 */
	public function test_can_access_request_post_allows_editable_post(): void {
		self::assertTrue(
			$this->endpoint->can_access_request_post( $this->get_request( $this->own_post_id ) ),
			'The user\'s own post should be allowed.'
		);
	}

	/**
	 * Verifies that a role holding edit_others_posts still reaches other users'
	 * posts.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 */
	public function test_can_access_request_post_allows_editor_on_another_users_post(): void {
		TestCase::set_current_user_to( 'pid_editor', 'editor' );

		self::assertTrue(
			current_user_can( 'edit_post', $this->restricted_post_id ),
			'An Editor should be able to edit another user\'s draft.'
		);
		self::assertTrue(
			$this->endpoint->can_access_request_post(
				$this->get_request( $this->restricted_post_id )
			),
			'An Editor should be allowed through.'
		);
	}

	/**
	 * Verifies that the endpoint-level checks still run, and are reported ahead
	 * of the per-post check.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 */
	public function test_can_access_request_post_preserves_endpoint_level_errors(): void {
		TestCase::set_options(
			array(
				'apikey'     => 'test-apikey',
				'api_secret' => '',
			)
		);

		$result = $this->endpoint->can_access_request_post(
			$this->get_request( $this->own_post_id )
		);

		self::assertInstanceOf(
			WP_Error::class,
			$result,
			'A missing API secret should be reported.'
		);
		self::assertSame( 'parsely_api_secret_not_set', $result->get_error_code() );
	}

	/**
	 * Verifies that a user without the endpoint-level capability is denied even
	 * for a post they can edit.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 */
	public function test_can_access_request_post_denies_user_without_capability(): void {
		$contributor_id = TestCase::create_test_user( 'pid_contributor', 'contributor' );
		$own_draft_id   = $this->create_post(
			array(
				'post_author' => $contributor_id,
				'post_status' => 'draft',
			)
		);

		wp_set_current_user( $contributor_id );

		self::assertTrue(
			current_user_can( 'edit_post', $own_draft_id ),
			'A Contributor should be able to edit their own draft.'
		);
		self::assertNotTrue(
			$this->endpoint->can_access_request_post( $this->get_request( $own_draft_id ) ),
			'A Contributor lacks publish_posts and should be denied.'
		);
	}

	/**
	 * Provides post statuses and types owned by another user.
	 *
	 * @since 3.24.2
	 *
	 * @return array<string, array{string, string}> The status and post type.
	 */
	public function data_inaccessible_posts(): array {
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
	 * not just unpublished ones.
	 *
	 * @since 3.24.2
	 *
	 * @dataProvider data_inaccessible_posts
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 *
	 * @param string $post_status The post's status.
	 * @param string $post_type   The post's type.
	 */
	public function test_denies_any_inaccessible_post(
		string $post_status,
		string $post_type
	): void {
		$post_id = $this->create_restricted_post( $post_status, $post_type );

		self::assertFalse(
			current_user_can( 'edit_post', $post_id ),
			'Fixture is wrong: the user can edit this post.'
		);
		self::assertNotTrue(
			$this->endpoint->can_access_request_post( $this->get_request( $post_id ) ),
			'An inaccessible post should be denied.'
		);
	}

	/**
	 * Verifies that dispatching a post ID route denies an inaccessible post,
	 * and returns nothing about it.
	 *
	 * Exercises the whole chain, proving the permission callback is wired up
	 * and not merely correct in isolation.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @covers \Parsely\REST_API\Utils\Endpoint_Post::get_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 */
	public function test_dispatch_denies_inaccessible_post(): void {
		$response = rest_get_server()->dispatch(
			new WP_REST_Request(
				'GET',
				"/wp-parsely/v2/utils/post/{$this->restricted_post_id}/rest-route"
			)
		);

		self::assertSame(
			rest_authorization_required_code(),
			$response->get_status(),
			'The route should deny an inaccessible post.'
		);
		self::assertStringNotContainsString(
			self::RESTRICTED_MARKER,
			(string) wp_json_encode( $response->get_data() ),
			'The route\'s response included restricted post fields.'
		);
	}

	/**
	 * Verifies that dispatching a post ID route still works on an accessible
	 * post.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Utils\Endpoint_Post::get_rest_route
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 */
	public function test_dispatch_succeeds_on_accessible_post(): void {
		$response = rest_get_server()->dispatch(
			new WP_REST_Request(
				'GET',
				"/wp-parsely/v2/utils/post/{$this->own_post_id}/rest-route"
			)
		);

		self::assertSame( 200, $response->get_status() );
		self::assertSame(
			array( 'data' => '/wp/v2/posts/' . $this->own_post_id ),
			$response->get_data()
		);
	}

	/**
	 * Verifies that a post ID that doesn't exist is rejected as a bad
	 * parameter, not as an authorization failure.
	 *
	 * WordPress runs the argument validation before the permission callback, so
	 * an ID that does not resolve to a post never reaches the per-post check.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 */
	public function test_dispatch_rejects_nonexistent_post(): void {
		$this->set_current_user_to_admin();

		$response = rest_get_server()->dispatch(
			new WP_REST_Request( 'GET', '/wp-parsely/v2/utils/post/999999/rest-route' )
		);

		self::assertSame( 400, $response->get_status() );

		/** @var array{code?: string} $data */
		$data = $response->get_data();
		self::assertSame( 'rest_invalid_param', $data['code'] ?? '' );
	}

	/**
	 * Verifies that the denial carries a message, so that callers receive
	 * something actionable rather than an empty error.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 */
	public function test_denial_carries_an_error_message(): void {
		$result = $this->endpoint->can_access_request_post(
			$this->get_request( $this->restricted_post_id )
		);

		self::assertInstanceOf( WP_Error::class, $result );
		self::assertNotSame( '', $result->get_error_message() );
	}
}

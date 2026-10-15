<?php
/**
 * Integration tests for authorization in the Stats API Endpoint_Post class.
 *
 * The three routes of this endpoint take a post ID. They serve only posts the
 * caller can edit, and don't include the post object in their response.
 *
 * @package Parsely
 * @since   3.24.2
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\Stats;

use Parsely\Parsely;
use Parsely\REST_API\REST_API_Controller;
use Parsely\Tests\Integration\TestCase;
use Parsely\Utils\Utils;
use WP_Post;
use WP_REST_Request;

/**
 * Integration tests for authorization in the Stats API Endpoint_Post class.
 *
 * @since 3.24.2
 *
 * @covers \Parsely\REST_API\Stats\Endpoint_Post
 */
class EndpointStatsPostAuthorizationTest extends TestCase {
	/**
	 * Marker embedded in the restricted post, used to detect its fields in
	 * responses.
	 */
	private const RESTRICTED_MARKER = 'RESTRICTED-CONTENT-MARKER';

	/**
	 * A draft owned by another user, which the Author cannot edit.
	 *
	 * @var int
	 */
	private int $restricted_post_id;

	/**
	 * A private post owned by another user. Unlike a draft, it has a slug, so
	 * it is addressable by URL.
	 *
	 * @var int
	 */
	private int $restricted_private_post_id;

	/**
	 * A published post owned by the Author.
	 *
	 * @var int
	 */
	private int $own_post_id;

	/**
	 * The Author's user ID.
	 *
	 * @var int
	 */
	private int $author_user_id;

	/**
	 * Number of upstream API requests the mock has served.
	 *
	 * @var int
	 */
	private int $upstream_calls = 0;

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

		( new REST_API_Controller( new Parsely() ) )->init();
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'rest_api_init' );

		$other_user_id        = TestCase::create_test_user( 'stats_other_user', 'administrator' );
		$this->author_user_id = TestCase::create_test_user( 'stats_author', 'author' );

		$this->restricted_post_id = $this->create_post(
			array(
				'post_author'   => $other_user_id,
				'post_status'   => 'draft',
				'post_title'    => 'Title ' . self::RESTRICTED_MARKER,
				'post_content'  => 'Content ' . self::RESTRICTED_MARKER,
				'post_excerpt'  => 'Excerpt ' . self::RESTRICTED_MARKER,
				'post_password' => 'Password ' . self::RESTRICTED_MARKER,
			)
		);

		$this->restricted_private_post_id = $this->create_post(
			array(
				'post_author' => $other_user_id,
				'post_status' => 'private',
				'post_title'  => 'Private ' . self::RESTRICTED_MARKER,
			)
		);

		$this->own_post_id = $this->create_post(
			array(
				'post_author' => $this->author_user_id,
				'post_status' => 'publish',
				'post_title'  => 'Own post',
			)
		);

		wp_set_current_user( $this->author_user_id );
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
	 * Replaces the Parse.ly API call with a canned reply.
	 *
	 * Only the external call is replaced. Every local authorization decision
	 * still runs for real.
	 *
	 * @since 3.24.2
	 *
	 * @param bool $succeed Whether the upstream reply should be a successful one.
	 */
	private function mock_upstream( bool $succeed = true ): void {
		add_filter(
			'pre_http_request',
			function ( $preempt, $args, $url ) use ( $succeed ) {
				if ( false === strpos( (string) $url, 'api.parsely.com' ) ) {
					return $preempt;
				}

				++$this->upstream_calls;

				if ( ! $succeed ) {
					return array(
						'body'     => (string) wp_json_encode(
							array(
								'code'    => 403,
								'message' => 'Forbidden',
							)
						),
						'response' => array(
							'code'    => 403,
							'message' => 'Forbidden',
						),
					);
				}

				return array(
					'body'     => (string) wp_json_encode(
						array(
							'data' => array(
								array(
									'title'            => 'Upstream post',
									'url'              => 'https://example.com/upstream',
									'image_url'        => 'https://example.com/i.jpg',
									'thumb_url_medium' => 'https://example.com/t.jpg',
									'metrics'          => array(
										'views'           => 2158,
										'referrers_views' => 4,
									),
									'type'             => 'social',
									'name'             => 'facebook.com',
								),
							),
						)
					),
					'response' => array(
						'code'    => 200,
						'message' => 'OK',
					),
				);
			},
			10,
			3
		);
	}

	/**
	 * Returns the stored Parse.ly canonical URL of a post.
	 *
	 * @since 3.24.2
	 *
	 * @param int $post_id The post's ID.
	 * @return string The stored canonical URL, or an empty string.
	 */
	private function get_stored_canonical_url( int $post_id ): string {
		$value = get_post_meta( $post_id, '_parsely_canonical_url', true );

		return is_string( $value ) ? $value : '';
	}

	/**
	 * Replaces the Parse.ly API call with a reply naming the given post's URL.
	 *
	 * @since 3.24.2
	 *
	 * @param int $post_id The post whose URL the reply names.
	 */
	private function mock_upstream_naming_post( int $post_id ): void {
		$url       = (string) get_permalink( $post_id );
		$caller_id = get_current_user_id();

		// URLs only resolve to posts the user can see, so check as the author.
		wp_set_current_user( (int) get_post_field( 'post_author', $post_id ) );
		self::assertSame(
			$post_id,
			Utils::get_post_id_by_url( $url ),
			'Fixture is wrong: the URL does not resolve back to the post.'
		);
		wp_set_current_user( $caller_id );

		$this->mock_upstream_naming_url( $url );
	}

	/**
	 * Replaces the Parse.ly API call with a reply naming the given URL.
	 *
	 * @since 3.24.2
	 *
	 * @param string $url The URL the reply names.
	 */
	private function mock_upstream_naming_url( string $url ): void {
		add_filter(
			'pre_http_request',
			function ( $preempt, $args, $request_url ) use ( $url ) {
				if ( false === strpos( (string) $request_url, 'api.parsely.com' ) ) {
					return $preempt;
				}

				++$this->upstream_calls;

				return array(
					'body'     => (string) wp_json_encode(
						array(
							'data' => array(
								array(
									'title'   => 'Upstream post',
									'url'     => $url,
									'metrics' => array( 'views' => 10 ),
								),
							),
						)
					),
					'response' => array(
						'code'    => 200,
						'message' => 'OK',
					),
				);
			},
			10,
			3
		);
	}

	/**
	 * Provides the endpoint's route suffixes.
	 *
	 * @since 3.24.2
	 *
	 * @return array<string, array{string}> The route suffix.
	 */
	public function data_routes(): array {
		return array(
			'details'   => array( 'details' ),
			'referrers' => array( 'referrers' ),
			'related'   => array( 'related' ),
		);
	}

	/**
	 * Dispatches one of the endpoint's routes for the given post.
	 *
	 * @since 3.24.2
	 *
	 * @param string $suffix  The route suffix.
	 * @param int    $post_id The post ID to request.
	 * @return \WP_REST_Response The response object.
	 */
	private function dispatch( string $suffix, int $post_id ): \WP_REST_Response {
		return rest_get_server()->dispatch(
			new WP_REST_Request( 'GET', "/wp-parsely/v2/stats/post/$post_id/$suffix" )
		);
	}

	/**
	 * Verifies that an Author cannot read Parse.ly data for another user's
	 * draft, and that the response includes nothing about that draft.
	 *
	 * @since 3.24.2
	 *
	 * @dataProvider data_routes
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 *
	 * @param string $suffix The route suffix.
	 */
	public function test_route_denies_inaccessible_post( string $suffix ): void {
		$this->mock_upstream();

		$response = $this->dispatch( $suffix, $this->restricted_post_id );

		self::assertSame(
			rest_authorization_required_code(),
			$response->get_status(),
			"The $suffix route should deny a post the user cannot edit."
		);
		self::assertStringNotContainsString(
			self::RESTRICTED_MARKER,
			(string) wp_json_encode( $response->get_data() ),
			"The $suffix route included restricted post fields."
		);
		self::assertSame(
			0,
			$this->upstream_calls,
			"The $suffix route should be denied before calling the Parse.ly API."
		);
	}

	/**
	 * Verifies that the routes do not echo the request parameters back.
	 *
	 * The check runs as a user with access to the post, so no field of the post
	 * may appear in the response.
	 *
	 * @since 3.24.2
	 *
	 * @dataProvider data_routes
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::get_post_details
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::get_post_referrers
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::get_related_posts
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::get_request_post
	 *
	 * @param string $suffix The route suffix.
	 */
	public function test_route_does_not_echo_request_parameters( string $suffix ): void {
		$this->mock_upstream();
		$this->set_current_user_to_admin();

		$response = $this->dispatch( $suffix, $this->restricted_post_id );

		self::assertSame( 200, $response->get_status() );

		/** @var array<string, mixed> $data */
		$data = $response->get_data();

		self::assertArrayNotHasKey(
			'params',
			$data,
			"The $suffix route echoed the request parameters."
		);
		self::assertArrayHasKey( 'data', $data, "The $suffix route should return a data key." );
		self::assertStringNotContainsString(
			self::RESTRICTED_MARKER,
			(string) wp_json_encode( $data ),
			"The $suffix route included post fields for an authorized caller."
		);
	}

	/**
	 * Verifies that the routes still serve a post the user can edit.
	 *
	 * Guards against the authorization check being too restrictive.
	 *
	 * @since 3.24.2
	 *
	 * @dataProvider data_routes
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::get_post_details
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::get_post_referrers
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::get_related_posts
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::get_request_post
	 *
	 * @param string $suffix The route suffix.
	 */
	public function test_route_succeeds_on_own_post( string $suffix ): void {
		$this->mock_upstream();

		$response = $this->dispatch( $suffix, $this->own_post_id );

		self::assertSame(
			200,
			$response->get_status(),
			"The $suffix route should serve the user's own post."
		);
		self::assertSame(
			1,
			$this->upstream_calls,
			"The $suffix route should have called the Parse.ly API."
		);

		/** @var array<string, mixed> $data */
		$data = $response->get_data();
		self::assertArrayHasKey( 'data', $data );
		self::assertNotEmpty( $data['data'], "The $suffix route returned no data." );
	}

	/**
	 * Verifies that an unsuccessful upstream reply is reported as an error
	 * rather than served as a successful response.
	 *
	 * The related posts route used to put the error into its data and answer
	 * 200.
	 *
	 * @since 3.24.2
	 *
	 * @dataProvider data_routes
	 *
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::get_post_details
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::get_post_referrers
	 * @covers \Parsely\REST_API\Stats\Endpoint_Post::get_related_posts
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::get_request_post
	 *
	 * @param string $suffix The route suffix.
	 */
	public function test_route_reports_upstream_failure( string $suffix ): void {
		$this->mock_upstream( false );
		$this->set_current_user_to_admin();

		$response = $this->dispatch( $suffix, $this->restricted_post_id );

		self::assertNotSame(
			200,
			$response->get_status(),
			"The $suffix route answered 200 for a failed upstream request."
		);

		/** @var array<string, mixed> $data */
		$data = $response->get_data();
		self::assertArrayNotHasKey(
			'params',
			$data,
			"The $suffix route echoed the request parameters on an upstream failure."
		);
		self::assertStringNotContainsString(
			self::RESTRICTED_MARKER,
			(string) wp_json_encode( $data ),
			"The $suffix route included post fields on an upstream failure."
		);
	}

	/**
	 * Verifies that a Contributor, who lacks the endpoint-level capability, is
	 * denied even for their own post.
	 *
	 * @since 3.24.2
	 *
	 * @dataProvider data_routes
	 *
	 * @covers \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 *
	 * @param string $suffix The route suffix.
	 */
	public function test_route_denies_contributor( string $suffix ): void {
		$this->mock_upstream();

		$contributor_id = TestCase::create_test_user( 'stats_contributor', 'contributor' );
		$own_draft_id   = $this->create_post(
			array(
				'post_author' => $contributor_id,
				'post_status' => 'draft',
			)
		);

		wp_set_current_user( $contributor_id );

		self::assertSame(
			rest_authorization_required_code(),
			$this->dispatch( $suffix, $own_draft_id )->get_status(),
			"The $suffix route should deny a Contributor."
		);
	}

	/**
	 * Verifies that mapping Parse.ly results to posts does not store a
	 * canonical URL on posts the current user cannot edit.
	 *
	 * The URLs come from the upstream reply, so they can name any post.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Stats\Post_Data_Trait::extract_post_data
	 * @uses \Parsely\Parsely::get_canonical_url
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\Utils\Utils::get_post_id_by_url
	 */
	public function test_post_data_does_not_store_canonical_url_of_inaccessible_post(): void {
		$this->mock_upstream_naming_post( $this->restricted_private_post_id );

		$response = rest_get_server()->dispatch(
			new WP_REST_Request(
				'GET',
				"/wp-parsely/v2/stats/post/{$this->own_post_id}/details"
			)
		);

		self::assertSame( 200, $response->get_status() );
		self::assertSame(
			'',
			$this->get_stored_canonical_url( $this->restricted_private_post_id ),
			'A canonical URL was stored on a post the user cannot edit.'
		);
	}

	/**
	 * Verifies that the canonical URL is still stored for posts the current
	 * user can edit.
	 *
	 * Guards against the capability check disabling the URL mapping outright.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Stats\Post_Data_Trait::extract_post_data
	 * @uses \Parsely\Parsely::get_canonical_url
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 * @uses \Parsely\Utils\Utils::get_post_id_by_url
	 */
	public function test_post_data_stores_canonical_url_of_own_post(): void {
		$this->mock_upstream_naming_post( $this->own_post_id );

		$response = rest_get_server()->dispatch(
			new WP_REST_Request(
				'GET',
				"/wp-parsely/v2/stats/post/{$this->own_post_id}/details"
			)
		);

		self::assertSame( 200, $response->get_status() );
		self::assertNotSame(
			'',
			$this->get_stored_canonical_url( $this->own_post_id ),
			'The canonical URL should still be stored for the user\'s own post.'
		);
	}

	/**
	 * Verifies that the site-wide posts route does not store a canonical URL on
	 * a post the current user cannot edit.
	 *
	 * This route has no per-post gate, so the write's own capability check
	 * applies.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Stats\Post_Data_Trait::extract_post_data
	 * @uses \Parsely\Parsely::get_canonical_url
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Stats\Endpoint_Posts::get_posts
	 * @uses \Parsely\Utils\Utils::get_post_id_by_url
	 */
	public function test_posts_route_does_not_store_canonical_url_of_inaccessible_post(): void {
		$this->mock_upstream_naming_post( $this->restricted_private_post_id );

		$response = rest_get_server()->dispatch(
			new WP_REST_Request( 'GET', '/wp-parsely/v2/stats/posts' )
		);

		self::assertSame( 200, $response->get_status() );
		self::assertSame(
			'',
			$this->get_stored_canonical_url( $this->restricted_private_post_id ),
			'A canonical URL was stored on a post the user cannot edit.'
		);
	}

	/**
	 * Verifies that a foreign-host URL naming a local post's slug does not get
	 * stored as that post's canonical URL.
	 *
	 * `Utils::get_post_id_by_url()` matches slugs only on this site's URLs, so a
	 * URL on another host resolves to no post.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Stats\Post_Data_Trait::extract_post_data
	 * @uses \Parsely\Parsely::get_canonical_url
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Stats\Endpoint_Posts::get_posts
	 * @uses \Parsely\Utils\Utils::get_post_id_by_url
	 */
	public function test_posts_route_does_not_store_a_foreign_host_canonical_url(): void {
		$post = get_post( $this->restricted_private_post_id );
		self::assertInstanceOf( WP_Post::class, $post );

		$foreign_url = 'https://foreign.example/' . $post->post_name;

		$this->mock_upstream_naming_url( $foreign_url );

		rest_get_server()->dispatch( new WP_REST_Request( 'GET', '/wp-parsely/v2/stats/posts' ) );

		self::assertSame(
			'',
			$this->get_stored_canonical_url( $this->restricted_private_post_id ),
			'A foreign-host canonical URL was stored on the post.'
		);
	}
}

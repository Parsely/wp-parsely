<?php
/**
 * Integration tests asserting that REST validation callbacks do not write to
 * the database, and that the Smart Link ones do not read from it.
 *
 * WordPress runs an endpoint's argument `validate_callback`s in
 * `WP_REST_Server::dispatch()`, before `respond_to_request()` invokes the
 * `permission_callback`. Validation callbacks must therefore have no side
 * effects.
 *
 * @package Parsely
 * @since   3.24.2
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI;

use Parsely\Content_Helper\Editor_Sidebar;
use Parsely\Content_Helper\Editor_Sidebar\Smart_Linking;
use Parsely\Models\Inbound_Smart_Link;
use Parsely\Models\Smart_Link;
use Parsely\Parsely;
use Parsely\Permissions;
use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking;
use Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost;
use Parsely\REST_API\REST_API_Controller;
use Parsely\Tests\Integration\TestCase;
use WP_REST_Request;
use WP_REST_Response;

/**
 * Integration tests asserting that REST validation callbacks do not write to
 * the database, and that the Smart Link ones do not read from it.
 *
 * @since 3.24.2
 *
 * @covers \Parsely\Models\Smart_Link::set_href
 */
class ValidationSideEffectsTest extends TestCase {
	/**
	 * The Parse.ly canonical URL post meta key.
	 */
	private const CANONICAL_URL_META_KEY = '_parsely_canonical_url';

	/**
	 * The Smart Linking endpoint.
	 *
	 * @var Endpoint_Smart_Linking
	 */
	private Endpoint_Smart_Linking $endpoint;

	/**
	 * A private post owned by another user.
	 *
	 * @var int
	 */
	private int $restricted_post_id;

	/**
	 * A published post owned by another user.
	 *
	 * @var int
	 */
	private int $other_users_post_id;

	/**
	 * Sets up the test environment.
	 *
	 * @since 3.24.2
	 */
	public function set_up(): void {
		parent::set_up();

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

		$parsely        = new Parsely();
		$this->endpoint = new Endpoint_Smart_Linking( new Content_Helper_Controller( $parsely ) );

		// Register the parsely_smart_link post type and its taxonomies, so that
		// any write would persist and be detected.
		( new Smart_Linking( new Editor_Sidebar( $parsely ) ) )->run();

		( new REST_API_Controller( $parsely ) )->init();
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		do_action( 'rest_api_init' );

		$other_user_id = TestCase::create_test_user( 'vse_other_user', 'administrator' );

		$this->restricted_post_id = $this->create_post(
			array(
				'post_author' => $other_user_id,
				'post_status' => 'private',
				'post_title'  => 'Restricted by other',
			)
		);

		$this->other_users_post_id = $this->create_post(
			array(
				'post_author' => $other_user_id,
				'post_status' => 'publish',
				'post_title'  => 'Published by other',
			)
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
	 * Returns the stored Parse.ly canonical URL of a post.
	 *
	 * @since 3.24.2
	 *
	 * @param int $post_id The post's ID.
	 * @return string The stored canonical URL, or an empty string.
	 */
	private function get_stored_canonical_url( int $post_id ): string {
		$value = get_post_meta( $post_id, self::CANONICAL_URL_META_KEY, true );

		return is_string( $value ) ? $value : '';
	}

	/**
	 * Returns a Smart Link payload pointing at the given post.
	 *
	 * @since 3.24.2
	 *
	 * @param int $post_id The post to link to.
	 * @return array<string, mixed> The link parameters.
	 */
	private function get_link_params( int $post_id ): array {
		return array(
			'uid'    => 'vse-' . $post_id,
			'href'   => array( 'raw' => (string) get_permalink( $post_id ) ),
			'title'  => 'Link title',
			'text'   => 'anchor text',
			'offset' => 0,
		);
	}

	/**
	 * Verifies that validating a Smart Link payload does not store a canonical
	 * URL on the post the link points at.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::validate_smart_link_params
	 * @uses \Parsely\Models\Smart_Link::is_valid_href
	 */
	public function test_validating_a_smart_link_does_not_write_post_meta(): void {
		$request = new WP_REST_Request( 'POST' );
		$request->set_param( 'post_id', $this->other_users_post_id );

		self::assertTrue(
			$this->endpoint->validate_smart_link_params(
				$this->get_link_params( $this->restricted_post_id ),
				$request
			),
			'Fixture is wrong: the payload should validate.'
		);

		self::assertSame(
			'',
			$this->get_stored_canonical_url( $this->restricted_post_id ),
			'Validation stored a canonical URL on the linked post.'
		);
	}

	/**
	 * Verifies that a rejected request writes nothing, including when the
	 * caller is not logged in.
	 *
	 * Dispatches through the REST server so the real callback order applies.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::validate_smart_link_params
	 * @uses \Parsely\Models\Smart_Link::is_valid_href
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 */
	public function test_denied_request_writes_no_post_meta(): void {
		wp_set_current_user( 0 );

		$request = new WP_REST_Request(
			'POST',
			"/wp-parsely/v2/content-helper/smart-linking/{$this->other_users_post_id}/add"
		);
		$request->set_param( 'link', $this->get_link_params( $this->restricted_post_id ) );

		$response = rest_get_server()->dispatch( $request );

		self::assertGreaterThanOrEqual(
			400,
			$response->get_status(),
			'A logged-out request should be denied.'
		);
		self::assertSame(
			'',
			$this->get_stored_canonical_url( $this->restricted_post_id ),
			'A denied request stored a canonical URL on the linked post.'
		);
	}

	/**
	 * Verifies that the destination post is still resolved from the href, that
	 * no canonical URL is stored on it, and that the canonical URL the UI
	 * receives is unchanged.
	 *
	 * `get_canonical_url_from_post()` falls back to the permalink when no meta
	 * is stored, so dropping the write leaves the serialized value the same.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\Models\Smart_Link::set_href
	 * @uses \Parsely\Parsely::get_canonical_url
	 * @uses \Parsely\Parsely::get_canonical_url_from_post
	 * @uses \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::add_smart_link
	 * @uses \Parsely\Utils\Utils::get_post_id_by_url
	 */
	public function test_destination_post_is_still_resolved(): void {
		$this->set_current_user_to_admin();

		$request = new WP_REST_Request(
			'POST',
			"/wp-parsely/v2/content-helper/smart-linking/{$this->other_users_post_id}/add"
		);
		$request->set_param( 'link', $this->get_link_params( $this->other_users_post_id ) );

		$response = rest_get_server()->dispatch( $request );

		self::assertSame( 200, $response->get_status(), 'Fixture is wrong: the Smart Link should be added.' );

		/** @var array{data: array{destination: array{post_id: int, canonical_url: string}}} $data */
		$data = json_decode( (string) wp_json_encode( $response->get_data() ), true );

		self::assertSame(
			$this->other_users_post_id,
			$data['data']['destination']['post_id'],
			'The destination post should still be resolved from the href.'
		);
		self::assertSame(
			'',
			$this->get_stored_canonical_url( $this->other_users_post_id ),
			'Adding the Smart Link stored a canonical URL on the linked post.'
		);
		self::assertSame(
			Parsely::get_canonical_url( (string) get_permalink( $this->other_users_post_id ) ),
			$data['data']['destination']['canonical_url'],
			'The canonical URL the UI receives should be unchanged.'
		);
	}

	/**
	 * Verifies that validating Smart Link parameters runs no database queries,
	 * and leaves the request unchanged.
	 *
	 * @since 3.26.1
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::validate_multiple_smart_links
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::validate_smart_link_params
	 * @uses \Parsely\Models\Smart_Link::is_valid_href
	 */
	public function test_validating_smart_links_runs_no_queries(): void {
		global $wpdb;

		$request = new WP_REST_Request( 'POST' );
		$request->set_param( 'post_id', $this->other_users_post_id );

		$links = array(
			$this->get_link_params( $this->restricted_post_id ),
			$this->get_link_params( $this->other_users_post_id ),
		);

		$query_count = $wpdb->num_queries;

		self::assertTrue(
			$this->endpoint->validate_smart_link_params( $links[0], $request ),
			'Fixture is wrong: the payload should validate.'
		);
		self::assertTrue(
			$this->endpoint->validate_multiple_smart_links( $links, $request ),
			'Fixture is wrong: the payloads should validate.'
		);

		self::assertSame( $query_count, $wpdb->num_queries, 'Validation ran database queries.' );
		self::assertSame(
			array( 'post_id' => $this->other_users_post_id ),
			$request->get_params(),
			'Validation changed the request.'
		);
	}

	/**
	 * Verifies that validating a Smart Link ID only checks its type, and runs
	 * no database queries.
	 *
	 * @since 3.26.1
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::validate_smart_link_id
	 */
	public function test_validating_a_smart_link_id_runs_no_queries(): void {
		global $wpdb;

		$endpoint      = new Endpoint_Traffic_Boost( new Content_Helper_Controller( new Parsely() ) );
		$smart_link_id = $this->store_smart_link();

		$request = new WP_REST_Request( 'POST' );
		$request->set_param( 'post_id', $this->restricted_post_id );

		$query_count = $wpdb->num_queries;

		self::assertTrue( $endpoint->validate_smart_link_id( $smart_link_id, $request ) );
		self::assertTrue( $endpoint->validate_smart_link_id( $smart_link_id + 1000, $request ) );
		self::assertSame( $query_count, $wpdb->num_queries, 'Validation ran database queries.' );
	}

	/**
	 * Provides the Traffic Boost routes that take a Smart Link ID.
	 *
	 * @since 3.26.1
	 *
	 * @return array<string, array{string, string}> The HTTP method and action of each route, keyed by action.
	 */
	public static function data_smart_link_id_routes(): array {
		return array(
			'accept-suggestion'  => array( 'POST', 'accept-suggestion' ),
			'discard-suggestion' => array( 'DELETE', 'discard-suggestion' ),
			'delete-inbound'     => array( 'DELETE', 'delete-inbound' ),
			'update-inbound'     => array( 'POST', 'update-inbound' ),
		);
	}

	/**
	 * Verifies that the routes validate a request without looking up its Smart
	 * Link.
	 *
	 * @since 3.26.1
	 *
	 * @dataProvider data_smart_link_id_routes
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::validate_smart_link_id
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 *
	 * @param string $method The HTTP method.
	 * @param string $action The route's action.
	 */
	public function test_routes_validate_without_looking_up_the_smart_link( string $method, string $action ): void {
		$smart_link_id = $this->store_smart_link();

		wp_set_current_user( 0 );

		$responses = array(
			'Smart Link to the post'     => $this->dispatch_smart_link_id_route( $method, $action, $this->other_users_post_id, $smart_link_id ),
			'Smart Link to another post' => $this->dispatch_smart_link_id_route( $method, $action, $this->restricted_post_id, $smart_link_id ),
			'missing Smart Link'         => $this->dispatch_smart_link_id_route( $method, $action, $this->other_users_post_id, $smart_link_id + 1000 ),
		);

		foreach ( $responses as $case => $response ) {
			/** @var array{code?: string} $data */
			$data = $response->get_data();

			self::assertSame(
				array( 403, 'ch_access_to_feature_disabled' ),
				array( $response->get_status(), $data['code'] ?? '' ),
				"Unexpected response for a $case."
			);
		}
	}

	/**
	 * Verifies that a Smart Link that doesn't exist, or doesn't link to the
	 * post, gets a 404 error.
	 *
	 * @since 3.26.1
	 *
	 * @dataProvider data_smart_link_id_routes
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::get_request_inbound_link
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 *
	 * @param string $method The HTTP method.
	 * @param string $action The route's action.
	 */
	public function test_smart_link_is_not_found_unless_it_links_to_the_post( string $method, string $action ): void {
		$smart_link_id = $this->store_smart_link();

		$this->set_current_user_to_admin();

		$responses = array(
			'parsely_invalid_smart_link'   => $this->dispatch_smart_link_id_route( $method, $action, $this->restricted_post_id, $smart_link_id ),
			'parsely_smart_link_not_found' => $this->dispatch_smart_link_id_route( $method, $action, $this->other_users_post_id, $smart_link_id + 1000 ),
		);

		foreach ( $responses as $code => $response ) {
			/** @var array{code?: string} $data */
			$data = $response->get_data();

			self::assertSame( array( 404, $code ), array( $response->get_status(), $data['code'] ?? '' ) );
		}
	}

	/**
	 * Stores a Smart Link from the restricted post to the other user's
	 * published post.
	 *
	 * @since 3.26.1
	 *
	 * @return int The Smart Link's ID.
	 */
	private function store_smart_link(): int {
		$link = new Smart_Link(
			(string) get_permalink( $this->other_users_post_id ),
			'Link title',
			'anchor text',
			0,
			$this->restricted_post_id
		);
		$link->set_destination_post_id( $this->other_users_post_id );

		self::assertTrue( $link->save(), 'Fixture is wrong: the Smart Link was not stored.' );

		/** @var array{smart_link_id: int} $link_data */
		$link_data     = $link->to_array();
		$smart_link_id = $link_data['smart_link_id'];

		$stored_link = Inbound_Smart_Link::get_smart_link_by_id( $smart_link_id );
		self::assertInstanceOf( Inbound_Smart_Link::class, $stored_link );
		self::assertSame(
			$this->other_users_post_id,
			$stored_link->destination_post_id,
			'Fixture is wrong: the Smart Link does not link to the other user\'s post.'
		);

		return $smart_link_id;
	}

	/**
	 * Dispatches a request to a Traffic Boost route that takes a Smart Link ID.
	 *
	 * @since 3.26.1
	 *
	 * @param string $method        The HTTP method.
	 * @param string $action        The route's action.
	 * @param int    $post_id       The post ID.
	 * @param int    $smart_link_id The Smart Link ID.
	 * @return WP_REST_Response The response.
	 */
	private function dispatch_smart_link_id_route( string $method, string $action, int $post_id, int $smart_link_id ): WP_REST_Response {
		return rest_get_server()->dispatch(
			new WP_REST_Request(
				$method,
				"/wp-parsely/v2/content-helper/traffic-boost/{$post_id}/{$action}/{$smart_link_id}"
			)
		);
	}

	/**
	 * Returns a fingerprint of every posts and postmeta row.
	 *
	 * @since 3.24.2
	 *
	 * @return string The fingerprint.
	 */
	private function get_content_fingerprint(): string {
		global $wpdb;

		// phpcs:disable WordPress.DB.DirectDatabaseQuery
		$rows = array(
			$wpdb->get_results(
				"SELECT ID, post_content, post_title, post_status FROM {$wpdb->posts} ORDER BY ID",
				ARRAY_A
			),
			$wpdb->get_results(
				"SELECT meta_id, post_id, meta_key, meta_value FROM {$wpdb->postmeta} ORDER BY meta_id",
				ARRAY_A
			),
		);
		// phpcs:enable WordPress.DB.DirectDatabaseQuery

		return hash( 'sha256', (string) wp_json_encode( $rows ) );
	}

	/**
	 * Returns every registered plugin route that takes a post ID, as a
	 * dispatchable path paired with one of its methods.
	 *
	 * Route placeholders are filled with real IDs so that validation runs
	 * instead of the route failing to match.
	 *
	 * @since 3.24.2
	 *
	 * @return array<string, array{string, string}> Method and path, keyed by route.
	 */
	private function get_dispatchable_post_id_routes(): array {
		$requests = array();

		foreach ( rest_get_server()->get_routes() as $route => $handlers ) {
			if (
				0 !== strpos( $route, '/wp-parsely/' ) ||
				false === strpos( $route, '(?P<post_id>' )
			) {
				continue;
			}

			$path = (string) preg_replace(
				array( '#\(\?P<post_id>[^)]*\)#', '#\(\?P<[a-z_]+>[^)]*\)#' ),
				array( (string) $this->restricted_post_id, (string) $this->other_users_post_id ),
				$route
			);

			/** @var array<array{methods?: array<string, bool>}> $handlers */
			$methods = array_keys( $handlers[0]['methods'] ?? array( 'GET' => true ) );

			$requests[ $route ] = array( $methods[0] ?? 'GET', $path );
		}

		return $requests;
	}

	/**
	 * Verifies that dispatching every post ID route while logged out leaves all
	 * post content and post meta untouched.
	 *
	 * A validation callback can write indirectly, for example through a model's
	 * setter, so this asserts the outcome rather than inspecting the callbacks.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::validate_multiple_smart_links
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking::validate_smart_link_params
	 * @covers \Parsely\REST_API\Content_Helper\Endpoint_Traffic_Boost::validate_smart_link_id
	 * @uses \Parsely\Models\Smart_Link::is_valid_href
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::can_access_request_post
	 * @uses \Parsely\REST_API\Use_Post_ID_Parameter_Trait::validate_post_id
	 */
	public function test_no_post_id_route_writes_content_when_logged_out(): void {
		wp_set_current_user( 0 );

		$routes = $this->get_dispatchable_post_id_routes();

		self::assertNotCount( 0, $routes, 'No post ID routes were found. The fixture is wrong.' );

		$link_params = $this->get_link_params( $this->restricted_post_id );
		$before      = $this->get_content_fingerprint();

		foreach ( $routes as $route => $request_spec ) {
			list( $method, $path ) = $request_spec;

			$request = new WP_REST_Request( $method, $path );

			// Payloads that reach the Smart Link validation callbacks.
			$request->set_param( 'link', $link_params );
			$request->set_param( 'links', array( $link_params ) );

			$response = rest_get_server()->dispatch( $request );

			// A 404 would mean the path never matched, so validation never ran
			// and this route would be checked vacuously.
			self::assertNotSame(
				404,
				$response->get_status(),
				"The route $route was not matched, so it was not exercised."
			);
			self::assertGreaterThanOrEqual(
				400,
				$response->get_status(),
				"The route $route should deny a logged-out request."
			);
			self::assertSame(
				$before,
				$this->get_content_fingerprint(),
				"The route $route wrote to posts or post meta for a logged-out request."
			);
		}
	}
}

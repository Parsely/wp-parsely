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

		wp_set_current_user( $author_user_id );
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
}

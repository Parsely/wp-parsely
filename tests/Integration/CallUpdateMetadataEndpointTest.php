<?php
/**
 * Integration Tests: Calls to Parse.ly's Update Metadata Endpoint
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Endpoints;

use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration Tests for calls to Parse.ly's Update Metadata Endpoint.
 */
final class CallUpdateMetadataEndpointTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Parsely $parsely Holds the Parsely object.
	 */
	private static $parsely;

	/**
	 * Setup method called before each test.
	 */
	public function set_up(): void {
		parent::set_up();

		self::set_options( array( 'metadata_secret' => 'test' ) );

		self::$parsely = new Parsely();
	}

	/**
	 * Verifies that the endpoint is not being called when credentials are
	 * insufficient.
	 *
	 * @since 3.18.0
	 *
	 * @covers \Parsely\Parsely::call_update_metadata_endpoint
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 *
	 * @param array<string, string> $options The options to set.
	 *
	 * @dataProvider provide_data_for_test_endpoint_is_not_being_called_when_credentials_are_insufficient
	 */
	public function test_endpoint_is_not_being_called_when_credentials_are_insufficient( array $options ): void {
		self::set_options( $options );

		/** @var int $post_id */
		$post_id = self::factory()->post->create();

		self::assertFalse( self::$parsely->call_update_metadata_endpoint( $post_id ) );
	}

	/**
	 * Provides data for test_endpoint_is_not_being_called_when_credentials_are_insufficient().
	 *
	 * @since 3.18.0
	 *
	 * @return array<string, array<array<string, string>>>
	 */
	public function provide_data_for_test_endpoint_is_not_being_called_when_credentials_are_insufficient(): array {
		return array(
			'no Site ID and Metadata Secret' => array(
				'options' => array(
					'apikey'          => '',
					'metadata_secret' => '',
				),
			),
			'no Site ID'                     => array(
				'options' => array(
					'apikey'          => '',
					'metadata_secret' => 'test',
				),
			),
			'no Metadata Secret'             => array(
				'options' => array(
					'apikey'          => 'test',
					'metadata_secret' => '',
				),
			),
		);
	}

	/**
	 * Verifies that endpoint calls work as expected with default post types.
	 *
	 * @since 3.18.0
	 *
	 * @covers \Parsely\Parsely::call_update_metadata_endpoint
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_trackable_statuses
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 *
	 * @param string $post_type The post type to create and test against.
	 * @param bool   $expected  Whether the endpoint should be called.
	 *
	 * @dataProvider provide_data_for_test_updates_metadata_endpoint_calls_work_as_expected_with_default_post_types
	 */
	public function test_endpoint_calls_work_as_expected_with_default_post_types( string $post_type, bool $expected ): void {
		/** @var int $post_id */
		$post_id = self::factory()->post->create( array( 'post_type' => $post_type ) );

		self::assertSame( $expected, self::$parsely->call_update_metadata_endpoint( $post_id ) );
	}

	/**
	 * Provides data for test_updates_metadata_endpoint_calls_work_as_expected_with_default_post_types().
	 *
	 * @since 3.18.0
	 *
	 * @return array<string, array<mixed>>
	 */
	public function provide_data_for_test_updates_metadata_endpoint_calls_work_as_expected_with_default_post_types(): array {
		return array(
			'"post" type'       => array(
				'post_type' => 'post',
				'expected'  => true,
			),
			'"page" type'       => array(
				'post_type' => 'page',
				'expected'  => true,
			),
			'"attachment" type' => array(
				'post_type' => 'attachment',
				'expected'  => false,
			),
			'"revision" type'   => array(
				'post_type' => 'revision',
				'expected'  => false,
			),
		);
	}

	/**
	 * Verifies that the endpoint isn't being called when the ID of a
	 * nonexistent post gets passed to the function.
	 *
	 * @since 3.18.0
	 *
	 * @covers \Parsely\Parsely::call_update_metadata_endpoint
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_endpoint_is_not_being_called_when_post_does_not_exist(): void {
		self::assertFalse( self::$parsely->call_update_metadata_endpoint( 0 ) );
	}

	/**
	 * Verifies that endpoint calls work as expected with custom post types.
	 *
	 * @since 3.18.0
	 *
	 * @covers \Parsely\Parsely::call_update_metadata_endpoint
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_trackable_statuses
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_endpoint_calls_work_as_expected_with_custom_post_types(): void {
		register_post_type( 'test_cpt', array( 'public' => true ) );

		/** @var int $post_id */
		$post_id = self::factory()->post->create( array( 'post_type' => 'test_cpt' ) );

		self::assertFalse( self::$parsely->call_update_metadata_endpoint( $post_id ) );

		// Add the custom post type to the list of tracked post types.
		self::set_options(
			array(
				'metadata_secret'  => 'test',
				'track_post_types' => array( 'test_cpt' ),
			)
		);

		self::assertTrue( self::$parsely->call_update_metadata_endpoint( $post_id ) );
	}

	/**
	 * Verifies that endpoint calls work as expected for posts with trackable
	 * and non-trackable post statuses.
	 *
	 * @since 3.18.0
	 *
	 * @covers \Parsely\Parsely::call_update_metadata_endpoint
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_trackable_statuses
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_endpoint_calls_work_as_expected_with_post_statuses(): void {
		/** @var int $post_id */
		$post_id = self::factory()->post->create( array( 'post_status' => 'draft' ) );

		self::assertFalse( self::$parsely->call_update_metadata_endpoint( $post_id ) );

		// Update to a trackable post status.
		wp_update_post(
			array(
				'ID'          => $post_id,
				'post_status' => 'publish',
			)
		);

		self::assertTrue( self::$parsely->call_update_metadata_endpoint( $post_id ) );
	}

	/**
	 * Verifies that endpoint calls work as expected for posts with custom post
	 * statuses.
	 *
	 * @since 3.18.0
	 *
	 * @covers \Parsely\Parsely::call_update_metadata_endpoint
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_trackable_statuses
	 * @uses \Parsely\Parsely::post_has_trackable_status
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Content_API\Content_API_Service::get_base_url
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 */
	public function test_endpoint_calls_work_as_expected_with_custom_post_statuses(): void {
		/** @var int $post_id */
		$post_id = self::factory()->post->create( array( 'post_status' => 'active' ) );

		self::assertFalse( self::$parsely->call_update_metadata_endpoint( $post_id ) );

		// Add the "active" status to the list of trackable statuses.
		add_filter(
			'wp_parsely_trackable_statuses',
			// phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter
			function ( $statuses, $post ) {
				$statuses[] = 'active';

				return $statuses;
			},
			10,
			2
		);

		self::assertTrue( self::$parsely->call_update_metadata_endpoint( $post_id ) );
	}
}

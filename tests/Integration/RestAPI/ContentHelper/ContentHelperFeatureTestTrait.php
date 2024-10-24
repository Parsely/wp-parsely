<?php
/**
 * Trait for testing the Content Helper API feature.
 *
 * @package Parsely
 * @since   3.17.0
 */

namespace Parsely\Tests\Integration\RestAPI\ContentHelper;

use Parsely\Permissions;
use Parsely\REST_API\Base_Endpoint;
use Parsely\Tests\Integration\TestCase;
use WP_Error;
use WP_REST_Request;

/**
 * Trait for testing the Content Helper API feature.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature
 */
trait ContentHelperFeatureTestTrait {
	/**
	 * Tests that the endpoint is available to the current user.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_is_available_to_current_user_returns_true_if_feature_enabled(): void {
		$this->enable_feature();
		$this->set_current_user_to_admin();

		// Assert that the endpoint is available to the current user.
		self::assertTrue( $this->get_endpoint()->is_available_to_current_user( new WP_REST_Request() ) );
	}

	/**
	 * Tests that the endpoint is not available to the current user.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_is_available_to_current_user_returns_error_if_feature_disabled(): void {
		$this->disable_feature();
		$this->set_current_user_to_admin();

		// Assert that the endpoint is not available to the current user.
		self::assertInstanceOf( WP_Error::class, $this->get_endpoint()->is_available_to_current_user( new WP_REST_Request() ) );
	}

	/**
	 * Tests that the endpoint is available to the current user, since the user has the required role.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_is_available_to_current_user_returns_true_if_has_permissions(): void {
		$this->set_feature_options(
			array(
				'enabled'            => true,
				'allowed_user_roles' => array( 'administrator' ),
			)
		);

		// Assert that the endpoint is available to the current user.
		$this->set_current_user_to_admin();
		self::assertTrue( $this->get_endpoint()->is_available_to_current_user( new WP_REST_Request() ) );

		// Assert that the endpoint is not available to the current user.
		$this->set_current_user_to_contributor();
		self::assertInstanceOf( WP_Error::class, $this->get_endpoint()->is_available_to_current_user( new WP_REST_Request() ) );
	}

	/**
	 * Tests that the endpoint is not available to the current user, since the user does not have the
	 * required role.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_is_available_to_current_user_returns_error_if_no_permissions(): void {
		$this->set_current_user_to_contributor();

		$this->set_feature_options(
			array(
				'enabled'            => true,
				'allowed_user_roles' => array( 'administrator' ),
			)
		);

		// Assert that the endpoint is not available to the current user.
		self::assertInstanceOf( WP_Error::class, $this->get_endpoint()->is_available_to_current_user( new WP_REST_Request() ) );
	}


	/**
	 * Tests that the endpoint is not available to the current user, since the user is not logged in.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Feature::is_available_to_current_user
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::get_parsely
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::apply_capability_filters
	 * @uses \Parsely\REST_API\Base_Endpoint::get_default_access_capability
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\REST_API\Base_Endpoint::is_available_to_current_user
	 * @uses \Parsely\REST_API\Base_Endpoint::validate_site_id_and_secret
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_is_available_to_current_user_returns_error_if_no_user(): void {
		$this->enable_feature();
		// Set the current user to a non-logged in user.
		wp_set_current_user( 0 );

		// Assert that the endpoint is not available to the current user.
		self::assertInstanceOf( WP_Error::class, $this->get_endpoint()->is_available_to_current_user( new WP_REST_Request() ) );
	}

	/**
	 * You need to implement this method in your test class
	 * to return the endpoint instance being tested.
	 *
	 * @since 3.17.0
	 *
	 * @return Base_Endpoint
	 */
	abstract protected function get_endpoint(): Base_Endpoint;

	/**
	 * Sets the specific feature options.
	 *
	 * @since 3.17.0
	 *
	 * @param array<mixed> $options The options to set.
	 */
	private function set_feature_options( array $options ): void {
		$feature_name = $this->get_endpoint()->get_pch_feature_name();

		TestCase::set_options(
			array(
				'apikey'         => 'test',
				'api_secret'     => 'test',
				'content_helper' => array(
					'ai_features_enabled' => true,
					$feature_name         => $options,
				),
			)
		);
	}

	/**
	 * Disables the specific feature.
	 *
	 * @since 3.17.0
	 */
	private function disable_feature(): void {
		$this->set_feature_options(
			array(
				'enabled'            => false,
				'allowed_user_roles' => array(),
			)
		);
	}

	/**
	 * Enables the specific feature.
	 *
	 * @since 3.17.0
	 */
	private function enable_feature(): void {
		$valid_roles = array_keys( Permissions::get_user_roles_with_edit_posts_cap() );

		$this->set_feature_options(
			array(
				'enabled'            => true,
				'allowed_user_roles' => $valid_roles,
			)
		);
	}

	/**
	 * Sets the current user to an administrator.
	 *
	 * @since 3.17.0
	 */
	abstract protected function set_current_user_to_admin(): void;

	/**
	 * Sets the current user to a contributor.
	 *
	 * @since 3.17.0
	 */
	abstract protected function set_current_user_to_contributor(): void;
}

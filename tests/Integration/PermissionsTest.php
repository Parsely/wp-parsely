<?php
/**
 * Integration Tests: Permissions class
 *
 * @package Parsely\Tests
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\Permissions;

/**
 * Integration Tests for the Permissions class.
 *
 * @since 3.17.0
 *
 * @phpstan-import-type Parsely_Options_Content_Helper from Parsely
 */
final class PermissionsTest extends TestCase {
	/**
	 * Default User Roles that have the edit_posts capability, in the form
	 * returned by Permissions::get_user_roles_with_edit_posts_cap().
	 *
	 * @since 3.17.0
	 * @var array<string, string> $default_edit_posts_caps_array
	 */
	private $default_edit_posts_caps_array = array(
		'administrator' => 'Administrator',
		'editor'        => 'Editor',
		'author'        => 'Author',
		'contributor'   => 'Contributor',
	);

	/**
	 * The Content Helper features to be tested by this integration test.
	 *
	 * @since 3.17.0
	 * @var array<int, string> $features_to_test
	 */
	private $features_to_test = array(
		'excerpt_suggestions',
		'smart_linking',
		'title_suggestions',
	);

	/**
	 * Setup method called before each test.
	 *
	 * @since 3.17.0
	 */
	public function set_up(): void {
		parent::set_up();

		$this->set_current_user_to_admin();
	}

	/**
	 * Verifies that get_user_roles_with_edit_posts_cap() returns the expected
	 * results.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 */
	public function test_get_user_roles_with_edit_posts_capability(): void {
		self::assertSame(
			$this->default_edit_posts_caps_array,
			Permissions::get_user_roles_with_edit_posts_cap()
		);
	}

	/**
	 * Verifies that get_user_roles_with_edit_posts_cap() returns the expected
	 * results when a custom User Role exists.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 */
	public function test_get_custom_user_roles_with_edit_posts_capability(): void {
		global $wp_roles;

		// Test custom User Role with edit_posts capability.
		$wp_roles->add_role( 'test_role', 'Test Role', array( 'edit_posts' => true ) );
		self::assertSame(
			array_merge(
				$this->default_edit_posts_caps_array,
				array( 'test_role' => 'Test Role' )
			),
			Permissions::get_user_roles_with_edit_posts_cap()
		);

		// Test custom User Role without edit_posts capability.
		$wp_roles->remove_cap( 'test_role', 'edit_posts' );
		self::assertSame(
			$this->default_edit_posts_caps_array,
			Permissions::get_user_roles_with_edit_posts_cap()
		);

		// Cleanup.
		$wp_roles->remove_role( 'test_role' );
	}

	/**
	 * Verifies that permissions are correct when an allowed User Role tries to
	 * access enabled Content Helper features.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 */
	public function test_allowed_user_role_attempts_to_access_enabled_pch_features(): void {
		$user_allowed = Permissions::build_pch_permissions_settings_array(
			true,
			array( 'administrator' )
		);

		foreach ( $this->features_to_test as $feature ) {
			self::assertTrue(
				Permissions::current_user_can_use_pch_feature(
					$feature,
					$user_allowed
				)
			);

			$this->assert_current_user_access_to_pch_feature_with_filter(
				$feature,
				$user_allowed
			);

			$this->assert_current_user_access_to_pch_feature_with_unset_options(
				$feature,
				$user_allowed
			);
		}
	}

	/**
	 * Verifies that permissions are correct when a disallowed User Role tries
	 * to access enabled Content Helper features.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 */
	public function test_disallowed_user_role_attempts_to_access_enabled_pch_features(): void {
		$user_disallowed = Permissions::build_pch_permissions_settings_array(
			true,
			array( 'editor' )
		);

		foreach ( $this->features_to_test as $feature ) {
			self::assertFalse(
				Permissions::current_user_can_use_pch_feature(
					$feature,
					$user_disallowed
				)
			);

			$this->assert_current_user_access_to_pch_feature_with_filter(
				$feature,
				$user_disallowed
			);

			$this->assert_current_user_access_to_pch_feature_with_unset_options(
				$feature,
				$user_disallowed
			);
		}
	}

	/**
	 * Verifies that permissions are correct when an allowed User Role tries to
	 * access disabled Content Helper features.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 */
	public function test_allowed_user_role_attempts_to_access_disabled_pch_features(): void {
		$features_disabled = Permissions::build_pch_permissions_settings_array(
			false,
			array( 'administrator' )
		);

		foreach ( $this->features_to_test as $feature ) {
			self::assertFalse(
				Permissions::current_user_can_use_pch_feature(
					$feature,
					$features_disabled
				)
			);

			$this->assert_current_user_access_to_pch_feature_with_filter(
				$feature,
				$features_disabled
			);

			$this->assert_current_user_access_to_pch_feature_with_unset_options(
				$feature,
				$features_disabled
			);
		}
	}

	/**
	 * Verifies that permissions are correct when a disallowed User Role tries
	 * to access disabled Content Helper features.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 */
	public function test_disallowed_user_role_attempts_to_access_disabled_pch_features(): void {
		$user_disallowed_features_disabled = Permissions::build_pch_permissions_settings_array(
			false,
			array( 'editor' )
		);

		foreach ( $this->features_to_test as $feature ) {
			self::assertFalse(
				Permissions::current_user_can_use_pch_feature(
					$feature,
					$user_disallowed_features_disabled
				)
			);

			$this->assert_current_user_access_to_pch_feature_with_filter(
				$feature,
				$user_disallowed_features_disabled
			);

			$this->assert_current_user_access_to_pch_feature_with_unset_options(
				$feature,
				$user_disallowed_features_disabled
			);
		}
	}

	/**
	 * Asserts whether the current user can use a Content Helper feature, depending
	 * on the value of the wp_parsely_current_user_can_use_pch_feature filter.
	 *
	 * @since 3.17.0
	 *
	 * @param string                         $feature The feature to check access for.
	 * @param Parsely_Options_Content_Helper $pch_options The passed options.
	 */
	public function assert_current_user_access_to_pch_feature_with_filter(
		string $feature,
		$pch_options
	): void {
		// Filter set to true.
		add_filter( 'wp_parsely_current_user_can_use_pch_feature', '__return_true' );
		self::assertTrue(
			Permissions::current_user_can_use_pch_feature(
				$feature,
				$pch_options
			)
		);
		remove_filter( 'wp_parsely_current_user_can_use_pch_feature', '__return_true' );

		// Filter set to false.
		add_filter( 'wp_parsely_current_user_can_use_pch_feature', '__return_false' );
		self::assertFalse(
			Permissions::current_user_can_use_pch_feature(
				$feature,
				$pch_options
			)
		);
		remove_filter( 'wp_parsely_current_user_can_use_pch_feature', '__return_false' );
	}

	/**
	 * Verifies that the result of current_user_can_use_pch_feature() is false,
	 * when an invalid feature name is passed.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Permissions::current_user_can_use_pch_feature
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 */
	public function test_current_user_attempts_to_access_pch_feature_with_invalid_feature_name(): void {
		$user_allowed = Permissions::build_pch_permissions_settings_array(
			true,
			array( 'administrator' )
		);

		self::assertFalse(
			Permissions::current_user_can_use_pch_feature(
				'invalid_feature',
				$user_allowed
			)
		);

		// Filter set to true.
		add_filter( 'wp_parsely_current_user_can_use_pch_feature', '__return_true' );
		self::assertFalse(
			Permissions::current_user_can_use_pch_feature(
				'invalid_feature',
				$user_allowed
			)
		);
		remove_filter( 'wp_parsely_current_user_can_use_pch_feature', '__return_true' );

		// Filter set to false.
		add_filter( 'wp_parsely_current_user_can_use_pch_feature', '__return_false' );
		self::assertFalse(
			Permissions::current_user_can_use_pch_feature(
				'invalid_feature',
				$user_allowed
			)
		);
		remove_filter( 'wp_parsely_current_user_can_use_pch_feature', '__return_false' );
	}

	/**
	 * Asserts the result of current_user_can_use_pch_feature(), when the
	 * options are unset.
	 *
	 * @since 3.17.0
	 *
	 * @param string                         $feature The feature to check access for.
	 * @param Parsely_Options_Content_Helper $pch_options The passed options.
	 */
	public function assert_current_user_access_to_pch_feature_with_unset_options(
		string $feature,
		$pch_options
	): void {
		unset( $pch_options[ $feature ] );

		self::assertFalse(
			Permissions::current_user_can_use_pch_feature(
				$feature,
				$pch_options // @phpstan-ignore-line
			)
		);

		// Filter set to true.
		add_filter( 'wp_parsely_current_user_can_use_pch_feature', '__return_true' );
		self::assertFalse(
			Permissions::current_user_can_use_pch_feature(
				$feature,
				$pch_options // @phpstan-ignore-line
			)
		);
		remove_filter( 'wp_parsely_current_user_can_use_pch_feature', '__return_true' );

		// Filter set to false.
		add_filter( 'wp_parsely_current_user_can_use_pch_feature', '__return_false' );
		self::assertFalse(
			Permissions::current_user_can_use_pch_feature(
				$feature,
				$pch_options // @phpstan-ignore-line
			)
		);
		remove_filter( 'wp_parsely_current_user_can_use_pch_feature', '__return_false' );
	}
}

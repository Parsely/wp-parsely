<?php
/**
 * Permissions Class
 *
 * @package Parsely
 * @since   3.16.0
 */

declare(strict_types=1);

namespace Parsely;

/**
 * Class implementing user/role permissions functionality.
 *
 * @since 3.16.0
 *
 * @phpstan-import-type Parsely_Options_Content_Helper from Parsely
 * @phpstan-import-type Parsely_Options_Content_Helper_Feature from Parsely
 */
class Permissions {
	/**
	 * Returns all user roles (custom roles included) that have the edit_posts
	 * capability.
	 *
	 * The return value is an associative array with role keys and names, e.g.
	 * `array( 'administrator' => 'Administrator', 'editor' => 'Editor' )`.
	 *
	 * @since 3.16.0
	 *
	 * @return array<string, string> The user roles having the edit_posts capability.
	 */
	public static function get_user_roles_with_edit_posts_cap(): array {
		$result = array();
		$roles  = wp_roles()->roles;

		foreach ( $roles as $key => $role ) {
			if ( isset( $role['capabilities']['edit_posts'] ) ) {
				$result[ $key ] = $role['name'];
			}
		}

		return $result;
	}

	/**
	 * Returns whether the current user has the permission to access the
	 * specified Content Helper feature.
	 *
	 * @since 3.16.0
	 *
	 * @param string                         $feature_name The feature's name.
	 * @param Parsely_Options_Content_Helper $pch_options The Content Helper options.
	 * @param int|false                      $post_id The post ID, if the check is for a specific post.
	 * @return bool Whether the current user can access the specified feature.
	 */
	public static function current_user_can_use_pch_feature(
		string $feature_name,
		$pch_options,
		$post_id = false
	): bool {
		if ( isset( $pch_options[ $feature_name ] ) ) {
			/**
			 * The feature's options.
			 *
			 * @var Parsely_Options_Content_Helper_Feature $feature_options
			 */
			$feature_options = $pch_options[ $feature_name ];
		} else {
			return false;
		}

		// All AI features are disabled.
		if ( true !== $pch_options['ai_features_enabled'] ) {
			return false;
		}

		// The specific AI feature is disabled.
		if ( true !== $feature_options['enabled'] ) {
			return false;
		}

		// Current user's role is not yet set.
		$current_user = wp_get_current_user();
		if ( 0 === count( $current_user->roles ) ) {
			return false;
		}

		// Current user's role is not set correctly.
		if ( ! isset( $current_user->roles[0] ) ) {
			return false;
		}

		// Check that the user's role has the capability to edit posts.
		$current_user_role = $current_user->roles[0];
		$valid_roles       = array_keys( self::get_user_roles_with_edit_posts_cap() );
		if ( ! in_array( $current_user_role, $valid_roles, true ) ) {
			return false;
		}

		// Check that the user's role has access to the specific feature/post.
		$allowed_roles = $feature_options['allowed_user_roles'];
		if ( in_array( $current_user_role, $allowed_roles, true ) ) {
			if ( (int) $post_id > 0 ) {
				return current_user_can( 'edit_post', $post_id );
			}

			return true;
		}

		return false;
	}

	/**
	 * Returns a JSON-encoded string with the Content Helper permissions for the
	 * current user.
	 *
	 * @since 3.16.0
	 *
	 * @param Parsely_Options_Content_Helper $pch_options The options to check against.
	 * @return string The JSON-encoded permissions string.
	 */
	public static function get_pch_permissions_json( $pch_options ): string {
		$permissions = array();
		$features    = array(
			'SmartLinking'     => 'smart_linking',
			'TitleSuggestions' => 'title_suggestions',
		);

		foreach ( $features as $key => $value ) {
			$permissions[ $key ] = self::current_user_can_use_pch_feature(
				$value,
				$pch_options,
				get_the_ID()
			);
		}

		$result = wp_json_encode( $permissions );

		return is_string( $result ) ? $result : '{}';
	}

	/**
	 * Builds and returns a permissions settings array for the Content Helper,
	 * based on the passed values.
	 *
	 * @since 3.16.0
	 *
	 * @param bool               $enabled Whether to enable the features.
	 * @param array<int, string> $allowed_user_roles The allowed user roles.
	 * @return Parsely_Options_Content_Helper The resulting permissions settings.
	 */
	public static function build_pch_permissions_settings_array(
		bool $enabled,
		array $allowed_user_roles
	) {
		return array(
			'ai_features_enabled' => $enabled,
			'smart_linking'       => array(
				'enabled'            => $enabled,
				'allowed_user_roles' => $allowed_user_roles,
			),
			'title_suggestions'   => array(
				'enabled'            => $enabled,
				'allowed_user_roles' => $allowed_user_roles,
			),
			'excerpt_suggestions' => array(
				'enabled'            => $enabled,
				'allowed_user_roles' => $allowed_user_roles,
			),
		);
	}
}

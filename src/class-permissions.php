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
}

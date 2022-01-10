<?php
/**
 * Parsely Network Admin Site List class
 *
 * @package Parsely
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely;

use Parsely\Parsely;

/**
 * Render the additions to the WordPress Multisite Network Admin Sites List page
 *
 * @since 3.2.0
 */
final class Network_Admin_Sites_List {
	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Attach network admin page functionality to the appropriate action and filter hooks.
	 *
	 * @since 3.2.0
	 *
	 * @return void
	 */
	public function run() {
		add_filter( 'manage_sites_action_links', array( __CLASS__, 'add_action_link' ), 10, 2 );
		add_filter( 'wpmu_blogs_columns', array( __CLASS__, 'add_api_key_column' ) );
		add_action( 'manage_sites_custom_column', array( $this, 'populate_api_key_column' ), 10, 2 );
	}

	/**
	 * Use the manage_sites_action_links filter to append a link to the settings page in the "row actions."
	 *
	 * @param array $actions The list of actions meant to be displayed for the current site's context in the row actions.
	 * @param int   $_blog_id The blog ID for the current context.
	 *
	 * @since 3.2.0
	 *
	 * @return array The list of actions including ours.
	 */
	public static function add_action_link( array $actions, int $_blog_id ): array {
		if ( ! current_user_can( Parsely::CAPABILITY ) ) {
			return $actions;
		}

		if ( ! is_numeric( $_blog_id ) ) {
			return $actions;
		}

		$settings_url                = Parsely::get_settings_url( (int) $_blog_id );
		$actions['parsely-settings'] = '<a href="' . esc_url( $settings_url ) . '">' .
		__( 'Parse.ly Settings', 'wp-parsely' ) .
		'</a>';

		return $actions;
	}

	/**
	 * Use the wpmu_blogs_columns filter to register the column where we'll display the site's API Key (if configured).
	 *
	 * @param array $sites_columns The list of columns meant to be displayed in the sites list table.
	 *
	 * @since 3.2.0
	 *
	 * @return array The list of columns to display in the network admin table including ours.
	 */
	public static function add_api_key_column( array $sites_columns ): array {
		$sites_columns['parsely-api-key'] = __( 'Parse.ly API Key', 'wp-parsely' );
		return $sites_columns;
	}

	/**
	 * Use the manage_sites_custom_column action to output each site's API Key (if configured).
	 *
	 * @param string $column_name The column name for the current context.
	 * @param int    $_blog_id The blog ID for the current context.
	 *
	 * @since 3.2.0
	 *
	 * @return void
	 */
	public function populate_api_key_column( string $column_name, int $_blog_id ): void {
		if ( 'parsely-api-key' !== $column_name ) {
			return;
		}

		// phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.switch_to_blog_switch_to_blog
		switch_to_blog( $_blog_id );
		$apikey = $this->parsely->get_api_key();
		restore_current_blog();

		if ( strlen( $apikey ) > 0 ) {
			echo esc_html( $apikey );
		} else {
			echo '<em>' . esc_html( 'Parse.ly API key is missing' ) . '</em>';
		}
	}
}

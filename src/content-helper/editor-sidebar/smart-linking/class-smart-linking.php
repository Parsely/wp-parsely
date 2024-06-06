<?php
/**
 * Class for Smart Linking feature in the editor sidebar.
 *
 * @package Parsely
 * @since   3.16.0
 */

declare( strict_types = 1 );

namespace Parsely\Content_Helper\Editor_Sidebar;

use Parsely\Content_Helper\Content_Helper_Feature;
use Parsely\Content_Helper\Editor_Sidebar;

/**
 * Class for Smart Linking feature in the editor sidebar.
 *
 * @since 3.16.0
 */
class Smart_Linking extends Content_Helper_Feature {

	/**
	 * Instance of Editor_Sidebar class.
	 *
	 * @since 3.16.0
	 *
	 * @param Editor_Sidebar $editor_sidebar Instance of Editor_Sidebar class.
	 */
	public function __construct( Editor_Sidebar $editor_sidebar ) {
		$this->parsely = $editor_sidebar->parsely;
	}

	/**
	 * Returns the feature's filter name. The feature filter controls the
	 * enabled/disabled state of a particular Content Helper feature.
	 *
	 * @since 3.16.0
	 *
	 * @return string The filter name.
	 */
	public static function get_feature_filter_name(): string {
		return self::get_global_filter_name() . '_smart_linking';
	}

	/**
	 * Returns the feature's script ID.
	 *
	 * @since 3.16.0
	 *
	 * @return string The script ID.
	 */
	public static function get_script_id(): string {
		return ''; // Not in use for this feature.
	}

	/**
	 * Returns the feature's style ID.
	 *
	 * @since 3.16.0
	 *
	 * @return string The style ID.
	 */
	public static function get_style_id(): string {
		return ''; // Not in use for this feature.
	}

	/**
	 * Runs the feature's initialization process.
	 *
	 * Registers the custom post type and taxonomies for the Smart Links.
	 *
	 * @since 3.16.0
	 */
	public function run(): void {
		if ( ! $this->can_enable_feature() ) {
			return;
		}

		// Register private custom post type for the Smart Links.
		register_post_type(
			'parsely_smart_link',
			array(
				'labels'              => array(
					'name'          => __( 'Smart Links', 'wp-parsely' ),
					'singular_name' => __( 'Smart Link', 'wp-parsely' ),
				),
				'supports'            => array( 'title', 'custom-fields' ),
				'taxonomies'          => array( 'smart_link_source', 'smart_link_destination' ),
				'hierarchical'        => false,
				'public'              => false,
				'show_ui'             => false,
				'show_in_menu'        => false,
				'show_in_admin_bar'   => false,
				'show_in_nav_menus'   => false,
				'can_export'          => true,
				'has_archive'         => false,
				'exclude_from_search' => true,
				'publicly_queryable'  => false,
				'rewrite'             => false,
				'capability_type'     => 'post',
				'show_in_rest'        => false,
			)
		);
		// Register the taxonomies for the Smart Links.
		register_taxonomy(
			'smart_link_source',
			'parsely_smart_link',
			array(
				'labels'             => array(
					'name'          => __( 'Smart Link Source', 'wp-parsely' ),
					'singular_name' => __( 'Smart Link Source', 'wp-parsely' ),
				),
				'public'             => false,
				'show_ui'            => false,
				'show_in_menu'       => false,
				'show_in_nav_menus'  => false,
				'show_tagcloud'      => false,
				'show_in_quick_edit' => false,
				'show_admin_column'  => false,
				'show_in_rest'       => false,
				'hierarchical'       => false,
				'rewrite'            => false,
				'capabilities'       => array(
					'manage_terms' => 'edit_posts',
					'edit_terms'   => 'edit_posts',
					'delete_terms' => 'edit_posts',
					'assign_terms' => 'edit_posts',
				),
			)
		);

		register_taxonomy(
			'smart_link_destination',
			'parsely_smart_link',
			array(
				'labels'             => array(
					'name'          => __( 'Smart Link Destinations', 'wp-parsely' ),
					'singular_name' => __( 'Smart Link Destination', 'wp-parsely' ),
				),
				'public'             => false,
				'show_ui'            => false,
				'show_in_menu'       => false,
				'show_in_nav_menus'  => false,
				'show_tagcloud'      => false,
				'show_in_quick_edit' => false,
				'show_admin_column'  => false,
				'show_in_rest'       => false,
				'hierarchical'       => false,
				'rewrite'            => false,
				'capabilities'       => array(
					'manage_terms' => 'edit_posts',
					'edit_terms'   => 'edit_posts',
					'delete_terms' => 'edit_posts',
					'assign_terms' => 'edit_posts',
				),
			)
		);
	}
}

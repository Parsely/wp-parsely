<?php
/**
 * UI: Class for adding `Parse.ly Stats` on admin columns.
 *
 * @package Parsely
 * @since   3.7.0
 */

declare(strict_types=1);

namespace Parsely\UI;

/**
 * Shows `Parse.ly Stats` on Admin Columns
 *
 * @since 3.7.0
 */
final class Admin_Columns_Analytics {
	/**
	 * Registers action and filter hook callbacks.
	 *
	 * @since 3.7.0
	 */
	public function run(): void {
		// @TODO: Add columns on all post types.

		// Add column headers.
		add_filter( 'manage_posts_columns', array( $this, 'add_parsely_stats_column_on_list_view' ), 10, 1 );
		add_filter( 'manage_pages_columns', array( $this, 'add_parsely_stats_column_on_list_view' ), 10, 1 );

		// Makes stats column sortable.
		add_filter( 'manage_edit-post_sortable_columns', array( $this, 'makes_parsely_stats_sortable' ), 10, 1 );
		add_filter( 'manage_edit-page_sortable_columns', array( $this, 'makes_parsely_stats_sortable' ), 10, 1 );
		
		// Add content on column.
		add_action( 'manage_posts_custom_column', array( $this, 'show_parsely_stats' ), 10, 2 );
		add_action( 'manage_pages_custom_column', array( $this, 'show_parsely_stats' ), 10, 2 );
	}

	/**
	 * Adds the `Parse.ly Stats` on admin columns.
	 *
	 * @param array<string, string> $columns Columns array which contain keys and labels.
	 *
	 * @return array<string, string>
	 */
	public function add_parsely_stats_column_on_list_view( array $columns ): array {
		$columns['parsely-stats'] = 'Parse.ly Stats';

		return $columns;
	}

	/**
	 * Makes `Parse.ly Stats` column sortable.
	 *
	 * @param array<string, string> $columns Columns array which contain keys and labels.
	 *
	 * @return array<string, string>
	 */
	public function makes_parsely_stats_sortable( array $columns ): array {
		$columns['parsely-stats'] = 'parsely-stats';

		return $columns;
	}

	/**
	 * Show Parsely Stats.
	 *
	 * @param string $column_key Key of the column.
	 * @param int    $post_id ID of the post.
	 *
	 * @return void
	 */
	public function show_parsely_stats( string $column_key, int $post_id ): void {
		if ( 'parsely-stats' === $column_key ) {
			echo "
				<span class='parsely-post-page-views'> 30k page views </span> <br/>
				<span class='parsely-post-page-visitors'> 13k visitors </span> <br/>
				<span class='parsely-post-avg-time'> 1:04 avg time </span>
			";
		}
	}
}

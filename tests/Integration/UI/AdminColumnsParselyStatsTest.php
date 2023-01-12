<?php
/**
 * Integration Tests: Parse.ly Stats Column in Admin Screens
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Mockery;
use WP_Scripts;
use WP_Post;
use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Admin_Columns_Parsely_Stats;

/**
 * Integration Tests for Parse.ly Stats Column in Admin Screens.
 *
 * @since 3.7.0
 *
 * @phpstan-import-type Parsely_Stats_Response from Admin_Columns_Parsely_Stats
 */
final class AdminColumnsParselyStatsTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var string
	 */
	private static $parsely_stats_column_header = 'Parse.ly Stats';

	/**
	 * Verify enqueued status of Parse.ly Stats styles.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_styles
	 */
	public function test_styles_of_parsely_stats_admin_column_on_empty_plugin_options(): void {
		$this->set_empty_plugin_options();
		$this->assert_parsely_stats_admin_styles( false );
	}

	/**
	 * Verify enqueued status of Parse.ly Stats styles.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_styles
	 */
	public function test_styles_of_parsely_stats_admin_column_on_empty_track_post_types(): void {
		$this->set_empty_track_post_types();
		$this->assert_parsely_stats_admin_styles( false );
	}

	/**
	 * Verify enqueued status of Parse.ly Stats styles.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_styles
	 */
	public function test_styles_of_parsely_stats_admin_column_on_invalid_track_post_type(): void {
		$this->set_valid_plugin_options();
		set_current_screen( 'edit-page' );
		$this->assert_parsely_stats_admin_styles( false );
	}

	/**
	 * Verify enqueued status of Parse.ly Stats styles.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_styles
	 */
	public function test_styles_of_parsely_stats_admin_column_on_valid_posts(): void {
		$this->set_valid_conditions_for_parsely_stats();
		$this->assert_parsely_stats_admin_styles( true );
	}

	/**
	 * Assert on Parse.ly Stats styles.
	 *
	 * @param bool $assert_type Indicates wether we are asserting for TRUE or FALSE.
	 *
	 * @return void
	 */
	private function assert_parsely_stats_admin_styles( bool $assert_type ): void {
		$obj = $this->init_admin_columns_parsely_stats();

		if ( $this->isPHPVersion7Dot2OrHigher() ) {
			do_action( 'current_screen' ); // phpcs:ignore
			do_action( 'admin_enqueue_scripts' ); // phpcs:ignore
		} else {
			$obj->set_current_screen();
			$obj->enqueue_parsely_stats_styles();
		}

		$handle = 'parsely-stats-admin-styles';
		if ( $assert_type ) {
			$this->assert_is_style_enqueued( $handle );
			wp_dequeue_style( $handle ); // Dequeue to start fresh for next test.
		} else {
			$this->assert_is_style_not_enqueued( $handle );
		}
	}

	/**
	 * Verifies Parse.ly Stats column visibility.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::add_parsely_stats_column_on_list_view
	 */
	public function test_parsely_stats_column_visibility_on_empty_plugin_options(): void {
		$this->set_empty_plugin_options();

		$this->assert_hooks_for_parsely_stats_column( false );
		self::assertNotContains( self::$parsely_stats_column_header, $this->get_admin_columns() );
	}

	/**
	 * Verifies Parse.ly Stats column visibility.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::add_parsely_stats_column_on_list_view
	 */
	public function test_parsely_stats_column_visibility_on_empty_track_post_types(): void {
		$this->set_empty_track_post_types();

		self::assertNotContains( self::$parsely_stats_column_header, $this->get_admin_columns() );
		$this->assert_hooks_for_parsely_stats_column( true );
	}

	/**
	 * Verifies Parse.ly Stats column visibility.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::add_parsely_stats_column_on_list_view
	 */
	public function test_parsely_stats_column_visibility_on_invalid_track_post_types(): void {
		$this->set_valid_plugin_options();
		set_current_screen( 'edit-page' );

		self::assertNotContains( self::$parsely_stats_column_header, $this->get_admin_columns() );
		$this->assert_hooks_for_parsely_stats_column( true );
	}

	/**
	 * Verifies Parse.ly Stats column visibility.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::add_parsely_stats_column_on_list_view
	 */
	public function test_parsely_stats_column_visibility_on_valid_posts(): void {
		$this->set_valid_conditions_for_parsely_stats();

		self::assertContains( self::$parsely_stats_column_header, $this->get_admin_columns() );
		$this->assert_hooks_for_parsely_stats_column( true );
	}

	/**
	 * Verifies Parse.ly Stats column visibility.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::add_parsely_stats_column_on_list_view
	 */
	public function test_parsely_stats_column_visibility_on_valid_pages(): void {
		$this->set_valid_conditions_for_parsely_stats( 'page' );

		self::assertContains( self::$parsely_stats_column_header, $this->get_admin_columns() );
		$this->assert_hooks_for_parsely_stats_column( true );
	}

	/**
	 * Get Admin Columns.
	 *
	 * @return array<string>
	 */
	private function get_admin_columns() {
		$obj = $this->init_admin_columns_parsely_stats();

		if ( $this->isPHPVersion7Dot2OrHigher() ) {
			do_action( 'current_screen' ); // phpcs:ignore
		} else {
			$obj->set_current_screen();
		}

		return $obj->add_parsely_stats_column_on_list_view( array() );
	}

	/**
	 * Assert status of hooks for Parse.ly Stats column.
	 *
	 * @param bool $assert_type Assert this condition on hooks.
	 *
	 * @return void
	 */
	private function assert_hooks_for_parsely_stats_column( $assert_type ) {
		$this->assert_wp_hooks_availablility(
			array( 'current_screen', 'manage_posts_columns', 'manage_pages_columns' ),
			$assert_type
		);
	}

	/**
	 * Verify content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::update_post_publish_date_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_empty_plugin_options(): void {
		$this->set_empty_plugin_options();

		$obj    = $this->init_admin_columns_parsely_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column( $obj );

		$this->assert_hooks_for_parsely_stats_content( false );
		self::assertEquals( '', $output );
		self::assertEquals( array(), $this->get_publish_date_times_property( $obj ) );
	}

	/**
	 * Verify content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::update_post_publish_date_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_empty_track_post_types(): void {
		$this->set_empty_track_post_types();

		$obj    = $this->init_admin_columns_parsely_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column( $obj );

		$this->assert_hooks_for_parsely_stats_content( true );
		self::assertEquals( '', $output );
		self::assertEquals( array(), $this->get_publish_date_times_property( $obj ) );
	}

	/**
	 * Verify content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::update_post_publish_date_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_invalid_track_post_types(): void {
		$this->set_valid_plugin_options();
		set_current_screen( 'edit-page' );

		$obj    = $this->init_admin_columns_parsely_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column( $obj );

		$this->assert_hooks_for_parsely_stats_content( true );
		self::assertEquals( '', $output );
		self::assertEquals( array(), $this->get_publish_date_times_property( $obj ) );
	}

	/**
	 * Verify content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::update_post_publish_date_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_valid_posts(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$obj    = $this->init_admin_columns_parsely_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column( $obj );

		$this->assert_hooks_for_parsely_stats_content( true );
		self::assertEquals(
			$this->get_parsely_stats_placeholder_content( 'Title 1-(publish)-2010-01-01T05:00:00' ) .
			$this->get_parsely_stats_placeholder_content( 'Title 2-(publish)-2010-01-02T05:00:00' ) .
			$this->get_parsely_stats_placeholder_content( 'Title 3-(publish)-2010-01-03T05:00:00' ) .
			$this->get_parsely_stats_placeholder_content( 'Title 1-(draft)-2010-01-01T05:00:00' ) .
			$this->get_parsely_stats_placeholder_content( 'Title 2-(draft)-2010-01-02T05:00:00' ),
			$output
		);
		self::assertEquals(
			array( '2010-01-01 05:00:00', '2010-01-02 05:00:00', '2010-01-03 05:00:00' ),
			$this->get_publish_date_times_property( $obj )
		);
	}


	/**
	 * Verify content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::update_post_publish_date_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_valid_pages(): void {
		$this->set_valid_conditions_for_parsely_stats( 'page' );

		$obj    = $this->init_admin_columns_parsely_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column( $obj );

		$this->assert_hooks_for_parsely_stats_content( true );
		self::assertEquals(
			$this->get_parsely_stats_placeholder_content( 'Title 1-(publish)-2010-01-01T05:00:00' ) .
			$this->get_parsely_stats_placeholder_content( 'Title 2-(publish)-2010-01-02T05:00:00' ) .
			$this->get_parsely_stats_placeholder_content( 'Title 3-(publish)-2010-01-03T05:00:00' ) .
			$this->get_parsely_stats_placeholder_content( 'Title 1-(draft)-2010-01-01T05:00:00' ) .
			$this->get_parsely_stats_placeholder_content( 'Title 2-(draft)-2010-01-02T05:00:00' ),
			$output
		);
		self::assertEquals(
			array( '2010-01-01 05:00:00', '2010-01-02 05:00:00', '2010-01-03 05:00:00' ),
			$this->get_publish_date_times_property( $obj )
		);
	}

	/**
	 * Set posts data and get content of Parse.ly Stats column.
	 *
	 * @param Admin_Columns_Parsely_Stats $obj Instance of Admin_Columns_Parsely_Stats.
	 * @param string                      $post_type Type of the post.
	 *
	 * @return string
	 */
	private function set_posts_data_and_get_content_of_parsely_stats_column( $obj, $post_type = 'post' ) {
		$posts = $this->set_and_get_posts_data( 3, 2, $post_type );

		return $this->get_content_of_parsely_stats_column( $obj, $posts, $post_type );
	}

	/**
	 * Set posts data.
	 *
	 * @param int    $publish_num_of_posts Number of publish posts that we have to create.
	 * @param int    $draft_num_of_posts Number of draft posts that we have to create.
	 * @param string $post_type Type of the post.
	 *
	 * @return WP_Post[]
	 */
	private function set_and_get_posts_data( $publish_num_of_posts, $draft_num_of_posts, $post_type ) {
		return array_merge(
			$this->create_and_get_test_posts( $publish_num_of_posts ),
			$this->create_and_get_test_posts( $draft_num_of_posts, $post_type, 'draft' )
		);
	}

	/**
	 * Get content of Parse.ly Stats column.
	 *
	 * @param Admin_Columns_Parsely_Stats $obj Instance of Admin_Columns_Parsely_Stats.
	 * @param WP_Post[]                   $posts Available posts.
	 * @param string                      $post_type Type of the post.
	 *
	 * @return string
	 */
	private function get_content_of_parsely_stats_column( $obj, $posts, $post_type ) {
		ob_start();
		$this->show_content_on_parsely_stats_column( $obj, $posts, $post_type );

		return (string) ob_get_clean();
	}

	/**
	 * Replicate behavior by which WordPress set post publish dates and then make API call
	 * to get Parse.ly stats.
	 *
	 * @param Admin_Columns_Parsely_Stats $obj Instance of Admin_Columns_Parsely_Stats.
	 * @param WP_Post[]                   $posts Available posts.
	 * @param string                      $post_type Type of the post.
	 *
	 * @return void
	 */
	private function show_content_on_parsely_stats_column( $obj, $posts, $post_type ) {
		if ( $this->isPHPVersion7Dot2OrHigher() ) {
			do_action( 'current_screen' ); // phpcs:ignore
		} else {
			$obj->set_current_screen();
		}

		foreach ( $posts as $current_post ) {
			global $post;
			$post = $current_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited

			if ( $this->isPHPVersion7Dot2OrHigher() ) {
				do_action( "manage_{$post_type}s_custom_column" ); // phpcs:ignore
			} else {
				$obj->update_post_publish_date_times_and_show_placeholder();
			}
		}
	}

	/**
	 * Get placeholder content of Parse.ly stats column.
	 *
	 * @param string $key Stats Key.
	 *
	 * @return string
	 */
	private function get_parsely_stats_placeholder_content( $key ) {
		return "		<div class=\"parsely-post-stats\" data-stats-key=\"$key\">\n			<span class=\"parsely-post-stats-placeholder\">...</span>\n		</div>\n		";
	}

	/**
	 * Get post_utc_publish_date_times property of given object.
	 *
	 * @param Admin_Columns_Parsely_Stats $obj Instance of Admin_Columns_Parsely_Stats.
	 *
	 * @return string
	 */
	private function get_publish_date_times_property( $obj ) {
		/**
		 * Variable.
		 *
		 * @var string
		 */
		return $this->get_private_property( Admin_Columns_Parsely_Stats::class, 'post_utc_publish_date_times' )->getValue( $obj );
	}

	/**
	 * Assert status of hooks for showing Parse.ly Stats content inside column.
	 *
	 * @param bool $assert_type Assert this condition on hooks.
	 *
	 * @return void
	 */
	private function assert_hooks_for_parsely_stats_content( $assert_type = true ) {
		$this->assert_wp_hooks_availablility(
			array( 'current_screen', 'manage_posts_custom_column', 'manage_pages_custom_column' ),
			$assert_type
		);
	}

	/**
	 * Verify enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_script_and_pass_data
	 */
	public function test_script_of_parsely_stats_admin_column_on_empty_plugin_options(): void {
		$this->set_empty_plugin_options();
		$this->assert_parsely_stats_admin_script( null, false );
	}

	/**
	 * Verify enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_script_and_pass_data
	 */
	public function test_script_of_parsely_stats_admin_column_on_empty_track_post_types(): void {
		$this->set_empty_track_post_types();
		$this->assert_parsely_stats_admin_script( null, false );
	}

	/**
	 * Verify enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_script_and_pass_data
	 */
	public function test_script_of_parsely_stats_admin_column_on_invalid_track_post_types(): void {
		$this->set_valid_plugin_options();
		set_current_screen( 'edit-page' );
		$this->assert_parsely_stats_admin_script( null, false );
	}

	/**
	 * Verify enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_script_and_pass_data
	 */
	public function test_script_of_parsely_stats_admin_column_on_valid_posts_and_empty_response(): void {
		$this->set_valid_conditions_for_parsely_stats();
		$this->assert_parsely_stats_admin_script( null, false );
	}


	/**
	 * Verify enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_script_and_pass_data
	 */
	public function test_script_of_parsely_stats_admin_column_on_valid_posts_and_valid_response(): void {
		$this->set_valid_conditions_for_parsely_stats();
		$this->assert_parsely_stats_admin_script( array(), true );

		/**
		 * Internal Variable.
		 *
		 * @var WP_Scripts
		 */
		global $wp_scripts;

		ob_start();
		var_dump( $wp_scripts->print_extra_script( 'parsely-stats-admin-script' ) ); // phpcs:ignore
		$output = (string) ob_get_clean();

		self::assertStringContainsString( 'var wpParselyAdminStatsResponse = [];', $output );
	}

	/**
	 * Assert script of Parse.ly Stats.
	 *
	 * @param null|array<mixed> $stats_response Stats response that we have to mock.
	 * @param bool              $assert_type Indicates wether we are asserting for TRUE or FALSE.
	 *
	 * @return void
	 */
	private function assert_parsely_stats_admin_script( $stats_response, $assert_type ): void {
		$obj = Mockery::mock( Admin_Columns_Parsely_Stats::class, array( new Parsely() ) )->makePartial();
		$obj->shouldReceive( 'get_parsely_stats_response' )->once()->andReturn( $stats_response );
		$obj->run();

		if ( $this->isPHPVersion7Dot2OrHigher() ) {
			do_action( 'current_screen' ); // phpcs:ignore
			do_action( 'admin_footer' ); // phpcs:ignore
		} else {
			$obj->set_current_screen();
			$obj->enqueue_parsely_stats_script_and_pass_data();
		}

		$handle = 'parsely-stats-admin-script';
		if ( $assert_type ) {
			$this->assert_is_script_enqueued( $handle );
			wp_dequeue_script( $handle ); // Dequeue to start fresh for next test.
		} else {
			$this->assert_is_script_not_enqueued( $handle );
		}
	}

	/**
	 * Verify Parse.ly Stats response.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 */
	public function test_parsely_stats_response_on_empty_plugin_options(): void {
		$this->set_empty_plugin_options();

		$res = $this->get_parsely_stats_response();

		$this->assert_hooks_for_parsely_stats_response( false );
		self::assertNull( $res );
	}

	/**
	 * Verify Parse.ly Stats response.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 */
	public function test_parsely_stats_response_on_empty_track_post_types(): void {
		$this->set_empty_track_post_types();

		$res = $this->get_parsely_stats_response();

		$this->assert_hooks_for_parsely_stats_response( true );
		self::assertNull( $res );
	}

	/**
	 * Verify Parse.ly Stats response.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 */
	public function test_parsely_stats_response_on_invalid_track_post_types(): void {
		$this->set_valid_plugin_options();
		set_current_screen( 'edit-page' );

		$res = $this->get_parsely_stats_response();

		$this->assert_hooks_for_parsely_stats_response( true );
		self::assertNull( $res );
	}

	/**
	 * Verify Parse.ly Stats response.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 */
	public function test_parsely_stats_response_on_valid_post_type_but_no_data(): void {
		$this->set_valid_plugin_options();
		set_current_screen( 'edit-page' );

		$res = $this->get_parsely_stats_response();

		$this->assert_hooks_for_parsely_stats_response( true );
		self::assertNull( $res );
	}

	/**
	 * Replicate behavior by which WordPress set post publish dates and then make API call
	 * to get Parse.ly stats.
	 *
	 * @param WP_Post[] $posts Available Posts.
	 * @param string    $post_type Type of the post.
	 *
	 * @return Parsely_Stats_Response|null
	 */
	private function get_parsely_stats_response( $posts = array(), $post_type = 'post' ) {
		$obj = $this->init_admin_columns_parsely_stats();

		$this->show_content_on_parsely_stats_column( $obj, $posts, $post_type );

		return $obj->get_parsely_stats_response();
	}

	/**
	 * Assert status of hooks for Parse.ly Stats response.
	 *
	 * @param bool $assert_type Assert this condition on hooks.
	 *
	 * @return void
	 */
	private function assert_hooks_for_parsely_stats_response( $assert_type = true ) {
		$this->assert_wp_hooks_availablility(
			array( 'current_screen', 'manage_posts_custom_column', 'manage_pages_custom_column', 'admin_footer' ),
			$assert_type
		);
	}

	/**
	 * Initialize Admin_Columns_Parsely_Stats object.
	 *
	 * @return Admin_Columns_Parsely_Stats
	 */
	private function init_admin_columns_parsely_stats() {
		$obj = new Admin_Columns_Parsely_Stats( new Parsely() );
		$obj->run();

		return $obj;
	}

	/**
	 * Set empty key and secret.
	 *
	 * @return void
	 */
	private function set_empty_plugin_options(): void {
		TestCase::set_options(
			array(
				'apikey'           => '',
				'api_secret'       => '',
				'track_post_types' => array(),
			)
		);

		set_current_screen( 'edit-post' );
	}

	/**
	 * Set empty track_post_types.
	 *
	 * @return void
	 */
	private function set_empty_track_post_types(): void {
		TestCase::set_options(
			array(
				'apikey'           => 'test',
				'api_secret'       => 'test',
				'track_post_types' => array(),
			)
		);

		set_current_screen( 'edit-post' );
	}

	/**
	 * Set valid plugin_options.
	 *
	 * @param string $post_type Type of the post.
	 *
	 * @return void
	 */
	private function set_valid_plugin_options( $post_type = 'post' ): void {
		TestCase::set_options(
			array(
				'apikey'           => 'test',
				'api_secret'       => 'test',
				'track_post_types' => array( $post_type ),
			)
		);
	}

	/**
	 * Set valid conditions under which we add hooks for Parse.ly Stats.
	 *
	 * @param string $post_type Type of the post.
	 *
	 * @return void
	 */
	private function set_valid_conditions_for_parsely_stats( $post_type = 'post' ): void {
		$this->set_valid_plugin_options( $post_type );
		set_current_screen( "edit-$post_type" );
	}
}

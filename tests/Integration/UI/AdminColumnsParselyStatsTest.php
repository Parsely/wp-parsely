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
use Parsely\RemoteAPI\Analytics_Posts_API;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Admin_Columns_Parsely_Stats;
use WP_Error;

use function Parsely\Utils\get_utc_date_format;

/**
 * Integration Tests for Parse.ly Stats Column in Admin Screens.
 *
 * @since 3.7.0
 *
 * @phpstan-import-type Analytics_Post_API_Params from Analytics_Posts_API
 * @phpstan-import-type Analytics_Post from Analytics_Posts_API
 * @phpstan-import-type Parsely_Posts_Stats_Response from Admin_Columns_Parsely_Stats
 */
final class AdminColumnsParselyStatsTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var string
	 */
	private static $parsely_stats_column_header = 'Parse.ly Stats';

	/**
	 * Internal variable.
	 *
	 * @var Parsely_Posts_Stats_Response
	 */
	private static $parsely_api_empty_response = array(
		'data'  => array(),
		'error' => null,
	);

	/**
	 * Setup method called before each test.
	 */
	public function set_up(): void {
		parent::set_up();

		$this->set_permalink_structure( '/%year%/%monthnum%/%day%/%postname%' );
		$this->set_admin_user();
	}

	/**
	 * Teardown method called after each test.
	 */
	public function tear_down(): void {
		parent::tear_down();

		$this->set_permalink_structure( '' );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats styles.
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
	 * Verifies enqueued status of Parse.ly Stats styles.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_styles
	 */
	public function test_styles_of_parsely_stats_admin_column_on_empty_api_secret(): void {
		$this->set_empty_api_secret();
		$this->assert_parsely_stats_admin_styles( false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats styles.
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
	 * Verifies enqueued status of Parse.ly Stats styles.
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
	 * Verifies enqueued status of Parse.ly Stats styles.
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
	 * Asserts on Parse.ly Stats styles.
	 *
	 * @param bool $assert_type Indicates wether we are asserting for TRUE or FALSE.
	 */
	private function assert_parsely_stats_admin_styles( bool $assert_type ): void {
		$obj = $this->init_admin_columns_parsely_stats();

		if ( $this->is_php_version_7dot2_or_higher() ) {
			do_action( 'current_screen' ); // phpcs:ignore
			do_action( 'admin_enqueue_scripts' ); // phpcs:ignore
		} elseif ( $obj->should_add_hooks() ) {
			$obj->set_current_screen();
			$obj->enqueue_parsely_stats_styles();
		}

		$handle = 'admin-parsely-stats-styles';
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
	public function test_parsely_stats_column_visibility_on_empty_api_secret(): void {
		$this->set_empty_api_secret();

		self::assertNotContains( self::$parsely_stats_column_header, $this->get_admin_columns() );
		$this->assert_hooks_for_parsely_stats_column( false );
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
	 * Gets Admin Columns.
	 *
	 * @return array<string>
	 */
	private function get_admin_columns() {
		$obj = $this->init_admin_columns_parsely_stats();

		if ( $this->is_php_version_7dot2_or_higher() ) {
			do_action( 'current_screen' ); // phpcs:ignore
		} elseif ( $obj->should_add_hooks() ) {
			$obj->set_current_screen();
		}

		return $obj->add_parsely_stats_column_on_list_view( array() );
	}

	/**
	 * Asserts status of hooks for Parse.ly Stats column.
	 *
	 * @param bool $assert_type Assert this condition on hooks.
	 */
	private function assert_hooks_for_parsely_stats_column( $assert_type ): void {
		$this->assert_wp_hooks_availablility(
			array( 'current_screen', 'manage_posts_columns', 'manage_pages_columns' ),
			$assert_type
		);
	}

	/**
	 * Verifies content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::update_published_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_empty_plugin_options(): void {
		$this->set_empty_plugin_options();

		$obj    = $this->init_admin_columns_parsely_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column( $obj );

		$this->assert_hooks_for_parsely_stats_content( false );
		self::assertEquals( '', $output );
		self::assertEquals( array(), $this->get_utc_published_times_property( $obj ) );
	}

	/**
	 * Verifies content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::update_published_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_empty_api_secret(): void {
		$this->set_empty_api_secret();

		$obj    = $this->init_admin_columns_parsely_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column( $obj );

		$this->assert_hooks_for_parsely_stats_content( false );
		self::assertEquals( '', $output );
		self::assertEquals( array(), $this->get_utc_published_times_property( $obj ) );
	}

	/**
	 * Verifies content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::update_published_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_empty_track_post_types(): void {
		$this->set_empty_track_post_types();

		$obj    = $this->init_admin_columns_parsely_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column( $obj );

		$this->assert_hooks_for_parsely_stats_content( true );
		self::assertEquals( '', $output );
		self::assertEquals( array(), $this->get_utc_published_times_property( $obj ) );
	}

	/**
	 * Verifies content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::update_published_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_invalid_track_post_types(): void {
		$this->set_valid_plugin_options();
		set_current_screen( 'edit-page' );

		$obj    = $this->init_admin_columns_parsely_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column( $obj );

		$this->assert_hooks_for_parsely_stats_content( true );
		self::assertEquals( '', $output );
		self::assertEquals( array(), $this->get_utc_published_times_property( $obj ) );
	}

	/**
	 * Verifies content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::update_published_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_valid_posts(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$obj    = $this->init_admin_columns_parsely_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column( $obj );

		$this->assert_hooks_for_parsely_stats_content( true );
		self::assertEquals(
			$this->get_parsely_stats_placeholder_content( '/2010/01/01/title-1-publish' ) .
			$this->get_parsely_stats_placeholder_content( '/2010/01/02/title-2-publish' ) .
			$this->get_parsely_stats_placeholder_content( '/2010/01/03/title-3-publish' ) .
			$this->get_parsely_stats_placeholder_content( '/' ) .
			$this->get_parsely_stats_placeholder_content( '/' ),
			$output
		);
		self::assertEquals(
			array( '2010-01-01 05:00:00', '2010-01-02 05:00:00', '2010-01-03 05:00:00' ),
			$this->get_utc_published_times_property( $obj )
		);
	}


	/**
	 * Verifies content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::update_published_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_valid_pages(): void {
		$this->set_valid_conditions_for_parsely_stats( 'page' );

		$obj    = $this->init_admin_columns_parsely_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column( $obj );

		$this->assert_hooks_for_parsely_stats_content( true );
		self::assertEquals(
			$this->get_parsely_stats_placeholder_content( '/2010/01/01/title-1-publish' ) .
			$this->get_parsely_stats_placeholder_content( '/2010/01/02/title-2-publish' ) .
			$this->get_parsely_stats_placeholder_content( '/2010/01/03/title-3-publish' ) .
			$this->get_parsely_stats_placeholder_content( '/' ) .
			$this->get_parsely_stats_placeholder_content( '/' ),
			$output
		);
		self::assertEquals(
			array( '2010-01-01 05:00:00', '2010-01-02 05:00:00', '2010-01-03 05:00:00' ),
			$this->get_utc_published_times_property( $obj )
		);
	}

	/**
	 * Sets posts data and get content of Parse.ly Stats column.
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
	 * Sets posts data.
	 *
	 * @param int    $publish_num_of_posts Number of publish posts that we have to create.
	 * @param int    $draft_num_of_posts Number of draft posts that we have to create.
	 * @param string $post_type Type of the post.
	 *
	 * @return WP_Post[]
	 */
	private function set_and_get_posts_data( $publish_num_of_posts = 1, $draft_num_of_posts = 0, $post_type = 'post' ) {
		return array_merge(
			$this->create_and_get_test_posts( $publish_num_of_posts ),
			$this->create_and_get_test_posts( $draft_num_of_posts, $post_type, 'draft' )
		);
	}

	/**
	 * Gets content of Parse.ly Stats column.
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
	 * Replicates behavior by which WordPress set post publish dates and then make API call
	 * to get Parse.ly stats.
	 *
	 * @param Admin_Columns_Parsely_Stats $obj Instance of Admin_Columns_Parsely_Stats.
	 * @param WP_Post[]                   $posts Available posts.
	 * @param string                      $post_type Type of the post.
	 */
	private function show_content_on_parsely_stats_column( $obj, $posts, $post_type ): void {
		if ( $this->is_php_version_7dot2_or_higher() ) {
			do_action( 'current_screen' ); // phpcs:ignore
		} elseif ( $obj->should_add_hooks() ) {
			$obj->set_current_screen();
		}

		foreach ( $posts as $current_post ) {
			global $post;
			$post        = $current_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
			$column_name = 'parsely-stats';

			if ( $this->is_php_version_7dot2_or_higher() ) {
				do_action( "manage_{$post_type}s_custom_column", $column_name ); // phpcs:ignore
			} else {
				$obj->update_published_times_and_show_placeholder( $column_name );
			}
		}
	}

	/**
	 * Gets placeholder content of Parse.ly stats column.
	 *
	 * @param string $key Stats Key.
	 *
	 * @return string
	 */
	private function get_parsely_stats_placeholder_content( $key ) {
		return "		<div class=\"parsely-post-stats\" data-stats-key=\"$key\">\n			<span class=\"parsely-post-stats-placeholder\">...</span>\n		</div>\n		";
	}

	/**
	 * Gets utc_published_times property of given object.
	 *
	 * @param Admin_Columns_Parsely_Stats $obj Instance of Admin_Columns_Parsely_Stats.
	 *
	 * @return string
	 */
	private function get_utc_published_times_property( $obj ) {
		/**
		 * Variable.
		 *
		 * @var string
		 */
		return $this->get_private_property( Admin_Columns_Parsely_Stats::class, 'utc_published_times' )->getValue( $obj );
	}

	/**
	 * Asserts status of hooks for showing Parse.ly Stats content inside column.
	 *
	 * @param bool $assert_type Assert this condition on hooks.
	 */
	private function assert_hooks_for_parsely_stats_content( $assert_type = true ): void {
		$this->assert_wp_hooks_availablility(
			array( 'current_screen', 'manage_posts_custom_column', 'manage_pages_custom_column' ),
			$assert_type
		);
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_script_with_data
	 */
	public function test_script_of_parsely_stats_admin_column_on_empty_plugin_options(): void {
		$this->set_empty_plugin_options();
		$obj = $this->mock_parsely_stats_response( null );
		$this->assert_parsely_stats_admin_script( $obj, false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_script_with_data
	 */
	public function test_script_of_parsely_stats_admin_column_on_empty_api_secret(): void {
		$this->set_empty_api_secret();
		$obj = $this->mock_parsely_stats_response( array() );
		$this->assert_parsely_stats_admin_script( $obj, false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_script_with_data
	 */
	public function test_script_of_parsely_stats_admin_column_on_empty_track_post_types(): void {
		$this->set_empty_track_post_types();
		$obj = $this->mock_parsely_stats_response( null );
		$this->assert_parsely_stats_admin_script( $obj, false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_script_with_data
	 */
	public function test_script_of_parsely_stats_admin_column_on_invalid_track_post_types(): void {
		$this->set_valid_plugin_options();
		set_current_screen( 'edit-page' );

		$obj = $this->mock_parsely_stats_response( null );
		$this->assert_parsely_stats_admin_script( $obj, false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_script_with_data
	 */
	public function test_script_of_parsely_stats_admin_column_on_valid_posts_and_empty_response(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$obj = $this->mock_parsely_stats_response( null );
		$this->assert_parsely_stats_admin_script( $obj, false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_script_with_data
	 */
	public function test_script_of_parsely_stats_admin_column_on_valid_posts_and_valid_response(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$obj = $this->mock_parsely_stats_response( array() );
		$this->assert_parsely_stats_admin_script( $obj, true );

		/**
		 * Internal Variable.
		 *
		 * @var WP_Scripts
		 */
		global $wp_scripts;

		ob_start();
		var_dump( $wp_scripts->print_inline_script ( 'admin-parsely-stats-script', 'before' ) ); // phpcs:ignore
		$output = (string) ob_get_clean();

		self::assertStringContainsString( 'window.wpParselyPostsStatsResponse = \'[]\';', $output );
	}

	/**
	 * Mock function get_parsely_stats_response from class.
	 *
	 * @param null|array<mixed> $return_value Value that we have to return from mock function.
	 *
	 * @return Admin_Columns_Parsely_Stats
	 */
	private function mock_parsely_stats_response( $return_value ) {
		$obj = Mockery::mock( Admin_Columns_Parsely_Stats::class, array( new Parsely() ) )->makePartial();
		$obj->shouldReceive( 'get_parsely_stats_response' )->once()->andReturn( $return_value );
		$obj->run();

		return $obj;
	}


	/**
	 * Verifies Parse.ly API call and enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 */
	public function test_should_not_call_parsely_api_on_empty_api_secret_and_hidden_parsely_stats_column(): void {
		$this->set_empty_api_secret();

		$obj = $this->mock_is_parsely_stats_column_hidden( true );
		$this->assert_parsely_stats_admin_script( $obj, false );
	}

	/**
	 * Mock function is_parsely_stats_column_hidden from class.
	 *
	 * @param bool $return_value Value that we have to return from mock function.
	 *
	 * @return Admin_Columns_Parsely_Stats
	 */
	private function mock_is_parsely_stats_column_hidden( $return_value = false ) {
		$obj = Mockery::mock( Admin_Columns_Parsely_Stats::class, array( new Parsely() ) )->makePartial();
		$obj->shouldReceive( 'is_parsely_stats_column_hidden' )->once()->andReturn( $return_value );
		$obj->run();

		return $obj;
	}

	/**
	 * Asserts script of Parse.ly Stats.
	 *
	 * @param Admin_Columns_Parsely_Stats $obj Instance of the class.
	 * @param bool                        $assert_type Indicates wether we are asserting for TRUE or FALSE.
	 */
	private function assert_parsely_stats_admin_script( $obj, $assert_type ): void {
		if ( $this->is_php_version_7dot2_or_higher() ) {
			do_action( 'current_screen' ); // phpcs:ignore
			do_action( 'admin_footer' ); // phpcs:ignore
		} elseif ( $obj->should_add_hooks() ) {
			$obj->set_current_screen();
			$obj->enqueue_parsely_stats_script_with_data();
		}

		$handle = 'admin-parsely-stats-script';
		if ( $assert_type ) {
			$this->assert_is_script_enqueued( $handle );
			wp_dequeue_script( $handle ); // Dequeue to start fresh for next test.
		} else {
			$this->assert_is_script_not_enqueued( $handle );
		}
	}

	/**
	 * Verifies Parse.ly Stats response.
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
	 * Verifies Parse.ly Stats response.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 */
	public function test_parsely_stats_response_on_empty_api_secret(): void {
		$this->set_empty_api_secret();

		$res = $this->get_parsely_stats_response();

		$this->assert_hooks_for_parsely_stats_response( false );
		self::assertNull( $res );
	}

	/**
	 * Verifies Parse.ly Stats API arguments.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_publish_date_params_for_analytics_api
	 */
	public function test_api_params_of_analytics_api_call_on_valid_post_type_and_having_single_record(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$posts = $this->set_and_get_posts_data( 1, 2 );
		$res   = $this->get_parsely_stats_response(
			$posts,
			'post',
			null,
			array(
				'pub_date_start' => '2010-01-01',
				'pub_date_end'   => '2010-01-01',
			)
		);

		$this->assert_hooks_for_parsely_stats_response( true );
		self::assertEquals( self::$parsely_api_empty_response, $res );
	}

	/**
	 * Verifies Parse.ly Stats API arguments.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_publish_date_params_for_analytics_api
	 */
	public function test_api_params_of_analytics_api_call_on_valid_post_type_and_having_multiple_records(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$posts = $this->set_and_get_posts_data( 3, 5 );
		$res   = $this->get_parsely_stats_response(
			$posts,
			'post',
			null,
			array(
				'pub_date_start' => '2010-01-01',
				'pub_date_end'   => '2010-01-03',
			)
		);

		$this->assert_hooks_for_parsely_stats_response( true );
		self::assertEquals( self::$parsely_api_empty_response, $res );
	}

	/**
	 * Verifies Parse.ly Stats response.
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
	 * Verifies Parse.ly Stats response.
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
	 * Verifies Parse.ly Stats response.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 */
	public function test_parsely_stats_response_on_valid_post_type_and_no_post_data(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$res = $this->get_parsely_stats_response();

		$this->assert_hooks_for_parsely_stats_response( true );
		self::assertNull( $res );
	}

	/**
	 * Verifies Parse.ly Stats response.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_publish_date_params_for_analytics_api
	 */
	public function test_parsely_stats_response_on_valid_post_type_and_null_response_from_api(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$posts = $this->set_and_get_posts_data();
		$res   = $this->get_parsely_stats_response( $posts );

		$this->assert_hooks_for_parsely_stats_response( true );
		self::assertEquals( self::$parsely_api_empty_response, $res );
	}

	/**
	 * Verifies Parse.ly Stats response.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_publish_date_params_for_analytics_api
	 */
	public function test_parsely_stats_response_on_valid_post_type_and_error_response_from_api(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$posts = $this->set_and_get_posts_data( 1 );
		$res   = $this->get_parsely_stats_response( $posts, 'post', new WP_Error( 404, 'Not Found.' ) );

		$this->assert_hooks_for_parsely_stats_response( true );
		self::assertNull( isset( $res['data'] ) ? $res['data'] : null );
		self::assertEquals(
			array(
				'code'        => 404,
				'message'     => 'Not Found.',
				'htmlMessage' => '<p>Error while getting data for Parse.ly Stats.<br/>Detail: (404) Not Found.</p>',
			),
			isset( $res['error'] ) ? $res['error'] : null
		);
	}

	/**
	 * Verifies Parse.ly Stats response.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_publish_date_params_for_analytics_api
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_unique_stats_key_from_analytics
	 */
	public function test_parsely_stats_response_on_valid_post_type_and_having_data_from_api(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$posts        = $this->set_and_get_posts_data( 7, 10 );
		$api_response = array(
			array(
				'url'     => 'http://example.com/2010/01/01/title-1-publish',
				'metrics' => array(
					'views'       => 0,
					'visitors'    => 0,
					'avg_engaged' => 0,
				),
			),
			array(
				'url'     => 'http://example.com/2010/01/02/title-2-publish',
				'metrics' => array(
					'views'       => 1,
					'visitors'    => 1,
					'avg_engaged' => 0.01,
				),
			),
			array(
				'url'     => 'http://example.com/2010/01/03/title-3-publish',
				'metrics' => array(
					'views'       => 1100,
					'visitors'    => 1100000,
					'avg_engaged' => 1.1,
				),
			),
			array(
				'url' => 'http://example.com/2010/01/04/title-4-publish',
			),
			array(
				'url'     => 'http://example.com/2010/01/05/title-5-publish',
				'metrics' => array(
					'views' => 1,
				),
			),
			array(
				'url'     => 'http://example.com/2010/01/06/title-6-publish',
				'metrics' => array(
					'visitors' => 1,
				),
			),
			array(
				'url'     => 'http://example.com/2010/01/07/title-7-publish',
				'metrics' => array(
					'avg_engaged' => 0.01,
				),
			),
		);
		$res          = $this->get_parsely_stats_response(
			$posts,
			'post',
			$api_response,
			array(
				'pub_date_start' => '2010-01-01',
				'pub_date_end'   => '2010-01-07',
			)
		);

		$this->assert_hooks_for_parsely_stats_response( true );
		self::assertNull( isset( $res['error'] ) ? $res['error'] : null );
		self::assertEquals(
			array(
				'/2010/01/01/title-1-publish' => array(
					'page_views' => '0 page views',
					'visitors'   => '0 visitors',
					'avg_time'   => '0 sec. avg time',
				),
				'/2010/01/02/title-2-publish' => array(
					'page_views' => '1 page view',
					'visitors'   => '1 visitor',
					'avg_time'   => '1 sec. avg time',
				),
				'/2010/01/03/title-3-publish' => array(
					'page_views' => '1.1K page views',
					'visitors'   => '1.1M visitors',
					'avg_time'   => '1:06 avg time',
				),
				'/2010/01/05/title-5-publish' => array(
					'page_views' => '1 page view',
					'visitors'   => '0 visitors',
					'avg_time'   => '0 sec. avg time',
				),
				'/2010/01/06/title-6-publish' => array(
					'page_views' => '0 page views',
					'visitors'   => '1 visitor',
					'avg_time'   => '0 sec. avg time',
				),
				'/2010/01/07/title-7-publish' => array(
					'page_views' => '0 page views',
					'visitors'   => '0 visitors',
					'avg_time'   => '1 sec. avg time',
				),
			),
			isset( $res['data'] ) ? $res['data'] : null
		);
	}


	/**
	 * Verifies Parse.ly Stats response.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_parsely_stats_response
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_publish_date_params_for_analytics_api
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_unique_stats_key_from_analytics
	 */
	public function test_parsely_stats_response_on_valid_hierarchal_post_type_and_having_data_from_api(): void {
		$this->set_valid_conditions_for_parsely_stats( 'page' );

		$pages        = $this->set_and_get_posts_data( 1, 2, 'page' );
		$api_response = array(
			array(
				'url'     => 'http://example.com/2010/01/01/title-1-publish',
				'metrics' => array(
					'views'       => 1100,
					'visitors'    => 1100000,
					'avg_engaged' => 1.1,
				),
			),
		);
		$res          = $this->get_parsely_stats_response(
			$pages,
			'page',
			$api_response,
			array(
				'pub_date_start' => '2010-01-01',
				'pub_date_end'   => '2010-01-01',
			)
		);

		$this->assert_hooks_for_parsely_stats_response( true );
		self::assertNull( isset( $res['error'] ) ? $res['error'] : null );
		self::assertEquals(
			array(
				'/2010/01/01/title-1-publish' => array(
					'page_views' => '1.1K page views',
					'visitors'   => '1.1M visitors',
					'avg_time'   => '1:06 avg time',
				),
			),
			isset( $res['data'] ) ? $res['data'] : null
		);
	}

	/**
	 * Replicates behavior by which WordPress set post publish dates and then make API call
	 * to get Parse.ly stats.
	 *
	 * @param WP_Post[]                      $posts Available Posts.
	 * @param string                         $post_type Type of the post.
	 * @param Analytics_Post[]|WP_Error|null $api_response Mocked response that we return on calling API.
	 * @param Analytics_Post_API_Params|null $api_params API Parameters.
	 *
	 * @return Parsely_Posts_Stats_Response|null
	 */
	private function get_parsely_stats_response( $posts = array(), $post_type = 'post', $api_response = null, $api_params = null ) {
		$obj = $this->init_admin_columns_parsely_stats();

		ob_start();
		$this->show_content_on_parsely_stats_column( $obj, $posts, $post_type );
		ob_get_clean(); // Discard output to keep console clean while running tests.

		$api = Mockery::mock( Analytics_Posts_API::class, array( new Parsely() ) )->makePartial();
		if ( ! is_null( $api_params ) ) {
			$api->shouldReceive( 'get_posts_analytics' )
				->once()
				->withArgs(
					array(
						array_merge(
							$api_params,
							// Params which will not change.
							array(
								'period_start' => get_utc_date_format( -7 ),
								'period_end'   => get_utc_date_format(),
								'limit'        => 2000,
								'sort'         => 'avg_engaged',
							)
						),
					)
				)
				->andReturn( $api_response );
		} else {
			$api->shouldReceive( 'get_posts_analytics' )->once()->andReturn( $api_response );
		}

		return $obj->get_parsely_stats_response( $api );
	}

	/**
	 * Asserts status of hooks for Parse.ly Stats response.
	 *
	 * @param bool $assert_type Assert this condition on hooks.
	 */
	private function assert_hooks_for_parsely_stats_response( $assert_type = true ): void {
		$this->assert_wp_hooks_availablility(
			array( 'current_screen', 'manage_posts_custom_column', 'manage_pages_custom_column', 'admin_footer' ),
			$assert_type
		);
	}

	/**
	 * Initializes Admin_Columns_Parsely_Stats object.
	 *
	 * @return Admin_Columns_Parsely_Stats
	 */
	private function init_admin_columns_parsely_stats() {
		$obj = new Admin_Columns_Parsely_Stats( new Parsely() );
		$obj->run();

		return $obj;
	}

	/**
	 * Sets empty key and secret.
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
	 * Sets empty API Secret.
	 *
	 * @param string $post_type Type of the post.
	 */
	private function set_empty_api_secret( $post_type = 'post' ): void {
		TestCase::set_options(
			array(
				'apikey'           => 'test',
				'api_secret'       => '',
				'track_post_types' => array( $post_type ),
			)
		);

		set_current_screen( 'edit-post' );
	}

	/**
	 * Sets empty track_post_types.
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
	 * Sets valid plugin_options.
	 *
	 * @param string $post_type Type of the post.
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
	 * Sets valid conditions under which we add hooks for Parse.ly Stats.
	 *
	 * @param string $post_type Type of the post.
	 */
	private function set_valid_conditions_for_parsely_stats( $post_type = 'post' ): void {
		$this->set_valid_plugin_options( $post_type );
		set_current_screen( "edit-$post_type" );
	}
}

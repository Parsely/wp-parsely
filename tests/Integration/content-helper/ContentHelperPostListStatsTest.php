<?php
/**
 * Integration Tests: Parse.ly Stats Column in Admin Screens
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\ContentHelper;

use Mockery;
use Parsely\Content_Helper\Post_List_Stats;
use Parsely\Parsely;
use Parsely\RemoteAPI\Analytics_Posts_API;
use Parsely\Tests\ContentHelper\ContentHelperFeatureTest;
use Parsely\Tests\Integration\TestCase;
use WP_Error;
use WP_Post;
use WP_Scripts;

/**
 * Integration Tests for Parse.ly Stats Column in Admin Screens.
 *
 * @since 3.7.0
 *
 * @phpstan-import-type Analytics_Post_API_Params from Analytics_Posts_API
 * @phpstan-import-type Analytics_Post from Analytics_Posts_API
 * @phpstan-import-type Parsely_Posts_Stats_Response from Post_List_Stats
 */
final class ContentHelperPostListStatsTest extends ContentHelperFeatureTest {
	/**
	 * Internal variable.
	 *
	 * @var string
	 */
	private static $parsely_stats_column_header = 'Parse.ly Stats (7d)';

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
	 * Asserts the enqueueing status of the feature's assets according to the
	 * passed filter values.
	 *
	 * @param mixed $global_filter_value The value of the global filter.
	 * @param mixed $feature_filter_value The value of the feature filter.
	 * @param bool  $expected Whether the assets should be enqueued.
	 * @param mixed ...$additional_args Any required additional arguments.
	 *
	 * @since 3.9.0
	 */
	protected function assert_enqueued_status(
		$global_filter_value,
		$feature_filter_value,
		bool $expected,
		...$additional_args
	): void {
		/**
		 * The WordPress screen on which the test will run.
		 *
		 * @var string
		 */
		$screen = $additional_args[0] ?? 'edit-post';

		parent::set_filters(
			Post_List_Stats::get_feature_filter_name(),
			$global_filter_value,
			$feature_filter_value
		);

		$this->set_valid_conditions_for_parsely_stats();
		set_current_screen( $screen ); // Overrides screen set by previous function.
		$this->mock_parsely_stats_response( array() );
		$this->assert_parsely_stats_admin_script( $expected );
		$this->assert_parsely_stats_admin_styles( $expected );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * current user does not have enough capabilities.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::can_enable_feature
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Utils\convert_endpoint_to_filter_key
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 *
	 * @group content-helper
	 */
	public function test_assets_do_not_get_enqueued_when_user_has_not_enough_capabilities(): void {
		$this->login_as_contributor();
		self::assert_enqueued_status( null, null, false );
	}

	/**
	 * Verifies that the run() method does not enqueue the assets when the
	 * active page is not the Post List.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::can_enable_feature
	 * @covers \Parsely\Content_Helper\Content_Helper_Feature::get_global_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_feature_filter_name
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @covers \Parsely\RemoteAPI\Remote_API_Base::is_user_allowed_to_make_api_call
	 * @covers \Parsely\Utils\convert_endpoint_to_filter_key
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 *
	 * @group content-helper
	 */
	public function test_assets_do_not_get_enqueued_when_page_is_not_post_list(): void {
		$this->assert_enqueued_status( null, null, false, 'dashboard' );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats styles.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_styles_of_parsely_stats_admin_column_on_empty_plugin_options(): void {
		$this->set_empty_plugin_options();
		$this->assert_parsely_stats_admin_styles( false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats styles.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_styles_of_parsely_stats_admin_column_on_empty_api_secret(): void {
		$this->set_empty_api_secret();
		$this->assert_parsely_stats_admin_styles( false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats styles.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_styles_of_parsely_stats_admin_column_on_empty_track_post_types(): void {
		$this->set_empty_track_post_types();
		$this->assert_parsely_stats_admin_styles( false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats styles.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_styles_of_parsely_stats_admin_column_on_invalid_track_post_type(): void {
		$this->set_valid_plugin_options();
		set_current_screen( 'edit-page' );
		$this->assert_parsely_stats_admin_styles( false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats styles.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_styles
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
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
		$this->init_post_list_stats();

		do_action( 'current_screen' ); // phpcs:ignore
		do_action( 'admin_enqueue_scripts' ); // phpcs:ignore

		$handle = 'post-list-stats-styles';
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
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::add_parsely_stats_column_on_list_view
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_parsely_stats_column_visibility_on_empty_plugin_options(): void {
		$this->set_empty_plugin_options();

		$this->assert_hooks_for_parsely_stats_column( false );
		self::assertNotContains( self::$parsely_stats_column_header, $this->get_admin_columns() );
	}


	/**
	 * Verifies Parse.ly Stats column visibility.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::add_parsely_stats_column_on_list_view
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_parsely_stats_column_visibility_on_empty_api_secret(): void {
		$this->set_empty_api_secret();

		self::assertNotContains( self::$parsely_stats_column_header, $this->get_admin_columns() );
		$this->assert_hooks_for_parsely_stats_column( false );
	}

	/**
	 * Verifies Parse.ly Stats column visibility.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::add_parsely_stats_column_on_list_view
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_parsely_stats_column_visibility_on_empty_track_post_types(): void {
		$this->set_empty_track_post_types();

		self::assertNotContains( self::$parsely_stats_column_header, $this->get_admin_columns() );
		$this->assert_hooks_for_parsely_stats_column( true );
	}

	/**
	 * Verifies Parse.ly Stats column visibility.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::add_parsely_stats_column_on_list_view
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
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
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::add_parsely_stats_column_on_list_view
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_parsely_stats_column_visibility_on_valid_posts(): void {
		$this->set_valid_conditions_for_parsely_stats();

		self::assertContains( self::$parsely_stats_column_header, $this->get_admin_columns() );
		$this->assert_hooks_for_parsely_stats_column( true );
	}

	/**
	 * Verifies Parse.ly Stats column visibility.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::add_parsely_stats_column_on_list_view
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
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
	private function get_admin_columns(): array {
		$obj = $this->init_post_list_stats();

		do_action( 'current_screen' ); // phpcs:ignore

		return $obj->add_parsely_stats_column_on_list_view( array() );
	}

	/**
	 * Asserts status of hooks for Parse.ly Stats column.
	 *
	 * @param bool $assert_type Assert this condition on hooks.
	 */
	private function assert_hooks_for_parsely_stats_column( bool $assert_type ): void {
		$this->assert_wp_hooks_availability(
			array( 'current_screen', 'manage_posts_columns', 'manage_pages_columns' ),
			$assert_type
		);
	}

	/**
	 * Verifies content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @covers \Parsely\Content_Helper\Post_List_Stats::update_published_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_empty_plugin_options(): void {
		$this->set_empty_plugin_options();

		$obj    = $this->init_post_list_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column();

		$this->assert_hooks_for_parsely_stats_content( false );
		self::assertSame( '', $output );
		self::assertSame( array(), $this->get_utc_published_times_property( $obj ) );
	}

	/**
	 * Verifies content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @covers \Parsely\Content_Helper\Post_List_Stats::update_published_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_empty_api_secret(): void {
		$this->set_empty_api_secret();

		$obj    = $this->init_post_list_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column();

		$this->assert_hooks_for_parsely_stats_content( false );
		self::assertSame( '', $output );
		self::assertSame( array(), $this->get_utc_published_times_property( $obj ) );
	}

	/**
	 * Verifies content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @covers \Parsely\Content_Helper\Post_List_Stats::update_published_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_empty_track_post_types(): void {
		$this->set_empty_track_post_types();

		$obj    = $this->init_post_list_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column();

		$this->assert_hooks_for_parsely_stats_content( true );
		self::assertSame( '', $output );
		self::assertSame( array(), $this->get_utc_published_times_property( $obj ) );
	}

	/**
	 * Verifies content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @covers \Parsely\Content_Helper\Post_List_Stats::update_published_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_invalid_track_post_types(): void {
		$this->set_valid_plugin_options();
		set_current_screen( 'edit-page' );

		$obj    = $this->init_post_list_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column();

		$this->assert_hooks_for_parsely_stats_content( true );
		self::assertSame( '', $output );
		self::assertSame( array(), $this->get_utc_published_times_property( $obj ) );
	}

	/**
	 * Verifies content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @covers \Parsely\Content_Helper\Post_List_Stats::update_published_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_valid_posts(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$obj    = $this->init_post_list_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column();

		$this->assert_hooks_for_parsely_stats_content( true );
		self::assertSame(
			$this->get_parsely_stats_placeholder_content( '/2010/01/01/title-1-publish' ) .
			$this->get_parsely_stats_placeholder_content( '/2010/01/02/title-2-publish' ) .
			$this->get_parsely_stats_placeholder_content( '/2010/01/03/title-3-publish' ) .
			$this->get_parsely_stats_placeholder_content( '/' ) .
			$this->get_parsely_stats_placeholder_content( '/' ),
			$output
		);
		self::assertSame(
			array( '2010-01-01 05:00:00', '2010-01-02 05:00:00', '2010-01-03 05:00:00' ),
			$this->get_utc_published_times_property( $obj )
		);
	}


	/**
	 * Verifies content of Parse.ly Stats column.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 * @covers \Parsely\Content_Helper\Post_List_Stats::update_published_times_and_show_placeholder
	 */
	public function test_content_of_parsely_stats_column_on_valid_pages(): void {
		$this->set_valid_conditions_for_parsely_stats( 'page' );

		$obj    = $this->init_post_list_stats();
		$output = $this->set_posts_data_and_get_content_of_parsely_stats_column();

		$this->assert_hooks_for_parsely_stats_content( true );
		self::assertSame(
			$this->get_parsely_stats_placeholder_content( '/2010/01/01/title-1-publish' ) .
			$this->get_parsely_stats_placeholder_content( '/2010/01/02/title-2-publish' ) .
			$this->get_parsely_stats_placeholder_content( '/2010/01/03/title-3-publish' ) .
			$this->get_parsely_stats_placeholder_content( '/' ) .
			$this->get_parsely_stats_placeholder_content( '/' ),
			$output
		);
		self::assertSame(
			array( '2010-01-01 05:00:00', '2010-01-02 05:00:00', '2010-01-03 05:00:00' ),
			$this->get_utc_published_times_property( $obj )
		);
	}

	/**
	 * Sets posts data and get content of Parse.ly Stats column.
	 *
	 * @param string $post_type Type of the post.
	 *
	 * @return string
	 */
	private function set_posts_data_and_get_content_of_parsely_stats_column( string $post_type = 'post' ): string {
		$posts = $this->set_and_get_posts_data( 3, 2, $post_type );

		return $this->get_content_of_parsely_stats_column( $posts, $post_type );
	}

	/**
	 * Sets posts data.
	 *
	 * @param int    $publish_num_of_posts Number of publish posts that we have to create.
	 * @param int    $draft_num_of_posts Number of draft posts that we have to create.
	 * @param string $post_type Type of the post.
	 *
	 * @return array<WP_Post>
	 */
	private function set_and_get_posts_data(
		int $publish_num_of_posts = 1, int $draft_num_of_posts = 0, string $post_type = 'post'
	): array {
		return array_merge(
			$this->create_and_get_test_posts( $publish_num_of_posts ),
			$this->create_and_get_test_posts( $draft_num_of_posts, $post_type, 'draft' )
		);
	}

	/**
	 * Gets content of Parse.ly Stats column.
	 *
	 * @param array<WP_Post> $posts Available posts.
	 * @param string         $post_type Type of the post.
	 *
	 * @return string
	 */
	private function get_content_of_parsely_stats_column( array $posts, string $post_type ): string {
		ob_start();
		$this->show_content_on_parsely_stats_column( $posts, $post_type );

		return (string) ob_get_clean();
	}

	/**
	 * Replicates behavior by which WordPress set post publish dates and then make API call
	 * to get Parse.ly stats.
	 *
	 * @param array<WP_Post> $posts Available posts.
	 * @param string         $post_type Type of the post.
	 */
	private function show_content_on_parsely_stats_column( array $posts, string $post_type ): void {
		do_action( 'current_screen' ); // phpcs:ignore

		foreach ( $posts as $current_post ) {
			global $post;
			$post        = $current_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
			$column_name = 'parsely-stats';

			do_action( "manage_{$post_type}s_custom_column", $column_name ); // phpcs:ignore
		}
	}

	/**
	 * Gets placeholder content of Parse.ly stats column.
	 *
	 * @param string $key Stats Key.
	 *
	 * @return string
	 */
	private function get_parsely_stats_placeholder_content( string $key ): string {
		return "		<div class=\"parsely-post-stats\" data-stats-key=\"$key\">\n			<span class=\"parsely-post-stats-placeholder\">...</span>\n		</div>\n		";
	}

	/**
	 * Gets utc_published_times property of given object.
	 *
	 * @param Post_List_Stats $obj Instance of Post_List_Stats.
	 *
	 * @return array<string>
	 */
	private function get_utc_published_times_property( Post_List_Stats $obj ): array {
		/**
		 * Variable.
		 *
		 * @var array<string>
		 */
		return $this->get_private_property( Post_List_Stats::class, 'utc_published_times' )->getValue( $obj );
	}

	/**
	 * Asserts status of hooks for showing Parse.ly Stats content inside column.
	 *
	 * @param bool $assert_type Assert this condition on hooks.
	 */
	private function assert_hooks_for_parsely_stats_content( bool $assert_type = true ): void {
		$this->assert_wp_hooks_availability(
			array( 'current_screen', 'manage_posts_custom_column', 'manage_pages_custom_column' ),
			$assert_type
		);
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_script_of_parsely_stats_admin_column_on_empty_plugin_options(): void {
		$this->set_empty_plugin_options();
		$this->mock_parsely_stats_response( null );

		$this->assert_parsely_stats_admin_script( false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_script_of_parsely_stats_admin_column_on_empty_api_secret(): void {
		$this->set_empty_api_secret();
		$this->mock_parsely_stats_response( array() );

		$this->assert_parsely_stats_admin_script( false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_script_of_parsely_stats_admin_column_on_empty_track_post_types(): void {
		$this->set_empty_track_post_types();
		$this->mock_parsely_stats_response( null );

		$this->assert_parsely_stats_admin_script( false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_script_of_parsely_stats_admin_column_on_invalid_track_post_types(): void {
		$this->set_valid_plugin_options();
		set_current_screen( 'edit-page' );
		$this->mock_parsely_stats_response( null );

		$this->assert_parsely_stats_admin_script( false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_script_of_parsely_stats_admin_column_on_valid_posts_and_empty_response(): void {
		$this->set_valid_conditions_for_parsely_stats();
		$this->mock_parsely_stats_response( null );

		$this->assert_parsely_stats_admin_script( false );
	}

	/**
	 * Verifies enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::enqueue_parsely_stats_script_with_data
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_script_of_parsely_stats_admin_column_on_valid_posts_and_valid_response(): void {
		$this->set_valid_conditions_for_parsely_stats();
		$this->mock_parsely_stats_response( array() );

		$this->assert_parsely_stats_admin_script( true );

		/**
		 * Internal Variable.
		 *
		 * @var WP_Scripts
		 */
		global $wp_scripts;

		ob_start();

		global $wp_version;
		if ( true === version_compare( substr( $wp_version, 0, 3 ), '6.3', '>=' ) ) {
			var_dump( $wp_scripts->get_inline_script_data( 'post-list-stats-script', 'before' ) ); // phpcs:ignore
		} else {
			var_dump( $wp_scripts->print_inline_script( 'post-list-stats-script', 'before' ) ); // phpcs:ignore
		}

		$output = (string) ob_get_clean();

		self::assertStringContainsString( 'window.wpParselyPostsStatsResponse = \'[]\';', $output );
	}

	/**
	 * Mock function get_parsely_stats_response from class.
	 *
	 * @param null|array<mixed> $return_value Value that we have to return from mock function.
	 *
	 * @return Post_List_Stats
	 */
	private function mock_parsely_stats_response( ?array $return_value ): Post_List_Stats {
		$obj = Mockery::mock( Post_List_Stats::class, array( new Parsely() ) )->makePartial();
		$obj->shouldReceive( 'get_parsely_stats_response' )->once()->andReturn( $return_value );
		$obj->run();

		return $obj;
	}


	/**
	 * Verifies Parse.ly API call and enqueued status of Parse.ly Stats script.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_parsely_stats_response
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_should_not_call_parsely_api_on_empty_api_secret_and_hidden_parsely_stats_column(): void {
		$this->set_empty_api_secret();
		$this->mock_is_parsely_stats_column_hidden( true );

		$this->assert_parsely_stats_admin_script( false );
	}

	/**
	 * Mock function is_parsely_stats_column_hidden from class.
	 *
	 * @param bool $return_value Value that we have to return from mock function.
	 *
	 * @return Post_List_Stats
	 */
	private function mock_is_parsely_stats_column_hidden( bool $return_value = false ): Post_List_Stats {
		$obj = Mockery::mock( Post_List_Stats::class, array( new Parsely() ) )->makePartial();
		$obj->shouldReceive( 'is_parsely_stats_column_hidden' )->once()->andReturn( $return_value );
		$obj->run();

		return $obj;
	}

	/**
	 * Asserts script of Parse.ly Stats.
	 *
	 * @param bool $assert_type Indicates wether we are asserting for TRUE or FALSE.
	 */
	private function assert_parsely_stats_admin_script( bool $assert_type ): void {
		do_action( 'current_screen' ); // phpcs:ignore
		do_action( 'admin_footer' ); // phpcs:ignore

		$handle = 'post-list-stats-script';
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
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_parsely_stats_response
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
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
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_parsely_stats_response
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
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
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_parsely_stats_response
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_publish_date_params_for_analytics_api
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
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
		self::assertSame( self::$parsely_api_empty_response, $res );
	}

	/**
	 * Verifies Parse.ly Stats API arguments.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_parsely_stats_response
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_publish_date_params_for_analytics_api
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
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
		self::assertSame( self::$parsely_api_empty_response, $res );
	}

	/**
	 * Verifies Parse.ly Stats response.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_parsely_stats_response
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
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
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_parsely_stats_response
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
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
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_parsely_stats_response
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
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
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_parsely_stats_response
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_publish_date_params_for_analytics_api
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_parsely_stats_response_on_valid_post_type_and_null_response_from_api(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$posts = $this->set_and_get_posts_data();
		$res   = $this->get_parsely_stats_response( $posts );

		$this->assert_hooks_for_parsely_stats_response( true );
		self::assertSame( self::$parsely_api_empty_response, $res );
	}

	/**
	 * Verifies Parse.ly Stats response.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_parsely_stats_response
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_publish_date_params_for_analytics_api
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
	 */
	public function test_parsely_stats_response_on_valid_post_type_and_error_response_from_api(): void {
		$this->set_valid_conditions_for_parsely_stats();

		$posts = $this->set_and_get_posts_data( 1 );
		$res   = $this->get_parsely_stats_response( $posts, 'post', new WP_Error( 404, 'Not Found.' ) );

		$this->assert_hooks_for_parsely_stats_response( true );
		self::assertNull( $res['data'] ?? null );
		self::assertSame(
			array(
				'code'        => 404,
				'message'     => 'Not Found.',
				'htmlMessage' => '<p>Error while getting data for Parse.ly Stats.<br/>Detail: (404) Not Found.</p>',
			),
			$res['error'] ?? null
		);
	}

	/**
	 * Verifies Parse.ly Stats response.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_parsely_stats_response
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_publish_date_params_for_analytics_api
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_unique_stats_key_from_analytics
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
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
				'url'     => 'http://example.com/2010/01/03/title-4-publish',
				'metrics' => array(
					'views'       => 1100,
					'visitors'    => 1100000,
					'avg_engaged' => 0.992,
				),
			),
			array(
				'url'     => 'http://example.com/2010/01/03/title-5-publish',
				'metrics' => array(
					'views'       => 1100,
					'visitors'    => 1100000,
					'avg_engaged' => 0.995,
				),
			),
			array(
				'url' => 'http://example.com/2010/01/04/title-6-publish',
			),
			array(
				'url'     => 'http://example.com/2010/01/05/title-7-publish',
				'metrics' => array(
					'views' => 1,
				),
			),
			array(
				'url'     => 'http://example.com/2010/01/06/title-8-publish',
				'metrics' => array(
					'visitors' => 1,
				),
			),
			array(
				'url'     => 'http://example.com/2010/01/07/title-9-publish',
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
		self::assertNull( $res['error'] ?? null );
		self::assertSame(
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
				'/2010/01/03/title-4-publish' => array(
					'page_views' => '1.1K page views',
					'visitors'   => '1.1M visitors',
					'avg_time'   => '59 sec. avg time',
				),
				'/2010/01/03/title-5-publish' => array(
					'page_views' => '1.1K page views',
					'visitors'   => '1.1M visitors',
					'avg_time'   => '1:00 avg time',
				),
				'/2010/01/05/title-7-publish' => array(
					'page_views' => '1 page view',
					'visitors'   => '0 visitors',
					'avg_time'   => '0 sec. avg time',
				),
				'/2010/01/06/title-8-publish' => array(
					'page_views' => '0 page views',
					'visitors'   => '1 visitor',
					'avg_time'   => '0 sec. avg time',
				),
				'/2010/01/07/title-9-publish' => array(
					'page_views' => '0 page views',
					'visitors'   => '0 visitors',
					'avg_time'   => '1 sec. avg time',
				),
			),
			$res['data'] ?? null
		);
	}


	/**
	 * Verifies Parse.ly Stats response.
	 *
	 * @covers \Parsely\Content_Helper\Post_List_Stats::__construct
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_parsely_stats_response
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_publish_date_params_for_analytics_api
	 * @covers \Parsely\Content_Helper\Post_List_Stats::get_unique_stats_key_from_analytics
	 * @covers \Parsely\Content_Helper\Post_List_Stats::is_tracked_as_post_type
	 * @covers \Parsely\Content_Helper\Post_List_Stats::run
	 * @covers \Parsely\Content_Helper\Post_List_Stats::set_current_screen
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
		self::assertNull( $res['error'] ?? null );
		self::assertSame(
			array(
				'/2010/01/01/title-1-publish' => array(
					'page_views' => '1.1K page views',
					'visitors'   => '1.1M visitors',
					'avg_time'   => '1:06 avg time',
				),
			),
			$res['data'] ?? null
		);
	}

	/**
	 * Replicates behavior by which WordPress set post publish dates and then make API call
	 * to get Parse.ly stats.
	 *
	 * @param array<WP_Post>                      $posts Available Posts.
	 * @param string                              $post_type Type of the post.
	 * @param array<Analytics_Post>|WP_Error|null $api_response Mocked response that we return on calling API.
	 * @param Analytics_Post_API_Params|null      $api_params API Parameters.
	 *
	 * @return Parsely_Posts_Stats_Response|null
	 */
	private function get_parsely_stats_response(
		array $posts = array(), string $post_type = 'post', $api_response = null, $api_params = null
	) {
		$obj = $this->init_post_list_stats();

		ob_start();
		$this->show_content_on_parsely_stats_column( $posts, $post_type );
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
								'period_start' => Analytics_Posts_API::ANALYTICS_API_DAYS_LIMIT . 'd',
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
		$this->assert_wp_hooks_availability(
			array( 'current_screen', 'manage_posts_custom_column', 'manage_pages_custom_column', 'admin_footer' ),
			$assert_type
		);
	}

	/**
	 * Initializes Post_List_Stats object.
	 *
	 * @return Post_List_Stats
	 */
	private function init_post_list_stats(): Post_List_Stats {
		$obj = new Post_List_Stats( new Parsely() );
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
	private function set_empty_api_secret( string $post_type = 'post' ): void {
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
	private function set_valid_plugin_options( string $post_type = 'post' ): void {
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
	private function set_valid_conditions_for_parsely_stats( string $post_type = 'post' ): void {
		$this->set_valid_plugin_options( $post_type );
		set_current_screen( "edit-$post_type" );
	}
}

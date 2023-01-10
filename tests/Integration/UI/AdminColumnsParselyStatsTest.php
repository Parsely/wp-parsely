<?php
/**
 * Integration Tests: Parsely Stats Column in Admin Screens
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Admin_Columns_Parsely_Stats;

/**
 * Integration Tests for Parsely Stats Column in Admin Screens.
 *
 * @since 3.7.0
 */
final class AdminColumnsParselyStatsTest extends TestCase {
	/**
	 * Verifies that styles of Parsely Stats Admin Column are enqueued.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_styles
	 */
	public function test_styles_of_parsely_stats_admin_column_are_enqueued(): void {
		$this->set_valid_pre_conditions_for_parsely_stats();
		$this->assert_admin_columns_styles( true );
	}


	/**
	 * Verifies that styles of Parsely Stats Admin Column are enqueued.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::enqueue_parsely_stats_styles
	 */
	public function test_styles_of_parsely_stats_admin_column_are_not_enqueued_if_conditions_are_not_met(): void {
		// 1. No apikey and api_secret.
		$this->set_empty_plugin_options();
		set_current_screen( 'edit-post' );
		$this->assert_admin_columns_styles( false );

		// 2. Track post as `Non-Post` type in plugin settings.
		$this->set_empty_track_post_types();
		set_current_screen( 'edit-post' );
		$this->assert_admin_columns_styles( false );

		// 3. Show page list view while script is enqueued on post list view.
		$this->set_valid_plugin_options();
		set_current_screen( 'edit-page' );
		$this->assert_admin_columns_styles( false );
	}

	/**
	 * Verifies Parse.ly Stats column visibility based on different conditions.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::add_parsely_stats_column_on_list_view
	 */
	public function test_parsely_stats_column_visibility(): void {
		$actions_to_verify = array( 'current_screen', 'manage_posts_columns', 'manage_pages_columns' );

		// 1. No apikey and api_secret.
		$this->set_empty_plugin_options();
		set_current_screen( 'edit-post' );
		self::assertNotContains( 'Parse.ly Stats', $this->get_admin_columns() );
		$this->assert_false_actions( $actions_to_verify );

		// 2. API Key and Secret is set but no track post type.
		$this->set_empty_track_post_types();
		set_current_screen( 'edit-post' );
		self::assertNotContains( 'Parse.ly Stats', $this->get_admin_columns() );
		$this->assert_true_actions( $actions_to_verify );

		// 3. Verify needed hooks and column on Posts if conditions are met.
		$this->set_valid_pre_conditions_for_parsely_stats();
		self::assertContains( 'Parse.ly Stats', $this->get_admin_columns() );
		$this->assert_true_actions( $actions_to_verify );

		// 3. Verify needed hooks and column on Pages if conditions are met.
		$this->set_valid_pre_conditions_for_parsely_stats( 'page' );
		self::assertContains( 'Parse.ly Stats', $this->get_admin_columns() );
		$this->assert_true_actions( $actions_to_verify );
	}

	/**
	 * Get Admin Columns.
	 *
	 * @return array<string>
	 */
	private function get_admin_columns() {
		$admin_columns_parsely_stats = new Admin_Columns_Parsely_Stats( new Parsely() );
		$admin_columns_parsely_stats->run();

		do_action( 'current_screen' ); // phpcs:ignore

		return $admin_columns_parsely_stats->add_parsely_stats_column_on_list_view( array() );
	}

	/**
	 * Assert on Parse.ly Stats styles.
	 *
	 * @param bool $assert_type Indicates wether we are asserting for TRUE or FALSE.
	 *
	 * @return void
	 */
	private function assert_admin_columns_styles( bool $assert_type ): void {
		( new Admin_Columns_Parsely_Stats( new Parsely() ) )->run();

		// phpcs:disable
		do_action( 'current_screen' );
		do_action( 'admin_enqueue_scripts' );
		// phpcs:enable

		$handle = 'parsely-stats-admin-styles';
		if ( $assert_type ) {
			$this->assert_is_style_enqueued( $handle );
			wp_dequeue_style( $handle ); // Dequeue to start fresh for next test.
		} else {
			$this->assert_is_style_not_enqueued( $handle );
		}
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
	private function set_valid_pre_conditions_for_parsely_stats( $post_type = 'post' ): void {
		$this->set_valid_plugin_options( $post_type );
		set_current_screen( "edit-$post_type" );
	}
}

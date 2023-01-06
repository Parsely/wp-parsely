<?php
/**
 * Integration Tests: Parsely Stats Column in Admin Screens
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use WP_Error;
use Parsely\Parsely;
use Parsely\RemoteAPI\Analytics_Posts_API;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Admin_Columns_Parsely_Stats;

use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertNull;
use function PHPUnit\Framework\assertStringContainsString;

/**
 * Integration Tests for Parsely Stats Column in Admin Screens.
 *
 * @since 3.7.0
 *
 * @phpstan-import-type Analytics_Post_API_Params from Analytics_Posts_API
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
		TestCase::set_options(
			array(
				'apikey'           => '',
				'api_secret'       => '',
				'track_post_types' => array(),
			)
		);

		set_current_screen( 'edit-post' );
		$this->assert_admin_columns_styles( false );

		// 2. Track post as `Non-Post` type in plugin settings.
		TestCase::set_options(
			array(
				'apikey'           => 'test',
				'api_secret'       => 'test',
				'track_post_types' => array(),
			)
		);

		set_current_screen( 'edit-post' );
		$this->assert_admin_columns_styles( false );

		// 3. Show page list view while script is enqueued on post list view.
		TestCase::set_options(
			array(
				'apikey'           => 'test',
				'api_secret'       => 'test',
				'track_post_types' => array( 'post' ),
			)
		);

		set_current_screen( 'edit-page' );
		$this->assert_admin_columns_styles( false );
	}

	/**
	 * Verifies that styles of Parsely Stats Admin Column are enqueued.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::show_parsely_stats_api_error
	 */
	public function test_show_parsely_stats_api_notice_in_case_of_error(): void {
		$parsely_stats_api_error = self::getPrivateProperty( Admin_Columns_Parsely_Stats::class, 'parsely_stats_api_error' );
		$admin_parsely_stats     = new Admin_Columns_Parsely_Stats( new Parsely() );
		$parsely_stats_api_error->setValue( $admin_parsely_stats, new WP_Error( 404, 'Not Found' ) );

		$this->set_valid_pre_conditions_for_parsely_stats();
		$admin_parsely_stats->run();

		ob_start();
		do_action( 'admin_notices' ); // phpcs:ignore
		$output = (string) ob_get_clean();

		assertStringContainsString( 'error-parsely-stats', $output ); // Verify class.
		assertStringContainsString( 'Detail: (404) Not Found', $output ); // Verify error details.
	}

	/**
	 * Verifies that styles of Parsely Stats Admin Column are enqueued.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::run
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::set_current_screen
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::is_tracked_as_post_type
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::show_parsely_stats_api_error
	 */
	public function test_do_not_show_parsely_stats_api_notice_in_absense_of_error(): void {
		$admin_parsely_stats = new Admin_Columns_Parsely_Stats( new Parsely() );

		$this->set_valid_pre_conditions_for_parsely_stats();
		$admin_parsely_stats->run();

		ob_start();
		do_action( 'admin_notices' ); // phpcs:ignore
		$output = (string) ob_get_clean();

		assertEquals( '', $output );
	}

	/**
	 * Verifies null date params if there are no posts.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_publish_date_params_for_analytics_api
	 */
	public function test_get_publish_date_params_for_analytics_api_should_return_null_if_there_is_no_post(): void {
		$admin_parsely_stats                       = new Admin_Columns_Parsely_Stats( new Parsely() );
		$get_publish_date_params_for_analytics_api = self::getPrivateMethod( Admin_Columns_Parsely_Stats::class, 'get_publish_date_params_for_analytics_api' );
		$date_params                               = $get_publish_date_params_for_analytics_api->invokeArgs( $admin_parsely_stats, array( array() ) );

		assertNull( $date_params );
	}

	/**
	 * Verifies same date params if there is only 1 post.
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_publish_date_params_for_analytics_api
	 */
	public function test_get_publish_date_params_for_analytics_api_should_return_same_date_params_in_case_of_single_post(): void {
		$admin_parsely_stats                       = new Admin_Columns_Parsely_Stats( new Parsely() );
		$get_publish_date_params_for_analytics_api = self::getPrivateMethod( Admin_Columns_Parsely_Stats::class, 'get_publish_date_params_for_analytics_api' );

		$post_ids = $this->create_test_posts( 1 );
		$posts    = $this->get_test_posts( $post_ids );

		/**
		 * Variable.
		 *
		 * @var Analytics_Post_API_Params
		 */
		$date_params = $get_publish_date_params_for_analytics_api->invokeArgs( $admin_parsely_stats, array( $posts ) );

		assertEquals( '2010-01-01', isset( $date_params['pub_date_start'] ) ? $date_params['pub_date_start'] : '' );
		assertEquals( '2010-01-01', isset( $date_params['pub_date_end'] ) ? $date_params['pub_date_end'] : '' );
	}


	/**
	 * Verifies min max date params if there are multiple posts
	 *
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::__construct
	 * @covers \Parsely\UI\Admin_Columns_Parsely_Stats::get_publish_date_params_for_analytics_api
	 */
	public function test_get_publish_date_params_for_analytics_api_should_return_min_max_date_params(): void {
		$admin_parsely_stats                       = new Admin_Columns_Parsely_Stats( new Parsely() );
		$get_publish_date_params_for_analytics_api = self::getPrivateMethod( Admin_Columns_Parsely_Stats::class, 'get_publish_date_params_for_analytics_api' );

		$post_ids = $this->create_test_posts( 10 );
		$posts    = $this->get_test_posts( $post_ids );

		/**
		 * Variable.
		 *
		 * @var Analytics_Post_API_Params
		 */
		$date_params = $get_publish_date_params_for_analytics_api->invokeArgs( $admin_parsely_stats, array( $posts ) );

		assertEquals( '2010-01-01', isset( $date_params['pub_date_start'] ) ? $date_params['pub_date_start'] : '' );
		assertEquals( '2010-01-10', isset( $date_params['pub_date_end'] ) ? $date_params['pub_date_end'] : '' );
	}

	/**
	 * Set valid conditions under which we add hooks for Parse.ly Stats.
	 *
	 * @return void
	 */
	private function set_valid_pre_conditions_for_parsely_stats(): void {
		TestCase::set_options(
			array(
				'apikey'           => 'test',
				'api_secret'       => 'test',
				'track_post_types' => array( 'post' ),
			)
		);

		set_current_screen( 'edit-post' );
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

		$handle = 'parsely-admin-columns-styles';
		if ( $assert_type ) {
			$this->assert_is_style_enqueued( $handle );
			wp_dequeue_style( $handle ); // Dequeue to start fresh for next test.
		} else {
			$this->assert_is_style_not_enqueued( $handle );
		}
	}
}

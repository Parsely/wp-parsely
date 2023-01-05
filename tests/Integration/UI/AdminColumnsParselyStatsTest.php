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

use WP_Scripts;

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
		TestCase::set_options(
			array(
				'apikey'           => 'test',
				'api_secret'       => 'test',
				'track_post_types' => array( 'post' ),
			) 
		);

		set_current_screen( 'edit-post' );
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
			$this->assert_is_style_registered( $handle );
			$this->assert_is_style_enqueued( $handle );
		} else {
			$this->assert_is_style_not_registered( $handle );
			$this->assert_is_style_not_enqueued( $handle );
		}
	}
}

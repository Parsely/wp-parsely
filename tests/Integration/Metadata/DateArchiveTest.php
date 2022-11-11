<?php
/**
 * Integration Tests: Date Archive pages metadata
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\StructuredData;

use Parsely\Metadata;
use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration Tests for Date Archive pages metadata.
 *
 * @see https://www.parse.ly/help/integration/jsonld
 */
final class DateArchiveTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var $parsely Holds the Parsely object.
	 */
	private static $parsely;

	/**
	 * Internal variable.
	 *
	 * @var $metadata Holds the Metadata object.
	 */
	private static $metadata;

	/**
	 * Runs once before all tests.
	 */
	public static function set_up_before_class(): void {
		self::$parsely  = new Parsely();
		self::$metadata = new Metadata( self::$parsely );

		self::factory()->post->create( array( 'post_date' => '2022-10-31 23:59:59' ) );
	}

	/**
	 * Setup method called before each test.
	 */
	public function set_up(): void {
		parent::set_up();

		$this->set_permalink_structure( '/%year%/%monthnum%/%day%/%hour%/%minute%/%second%/%postname%/' );
	}

	/**
	 * Verifies headline metadata of Yearly Archive page.
	 *
	 * @covers \Parsely\Metadata\Date_Builder::build_headline
	 */
	public function test_yearly_archive(): void {
		$this->go_to( home_url( '/2022/' ) );

		$parsely_metadata = self::$metadata->construct_metadata( get_post() );

		self::assertEquals( 'Yearly Archive - 2022', $parsely_metadata['headline'] );
	}

	/**
	 * Verifies headline of Monthly Archive page.
	 *
	 * @covers \Parsely\Metadata\Date_Builder::build_headline
	 */
	public function test_monthly_archive(): void {
		$this->go_to( home_url( '/2022/10/' ) );

		$parsely_metadata = self::$metadata->construct_metadata( get_post() );

		self::assertEquals( 'Monthly Archive - October, 2022', $parsely_metadata['headline'] );
	}

	/**
	 * Verifies headline of Daily Archive page.
	 *
	 * @covers \Parsely\Metadata\Date_Builder::build_headline
	 */
	public function test_daily_archive(): void {
		$this->go_to( home_url( '/2022/10/31/' ) );

		$parsely_metadata = self::$metadata->construct_metadata( get_post() );

		self::assertEquals( 'Daily Archive - October 31, 2022', $parsely_metadata['headline'] );
	}

	/**
	 * Verifies headline of Daily Archive page with users specified date format.
	 *
	 * @covers \Parsely\Metadata\Date_Builder::build_headline
	 */
	public function test_daily_archive_with_users_specified_date_format(): void {
		update_option( 'date_format', 'Y-m-d' );
		$this->go_to( home_url( '/2022/10/31/' ) );

		$parsely_metadata = self::$metadata->construct_metadata( get_post() );

		self::assertEquals( 'Daily Archive - 2022-10-31', $parsely_metadata['headline'] );
	}

	/**
	 * Verifies headline of Time Archive page.
	 *
	 * @covers \Parsely\Metadata\Date_Builder::build_headline
	 */
	public function test_time_archive(): void {
		$this->go_to( home_url( '/2022/10/31/23' ) );

		$parsely_metadata = self::$metadata->construct_metadata( get_post() );

		self::assertEquals( 'Hourly, Minutely, or Secondly Archive - October 31, 2022:11:59 pm', $parsely_metadata['headline'] );
	}

	/**
	 * Verifies headline of Time Archive page with users specified time format.
	 *
	 * @covers \Parsely\Metadata\Date_Builder::build_headline
	 */
	public function test_time_archive_with_users_specified_time_format(): void {
		update_option( 'date_format', 'Y/m/d' );
		update_option( 'time_format', 'H:i' );

		$this->go_to( home_url( '/2022/10/31/23' ) );

		$parsely_metadata = self::$metadata->construct_metadata( get_post() );

		self::assertEquals( 'Hourly, Minutely, or Secondly Archive - 2022/10/31:23:59', $parsely_metadata['headline'] );
	}

	/**
	 * Teardown method called after each test.
	 */
	public function tear_down(): void {
		$this->set_permalink_structure( '' );

		update_option( 'date_format', 'F j, Y' ); // reset to default.
		update_option( 'time_format', 'g:i a' ); // reset to default.
	}

	/**
	 * Runs once after all tests.
	 */
	public static function tear_down_after_class(): void {
		self::$parsely  = null;
		self::$metadata = null;
	}
}

<?php
/**
 * Stats API Controller Test
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\Stats;

use Parsely\Parsely;
use Parsely\REST_API\Stats\Stats_Controller;
use Parsely\Tests\Integration\RestAPI\RestAPIControllerTest;
use Parsely\Tests\Integration\TestCase;

/**
 * Stats API Controller Test
 *
 * @since 3.17.0
 *
 * @coversDefaultClass \Parsely\REST_API\Stats\Stats_Controller
 */
class StatsControllerTest extends RestAPIControllerTest {
	/**
	 * The test controller instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Stats_Controller
	 */
	private $stats_controller = null;

	/**
	 * Set up the test controller.
	 *
	 * @since 3.17.0
	 */
	public function setUp(): void {
		parent::setUp();
		TestCase::set_options();
		$parsely                = self::createMock( Parsely::class );
		$this->stats_controller = new Stats_Controller( $parsely );
	}

	/**
	 * Test the constructor sets up the correct namespace and version.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Stats\Stats_Controller::__construct
	 * @uses \Parsely\REST_API\Stats\Stats_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\REST_API_Controller::get_version
	 */
	public function test_constructor_sets_up_namespace_and_version(): void {
		self::assertEquals( 'wp-parsely/v2', $this->stats_controller->get_full_namespace() );
	}
}

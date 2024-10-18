<?php
/**
 * REST API Controller Test
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI;

use Parsely\Parsely;
use Parsely\REST_API\REST_API_Controller;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration tests for the REST_API_Controller class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\REST_API\REST_API_Controller
 */
class RestAPIControllerTest extends TestCase {
	/**
	 * The test controller instance.
	 *
	 * @since 3.17.0
	 *
	 * @var REST_API_Controller
	 */
	private $test_controller = null;

	/**
	 * Sets up the test controller.
	 *
	 * @since 3.17.0
	 */
	public function set_up(): void {
		parent::set_up();
		TestCase::set_options();
		$parsely               = self::createMock( Parsely::class );
		$this->test_controller = new REST_API_Controller( $parsely );
	}

	/**
	 * Tests the constructor sets up the correct namespace and version.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\REST_API_Controller::__construct
	 * @uses \Parsely\REST_API\REST_API_Controller::get_full_namespace
	 */
	public function test_constructor_sets_up_namespace_and_version(): void {
		self::assertEquals( 'wp-parsely/v2', $this->test_controller->get_full_namespace() );
	}
}

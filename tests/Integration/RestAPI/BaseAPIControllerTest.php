<?php
/**
 * Base API Controller Test
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI;

use Parsely\Parsely;
use Parsely\REST_API\Base_API_Controller;
use Parsely\REST_API\Base_Endpoint;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration tests for the Base_API_Controller class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\REST_API\Base_API_Controller
 */
class BaseAPIControllerTest extends TestCase {

	/**
	 * The test controller instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Base_API_Controller
	 */
	public $test_controller = null;

	/**
	 * Set up the test controller.
	 *
	 * @since 3.17.0
	 */
	public function setUp(): void {
		parent::setUp();
		TestCase::set_options();
		$parsely               = self::createMock( Parsely::class );
		$this->test_controller = new class($parsely) extends Base_API_Controller {
			public const NAMESPACE = 'test';
			public const VERSION   = 'v1';

			/**
			 * Initialize the test controller.
			 *
			 * @since 3.17.0
			 */
			protected function init(): void {}

			/**
			 * Expose the protected method for testing.
			 *
			 * @param Base_Endpoint[] $endpoints The endpoints to register.
			 */
			public function testable_register_endpoints( array $endpoints ): void {
				$this->register_endpoints( $endpoints );
			}

			/**
			 * Expose the protected method for testing.
			 *
			 * @param Base_Endpoint $endpoint The endpoint to register.
			 */
			public function testable_register_endpoint( Base_Endpoint $endpoint ): void {
				$this->register_endpoint( $endpoint );
			}
		};
	}

	/**
	 * Test that the constructor throws an exception if the NAMESPACE is not defined.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_API_Controller::__construct
	 */
	public function test_constructor_throws_exception_without_namespace(): void {
		self::expectException( \UnexpectedValueException::class );
		self::expectExceptionMessage( 'The API controller must define a namespace.' );

		$parsely = self::createMock( Parsely::class );

		// Use an anonymous class to avoid implementing abstract methods.
		new class($parsely) extends Base_API_Controller {
			/**
			 * Initialize the test controller.
			 *
			 * @since 3.17.0
			 */
			protected function init(): void {}
		};
	}

	/**
	 * Test the get_namespace method.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_API_Controller::get_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 */
	public function test_get_namespace(): void {
		self::assertEquals( 'test/v1', $this->test_controller->get_namespace() );
	}

	/**
	 * Test the prefix_route method.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 */
	public function test_prefix_route(): void {
		self::assertEquals( 'my-route', $this->test_controller->prefix_route( 'my-route' ) );
		$parsely = self::createMock( Parsely::class );

		$controller_with_prefix = new class($parsely) extends Base_API_Controller {
			public const NAMESPACE    = 'test';
			public const ROUTE_PREFIX = 'prefix';

			/**
			 * Initialize the test controller.
			 *
			 * @since 3.17.0
			 */
			protected function init(): void {}
		};

		self::assertEquals( 'prefix/my-route', $controller_with_prefix->prefix_route( 'my-route' ) );
	}

	/**
	 * Test that endpoints are registered correctly.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_API_Controller::register_endpoint
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::register_endpoint
	 */
	public function test_register_endpoint(): void {
		$endpoint = self::createMock( Base_Endpoint::class );
		$endpoint->expects( self::once() )->method( 'init' );

		$this->test_controller->testable_register_endpoint( $endpoint ); // @phpstan-ignore-line

		self::assertCount( 1, $this->test_controller->endpoints );
		self::assertSame( $endpoint, $this->test_controller->endpoints[0] );
	}

	/**
	 * Test that multiple endpoints are registered correctly using a helper method.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_API_Controller::register_endpoints
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::register_endpoint
	 * @uses \Parsely\REST_API\Base_API_Controller::register_endpoints
	 */
	public function test_register_multiple_endpoints(): void {
		$endpoint1 = self::createMock( Base_Endpoint::class );
		$endpoint1->expects( self::once() )->method( 'init' );

		$endpoint2 = self::createMock( Base_Endpoint::class );
		$endpoint2->expects( self::once() )->method( 'init' );

		$this->test_controller->testable_register_endpoints( array( $endpoint1, $endpoint2 ) ); // @phpstan-ignore-line

		self::assertCount( 2, $this->test_controller->endpoints );
		self::assertSame( $endpoint1, $this->test_controller->endpoints[0] );
		self::assertSame( $endpoint2, $this->test_controller->endpoints[1] );
	}
}

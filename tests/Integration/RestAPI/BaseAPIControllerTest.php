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
	public function set_up(): void {
		parent::set_up();
		TestCase::set_options();
		$parsely               = self::createMock( Parsely::class );
		$this->test_controller = new class($parsely) extends Base_API_Controller {
			/**
			 * Gets the namespace for the API.
			 *
			 * @since 3.17.0
			 *
			 * @return string The namespace.
			 */
			protected function get_namespace(): string {
				return 'test';
			}

			/**
			 * Gets the route prefix, which acts as a namespace for the endpoints.
			 *
			 * @since 3.17.0
			 *
			 * @return string The route prefix.
			 */
			public static function get_route_prefix(): string {
				return 'test';
			}

			/**
			 * Gets the version for the API.
			 *
			 * @since 3.17.0
			 *
			 * @return string The version.
			 */
			protected function get_version(): string {
				return 'v1';
			}

			/**
			 * Initializes the test controller.
			 *
			 * @since 3.17.0
			 */
			protected function init(): void {}

			/**
			 * Exposes the protected method for testing.
			 *
			 * @since 3.17.0
			 *
			 * @param Base_Endpoint[] $endpoints The endpoints to register.
			 */
			public function testable_register_endpoints( array $endpoints ): void {
				$this->register_endpoints( $endpoints );
			}

			/**
			 * Exposes the protected method for testing.
			 *
			 * @since 3.17.0
			 *
			 * @param Base_Endpoint $endpoint The endpoint to register.
			 */
			public function testable_register_endpoint( Base_Endpoint $endpoint ): void {
				$this->register_endpoint( $endpoint );
			}

			/**
			 * Checks if a specific endpoint is available to the current user.
			 *
			 * @since 3.17.0
			 *
			 * @param string $endpoint The endpoint to check.
			 * @return bool True if the controller is available to the current user, false otherwise.
			 */
			public function is_available_to_current_user( string $endpoint ): bool {
				return true;
			}
		};
	}

	/**
	 * Tests the get_namespace method.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_API_Controller::get_full_namespace
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 */
	public function test_get_namespace(): void {
		self::assertEquals( 'test/v1', $this->test_controller->get_full_namespace() );
	}

	/**
	 * Tests the prefix_route method.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_API_Controller::prefix_route
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 */
	public function test_prefix_route(): void {
		self::assertEquals( 'test/my-route', $this->test_controller->prefix_route( 'my-route' ) );
		$parsely = self::createMock( Parsely::class );

		$controller_without_prefix = new class($parsely) extends Base_API_Controller {
			/**
			 * Initialize the test controller.
			 *
			 * @since 3.17.0
			 */
			protected function init(): void {}

			/**
			 * Get the namespace for the API.
			 *
			 * @since 3.17.0
			 *
			 * @return string The namespace.
			 */
			protected function get_namespace(): string {
				return 'test';
			}

			/**
			 * Checks if a specific endpoint is available to the current user.
			 *
			 * @since 3.17.0
			 *
			 * @param string $endpoint The endpoint to check.
			 * @return bool True if the controller is available to the current user, false otherwise.
			 */
			public function is_available_to_current_user( string $endpoint ): bool {
				return true;
			}
		};

		self::assertEquals( 'my-route', $controller_without_prefix->prefix_route( 'my-route' ) );
	}

	/**
	 * Tests that endpoints are registered correctly.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_API_Controller::register_endpoint
	 * @uses \Parsely\REST_API\Base_API_Controller::__construct
	 * @uses \Parsely\REST_API\Base_API_Controller::register_endpoint
	 */
	public function test_register_endpoint(): void {
		$endpoint = self::createMock( Base_Endpoint::class );
		$endpoint->expects( self::once() )
				->method( 'get_endpoint_slug' )
				->willReturn( 'test' );

		$this->test_controller->testable_register_endpoint( $endpoint ); // @phpstan-ignore-line

		$endpoints = $this->test_controller->get_endpoints();
		self::assertCount( 1, $endpoints );
		self::assertSame( $endpoint, $endpoints['test'] );
	}

	/**
	 * Tests that multiple endpoints are registered correctly using a helper method.
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
		$endpoint1->expects( self::once() )
					->method( 'get_endpoint_slug' )
					->willReturn( 'test1' );

		$endpoint2 = self::createMock( Base_Endpoint::class );
		$endpoint2->expects( self::once() )
					->method( 'get_endpoint_slug' )
					->willReturn( 'test2' );


		$this->test_controller->testable_register_endpoints( array( $endpoint1, $endpoint2 ) ); // @phpstan-ignore-line

		$endpoints = $this->test_controller->get_endpoints();

		self::assertCount( 2, $endpoints );
		self::assertSame( $endpoint1, $endpoints['test1'] );
		self::assertSame( $endpoint2, $endpoints['test2'] );
	}

	/**
	 * Tests that the get_endpoint_slug method returns the correct value.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Base_Endpoint::get_endpoint_slug
	 * @uses \Parsely\REST_API\Base_Endpoint::__construct
	 * @uses \Parsely\REST_API\Base_Endpoint::get_endpoint_slug
	 * @uses \Parsely\REST_API\Base_Endpoint::init
	 * @uses \Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_get_endpoint_slug(): void {
		// Create a mocked endpoint.
		$endpoint = new class( $this->test_controller ) extends Base_Endpoint {
			/**
			 * Get the endpoint name.
			 *
			 * @since 3.17.0
			 *
			 * @return string The endpoint name.
			 */
			public static function get_endpoint_name(): string {
				return 'test-endpoint';
			}

			/**
			 * Register the routes for the endpoints.
			 *
			 * @since 3.17.0
			 */
			public function register_routes(): void {}
		};

		$this->test_controller->testable_register_endpoint( $endpoint ); // @phpstan-ignore-line

		self::assertEquals( 'test/test-endpoint', $endpoint->get_endpoint_slug() );
	}
}

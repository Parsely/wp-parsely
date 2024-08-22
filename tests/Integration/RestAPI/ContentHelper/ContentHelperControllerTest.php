<?php
/**
 * Content Helper Controller Test
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\ContentHelper;

use Parsely\Parsely;
use Parsely\REST_API\Content_Helper\Content_Helper_Controller;
use Parsely\REST_API\Content_Helper\Endpoint_Smart_Linking;
use Parsely\REST_API\Content_Helper\Endpoint_Excerpt_Generator;
use Parsely\REST_API\Content_Helper\Endpoint_Title_Suggestions;
use Parsely\Tests\Integration\RestAPI\RestAPIControllerTest;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration tests for the Content_Helper_Controller class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Controller
 */
class ContentHelperControllerTest extends RestAPIControllerTest {

	/**
	 * The test controller instance.
	 *
	 * @since 3.17.0
	 *
	 * @var Content_Helper_Controller
	 */
	private $content_helper_controller = null;

	/**
	 * Set up the test controller.
	 *
	 * @since 3.17.0
	 */
	public function setUp(): void {
		parent::setUp();
		TestCase::set_options();
		$parsely                         = self::createMock( Parsely::class );
		$this->content_helper_controller = new Content_Helper_Controller( $parsely );
	}

	/**
	 * Test the constructor sets up the correct namespace and version.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Controller::__construct
	 * @uses \Parsely\REST_API\Content_Helper\Content_Helper_Controller::get_namespace
	 */
	public function test_constructor_sets_up_namespace_and_version(): void {
		self::assertEquals( 'wp-parsely/v2', $this->content_helper_controller->get_namespace() );
	}

	/**
	 * Test that the route prefix is set correctly.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Controller::ROUTE_PREFIX
	 */
	public function test_route_prefix(): void {
		self::assertEquals( 'content-helper', Content_Helper_Controller::ROUTE_PREFIX );
	}

	/**
	 * Test that the init method registers the correct endpoints.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\REST_API\Content_Helper\Content_Helper_Controller::init
	 * @uses \Parsely\REST_API\Content_Helper\Content_Helper_Controller::register_endpoints
	 * @uses Parsely\Endpoints\Base_Endpoint::__construct
	 * @uses Parsely\REST_API\Base_API_Controller::__construct
	 * @uses Parsely\REST_API\Base_API_Controller::register_endpoint
	 * @uses Parsely\REST_API\Base_Endpoint::__construct
	 * @uses Parsely\REST_API\Base_Endpoint::init
	 * @uses Parsely\REST_API\Content_Helper\Excerpt_Generator_Endpoint::__construct
	 * @uses Parsely\REST_API\Content_Helper\Smart_Linking_Endpoint::__construct
	 * @uses Parsely\REST_API\Content_Helper\Title_Suggestions_Endpoint::__construct
	 * @uses Parsely\Utils\Utils::convert_endpoint_to_filter_key
	 */
	public function test_init_registers_endpoints(): void {
		$this->content_helper_controller->init();

		self::assertCount( 3, $this->content_helper_controller->endpoints );
		self::assertInstanceOf( Endpoint_Smart_Linking::class, $this->content_helper_controller->endpoints[0] );
		self::assertInstanceOf( Endpoint_Excerpt_Generator::class, $this->content_helper_controller->endpoints[1] );
		self::assertInstanceOf( Endpoint_Title_Suggestions::class, $this->content_helper_controller->endpoints[2] );
	}
}

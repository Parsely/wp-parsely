<?php
/**
 * Integration tests for the Content_API_Service class.
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Services\ContentAPI;

use Parsely\Parsely;
use Parsely\Services\Base_Service_Endpoint;
use Parsely\Services\Cached_Service_Endpoint;
use Parsely\Services\Content_API\Content_API_Service;
use Parsely\Services\Content_API\Endpoints\Endpoint_Analytics_Post_Details;
use Parsely\Services\Content_API\Endpoints\Endpoint_Analytics_Posts;
use Parsely\Services\Content_API\Endpoints\Endpoint_Referrers_Post_Detail;
use Parsely\Services\Content_API\Endpoints\Endpoint_Related;
use Parsely\Services\Content_API\Endpoints\Endpoint_Validate;
use Parsely\Tests\Integration\Services\BaseAPIServiceTestCase;
use Parsely\Tests\Traits\TestsReflection;

/**
 * Integration tests for the Content_API_Service class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\Services\Content_API\Content_API_Service
 */
class ContentApiServiceTestCase extends BaseAPIServiceTestCase {
	use TestsReflection;

	/**
	 * The registered endpoints for this service.
	 *
	 * @since 3.17.0
	 *
	 * @var array<Base_Service_Endpoint>
	 */
	private static $endpoints;

	/**
	 * Initializes all required values for the test.
	 *
	 * @since 3.17.0
	 */
	public static function initialize(): void {
		self::$api_service = new Content_API_Service( new Parsely() );

		// Get the endpoints from the protected $endpoints property using reflection.
		$endpoints_prop = self::get_property( 'endpoints', self::$api_service );

		/** @var array<Base_Service_Endpoint> $endpoints */
		$endpoints = $endpoints_prop->getValue( self::$api_service );

		// Store it.
		self::$endpoints = $endpoints;
	}

	/**
	 * Provides data for test_endpoint_is_registered().
	 *
	 * Should return an array of arrays, each containing the endpoint name and
	 * class.
	 *
	 * @since 3.17.0
	 *
	 * @return array<string, array<string, string>>
	 */
	public function data_registered_endpoints(): iterable {
		return array(
			'analytics/posts'        => array(
				'endpoint' => '/analytics/posts',
				'class'    => Endpoint_Analytics_Posts::class,
			),
			'analytics/post/details' => array(
				'endpoint' => '/analytics/post/detail',
				'class'    => Endpoint_Analytics_Post_Details::class,
			),
			'related'                => array(
				'endpoint' => '/related',
				'class'    => Endpoint_Related::class,
			),
			'referrers/post/details' => array(
				'endpoint' => '/referrers/post/detail',
				'class'    => Endpoint_Referrers_Post_Detail::class,
			),
			'validate/secret'        => array(
				'endpoint' => '/validate/secret',
				'class'    => Endpoint_Validate::class,
			),
		);
	}

	/**
	 * Verifies that the number of registered endpoints is as expected.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Services\Suggestions_API\Suggestions_API_Service::register_endpoint
	 */
	public function test_number_of_registered_endpoints_is_as_expected(): void {
		self::assertSameSize( $this->data_registered_endpoints(), self::$endpoints );
	}

	/**
	 * Tests that the endpoint is registered and is an instance of the expected class.
	 *
	 * @since 3.17.0
	 *
	 * @dataProvider data_registered_endpoints
	 * @covers \Parsely\Services\Base_API_Service::get_endpoint
	 * @uses \Parsely\Services\Cached_Service_Endpoint::get_uncached_endpoint
	 *
	 * @param string       $endpoint The endpoint name to check.
	 * @param class-string $class_name The endpoint class to check.
	 */
	public function test_endpoint_is_registered( string $endpoint, string $class_name ): void {
		// Check that the endpoint exists and is an instance of the expected class.
		self::assertArrayHasKey( $endpoint, self::$endpoints, "Endpoint $endpoint is not registered." );
		$endpoint = self::$api_service->get_endpoint( $endpoint );
		self::assertInstanceOf( Base_Service_Endpoint::class, $endpoint );

		// If the endpoint is cached, check the inner endpoint.
		if ( $endpoint instanceof Cached_Service_Endpoint ) {
			self::assertInstanceOf( $class_name, $endpoint->get_uncached_endpoint() );
		} else {
			self::assertInstanceOf( $class_name, $endpoint );
		}
	}
}

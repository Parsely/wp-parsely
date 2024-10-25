<?php
/**
 * Parse.ly Suggestions API Service class test.
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Services\SuggestionsAPI;

use Parsely\Parsely;
use Parsely\Services\Base_Service_Endpoint;
use Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Brief;
use Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Headline;
use Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Linked_Reference;
use Parsely\Services\Suggestions_API\Suggestions_API_Service;
use Parsely\Tests\Integration\Services\BaseAPIServiceTestCase;
use Parsely\Tests\Traits\TestsReflection;

/**
 * Integration tests for the Suggestions_API_Service class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\Services\Suggestions_API\Suggestions_API_Service
 */
class SuggestionsApiServiceTestCase extends BaseAPIServiceTestCase {
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
		self::$api_service = new Suggestions_API_Service( new Parsely() );

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
			'suggest-linked-reference' => array(
				'endpoint' => '/suggest-linked-reference',
				'class'    => Endpoint_Suggest_Linked_Reference::class,
			),
			'suggest-brief'            => array(
				'endpoint' => '/suggest-brief',
				'class'    => Endpoint_Suggest_Brief::class,
			),
			'suggest-headline'         => array(
				'endpoint' => '/suggest-headline',
				'class'    => Endpoint_Suggest_Headline::class,
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
	 * Tests that the endpoint is registered and is an instance of the expected
	 * class.
	 *
	 * @since 3.17.0
	 *
	 * @dataProvider data_registered_endpoints
	 * @covers \Parsely\Services\Base_API_Service::get_endpoint
	 *
	 * @param string       $endpoint The endpoint name to check.
	 * @param class-string $class_name The endpoint class to check.
	 */
	public function test_endpoint_is_registered( string $endpoint, string $class_name ): void {
		// Check that the endpoint exists and is an instance of the expected class.
		self::assertArrayHasKey( $endpoint, self::$endpoints, "Endpoint $endpoint is not registered." );
		$endpoint = self::$api_service->get_endpoint( $endpoint );
		self::assertInstanceOf( $class_name, $endpoint );
	}
}

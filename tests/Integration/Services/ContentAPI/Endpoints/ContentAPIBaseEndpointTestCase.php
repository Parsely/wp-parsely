<?php
/**
 * Content API base endpoint Test
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Services\ContentAPI\Endpoints;

use Parsely\Parsely;
use Parsely\Services\Base_Service_Endpoint;
use Parsely\Services\Content_API\Content_API_Service;
use Parsely\Tests\Integration\Services\BaseServiceEndpointTestCase;
use Parsely\Tests\Traits\TestsReflection;

/**
 * Base class for testing Content API service endpoints.
 *
 * @since 3.17.0
 */
abstract class ContentAPIBaseEndpointTestCase extends BaseServiceEndpointTestCase {
	use TestsReflection;

	/**
	 * Initializes all required values for the test.
	 *
	 * @since 3.17.0
	 */
	public static function initialize(): void {
		self::$api_service = new Content_API_Service( new Parsely() );
	}

	/**
	 * Returns the Suggestions API service.
	 *
	 * @since 3.17.0
	 *
	 * @return Content_API_Service
	 */
	public function get_content_api(): Content_API_Service {
		/** @var Content_API_Service */
		return self::$api_service;
	}

	/**
	 * Verifies the basic generation of the API URL.
	 *
	 * @since 3.17.0
	 *
	 * @dataProvider data_api_url
	 * @covers \Parsely\Services\Base_API_Service::get_endpoint
	 * @covers \Parsely\Services\Base_Service_Endpoint::get_endpoint_url
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_content_helper_settings_values
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Permissions::build_pch_permissions_settings_array
	 * @uses \Parsely\Permissions::get_user_roles_with_edit_posts_cap
	 * @uses \Parsely\Services\Base_API_Service::get_api_url
	 * @uses \Parsely\Services\Base_API_Service::get_parsely
	 * @uses \Parsely\Services\Base_Service_Endpoint::get_parsely
	 * @uses \Parsely\Services\Base_Service_Endpoint::get_query_args
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Suggestions_API_Base_Endpoint::get_query_args
	 *
	 * @param array<string, mixed> $query Test query arguments.
	 * @param string               $url Expected generated URL.
	 */
	public function test_api_url( array $query, string $url ): void {
		// Get the endpoint object.
		$endpoint = $this->get_service_endpoint();
		self::assertInstanceOf( Base_Service_Endpoint::class, $endpoint );

		self::set_options(
			array(
				'apikey'     => 'my-key',
				'api_secret' => 'my-secret',
			)
		);

		self::assertSame( $url, $endpoint->get_endpoint_url( $query ) );
	}

	/**
	 * Verifies the basic generation of the API headers.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Tests\Integration\Services\ContentAPI\Endpoints\Content_API_Base_Endpoint::get_request_options
	 */
	public function test_api_authentication(): void {
		// Assume self::$api_service is always an instance of Suggestions_API_Service.
		// If there's any doubt, this should be handled in the test setup or constructor,
		// not within individual tests.
		self::assertInstanceOf( Content_API_Service::class, self::$api_service );

		// Get the endpoint object.
		$endpoint = $this->get_service_endpoint();
		self::assertInstanceOf( Base_Service_Endpoint::class, $endpoint );

		// Set options - this assumes set_options() does not produce side effects that affect other tests.
		// Consider resetting any global or static state in a tearDown() method if necessary.
		self::set_options(
			array(
				'apikey'     => 'my-key',
				'api_secret' => 'my-secret',
			)
		);

		// Call the protected method get_query_args() using reflection.
		$get_query_args = self::get_method( 'get_query_args', $endpoint );
		$query_args     = $get_query_args->invoke( $endpoint );

		// Ensure that $query_args is an array.
		self::assertIsArray( $query_args );

		// Verify the API key and secret are present in the query args and their values
		// match the ones set in the options.
		self::assertArrayHasKey( 'apikey', $query_args );
		self::assertEquals( 'my-key', $query_args['apikey'] );

		self::assertArrayHasKey( 'secret', $query_args );
		self::assertEquals( 'my-secret', $query_args['secret'] );
	}
}

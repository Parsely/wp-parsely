<?php
/**
 * Integration Tests: Parsely Content Suggestions Base API
 *
 * @package Parsely\Tests
 * @since   3.14.0
 */

namespace Parsely\Tests\Integration\RemoteAPI\ContentSuggestions;

use Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API;
use Parsely\Tests\Integration\RemoteAPITest;

/**
 * Integration Tests for the Parse.ly Content Suggestions API endpoints.
 *
 * @since 3.14.0
 */
abstract class BaseContentSuggestionsAPITest extends RemoteAPITest {
	/**
	 * Verifies the basic generation of the API headers.
	 *
	 * @covers \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::get_request_options
	 * @uses \Parsely\Parsely::api_secret_is_set()
	 * @uses \Parsely\Parsely::get_api_secret()
	 * @uses \Parsely\Parsely::get_managed_credentials()
	 * @uses \Parsely\Parsely::get_options()
	 */
	public function test_api_headers(): void {
		// Assume self::$remote_api is always an instance of Content_Suggestions_Base_API.
		// If there's any doubt, this should be handled in the test setup or constructor,
		// not within individual tests.
		self::assertInstanceOf( Content_Suggestions_Base_API::class, self::$remote_api );

		// Set options - this assumes set_options() does not produce side effects that affect other tests.
		// Consider resetting any global or static state in a tearDown() method if necessary.
		self::set_options(
			array(
				'apikey'     => 'my-key',
				'api_secret' => 'my-secret',
			)
		);

		$request_options = self::$remote_api->get_request_options();

		// Ensure that $request_options is an array and 'headers' key exists.
		self::assertIsArray( $request_options );
		self::assertArrayHasKey( 'headers', $request_options );

		$headers = $request_options['headers'];
		self::assertIsArray( $headers ); // Ensures $headers is indeed an array.

		// Verify the Content-Type header is present and its value is application/json.
		self::assertArrayHasKey( 'Content-Type', $headers );
		self::assertEquals( 'application/json; charset=utf-8', $headers['Content-Type'] );

		// Verify the API key is present in the headers and its value matches the one set in the options.
		self::assertArrayHasKey( 'X-APIKEY-SECRET', $headers );
		self::assertEquals( 'my-secret', $headers['X-APIKEY-SECRET'] );
	}
}

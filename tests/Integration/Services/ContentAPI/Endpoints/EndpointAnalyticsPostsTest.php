<?php
/**
 * Parse.ly Content API Endpoint Test: Analytics Posts
 *
 * @package Parsely
 * @since   3.17.0
 */

declare( strict_types=1 );

namespace Parsely\Tests\Integration\Services\ContentAPI\Endpoints;

use Parsely\Services\Base_Service_Endpoint;
use Parsely\Services\Content_API\Content_API_Service;
use Parsely\Services\Content_API\Endpoints\Endpoint_Analytics_Posts;

/**
 * Tests the /analytics/posts endpoint.
 *
 * @since 3.17.0
 */
class EndpointAnalyticsPostsTest extends ContentAPIBaseEndpointTestCase {
	/**
	 * Returns the endpoint for the API request.
	 *
	 * @since 3.17.0
	 *
	 * @return Base_Service_Endpoint
	 */
	public function get_service_endpoint(): Base_Service_Endpoint {
		return $this->get_content_api()->get_endpoint( '/analytics/posts' );
	}

	/**
	 * Provides data for test_api_url().
	 *
	 * @since 3.17.0
	 *
	 * @return \ArrayIterator<string, mixed>
	 */
	public function data_api_url(): iterable {
		yield 'Basic (Expected data)' => array(
			array(
				'limit' => 5,
			),
			Content_API_Service::get_base_url() . '/analytics/posts?limit=5&apikey=my-key&secret=my-secret',
		);
	}

	/**
	 * Verifies that append_same_key_params_to_url() returns the expected
	 * results.
	 *
	 * @since 3.18.0
	 *
	 * @covers \Parsely\Services\Content_API\Endpoints\Endpoint_Analytics_Posts::append_same_key_params_to_url
	 * @uses \Parsely\Services\Base_Service_Endpoint::__construct
	 *
	 * @param string        $url The URL to append the parameters to.
	 * @param array<string> $values The parameter values to append.
	 * @param string        $key The common key to be used for the parameters.
	 * @param string        $expected The expected URL after appending the parameters.
	 *
	 * @dataProvider provide_data_for_test_append_same_key_params_to_url
	 */
	public function test_append_same_key_params_to_url(
		string $url,
		array $values,
		string $key,
		string $expected
	): void {
		$function = self::get_method(
			'append_same_key_params_to_url',
			Endpoint_Analytics_Posts::class
		);

		$endpoint = new Endpoint_Analytics_Posts( $this->get_content_api() );
		$actual   = $function->invoke( $endpoint, $url, $values, $key );

		self::assertSame( $expected, $actual );
	}

	/**
	 * Provides data for test_append_same_key_params_to_url().
	 *
	 * @since 3.18.0
	 *
	 * @return iterable<string, mixed>
	 */
	public function provide_data_for_test_append_same_key_params_to_url(): iterable {
		// Basic delimiter handling.
		yield 'Add 1 tag parameter to a URL without parameters' => array(
			'url'      => 'https://example.com/',
			'values'   => array( 'tag1' ),
			'key'      => 'tag',
			'expected' => 'https://example.com/?tag=tag1',
		);
		yield 'Add 2 tag parameters to a URL without parameters' => array(
			'url'      => 'https://example.com/',
			'values'   => array( 'tag1', 'tag2' ),
			'key'      => 'tag',
			'expected' => 'https://example.com/?tag=tag1&tag=tag2',
		);

		// Handling URLs that already contain parameters.
		yield 'Add 2 tag parameters to a URL containing a param1 parameter' => array(
			'url'      => 'https://example.com/?param1=value1',
			'values'   => array( 'tag1', 'tag2' ),
			'key'      => 'tag',
			'expected' => 'https://example.com/?param1=value1&tag=tag1&tag=tag2',
		);
		yield 'Add 2 tag parameters to a URL already containing a tag parameter' => array(
			'url'      => 'https://example.com/?tag=tag1',
			'values'   => array( 'tag2', 'tag3' ),
			'key'      => 'tag',
			'expected' => 'https://example.com/?tag=tag1&tag=tag2&tag=tag3',
		);
		yield 'Add 2 author parameters to a URL containing 2 tag parameters' => array(
			'url'      => 'https://example.com/?tag=tag1&tag=tag2',
			'values'   => array( 'author1', 'author2' ),
			'key'      => 'author',
			'expected' => 'https://example.com/?tag=tag1&tag=tag2&author=author1&author=author2',
		);

		// Handling special characters in values.
		yield 'Add 2 tag parameters with special character values' => array(
			'url'      => 'https://example.com/',
			'values'   => array( 'tag@1', 'tag#2' ),
			'key'      => 'tag',
			'expected' => 'https://example.com/?tag=tag%401&tag=tag%232',
		);

		// Handling empty values and arguments.
		yield 'Allow empty URLs' => array(
			'url'      => '',
			'values'   => array( 'tag1', 'tag2' ),
			'key'      => 'tag',
			'expected' => '?tag=tag1&tag=tag2',
		);
		yield 'Do not modify the URL if an empty key was provided' => array(
			'url'      => 'https://example.com/',
			'values'   => array( 'tag1' ),
			'key'      => '',
			'expected' => 'https://example.com/',
		);
		yield 'Do not add empty parameters (single value)' => array(
			'url'      => 'https://example.com/',
			'values'   => array( '' ),
			'key'      => 'tag',
			'expected' => 'https://example.com/',
		);
		yield 'Do not add empty parameters (multiple values)' => array(
			'url'      => 'https://example.com/',
			'values'   => array( 'tag1', '', 'tag2', '' ),
			'key'      => 'tag',
			'expected' => 'https://example.com/?tag=tag1&tag=tag2',
		);
	}
}

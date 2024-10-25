<?php
/**
 * Parse.ly Suggestions API Endpoint Test: Suggest Headline
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Services\SuggestionsAPI\Endpoints;

use Parsely\Services\Base_Service_Endpoint;
use Parsely\Services\Suggestions_API\Suggestions_API_Service;

/**
 * Tests the Endpoint_Suggest_Headline class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Headline
 */
class EndpointSuggestHeadlineTest extends SuggestionsAPIBaseEndpointTestCase {
	/**
	 * Returns the endpoint for the API request.
	 *
	 * @since 3.17.0
	 *
	 * @return Base_Service_Endpoint
	 */
	public function get_service_endpoint(): Base_Service_Endpoint {
		return $this->get_suggestions_api()->get_endpoint( '/suggest-headline' );
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
				'apikey' => 'my-key',
			),
			Suggestions_API_Service::get_base_url() . '/suggest-headline?apikey=my-key',
		);
	}

	/**
	 * Mocks a successful HTTP response to the Content Suggestion suggest-headline
	 * API endpoint.
	 *
	 * @since 3.17.0
	 *
	 * @param string $response  The response to mock.
	 * @param array  $args      The arguments passed to the HTTP request.
	 * @param string $url       The URL of the HTTP request.
	 * @return array|false The mocked response.
	 *
	 * @phpstan-ignore-next-line
	 */
	public function mock_successful_suggest_headline_response(
		string $response,
		array $args,
		string $url
	) {
		if ( ! str_contains( $url, 'suggest-headline' ) ) {
			return false;
		}

		$response = array(
			'result' => array(
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				'Donec maximus metus sed urna maximus, et malesuada dui placerat.',
				'Donec risus dui, dictum nec interdum eu, malesuada non diam.',
			),
		);

		return array(
			'headers'     => array(),
			'cookies'     => array(),
			'filename'    => null,
			'response'    => array(
				'code'    => 200,
				'message' => 'OK',
			),
			'status_code' => 200,
			'success'     => true,
			'body'        => $this->wp_json_encode( $response ),
		);
	}

	/**
	 * Tests getting titles from the API with some generic content.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_title_suggestions
	 * @covers \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Headline::get_headlines
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Headline::call
	 */
	public function test_get_titles(): void {
		$content = '<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus metus sed urna maximus,
			et malesuada dui placerat. Donec risus dui, dictum nec interdum eu, malesuada non diam. Curabitur
			 in erat eu nisi scelerisque tristique eu nec tortor. Nam fermentum rutrum mi id scelerisque.
			</p>';

		// Mock API result.
		add_filter( 'pre_http_request', array( $this, 'mock_successful_suggest_headline_response' ), 10, 3 );

		// Test getting three titles.
		$titles = $this->get_suggestions_api()->get_title_suggestions(
			$content,
			array(
				'max_items' => 3,
			)
		);

		self::assertIsArray( $titles );
		self::assertEquals( 3, count( $titles ) );

		// Remove mock.
		remove_filter( 'pre_http_request', array( $this, 'mock_successful_suggest_headline_response' ) );
	}
}

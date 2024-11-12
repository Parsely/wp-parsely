<?php
/**
 * Parse.ly Suggestions API Endpoint Test: Suggest Brief
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Services\SuggestionsAPI\Endpoints;

use Parsely\Services\Base_Service_Endpoint;
use Parsely\Services\Suggestions_API\Suggestions_API_Service;

/**
 * Tests the Endpoint_Suggest_Brief class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Brief
 */
class EndpointSuggestBriefTest extends SuggestionsAPIBaseEndpointTestCase {
	/**
	 * Returns the endpoint for the API request.
	 *
	 * @since 3.17.0
	 *
	 * @return Base_Service_Endpoint
	 */
	public function get_service_endpoint(): Base_Service_Endpoint {
		return $this->get_suggestions_api()->get_endpoint( '/suggest-brief' );
	}

	/**
	 * Provides data for test_api_url().
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Services\Base_Service_Endpoint::get_endpoint_url
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Brief::get_endpoint
	 * @uses \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_base_url
	 *
	 * @return \ArrayIterator<string, mixed>
	 */
	public function data_api_url(): iterable {
		yield 'Basic (Expected data)' => array(
			array(
				'apikey' => 'my-key',
			),
			Suggestions_API_Service::get_base_url() . '/suggest-brief?apikey=my-key',
		);
	}

	/**
	 * Mocks a successful HTTP response to the Content Suggestion suggest-brief
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
	public function mock_successful_suggest_brief_response(
		string $response,
		array $args,
		string $url
	) {
		if ( ! str_contains( $url, 'suggest-brief' ) ) {
			return false;
		}

		$response = array(
			'result' => array(
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
	 * Tests getting meta description from the API with some generic content.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Brief::get_suggestion
	 */
	public function test_get_suggestion(): void {
		$title   = 'Lorem Ipsum is a random title';
		$content = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>';
		$persona = 'journalist';
		$style   = 'neutral';

		// Mock API result.
		add_filter( 'pre_http_request', array( $this, 'mock_successful_suggest_brief_response' ), 10, 3 );

		// Get the brief suggestion from the Suggestions API.
		$brief = $this->get_suggestions_api()->get_brief_suggestions(
			$title,
			$content,
			array(
				'persona'   => $persona,
				'style'     => $style,
				'max_items' => 1,
			)
		);

		self::assertIsArray( $brief );
		self::assertCount( 1, $brief );
		self::assertIsString( $brief[0] );
		self::assertEquals( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', $brief[0] );

		// Remove mock.
		remove_filter( 'pre_http_request', array( $this, 'mock_successful_suggest_brief_response' ) );
	}
}

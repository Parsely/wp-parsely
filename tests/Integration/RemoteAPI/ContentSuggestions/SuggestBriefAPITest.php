<?php
/**
 * Integration Tests: Parsely Content Suggestions Suggest Brief API
 *
 * @package Parsely\Tests
 * @since   3.13.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RemoteAPI\ContentSuggestions;

use Parsely\Parsely;
use Parsely\RemoteAPI\ContentSuggestions\Suggest_Brief_API;

/**
 * Integration Tests for the Parse.ly Content Suggestions Suggest Brief API.
 *
 * @since 3.13.0
 * @since 3.14.0 Renamed from SuggestMetaDescriptionAPITest to SuggestBriefAPITest.
 */
final class SuggestBriefAPITest extends BaseContentSuggestionsAPITest {

	/**
	 * Internal variable.
	 *
	 * @var Suggest_Brief_API $suggest_brief_api Holds an instance of the class being tested.
	 */
	private static $suggest_brief_api;

	/**
	 * Initializes all required values for the test.
	 *
	 * @since 3.13.0
	 */
	public static function initialize(): void {
		self::$remote_api = new Suggest_Brief_API( new Parsely() );
		// Required for PHPStan to recognize the type.
		self::$suggest_brief_api = self::$remote_api;
	}

	/**
	 * Provides data for test_api_url().
	 *
	 * @since 3.13.0
	 *
	 * @return \ArrayIterator<string, mixed>
	 */
	public function data_api_url(): iterable {
		yield 'Basic (Expected data)' => array(
			array(
				'apikey' => 'my-key',
			),
			Parsely::PUBLIC_SUGGESTIONS_API_BASE_URL .
			'/suggest-brief?apikey=my-key',
		);
	}


	/**
	 * Mocks a successful HTTP response to the Content Suggestion suggest-brief
	 * API endpoint.
	 *
	 * @since 3.13.0
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
	 * @since 3.13.0
	 *
	 * @covers \Parsely\RemoteAPI\ContentSuggestions\Suggest_Brief_API::get_suggestion
	 * @uses \Parsely\Parsely::api_secret_is_set()
	 * @uses \Parsely\Parsely::get_managed_credentials()
	 * @uses \Parsely\Parsely::get_options()
	 * @uses \Parsely\Parsely::get_site_id()
	 * @uses \Parsely\Parsely::set_default_track_as_values()
	 * @uses \Parsely\Parsely::site_id_is_set()
	 * @uses \Parsely\RemoteAPI\Base_Endpoint_Remote::validate_required_constraints()
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::get_api_url()
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::get_request_options()
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::post_request()
	 */
	public function test_get_suggestion(): void {
		$title   = 'Lorem Ipsum is a random title';
		$content = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>';
		$persona = 'journalist';
		$style   = 'neutral';

		// Mock API result.
		add_filter( 'pre_http_request', array( $this, 'mock_successful_suggest_brief_response' ), 10, 3 );

		// Test getting meta description.
		$brief = self::$suggest_brief_api->get_suggestion( $title, $content, $persona, $style );

		self::assertIsString( $brief );
		self::assertEquals( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', $brief );

		// Remove mock.
		remove_filter( 'pre_http_request', array( $this, 'mock_successful_suggest_brief_response' ) );
	}
}

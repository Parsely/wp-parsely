<?php
/**
 * Integration Tests: Parsely Content Suggestions Suggest Meta Description API
 *
 * @package Parsely\Tests
 * @since   3.13.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RemoteAPI\ContentSuggestions;

use Parsely\Parsely;
use Parsely\RemoteAPI\ContentSuggestions\Suggest_Meta_Description_API;
use Parsely\Tests\Integration\RemoteAPITest;

/**
 * Integration Tests for the Parse.ly Content Suggestions Suggest Meta Description API.
 *
 * @since 3.13.0
 */
final class SuggestMetaDescriptionAPITest extends RemoteAPITest {

	/**
	 * Internal variable.
	 *
	 * @var Suggest_Meta_Description_API $suggest_meta_description_api Holds an instance of the class being tested.
	 */
	private static $suggest_meta_description_api;

	/**
	 * Initializes all required values for the test.
	 *
	 * @since 3.13.0
	 */
	public static function initialize(): void {
		self::$remote_api = new Suggest_Meta_Description_API( new Parsely() );
		// Required for PHPStan to recognize the type.
		self::$suggest_meta_description_api = self::$remote_api;
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
				'secret' => 'my-secret',
				'title'  => 'This is a title',
			),
			Parsely::PUBLIC_SUGGESTIONS_API_BASE_URL .
			'/suggest-meta-description?apikey=my-key&secret=my-secret&title=This is a title',
		);
	}


	/**
	 * Mocks a successful HTTP response to the Content Suggestion suggest-meta-description
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
	public function mock_successful_suggest_meta_description_response(
		string $response,
		array $args,
		string $url
	) {
		if ( ! str_contains( $url, 'suggest-meta-description' ) ) {
			return false;
		}

		$response = array(
			'meta_description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
	 * @covers \Parsely\RemoteAPI\ContentSuggestions\Suggest_Meta_Description_API::get_suggestion
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Suggest_Meta_Description_API::__construct
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Suggest_Meta_Description_API::get_suggestion
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::__construct
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::get_api_url
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 */
	public function test_get_suggestion(): void {
		$title   = 'Lorem Ipsum is a random title';
		$content = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>';

		// Mock API result.
		add_filter( 'pre_http_request', array( $this, 'mock_successful_suggest_meta_description_response' ), 10, 3 );

		// Test getting meta description.
		$meta_description = self::$suggest_meta_description_api->get_suggestion( $title, $content );

		self::assertIsString( $meta_description );
		self::assertEquals( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', $meta_description );

		// Remove mock.
		remove_filter( 'pre_http_request', array( $this, 'mock_successful_suggest_meta_description_response' ) );
	}
}

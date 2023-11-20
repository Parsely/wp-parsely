<?php
/**
 * Integration Tests: Parsely Content Suggestions Write Title API
 *
 * @package Parsely\Tests
 * @since   3.12.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RemoteAPI\ContentSuggestions;

use Parsely\Parsely;
use Parsely\RemoteAPI\ContentSuggestions\Write_Title_API;
use Parsely\Tests\Integration\RemoteAPITest;

/**
 * Integration Tests for the Parse.ly Content Suggestions Write Title API.
 *
 * @since 3.12.0
 */
final class WriteTitleAPITest extends RemoteAPITest {

	/**
	 * Internal variable.
	 *
	 * @var Write_Title_API $write_title_api Holds an instance of the class being tested.
	 */
	private static $write_title_api;

	/**
	 * Initializes all required values for the test.
	 *
	 * @since 3.12.0
	 */
	public static function initialize(): void {
		self::$remote_api = new Write_Title_API( new Parsely() );
		// Required for PHPStan to recognize the type.
		self::$write_title_api = self::$remote_api;
	}

	/**
	 * Provides data for test_api_url().
	 *
	 * @since 3.12.0
	 *
	 * @return \ArrayIterator<string, mixed>
	 */
	public function data_api_url(): iterable {
		yield 'Basic (Expected data)' => array(
			array(
				'apikey'  => 'my-key',
				'secret'  => 'my-secret',
				'persona' => 'journalist',
				'style'   => 'neutral',
				'limit'   => 3,
			),
			Parsely::PUBLIC_SUGGESTIONS_API_BASE_URL .
				'/write-title?apikey=my-key&limit=3&persona=journalist&secret=my-secret&style=neutral',
		);
	}

	/**
	 * Mocks a successful HTTP response to the Content Suggestion write-titles
	 * API endpoint.
	 *
	 * @since 3.12.0
	 *
	 * @param string $response  The response to mock.
	 * @param array  $args      The arguments passed to the HTTP request.
	 * @param string $url       The URL of the HTTP request.
	 * @return array|false The mocked response.
	 *
	 * @phpstan-ignore-next-line
	 */
	public function mock_successful_write_titles_response(
		string $response,
		array $args,
		string $url
	) {
		if ( ! str_contains( $url, 'write-title' ) ) {
			return false;
		}

		$response = array(
			'titles' => array(
				'Lorem Ipsum is a random title',
				'Write better with Lorem Ipsum',
				'Lorem Ispsum? Dolor sit amet!',
			),
		);

		return array(
			'headers'     => array(),
			'cookies'     => array(),
			'filename'    => null,
			'response'    => $response,
			'status_code' => 200,
			'success'     => true,
			'body'        => $this->wp_json_encode( $response ),
		);
	}

	/**
	 * Tests getting titles from the API with some generic content.
	 *
	 * @since 3.12.0
	 *
	 * @covers \Parsely\RemoteAPI\ContentSuggestions\Write_Title_API::get_titles
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Write_Title_API::__construct
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Write_Title_API::get_titles
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::__construct
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::get_api_url
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 */
	public function test_get_titles(): void {
		$content = '<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus metus sed urna maximus,
			et malesuada dui placerat. Donec risus dui, dictum nec interdum eu, malesuada non diam. Curabitur
			 in erat eu nisi scelerisque tristique eu nec tortor. Nam fermentum rutrum mi id scelerisque.
			</p>';

		// Mock API result.
		add_filter( 'pre_http_request', array( $this, 'mock_successful_write_titles_response' ), 10, 3 );

		// Test getting three titles.
		$titles = self::$write_title_api->get_titles( $content, 3 );

		self::assertIsArray( $titles );
		self::assertEquals( 3, count( $titles ) );

		// Remove mock.
		remove_filter( 'pre_http_request', array( $this, 'mock_successful_write_titles_response' ) );
	}
}

<?php
/**
 * Integration Tests: Parsely Content Suggestions Suggest Links API
 *
 * @package Parsely\Tests
 * @since   3.14.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RemoteAPI\ContentSuggestions;

use Parsely\Parsely;
use Parsely\RemoteAPI\ContentSuggestions\Suggest_Links_API;
use Parsely\Tests\Integration\RemoteAPITest;

/**
 * Integration Tests for the Parse.ly Content Suggestions Suggest Links API.
 *
 * @since 3.14.0
 */
final class SuggestLinksAPITest extends RemoteAPITest {
	/**
	 * Internal variable.
	 *
	 * @var Suggest_Links_API $suggest_links_api Holds an instance of the class being tested.
	 */
	private static $suggest_links_api;

	/**
	 * Initializes all required values for the test.
	 *
	 * @since 3.14.0
	 */
	public static function initialize(): void {
		self::$remote_api = new Suggest_Links_API( new Parsely() );
		// Required for PHPStan to recognize the type.
		self::$suggest_links_api = self::$remote_api;
	}

	/**
	 * Provides data for test_api_url().
	 *
	 * @since 3.14.0
	 *
	 * @return \ArrayIterator<string, mixed>
	 */
	public function data_api_url(): iterable {
		yield 'Basic (Expected data)' => array(
			array(
				'apikey'         => 'my-key',
				'secret'         => 'my-secret',
				'max_link_words' => '4',
				'max_links'      => '10',
			),
			Parsely::PUBLIC_SUGGESTIONS_API_BASE_URL .
				'/suggest-links?apikey=my-key&max_link_words=4&max_links=10&secret=my-secret',
		);
	}

	/**
	 * Mocks a successful HTTP response to the Content Suggestion suggest-links
	 * API endpoint.
	 *
	 * @since 3.14.0
	 *
	 * @param string $response  The response to mock.
	 * @param array  $args      The arguments passed to the HTTP request.
	 * @param string $url       The URL of the HTTP request.
	 * @return array|false The mocked response.
	 *
	 * @phpstan-ignore-next-line
	 */
	public function mock_successful_suggest_links_response(
		string $response,
		array $args,
		string $url
	) {
		if ( ! str_contains( $url, 'suggest-links' ) ) {
			return false;
		}

		$response = array(
			'links' => array(
				array(
					'href'   => 'http://example.com/article-1',
					'title'  => 'Cool article 1',
					'text'   => 'Lorem ipsum',
					'offset' => 0,
				),
				array(
					'href'   => 'http://example.com/article-2',
					'title'  => 'A great article 2',
					'text'   => 'maximus',
					'offset' => 0,
				),
				array(
					'href'   => 'http://example.com/article-3',
					'title'  => 'Yet another great article 3',
					'text'   => 'maximus',
					'offset' => 1,
				),
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
	 * Tests getting cross-links suggestions from the API.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\RemoteAPI\ContentSuggestions\Suggest_Links_API::get_links
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Suggest_Links_API::__construct
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Suggest_Links_API::get_links
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::__construct
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::get_api_url
	 * @uses \Parsely\RemoteAPI\Remote_API_Base::__construct
	 */
	public function test_get_links(): void {
		$content = '<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus metus sed urna maximus,
			et malesuada dui placerat. Donec risus dui, dictum nec interdum eu, malesuada non diam. Curabitur
			 in erat eu nisi scelerisque tristique eu nec tortor. Nam fermentum rutrum mi id scelerisque.
			</p>';

		// Mock API result.
		add_filter( 'pre_http_request', array( $this, 'mock_successful_suggest_links_response' ), 10, 3 );

		// Test getting three titles.
		$suggested_links = self::$suggest_links_api->get_links( $content );

		self::assertIsArray( $suggested_links );
		self::assertEquals( 3, count( $suggested_links ) );

		// Assert the structure the suggested links, and if the object is a Link_Suggestion
		// instance.
		foreach ( $suggested_links as $suggested_link ) {
			self::assertIsObject( $suggested_link );
			self::assertInstanceOf( 'Parsely\RemoteAPI\ContentSuggestions\Link_Suggestion', $suggested_link );
		}

		// Remove mock.
		remove_filter( 'pre_http_request', array( $this, 'mock_successful_write_titles_response' ) );
	}
}

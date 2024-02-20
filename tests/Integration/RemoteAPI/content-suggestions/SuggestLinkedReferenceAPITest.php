<?php
/**
 * Integration Tests: Parsely Content Suggestions Suggest Linked Reference API
 *
 * @package Parsely\Tests
 * @since   3.14.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RemoteAPI\ContentSuggestions;

use Parsely\Parsely;
use Parsely\RemoteAPI\ContentSuggestions\Suggest_Linked_Reference_API;

/**
 * Integration Tests for the Parse.ly Content Suggestions Suggest Linked Reference API.
 *
 * @since 3.14.0
 */
final class SuggestLinkedReferenceAPITest extends BaseContentSuggestionsAPITest {
	/**
	 * Internal variable.
	 *
	 * @var Suggest_Linked_Reference_API $suggest_linked_reference_api Holds an instance of the class being tested.
	 */
	private static $suggest_linked_reference_api;

	/**
	 * Initializes all required values for the test.
	 *
	 * @since 3.14.0
	 */
	public static function initialize(): void {
		self::$remote_api = new Suggest_Linked_Reference_API( new Parsely() );
		// Required for PHPStan to recognize the type.
		self::$suggest_linked_reference_api = self::$remote_api;
	}

	/**
	 * Provides data for test_api_url().
	 *
	 * @uses \Parsely\RemoteAPI\Base_Endpoint_Remote::validate_required_constraints
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::get_api_url

	 * @since 3.14.0
	 * @return \ArrayIterator<string, mixed>
	 */
	public function data_api_url(): iterable {
		yield 'Basic (Expected data)' => array(
			array(
				'apikey' => 'my-key',
			),
			Parsely::PUBLIC_SUGGESTIONS_API_BASE_URL .
				'/suggest-linked-reference?apikey=my-key',
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
		if ( ! str_contains( $url, 'suggest-linked-reference' ) ) {
			return false;
		}

		$response = array(
			'result' => array(
				array(
					'canonical_url' => 'http://example.com/article-1',
					'title'         => 'Cool article 1',
					'text'          => 'Lorem ipsum',
					'offset'        => 0,
				),
				array(
					'canonical_url' => 'http://example.com/article-2',
					'title'         => 'A great article 2',
					'text'          => 'maximus',
					'offset'        => 0,
				),
				array(
					'canonical_url' => 'http://example.com/article-3',
					'title'         => 'Yet another great article 3',
					'text'          => 'maximus',
					'offset'        => 1,
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
	 * Tests getting smart links suggestions from the API.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\RemoteAPI\ContentSuggestions\Suggest_Linked_Reference_API::get_links
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\RemoteAPI\Base_Endpoint_Remote::get_api_url
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::get_request_options
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::post_request
	 * @uses \Parsely\RemoteAPI\Base_Endpoint_Remote::validate_required_constraints
	 * @uses \Parsely\RemoteAPI\ContentSuggestions\Content_Suggestions_Base_API::get_api_url
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
		$suggested_links = self::$suggest_linked_reference_api->get_links( $content );

		self::assertIsArray( $suggested_links );
		self::assertEquals( 3, count( $suggested_links ) );

		// Assert the structure the suggested links, and if the object is a Link_Suggestion
		// instance.
		foreach ( $suggested_links as $suggested_link ) {
			self::assertIsObject( $suggested_link );
			self::assertInstanceOf( 'Parsely\RemoteAPI\ContentSuggestions\Link_Suggestion', $suggested_link );
		}

		// Remove mock.
		remove_filter( 'pre_http_request', array( $this, 'mock_successful_suggest_links_response' ) );
	}
}

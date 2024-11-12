<?php
/**
 * Suggestions API Endpoint Suggest Linked Reference Test
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Services\SuggestionsAPI\Endpoints;

use Parsely\Models\Smart_Link;
use Parsely\Services\Base_Service_Endpoint;
use Parsely\Services\Suggestions_API\Suggestions_API_Service;

/**
 * Tests the Endpoint_Suggest_Linked_Reference class.
 *
 * @since 3.17.0
 *
 * @covers \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Linked_Reference
 * @uses Smart_Link
 * @uses Suggestions_API_Service
 */
class EndpointSuggestLinkedReferenceTest extends SuggestionsAPIBaseEndpointTestCase {
	/**
	 * Returns the endpoint for the API request.
	 *
	 * @since 3.17.0
	 *
	 * @return Base_Service_Endpoint
	 */
	public function get_service_endpoint(): Base_Service_Endpoint {
		return $this->get_suggestions_api()->get_endpoint( '/suggest-linked-reference' );
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
			Suggestions_API_Service::get_base_url() . '/suggest-linked-reference?apikey=my-key',
		);
	}

	/**
	 * Mocks a successful HTTP response to the Content Suggestion suggest-links
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
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Services\Suggestions_API\Suggestions_API_Service::get_smart_links
	 * @uses \Parsely\Models\Base_Model::__construct
	 * @uses Smart_Link::__construct
	 * @uses Smart_Link::generate_uid
	 * @uses Smart_Link::get_post_id_by_url
	 * @uses Smart_Link::set_href
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Services\Base_API_Service::get_api_url
	 * @uses \Parsely\Services\Base_API_Service::get_endpoint
	 * @uses \Parsely\Services\Base_API_Service::get_parsely
	 * @uses Base_Service_Endpoint::get_endpoint_url
	 * @uses Base_Service_Endpoint::get_parsely
	 * @uses Base_Service_Endpoint::get_query_args
	 * @uses Base_Service_Endpoint::request
	 * @uses Base_Service_Endpoint::truncate_array_content
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Linked_Reference::get_endpoint
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Endpoint_Suggest_Linked_Reference::get_links
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Suggestions_API_Base_Endpoint::get_query_args
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Suggestions_API_Base_Endpoint::get_request_options
	 * @uses \Parsely\Services\Suggestions_API\Endpoints\Suggestions_API_Base_Endpoint::process_response
	 * @uses Suggestions_API_Service::get_base_url
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
		$suggested_links = $this->get_suggestions_api()->get_smart_links( $content );

		self::assertIsArray( $suggested_links );
		self::assertEquals( 3, count( $suggested_links ) );

		// Assert the structure the suggested links, and if the object is a Link_Suggestion
		// instance.
		foreach ( $suggested_links as $suggested_link ) {
			self::assertIsObject( $suggested_link );
			self::assertInstanceOf( Smart_Link::class, $suggested_link );
		}

		// Remove mock.
		remove_filter( 'pre_http_request', array( $this, 'mock_successful_suggest_links_response' ) );
	}
}

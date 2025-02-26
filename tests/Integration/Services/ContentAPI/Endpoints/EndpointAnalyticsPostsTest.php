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
}

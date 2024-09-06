<?php
/**
 * Base class for testing settings endpoints
 *
 * @package Parsely
 * @since   3.13.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\RestAPI\Settings;

use Parsely\Tests\Integration\RestAPI\BaseEndpointTest;
use WP_REST_Request;

/**
 * Base class for testing settings endpoints.
 *
 * @since 3.13.0
 */
abstract class BaseSettingsEndpointTest extends BaseEndpointTest {
	/**
	 * Generates a JSON array for the passed period, metric, and extra data.
	 *
	 * @since 3.13.0
	 * @since 3.17.0 Moved from the old BaseUserMetaEndpointTest class, and
	 *               modified to return an array instead of a string.
	 *
	 * @param string|null         $metric The Metric value.
	 * @param string|null         $period The Period value.
	 * @param array<mixed, mixed> $extra_data Any Extra key/value pairs to add.
	 * @return array<mixed> The generated JSON array.
	 */
	abstract protected function generate_json(
		?string $metric = null,
		?string $period = null,
		array $extra_data = array()
	): array;

	/**
	 * Returns the default value for the endpoint.
	 *
	 * @since 3.17.0
	 *
	 * @return array<string, mixed> The default value for the endpoint.
	 */
	abstract protected function get_default_value(): array;

	/**
	 * Verifies that the route is registered.
	 *
	 * @since 3.17.0
	 */
	protected function run_test_route_is_registered(): void {
		$routes = rest_get_server()->get_routes();

		// Check that the main route is registered.
		$expected_route = $this->get_endpoint()->get_full_endpoint( '/' );
		self::assertArrayHasKey( $expected_route, $routes );

		// Check that the route is associated with the GET and PUT methods.
		$route_data = $routes[ $expected_route ];
		self::assertArrayHasKey( 'GET', $route_data[0]['methods'] );
		self::assertArrayHasKey( 'PUT', $route_data[0]['methods'] );

		// Check the `/get` route.
		$expected_route = $this->get_endpoint()->get_full_endpoint( '/get' );
		self::assertArrayHasKey( $expected_route, $routes );

		// Check that the route is associated with the GET method.
		$route_data = $routes[ $expected_route ];
		self::assertArrayHasKey( 'GET', $route_data[0]['methods'] );

		// Check the `/set` route.
		$expected_route = $this->get_endpoint()->get_full_endpoint( '/set' );
		self::assertArrayHasKey( $expected_route, $routes );

		// Check that the route is associated with the PUT method.
		$route_data = $routes[ $expected_route ];
		self::assertArrayHasKey( 'PUT', $route_data[0]['methods'] );
	}

	/**
	 * Verifies that the endpoint returns the correct default value.
	 *
	 * @since 3.13.0
	 * @since 3.17.0 Moved from the old BaseUserMetaEndpointTest class.
	 */
	public function run_test_endpoint_returns_value_on_get_request(): void {
		$this->set_current_user_to_admin();

		$value = rest_do_request(
			new WP_REST_Request(
				'GET',
				$this->get_endpoint()->get_full_endpoint( '/get' )
			)
		)->get_data();
		$value = $this->wp_json_encode( $value );

		$expected = $this->wp_json_encode(
			$this->get_default_value()
		);

		self::assertSame( $expected, $value );
	}

	/**
	 * Provides data for testing PUT requests.
	 *
	 * @since 3.13.0
	 * @since 3.17.0 Moved from the old BaseUserMetaEndpointTest class.
	 *
	 * @return iterable<string, mixed>
	 */
	public function provide_put_requests_data(): iterable {
		$default_value = $this->generate_json( 'views', '7d' );
		$valid_value   = $this->generate_json( 'avg_engaged', '1h' );

		// Valid non-default value. It should be returned unmodified.
		yield 'valid period and metric values' => array(
			'test_data' => $valid_value,
			'expected'  => $valid_value,
		);

		// Missing or problematic keys. Defaults should be used for the missing or problematic keys.
		yield 'valid period value, no metric value' => array(
			'test_data' => $this->generate_json( null, '1h' ),
			'expected'  => $this->generate_json( 'views', '1h' ),
		);
		yield 'valid metric value, no period value' => array(
			'test_data' => $this->generate_json( 'avg_engaged' ),
			'expected'  => $this->generate_json( 'avg_engaged', '7d' ),
		);
		yield 'no values' => array(
			'test_data' => $this->generate_json(),
			'expected'  => $default_value,
		);

		// Invalid values. They should be adjusted to their defaults.
		yield 'invalid period value' => array(
			'test_data' => $this->generate_json( 'avg_engaged', 'invalid' ),
			'expected'  => $this->generate_json( 'avg_engaged', '7d' ),
		);
		yield 'invalid metric value' => array(
			'test_data' => $this->generate_json( 'invalid', '1h' ),
			'expected'  => $this->generate_json( 'views', '1h' ),
		);
		yield 'invalid period and metric values' => array(
			'test_data' => $this->generate_json( 'invalid', 'invalid' ),
			'expected'  => $default_value,
		);

		// Invalid extra data passed. Any such data should be discarded.
		yield 'invalid additional value' => array(
			'test_data' => $this->generate_json(
				'avg_engaged',
				'1h',
				array( 'invalid' )
			),
			'expected'  => $valid_value,
		);
		yield 'invalid additional key/value pair' => array(
			'test_data' => $this->generate_json(
				'avg_engaged',
				'1h',
				array( 'invalid_key' => 'invalid_value' )
			),
			'expected'  => $valid_value,
		);
	}

	/**
	 * Sends a PUT request to the endpoint.
	 *
	 * @since 3.13.0
	 * @since 3.17.0 Moved from the old BaseUserMetaEndpointTest class.
	 *
	 * @param array<mixed> $data The data to be sent in the request.
	 * @return array<mixed> The response returned by the endpoint.
	 */
	protected function send_put_request( array $data ): array {
		$this->set_current_user_to_admin();
		$result = $this->send_wp_rest_request(
			'PUT',
			$this->get_endpoint()->get_full_endpoint( '/set' ),
			$this->wp_json_encode( $data )
		);

		if ( ! is_array( $result ) ) {
			return array();
		}

		return $result;
	}

	/**
	 * Verifies that the endpoint is not available if the API Secret is not set.
	 *
	 * This test is disabled since the endpoint does not require an API Secret.
	 *
	 * @since 3.17.0
	 *
	 * @coversNothing
	 */
	public function test_is_available_to_current_user_returns_error_api_secret_not_set(): void {
		self::assertTrue( true );
	}

	/**
	 * Verifies that the endpoint is not available if the Site ID is not set.
	 *
	 * This test is disabled since the endpoint does not require a Site ID.
	 *
	 * @since 3.17.0
	 *
	 * @coversNothing
	 */
	public function test_is_available_to_current_user_returns_error_site_id_not_set(): void {
		self::assertTrue( true );
	}
}

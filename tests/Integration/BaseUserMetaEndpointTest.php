<?php
/**
 * Integration Tests: Base class for all User Meta endpoint tests
 *
 * @package Parsely\Tests
 * @since   3.13.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use WP_REST_Request;

/**
 * Base class for all User Meta endpoint tests.
 *
 * @since 3.13.0
 */
abstract class BaseUserMetaEndpointTest extends ProxyEndpointTest {
	/**
	 * The endpoint's default value.
	 *
	 * @since 3.13.0
	 * @var array<string, mixed>
	 */
	protected $default_value = array();

	/**
	 * Generates a JSON string for the passed period, metric, and extra data.
	 *
	 * @since 3.13.0
	 *
	 * @param string|null         $metric The Metric value.
	 * @param string|null         $period The Period value.
	 * @param array<mixed, mixed> $extra_data Any Extra key/value pairs to add.
	 * @return string The generated JSON string.
	 */
	abstract protected function generate_json(
		?string $metric = null,
		?string $period = null,
		array $extra_data = array()
	): string;

	/**
	 * Verifies that the endpoint returns the correct default value.
	 *
	 * @since 3.13.0
	 */
	public function run_test_endpoint_returns_value_on_get_request(): void {
		$this->set_admin_user();

		$value = rest_do_request(
			new WP_REST_Request(
				'GET',
				self::$route
			)
		)->get_data();

		$expected = $this->wp_json_encode(
			$this->default_value
		);

		self::assertSame( $expected, $value );
	}

	/**
	 * Provides data for testing PUT requests.
	 *
	 * @since 3.13.0
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
	 *
	 * @param string $data The data to be sent in the request.
	 * @return string The response returned by the endpoint.
	 */
	protected function send_put_request( string $data ): string {
		$this->set_admin_user();
		$result = $this->send_wp_rest_request( 'PUT', self::$route, $data );

		if ( ! is_string( $result ) ) {
			return '';
		}

		return $result;
	}
}

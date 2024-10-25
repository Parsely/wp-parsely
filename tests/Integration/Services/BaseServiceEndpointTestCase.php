<?php
/**
 * Base Service API Endpoint Test
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Services;

use Parsely\Services\Base_API_Service;
use Parsely\Services\Base_Service_Endpoint;
use Parsely\Tests\Integration\TestCase;
use Parsely\Tests\Traits\TestsReflection;

/**
 * Base class for testing API service endpoints.
 *
 * @since 3.17.0
 */
abstract class BaseServiceEndpointTestCase extends TestCase {
	use TestsReflection;

	/**
	 * The API Service instance
	 *
	 * @since 3.17.0
	 *
	 * @var Base_API_Service $api_service Holds an instance of the class being tested.
	 */
	protected static $api_service;

	/**
	 * Initializes all required values for the test.
	 *
	 * @since 3.17.0
	 */
	abstract public static function initialize(): void;

	/**
	 * Provides data for test_api_url().
	 *
	 * @since 3.17.0
	 *
	 * @return \ArrayIterator<string, mixed>
	 */
	abstract public function data_api_url(): iterable;

	/**
	 * Returns the endpoint for the API request.
	 *
	 * @since 3.17.0
	 *
	 * @return Base_Service_Endpoint
	 */
	abstract public function get_service_endpoint(): Base_Service_Endpoint;

	/**
	 * Runs once before all tests.
	 *
	 * @since 3.17.0
	 */
	public static function set_up_before_class(): void {
		static::initialize();
	}

	/**
	 * Verifies that the truncate_array_content() method truncates long text in
	 * any member of the array.
	 *
	 * @since 3.17.0
	 *
	 * @covers \Parsely\Services\Base_Service_Endpoint::truncate_array_content
	 */
	public function test_truncate_body_content(): void {
		$endpoint = $this->get_service_endpoint();

		$body = array(
			'output_params' => array(
				'some_param'  => true,
				'other_param' => 'Hello',
				'recursive'   => array(
					'key' => 'value',
				),
			),
			'text'          => $this->generate_content_with_length( 30000 ),
			'something'     => 'else',
		);

		$truncate_array_content = self::get_method( 'truncate_array_content', $endpoint );
		$truncated_array        = $truncate_array_content->invoke( $endpoint, $body );

		self::assertIsArray( $truncated_array );
		self::assertArrayHasKey( 'output_params', $truncated_array );
		self::assertArrayHasKey( 'text', $truncated_array );
		self::assertLessThanOrEqual( 25000, strlen( $truncated_array['text'] ) );

		// Assert that the truncated text is the beginning of the original text.
		self::assertStringStartsWith( $truncated_array['text'], $body['text'] );

		// Assert that the other keys are the same in both arrays.
		self::assertEquals( $body['output_params'], $truncated_array['output_params'] );
		self::assertEquals( $body['something'], $truncated_array['something'] );
	}

	/**
	 * Generates content with a specific length.
	 *
	 * @since 3.17.0
	 *
	 * @param int $length Length of the generated content.
	 * @return string The generated content.
	 */
	private function generate_content_with_length( int $length ): string {
		$words          = array( 'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit' );
		$string         = '';
		$current_length = 0;

		while ( $current_length < $length ) {
			$word = $words[ array_rand( $words ) ];
			if ( $current_length > 0 ) {
				if ( $current_length + strlen( $word ) + 1 > $length ) {
					break;
				}
				$string .= ' ';
				++$current_length;
			}
			$string         .= $word;
			$current_length += strlen( $word );
		}

		return $string;
	}
}

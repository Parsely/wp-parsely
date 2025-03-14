<?php
/**
 * Base API Service Test
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Services;

use Parsely\Services\Base_API_Service;
use Parsely\Tests\Integration\TestCase;

/**
 * Base class for testing API services.
 *
 * @since 3.17.0
 */
abstract class BaseAPIServiceTestCase extends TestCase {
	/**
	 * Holds an instance of the class being tested.
	 *
	 * @since 3.17.0
	 *
	 * @var Base_API_Service
	 */
	protected static $api_service;

	/**
	 * Initializes all required values for the test.
	 *
	 * @since 3.17.0
	 */
	abstract public static function initialize(): void;

	/**
	 * Provides data for test_endpoint_is_registered().
	 *
	 * Should return an array of arrays, each containing the endpoint name and class.
	 *
	 * @since 3.17.0
	 *
	 * @return array<string, array<string, string>>
	 */
	abstract public function data_registered_endpoints(): iterable;

	/**
	 * Runs once before all tests.
	 *
	 * @since 3.17.0
	 */
	public static function set_up_before_class(): void {
		static::initialize();
	}
}

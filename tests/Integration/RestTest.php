<?php
/**
 * Parsely REST API tests.
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\Rest;


/**
 * Parsely REST API tests.
 */
final class RestTest extends TestCase {
	/**
	 * Internal variable
	 *
	 * @var Rest $rest Holds the Rest object
	 */
	private static $rest;

	/**
	 * The setUp run before each test
	 */
	public function set_up(): void {
		parent::set_up();

		self::$rest = new Rest( new Parsely() );
	}
}
